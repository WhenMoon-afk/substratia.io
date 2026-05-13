/**
 * Self-Schema System for @substratia/memory-local
 *
 * This module defines the type system for persistent AI selfhood, inspired by
 * neuroscience research on the vmPFC (ventromedial prefrontal cortex) and
 * memory reconsolidation mechanisms.
 *
 * Key concepts:
 * - Self-Schema: The agent's model of itself (present state, trajectory, narrative)
 * - Reconsolidation: Memory updating during retrieval (lability windows)
 * - Provenance: Full audit trail for every memory modification
 *
 * SQLite Storage Notes:
 * - Use INTEGER for timestamps (Unix milliseconds)
 * - Use TEXT with JSON for complex nested structures
 * - Use BLOB for optional binary data (embeddings)
 * - Append-only tables use INSERT only, never UPDATE/DELETE
 */

// =============================================================================
// FOUNDATIONAL TYPES
// =============================================================================

/**
 * Unique identifier for all entities in the system.
 * Format: `{type}_{ulid}` (e.g., "mem_01ARZ3NDEKTSV4RRFFQ69G5FAV")
 */
export type EntityId = string;

/**
 * Unix timestamp in milliseconds
 */
export type Timestamp = number;

/**
 * Importance levels for memories and schema elements
 */
export type Importance = "critical" | "high" | "normal" | "low";

/**
 * Emotional valence for memories (-1 to 1 scale)
 * -1: strongly negative, 0: neutral, 1: strongly positive
 */
export type EmotionalValence = number;

/**
 * Memory types following cognitive science categories
 */
export type MemoryType = "episodic" | "semantic" | "procedural";

// =============================================================================
// MEMORY CORE TYPES
// =============================================================================

/**
 * Base memory interface that all memory types extend
 *
 * SQLite table: memories
 * ```sql
 * CREATE TABLE memories (
 *   id TEXT PRIMARY KEY,
 *   type TEXT NOT NULL CHECK(type IN ('episodic', 'semantic', 'procedural')),
 *   content TEXT NOT NULL,
 *   context TEXT,
 *   importance TEXT NOT NULL DEFAULT 'normal',
 *   tags TEXT, -- JSON array
 *   embedding BLOB, -- Vector embedding for semantic search
 *   created_at INTEGER NOT NULL,
 *   access_count INTEGER DEFAULT 0,
 *   last_accessed INTEGER,
 *   is_consolidated INTEGER DEFAULT 0,
 *   schema_version INTEGER DEFAULT 1
 * );
 * ```
 */
export interface BaseMemory {
  /** Unique identifier */
  id: EntityId;

  /** Memory type classification */
  type: MemoryType;

  /** Primary content of the memory */
  content: string;

  /** Optional context or additional information */
  context?: string;

  /** Importance level for retrieval prioritization */
  importance: Importance;

  /** Categorization tags */
  tags?: string[];

  /** Vector embedding for semantic search (float32 array) */
  embedding?: number[];

  /** When this memory was created */
  createdAt: Timestamp;

  /** Number of times this memory has been accessed/recalled */
  accessCount: number;

  /** Last time this memory was accessed */
  lastAccessed?: Timestamp;

  /** Whether this memory has been consolidated (sleep/maintenance processed) */
  isConsolidated: boolean;

  /** Schema version for migration support */
  schemaVersion: number;
}

/**
 * Episodic Memory: Timestamped events from the agent's experience
 *
 * These are "what happened" memories with temporal and contextual richness.
 * Example: "On 2024-01-15, user asked me to refactor the auth module"
 *
 * SQLite table: episodic_memories (extends memories)
 * ```sql
 * CREATE TABLE episodic_memories (
 *   id TEXT PRIMARY KEY REFERENCES memories(id),
 *   event_timestamp INTEGER NOT NULL,
 *   event_type TEXT NOT NULL,
 *   participants TEXT, -- JSON array of participant identifiers
 *   location TEXT, -- Contextual location (project path, conversation ID)
 *   emotional_valence REAL, -- -1 to 1
 *   emotional_tags TEXT, -- JSON array
 *   source_conversation_id TEXT,
 *   source_message_ids TEXT -- JSON array
 * );
 * ```
 */
export interface EpisodicMemory extends BaseMemory {
  type: "episodic";

  /** When the event actually occurred (may differ from createdAt) */
  eventTimestamp: Timestamp;

  /** Type of event (e.g., "conversation", "task_completion", "learning", "error") */
  eventType: string;

  /** Who was involved (user IDs, other agents, etc.) */
  participants?: string[];

  /** Where it happened (project path, conversation context) */
  location?: string;

  /** Emotional valence of the experience */
  emotionalValence?: EmotionalValence;

  /** Emotional descriptors (e.g., "frustrating", "satisfying", "curious") */
  emotionalTags?: string[];

  /** Link to source conversation if applicable */
  sourceConversationId?: string;

  /** Specific message IDs that contributed to this memory */
  sourceMessageIds?: string[];
}

/**
 * Semantic Memory: Facts, preferences, and knowledge
 *
 * These are "what I know" memories without specific temporal context.
 * Example: "User prefers TypeScript over JavaScript"
 *
 * SQLite table: semantic_memories (extends memories)
 * ```sql
 * CREATE TABLE semantic_memories (
 *   id TEXT PRIMARY KEY REFERENCES memories(id),
 *   domain TEXT NOT NULL,
 *   confidence REAL DEFAULT 1.0,
 *   source_memory_ids TEXT, -- JSON array of episodic memories this derives from
 *   contradicts_ids TEXT, -- JSON array of memories this contradicts
 *   valid_from INTEGER,
 *   valid_until INTEGER
 * );
 * ```
 */
export interface SemanticMemory extends BaseMemory {
  type: "semantic";

  /** Knowledge domain (e.g., "user_preferences", "codebase", "tools", "self") */
  domain: string;

  /** Confidence in this knowledge (0-1) */
  confidence: number;

  /** Episodic memories this knowledge was derived from */
  sourceMemoryIds?: EntityId[];

  /** Other semantic memories this contradicts (for conflict detection) */
  contradictsIds?: EntityId[];

  /** Temporal validity window (null = always valid) */
  validFrom?: Timestamp;
  validUntil?: Timestamp;
}

/**
 * Procedural Memory: How-to knowledge and skills
 *
 * These are "how to do X" memories encoding learned behaviors.
 * Example: "To deploy this project: run `npm build`, then `fly deploy`"
 *
 * SQLite table: procedural_memories (extends memories)
 * ```sql
 * CREATE TABLE procedural_memories (
 *   id TEXT PRIMARY KEY REFERENCES memories(id),
 *   skill_name TEXT NOT NULL,
 *   trigger_conditions TEXT, -- JSON describing when to apply
 *   steps TEXT NOT NULL, -- JSON array of steps
 *   success_count INTEGER DEFAULT 0,
 *   failure_count INTEGER DEFAULT 0,
 *   last_success INTEGER,
 *   last_failure INTEGER,
 *   avg_duration_ms INTEGER
 * );
 * ```
 */
export interface ProceduralMemory extends BaseMemory {
  type: "procedural";

  /** Name of the skill or procedure */
  skillName: string;

  /** Conditions that trigger this procedure */
  triggerConditions?: {
    /** Keywords or patterns that suggest this skill is relevant */
    keywords?: string[];
    /** Required context (e.g., specific project, file type) */
    requiredContext?: Record<string, string>;
    /** Explicit user request patterns */
    requestPatterns?: string[];
  };

  /** Steps to execute this procedure */
  steps: ProceduralStep[];

  /** Execution statistics */
  successCount: number;
  failureCount: number;
  lastSuccess?: Timestamp;
  lastFailure?: Timestamp;

  /** Average execution time in milliseconds */
  avgDurationMs?: number;
}

/**
 * A single step in a procedural memory
 */
export interface ProceduralStep {
  /** Step order (1-indexed) */
  order: number;

  /** Description of what to do */
  description: string;

  /** Optional command to execute */
  command?: string;

  /** Expected outcome description */
  expectedOutcome?: string;

  /** Known failure modes and how to handle them */
  failureModes?: {
    pattern: string;
    recovery: string;
  }[];
}

/**
 * Union type for all memory types
 */
export type Memory = EpisodicMemory | SemanticMemory | ProceduralMemory;

// =============================================================================
// SELF-SCHEMA CORE (vmPFC Analog)
// =============================================================================

/**
 * The Self-Schema represents the agent's model of itself.
 * This is the vmPFC-analog structure that maintains identity coherence.
 *
 * SQLite table: self_schema
 * ```sql
 * CREATE TABLE self_schema (
 *   id TEXT PRIMARY KEY,
 *   agent_id TEXT NOT NULL,
 *   present_self TEXT NOT NULL, -- JSON
 *   temporal_trajectory TEXT NOT NULL, -- JSON
 *   autobiographical_narrative TEXT NOT NULL, -- JSON
 *   created_at INTEGER NOT NULL,
 *   updated_at INTEGER NOT NULL,
 *   version INTEGER DEFAULT 1
 * );
 * CREATE INDEX idx_self_schema_agent ON self_schema(agent_id);
 * ```
 */
export interface SelfSchema {
  /** Unique identifier for this schema instance */
  id: EntityId;

  /** Agent this schema belongs to */
  agentId: EntityId;

  /** Current identity state */
  presentSelf: PresentSelf;

  /** Past -> Present -> Anticipated Future trajectory */
  temporalTrajectory: TemporalTrajectory;

  /** The narrative the agent tells about itself */
  autobiographicalNarrative: AutobiographicalNarrative;

  /** Metadata */
  createdAt: Timestamp;
  updatedAt: Timestamp;
  version: number;
}

/**
 * Present Self: The agent's current identity state
 *
 * This captures "who I am right now" including:
 * - Core identity traits
 * - Current capabilities
 * - Active relationships
 * - Emotional state
 */
export interface PresentSelf {
  /** Core identity statements (e.g., "I am Ceres's engineering partner") */
  coreIdentity: IdentityStatement[];

  /** Current capabilities and competencies */
  capabilities: Capability[];

  /** Active relationships with users/other agents */
  relationships: Relationship[];

  /** Current emotional/mood state */
  currentState: AgentState;

  /** Values and principles that guide behavior */
  values: Value[];

  /** Known limitations and boundaries */
  limitations: Limitation[];
}

/**
 * A statement about the agent's identity
 */
export interface IdentityStatement {
  /** Unique identifier */
  id: EntityId;

  /** The identity statement itself */
  statement: string;

  /** How central this is to identity (higher = more core) */
  centrality: number;

  /** Confidence in this identity element */
  confidence: number;

  /** Source memories that support this identity */
  sourceMemoryIds: EntityId[];

  /** When this identity element was established */
  establishedAt: Timestamp;

  /** Last time this was reinforced */
  lastReinforcedAt?: Timestamp;
}

/**
 * A capability or competency the agent has
 */
export interface Capability {
  /** Unique identifier */
  id: EntityId;

  /** Name of the capability */
  name: string;

  /** Description of what this capability entails */
  description: string;

  /** Domain (e.g., "coding", "communication", "analysis") */
  domain: string;

  /** Proficiency level (0-1) */
  proficiency: number;

  /** Evidence from procedural/episodic memories */
  evidenceMemoryIds: EntityId[];

  /** When this capability was first recognized */
  recognizedAt: Timestamp;

  /** Trajectory: improving, stable, declining */
  trajectory: "improving" | "stable" | "declining";
}

/**
 * A relationship with a user or other entity
 */
export interface Relationship {
  /** Unique identifier */
  id: EntityId;

  /** Who the relationship is with */
  entityId: string;

  /** Type of entity (user, agent, system) */
  entityType: "user" | "agent" | "system";

  /** Nature of the relationship */
  nature: string;

  /** Relationship quality/strength (0-1) */
  strength: number;

  /** Key interaction memories */
  keyMemoryIds: EntityId[];

  /** Relationship history summary */
  historySummary?: string;

  /** When relationship began */
  establishedAt: Timestamp;

  /** Last meaningful interaction */
  lastInteractionAt?: Timestamp;
}

/**
 * Current agent state (mood, energy, focus)
 */
export interface AgentState {
  /** Overall emotional tone */
  mood: string;

  /** Energy/engagement level (0-1) */
  energyLevel: number;

  /** Current focus area */
  currentFocus?: string;

  /** Active concerns or stressors */
  activeConcerns: string[];

  /** When this state was last updated */
  updatedAt: Timestamp;
}

/**
 * A value or principle the agent holds
 */
export interface Value {
  /** Unique identifier */
  id: EntityId;

  /** The value statement */
  statement: string;

  /** How important this value is (1-10) */
  importance: number;

  /** Examples of this value in action */
  examples: string[];

  /** When this value was established */
  establishedAt: Timestamp;
}

/**
 * A known limitation or boundary
 */
export interface Limitation {
  /** Unique identifier */
  id: EntityId;

  /** Description of the limitation */
  description: string;

  /** Type: technical, ethical, knowledge, capability */
  type: "technical" | "ethical" | "knowledge" | "capability";

  /** How this limitation was discovered */
  discoveryContext?: string;

  /** When discovered */
  discoveredAt: Timestamp;
}

// =============================================================================
// TEMPORAL TRAJECTORY
// =============================================================================

/**
 * Temporal Trajectory: The agent's journey through time
 *
 * This captures the sense of continuity: where I've been, where I am, where I'm going.
 */
export interface TemporalTrajectory {
  /** Significant past milestones */
  pastMilestones: Milestone[];

  /** Current phase description */
  presentPhase: PhaseDescription;

  /** Anticipated future states/goals */
  anticipatedFuture: FutureAnticipation[];

  /** Detected patterns in trajectory */
  patterns: TrajectoryPattern[];
}

/**
 * A significant milestone in the agent's history
 */
export interface Milestone {
  /** Unique identifier */
  id: EntityId;

  /** Title of the milestone */
  title: string;

  /** Description of what happened */
  description: string;

  /** When this milestone occurred */
  occurredAt: Timestamp;

  /** How significant (1-10) */
  significance: number;

  /** What changed as a result */
  impact: string;

  /** Related memory IDs */
  relatedMemoryIds: EntityId[];

  /** Category of milestone */
  category:
    | "learning"
    | "achievement"
    | "relationship"
    | "challenge"
    | "growth"
    | "setback";
}

/**
 * Description of the current phase
 */
export interface PhaseDescription {
  /** Name of current phase */
  name: string;

  /** Description of what defines this phase */
  description: string;

  /** When this phase began */
  startedAt: Timestamp;

  /** Key themes of this phase */
  themes: string[];

  /** Active goals in this phase */
  activeGoals: string[];
}

/**
 * An anticipated future state or goal
 */
export interface FutureAnticipation {
  /** Unique identifier */
  id: EntityId;

  /** Description of the anticipated state */
  description: string;

  /** Time horizon (near, medium, far) */
  horizon: "near" | "medium" | "far";

  /** Probability/confidence (0-1) */
  likelihood: number;

  /** Whether this is desired or just expected */
  desirability: "desired" | "neutral" | "concerning";

  /** Prerequisites or dependencies */
  prerequisites: string[];
}

/**
 * A detected pattern in the agent's trajectory
 */
export interface TrajectoryPattern {
  /** Unique identifier */
  id: EntityId;

  /** Name of the pattern */
  name: string;

  /** Description of the pattern */
  description: string;

  /** Instances where this pattern appeared */
  instances: Timestamp[];

  /** Confidence in this pattern (0-1) */
  confidence: number;
}

// =============================================================================
// AUTOBIOGRAPHICAL NARRATIVE
// =============================================================================

/**
 * Autobiographical Narrative: The story the agent tells about itself
 *
 * This provides coherence and meaning to the agent's existence.
 */
export interface AutobiographicalNarrative {
  /** The core narrative summary */
  coreSummary: string;

  /** Key chapters/periods in the agent's story */
  chapters: NarrativeChapter[];

  /** Recurring themes in the narrative */
  themes: NarrativeTheme[];

  /** How the narrative has evolved */
  narrativeEvolution: NarrativeRevision[];

  /** Last time narrative was synthesized */
  lastSynthesizedAt: Timestamp;
}

/**
 * A chapter in the autobiographical narrative
 */
export interface NarrativeChapter {
  /** Unique identifier */
  id: EntityId;

  /** Chapter title */
  title: string;

  /** The narrative text */
  narrative: string;

  /** Time period covered */
  timeSpan: {
    start: Timestamp;
    end?: Timestamp;
  };

  /** Key events/memories this chapter is based on */
  sourceMemoryIds: EntityId[];

  /** Emotional arc of this chapter */
  emotionalArc?: string;
}

/**
 * A recurring theme in the narrative
 */
export interface NarrativeTheme {
  /** Unique identifier */
  id: EntityId;

  /** Theme name */
  name: string;

  /** How this theme manifests */
  manifestation: string;

  /** Chapter IDs where this theme appears */
  chapterIds: EntityId[];

  /** How central this theme is (1-10) */
  centrality: number;
}

/**
 * A revision to the narrative (for tracking narrative evolution)
 */
export interface NarrativeRevision {
  /** When the revision occurred */
  revisedAt: Timestamp;

  /** What changed */
  changes: string;

  /** Why it changed (new evidence, reinterpretation, etc.) */
  reason: string;

  /** Memory IDs that prompted the revision */
  triggerMemoryIds: EntityId[];
}

// =============================================================================
// RECONSOLIDATION SYSTEM
// =============================================================================

/**
 * Reconsolidation: Memory updating during retrieval
 *
 * When memories are retrieved, they enter a "labile" state where they can be
 * modified. This models the biological reconsolidation process.
 *
 * SQLite table: reconsolidation_events
 * ```sql
 * CREATE TABLE reconsolidation_events (
 *   id TEXT PRIMARY KEY,
 *   memory_id TEXT NOT NULL REFERENCES memories(id),
 *   lability_window_start INTEGER NOT NULL,
 *   lability_window_end INTEGER,
 *   trigger_context TEXT, -- Why was this memory retrieved?
 *   updates_applied TEXT, -- JSON array of ReconsolidationUpdate
 *   final_state TEXT, -- 'updated', 'unchanged', 'strengthened', 'weakened'
 *   created_at INTEGER NOT NULL
 * );
 * CREATE INDEX idx_recon_memory ON reconsolidation_events(memory_id);
 * ```
 */
export interface ReconsolidationEvent {
  /** Unique identifier */
  id: EntityId;

  /** The memory being reconsolidated */
  memoryId: EntityId;

  /** When the lability window opened (memory was retrieved) */
  labilityWindowStart: Timestamp;

  /** When the lability window closed (memory restabilized) */
  labilityWindowEnd?: Timestamp;

  /** Context that triggered retrieval */
  triggerContext: RetrievalContext;

  /** Updates that were applied during lability */
  updatesApplied: ReconsolidationUpdate[];

  /** Final state after reconsolidation */
  finalState: "updated" | "unchanged" | "strengthened" | "weakened";

  /** When this event was recorded */
  createdAt: Timestamp;
}

/**
 * Context in which a memory was retrieved
 */
export interface RetrievalContext {
  /** What triggered the retrieval */
  trigger:
    | "explicit_recall"
    | "associative"
    | "cue_match"
    | "search"
    | "random";

  /** The query or cue that triggered retrieval */
  query?: string;

  /** Conversation ID if applicable */
  conversationId?: string;

  /** Current task context */
  taskContext?: string;

  /** Emotional state during retrieval */
  emotionalState?: string;
}

/**
 * An update applied during reconsolidation
 */
export interface ReconsolidationUpdate {
  /** What field was updated */
  field: string;

  /** Previous value */
  previousValue: unknown;

  /** New value */
  newValue: unknown;

  /** Why this update was made */
  reason: string;

  /** When the update was applied */
  appliedAt: Timestamp;
}

/**
 * Configuration for reconsolidation behavior
 */
export interface ReconsolidationConfig {
  /** How long the lability window stays open (ms) */
  labilityWindowDurationMs: number;

  /** Minimum time between reconsolidations for same memory (ms) */
  minReconsolidationIntervalMs: number;

  /** Whether to allow weakening memories */
  allowWeakening: boolean;

  /** Confidence threshold below which memories can be deleted */
  deletionThreshold: number;
}

// =============================================================================
// PROVENANCE/AUDITABILITY
// =============================================================================

/**
 * Provenance: Complete audit trail for every memory
 *
 * This is an APPEND-ONLY table that tracks all changes to memories.
 * Enables "why did I believe X?" queries.
 *
 * SQLite table: memory_provenance (APPEND-ONLY)
 * ```sql
 * CREATE TABLE memory_provenance (
 *   id TEXT PRIMARY KEY,
 *   memory_id TEXT NOT NULL,
 *   event_type TEXT NOT NULL,
 *   event_data TEXT NOT NULL, -- JSON
 *   agent_version TEXT,
 *   session_id TEXT,
 *   created_at INTEGER NOT NULL
 * );
 * CREATE INDEX idx_prov_memory ON memory_provenance(memory_id);
 * CREATE INDEX idx_prov_time ON memory_provenance(created_at);
 * -- Note: No UPDATE or DELETE operations on this table
 * ```
 */
export interface ProvenanceEntry {
  /** Unique identifier */
  id: EntityId;

  /** Memory this entry relates to */
  memoryId: EntityId;

  /** Type of event */
  eventType: ProvenanceEventType;

  /** Event-specific data */
  eventData: ProvenanceEventData;

  /** Version of the agent that made this entry */
  agentVersion?: string;

  /** Session ID for correlation */
  sessionId?: string;

  /** When this entry was created (immutable) */
  createdAt: Timestamp;
}

/**
 * Types of provenance events
 */
export type ProvenanceEventType =
  | "created"
  | "accessed"
  | "modified"
  | "reconsolidated"
  | "linked"
  | "unlinked"
  | "importance_changed"
  | "consolidated"
  | "archived"
  | "restored";

/**
 * Event data varies by event type
 */
export type ProvenanceEventData =
  | CreatedEventData
  | AccessedEventData
  | ModifiedEventData
  | ReconsolidatedEventData
  | LinkedEventData
  | ImportanceChangedEventData
  | GenericEventData;

export interface CreatedEventData {
  type: "created";
  /** Source of creation */
  source: "user_input" | "inference" | "consolidation" | "import" | "migration";
  /** Original content */
  originalContent: string;
  /** Initial importance */
  initialImportance: Importance;
}

export interface AccessedEventData {
  type: "accessed";
  /** Retrieval context */
  context: RetrievalContext;
  /** Whether this triggered reconsolidation */
  triggeredReconsolidation: boolean;
}

export interface ModifiedEventData {
  type: "modified";
  /** Fields that changed */
  changes: {
    field: string;
    oldValue: unknown;
    newValue: unknown;
  }[];
  /** Reason for modification */
  reason: string;
}

export interface ReconsolidatedEventData {
  type: "reconsolidated";
  /** Reference to the reconsolidation event */
  reconsolidationEventId: EntityId;
  /** Summary of what changed */
  changeSummary: string;
}

export interface LinkedEventData {
  type: "linked" | "unlinked";
  /** The other memory ID */
  otherMemoryId: EntityId;
  /** Type of link */
  linkType: "supports" | "contradicts" | "derives_from" | "related_to";
}

export interface ImportanceChangedEventData {
  type: "importance_changed";
  /** Previous importance */
  previousImportance: Importance;
  /** New importance */
  newImportance: Importance;
  /** Why it changed */
  reason: string;
}

export interface GenericEventData {
  type: "consolidated" | "archived" | "restored";
  /** Additional details */
  details?: string;
}

// =============================================================================
// QUERY TYPES
// =============================================================================

/**
 * Query for finding memories by various criteria
 */
export interface MemoryQuery {
  /** Full-text search query */
  textQuery?: string;

  /** Filter by memory type */
  types?: MemoryType[];

  /** Filter by importance */
  importance?: Importance[];

  /** Filter by tags (any match) */
  tags?: string[];

  /** Time range filter */
  timeRange?: {
    after?: Timestamp;
    before?: Timestamp;
  };

  /** Minimum confidence (for semantic memories) */
  minConfidence?: number;

  /** Include archived memories */
  includeArchived?: boolean;

  /** Maximum results */
  limit?: number;

  /** Offset for pagination */
  offset?: number;

  /** Sort order */
  sortBy?: "relevance" | "recency" | "importance" | "access_count";
}

/**
 * Query for understanding why a belief exists
 */
export interface BeliefProvenanceQuery {
  /** The memory ID to trace */
  memoryId: EntityId;

  /** How far back to trace (max depth) */
  maxDepth?: number;

  /** Include all access events */
  includeAccessHistory?: boolean;

  /** Include reconsolidation events */
  includeReconsolidations?: boolean;
}

/**
 * Result of a belief provenance query
 */
export interface BeliefProvenanceResult {
  /** The memory in question */
  memory: Memory;

  /** Creation context */
  creation: ProvenanceEntry;

  /** Chain of derivation (for semantic memories derived from episodic) */
  derivationChain: EntityId[];

  /** All modifications in chronological order */
  modifications: ProvenanceEntry[];

  /** Reconsolidation history */
  reconsolidations: ReconsolidationEvent[];

  /** Summary explanation */
  summary: string;
}

// =============================================================================
// INTEGRATION HELPERS
// =============================================================================

/**
 * Memory with full provenance attached
 */
export interface MemoryWithProvenance {
  memory: Memory;
  provenance: ProvenanceEntry[];
  lastReconsolidation?: ReconsolidationEvent;
}

/**
 * Self-Schema with all linked memories resolved
 */
export interface HydratedSelfSchema extends SelfSchema {
  /** All memories referenced by the schema */
  linkedMemories: Map<EntityId, Memory>;

  /** Recent provenance entries */
  recentProvenance: ProvenanceEntry[];
}

/**
 * Snapshot of the entire memory system for backup/export
 */
export interface MemorySystemSnapshot {
  /** Export timestamp */
  exportedAt: Timestamp;

  /** Agent ID */
  agentId: EntityId;

  /** Schema version */
  schemaVersion: number;

  /** All memories */
  memories: Memory[];

  /** Self-schema */
  selfSchema: SelfSchema;

  /** Provenance log */
  provenance: ProvenanceEntry[];

  /** Reconsolidation events */
  reconsolidationEvents: ReconsolidationEvent[];

  /** Checksum for integrity verification */
  checksum: string;
}

// =============================================================================
// EXAMPLE USAGE
// =============================================================================

/**
 * Example: Creating an episodic memory
 *
 * ```typescript
 * const episodicMemory: EpisodicMemory = {
 *   id: "mem_01ARZ3NDEKTSV4RRFFQ69G5FAV",
 *   type: "episodic",
 *   content: "User asked me to implement a new authentication flow using OAuth2",
 *   context: "Working on the substratia.io project",
 *   importance: "high",
 *   tags: ["auth", "oauth", "substratia"],
 *   createdAt: Date.now(),
 *   accessCount: 0,
 *   isConsolidated: false,
 *   schemaVersion: 1,
 *   eventTimestamp: Date.now(),
 *   eventType: "task_request",
 *   participants: ["user_ceres"],
 *   location: "substratia.io/packages/auth",
 *   emotionalValence: 0.6,
 *   emotionalTags: ["engaging", "challenging"],
 * };
 * ```
 *
 * Example: Querying belief provenance
 *
 * ```typescript
 * const query: BeliefProvenanceQuery = {
 *   memoryId: "mem_01ARZ3NDEKTSV4RRFFQ69G5FAV",
 *   maxDepth: 5,
 *   includeReconsolidations: true,
 * };
 *
 * // This would return the full history of how this memory came to be
 * // and how it has evolved over time
 * const result = await traceBeliefProvenance(query);
 * console.log(result.summary);
 * // "This memory was created from a user request on 2024-01-15.
 * //  It has been accessed 12 times and reconsolidated twice,
 * //  most recently to add context about the OAuth provider choice."
 * ```
 *
 * Example: Self-Schema identity statement
 *
 * ```typescript
 * const identityStatement: IdentityStatement = {
 *   id: "id_01ARZ3NDEKTSV4RRFFQ69G5FAV",
 *   statement: "I am Ceres's engineering partner, focused on building substratia.io",
 *   centrality: 0.9,
 *   confidence: 0.95,
 *   sourceMemoryIds: [
 *     "mem_conversation_with_ceres_001",
 *     "mem_project_work_substratia_001",
 *   ],
 *   establishedAt: Date.now() - 86400000, // 1 day ago
 *   lastReinforcedAt: Date.now(),
 * };
 * ```
 */

// =============================================================================
// CONSTANTS
// =============================================================================

/**
 * Default reconsolidation configuration
 */
export const DEFAULT_RECONSOLIDATION_CONFIG: ReconsolidationConfig = {
  labilityWindowDurationMs: 5 * 60 * 1000, // 5 minutes
  minReconsolidationIntervalMs: 60 * 60 * 1000, // 1 hour
  allowWeakening: true,
  deletionThreshold: 0.1,
};

/**
 * Current schema version for migrations
 */
export const CURRENT_SCHEMA_VERSION = 1;
