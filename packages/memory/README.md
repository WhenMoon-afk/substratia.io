# @substratia/memory

Unified memory infrastructure for AI agents — local-first SQLite, cloud HTTP SDK, CLI, dashboard, and Self-Schema. Part of the [Substratia](https://substratia.io) ecosystem.

## Features

- **Local-first architecture**: All operations complete locally (sub-ms), optional cloud sync
- **Three memory types**: Episodic (events), Semantic (facts), Procedural (skills)
- **Self-Schema support**: Identity statements, autobiographical narrative, reconsolidation
- **Full-text search**: FTS5-powered search without embedding overhead
- **CLI**: `substratia learn`, `substratia remember`, `substratia bridge`, and more
- **Local dashboard**: `substratia dashboard` — web UI for memory visualization
- **Portable sharing**: `substratia share` — generate standalone HTML memory panels
- **Cloud SDK**: Optional Substratia.io cloud sync via HTTP API
- **Audit trail**: Append-only provenance for compliance and debugging
- **WAL mode**: Safe concurrent reads with single writer

## Installation

```bash
npm install @substratia/memory
# or
bun add @substratia/memory
```

### SQLite Driver

The local storage requires a SQLite driver. Choose one:

- **Bun** (recommended): Built-in `bun:sqlite`, no extra install needed
- **Node.js**: Install `better-sqlite3`:
  ```bash
  npm install better-sqlite3
  ```

## CLI

The package includes a CLI for managing memories from the terminal:

```bash
# Register and get an API key (for cloud features)
substratia register "you@example.com"

# Store a memory
substratia learn "User prefers dark mode" --importance high --tags "preferences,ui"

# Search memories
substratia remember "user preferences" --limit 5

# Full context restore (memories + identity + snapshots)
substratia bridge

# Local web dashboard
substratia dashboard

# Generate a portable HTML memory panel
substratia share --with-identity --name "My Agent"

# Show configuration
substratia config
```

### Environment Variables

| Variable             | Description                        |
| -------------------- | ---------------------------------- |
| `SUBSTRATIA_API_KEY` | Override config file API key       |
| `SUBSTRATIA_API_URL` | Override default API endpoint      |
| `SUBSTRATIA_DB_PATH` | Custom database path for dashboard |

## Quick Start (Library)

```typescript
import { SQLiteStorage } from "@substratia/memory";

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

## Cloud SDK

Optional cloud sync via Substratia.io:

```typescript
import { Substratia } from "@substratia/memory/cloud";

const client = new Substratia({ apiKey: "your-api-key" });

// Store in cloud
await client.add("User prefers dark mode", { importance: "high" });

// Search cloud memories
const results = await client.search("preferences");
```

## Dashboard

Launch a local web dashboard to visualize memories and identity:

```typescript
import { startDashboard } from "@substratia/memory/dashboard";

await startDashboard({ port: 3847, open: true });
```

## Portable Sharing

Generate standalone HTML files to share agent memory state:

```typescript
import { shareToFile } from "@substratia/memory/share";

const filePath = await shareToFile("./agent-memory.db", {
  withIdentity: true,
  agentName: "My Agent",
  output: "./memory-panel.html",
});
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

## Subpath Exports

```typescript
import { SQLiteStorage } from "@substratia/memory"; // Core local storage
import { Substratia } from "@substratia/memory/cloud"; // Cloud HTTP SDK
import type { Memory } from "@substratia/memory/types"; // Type definitions
import type { SelfSchema } from "@substratia/memory/types/self-schema";
import { startDashboard } from "@substratia/memory/dashboard"; // Web dashboard
import { shareToFile } from "@substratia/memory/share"; // Portable panels
```

## License

MIT - See [LICENSE](./LICENSE) for details.

## Links

- [Documentation](https://substratia.io/docs)
- [GitHub](https://github.com/WhenMoon-afk/substratia.io)
- [Substratia.io](https://substratia.io)
