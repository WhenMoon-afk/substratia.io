/**
 * Dashboard Server for @substratia/memory
 *
 * A local-only HTTP server that serves the dashboard UI and REST API.
 * Reads from the local SQLite database with no authentication needed.
 * Uses only Node.js built-in modules -- zero external dependencies.
 *
 * @module
 */

import { createServer, type IncomingMessage, type ServerResponse } from "http";
import { homedir } from "os";
import { join } from "path";
import { existsSync } from "fs";
import { exec } from "child_process";

import { DASHBOARD_HTML } from "./ui.js";

// Lazy-loaded storage (avoids import-time SQLite driver resolution)
type StorageModule = typeof import("../storage/sqlite.js");

export interface DashboardOptions {
  /** Port to listen on (default: 3847) */
  port?: number;
  /** Auto-open browser (default: true) */
  open?: boolean;
}

/**
 * Start the Substratia Dashboard server.
 *
 * Initializes SQLiteStorage, serves the HTML dashboard at `/`,
 * and exposes a REST API for data access.
 */
export async function startDashboard(
  options: DashboardOptions = {},
): Promise<void> {
  const port = options.port ?? 3847;
  const shouldOpen = options.open ?? true;

  // Resolve DB path
  const dbPath =
    process.env.SUBSTRATIA_DB_PATH ??
    join(homedir(), ".substratia", "memory.db");

  // Ensure DB file exists (or at least the directory does)
  const dbDir = join(dbPath, "..");
  if (!existsSync(dbDir)) {
    const { mkdirSync } = await import("fs");
    mkdirSync(dbDir, { recursive: true });
  }

  // Load and initialize storage
  let storage: InstanceType<StorageModule["SQLiteStorage"]>;
  try {
    const { SQLiteStorage } =
      (await import("../storage/sqlite.js")) as StorageModule;
    storage = new SQLiteStorage({ dbPath });
    await storage.init();
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error(`\x1b[31mFailed to initialize storage: ${message}\x1b[0m`);
    console.error(`\x1b[2mDB path: ${dbPath}\x1b[0m\n`);
    console.error(
      "Make sure better-sqlite3 is installed (or use Bun runtime).",
    );
    process.exit(1);
  }

  // ── Helpers ────────────────────────────────────────────────────────────────

  function json(res: ServerResponse, data: unknown, status = 200): void {
    const body = JSON.stringify(data);
    res.writeHead(status, {
      "Content-Type": "application/json",
      "Content-Length": Buffer.byteLength(body),
      "Access-Control-Allow-Origin": "*",
    });
    res.end(body);
  }

  function html(res: ServerResponse, content: string): void {
    res.writeHead(200, {
      "Content-Type": "text/html; charset=utf-8",
      "Content-Length": Buffer.byteLength(content),
    });
    res.end(content);
  }

  function error(res: ServerResponse, status: number, msg: string): void {
    json(res, { error: msg }, status);
  }

  function parseUrl(req: IncomingMessage): {
    pathname: string;
    params: URLSearchParams;
  } {
    const parsed = new URL(req.url ?? "/", `http://localhost:${port}`);
    return { pathname: parsed.pathname, params: parsed.searchParams };
  }

  // ── Request handler ────────────────────────────────────────────────────────

  async function handleRequest(
    req: IncomingMessage,
    res: ServerResponse,
  ): Promise<void> {
    const method = req.method ?? "GET";
    const { pathname, params } = parseUrl(req);

    try {
      // ── Serve dashboard HTML ────────────────────────────────────────────
      if (method === "GET" && pathname === "/") {
        html(res, DASHBOARD_HTML);
        return;
      }

      // ── GET /api/stats ──────────────────────────────────────────────────
      if (method === "GET" && pathname === "/api/stats") {
        const stats = await storage.stats();
        json(res, stats);
        return;
      }

      // ── GET /api/memories ───────────────────────────────────────────────
      if (method === "GET" && pathname === "/api/memories") {
        const limit = Math.min(
          parseInt(params.get("limit") ?? "50", 10) || 50,
          200,
        );
        const offset = parseInt(params.get("offset") ?? "0", 10) || 0;
        const orderBy =
          (params.get("orderBy") as
            | "createdAt"
            | "lastAccessed"
            | "accessCount"
            | "importance") ?? "createdAt";
        const order = (params.get("order") as "asc" | "desc") ?? "desc";

        const memories = await storage.listMemories({
          limit,
          offset,
          orderBy,
          order,
        });
        json(res, memories);
        return;
      }

      // ── GET /api/memories/search ────────────────────────────────────────
      if (method === "GET" && pathname === "/api/memories/search") {
        const q = params.get("q") ?? "";
        if (!q) {
          json(res, []);
          return;
        }
        const limit = Math.min(
          parseInt(params.get("limit") ?? "20", 10) || 20,
          200,
        );
        const memories = await storage.searchMemories({ query: q, limit });
        json(res, memories);
        return;
      }

      // ── GET /api/self-schema ────────────────────────────────────────────
      if (method === "GET" && pathname === "/api/self-schema") {
        const schema = await storage.getSelfSchema();
        json(res, schema);
        return;
      }

      // ── GET /api/snapshots ──────────────────────────────────────────────
      if (method === "GET" && pathname === "/api/snapshots") {
        const limit = Math.min(
          parseInt(params.get("limit") ?? "10", 10) || 10,
          100,
        );
        const snapshots = await storage.listSnapshots(limit);
        json(res, snapshots);
        return;
      }

      // ── DELETE /api/memories/:id ────────────────────────────────────────
      const deleteMatch = pathname.match(/^\/api\/memories\/(.+)$/);
      if (method === "DELETE" && deleteMatch) {
        const id = decodeURIComponent(deleteMatch[1]);
        await storage.deleteMemory(id);
        json(res, { deleted: true, id });
        return;
      }

      // ── CORS preflight ─────────────────────────────────────────────────
      if (method === "OPTIONS") {
        res.writeHead(204, {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET, DELETE, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type",
        });
        res.end();
        return;
      }

      // ── 404 ─────────────────────────────────────────────────────────────
      error(res, 404, "Not found");
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      console.error(
        `[dashboard] Error handling ${method} ${pathname}:`,
        message,
      );
      error(res, 500, message);
    }
  }

  // ── Start server ───────────────────────────────────────────────────────────

  const server = createServer((req, res) => {
    handleRequest(req, res).catch((err) => {
      console.error("[dashboard] Unhandled error:", err);
      if (!res.headersSent) {
        error(res, 500, "Internal server error");
      }
    });
  });

  server.listen(port, "127.0.0.1", () => {
    const url = `http://localhost:${port}`;
    console.log(
      `\n\x1b[36m  Substratia Dashboard\x1b[0m running at \x1b[1m${url}\x1b[0m`,
    );
    console.log(`\x1b[2m  DB: ${dbPath}\x1b[0m`);
    console.log(`\x1b[2m  Press Ctrl+C to stop\x1b[0m\n`);

    if (shouldOpen) {
      openBrowser(url);
    }
  });

  // Graceful shutdown
  const shutdown = (): void => {
    console.log("\n\x1b[2mShutting down dashboard...\x1b[0m");
    server.close(async () => {
      await storage.close();
      process.exit(0);
    });
    // Force close after 3 seconds
    setTimeout(() => process.exit(0), 3000);
  };

  process.on("SIGINT", shutdown);
  process.on("SIGTERM", shutdown);
}

/**
 * Open a URL in the default browser (cross-platform).
 */
function openBrowser(url: string): void {
  const platform = process.platform;
  let cmd: string;
  if (platform === "darwin") {
    cmd = `open "${url}"`;
  } else if (platform === "win32") {
    cmd = `start "" "${url}"`;
  } else {
    cmd = `xdg-open "${url}"`;
  }
  exec(cmd, (err) => {
    if (err) {
      // Silently fail -- not critical
      console.log(
        `\x1b[2m  Could not auto-open browser. Open ${url} manually.\x1b[0m`,
      );
    }
  });
}
