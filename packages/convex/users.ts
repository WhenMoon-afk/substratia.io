import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

// Get or create user from Clerk auth
export const getOrCreate = mutation({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Not authenticated");

    // Check if user exists
    const existing = await ctx.db
      .query("users")
      .withIndex("by_clerk_id", (q) => q.eq("clerkId", identity.subject))
      .first();

    if (existing) return existing;

    // Create new user
    const userId = await ctx.db.insert("users", {
      clerkId: identity.subject,
      email: identity.email ?? "",
      name: identity.name,
      tier: "free",
      createdAt: Date.now(),
    });

    return await ctx.db.get(userId);
  },
});

// Get current user
export const getCurrent = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) return null;

    return await ctx.db
      .query("users")
      .withIndex("by_clerk_id", (q) => q.eq("clerkId", identity.subject))
      .first();
  },
});

// Update user tier (admin only or via Stripe webhook)
export const updateTier = mutation({
  args: {
    userId: v.id("users"),
    tier: v.union(v.literal("free"), v.literal("pro"), v.literal("team")),
  },
  handler: async (ctx, args) => {
    // In production, verify admin/webhook auth
    await ctx.db.patch(args.userId, { tier: args.tier });
  },
});

// Get user stats
export const getStats = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) return null;

    const user = await ctx.db
      .query("users")
      .withIndex("by_clerk_id", (q) => q.eq("clerkId", identity.subject))
      .first();

    if (!user) return null;

    const snapshots = await ctx.db
      .query("snapshots")
      .withIndex("by_user", (q) => q.eq("userId", user._id))
      .collect();

    const memories = await ctx.db
      .query("memories")
      .withIndex("by_user", (q) => q.eq("userId", user._id))
      .collect();

    return {
      snapshotCount: snapshots.length,
      memoryCount: memories.length,
      tier: user.tier,
      memberSince: user.createdAt,
    };
  },
});
