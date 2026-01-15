import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

// Add email to waitlist (no auth required)
export const join = mutation({
  args: {
    email: v.string(),
    tier: v.union(v.literal("pro"), v.literal("team"), v.literal("enterprise")),
    source: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    // Check if already on waitlist
    const existing = await ctx.db
      .query("waitlist")
      .withIndex("by_email", (q) => q.eq("email", args.email))
      .first();

    if (existing) {
      // Update tier if upgrading
      const tierOrder = { pro: 1, team: 2, enterprise: 3 };
      if (tierOrder[args.tier] > tierOrder[existing.tier]) {
        await ctx.db.patch(existing._id, { tier: args.tier });
      }
      return { status: "already_joined", id: existing._id };
    }

    const id = await ctx.db.insert("waitlist", {
      email: args.email,
      tier: args.tier,
      source: args.source,
      createdAt: Date.now(),
    });

    return { status: "joined", id };
  },
});

// Get waitlist stats (for admin dashboard)
export const getStats = query({
  args: {},
  handler: async (ctx) => {
    const all = await ctx.db.query("waitlist").collect();

    const byTier = {
      pro: all.filter((w) => w.tier === "pro").length,
      team: all.filter((w) => w.tier === "team").length,
      enterprise: all.filter((w) => w.tier === "enterprise").length,
    };

    const last24h = all.filter(
      (w) => w.createdAt > Date.now() - 24 * 60 * 60 * 1000
    ).length;

    const last7d = all.filter(
      (w) => w.createdAt > Date.now() - 7 * 24 * 60 * 60 * 1000
    ).length;

    return {
      total: all.length,
      byTier,
      last24h,
      last7d,
    };
  },
});
