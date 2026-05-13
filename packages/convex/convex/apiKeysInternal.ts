import { v } from "convex/values";
import { internalQuery, internalMutation } from "./_generated/server";

/**
 * Generate a cryptographically secure random string
 */
function generateApiKey(): string {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
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

// Internal mutation to create API key for testing (bypasses auth)
export const createForUser = internalMutation({
  args: {
    userId: v.id("users"),
    name: v.string(),
  },
  handler: async (ctx, args) => {
    const rawKey = `sk_${generateApiKey()}`;
    const hashedKey = await hashApiKey(rawKey);
    const keyPrefix = rawKey.slice(0, 11);

    await ctx.db.insert("apiKeys", {
      userId: args.userId,
      key: hashedKey,
      keyPrefix,
      name: args.name,
      createdAt: Date.now(),
    });

    return { key: rawKey, prefix: keyPrefix };
  },
});

// Internal query to list all users (for testing)
export const listUsers = internalQuery({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("users").collect();
  },
});

// Internal query to list API keys by user (for registration check)
export const listByUser = internalQuery({
  args: {
    userId: v.id("users"),
  },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("apiKeys")
      .withIndex("by_user", (q) => q.eq("userId", args.userId))
      .collect();
  },
});

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
