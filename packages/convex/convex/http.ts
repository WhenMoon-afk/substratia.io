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
  request: Request,
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

/**
 * Map numeric importance (0-10) to string literal
 * Used for memory-mcp which uses numeric importance scores
 */
function mapImportance(
  importance: unknown,
): "critical" | "high" | "normal" | "low" {
  // If already a valid string, return it
  const validStrings = ["critical", "high", "normal", "low"];
  if (typeof importance === "string" && validStrings.includes(importance)) {
    return importance as "critical" | "high" | "normal" | "low";
  }

  // Map numeric values (0-10 scale)
  if (typeof importance === "number") {
    if (importance >= 8) return "critical";
    if (importance >= 5) return "high";
    if (importance >= 3) return "normal";
    return "low";
  }

  return "normal";
}

const http = httpRouter();

// Health check endpoint
http.route({
  path: "/api/health",
  method: "GET",
  handler: httpAction(async () => {
    return new Response(
      JSON.stringify({ status: "ok", timestamp: Date.now() }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      },
    );
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
    const {
      projectPath,
      summary,
      context,
      decisions,
      nextSteps,
      filesTouched,
      importance,
      createdAt,
    } = body;

    if (!projectPath || !summary || !context) {
      return new Response(
        JSON.stringify({
          error: "Missing required fields: projectPath, summary, context",
        }),
        { status: 400, headers: { "Content-Type": "application/json" } },
      );
    }

    // Validate importance value
    const validImportance = ["critical", "important", "normal", "reference"];
    const safeImportance = validImportance.includes(importance)
      ? importance
      : "normal";

    // Insert snapshot
    try {
      const snapshotId = await ctx.runMutation(
        internal.snapshotsInternal.insertFromApi,
        {
          userId: auth.userId,
          projectPath,
          summary,
          context,
          decisions: decisions || undefined,
          nextSteps: nextSteps || undefined,
          filesTouched: filesTouched || undefined,
          importance: safeImportance,
          createdAt: createdAt || Date.now(),
        },
      );

      return new Response(JSON.stringify({ success: true, snapshotId }), {
        status: 201,
        headers: { "Content-Type": "application/json" },
      });
    } catch (error) {
      console.error("Failed to insert snapshot:", error);
      return new Response(
        JSON.stringify({ error: "Failed to save snapshot" }),
        { status: 500, headers: { "Content-Type": "application/json" } },
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
        { status: 400, headers: { "Content-Type": "application/json" } },
      );
    }

    // Limit batch size
    if (snapshots.length > 100) {
      return new Response(
        JSON.stringify({ error: "Maximum 100 snapshots per request" }),
        { status: 400, headers: { "Content-Type": "application/json" } },
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
          importance: validImportance.includes(snap.importance)
            ? snap.importance
            : "normal",
          createdAt: snap.createdAt || Date.now(),
        });
        synced++;
      } catch (error) {
        console.error("Failed to sync snapshot:", error);
      }
    }

    return new Response(
      JSON.stringify({ success: true, synced, total: snapshots.length }),
      { status: 200, headers: { "Content-Type": "application/json" } },
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

    // Check tier limits before allowing sync
    const tierCheck = await ctx.runQuery(
      internal.memoriesInternal.checkTierLimit,
      {
        userId: auth.userId,
      },
    );

    if (!tierCheck.allowed) {
      return new Response(
        JSON.stringify({
          error: "tier_limit_exceeded",
          message: tierCheck.reason,
          limit: tierCheck.limit,
          current: tierCheck.current,
          upgradeUrl: "https://substratia.io/",
        }),
        { status: 402, headers: { "Content-Type": "application/json" } },
      );
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

    const {
      content,
      summary,
      type,
      context,
      importance,
      tags,
      metadata,
      createdAt,
      lastAccessed,
      accessCount,
    } = body;

    if (!content) {
      return new Response(
        JSON.stringify({ error: "Missing required field: content" }),
        { status: 400, headers: { "Content-Type": "application/json" } },
      );
    }

    // Map importance (supports both numeric 0-10 and string literals)
    const safeImportance = mapImportance(importance);

    // Build context from summary and type if not provided
    const finalContext =
      context || (summary ? `[${type || "memory"}] ${summary}` : undefined);

    // Extract tags from metadata if not provided directly
    const finalTags = tags || (metadata?.tags as string[] | undefined);

    try {
      const memoryId = await ctx.runMutation(
        internal.memoriesInternal.insertFromApi,
        {
          userId: auth.userId,
          content,
          context: finalContext,
          importance: safeImportance,
          tags: finalTags,
          createdAt: createdAt || Date.now(),
        },
      );

      return new Response(JSON.stringify({ success: true, memoryId }), {
        status: 201,
        headers: { "Content-Type": "application/json" },
      });
    } catch (error) {
      console.error("Failed to insert memory:", error);
      return new Response(JSON.stringify({ error: "Failed to save memory" }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }
  }),
});

// Bulk sync memories from memory-mcp
http.route({
  path: "/api/memories/bulk-sync",
  method: "POST",
  handler: httpAction(async (ctx, request) => {
    const auth = await validateApiKey(ctx, request);
    if (!auth) {
      return new Response(JSON.stringify({ error: "Invalid API key" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Check tier limits before allowing sync
    const tierCheck = await ctx.runQuery(
      internal.memoriesInternal.checkTierLimit,
      {
        userId: auth.userId,
      },
    );

    if (!tierCheck.allowed) {
      return new Response(
        JSON.stringify({
          error: "tier_limit_exceeded",
          message: tierCheck.reason,
          limit: tierCheck.limit,
          current: tierCheck.current,
          upgradeUrl: "https://substratia.io/",
        }),
        { status: 402, headers: { "Content-Type": "application/json" } },
      );
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

    const { memories } = body;
    if (!Array.isArray(memories)) {
      return new Response(
        JSON.stringify({ error: "memories must be an array" }),
        { status: 400, headers: { "Content-Type": "application/json" } },
      );
    }

    // Limit batch size
    if (memories.length > 100) {
      return new Response(
        JSON.stringify({ error: "Maximum 100 memories per request" }),
        { status: 400, headers: { "Content-Type": "application/json" } },
      );
    }

    // Check if bulk sync would exceed limit
    if (tierCheck.limit !== null && tierCheck.current !== null) {
      const remaining = tierCheck.limit - tierCheck.current;
      if (memories.length > remaining) {
        return new Response(
          JSON.stringify({
            error: "tier_limit_exceeded",
            message: `Only ${remaining} memories remaining on free tier. Upgrade to Pro for unlimited.`,
            limit: tierCheck.limit,
            current: tierCheck.current,
            requestedCount: memories.length,
            upgradeUrl: "https://substratia.io/",
          }),
          { status: 402, headers: { "Content-Type": "application/json" } },
        );
      }
    }

    let synced = 0;

    for (const mem of memories) {
      if (!mem.content) {
        continue; // Skip invalid memories
      }

      // Build context from summary and type if not provided
      const finalContext =
        mem.context ||
        (mem.summary ? `[${mem.type || "memory"}] ${mem.summary}` : undefined);

      // Extract tags from metadata if not provided directly
      const finalTags =
        mem.tags || (mem.metadata?.tags as string[] | undefined);

      try {
        await ctx.runMutation(internal.memoriesInternal.insertFromApi, {
          userId: auth.userId,
          content: mem.content,
          context: finalContext,
          importance: mapImportance(mem.importance),
          tags: finalTags,
          createdAt: mem.createdAt || Date.now(),
        });
        synced++;
      } catch (error) {
        console.error("Failed to sync memory:", error);
      }
    }

    return new Response(
      JSON.stringify({ success: true, synced, total: memories.length }),
      { status: 200, headers: { "Content-Type": "application/json" } },
    );
  }),
});

// List memories for SDK
http.route({
  path: "/api/memories",
  method: "GET",
  handler: httpAction(async (ctx, request) => {
    const auth = await validateApiKey(ctx, request);
    if (!auth) {
      return new Response(JSON.stringify({ error: "Invalid API key" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
    }

    const url = new URL(request.url);
    const limit = parseInt(url.searchParams.get("limit") || "50");
    const importance = url.searchParams.get("importance") as any;

    try {
      const memories = await ctx.runQuery(
        internal.memoriesInternal.listByUser,
        {
          userId: auth.userId,
          limit: Math.min(limit, 100),
          importance: importance || undefined,
        },
      );

      return new Response(JSON.stringify({ memories }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    } catch (error) {
      console.error("Failed to list memories:", error);
      return new Response(
        JSON.stringify({ error: "Failed to list memories" }),
        { status: 500, headers: { "Content-Type": "application/json" } },
      );
    }
  }),
});

// Search memories for SDK
http.route({
  path: "/api/memories/search",
  method: "GET",
  handler: httpAction(async (ctx, request) => {
    const auth = await validateApiKey(ctx, request);
    if (!auth) {
      return new Response(JSON.stringify({ error: "Invalid API key" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
    }

    const url = new URL(request.url);
    const query = url.searchParams.get("q");
    const limit = parseInt(url.searchParams.get("limit") || "10");

    if (!query) {
      return new Response(
        JSON.stringify({ error: "Missing required parameter: q" }),
        { status: 400, headers: { "Content-Type": "application/json" } },
      );
    }

    try {
      const memories = await ctx.runQuery(
        internal.memoriesInternal.searchByContent,
        {
          userId: auth.userId,
          query,
          limit: Math.min(limit, 50),
        },
      );

      return new Response(JSON.stringify({ memories }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    } catch (error) {
      console.error("Failed to search memories:", error);
      return new Response(
        JSON.stringify({ error: "Failed to search memories" }),
        { status: 500, headers: { "Content-Type": "application/json" } },
      );
    }
  }),
});

// Delete a memory for SDK
http.route({
  path: "/api/memories/delete",
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

    const { id } = body;
    if (!id) {
      return new Response(
        JSON.stringify({ error: "Missing required field: id" }),
        { status: 400, headers: { "Content-Type": "application/json" } },
      );
    }

    try {
      const result = await ctx.runMutation(
        internal.memoriesInternal.deleteById,
        {
          memoryId: id,
          userId: auth.userId,
        },
      );

      if (!result.success) {
        return new Response(JSON.stringify({ error: result.error }), {
          status: 404,
          headers: { "Content-Type": "application/json" },
        });
      }

      return new Response(JSON.stringify({ success: true }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    } catch (error) {
      console.error("Failed to delete memory:", error);
      return new Response(
        JSON.stringify({ error: "Failed to delete memory" }),
        { status: 500, headers: { "Content-Type": "application/json" } },
      );
    }
  }),
});

// ============================================================================
// Identity & Context Bridge
// ============================================================================

// Get agent identity (narratives + preferences)
http.route({
  path: "/api/identity",
  method: "GET",
  handler: httpAction(async (ctx, request) => {
    const auth = await validateApiKey(ctx, request);
    if (!auth) {
      return new Response(JSON.stringify({ error: "Invalid API key" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
    }

    try {
      const identity = await ctx.runQuery(
        internal.identityInternal.getIdentity,
        {
          userId: auth.userId,
        },
      );

      return new Response(JSON.stringify(identity), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    } catch (error) {
      console.error("Failed to get identity:", error);
      return new Response(JSON.stringify({ error: "Failed to get identity" }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }
  }),
});

// Create/update a narrative
http.route({
  path: "/api/identity/narrative",
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

    const { type, title, text, sourceIds, timeSpan } = body;
    const validTypes = [
      "identity",
      "capability",
      "relationship",
      "trajectory",
      "milestone",
    ];

    if (!type || !validTypes.includes(type) || !title || !text) {
      return new Response(
        JSON.stringify({
          error: `Required: type (${validTypes.join("/")}), title, text`,
        }),
        { status: 400, headers: { "Content-Type": "application/json" } },
      );
    }

    try {
      const narrativeId = await ctx.runMutation(
        internal.identityInternal.upsertNarrative,
        {
          userId: auth.userId,
          type,
          title,
          text,
          sourceIds: sourceIds || undefined,
          timeSpan: timeSpan || undefined,
        },
      );

      return new Response(JSON.stringify({ success: true, narrativeId }), {
        status: 201,
        headers: { "Content-Type": "application/json" },
      });
    } catch (error) {
      console.error("Failed to save narrative:", error);
      return new Response(
        JSON.stringify({ error: "Failed to save narrative" }),
        { status: 500, headers: { "Content-Type": "application/json" } },
      );
    }
  }),
});

// Set preferences (merge)
http.route({
  path: "/api/identity/preferences",
  method: "PUT",
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

    if (!body || typeof body !== "object") {
      return new Response(
        JSON.stringify({
          error: "Body must be a JSON object of key-value pairs",
        }),
        { status: 400, headers: { "Content-Type": "application/json" } },
      );
    }

    const preferences = Object.entries(body).map(([key, value]) => ({
      key,
      value: String(value),
    }));

    try {
      const result = await ctx.runMutation(
        internal.identityInternal.setPreferences,
        {
          userId: auth.userId,
          preferences,
        },
      );

      return new Response(JSON.stringify(result), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    } catch (error) {
      console.error("Failed to set preferences:", error);
      return new Response(
        JSON.stringify({ error: "Failed to set preferences" }),
        { status: 500, headers: { "Content-Type": "application/json" } },
      );
    }
  }),
});

// Context bridge — full restart continuity package
http.route({
  path: "/api/bridge",
  method: "GET",
  handler: httpAction(async (ctx, request) => {
    const auth = await validateApiKey(ctx, request);
    if (!auth) {
      return new Response(JSON.stringify({ error: "Invalid API key" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
    }

    try {
      const bridge = await ctx.runQuery(
        internal.identityInternal.contextBridge,
        {
          userId: auth.userId,
        },
      );

      return new Response(JSON.stringify(bridge), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    } catch (error) {
      console.error("Failed to build context bridge:", error);
      return new Response(
        JSON.stringify({ error: "Failed to build context bridge" }),
        { status: 500, headers: { "Content-Type": "application/json" } },
      );
    }
  }),
});

// ============================================================================
// Stripe Webhook Handler
// ============================================================================

/**
 * Verify Stripe webhook signature
 * Uses HMAC-SHA256 to verify the payload matches the signature
 */
async function verifyStripeSignature(
  payload: string,
  signature: string,
  secret: string,
): Promise<boolean> {
  // Parse the signature header
  const parts = signature.split(",");
  let timestamp = "";
  let v1Signature = "";

  for (const part of parts) {
    const [key, value] = part.split("=");
    if (key === "t") timestamp = value;
    if (key === "v1") v1Signature = value;
  }

  if (!timestamp || !v1Signature) {
    return false;
  }

  // Check timestamp is within tolerance (5 minutes)
  const timestampMs = parseInt(timestamp) * 1000;
  const tolerance = 5 * 60 * 1000; // 5 minutes
  if (Math.abs(Date.now() - timestampMs) > tolerance) {
    return false;
  }

  // Compute expected signature
  const signedPayload = `${timestamp}.${payload}`;
  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const signatureBuffer = await crypto.subtle.sign(
    "HMAC",
    key,
    encoder.encode(signedPayload),
  );
  const expectedSignature = Array.from(new Uint8Array(signatureBuffer))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");

  return expectedSignature === v1Signature;
}

/**
 * Map Stripe price ID to tier
 * Configure these in your Stripe dashboard and update here
 */
function priceIdToTier(priceId: string): "free" | "pro" | "team" {
  // These should match your Stripe price IDs
  // TODO: Move to environment variables
  const proPriceIds = [
    process.env.STRIPE_PRO_PRICE_ID,
    "price_pro_monthly",
    "price_pro_yearly",
  ];
  const teamPriceIds = [
    process.env.STRIPE_TEAM_PRICE_ID,
    "price_team_monthly",
    "price_team_yearly",
  ];

  if (proPriceIds.includes(priceId)) return "pro";
  if (teamPriceIds.includes(priceId)) return "team";
  return "free";
}

// Stripe webhook endpoint
http.route({
  path: "/api/stripe/webhook",
  method: "POST",
  handler: httpAction(async (ctx, request) => {
    // Get webhook secret from environment
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
    if (!webhookSecret) {
      console.error("STRIPE_WEBHOOK_SECRET not configured");
      return new Response(JSON.stringify({ error: "Webhook not configured" }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Get signature from headers
    const signature = request.headers.get("stripe-signature");
    if (!signature) {
      return new Response(
        JSON.stringify({ error: "Missing stripe-signature header" }),
        { status: 400, headers: { "Content-Type": "application/json" } },
      );
    }

    // Get raw body
    const payload = await request.text();

    // Verify signature
    const isValid = await verifyStripeSignature(
      payload,
      signature,
      webhookSecret,
    );
    if (!isValid) {
      console.error("Invalid Stripe webhook signature");
      return new Response(JSON.stringify({ error: "Invalid signature" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Parse event
    let event;
    try {
      event = JSON.parse(payload);
    } catch {
      return new Response(JSON.stringify({ error: "Invalid JSON" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    console.log(`Stripe webhook received: ${event.type}`);

    try {
      switch (event.type) {
        case "checkout.session.completed": {
          // User completed checkout - link customer and activate subscription
          const session = event.data.object;
          const customerEmail =
            session.customer_details?.email || session.customer_email;
          const customerId = session.customer;
          const subscriptionId = session.subscription;

          if (!customerEmail) {
            console.error("No customer email in checkout session");
            break;
          }

          // Find user by email
          const user = await ctx.runMutation(internal.users.getByEmail, {
            email: customerEmail,
          });

          if (!user) {
            console.error(`No user found for email: ${customerEmail}`);
            break;
          }

          // Get the price ID from line items (need to expand in Stripe)
          // For now, default to pro tier for any paid subscription
          const tier = "pro";

          // Link Stripe customer and activate subscription
          await ctx.runMutation(internal.users.linkStripeCustomer, {
            userId: user._id,
            stripeCustomerId: customerId,
            stripeSubscriptionId: subscriptionId,
          });

          await ctx.runMutation(internal.users.updateTier, {
            userId: user._id,
            tier,
          });

          console.log(`User ${customerEmail} upgraded to ${tier}`);
          break;
        }

        case "customer.subscription.updated": {
          // Subscription changed (upgrade, downgrade, or renewal)
          const subscription = event.data.object;
          const customerId = subscription.customer;
          const status = subscription.status;
          const priceId = subscription.items?.data?.[0]?.price?.id;

          // Find user by Stripe customer ID
          const user = await ctx.runMutation(
            internal.users.getByStripeCustomer,
            {
              stripeCustomerId: customerId,
            },
          );

          if (!user) {
            console.error(`No user found for Stripe customer: ${customerId}`);
            break;
          }

          // Determine tier from price ID
          let tier: "free" | "pro" | "team" = priceId
            ? priceIdToTier(priceId)
            : "free";

          // If subscription is not active, downgrade to free
          if (status !== "active" && status !== "trialing") {
            tier = "free";
          }

          await ctx.runMutation(internal.users.updateStripeSubscription, {
            userId: user._id,
            stripeSubscriptionId: subscription.id,
            tier,
          });

          console.log(`User ${user.email} subscription updated to ${tier}`);
          break;
        }

        case "customer.subscription.deleted": {
          // Subscription cancelled or expired
          const subscription = event.data.object;
          const customerId = subscription.customer;

          const user = await ctx.runMutation(
            internal.users.getByStripeCustomer,
            {
              stripeCustomerId: customerId,
            },
          );

          if (!user) {
            console.error(`No user found for Stripe customer: ${customerId}`);
            break;
          }

          // Downgrade to free tier
          await ctx.runMutation(internal.users.updateStripeSubscription, {
            userId: user._id,
            stripeSubscriptionId: undefined,
            tier: "free",
          });

          console.log(
            `User ${user.email} subscription cancelled, downgraded to free`,
          );
          break;
        }

        case "invoice.payment_failed": {
          // Payment failed - could send email notification
          const invoice = event.data.object;
          const customerId = invoice.customer;

          const user = await ctx.runMutation(
            internal.users.getByStripeCustomer,
            {
              stripeCustomerId: customerId,
            },
          );

          if (user) {
            console.warn(`Payment failed for user ${user.email}`);
            // TODO: Send email notification about failed payment
          }
          break;
        }

        default:
          // Unhandled event type - log but don't error
          console.log(`Unhandled Stripe event: ${event.type}`);
      }

      return new Response(JSON.stringify({ received: true }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    } catch (error) {
      console.error("Error processing Stripe webhook:", error);
      return new Response(
        JSON.stringify({ error: "Webhook processing failed" }),
        { status: 500, headers: { "Content-Type": "application/json" } },
      );
    }
  }),
});

export default http;
