import { httpRouter } from "convex/server";
import { httpAction } from "./_generated/server";
import { internal } from "./_generated/api";

/**
 * Hash an API key using SHA-256 (same as in apiKeys.ts)
 */
async function hashApiKey(key: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(key);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
}

/**
 * Validate API key from Authorization header
 * Returns userId and keyId if valid, null otherwise
 */
async function validateApiKey(
  ctx: any,
  request: Request
): Promise<{ userId: any; keyId: any } | null> {
  const authHeader = request.headers.get("Authorization");
  if (!authHeader?.startsWith("Bearer ")) {
    return null;
  }

  const rawKey = authHeader.slice(7);
  if (!rawKey.startsWith("sk_")) {
    return null;
  }

  const hashedKey = await hashApiKey(rawKey);

  const apiKey = await ctx.runQuery(internal.apiKeysInternal.getByHash, {
    hashedKey,
  });

  if (!apiKey || apiKey.revokedAt) {
    return null;
  }

  // Update last used timestamp asynchronously
  ctx.runMutation(internal.apiKeys.updateLastUsed, { keyId: apiKey._id });

  return {
    userId: apiKey.userId,
    keyId: apiKey._id,
  };
}

const http = httpRouter();

// Health check endpoint
http.route({
  path: "/api/health",
  method: "GET",
  handler: httpAction(async () => {
    return new Response(JSON.stringify({ status: "ok", timestamp: Date.now() }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }),
});

// Sync a single snapshot from momentum
http.route({
  path: "/api/snapshots/sync",
  method: "POST",
  handler: httpAction(async (ctx, request) => {
    // Validate API key
    const auth = await validateApiKey(ctx, request);
    if (!auth) {
      return new Response(JSON.stringify({ error: "Invalid API key" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Parse request body
    let body;
    try {
      body = await request.json();
    } catch {
      return new Response(JSON.stringify({ error: "Invalid JSON" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Validate required fields
    const { projectPath, summary, context, decisions, nextSteps, filesTouched, importance, createdAt } = body;

    if (!projectPath || !summary || !context) {
      return new Response(
        JSON.stringify({ error: "Missing required fields: projectPath, summary, context" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Validate importance value
    const validImportance = ["critical", "important", "normal", "reference"];
    const safeImportance = validImportance.includes(importance) ? importance : "normal";

    // Insert snapshot
    try {
      const snapshotId = await ctx.runMutation(internal.snapshotsInternal.insertFromApi, {
        userId: auth.userId,
        projectPath,
        summary,
        context,
        decisions: decisions || undefined,
        nextSteps: nextSteps || undefined,
        filesTouched: filesTouched || undefined,
        importance: safeImportance,
        createdAt: createdAt || Date.now(),
      });

      return new Response(
        JSON.stringify({ success: true, snapshotId }),
        { status: 201, headers: { "Content-Type": "application/json" } }
      );
    } catch (error) {
      console.error("Failed to insert snapshot:", error);
      return new Response(
        JSON.stringify({ error: "Failed to save snapshot" }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }
  }),
});

// Bulk sync snapshots from momentum
http.route({
  path: "/api/snapshots/bulk-sync",
  method: "POST",
  handler: httpAction(async (ctx, request) => {
    const auth = await validateApiKey(ctx, request);
    if (!auth) {
      return new Response(JSON.stringify({ error: "Invalid API key" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
    }

    let body;
    try {
      body = await request.json();
    } catch {
      return new Response(JSON.stringify({ error: "Invalid JSON" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const { snapshots } = body;
    if (!Array.isArray(snapshots)) {
      return new Response(
        JSON.stringify({ error: "snapshots must be an array" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Limit batch size
    if (snapshots.length > 100) {
      return new Response(
        JSON.stringify({ error: "Maximum 100 snapshots per request" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const validImportance = ["critical", "important", "normal", "reference"];
    let synced = 0;

    for (const snap of snapshots) {
      if (!snap.projectPath || !snap.summary || !snap.context) {
        continue; // Skip invalid snapshots
      }

      try {
        await ctx.runMutation(internal.snapshotsInternal.insertFromApi, {
          userId: auth.userId,
          projectPath: snap.projectPath,
          summary: snap.summary,
          context: snap.context,
          decisions: snap.decisions || undefined,
          nextSteps: snap.nextSteps || undefined,
          filesTouched: snap.filesTouched || undefined,
          importance: validImportance.includes(snap.importance) ? snap.importance : "normal",
          createdAt: snap.createdAt || Date.now(),
        });
        synced++;
      } catch (error) {
        console.error("Failed to sync snapshot:", error);
      }
    }

    return new Response(
      JSON.stringify({ success: true, synced, total: snapshots.length }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  }),
});

// Sync a memory from memory-mcp
http.route({
  path: "/api/memories/sync",
  method: "POST",
  handler: httpAction(async (ctx, request) => {
    const auth = await validateApiKey(ctx, request);
    if (!auth) {
      return new Response(JSON.stringify({ error: "Invalid API key" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
    }

    let body;
    try {
      body = await request.json();
    } catch {
      return new Response(JSON.stringify({ error: "Invalid JSON" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const { content, context, importance, tags, createdAt } = body;

    if (!content) {
      return new Response(
        JSON.stringify({ error: "Missing required field: content" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const validImportance = ["critical", "high", "normal", "low"];
    const safeImportance = validImportance.includes(importance) ? importance : "normal";

    try {
      const memoryId = await ctx.runMutation(internal.memoriesInternal.insertFromApi, {
        userId: auth.userId,
        content,
        context: context || undefined,
        importance: safeImportance,
        tags: tags || undefined,
        createdAt: createdAt || Date.now(),
      });

      return new Response(
        JSON.stringify({ success: true, memoryId }),
        { status: 201, headers: { "Content-Type": "application/json" } }
      );
    } catch (error) {
      console.error("Failed to insert memory:", error);
      return new Response(
        JSON.stringify({ error: "Failed to save memory" }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }
  }),
});

export default http;
