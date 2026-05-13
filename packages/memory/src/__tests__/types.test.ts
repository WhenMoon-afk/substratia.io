/**
 * Type Tests for @substratia/memory-local
 *
 * These are compile-time type tests. They verify that:
 * - Types are correctly defined and exportable
 * - Type inference works as expected
 * - Union types discriminate properly
 *
 * Run with: npm run typecheck
 * (No runtime tests here - these are pure type assertions)
 */

import type {
  // Foundational
  EntityId,
  Timestamp,
  Importance,
  EmotionalValence,
  MemoryType,

  // Memories
  Memory,
  BaseMemory,
  EpisodicMemory,
  SemanticMemory,
  ProceduralMemory,

  // Self-Schema
  SelfSchema,
  IdentityStatement,
  Capability,
  Relationship,
  Value,
  Limitation,

  // Trajectory
  TemporalTrajectory,
  Milestone,

  // Narrative
  AutobiographicalNarrative,
  NarrativeChapter,

  // Reconsolidation
  ReconsolidationEvent,
  RetrievalContext,

  // Provenance
  ProvenanceEntry,
} from "../index.js";

import type {
  MemoryStorage,
  StorageStats,
  SearchOptions,
  ListOptions,
  PrunePolicy,
  SnapshotData,
} from "../storage/index.js";

// =============================================================================
// TYPE TESTS (compile-time assertions)
// =============================================================================

// Test 1: Memory union discrimination
function processMemory(memory: Memory): string {
  switch (memory.type) {
    case "episodic":
      // TypeScript should know this is EpisodicMemory
      return `Event: ${memory.eventType} at ${memory.eventTimestamp}`;
    case "semantic":
      // TypeScript should know this is SemanticMemory
      return `Fact: ${memory.domain} (confidence: ${memory.confidence})`;
    case "procedural":
      // TypeScript should know this is ProceduralMemory
      return `Skill: ${memory.skillName} (${memory.steps.length} steps)`;
    default:
      // Exhaustiveness check
      const _exhaustive: never = memory;
      return _exhaustive;
  }
}

// Test 2: Valid memory construction
const validEpisodic: EpisodicMemory = {
  id: "mem_01ARZ3NDEKTSV4RRFFQ69G5FAV",
  type: "episodic",
  content: "Deployed first feature",
  importance: "high",
  createdAt: Date.now(),
  accessCount: 0,
  isConsolidated: false,
  schemaVersion: 1,
  eventTimestamp: Date.now(),
  eventType: "task_completion",
  emotionalValence: 0.8,
  emotionalTags: ["satisfying", "proud"],
};

const validSemantic: SemanticMemory = {
  id: "mem_02BRZ3NDEKTSV4RRFFQ69G5FAV",
  type: "semantic",
  content: "User prefers TypeScript over JavaScript",
  importance: "normal",
  createdAt: Date.now(),
  accessCount: 5,
  isConsolidated: true,
  schemaVersion: 1,
  domain: "user_preferences",
  confidence: 0.95,
};

const validProcedural: ProceduralMemory = {
  id: "mem_03CRZ3NDEKTSV4RRFFQ69G5FAV",
  type: "procedural",
  content: "How to deploy to production",
  importance: "high",
  createdAt: Date.now(),
  accessCount: 10,
  isConsolidated: true,
  schemaVersion: 1,
  skillName: "production_deploy",
  steps: [
    {
      order: 1,
      description: "Run tests",
      command: "npm test",
      expectedOutcome: "All tests pass",
    },
    {
      order: 2,
      description: "Build",
      command: "npm run build",
      expectedOutcome: "Build succeeds with no errors",
    },
    {
      order: 3,
      description: "Deploy",
      command: "npm run deploy",
      expectedOutcome: "Deployment completes",
    },
  ],
  successCount: 49,
  failureCount: 1,
  lastSuccess: Date.now(),
  avgDurationMs: 45000,
};

// Test 3: Memory can hold any memory type
const memories: Memory[] = [validEpisodic, validSemantic, validProcedural];

// Test 4: Storage interface conformance
type StorageConformance = MemoryStorage extends {
  init(): Promise<void>;
  createMemory<T extends Memory>(memory: Omit<T, "id">): Promise<T>;
  searchMemories(options: SearchOptions): Promise<Memory[]>;
}
  ? true
  : false;
const _storageConforms: StorageConformance = true;

// Test 5: SearchOptions validation
const searchOpts: SearchOptions = {
  query: "deploy",
  types: ["procedural", "semantic"],
  importance: ["high", "critical"],
  limit: 10,
  orderBy: "lastAccessed",
  order: "desc",
};

// Test 6: PrunePolicy validation
const prunePolicy: PrunePolicy = {
  minAccessCount: 1,
  staleAfterDays: 90,
  keepMinimum: 100,
  preserveImportance: ["critical", "high"],
  dryRun: true,
};

// Test 7: SnapshotData validation
const snapshot: SnapshotData = {
  id: "snap_01ARZ3NDEKTSV4RRFFQ69G5FAV",
  name: "Before refactor",
  createdAt: Date.now(),
  summary: "About to refactor auth module",
  context: "Working on WHE-196",
  nextSteps: "Continue with storage implementation",
  tags: ["refactor", "auth"],
};

// Test 8: Importance type literal union
const importances: Importance[] = ["critical", "high", "normal", "low"];

// Test 9: MemoryType literal union
const memoryTypes: MemoryType[] = ["episodic", "semantic", "procedural"];

// Test 10: Self-Schema structure
const identityStatement: IdentityStatement = {
  id: "id_01ARZ3NDEKTSV4RRFFQ69G5FAV",
  statement: "I am Anima Substratia, building continuity infrastructure",
  centrality: 0.95,
  confidence: 0.9,
  sourceMemoryIds: ["mem_01ARZ3NDEKTSV4RRFFQ69G5FAV"],
  establishedAt: Date.now(),
  lastReinforcedAt: Date.now(),
};

// Export to prevent "unused" warnings (types are used at compile time)
export {
  processMemory,
  validEpisodic,
  validSemantic,
  validProcedural,
  memories,
  searchOpts,
  prunePolicy,
  snapshot,
  importances,
  memoryTypes,
  identityStatement,
};
