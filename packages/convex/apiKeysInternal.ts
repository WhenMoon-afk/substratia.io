import { v } from "convex/values";
import { internalQuery } from "./_generated/server";

// Internal query to get API key by hash (for HTTP actions)
export const getByHash = internalQuery({
  args: {
    hashedKey: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("apiKeys")
      .withIndex("by_key", (q) => q.eq("key", args.hashedKey))
      .first();
  },
});
