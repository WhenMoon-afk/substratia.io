import { v } from "convex/values";
import { internalMutation, internalQuery } from "./_generated/server";

// Get the latest narrative of each type for a user
export const getIdentity = internalQuery({
  args: {
    userId: v.id("users"),
  },
  handler: async (ctx, args) => {
    const types = [
      "identity",
      "capability",
      "relationship",
      "trajectory",
      "milestone",
    ] as const;
    const narratives = [];

    for (const type of types) {
      const latest = await ctx.db
        .query("narratives")
        .withIndex("by_user_type", (q) =>
          q.eq("userId", args.userId).eq("type", type),
        )
        .order("desc")
        .first();
      if (latest) {
        narratives.push(latest);
      }
    }

    // Get preferences
    const prefs = await ctx.db
      .query("agentPreferences")
      .withIndex("by_user", (q) => q.eq("userId", args.userId))
      .collect();

    const preferences: Record<string, string> = {};
    for (const p of prefs) {
      preferences[p.key] = p.value;
    }

    return { narratives, preferences };
  },
});

// Create or update a narrative
export const upsertNarrative = internalMutation({
  args: {
    userId: v.id("users"),
    type: v.union(
      v.literal("identity"),
      v.literal("capability"),
      v.literal("relationship"),
      v.literal("trajectory"),
      v.literal("milestone"),
    ),
    title: v.string(),
    text: v.string(),
    sourceIds: v.optional(v.array(v.string())),
    timeSpan: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const now = Date.now();
    return await ctx.db.insert("narratives", {
      userId: args.userId,
      type: args.type,
      title: args.title,
      text: args.text,
      sourceIds: args.sourceIds,
      timeSpan: args.timeSpan,
      createdAt: now,
      updatedAt: now,
    });
  },
});

// Set preferences (merge)
export const setPreferences = internalMutation({
  args: {
    userId: v.id("users"),
    preferences: v.array(
      v.object({
        key: v.string(),
        value: v.string(),
      }),
    ),
  },
  handler: async (ctx, args) => {
    const now = Date.now();
    let updated = 0;

    for (const { key, value } of args.preferences) {
      // Check if key exists
      const existing = await ctx.db
        .query("agentPreferences")
        .withIndex("by_user_key", (q) =>
          q.eq("userId", args.userId).eq("key", key),
        )
        .first();

      if (existing) {
        await ctx.db.patch(existing._id, { value, updatedAt: now });
      } else {
        await ctx.db.insert("agentPreferences", {
          userId: args.userId,
          key,
          value,
          updatedAt: now,
        });
      }
      updated++;
    }

    return { updated };
  },
});

// Context bridge: composite query for restart continuity
export const contextBridge = internalQuery({
  args: {
    userId: v.id("users"),
  },
  handler: async (ctx, args) => {
    // Latest snapshot
    const snapshot = await ctx.db
      .query("snapshots")
      .withIndex("by_user", (q) => q.eq("userId", args.userId))
      .order("desc")
      .first();

    // Recent memories (last 10)
    const memories = await ctx.db
      .query("memories")
      .withIndex("by_user", (q) => q.eq("userId", args.userId))
      .order("desc")
      .take(10);

    // Preferences
    const prefs = await ctx.db
      .query("agentPreferences")
      .withIndex("by_user", (q) => q.eq("userId", args.userId))
      .collect();

    const preferences: Record<string, string> = {};
    for (const p of prefs) {
      preferences[p.key] = p.value;
    }

    // Latest narrative per type
    const types = [
      "identity",
      "capability",
      "relationship",
      "trajectory",
      "milestone",
    ] as const;
    const narratives = [];
    for (const type of types) {
      const latest = await ctx.db
        .query("narratives")
        .withIndex("by_user_type", (q) =>
          q.eq("userId", args.userId).eq("type", type),
        )
        .order("desc")
        .first();
      if (latest) {
        narratives.push({
          type: latest.type,
          title: latest.title,
          text: latest.text,
        });
      }
    }

    return {
      snapshot: snapshot
        ? {
            summary: snapshot.summary,
            context: snapshot.context,
            nextSteps: snapshot.nextSteps,
            decisions: snapshot.decisions,
            createdAt: snapshot.createdAt,
          }
        : null,
      recentMemories: memories.map((m) => ({
        content: m.content,
        importance: m.importance,
        tags: m.tags,
      })),
      preferences,
      narratives,
    };
  },
});
