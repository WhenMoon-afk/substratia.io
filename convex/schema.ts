import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  // User profiles (linked to Clerk auth)
  users: defineTable({
    clerkId: v.string(),
    email: v.string(),
    name: v.optional(v.string()),
    tier: v.union(v.literal("free"), v.literal("pro"), v.literal("team")),
    createdAt: v.number(),
  })
    .index("by_clerk_id", ["clerkId"])
    .index("by_email", ["email"]),

  // Context snapshots (momentum-style)
  snapshots: defineTable({
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
    synced: v.boolean(),
  })
    .index("by_user", ["userId"])
    .index("by_user_project", ["userId", "projectPath"])
    .index("by_created", ["createdAt"]),

  // Persistent memories (memory-mcp style)
  memories: defineTable({
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
    accessCount: v.number(),
    lastAccessed: v.number(),
    createdAt: v.number(),
    synced: v.boolean(),
  })
    .index("by_user", ["userId"])
    .index("by_importance", ["userId", "importance"])
    .index("by_last_accessed", ["lastAccessed"])
    .searchIndex("search_content", {
      searchField: "content",
      filterFields: ["userId"],
    }),

  // Sessions for team collaboration
  sessions: defineTable({
    userId: v.id("users"),
    projectPath: v.string(),
    deviceId: v.string(),
    lastActive: v.number(),
    isActive: v.boolean(),
  })
    .index("by_user", ["userId"])
    .index("by_project", ["projectPath"]),

  // Waitlist entries
  waitlist: defineTable({
    email: v.string(),
    tier: v.union(v.literal("pro"), v.literal("team"), v.literal("enterprise")),
    source: v.optional(v.string()),
    createdAt: v.number(),
  })
    .index("by_email", ["email"])
    .index("by_tier", ["tier"]),

  // API keys for external tool sync (momentum, memory-mcp)
  apiKeys: defineTable({
    userId: v.id("users"),
    key: v.string(), // hashed API key
    keyPrefix: v.string(), // first 8 chars for identification
    name: v.string(), // user-provided name
    lastUsed: v.optional(v.number()),
    createdAt: v.number(),
    revokedAt: v.optional(v.number()),
  })
    .index("by_user", ["userId"])
    .index("by_key", ["key"]),
});
