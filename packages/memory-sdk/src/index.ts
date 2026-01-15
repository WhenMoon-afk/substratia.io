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
    options: RequestInit = {}
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
  async add(content: string, options: AddOptions = {}): Promise<{ memoryId: string }> {
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
      `/api/memories/search?${params}`
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

// =============================================================================
// 2-LINE API: Auto-detect API key from environment
// =============================================================================

// Check for API key in environment (works in Node.js)
const getEnvApiKey = (): string | undefined => {
  if (typeof process !== "undefined" && process.env) {
    return process.env.SUBSTRATIA_API_KEY;
  }
  return undefined;
};

// Create default instance if API key is available
const defaultApiKey = getEnvApiKey();
const defaultInstance = defaultApiKey
  ? new Substratia({ apiKey: defaultApiKey })
  : null;

/**
 * Pre-configured memory instance (requires SUBSTRATIA_API_KEY env var)
 *
 * @example
 * ```typescript
 * import { memory } from '@substratia-io/memory'
 * await memory.search("user preferences")
 * ```
 */
export const memory = defaultInstance;

/**
 * Remember something - the simplest way to store a memory
 * Requires SUBSTRATIA_API_KEY environment variable to be set
 *
 * @example
 * ```typescript
 * import { remember } from '@substratia-io/memory'
 * await remember("User prefers dark mode")
 * ```
 *
 * @example With options
 * ```typescript
 * await remember("User is vegetarian", { importance: "high", tags: ["diet"] })
 * ```
 */
export async function remember(
  content: string,
  options: AddOptions = {}
): Promise<{ memoryId: string }> {
  if (!defaultInstance) {
    throw new Error(
      "SUBSTRATIA_API_KEY environment variable not set.\n" +
      "Set it in your environment, or use:\n" +
      "  const memory = new Substratia({ apiKey: 'sk_xxx' })\n" +
      "Get a key at: https://substratia.io/dashboard"
    );
  }
  return defaultInstance.add(content, options);
}

/**
 * Recall memories - search for relevant memories
 * Requires SUBSTRATIA_API_KEY environment variable to be set
 *
 * @example
 * ```typescript
 * import { recall } from '@substratia-io/memory'
 * const memories = await recall("diet preferences")
 * ```
 */
export async function recall(
  query: string,
  options: SearchOptions = {}
): Promise<Memory[]> {
  if (!defaultInstance) {
    throw new Error(
      "SUBSTRATIA_API_KEY environment variable not set.\n" +
      "Set it in your environment, or use:\n" +
      "  const memory = new Substratia({ apiKey: 'sk_xxx' })\n" +
      "Get a key at: https://substratia.io/dashboard"
    );
  }
  return defaultInstance.search(query, options);
}

/**
 * Forget a memory - delete by ID
 * Requires SUBSTRATIA_API_KEY environment variable to be set
 *
 * @example
 * ```typescript
 * import { forget } from '@substratia-io/memory'
 * await forget("memory_id_here")
 * ```
 */
export async function forget(id: string): Promise<void> {
  if (!defaultInstance) {
    throw new Error(
      "SUBSTRATIA_API_KEY environment variable not set.\n" +
      "Set it in your environment, or use:\n" +
      "  const memory = new Substratia({ apiKey: 'sk_xxx' })\n" +
      "Get a key at: https://substratia.io/dashboard"
    );
  }
  return defaultInstance.delete(id);
}

export default Substratia;
