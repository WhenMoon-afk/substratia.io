/**
 * @substratia-io/memory-local
 *
 * Local-first memory infrastructure for AI agents.
 *
 * Features:
 * - Self-Schema: vmPFC-inspired identity model
 * - Reconsolidation: Memory updating during retrieval
 * - Provenance: Full audit trail for all changes
 * - Local-first: SQLite storage with optional cloud sync
 *
 * @example
 * ```typescript
 * import type { Memory, SelfSchema, IdentityCore } from '@substratia-io/memory-local';
 *
 * // Types are pure TypeScript, no runtime dependencies
 * const memory: Memory = {
 *   id: 'mem_01ARZ3NDEKTSV4RRFFQ69G5FAV',
 *   type: 'episodic',
 *   content: 'Deployed first production feature',
 *   importance: 'high',
 *   createdAt: Date.now(),
 *   accessCount: 0,
 *   isConsolidated: false,
 *   schemaVersion: 1,
 * };
 * ```
 *
 * @module
 */

// Re-export all types
export * from "./types/index.js";

// Re-export storage interface
export * from "./storage/index.js";

// Version for runtime checks
export const VERSION = "0.1.0";
