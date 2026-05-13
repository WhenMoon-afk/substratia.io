/**
 * @substratia/memory
 *
 * Unified memory infrastructure for AI agents.
 *
 * Features:
 * - Self-Schema: vmPFC-inspired identity model
 * - Reconsolidation: Memory updating during retrieval
 * - Provenance: Full audit trail for all changes
 * - Local-first: SQLite storage with optional cloud sync
 * - Cloud: HTTP SDK for Substratia cloud API
 * - CLI: Command-line interface for memory operations
 *
 * @example Local-first types
 * ```typescript
 * import type { Memory, SelfSchema } from '@substratia/memory';
 *
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
 * @example Cloud SDK
 * ```typescript
 * import { Substratia, remember, recall } from '@substratia/memory';
 *
 * // Via class
 * const client = new Substratia({ apiKey: 'sk_xxx' });
 * await client.add("User prefers dark mode");
 *
 * // Via convenience functions (uses SUBSTRATIA_API_KEY env var)
 * await remember("User prefers dark mode");
 * const memories = await recall("preferences");
 * ```
 *
 * @module
 */

// Re-export all types
export * from "./types/index.js";

// Re-export storage interface
export * from "./storage/index.js";

// Re-export cloud SDK for backwards compatibility with @substratia/memory
export { Substratia, remember, recall, forget, memory } from "./cloud/index.js";
export type {
  CloudMemory,
  SubstratiaConfig,
  AddOptions,
} from "./cloud/index.js";
// Note: Cloud SearchOptions and ListOptions are NOT re-exported here to avoid
// shadowing the storage module's types with the same names. Import cloud-specific
// types from '@substratia/memory/cloud'.

// Re-export dashboard
export { startDashboard, DASHBOARD_HTML } from "./dashboard/index.js";
export type { DashboardOptions } from "./dashboard/index.js";

// Re-export share (portable memory panel)
export { generatePanel, shareToFile } from "./share/index.js";
export type { ShareOptions, PanelData } from "./share/index.js";

// Version for runtime checks
export const VERSION = "0.1.1";
