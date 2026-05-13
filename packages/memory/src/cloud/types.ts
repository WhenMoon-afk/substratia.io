export type Importance = "critical" | "high" | "normal" | "low";

export interface CloudMemory {
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
  /** API base URL (default: https://aware-pony-419.convex.site) */
  baseUrl?: string;
}
