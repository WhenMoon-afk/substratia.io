import { v } from "convex/values";
import { mutation, query, internalMutation } from "./_generated/server";

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

// Update user tier (internal only - called from Stripe webhooks or admin actions)
// This is NOT callable from client code
export const updateTier = internalMutation({
  args: {
    userId: v.id("users"),
    tier: v.union(v.literal("free"), v.literal("pro"), v.literal("team")),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.userId, { tier: args.tier });
  },
});

// Link Stripe customer to user (internal only)
export const linkStripeCustomer = internalMutation({
  args: {
    userId: v.id("users"),
    stripeCustomerId: v.string(),
    stripeSubscriptionId: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.userId, {
      stripeCustomerId: args.stripeCustomerId,
      stripeSubscriptionId: args.stripeSubscriptionId,
    });
  },
});

// Get user by Stripe customer ID (internal only)
export const getByStripeCustomer = internalMutation({
  args: {
    stripeCustomerId: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("users")
      .withIndex("by_stripe_customer", (q) =>
        q.eq("stripeCustomerId", args.stripeCustomerId),
      )
      .first();
  },
});

// Get user by email (internal only - for Stripe checkout where we have email)
export const getByEmail = internalMutation({
  args: {
    email: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("users")
      .withIndex("by_email", (q) => q.eq("email", args.email))
      .first();
  },
});

// Update Stripe subscription (internal only)
export const updateStripeSubscription = internalMutation({
  args: {
    userId: v.id("users"),
    stripeSubscriptionId: v.optional(v.string()),
    tier: v.union(v.literal("free"), v.literal("pro"), v.literal("team")),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.userId, {
      stripeSubscriptionId: args.stripeSubscriptionId,
      tier: args.tier,
    });
  },
});

// Create user by email (internal only - for API registration without Clerk)
export const createByEmail = internalMutation({
  args: {
    email: v.string(),
    name: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    // Check if user already exists
    const existing = await ctx.db
      .query("users")
      .withIndex("by_email", (q) => q.eq("email", args.email))
      .first();

    if (existing) {
      return existing;
    }

    // Create new user with a placeholder clerkId (api-registered users)
    const userId = await ctx.db.insert("users", {
      clerkId: `api_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`,
      email: args.email,
      name: args.name,
      tier: "free",
      createdAt: Date.now(),
    });

    return await ctx.db.get(userId);
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
