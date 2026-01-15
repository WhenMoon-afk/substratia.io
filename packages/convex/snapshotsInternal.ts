import { v } from "convex/values";
import { internalMutation } from "./_generated/server";

// Internal mutation to insert snapshot from API (bypasses Clerk auth)
export const insertFromApi = internalMutation({
  args: {
    userId: v.id("users"),
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
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("snapshots", {
      userId: args.userId,
      projectPath: args.projectPath,
      summary: args.summary,
      context: args.context,
      decisions: args.decisions,
      nextSteps: args.nextSteps,
      filesTouched: args.filesTouched,
      importance: args.importance,
      createdAt: args.createdAt,
      synced: true,
    });
  },
});
