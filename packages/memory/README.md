# @substratia/memory-local

Local-first memory infrastructure for AI agents. Part of the [Substratia](https://substratia.io) ecosystem.

## Features

- **Local-first architecture**: All operations complete locally (sub-ms), optional cloud sync
- **Three memory types**: Episodic (events), Semantic (facts), Procedural (skills)
- **Self-Schema support**: Identity statements, autobiographical narrative, reconsolidation
- **Full-text search**: FTS5-powered search without embedding overhead
- **Audit trail**: Append-only provenance for compliance and debugging
- **WAL mode**: Safe concurrent reads with single writer

## Installation

```bash
npm install @substratia/memory-local
# or
bun add @substratia/memory-local
```

### SQLite Driver

The package requires a SQLite driver. Choose one:

- **Bun** (recommended): Built-in `bun:sqlite`, no extra install needed
- **Node.js**: Install `better-sqlite3`:
  ```bash
  npm install better-sqlite3
  ```

## Quick Start

```typescript
import { SQLiteStorage } from "@substratia/memory-local";

// Initialize storage
const storage = new SQLiteStorage({ dbPath: "./agent-memory.db" });
await storage.init();

// Create an episodic memory
const memory = await storage.createMemory({
  type: "episodic",
  content: "Successfully deployed first feature",
  importance: "high",
  eventTimestamp: Date.now(),
  eventType: "task_completion",
  emotionalValence: 0.8,
  emotionalTags: ["pride", "accomplishment"],
});

// Search memories
const results = await storage.searchMemories({
  query: "deployed feature",
  types: ["episodic"],
  limit: 10,
});

// Save a snapshot for context handoff
await storage.saveSnapshot({
  name: "Pre-handoff snapshot",
  summary: "Working on feature X",
  context: "Just finished deployment, tests passing",
  nextSteps: "Monitor production metrics",
});
```

## Memory Types

### Episodic Memory

Events and experiences with temporal context:

```typescript
interface EpisodicMemory {
  type: "episodic";
  content: string;
  eventTimestamp: number;
  eventType: string;
  emotionalValence?: number; // -1 to 1
  emotionalTags?: string[]; // ['pride', 'frustration', etc.]
  participants?: string[];
  location?: string;
}
```

### Semantic Memory

Facts and knowledge:

```typescript
interface SemanticMemory {
  type: "semantic";
  content: string;
  domain: string; // 'user_preferences', 'codebase', etc.
  confidence: number; // 0 to 1
  sourceMemoryIds?: string[]; // Episodic memories this derives from
}
```

### Procedural Memory

Skills and how-to knowledge:

```typescript
interface ProceduralMemory {
  type: "procedural";
  content: string;
  skillName: string;
  steps: Array<{
    order: number;
    description: string;
    command?: string;
  }>;
  successCount: number;
  failureCount: number;
}
```

## Self-Schema

Identity persistence across sessions:

```typescript
// Create identity statement
await storage.upsertIdentity({
  id: "id_001",
  statement: "I am a development assistant focused on code quality",
  centrality: 0.9,
  confidence: 0.85,
  sourceMemoryIds: ["mem_123", "mem_456"],
  establishedAt: Date.now(),
});

// Update autobiographical narrative
await storage.updateNarrative({
  coreSummary: "An AI agent learning to be helpful while maintaining integrity",
  chapters: [
    {
      title: "Early Development",
      summary: "First interactions with Ceres...",
      startDate: Date.now(),
    },
  ],
  themes: ["growth", "collaboration", "quality"],
});

// Get full self-schema
const schema = await storage.getSelfSchema();
```

## Maintenance

```typescript
// Mark memories as consolidated (processed by higher-order thinking)
await storage.markConsolidated(["mem_001", "mem_002"]);

// Prune old, low-value memories
const pruned = await storage.prune({
  staleAfterDays: 90,
  minAccessCount: 2,
  preserveImportance: ["critical", "high"],
  keepMinimum: 100,
  dryRun: true, // Preview before deleting
});

// Get statistics
const stats = await storage.stats();
// { totalMemories: 150, byType: { episodic: 80, semantic: 50, procedural: 20 }, ... }
```

## Cloud Sync (Coming Soon)

Substratia.io provides optional cloud sync for backup and cross-device access:

```typescript
// Coming in @substratia/memory-sync
import { SyncManager } from "@substratia/memory-sync";

const sync = new SyncManager({
  storage,
  apiKey: "your-substratia-api-key",
});

await sync.start(); // Background sync
```

## License

MIT - See [LICENSE](./LICENSE) for details.

## Related Packages

- `@substratia/cli` - Command-line interface for memory management
- `@substratia/memory-sync` - Cloud sync (coming soon)

## Links

- [Documentation](https://substratia.io/docs)
- [GitHub](https://github.com/WhenMoon-afk/substratia.io)
- [Substratia.io](https://substratia.io)
