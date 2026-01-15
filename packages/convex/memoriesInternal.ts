import { v } from "convex/values";
import { internalMutation } from "./_generated/server";

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
      v.literal("low")
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
