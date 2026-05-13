/**
 * Storage Interface for @substratia/memory-local
 *
 * Defines the contract that storage adapters must implement.
 * The default implementation uses SQLite, but this interface
 * enables alternative backends (IndexedDB, PostgreSQL, etc.)
 */

import type {
  EntityId,
  Memory,
  EpisodicMemory,
  SemanticMemory,
  ProceduralMemory,
  SelfSchema,
  IdentityStatement,
  AutobiographicalNarrative,
  ReconsolidationEvent,
  ProvenanceEntry,
} from "../types/index.js";

// =============================================================================
// QUERY OPTIONS
// =============================================================================

export interface ListOptions {
  /** Maximum number of results */
  limit?: number;

  /** Offset for pagination */
  offset?: number;

  /** Sort field */
  orderBy?: "createdAt" | "lastAccessed" | "accessCount" | "importance";

  /** Sort direction */
  order?: "asc" | "desc";
}

export interface SearchOptions extends ListOptions {
  /** Full-text search query */
  query: string;

  /** Filter by memory types */
  types?: Memory["type"][];

  /** Filter by importance levels */
  importance?: Memory["importance"][];

  /** Filter by tags (OR) */
  tags?: string[];

  /** Minimum access count */
  minAccessCount?: number;

  /** Filter by emotional valence range (for episodic) */
  emotionalRange?: { min: number; max: number };

  /** Include embeddings in results (expensive) */
  includeEmbeddings?: boolean;
}

export interface SnapshotData {
  /** Unique identifier for this snapshot */
  id: EntityId;

  /** Human-readable name */
  name: string;

  /** When this snapshot was created */
  createdAt: number;

  /** Summary of what was happening */
  summary: string;

  /** Full context state */
  context: string;

  /** What to do next */
  nextSteps?: string;

  /** Tags for categorization */
  tags?: string[];
}

// =============================================================================
// STORAGE INTERFACE
// =============================================================================

/**
 * Core storage interface for the memory system.
 *
 * Implementations must be:
 * - Thread-safe (SQLite WAL mode, PostgreSQL, etc.)
 * - Append-only for provenance tables
 * - Atomic for reconsolidation operations
 */
export interface MemoryStorage {
  // ─────────────────────────────────────────────────────────────────────────
  // LIFECYCLE
  // ─────────────────────────────────────────────────────────────────────────

  /** Initialize storage (create tables, run migrations) */
  init(): Promise<void>;

  /** Close storage connection */
  close(): Promise<void>;

  /** Get storage statistics */
  stats(): Promise<StorageStats>;

  // ─────────────────────────────────────────────────────────────────────────
  // MEMORIES (CRUD)
  // ─────────────────────────────────────────────────────────────────────────

  /** Create a new memory */
  createMemory<T extends Memory>(memory: Omit<T, "id">): Promise<T>;

  /** Get a memory by ID */
  getMemory(id: EntityId): Promise<Memory | null>;

  /** Update a memory (triggers reconsolidation tracking) */
  updateMemory(id: EntityId, updates: Partial<Memory>): Promise<Memory>;

  /** Delete a memory (soft delete, preserves provenance) */
  deleteMemory(id: EntityId): Promise<void>;

  /** List memories with filtering */
  listMemories(options?: ListOptions): Promise<Memory[]>;

  /** Full-text search across memories */
  searchMemories(options: SearchOptions): Promise<Memory[]>;

  /** Record that a memory was accessed (increment count, update timestamp) */
  recordAccess(id: EntityId): Promise<void>;

  // ─────────────────────────────────────────────────────────────────────────
  // SELF-SCHEMA
  // ─────────────────────────────────────────────────────────────────────────

  /** Get current self-schema (or null if not initialized) */
  getSelfSchema(): Promise<SelfSchema | null>;

  /** Upsert identity statement */
  upsertIdentity(identity: IdentityStatement): Promise<void>;

  /** Get autobiographical narrative */
  getNarrative(): Promise<AutobiographicalNarrative | null>;

  /** Update autobiographical narrative */
  updateNarrative(narrative: Partial<AutobiographicalNarrative>): Promise<void>;

  // ─────────────────────────────────────────────────────────────────────────
  // RECONSOLIDATION
  // ─────────────────────────────────────────────────────────────────────────

  /** Record a reconsolidation event (memory updating during retrieval) */
  recordReconsolidation(event: Omit<ReconsolidationEvent, "id">): Promise<void>;

  /** Get reconsolidation history for a memory */
  getReconsolidationHistory(
    memoryId: EntityId,
  ): Promise<ReconsolidationEvent[]>;

  // ─────────────────────────────────────────────────────────────────────────
  // PROVENANCE
  // ─────────────────────────────────────────────────────────────────────────

  /** Get full provenance trail for an entity */
  getProvenance(entityId: EntityId): Promise<ProvenanceEntry[]>;

  // ─────────────────────────────────────────────────────────────────────────
  // SNAPSHOTS
  // ─────────────────────────────────────────────────────────────────────────

  /** Save a context snapshot */
  saveSnapshot(snapshot: Omit<SnapshotData, "id">): Promise<SnapshotData>;

  /** Get latest snapshot */
  getLatestSnapshot(): Promise<SnapshotData | null>;

  /** List snapshots */
  listSnapshots(limit?: number): Promise<SnapshotData[]>;

  /** Load a specific snapshot */
  loadSnapshot(id: EntityId): Promise<SnapshotData | null>;

  // ─────────────────────────────────────────────────────────────────────────
  // MAINTENANCE
  // ─────────────────────────────────────────────────────────────────────────

  /** Mark memories as consolidated (after maintenance pass) */
  markConsolidated(ids: EntityId[]): Promise<void>;

  /** Prune old memories based on policy */
  prune(policy: PrunePolicy): Promise<number>;

  /** Vacuum/optimize storage */
  vacuum(): Promise<void>;
}

// =============================================================================
// SUPPORTING TYPES
// =============================================================================

export interface StorageStats {
  /** Total memory count */
  totalMemories: number;

  /** By type */
  byType: Record<Memory["type"], number>;

  /** By importance */
  byImportance: Record<Memory["importance"], number>;

  /** Unconsolidated count */
  unconsolidated: number;

  /** Storage size in bytes (if available) */
  sizeBytes?: number;

  /** Schema version */
  schemaVersion: number;
}

export interface PrunePolicy {
  /** Memories with access_count below this are candidates */
  minAccessCount?: number;

  /** Memories not accessed within this many days are candidates */
  staleAfterDays?: number;

  /** Always keep at least this many memories */
  keepMinimum?: number;

  /** Never delete memories with these importance levels */
  preserveImportance?: Memory["importance"][];

  /** Dry run (count but don't delete) */
  dryRun?: boolean;
}
