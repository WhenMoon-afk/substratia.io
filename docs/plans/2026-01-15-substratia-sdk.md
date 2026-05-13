# Substratia SDK Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build `@substratia/memory` SDK - "3 lines of code" memory for any AI system.

**Architecture:** Thin HTTP wrapper around Convex API. Same backend as MCP plugins.

**Tech Stack:** TypeScript, fetch API, npm package

---

## Task 1: Add Internal Query Functions to Convex

**Files:**

- Modify: `packages/convex/convex/memoriesInternal.ts`

**Step 1: Add list, get, search, and delete functions**

Add these to `memoriesInternal.ts`:

```typescript
import { v } from "convex/values";
import { internalMutation, internalQuery } from "./_generated/server";

// Existing insertFromApi stays as-is...

// Get all memories for a user with optional filters
export const listByUser = internalQuery({
  args: {
    userId: v.id("users"),
    limit: v.optional(v.number()),
    importance: v.optional(
      v.union(
        v.literal("critical"),
        v.literal("high"),
        v.literal("normal"),
        v.literal("low"),
      ),
    ),
  },
  handler: async (ctx, args) => {
    let query = ctx.db
      .query("memories")
      .withIndex("by_user", (q) => q.eq("userId", args.userId))
      .order("desc");

    const memories = await query.collect();

    let filtered = memories;
    if (args.importance) {
      filtered = memories.filter((m) => m.importance === args.importance);
    }

    if (args.limit) {
      filtered = filtered.slice(0, args.limit);
    }

    return filtered;
  },
});

// Get a single memory by ID
export const getById = internalQuery({
  args: {
    memoryId: v.id("memories"),
    userId: v.id("users"),
  },
  handler: async (ctx, args) => {
    const memory = await ctx.db.get(args.memoryId);
    if (!memory || memory.userId !== args.userId) {
      return null;
    }
    return memory;
  },
});

// Search memories using full-text search
export const searchByContent = internalQuery({
  args: {
    userId: v.id("users"),
    query: v.string(),
    limit: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const results = await ctx.db
      .query("memories")
      .withSearchIndex("search_content", (q) =>
        q.search("content", args.query).eq("userId", args.userId),
      )
      .take(args.limit || 10);

    return results;
  },
});

// Delete a memory
export const deleteById = internalMutation({
  args: {
    memoryId: v.id("memories"),
    userId: v.id("users"),
  },
  handler: async (ctx, args) => {
    const memory = await ctx.db.get(args.memoryId);
    if (!memory || memory.userId !== args.userId) {
      return { success: false, error: "Memory not found" };
    }
    await ctx.db.delete(args.memoryId);
    return { success: true };
  },
});
```

**Step 2: Verify no TypeScript errors**

Run: `cd /home/local-user/Github/company-overseer/repos/substratia.io/packages/convex && npx tsc --noEmit`

---

## Task 2: Add HTTP Endpoints for SDK

**Files:**

- Modify: `packages/convex/convex/http.ts`

**Step 1: Add GET /api/memories endpoint (list)**

Add after the existing bulk-sync route:

```typescript
// List memories for SDK
http.route({
  path: "/api/memories",
  method: "GET",
  handler: httpAction(async (ctx, request) => {
    const auth = await validateApiKey(ctx, request);
    if (!auth) {
      return new Response(JSON.stringify({ error: "Invalid API key" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
    }

    const url = new URL(request.url);
    const limit = parseInt(url.searchParams.get("limit") || "50");
    const importance = url.searchParams.get("importance") as any;

    try {
      const memories = await ctx.runQuery(
        internal.memoriesInternal.listByUser,
        {
          userId: auth.userId,
          limit: Math.min(limit, 100),
          importance: importance || undefined,
        },
      );

      return new Response(JSON.stringify({ memories }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    } catch (error) {
      console.error("Failed to list memories:", error);
      return new Response(
        JSON.stringify({ error: "Failed to list memories" }),
        { status: 500, headers: { "Content-Type": "application/json" } },
      );
    }
  }),
});
```

**Step 2: Add GET /api/memories/search endpoint**

```typescript
// Search memories for SDK
http.route({
  path: "/api/memories/search",
  method: "GET",
  handler: httpAction(async (ctx, request) => {
    const auth = await validateApiKey(ctx, request);
    if (!auth) {
      return new Response(JSON.stringify({ error: "Invalid API key" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
    }

    const url = new URL(request.url);
    const query = url.searchParams.get("q");
    const limit = parseInt(url.searchParams.get("limit") || "10");

    if (!query) {
      return new Response(
        JSON.stringify({ error: "Missing required parameter: q" }),
        { status: 400, headers: { "Content-Type": "application/json" } },
      );
    }

    try {
      const memories = await ctx.runQuery(
        internal.memoriesInternal.searchByContent,
        {
          userId: auth.userId,
          query,
          limit: Math.min(limit, 50),
        },
      );

      return new Response(JSON.stringify({ memories }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    } catch (error) {
      console.error("Failed to search memories:", error);
      return new Response(
        JSON.stringify({ error: "Failed to search memories" }),
        { status: 500, headers: { "Content-Type": "application/json" } },
      );
    }
  }),
});
```

**Step 3: Add DELETE /api/memories/:id endpoint**

Note: Convex HTTP router doesn't support path params, so we'll use query param.

```typescript
// Delete a memory for SDK
http.route({
  path: "/api/memories/delete",
  method: "POST",
  handler: httpAction(async (ctx, request) => {
    const auth = await validateApiKey(ctx, request);
    if (!auth) {
      return new Response(JSON.stringify({ error: "Invalid API key" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
    }

    let body;
    try {
      body = await request.json();
    } catch {
      return new Response(JSON.stringify({ error: "Invalid JSON" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const { id } = body;
    if (!id) {
      return new Response(
        JSON.stringify({ error: "Missing required field: id" }),
        { status: 400, headers: { "Content-Type": "application/json" } },
      );
    }

    try {
      const result = await ctx.runMutation(
        internal.memoriesInternal.deleteById,
        {
          memoryId: id,
          userId: auth.userId,
        },
      );

      if (!result.success) {
        return new Response(JSON.stringify({ error: result.error }), {
          status: 404,
          headers: { "Content-Type": "application/json" },
        });
      }

      return new Response(JSON.stringify({ success: true }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    } catch (error) {
      console.error("Failed to delete memory:", error);
      return new Response(
        JSON.stringify({ error: "Failed to delete memory" }),
        { status: 500, headers: { "Content-Type": "application/json" } },
      );
    }
  }),
});
```

**Step 4: Deploy Convex changes**

Run: `cd /home/local-user/Github/company-overseer/repos/substratia.io/packages/convex && npx convex deploy`

---

## Task 3: Create SDK Package

**Files:**

- Create: `packages/memory-sdk/package.json`
- Create: `packages/memory-sdk/tsconfig.json`
- Create: `packages/memory-sdk/src/index.ts`
- Create: `packages/memory-sdk/src/types.ts`

**Step 1: Create package.json**

```json
{
  "name": "@substratia/memory",
  "version": "0.1.0",
  "description": "Memory for AI - 3 lines of code to add persistent memory to any AI system",
  "type": "module",
  "main": "./dist/index.js",
  "types": "./dist/index.d.ts",
  "exports": {
    ".": {
      "import": "./dist/index.js",
      "types": "./dist/index.d.ts"
    }
  },
  "files": ["dist/", "README.md", "LICENSE"],
  "scripts": {
    "build": "tsc",
    "prepublishOnly": "npm run build"
  },
  "keywords": [
    "ai",
    "memory",
    "llm",
    "context",
    "claude",
    "openai",
    "gemini",
    "persistent-memory"
  ],
  "author": "Substratia",
  "license": "MIT",
  "repository": {
    "type": "git",
    "url": "git+https://github.com/WhenMoon-afk/substratia.git"
  },
  "homepage": "https://substratia.io",
  "engines": {
    "node": ">=18.0.0"
  }
}
```

**Step 2: Create tsconfig.json**

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "NodeNext",
    "moduleResolution": "NodeNext",
    "declaration": true,
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist"]
}
```

**Step 3: Create src/types.ts**

```typescript
export type Importance = "critical" | "high" | "normal" | "low";

export interface Memory {
  _id: string;
  content: string;
  context?: string;
  importance: Importance;
  tags?: string[];
  accessCount: number;
  lastAccessed: number;
  createdAt: number;
}

export interface AddOptions {
  /** Context or additional info about this memory */
  context?: string;
  /** Importance level: critical, high, normal, low */
  importance?: Importance;
  /** Tags for categorization */
  tags?: string[];
}

export interface SearchOptions {
  /** Maximum results to return (default: 10, max: 50) */
  limit?: number;
}

export interface ListOptions {
  /** Maximum results to return (default: 50, max: 100) */
  limit?: number;
  /** Filter by importance level */
  importance?: Importance;
}

export interface SubstratiaConfig {
  /** Your Substratia API key (starts with sk_) */
  apiKey: string;
  /** API base URL (default: https://agreeable-chameleon-83.convex.site) */
  baseUrl?: string;
}
```

**Step 4: Create src/index.ts**

```typescript
import type {
  Memory,
  AddOptions,
  SearchOptions,
  ListOptions,
  SubstratiaConfig,
} from "./types.js";

export type {
  Memory,
  AddOptions,
  SearchOptions,
  ListOptions,
  SubstratiaConfig,
  Importance,
} from "./types.js";

const DEFAULT_BASE_URL = "https://agreeable-chameleon-83.convex.site";

export class Substratia {
  private apiKey: string;
  private baseUrl: string;

  constructor(config: SubstratiaConfig) {
    if (!config.apiKey) {
      throw new Error("API key is required");
    }
    if (!config.apiKey.startsWith("sk_")) {
      throw new Error("Invalid API key format (must start with sk_)");
    }
    this.apiKey = config.apiKey;
    this.baseUrl = config.baseUrl || DEFAULT_BASE_URL;
  }

  private async request<T>(
    path: string,
    options: RequestInit = {},
  ): Promise<T> {
    const url = `${this.baseUrl}${path}`;
    const response = await fetch(url, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.apiKey}`,
        ...options.headers,
      },
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      throw new Error(error.error || `HTTP ${response.status}`);
    }

    return response.json();
  }

  /**
   * Add a memory
   * @param content - The content to remember
   * @param options - Optional settings (context, importance, tags)
   * @returns The created memory with ID
   */
  async add(
    content: string,
    options: AddOptions = {},
  ): Promise<{ memoryId: string }> {
    return this.request<{ memoryId: string }>("/api/memories/sync", {
      method: "POST",
      body: JSON.stringify({
        content,
        context: options.context,
        importance: options.importance || "normal",
        tags: options.tags,
        createdAt: Date.now(),
      }),
    });
  }

  /**
   * Search memories by content
   * @param query - Search query
   * @param options - Optional settings (limit)
   * @returns Array of matching memories
   */
  async search(query: string, options: SearchOptions = {}): Promise<Memory[]> {
    const params = new URLSearchParams({ q: query });
    if (options.limit) params.set("limit", String(options.limit));

    const result = await this.request<{ memories: Memory[] }>(
      `/api/memories/search?${params}`,
    );
    return result.memories;
  }

  /**
   * List all memories
   * @param options - Optional filters (limit, importance)
   * @returns Array of memories
   */
  async list(options: ListOptions = {}): Promise<Memory[]> {
    const params = new URLSearchParams();
    if (options.limit) params.set("limit", String(options.limit));
    if (options.importance) params.set("importance", options.importance);

    const queryString = params.toString();
    const path = queryString ? `/api/memories?${queryString}` : "/api/memories";

    const result = await this.request<{ memories: Memory[] }>(path);
    return result.memories;
  }

  /**
   * Delete a memory by ID
   * @param id - Memory ID to delete
   */
  async delete(id: string): Promise<void> {
    await this.request<{ success: boolean }>("/api/memories/delete", {
      method: "POST",
      body: JSON.stringify({ id }),
    });
  }
}

export default Substratia;
```

**Step 5: Create README.md**

````markdown
# @substratia/memory

Memory for AI - add persistent memory to any AI system in 3 lines of code.

## Quick Start

```typescript
import { Substratia } from "@substratia/memory";

const memory = new Substratia({ apiKey: "sk_your_key_here" });
await memory.add("User prefers dark mode");
```
````

## Installation

```bash
npm install @substratia/memory
```

## Get an API Key

1. Sign up at [substratia.io](https://substratia.io)
2. Go to Dashboard → API Keys
3. Create a new key

## Usage

### Add a Memory

```typescript
await memory.add("User is vegetarian", {
  importance: "high",
  tags: ["preferences", "diet"],
});
```

### Search Memories

```typescript
const results = await memory.search("diet preferences");
// Returns memories matching the search query
```

### List All Memories

```typescript
const all = await memory.list({ limit: 20 });
const critical = await memory.list({ importance: "critical" });
```

### Delete a Memory

```typescript
await memory.delete("memory_id_here");
```

## API Reference

### `new Substratia(config)`

| Option    | Type   | Required | Description                     |
| --------- | ------ | -------- | ------------------------------- |
| `apiKey`  | string | Yes      | Your API key (starts with sk\_) |
| `baseUrl` | string | No       | Custom API URL                  |

### `add(content, options?)`

| Option       | Type     | Default  | Description                 |
| ------------ | -------- | -------- | --------------------------- |
| `context`    | string   | -        | Additional context          |
| `importance` | string   | "normal" | critical, high, normal, low |
| `tags`       | string[] | -        | Categorization tags         |

### `search(query, options?)`

| Option  | Type   | Default | Description          |
| ------- | ------ | ------- | -------------------- |
| `limit` | number | 10      | Max results (max 50) |

### `list(options?)`

| Option       | Type   | Default | Description           |
| ------------ | ------ | ------- | --------------------- |
| `limit`      | number | 50      | Max results (max 100) |
| `importance` | string | -       | Filter by importance  |

### `delete(id)`

Deletes a memory by ID.

## Works With Any AI

- OpenAI / ChatGPT
- Anthropic / Claude
- Google / Gemini
- Local LLMs (Ollama, etc.)
- Custom agents

## Links

- [Documentation](https://substratia.io/docs)
- [Dashboard](https://substratia.io/dashboard)
- [GitHub](https://github.com/WhenMoon-afk/substratia)

## License

MIT

````

**Step 6: Build and verify**

Run:
```bash
cd /home/local-user/Github/company-overseer/repos/substratia.io/packages/memory-sdk
npm install
npm run build
````

---

## Task 4: Test End-to-End

**Step 1: Create test script**

Create `packages/memory-sdk/test.ts`:

```typescript
import { Substratia } from "./src/index.js";

const API_KEY = process.env.SUBSTRATIA_API_KEY;

if (!API_KEY) {
  console.error("Set SUBSTRATIA_API_KEY environment variable");
  process.exit(1);
}

async function test() {
  const memory = new Substratia({ apiKey: API_KEY });

  console.log("1. Adding memory...");
  const { memoryId } = await memory.add("Test memory from SDK", {
    importance: "normal",
    tags: ["test", "sdk"],
  });
  console.log("   Created:", memoryId);

  console.log("2. Listing memories...");
  const all = await memory.list({ limit: 5 });
  console.log("   Found:", all.length, "memories");

  console.log("3. Searching memories...");
  const results = await memory.search("test");
  console.log("   Found:", results.length, "matches");

  console.log("4. Deleting test memory...");
  await memory.delete(memoryId);
  console.log("   Deleted");

  console.log("\n✅ All tests passed!");
}

test().catch(console.error);
```

**Step 2: Run test**

Run:

```bash
cd /home/local-user/Github/company-overseer/repos/substratia.io/packages/memory-sdk
SUBSTRATIA_API_KEY=sk_your_key npx tsx test.ts
```

---

## Task 5: Commit and Publish

**Step 1: Commit Convex changes**

```bash
cd /home/local-user/Github/company-overseer/repos/substratia.io
git add packages/convex/convex/memoriesInternal.ts packages/convex/convex/http.ts
git commit -m "feat: add GET/DELETE endpoints for SDK"
```

**Step 2: Commit SDK package**

```bash
git add packages/memory-sdk/
git commit -m "feat: add @substratia/memory SDK package"
```

**Step 3: Publish to npm (when ready)**

```bash
cd packages/memory-sdk
npm publish --access public
```

---

## Summary

After completing all tasks:

```typescript
// This now works:
import { Substratia } from "@substratia/memory";

const memory = new Substratia({ apiKey: "sk_xxx" });
await memory.add("User prefers dark mode");
```

**Endpoints added:**

- GET /api/memories - List memories
- GET /api/memories/search - Search memories
- POST /api/memories/delete - Delete memory

**Package created:**

- @substratia/memory - Thin HTTP wrapper (~150 lines)
