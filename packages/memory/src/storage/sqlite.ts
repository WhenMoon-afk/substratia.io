/**
 * SQLite Storage Implementation for @substratia/memory-local
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

import { ulid } from "../utils/ulid.js";

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
 * import { SQLiteStorage } from '@substratia/memory-local/storage/sqlite';
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
  // MEMORIES
  // ─────────────────────────────────────────────────────────────────────────

  async createMemory<T extends Memory>(memory: Omit<T, "id">): Promise<T> {
    this.ensureInitialized();

    const id = ulid("mem");
    const now = Date.now();

    // Insert base memory
    this.exec(
      `INSERT INTO memories (id, type, content, context, importance, tags, embedding, created_at, access_count, is_consolidated, schema_version)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, 0, 0, 1)`,
      [
        id,
        memory.type,
        memory.content,
        memory.context ?? null,
        memory.importance,
        memory.tags ? JSON.stringify(memory.tags) : null,
        memory.embedding
          ? Buffer.from(new Float32Array(memory.embedding).buffer)
          : null,
        memory.createdAt ?? now,
      ],
    );

    // Insert type-specific extension
    if (memory.type === "episodic") {
      const ep = memory as unknown as Omit<EpisodicMemory, "id">;
      this.exec(
        `INSERT INTO episodic_memories (id, event_timestamp, event_type, participants, location, emotional_valence, emotional_tags, source_conversation_id, source_message_ids)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          id,
          ep.eventTimestamp,
          ep.eventType,
          ep.participants ? JSON.stringify(ep.participants) : null,
          ep.location ?? null,
          ep.emotionalValence ?? null,
          ep.emotionalTags ? JSON.stringify(ep.emotionalTags) : null,
          ep.sourceConversationId ?? null,
          ep.sourceMessageIds ? JSON.stringify(ep.sourceMessageIds) : null,
        ],
      );
    } else if (memory.type === "semantic") {
      const sem = memory as unknown as Omit<SemanticMemory, "id">;
      this.exec(
        `INSERT INTO semantic_memories (id, domain, confidence, source_memory_ids, contradicts_ids, valid_from, valid_until)
         VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [
          id,
          sem.domain,
          sem.confidence ?? 1.0,
          sem.sourceMemoryIds ? JSON.stringify(sem.sourceMemoryIds) : null,
          sem.contradictsIds ? JSON.stringify(sem.contradictsIds) : null,
          sem.validFrom ?? null,
          sem.validUntil ?? null,
        ],
      );
    } else if (memory.type === "procedural") {
      const proc = memory as unknown as Omit<ProceduralMemory, "id">;
      this.exec(
        `INSERT INTO procedural_memories (id, skill_name, trigger_conditions, steps, success_count, failure_count, last_success, last_failure, avg_duration_ms)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          id,
          proc.skillName,
          proc.triggerConditions
            ? JSON.stringify(proc.triggerConditions)
            : null,
          JSON.stringify(proc.steps),
          proc.successCount ?? 0,
          proc.failureCount ?? 0,
          proc.lastSuccess ?? null,
          proc.lastFailure ?? null,
          proc.avgDurationMs ?? null,
        ],
      );
    }

    // Record provenance
    this.recordProvenance(id, "memory", "created", { type: memory.type });

    return { ...memory, id } as T;
  }

  async getMemory(id: EntityId): Promise<Memory | null> {
    this.ensureInitialized();

    // Get base memory
    const base = this.get<{
      id: string;
      type: Memory["type"];
      content: string;
      context: string | null;
      importance: Memory["importance"];
      tags: string | null;
      embedding: Buffer | null;
      created_at: number;
      access_count: number;
      last_accessed: number | null;
      is_consolidated: number;
      schema_version: number;
      deleted_at: number | null;
    }>("SELECT * FROM memories WHERE id = ? AND deleted_at IS NULL", [id]);

    if (!base) return null;

    // Build base memory object
    const memory: Partial<Memory> = {
      id: base.id,
      type: base.type,
      content: base.content,
      context: base.context ?? undefined,
      importance: base.importance,
      tags: base.tags ? JSON.parse(base.tags) : undefined,
      embedding: base.embedding
        ? Array.from(new Float32Array(base.embedding.buffer))
        : undefined,
      createdAt: base.created_at,
      accessCount: base.access_count,
      lastAccessed: base.last_accessed ?? undefined,
      isConsolidated: base.is_consolidated === 1,
      schemaVersion: base.schema_version,
    };

    // Get type-specific extension
    if (base.type === "episodic") {
      const ext = this.get<{
        event_timestamp: number;
        event_type: string;
        participants: string | null;
        location: string | null;
        emotional_valence: number | null;
        emotional_tags: string | null;
        source_conversation_id: string | null;
        source_message_ids: string | null;
      }>("SELECT * FROM episodic_memories WHERE id = ?", [id]);

      if (ext) {
        return {
          ...memory,
          type: "episodic",
          eventTimestamp: ext.event_timestamp,
          eventType: ext.event_type,
          participants: ext.participants
            ? JSON.parse(ext.participants)
            : undefined,
          location: ext.location ?? undefined,
          emotionalValence: ext.emotional_valence ?? undefined,
          emotionalTags: ext.emotional_tags
            ? JSON.parse(ext.emotional_tags)
            : undefined,
          sourceConversationId: ext.source_conversation_id ?? undefined,
          sourceMessageIds: ext.source_message_ids
            ? JSON.parse(ext.source_message_ids)
            : undefined,
        } as EpisodicMemory;
      }
    } else if (base.type === "semantic") {
      const ext = this.get<{
        domain: string;
        confidence: number;
        source_memory_ids: string | null;
        contradicts_ids: string | null;
        valid_from: number | null;
        valid_until: number | null;
      }>("SELECT * FROM semantic_memories WHERE id = ?", [id]);

      if (ext) {
        return {
          ...memory,
          type: "semantic",
          domain: ext.domain,
          confidence: ext.confidence,
          sourceMemoryIds: ext.source_memory_ids
            ? JSON.parse(ext.source_memory_ids)
            : undefined,
          contradictsIds: ext.contradicts_ids
            ? JSON.parse(ext.contradicts_ids)
            : undefined,
          validFrom: ext.valid_from ?? undefined,
          validUntil: ext.valid_until ?? undefined,
        } as SemanticMemory;
      }
    } else if (base.type === "procedural") {
      const ext = this.get<{
        skill_name: string;
        trigger_conditions: string | null;
        steps: string;
        success_count: number;
        failure_count: number;
        last_success: number | null;
        last_failure: number | null;
        avg_duration_ms: number | null;
      }>("SELECT * FROM procedural_memories WHERE id = ?", [id]);

      if (ext) {
        return {
          ...memory,
          type: "procedural",
          skillName: ext.skill_name,
          triggerConditions: ext.trigger_conditions
            ? JSON.parse(ext.trigger_conditions)
            : undefined,
          steps: JSON.parse(ext.steps),
          successCount: ext.success_count,
          failureCount: ext.failure_count,
          lastSuccess: ext.last_success ?? undefined,
          lastFailure: ext.last_failure ?? undefined,
          avgDurationMs: ext.avg_duration_ms ?? undefined,
        } as ProceduralMemory;
      }
    }

    return memory as Memory;
  }

  async updateMemory(id: EntityId, updates: Partial<Memory>): Promise<Memory> {
    this.ensureInitialized();

    const existing = await this.getMemory(id);
    if (!existing) {
      throw new Error(`Memory not found: ${id}`);
    }

    // Update base memory fields
    const allowedFields = [
      "content",
      "context",
      "importance",
      "tags",
      "embedding",
    ];
    const setClause: string[] = [];
    const params: unknown[] = [];

    for (const field of allowedFields) {
      if (field in updates) {
        const value = updates[field as keyof typeof updates];
        if (field === "tags") {
          setClause.push("tags = ?");
          params.push(value ? JSON.stringify(value) : null);
        } else if (field === "embedding") {
          setClause.push("embedding = ?");
          params.push(
            value
              ? Buffer.from(new Float32Array(value as number[]).buffer)
              : null,
          );
        } else {
          setClause.push(`${field} = ?`);
          params.push(value ?? null);
        }
      }
    }

    if (setClause.length > 0) {
      params.push(id);
      this.exec(
        `UPDATE memories SET ${setClause.join(", ")} WHERE id = ?`,
        params,
      );
    }

    // Record provenance
    this.recordProvenance(id, "memory", "updated", {
      fields: Object.keys(updates),
    });

    return (await this.getMemory(id))!;
  }

  async deleteMemory(id: EntityId): Promise<void> {
    this.ensureInitialized();

    // Soft delete
    this.exec("UPDATE memories SET deleted_at = ? WHERE id = ?", [
      Date.now(),
      id,
    ]);

    // Record provenance
    this.recordProvenance(id, "memory", "deleted", {});
  }

  async listMemories(options?: ListOptions): Promise<Memory[]> {
    this.ensureInitialized();

    const limit = options?.limit ?? 100;
    const offset = options?.offset ?? 0;
    const orderBy = options?.orderBy ?? "createdAt";
    const order = options?.order ?? "desc";

    // Map field names to SQL columns
    const columnMap: Record<string, string> = {
      createdAt: "created_at",
      lastAccessed: "last_accessed",
      accessCount: "access_count",
      importance: "importance",
    };

    const sql = `
      SELECT id FROM memories
      WHERE deleted_at IS NULL
      ORDER BY ${columnMap[orderBy] ?? "created_at"} ${order.toUpperCase()}
      LIMIT ? OFFSET ?
    `;

    const rows = this.all<{ id: string }>(sql, [limit, offset]);
    const memories: Memory[] = [];

    for (const row of rows) {
      const memory = await this.getMemory(row.id);
      if (memory) memories.push(memory);
    }

    return memories;
  }

  async searchMemories(options: SearchOptions): Promise<Memory[]> {
    this.ensureInitialized();

    const limit = options.limit ?? 100;
    const offset = options.offset ?? 0;

    // Use FTS5 for full-text search
    const sql = `
      SELECT m.id, bm25(memories_fts) as rank
      FROM memories_fts
      JOIN memories m ON m.rowid = memories_fts.rowid
      WHERE memories_fts MATCH ?
        AND m.deleted_at IS NULL
        ${options.types?.length ? `AND m.type IN (${options.types.map(() => "?").join(",")})` : ""}
        ${options.importance?.length ? `AND m.importance IN (${options.importance.map(() => "?").join(",")})` : ""}
        ${options.minAccessCount ? "AND m.access_count >= ?" : ""}
      ORDER BY rank
      LIMIT ? OFFSET ?
    `;

    const params: unknown[] = [options.query];
    if (options.types?.length) params.push(...options.types);
    if (options.importance?.length) params.push(...options.importance);
    if (options.minAccessCount) params.push(options.minAccessCount);
    params.push(limit, offset);

    const rows = this.all<{ id: string }>(sql, params);
    const memories: Memory[] = [];

    for (const row of rows) {
      const memory = await this.getMemory(row.id);
      if (memory) memories.push(memory);
    }

    return memories;
  }

  async recordAccess(id: EntityId): Promise<void> {
    this.ensureInitialized();

    this.exec(
      "UPDATE memories SET access_count = access_count + 1, last_accessed = ? WHERE id = ?",
      [Date.now(), id],
    );
  }

  // ─────────────────────────────────────────────────────────────────────────
  // SELF-SCHEMA
  // ─────────────────────────────────────────────────────────────────────────

  async getSelfSchema(): Promise<SelfSchema | null> {
    this.ensureInitialized();

    // Get all identity statements
    const identities = this.all<{
      id: string;
      statement: string;
      centrality: number;
      confidence: number;
      source_memory_ids: string;
      established_at: number;
      last_reinforced_at: number | null;
    }>("SELECT * FROM identity_statements ORDER BY centrality DESC");

    if (identities.length === 0) return null;

    // Get narrative from schema_info
    const narrativeRow = this.get<{ value: string }>(
      "SELECT value FROM schema_info WHERE key = 'narrative'",
    );

    const narrative: AutobiographicalNarrative = narrativeRow
      ? JSON.parse(narrativeRow.value)
      : {
          coreSummary: "",
          chapters: [],
          themes: [],
          narrativeEvolution: [],
          lastSynthesizedAt: Date.now(),
        };

    // Build partial Self-Schema (MVP: only identity statements + narrative)
    const coreIdentity: IdentityStatement[] = identities.map((row) => ({
      id: row.id,
      statement: row.statement,
      centrality: row.centrality,
      confidence: row.confidence,
      sourceMemoryIds: JSON.parse(row.source_memory_ids),
      establishedAt: row.established_at,
      lastReinforcedAt: row.last_reinforced_at ?? undefined,
    }));

    // Return a minimal SelfSchema (MVP structure)
    return {
      id: ulid("schema"),
      agentId: "default_agent",
      presentSelf: {
        coreIdentity,
        capabilities: [],
        relationships: [],
        currentState: {
          mood: "neutral",
          energyLevel: 0.5,
          activeConcerns: [],
          updatedAt: Date.now(),
        },
        values: [],
        limitations: [],
      },
      temporalTrajectory: {
        pastMilestones: [],
        presentPhase: {
          name: "operational",
          description: "Active and processing",
          startedAt: Date.now(),
          themes: [],
          activeGoals: [],
        },
        anticipatedFuture: [],
        patterns: [],
      },
      autobiographicalNarrative: narrative,
      createdAt: Date.now(),
      updatedAt: Date.now(),
      version: 1,
    };
  }

  async upsertIdentity(identity: IdentityStatement): Promise<void> {
    this.ensureInitialized();

    // Check if identity exists
    const existing = this.get<{ id: string }>(
      "SELECT id FROM identity_statements WHERE id = ?",
      [identity.id],
    );

    if (existing) {
      // Update existing
      this.exec(
        `UPDATE identity_statements SET
          statement = ?,
          centrality = ?,
          confidence = ?,
          source_memory_ids = ?,
          last_reinforced_at = ?
        WHERE id = ?`,
        [
          identity.statement,
          identity.centrality,
          identity.confidence,
          JSON.stringify(identity.sourceMemoryIds),
          identity.lastReinforcedAt ?? Date.now(),
          identity.id,
        ],
      );

      this.recordProvenance(identity.id, "identity", "updated", {
        statement: identity.statement,
      });
    } else {
      // Insert new
      this.exec(
        `INSERT INTO identity_statements (id, statement, centrality, confidence, source_memory_ids, established_at, last_reinforced_at)
         VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [
          identity.id,
          identity.statement,
          identity.centrality,
          identity.confidence,
          JSON.stringify(identity.sourceMemoryIds),
          identity.establishedAt,
          identity.lastReinforcedAt ?? null,
        ],
      );

      this.recordProvenance(identity.id, "identity", "created", {
        statement: identity.statement,
      });
    }
  }

  async getNarrative(): Promise<AutobiographicalNarrative | null> {
    this.ensureInitialized();

    const row = this.get<{ value: string }>(
      "SELECT value FROM schema_info WHERE key = 'narrative'",
    );

    if (!row) return null;

    return JSON.parse(row.value) as AutobiographicalNarrative;
  }

  async updateNarrative(
    narrative: Partial<AutobiographicalNarrative>,
  ): Promise<void> {
    this.ensureInitialized();

    // Get existing narrative
    const existing = await this.getNarrative();

    const updated: AutobiographicalNarrative = {
      coreSummary: narrative.coreSummary ?? existing?.coreSummary ?? "",
      chapters: narrative.chapters ?? existing?.chapters ?? [],
      themes: narrative.themes ?? existing?.themes ?? [],
      narrativeEvolution:
        narrative.narrativeEvolution ?? existing?.narrativeEvolution ?? [],
      lastSynthesizedAt: Date.now(),
    };

    // Store in schema_info
    this.exec(
      "INSERT OR REPLACE INTO schema_info (key, value) VALUES ('narrative', ?)",
      [JSON.stringify(updated)],
    );

    this.recordProvenance("narrative", "narrative", "updated", {
      hasCoreSummary: !!updated.coreSummary,
      chapterCount: updated.chapters.length,
    });
  }

  // ─────────────────────────────────────────────────────────────────────────
  // RECONSOLIDATION
  // ─────────────────────────────────────────────────────────────────────────

  async recordReconsolidation(
    event: Omit<ReconsolidationEvent, "id">,
  ): Promise<void> {
    this.ensureInitialized();

    const id = ulid("recon");

    // Get previous state of memory
    const memory = await this.getMemory(event.memoryId);
    if (!memory) {
      throw new Error(
        `Memory not found for reconsolidation: ${event.memoryId}`,
      );
    }

    // Build new state after updates
    const newState = { ...memory };
    for (const update of event.updatesApplied) {
      (newState as Record<string, unknown>)[update.field] = update.newValue;
    }

    this.exec(
      `INSERT INTO reconsolidation_events (id, memory_id, triggered_at, retrieval_context, updates_applied, previous_state, new_state)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        id,
        event.memoryId,
        event.labilityWindowStart,
        JSON.stringify(event.triggerContext),
        JSON.stringify(event.updatesApplied),
        JSON.stringify(memory),
        JSON.stringify(newState),
      ],
    );

    // Apply updates to the memory
    if (event.updatesApplied.length > 0) {
      const updateFields: Record<string, unknown> = {};
      for (const update of event.updatesApplied) {
        updateFields[update.field] = update.newValue;
      }
      await this.updateMemory(event.memoryId, updateFields as Partial<Memory>);
    }

    // Record provenance
    this.recordProvenance(event.memoryId, "memory", "reconsolidated", {
      reconsolidationId: id,
      finalState: event.finalState,
      updatesCount: event.updatesApplied.length,
    });
  }

  async getReconsolidationHistory(
    memoryId: EntityId,
  ): Promise<ReconsolidationEvent[]> {
    this.ensureInitialized();

    const rows = this.all<{
      id: string;
      memory_id: string;
      triggered_at: number;
      retrieval_context: string;
      updates_applied: string;
      previous_state: string;
      new_state: string;
    }>(
      "SELECT * FROM reconsolidation_events WHERE memory_id = ? ORDER BY triggered_at ASC",
      [memoryId],
    );

    return rows.map((row) => {
      const triggerContext = JSON.parse(
        row.retrieval_context,
      ) as ReconsolidationEvent["triggerContext"];
      const updatesApplied = JSON.parse(
        row.updates_applied,
      ) as ReconsolidationEvent["updatesApplied"];

      // Determine final state based on updates
      let finalState: ReconsolidationEvent["finalState"] = "unchanged";
      if (updatesApplied.length > 0) {
        finalState = "updated";
      }

      return {
        id: row.id,
        memoryId: row.memory_id,
        labilityWindowStart: row.triggered_at,
        triggerContext,
        updatesApplied,
        finalState,
        createdAt: row.triggered_at,
      };
    });
  }

  // ─────────────────────────────────────────────────────────────────────────
  // PROVENANCE
  // ─────────────────────────────────────────────────────────────────────────

  async getProvenance(entityId: EntityId): Promise<ProvenanceEntry[]> {
    this.ensureInitialized();

    const rows = this.all<{
      id: string;
      entity_id: string;
      entity_type: string;
      event_type: string;
      event_data: string;
      timestamp: number;
      actor: string | null;
      session_id: string | null;
    }>("SELECT * FROM provenance WHERE entity_id = ? ORDER BY timestamp ASC", [
      entityId,
    ]);

    return rows.map((row) => ({
      id: row.id,
      memoryId: row.entity_id,
      eventType: row.event_type as ProvenanceEntry["eventType"],
      eventData: JSON.parse(row.event_data),
      agentVersion: row.actor ?? undefined,
      sessionId: row.session_id ?? undefined,
      createdAt: row.timestamp,
    }));
  }

  // ─────────────────────────────────────────────────────────────────────────
  // SNAPSHOTS
  // ─────────────────────────────────────────────────────────────────────────

  async saveSnapshot(
    snapshot: Omit<SnapshotData, "id">,
  ): Promise<SnapshotData> {
    this.ensureInitialized();

    const id = ulid("snap");
    const now = Date.now();

    this.exec(
      `INSERT INTO snapshots (id, name, created_at, summary, context, next_steps, tags)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        id,
        snapshot.name,
        snapshot.createdAt ?? now,
        snapshot.summary,
        snapshot.context,
        snapshot.nextSteps ?? null,
        snapshot.tags ? JSON.stringify(snapshot.tags) : null,
      ],
    );

    this.recordProvenance(id, "snapshot", "created", { name: snapshot.name });

    return { ...snapshot, id, createdAt: snapshot.createdAt ?? now };
  }

  async getLatestSnapshot(): Promise<SnapshotData | null> {
    this.ensureInitialized();

    const row = this.get<{
      id: string;
      name: string;
      created_at: number;
      summary: string;
      context: string;
      next_steps: string | null;
      tags: string | null;
    }>("SELECT * FROM snapshots ORDER BY created_at DESC LIMIT 1");

    if (!row) return null;

    return {
      id: row.id,
      name: row.name,
      createdAt: row.created_at,
      summary: row.summary,
      context: row.context,
      nextSteps: row.next_steps ?? undefined,
      tags: row.tags ? JSON.parse(row.tags) : undefined,
    };
  }

  async listSnapshots(limit?: number): Promise<SnapshotData[]> {
    this.ensureInitialized();

    const rows = this.all<{
      id: string;
      name: string;
      created_at: number;
      summary: string;
      context: string;
      next_steps: string | null;
      tags: string | null;
    }>("SELECT * FROM snapshots ORDER BY created_at DESC LIMIT ?", [
      limit ?? 20,
    ]);

    return rows.map((row) => ({
      id: row.id,
      name: row.name,
      createdAt: row.created_at,
      summary: row.summary,
      context: row.context,
      nextSteps: row.next_steps ?? undefined,
      tags: row.tags ? JSON.parse(row.tags) : undefined,
    }));
  }

  async loadSnapshot(id: EntityId): Promise<SnapshotData | null> {
    this.ensureInitialized();

    const row = this.get<{
      id: string;
      name: string;
      created_at: number;
      summary: string;
      context: string;
      next_steps: string | null;
      tags: string | null;
    }>("SELECT * FROM snapshots WHERE id = ?", [id]);

    if (!row) return null;

    return {
      id: row.id,
      name: row.name,
      createdAt: row.created_at,
      summary: row.summary,
      context: row.context,
      nextSteps: row.next_steps ?? undefined,
      tags: row.tags ? JSON.parse(row.tags) : undefined,
    };
  }

  // ─────────────────────────────────────────────────────────────────────────
  // MAINTENANCE
  // ─────────────────────────────────────────────────────────────────────────

  async markConsolidated(ids: EntityId[]): Promise<void> {
    this.ensureInitialized();

    if (ids.length === 0) return;

    const placeholders = ids.map(() => "?").join(",");
    this.exec(
      `UPDATE memories SET is_consolidated = 1 WHERE id IN (${placeholders})`,
      ids,
    );
  }

  async prune(policy: PrunePolicy): Promise<number> {
    this.ensureInitialized();

    // Build WHERE conditions
    const conditions: string[] = ["deleted_at IS NULL"];
    const params: unknown[] = [];

    if (policy.minAccessCount !== undefined) {
      conditions.push("access_count < ?");
      params.push(policy.minAccessCount);
    }

    if (policy.staleAfterDays !== undefined) {
      const cutoff = Date.now() - policy.staleAfterDays * 24 * 60 * 60 * 1000;
      conditions.push("(last_accessed IS NULL OR last_accessed < ?)");
      params.push(cutoff);
    }

    if (policy.preserveImportance?.length) {
      const placeholders = policy.preserveImportance.map(() => "?").join(",");
      conditions.push(`importance NOT IN (${placeholders})`);
      params.push(...policy.preserveImportance);
    }

    // Count candidates
    const countSql = `SELECT COUNT(*) as count FROM memories WHERE ${conditions.join(" AND ")}`;
    const total = this.get<{ count: number }>(countSql, params)?.count ?? 0;

    // Calculate how many to delete (keep minimum)
    const keepMin = policy.keepMinimum ?? 0;
    const currentTotal =
      this.get<{ count: number }>(
        "SELECT COUNT(*) as count FROM memories WHERE deleted_at IS NULL",
      )?.count ?? 0;

    const toDelete = Math.max(0, Math.min(total, currentTotal - keepMin));

    if (policy.dryRun || toDelete === 0) {
      return toDelete;
    }

    // Get IDs to delete (oldest first by last_accessed, then created_at)
    const selectSql = `
      SELECT id FROM memories
      WHERE ${conditions.join(" AND ")}
      ORDER BY COALESCE(last_accessed, created_at) ASC
      LIMIT ?
    `;
    const idsToDelete = this.all<{ id: string }>(selectSql, [
      ...params,
      toDelete,
    ]);

    // Soft delete
    for (const row of idsToDelete) {
      await this.deleteMemory(row.id);
    }

    return idsToDelete.length;
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

  /**
   * Record a provenance entry (append-only audit trail)
   */
  private recordProvenance(
    entityId: EntityId,
    entityType: string,
    eventType: string,
    eventData: Record<string, unknown>,
  ): void {
    const id = ulid("prov");
    this.exec(
      `INSERT INTO provenance (id, entity_id, entity_type, event_type, event_data, timestamp)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [
        id,
        entityId,
        entityType,
        eventType,
        JSON.stringify(eventData),
        Date.now(),
      ],
    );
  }
}
