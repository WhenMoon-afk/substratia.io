import type { Id } from "@substratia/convex/convex/_generated/dataModel";

export interface Snapshot {
  _id: string;
  summary: string;
  projectPath: string;
  context?: string;
  decisions?: string[];
  nextSteps?: string;
  filesTouched?: string[];
  importance: "critical" | "important" | "normal" | "reference";
  createdAt: number;
}

export interface Memory {
  _id: string;
  content: string;
  importance: "critical" | "high" | "normal" | "low";
  accessCount: number;
}

export interface Stats {
  snapshotCount: number;
  memoryCount: number;
  tier: "free" | "pro" | "team";
  memberSince: number;
}

export interface ApiKey {
  _id: string;
  keyPrefix: string;
  name: string;
  lastUsed?: number;
  createdAt: number;
}

export type MemoryId = Id<"memories">;
export type ApiKeyId = Id<"apiKeys">;
