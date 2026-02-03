/**
 * SQLite Storage Implementation for @substratia-io/memory-local
 *
 * This is the default storage backend, using better-sqlite3 for
 * synchronous, high-performance local storage.
 *
 * Design principles:
 * - Local-first: All operations complete locally, sync is separate
 * - Append-only provenance: History is never modified
 * - FTS5 search: Full-text search without embedding overhead
 * - WAL mode: Safe concurrent reads with single writer
 *
 * @module
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

import type {
  MemoryStorage,
  StorageStats,
  ListOptions,
  SearchOptions,
  SnapshotData,
  PrunePolicy,
} from "./interface.js";

// =============================================================================
// CONFIGURATION
// =============================================================================

export interface SQLiteStorageConfig {
  /** Path to the SQLite database file */
  dbPath: string;

  /** Enable WAL mode for better concurrency (default: true) */
  walMode?: boolean;

  /** Enable FTS5 full-text search (default: true) */
  enableFts?: boolean;

  /** Schema version (for migrations) */
  schemaVersion?: number;
}

// =============================================================================
// SCHEMA SQL
// =============================================================================

/**
 * Schema version history:
 * - v1: Initial schema (memories, episodic, semantic, procedural, snapshots, provenance)
 */
const SCHEMA_VERSION = 1;

const SCHEMA_SQL = `
-- Enable WAL mode for better concurrency
PRAGMA journal_mode = WAL;
PRAGMA synchronous = NORMAL;
PRAGMA foreign_keys = ON;

-- Schema version tracking
CREATE TABLE IF NOT EXISTS schema_info (
  key TEXT PRIMARY KEY,
  value TEXT NOT NULL
);

-- Base memories table
CREATE TABLE IF NOT EXISTS memories (
  id TEXT PRIMARY KEY,
  type TEXT NOT NULL CHECK(type IN ('episodic', 'semantic', 'procedural')),
  content TEXT NOT NULL,
  context TEXT,
  importance TEXT NOT NULL DEFAULT 'normal' CHECK(importance IN ('critical', 'high', 'normal', 'low')),
  tags TEXT, -- JSON array
  embedding BLOB, -- Vector embedding for semantic search
  created_at INTEGER NOT NULL,
  access_count INTEGER DEFAULT 0,
  last_accessed INTEGER,
  is_consolidated INTEGER DEFAULT 0,
  schema_version INTEGER DEFAULT 1,
  deleted_at INTEGER -- Soft delete timestamp
);

-- Episodic memory extension
CREATE TABLE IF NOT EXISTS episodic_memories (
  id TEXT PRIMARY KEY REFERENCES memories(id) ON DELETE CASCADE,
  event_timestamp INTEGER NOT NULL,
  event_type TEXT NOT NULL,
  participants TEXT, -- JSON array
  location TEXT,
  emotional_valence REAL CHECK(emotional_valence >= -1 AND emotional_valence <= 1),
  emotional_tags TEXT, -- JSON array
  source_conversation_id TEXT,
  source_message_ids TEXT -- JSON array
);

-- Semantic memory extension
CREATE TABLE IF NOT EXISTS semantic_memories (
  id TEXT PRIMARY KEY REFERENCES memories(id) ON DELETE CASCADE,
  domain TEXT NOT NULL,
  confidence REAL DEFAULT 1.0 CHECK(confidence >= 0 AND confidence <= 1),
  source_memory_ids TEXT, -- JSON array of episodic memories this derives from
  contradicts_ids TEXT, -- JSON array of memories this contradicts
  valid_from INTEGER,
  valid_until INTEGER
);

-- Procedural memory extension
CREATE TABLE IF NOT EXISTS procedural_memories (
  id TEXT PRIMARY KEY REFERENCES memories(id) ON DELETE CASCADE,
  skill_name TEXT NOT NULL,
  trigger_conditions TEXT, -- JSON object
  steps TEXT NOT NULL, -- JSON array
  success_count INTEGER DEFAULT 0,
  failure_count INTEGER DEFAULT 0,
  last_success INTEGER,
  last_failure INTEGER,
  avg_duration_ms INTEGER
);

-- Full-text search index (FTS5)
CREATE VIRTUAL TABLE IF NOT EXISTS memories_fts USING fts5(
  content,
  context,
  tags,
  content='memories',
  content_rowid='rowid'
);

-- FTS triggers for automatic sync
CREATE TRIGGER IF NOT EXISTS memories_ai AFTER INSERT ON memories BEGIN
  INSERT INTO memories_fts(rowid, content, context, tags)
  VALUES (NEW.rowid, NEW.content, NEW.context, NEW.tags);
END;

CREATE TRIGGER IF NOT EXISTS memories_ad AFTER DELETE ON memories BEGIN
  INSERT INTO memories_fts(memories_fts, rowid, content, context, tags)
  VALUES ('delete', OLD.rowid, OLD.content, OLD.context, OLD.tags);
END;

CREATE TRIGGER IF NOT EXISTS memories_au AFTER UPDATE ON memories BEGIN
  INSERT INTO memories_fts(memories_fts, rowid, content, context, tags)
  VALUES ('delete', OLD.rowid, OLD.content, OLD.context, OLD.tags);
  INSERT INTO memories_fts(rowid, content, context, tags)
  VALUES (NEW.rowid, NEW.content, NEW.context, NEW.tags);
END;

-- Self-Schema tables
CREATE TABLE IF NOT EXISTS identity_statements (
  id TEXT PRIMARY KEY,
  statement TEXT NOT NULL,
  centrality REAL NOT NULL CHECK(centrality >= 0 AND centrality <= 1),
  confidence REAL NOT NULL CHECK(confidence >= 0 AND confidence <= 1),
  source_memory_ids TEXT NOT NULL, -- JSON array
  established_at INTEGER NOT NULL,
  last_reinforced_at INTEGER
);

-- Snapshots table
CREATE TABLE IF NOT EXISTS snapshots (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  created_at INTEGER NOT NULL,
  summary TEXT NOT NULL,
  context TEXT NOT NULL,
  next_steps TEXT,
  tags TEXT -- JSON array
);

-- Reconsolidation events (append-only)
CREATE TABLE IF NOT EXISTS reconsolidation_events (
  id TEXT PRIMARY KEY,
  memory_id TEXT NOT NULL REFERENCES memories(id),
  triggered_at INTEGER NOT NULL,
  retrieval_context TEXT NOT NULL, -- JSON object
  updates_applied TEXT NOT NULL, -- JSON array
  previous_state TEXT NOT NULL, -- JSON object (full memory before)
  new_state TEXT NOT NULL -- JSON object (full memory after)
);

-- Provenance (append-only audit trail)
CREATE TABLE IF NOT EXISTS provenance (
  id TEXT PRIMARY KEY,
  entity_id TEXT NOT NULL,
  entity_type TEXT NOT NULL,
  event_type TEXT NOT NULL,
  event_data TEXT NOT NULL, -- JSON object
  timestamp INTEGER NOT NULL,
  actor TEXT, -- Who/what made this change
  session_id TEXT -- Link to conversation/session if applicable
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_memories_type ON memories(type);
CREATE INDEX IF NOT EXISTS idx_memories_importance ON memories(importance);
CREATE INDEX IF NOT EXISTS idx_memories_created_at ON memories(created_at);
CREATE INDEX IF NOT EXISTS idx_memories_last_accessed ON memories(last_accessed);
CREATE INDEX IF NOT EXISTS idx_memories_access_count ON memories(access_count);
CREATE INDEX IF NOT EXISTS idx_memories_is_consolidated ON memories(is_consolidated);
CREATE INDEX IF NOT EXISTS idx_memories_deleted_at ON memories(deleted_at);

CREATE INDEX IF NOT EXISTS idx_episodic_event_timestamp ON episodic_memories(event_timestamp);
CREATE INDEX IF NOT EXISTS idx_episodic_event_type ON episodic_memories(event_type);
CREATE INDEX IF NOT EXISTS idx_episodic_emotional_valence ON episodic_memories(emotional_valence);

CREATE INDEX IF NOT EXISTS idx_semantic_domain ON semantic_memories(domain);
CREATE INDEX IF NOT EXISTS idx_semantic_confidence ON semantic_memories(confidence);

CREATE INDEX IF NOT EXISTS idx_procedural_skill_name ON procedural_memories(skill_name);

CREATE INDEX IF NOT EXISTS idx_snapshots_created_at ON snapshots(created_at);

CREATE INDEX IF NOT EXISTS idx_reconsolidation_memory_id ON reconsolidation_events(memory_id);
CREATE INDEX IF NOT EXISTS idx_reconsolidation_triggered_at ON reconsolidation_events(triggered_at);

CREATE INDEX IF NOT EXISTS idx_provenance_entity_id ON provenance(entity_id);
CREATE INDEX IF NOT EXISTS idx_provenance_timestamp ON provenance(timestamp);
`;

// =============================================================================
// IMPLEMENTATION
// =============================================================================

/**
 * SQLite implementation of MemoryStorage.
 *
 * Note: This class requires better-sqlite3 as a peer dependency.
 * It's designed to work with both Node.js and Bun runtimes.
 *
 * @example
 * ```typescript
 * import { SQLiteStorage } from '@substratia-io/memory-local/storage/sqlite';
 *
 * const storage = new SQLiteStorage({ dbPath: './memory.db' });
 * await storage.init();
 *
 * const memory = await storage.createMemory({
 *   type: 'episodic',
 *   content: 'Deployed first feature',
 *   importance: 'high',
 *   eventTimestamp: Date.now(),
 *   eventType: 'task_completion',
 * });
 * ```
 */
export class SQLiteStorage implements MemoryStorage {
  private config: Required<SQLiteStorageConfig>;
  private db: unknown; // better-sqlite3 Database (loaded dynamically)
  private initialized = false;

  constructor(config: SQLiteStorageConfig) {
    this.config = {
      walMode: true,
      enableFts: true,
      schemaVersion: SCHEMA_VERSION,
      ...config,
    };
  }

  // ─────────────────────────────────────────────────────────────────────────
  // LIFECYCLE
  // ─────────────────────────────────────────────────────────────────────────

  async init(): Promise<void> {
    if (this.initialized) return;

    // Dynamic import to support optional peer dependency
    const Database = await this.loadSqliteDriver();
    this.db = new Database(this.config.dbPath);

    // Execute schema
    (this.db as { exec: (sql: string) => void }).exec(SCHEMA_SQL);

    // Set schema version
    this.exec(
      "INSERT OR REPLACE INTO schema_info (key, value) VALUES ('version', ?)",
      [String(this.config.schemaVersion)],
    );

    this.initialized = true;
  }

  async close(): Promise<void> {
    if (
      this.db &&
      typeof (this.db as { close?: () => void }).close === "function"
    ) {
      (this.db as { close: () => void }).close();
    }
    this.initialized = false;
  }

  async stats(): Promise<StorageStats> {
    this.ensureInitialized();

    const total = this.get<{ count: number }>(
      "SELECT COUNT(*) as count FROM memories WHERE deleted_at IS NULL",
    );

    const byType = this.all<{ type: Memory["type"]; count: number }>(
      "SELECT type, COUNT(*) as count FROM memories WHERE deleted_at IS NULL GROUP BY type",
    );

    const byImportance = this.all<{
      importance: Memory["importance"];
      count: number;
    }>(
      "SELECT importance, COUNT(*) as count FROM memories WHERE deleted_at IS NULL GROUP BY importance",
    );

    const unconsolidated = this.get<{ count: number }>(
      "SELECT COUNT(*) as count FROM memories WHERE deleted_at IS NULL AND is_consolidated = 0",
    );

    return {
      totalMemories: total?.count ?? 0,
      byType: Object.fromEntries(
        (["episodic", "semantic", "procedural"] as const).map((t) => [
          t,
          byType.find((r) => r.type === t)?.count ?? 0,
        ]),
      ) as Record<Memory["type"], number>,
      byImportance: Object.fromEntries(
        (["critical", "high", "normal", "low"] as const).map((i) => [
          i,
          byImportance.find((r) => r.importance === i)?.count ?? 0,
        ]),
      ) as Record<Memory["importance"], number>,
      unconsolidated: unconsolidated?.count ?? 0,
      schemaVersion: this.config.schemaVersion,
    };
  }

  // ─────────────────────────────────────────────────────────────────────────
  // MEMORIES (placeholder implementations)
  // ─────────────────────────────────────────────────────────────────────────

  async createMemory<T extends Memory>(_memory: Omit<T, "id">): Promise<T> {
    this.ensureInitialized();
    throw new Error("Not implemented: createMemory");
  }

  async getMemory(_id: EntityId): Promise<Memory | null> {
    this.ensureInitialized();
    throw new Error("Not implemented: getMemory");
  }

  async updateMemory(
    _id: EntityId,
    _updates: Partial<Memory>,
  ): Promise<Memory> {
    this.ensureInitialized();
    throw new Error("Not implemented: updateMemory");
  }

  async deleteMemory(_id: EntityId): Promise<void> {
    this.ensureInitialized();
    throw new Error("Not implemented: deleteMemory");
  }

  async listMemories(_options?: ListOptions): Promise<Memory[]> {
    this.ensureInitialized();
    throw new Error("Not implemented: listMemories");
  }

  async searchMemories(_options: SearchOptions): Promise<Memory[]> {
    this.ensureInitialized();
    throw new Error("Not implemented: searchMemories");
  }

  async recordAccess(_id: EntityId): Promise<void> {
    this.ensureInitialized();
    throw new Error("Not implemented: recordAccess");
  }

  // ─────────────────────────────────────────────────────────────────────────
  // SELF-SCHEMA (placeholder implementations)
  // ─────────────────────────────────────────────────────────────────────────

  async getSelfSchema(): Promise<SelfSchema | null> {
    this.ensureInitialized();
    throw new Error("Not implemented: getSelfSchema");
  }

  async upsertIdentity(_identity: IdentityStatement): Promise<void> {
    this.ensureInitialized();
    throw new Error("Not implemented: upsertIdentity");
  }

  async getNarrative(): Promise<AutobiographicalNarrative | null> {
    this.ensureInitialized();
    throw new Error("Not implemented: getNarrative");
  }

  async updateNarrative(
    _narrative: Partial<AutobiographicalNarrative>,
  ): Promise<void> {
    this.ensureInitialized();
    throw new Error("Not implemented: updateNarrative");
  }

  // ─────────────────────────────────────────────────────────────────────────
  // RECONSOLIDATION (placeholder implementations)
  // ─────────────────────────────────────────────────────────────────────────

  async recordReconsolidation(
    _event: Omit<ReconsolidationEvent, "id">,
  ): Promise<void> {
    this.ensureInitialized();
    throw new Error("Not implemented: recordReconsolidation");
  }

  async getReconsolidationHistory(
    _memoryId: EntityId,
  ): Promise<ReconsolidationEvent[]> {
    this.ensureInitialized();
    throw new Error("Not implemented: getReconsolidationHistory");
  }

  // ─────────────────────────────────────────────────────────────────────────
  // PROVENANCE (placeholder implementations)
  // ─────────────────────────────────────────────────────────────────────────

  async getProvenance(_entityId: EntityId): Promise<ProvenanceEntry[]> {
    this.ensureInitialized();
    throw new Error("Not implemented: getProvenance");
  }

  // ─────────────────────────────────────────────────────────────────────────
  // SNAPSHOTS (placeholder implementations)
  // ─────────────────────────────────────────────────────────────────────────

  async saveSnapshot(
    _snapshot: Omit<SnapshotData, "id">,
  ): Promise<SnapshotData> {
    this.ensureInitialized();
    throw new Error("Not implemented: saveSnapshot");
  }

  async getLatestSnapshot(): Promise<SnapshotData | null> {
    this.ensureInitialized();
    throw new Error("Not implemented: getLatestSnapshot");
  }

  async listSnapshots(_limit?: number): Promise<SnapshotData[]> {
    this.ensureInitialized();
    throw new Error("Not implemented: listSnapshots");
  }

  async loadSnapshot(_id: EntityId): Promise<SnapshotData | null> {
    this.ensureInitialized();
    throw new Error("Not implemented: loadSnapshot");
  }

  // ─────────────────────────────────────────────────────────────────────────
  // MAINTENANCE (placeholder implementations)
  // ─────────────────────────────────────────────────────────────────────────

  async markConsolidated(_ids: EntityId[]): Promise<void> {
    this.ensureInitialized();
    throw new Error("Not implemented: markConsolidated");
  }

  async prune(_policy: PrunePolicy): Promise<number> {
    this.ensureInitialized();
    throw new Error("Not implemented: prune");
  }

  async vacuum(): Promise<void> {
    this.ensureInitialized();
    this.exec("VACUUM");
  }

  // ─────────────────────────────────────────────────────────────────────────
  // PRIVATE HELPERS
  // ─────────────────────────────────────────────────────────────────────────

  private ensureInitialized(): void {
    if (!this.initialized) {
      throw new Error("SQLiteStorage not initialized. Call init() first.");
    }
  }

  private async loadSqliteDriver(): Promise<new (path: string) => unknown> {
    // Use dynamic import strings to avoid TypeScript resolution errors
    // These are resolved at runtime, not compile time
    const drivers = [
      { name: "better-sqlite3", prop: "default" },
      { name: "bun:sqlite", prop: "Database" },
    ];

    for (const driver of drivers) {
      try {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const mod = await (
          Function("m", "return import(m)") as (
            m: string,
          ) => Promise<Record<string, unknown>>
        )(driver.name);
        if (mod[driver.prop]) {
          return mod[driver.prop] as new (path: string) => unknown;
        }
      } catch {
        // Try next driver
      }
    }

    throw new Error(
      "No SQLite driver found. Install better-sqlite3 or use Bun runtime.",
    );
  }

  private exec(sql: string, params?: unknown[]): void {
    const stmt = (
      this.db as {
        prepare: (sql: string) => { run: (...args: unknown[]) => void };
      }
    ).prepare(sql);
    if (params) {
      stmt.run(...params);
    } else {
      stmt.run();
    }
  }

  private get<T>(sql: string, params?: unknown[]): T | undefined {
    const stmt = (
      this.db as {
        prepare: (sql: string) => { get: (...args: unknown[]) => T };
      }
    ).prepare(sql);
    if (params) {
      return stmt.get(...params);
    }
    return stmt.get();
  }

  private all<T>(sql: string, params?: unknown[]): T[] {
    const stmt = (
      this.db as {
        prepare: (sql: string) => { all: (...args: unknown[]) => T[] };
      }
    ).prepare(sql);
    if (params) {
      return stmt.all(...params);
    }
    return stmt.all();
  }
}
