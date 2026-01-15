import { v } from "convex/values";
import { mutation, query, internalMutation } from "./_generated/server";

/**
 * Generate a cryptographically secure random string
 * Uses Web Crypto API available in Convex runtime
 */
function generateApiKey(): string {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const array = new Uint8Array(32);
  crypto.getRandomValues(array);
  return Array.from(array, (byte) => chars[byte % chars.length]).join("");
}

/**
 * Hash an API key using SHA-256
 */
async function hashApiKey(key: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(key);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
}

// Create a new API key
export const create = mutation({
  args: {
    name: v.string(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Not authenticated");

    const user = await ctx.db
      .query("users")
      .withIndex("by_clerk_id", (q) => q.eq("clerkId", identity.subject))
      .first();

    if (!user) throw new Error("User not found");

    // Generate new API key
    const rawKey = `sk_${generateApiKey()}`;
    const hashedKey = await hashApiKey(rawKey);
    const keyPrefix = rawKey.slice(0, 11); // "sk_" + first 8 chars

    // Store hashed key
    await ctx.db.insert("apiKeys", {
      userId: user._id,
      key: hashedKey,
      keyPrefix,
      name: args.name,
      createdAt: Date.now(),
    });

    // Return the raw key ONLY ONCE - user must save it
    return {
      key: rawKey,
      prefix: keyPrefix,
      name: args.name,
    };
  },
});

// List user's API keys (without the actual key values)
export const list = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) return [];

    const user = await ctx.db
      .query("users")
      .withIndex("by_clerk_id", (q) => q.eq("clerkId", identity.subject))
      .first();

    if (!user) return [];

    const keys = await ctx.db
      .query("apiKeys")
      .withIndex("by_user", (q) => q.eq("userId", user._id))
      .collect();

    // Filter out revoked keys and don't return the actual key hash
    return keys
      .filter((k) => !k.revokedAt)
      .map((k) => ({
        _id: k._id,
        keyPrefix: k.keyPrefix,
        name: k.name,
        lastUsed: k.lastUsed,
        createdAt: k.createdAt,
      }));
  },
});

// Revoke an API key
export const revoke = mutation({
  args: {
    keyId: v.id("apiKeys"),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Not authenticated");

    const user = await ctx.db
      .query("users")
      .withIndex("by_clerk_id", (q) => q.eq("clerkId", identity.subject))
      .first();

    if (!user) throw new Error("User not found");

    const key = await ctx.db.get(args.keyId);
    if (!key || key.userId !== user._id) {
      throw new Error("API key not found");
    }

    await ctx.db.patch(args.keyId, { revokedAt: Date.now() });
  },
});

// Internal mutation to update lastUsed timestamp
export const updateLastUsed = internalMutation({
  args: {
    keyId: v.id("apiKeys"),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.keyId, { lastUsed: Date.now() });
  },
});

// Validate an API key and return the user (for HTTP actions)
export const validateKey = async (
  ctx: { db: any },
  rawKey: string
): Promise<{ userId: any; keyId: any } | null> => {
  const hashedKey = await hashApiKey(rawKey);

  const apiKey = await ctx.db
    .query("apiKeys")
    .withIndex("by_key", (q: any) => q.eq("key", hashedKey))
    .first();

  if (!apiKey || apiKey.revokedAt) {
    return null;
  }

  return {
    userId: apiKey.userId,
    keyId: apiKey._id,
  };
};
