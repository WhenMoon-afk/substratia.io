import { v } from "convex/values";
import { internalMutation, internalQuery } from "./_generated/server";

// Check if user can store memories (tier enforcement)
export const checkTierLimit = internalQuery({
  args: {
    userId: v.id("users"),
  },
  handler: async (ctx, args) => {
    // Get user to check tier
    const user = await ctx.db.get(args.userId);
    if (!user) {
      return { allowed: false, reason: "User not found", limit: 0, current: 0 };
    }

    // Pro and team tiers have full access
    if (user.tier === "pro" || user.tier === "team") {
      return { allowed: true, reason: null, limit: null, current: null };
    }

    // Free tier: 500 memories (generous — genuinely useful, not crippled trial)
    const FREE_TIER_LIMIT = 500;
    const memoryCount = await ctx.db
      .query("memories")
      .withIndex("by_user", (q) => q.eq("userId", args.userId))
      .collect();

    const current = memoryCount.length;
    if (current >= FREE_TIER_LIMIT) {
      return {
        allowed: false,
        reason: `Free tier limit reached (${FREE_TIER_LIMIT} memories). Upgrade to Pro for unlimited.`,
        limit: FREE_TIER_LIMIT,
        current,
      };
    }

    return { allowed: true, reason: null, limit: FREE_TIER_LIMIT, current };
  },
});

// Internal mutation to insert memory from API (bypasses Clerk auth)
export const insertFromApi = internalMutation({
  args: {
    userId: v.id("users"),
    content: v.string(),
    context: v.optional(v.string()),
    importance: v.union(
      v.literal("critical"),
      v.literal("high"),
      v.literal("normal"),
      v.literal("low"),
    ),
    tags: v.optional(v.array(v.string())),
    createdAt: v.number(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("memories", {
      userId: args.userId,
      content: args.content,
      context: args.context,
      importance: args.importance,
      tags: args.tags,
      accessCount: 0,
      lastAccessed: args.createdAt,
      createdAt: args.createdAt,
      synced: true,
    });
  },
});

// Get all memories for a user with optional filters
export const listByUser = internalQuery({
  args: {
    userId: v.id("users"),
    limit: v.optional(v.number()),
    importance: v.optional(
      v.union(
        v.literal("critical"),
        v.literal("high"),
        v.literal("normal"),
        v.literal("low"),
      ),
    ),
  },
  handler: async (ctx, args) => {
    let query = ctx.db
      .query("memories")
      .withIndex("by_user", (q) => q.eq("userId", args.userId))
      .order("desc");

    const memories = await query.collect();

    let filtered = memories;
    if (args.importance) {
      filtered = memories.filter((m) => m.importance === args.importance);
    }

    if (args.limit) {
      filtered = filtered.slice(0, args.limit);
    }

    return filtered;
  },
});

// Get a single memory by ID
export const getById = internalQuery({
  args: {
    memoryId: v.id("memories"),
    userId: v.id("users"),
  },
  handler: async (ctx, args) => {
    const memory = await ctx.db.get(args.memoryId);
    if (!memory || memory.userId !== args.userId) {
      return null;
    }
    return memory;
  },
});

// Search memories using full-text search
export const searchByContent = internalQuery({
  args: {
    userId: v.id("users"),
    query: v.string(),
    limit: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const results = await ctx.db
      .query("memories")
      .withSearchIndex("search_content", (q) =>
        q.search("content", args.query).eq("userId", args.userId),
      )
      .take(args.limit || 10);

    return results;
  },
});

// Delete a memory
export const deleteById = internalMutation({
  args: {
    memoryId: v.id("memories"),
    userId: v.id("users"),
  },
  handler: async (ctx, args) => {
    const memory = await ctx.db.get(args.memoryId);
    if (!memory || memory.userId !== args.userId) {
      return { success: false, error: "Memory not found" };
    }
    await ctx.db.delete(args.memoryId);
    return { success: true };
  },
});
