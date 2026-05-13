/**
 * Shared types from @substratia/shared
 *
 * These types are used by both the web app and backend (Convex schema).
 * The Memory type is renamed to SharedMemory to avoid collision with
 * the local-first Memory type from self-schema.ts.
 *
 * @module
 */

// Types from Convex schema that both apps use

export type UserTier = "free" | "pro" | "team";
export type SnapshotImportance =
  | "critical"
  | "important"
  | "normal"
  | "reference";
export type MemoryImportance = "critical" | "high" | "normal" | "low";

export interface Snapshot {
  _id: string;
  summary: string;
  projectPath: string;
  context: string;
  decisions?: string[];
  nextSteps?: string;
  filesTouched?: string[];
  importance: SnapshotImportance;
  createdAt: number;
  synced: boolean;
}

export interface SharedMemory {
  _id: string;
  content: string;
  context?: string;
  importance: MemoryImportance;
  tags?: string[];
  accessCount: number;
  lastAccessed: number;
  createdAt: number;
  synced: boolean;
}

export interface UserStats {
  snapshotCount: number;
  memoryCount: number;
  tier: UserTier;
  memberSince: number;
}

export interface ApiKey {
  _id: string;
  keyPrefix: string;
  name: string;
  lastUsed?: number;
  createdAt: number;
}

// Brand colors
export const BRAND_COLORS = {
  forgeDark: "#1a1a2e",
  forgePurple: "#7c3aed",
  forgeCyan: "#00d4ff",
} as const;
