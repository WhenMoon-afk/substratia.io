import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

// Save a new snapshot
export const save = mutation({
  args: {
    projectPath: v.string(),
    summary: v.string(),
    context: v.string(),
    decisions: v.optional(v.array(v.string())),
    nextSteps: v.optional(v.string()),
    filesTouched: v.optional(v.array(v.string())),
    importance: v.union(
      v.literal("critical"),
      v.literal("important"),
      v.literal("normal"),
      v.literal("reference")
    ),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Not authenticated");

    // Get user by Clerk ID
    const user = await ctx.db
      .query("users")
      .withIndex("by_clerk_id", (q) => q.eq("clerkId", identity.subject))
      .first();

    if (!user) throw new Error("User not found");

    return await ctx.db.insert("snapshots", {
      userId: user._id,
      projectPath: args.projectPath,
      summary: args.summary,
      context: args.context,
      decisions: args.decisions,
      nextSteps: args.nextSteps,
      filesTouched: args.filesTouched,
      importance: args.importance,
      createdAt: Date.now(),
      synced: true,
    });
  },
});

// Get snapshots for a project
export const getByProject = query({
  args: {
    projectPath: v.string(),
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
      .query("snapshots")
      .withIndex("by_user_project", (q) =>
        q.eq("userId", user._id).eq("projectPath", args.projectPath)
      )
      .order("desc")
      .take(limit);
  },
});

// Get recent snapshots across all projects
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
      .query("snapshots")
      .withIndex("by_user", (q) => q.eq("userId", user._id))
      .order("desc")
      .take(limit);
  },
});

// Delete a snapshot
export const remove = mutation({
  args: {
    snapshotId: v.id("snapshots"),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Not authenticated");

    const user = await ctx.db
      .query("users")
      .withIndex("by_clerk_id", (q) => q.eq("clerkId", identity.subject))
      .first();

    if (!user) throw new Error("User not found");

    const snapshot = await ctx.db.get(args.snapshotId);
    if (!snapshot || snapshot.userId !== user._id) {
      throw new Error("Snapshot not found or access denied");
    }

    await ctx.db.delete(args.snapshotId);
  },
});

// Bulk sync from local (for initial upload)
export const bulkSync = mutation({
  args: {
    snapshots: v.array(
      v.object({
        projectPath: v.string(),
        summary: v.string(),
        context: v.string(),
        decisions: v.optional(v.array(v.string())),
        nextSteps: v.optional(v.string()),
        filesTouched: v.optional(v.array(v.string())),
        importance: v.union(
          v.literal("critical"),
          v.literal("important"),
          v.literal("normal"),
          v.literal("reference")
        ),
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
    for (const snapshot of args.snapshots) {
      const id = await ctx.db.insert("snapshots", {
        userId: user._id,
        ...snapshot,
        synced: true,
      });
      ids.push(id);
    }

    return { synced: ids.length };
  },
});
