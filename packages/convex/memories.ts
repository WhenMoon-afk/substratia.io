import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

// Store a new memory
export const store = mutation({
  args: {
    content: v.string(),
    context: v.optional(v.string()),
    importance: v.optional(
      v.union(
        v.literal("critical"),
        v.literal("high"),
        v.literal("normal"),
        v.literal("low")
      )
    ),
    tags: v.optional(v.array(v.string())),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Not authenticated");

    const user = await ctx.db
      .query("users")
      .withIndex("by_clerk_id", (q) => q.eq("clerkId", identity.subject))
      .first();

    if (!user) throw new Error("User not found");

    const now = Date.now();
    return await ctx.db.insert("memories", {
      userId: user._id,
      content: args.content,
      context: args.context,
      importance: args.importance ?? "normal",
      tags: args.tags,
      accessCount: 0,
      lastAccessed: now,
      createdAt: now,
      synced: true,
    });
  },
});

// Search memories using full-text search
export const search = query({
  args: {
    query: v.string(),
    limit: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) return [];

    const user = await ctx.db
      .query("users")
      .withIndex("by_clerk_id", (q) => q.eq("clerkId", identity.subject))
      .first();

    if (!user) return [];

    const limit = args.limit ?? 10;
    return await ctx.db
      .query("memories")
      .withSearchIndex("search_content", (q) =>
        q.search("content", args.query).eq("userId", user._id)
      )
      .take(limit);
  },
});

// Recall a specific memory (and increment access count)
export const recall = mutation({
  args: {
    memoryId: v.id("memories"),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Not authenticated");

    const user = await ctx.db
      .query("users")
      .withIndex("by_clerk_id", (q) => q.eq("clerkId", identity.subject))
      .first();

    if (!user) throw new Error("User not found");

    const memory = await ctx.db.get(args.memoryId);
    if (!memory || memory.userId !== user._id) {
      throw new Error("Memory not found or access denied");
    }

    await ctx.db.patch(args.memoryId, {
      accessCount: memory.accessCount + 1,
      lastAccessed: Date.now(),
    });

    return memory;
  },
});

// Get recent memories
export const getRecent = query({
  args: {
    limit: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) return [];

    const user = await ctx.db
      .query("users")
      .withIndex("by_clerk_id", (q) => q.eq("clerkId", identity.subject))
      .first();

    if (!user) return [];

    const limit = args.limit ?? 20;
    return await ctx.db
      .query("memories")
      .withIndex("by_user", (q) => q.eq("userId", user._id))
      .order("desc")
      .take(limit);
  },
});

// Get important memories
export const getImportant = query({
  args: {
    limit: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) return [];

    const user = await ctx.db
      .query("users")
      .withIndex("by_clerk_id", (q) => q.eq("clerkId", identity.subject))
      .first();

    if (!user) return [];

    const limit = args.limit ?? 10;
    const critical = await ctx.db
      .query("memories")
      .withIndex("by_importance", (q) =>
        q.eq("userId", user._id).eq("importance", "critical")
      )
      .take(limit);

    const high = await ctx.db
      .query("memories")
      .withIndex("by_importance", (q) =>
        q.eq("userId", user._id).eq("importance", "high")
      )
      .take(limit - critical.length);

    return [...critical, ...high];
  },
});

// Forget (delete) a memory
export const forget = mutation({
  args: {
    memoryId: v.id("memories"),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Not authenticated");

    const user = await ctx.db
      .query("users")
      .withIndex("by_clerk_id", (q) => q.eq("clerkId", identity.subject))
      .first();

    if (!user) throw new Error("User not found");

    const memory = await ctx.db.get(args.memoryId);
    if (!memory || memory.userId !== user._id) {
      throw new Error("Memory not found or access denied");
    }

    await ctx.db.delete(args.memoryId);
  },
});

// Bulk sync from local
export const bulkSync = mutation({
  args: {
    memories: v.array(
      v.object({
        content: v.string(),
        context: v.optional(v.string()),
        importance: v.union(
          v.literal("critical"),
          v.literal("high"),
          v.literal("normal"),
          v.literal("low")
        ),
        tags: v.optional(v.array(v.string())),
        accessCount: v.number(),
        lastAccessed: v.number(),
        createdAt: v.number(),
      })
    ),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Not authenticated");

    const user = await ctx.db
      .query("users")
      .withIndex("by_clerk_id", (q) => q.eq("clerkId", identity.subject))
      .first();

    if (!user) throw new Error("User not found");

    const ids = [];
    for (const memory of args.memories) {
      const id = await ctx.db.insert("memories", {
        userId: user._id,
        ...memory,
        synced: true,
      });
      ids.push(id);
    }

    return { synced: ids.length };
  },
});
