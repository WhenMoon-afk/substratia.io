/**
 * Share Module for @substratia/memory
 *
 * Generates portable, self-contained HTML (or JSON) files
 * displaying an agent's memories, identity, and snapshots.
 *
 * @module
 */

import { homedir } from "os";
import { join } from "path";
import { writeFileSync, existsSync, mkdirSync } from "fs";

import { renderMemoryPanel } from "./panel-template.js";
import type { PanelData } from "./panel-template.js";

// Re-export for consumer use
export { renderMemoryPanel } from "./panel-template.js";
export type { PanelData } from "./panel-template.js";

// Lazy-loaded storage (same pattern as dashboard/server.ts)
type StorageModule = typeof import("../storage/sqlite.js");

// =============================================================================
// OPTIONS
// =============================================================================

export interface ShareOptions {
  /** Filter memories by search query */
  query?: string;
  /** Include Self-Schema identity data */
  withIdentity?: boolean;
  /** Include snapshots */
  withSnapshots?: boolean;
  /** Custom output file path */
  output?: string;
  /** Output format (default: html) */
  format?: "html" | "json";
  /** Agent name displayed in the panel header */
  agentName?: string;
}

// =============================================================================
// PUBLIC API
// =============================================================================

/**
 * Generate a memory panel from a SQLite database.
 *
 * Opens the database, loads memories (with optional search filter),
 * optionally loads Self-Schema and snapshots, computes statistics,
 * and returns both the rendered HTML and the raw PanelData JSON.
 */
export async function generatePanel(
  dbPath: string,
  options: ShareOptions = {},
): Promise<{ html: string; json: PanelData }> {
  const { SQLiteStorage } =
    (await import("../storage/sqlite.js")) as StorageModule;

  const storage = new SQLiteStorage({ dbPath });
  await storage.init();

  try {
    // Load memories
    let memories;
    if (options.query) {
      memories = await storage.searchMemories({
        query: options.query,
        limit: 1000,
      });
    } else {
      memories = await storage.listMemories({
        limit: 1000,
        orderBy: "createdAt",
        order: "desc",
      });
    }

    // Compute stats
    const byType: Record<string, number> = {};
    const byImportance: Record<string, number> = {};
    for (const mem of memories) {
      byType[mem.type] = (byType[mem.type] || 0) + 1;
      byImportance[mem.importance] = (byImportance[mem.importance] || 0) + 1;
    }

    // Load Self-Schema (optional)
    let selfSchema: PanelData["selfSchema"] = undefined;
    if (options.withIdentity) {
      const schema = await storage.getSelfSchema();
      if (schema) {
        const narrative = await storage.getNarrative();
        selfSchema = {
          identity: (schema.presentSelf?.coreIdentity || []).map((id) => ({
            statement: id.statement,
            centrality: id.centrality,
            confidence: id.confidence,
          })),
          capabilities: (schema.presentSelf?.capabilities || []).map((c) => ({
            name: c.name,
            proficiency: c.proficiency,
          })),
          values: (schema.presentSelf?.values || []).map((v) => ({
            statement: v.statement,
            importance: v.importance,
          })),
          narrative: narrative?.coreSummary,
          themes: narrative?.themes?.map((t) => t.name),
        };
      }
    }

    // Load snapshots (optional)
    let snapshots: PanelData["snapshots"] = undefined;
    if (options.withSnapshots) {
      const snaps = await storage.listSnapshots(20);
      if (snaps.length > 0) {
        snapshots = snaps.map((s) => ({
          name: s.name,
          summary: s.summary,
          createdAt: s.createdAt,
          tags: s.tags,
        }));
      }
    }

    const panelData: PanelData = {
      exportedAt: Date.now(),
      memories: memories.map((m) => ({
        id: m.id,
        type: m.type,
        content: m.content,
        importance: m.importance,
        tags: m.tags,
        context: m.context,
        createdAt: m.createdAt,
        accessCount: m.accessCount,
      })),
      stats: {
        total: memories.length,
        byType,
        byImportance,
      },
      selfSchema: selfSchema ?? null,
      snapshots,
      meta: {
        agentName: options.agentName,
        filter: options.query,
      },
    };

    const html = renderMemoryPanel(panelData);

    return { html, json: panelData };
  } finally {
    await storage.close();
  }
}

/**
 * Generate a memory panel and write it to a file.
 *
 * Returns the absolute path to the written file.
 */
export async function shareToFile(
  dbPath: string,
  options: ShareOptions = {},
): Promise<string> {
  const { html, json } = await generatePanel(dbPath, options);

  const format = options.format ?? "html";
  const ext = format === "json" ? ".json" : ".html";

  let outputPath: string;
  if (options.output) {
    outputPath = options.output;
  } else {
    const dateStr = new Date().toISOString().slice(0, 10).replace(/-/g, "");
    outputPath = join(process.cwd(), `memory-panel-${dateStr}${ext}`);
  }

  // Ensure parent directory exists
  const dir = join(outputPath, "..");
  if (!existsSync(dir)) {
    mkdirSync(dir, { recursive: true });
  }

  const content = format === "json" ? JSON.stringify(json, null, 2) : html;
  writeFileSync(outputPath, content, "utf-8");

  return outputPath;
}

/**
 * Resolve the database path from env or default location.
 */
export function resolveDbPath(): string {
  return (
    process.env.SUBSTRATIA_DB_PATH ??
    join(homedir(), ".substratia", "memory.db")
  );
}
