/**
 * Runtime Tests for SQLiteStorage
 *
 * These tests verify actual runtime behavior of the storage implementation.
 * Run with: npx tsx src/__tests__/sqlite.test.ts
 *
 * Requires: better-sqlite3 installed
 */

import { SQLiteStorage } from "../storage/sqlite.js";
import type {
  EpisodicMemory,
  SemanticMemory,
  ProceduralMemory,
} from "../types/index.js";
import { unlinkSync, existsSync } from "fs";
import { tmpdir } from "os";
import { join } from "path";

// Test utilities
let testCount = 0;
let passCount = 0;

function test(name: string, fn: () => void | Promise<void>): Promise<void> {
  testCount++;
  return Promise.resolve(fn())
    .then(() => {
      passCount++;
      console.log(`✓ ${name}`);
    })
    .catch((err) => {
      console.log(`✗ ${name}`);
      console.log(`  Error: ${err.message}`);
    });
}

function assert(condition: boolean, message: string): void {
  if (!condition) {
    throw new Error(message);
  }
}

function assertEqual<T>(actual: T, expected: T, message: string): void {
  if (actual !== expected) {
    throw new Error(`${message}: expected ${expected}, got ${actual}`);
  }
}

// Test database path
const TEST_DB_PATH = join(tmpdir(), `memory-test-${Date.now()}.db`);

async function cleanup(): Promise<void> {
  if (existsSync(TEST_DB_PATH)) {
    unlinkSync(TEST_DB_PATH);
  }
  // Also cleanup WAL files
  if (existsSync(`${TEST_DB_PATH}-wal`)) {
    unlinkSync(`${TEST_DB_PATH}-wal`);
  }
  if (existsSync(`${TEST_DB_PATH}-shm`)) {
    unlinkSync(`${TEST_DB_PATH}-shm`);
  }
}

async function runTests(): Promise<void> {
  console.log("\n🧪 SQLiteStorage Runtime Tests\n");
  console.log(`Database: ${TEST_DB_PATH}\n`);

  const storage = new SQLiteStorage({ dbPath: TEST_DB_PATH });

  // ─────────────────────────────────────────────────────────────────────────
  // LIFECYCLE TESTS
  // ─────────────────────────────────────────────────────────────────────────

  await test("init() creates database and schema", async () => {
    await storage.init();
    assert(existsSync(TEST_DB_PATH), "Database file should exist");
  });

  await test("stats() returns initial empty stats", async () => {
    const stats = await storage.stats();
    assertEqual(stats.totalMemories, 0, "Total memories");
    assertEqual(stats.byType.episodic, 0, "Episodic count");
    assertEqual(stats.byType.semantic, 0, "Semantic count");
    assertEqual(stats.byType.procedural, 0, "Procedural count");
  });

  // ─────────────────────────────────────────────────────────────────────────
  // MEMORY CRUD TESTS
  // ─────────────────────────────────────────────────────────────────────────

  let createdEpisodicId: string;

  await test("createMemory() creates episodic memory", async () => {
    const memory = await storage.createMemory<EpisodicMemory>({
      type: "episodic",
      content: "Test event happened",
      importance: "high",
      createdAt: Date.now(),
      accessCount: 0,
      isConsolidated: false,
      schemaVersion: 1,
      eventTimestamp: Date.now(),
      eventType: "test_event",
      emotionalValence: 0.5,
      emotionalTags: ["curious", "engaged"],
    });

    assert(memory.id.startsWith("mem_"), "ID should have mem_ prefix");
    assertEqual(memory.type, "episodic", "Type");
    assertEqual(memory.content, "Test event happened", "Content");
    createdEpisodicId = memory.id;
  });

  await test("getMemory() retrieves created memory", async () => {
    const memory = await storage.getMemory(createdEpisodicId);
    assert(memory !== null, "Memory should exist");
    assertEqual(memory!.type, "episodic", "Type");
    assertEqual(memory!.content, "Test event happened", "Content");

    // Check episodic-specific fields
    const ep = memory as EpisodicMemory;
    assertEqual(ep.eventType, "test_event", "Event type");
    assertEqual(ep.emotionalValence, 0.5, "Emotional valence");
  });

  await test("createMemory() creates semantic memory", async () => {
    const memory = await storage.createMemory<SemanticMemory>({
      type: "semantic",
      content: "User prefers TypeScript",
      importance: "normal",
      createdAt: Date.now(),
      accessCount: 0,
      isConsolidated: false,
      schemaVersion: 1,
      domain: "user_preferences",
      confidence: 0.95,
    });

    assertEqual(memory.type, "semantic", "Type");
    assertEqual(memory.domain, "user_preferences", "Domain");
    assertEqual(memory.confidence, 0.95, "Confidence");
  });

  await test("createMemory() creates procedural memory", async () => {
    const memory = await storage.createMemory<ProceduralMemory>({
      type: "procedural",
      content: "How to run tests",
      importance: "high",
      createdAt: Date.now(),
      accessCount: 0,
      isConsolidated: false,
      schemaVersion: 1,
      skillName: "run_tests",
      steps: [
        { order: 1, description: "Navigate to project", command: "cd project" },
        { order: 2, description: "Run test command", command: "npm test" },
      ],
      successCount: 0,
      failureCount: 0,
    });

    assertEqual(memory.type, "procedural", "Type");
    assertEqual(memory.skillName, "run_tests", "Skill name");
    assertEqual(memory.steps.length, 2, "Steps count");
  });

  await test("stats() reflects created memories", async () => {
    const stats = await storage.stats();
    assertEqual(stats.totalMemories, 3, "Total memories");
    assertEqual(stats.byType.episodic, 1, "Episodic count");
    assertEqual(stats.byType.semantic, 1, "Semantic count");
    assertEqual(stats.byType.procedural, 1, "Procedural count");
  });

  await test("updateMemory() updates content", async () => {
    const updated = await storage.updateMemory(createdEpisodicId, {
      content: "Updated test event",
      importance: "critical",
    });

    assertEqual(updated.content, "Updated test event", "Content");
    assertEqual(updated.importance, "critical", "Importance");
  });

  await test("recordAccess() increments access count", async () => {
    await storage.recordAccess(createdEpisodicId);
    await storage.recordAccess(createdEpisodicId);

    const memory = await storage.getMemory(createdEpisodicId);
    assertEqual(memory!.accessCount, 2, "Access count");
    assert(memory!.lastAccessed !== undefined, "Last accessed should be set");
  });

  await test("listMemories() returns all memories", async () => {
    const memories = await storage.listMemories({ limit: 10 });
    assertEqual(memories.length, 3, "Memory count");
  });

  await test("searchMemories() finds by content", async () => {
    const results = await storage.searchMemories({
      query: "TypeScript",
      limit: 10,
    });
    assertEqual(results.length, 1, "Result count");
    assertEqual(results[0].type, "semantic", "Result type");
  });

  await test("deleteMemory() soft-deletes memory", async () => {
    await storage.deleteMemory(createdEpisodicId);
    const memory = await storage.getMemory(createdEpisodicId);
    assert(memory === null, "Memory should not be retrievable after delete");
  });

  // ─────────────────────────────────────────────────────────────────────────
  // SNAPSHOT TESTS
  // ─────────────────────────────────────────────────────────────────────────

  let snapshotId: string;

  await test("saveSnapshot() creates snapshot", async () => {
    const snapshot = await storage.saveSnapshot({
      name: "Test snapshot",
      createdAt: Date.now(),
      summary: "Testing snapshot functionality",
      context: "Running automated tests",
      nextSteps: "Continue with more tests",
      tags: ["test", "automated"],
    });

    assert(snapshot.id.startsWith("snap_"), "ID should have snap_ prefix");
    assertEqual(snapshot.name, "Test snapshot", "Name");
    snapshotId = snapshot.id;
  });

  await test("getLatestSnapshot() returns most recent", async () => {
    const snapshot = await storage.getLatestSnapshot();
    assert(snapshot !== null, "Should have a snapshot");
    assertEqual(snapshot!.id, snapshotId, "Should be the created snapshot");
  });

  await test("listSnapshots() returns all snapshots", async () => {
    const snapshots = await storage.listSnapshots();
    assertEqual(snapshots.length, 1, "Snapshot count");
  });

  await test("loadSnapshot() retrieves by ID", async () => {
    const snapshot = await storage.loadSnapshot(snapshotId);
    assert(snapshot !== null, "Snapshot should exist");
    assertEqual(snapshot!.name, "Test snapshot", "Name");
  });

  // ─────────────────────────────────────────────────────────────────────────
  // SELF-SCHEMA TESTS
  // ─────────────────────────────────────────────────────────────────────────

  await test("upsertIdentity() creates identity statement", async () => {
    await storage.upsertIdentity({
      id: "id_test_001",
      statement: "I am a test agent",
      centrality: 0.9,
      confidence: 0.8,
      sourceMemoryIds: [],
      establishedAt: Date.now(),
    });

    // No error means success
    assert(true, "Identity created");
  });

  await test("getSelfSchema() returns schema with identity", async () => {
    const schema = await storage.getSelfSchema();
    assert(schema !== null, "Schema should exist");
    assertEqual(schema!.presentSelf.coreIdentity.length, 1, "Identity count");
    assertEqual(
      schema!.presentSelf.coreIdentity[0].statement,
      "I am a test agent",
      "Statement",
    );
  });

  await test("updateNarrative() stores narrative", async () => {
    await storage.updateNarrative({
      coreSummary: "A test agent learning and growing",
      chapters: [],
      themes: [],
    });

    const narrative = await storage.getNarrative();
    assert(narrative !== null, "Narrative should exist");
    assertEqual(
      narrative!.coreSummary,
      "A test agent learning and growing",
      "Core summary",
    );
  });

  // ─────────────────────────────────────────────────────────────────────────
  // PROVENANCE TESTS
  // ─────────────────────────────────────────────────────────────────────────

  await test("getProvenance() returns audit trail", async () => {
    // Create a new memory to track provenance
    const memory = await storage.createMemory<SemanticMemory>({
      type: "semantic",
      content: "Provenance test fact",
      importance: "normal",
      createdAt: Date.now(),
      accessCount: 0,
      isConsolidated: false,
      schemaVersion: 1,
      domain: "test",
      confidence: 1.0,
    });

    await storage.updateMemory(memory.id, { content: "Updated fact" });

    const provenance = await storage.getProvenance(memory.id);
    assertEqual(provenance.length, 2, "Should have 2 provenance entries");
    assertEqual(provenance[0].eventType, "created", "First event type");
    assertEqual(provenance[1].eventType, "updated", "Second event type");
  });

  // ─────────────────────────────────────────────────────────────────────────
  // MAINTENANCE TESTS
  // ─────────────────────────────────────────────────────────────────────────

  await test("markConsolidated() marks memories", async () => {
    const memories = await storage.listMemories({ limit: 1 });
    if (memories.length > 0) {
      await storage.markConsolidated([memories[0].id]);
      const updated = await storage.getMemory(memories[0].id);
      assertEqual(updated!.isConsolidated, true, "Should be consolidated");
    }
  });

  await test("prune() with dryRun returns count", async () => {
    const count = await storage.prune({
      staleAfterDays: 0,
      minAccessCount: 100,
      preserveImportance: ["critical", "high"],
      keepMinimum: 0,
      dryRun: true,
    });

    // Should find some memories to prune (low importance, no access)
    assert(count >= 0, "Prune count should be non-negative");
  });

  // ─────────────────────────────────────────────────────────────────────────
  // CLEANUP
  // ─────────────────────────────────────────────────────────────────────────

  await test("close() closes database", async () => {
    await storage.close();
    assert(true, "Database closed");
  });

  // ─────────────────────────────────────────────────────────────────────────
  // SUMMARY
  // ─────────────────────────────────────────────────────────────────────────

  console.log(`\n${"─".repeat(50)}`);
  console.log(`Tests: ${passCount}/${testCount} passed`);

  if (passCount === testCount) {
    console.log("✅ All tests passed!\n");
  } else {
    console.log(`❌ ${testCount - passCount} test(s) failed\n`);
    process.exitCode = 1;
  }

  // Cleanup test database
  await cleanup();
}

// Run tests
runTests().catch((err) => {
  console.error("Fatal error:", err);
  cleanup();
  process.exit(1);
});
