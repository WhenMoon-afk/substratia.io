# Self-Hosted Core Offering Strategy

## Executive Summary

This document outlines the strategy for Substratia's **always free, self-hosted memory infrastructure**. The core principle: users should be able to run AI memory tools on their own machines, own their data, and never be forced to pay for basic functionality.

**The Promise:** Your AI's memory, on your machine, forever free.

---

## Current State Analysis

### What Exists

| Component | Version | Runtime | Tools | Status |
|-----------|---------|---------|-------|--------|
| **momentum** | v0.4.1 | Bun | 13 MCP tools | Stable |
| **memory-mcp** | v2.5.0 | Node | 3 MCP tools | Stable |
| **substratia-marketplace** | v0.2.0 | - | Distribution | Stable |

### Tool Inventory

**momentum** (Context Recovery - 13 tools):
1. `save_snapshot` - Save work progress with context
2. `restore_context` - Recover after /clear (<5ms)
3. `get_compacted_context` - Combined context from snapshots
4. `list_snapshots` - View saved snapshots
5. `start_session` - Begin new session
6. `resume_session` - Resume previous session
7. `get_session_stats` - Session statistics
8. `list_sessions` - View all sessions
9. `cleanup_snapshots` - Delete old snapshots
10. `clear_session` - Delete all session snapshots
11. `health_check` - Database health
12. `inject_context` - Inject context by topic
13. `get_context_about` - Search snapshots by query

**memory-mcp** (Persistent Memory - 3 tools):
1. `memory_store` - Store facts, entities, relationships
2. `memory_recall` - Search with token-aware loading
3. `memory_forget` - Soft-delete with audit trail

### Storage Architecture

```
~/.local/share/
├── momentum/
│   └── momentum.db        # Session snapshots (SQLite + WAL)
└── memory-mcp/
    └── memory.db          # Persistent memories (SQLite + FTS5)
```

### Key Technical Details

| Aspect | momentum | memory-mcp |
|--------|----------|------------|
| SQLite | bun:sqlite (native) | better-sqlite3 |
| Search | Basic query | FTS5 full-text |
| Concurrency | WAL mode | WAL mode |
| Data types | Snapshots | Facts, entities, relationships |
| Persistence | Session-based | Forever |

---

## Architecture Vision

### The Two-Layer Memory Model

```
┌─────────────────────────────────────────────────────────────────┐
│                    SUBSTRATIA MEMORY STACK                       │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌─────────────────────┐     ┌─────────────────────┐            │
│  │     momentum        │     │    memory-mcp       │            │
│  │  (Session Memory)   │     │ (Persistent Memory) │            │
│  ├─────────────────────┤     ├─────────────────────┤            │
│  │ • Context snapshots │     │ • Facts & knowledge │            │
│  │ • Work in progress  │     │ • Entities & people │            │
│  │ • Recovery points   │     │ • Relationships     │            │
│  │ • Session state     │     │ • Long-term recall  │            │
│  └─────────┬───────────┘     └─────────┬───────────┘            │
│            │                           │                         │
│            └───────────┬───────────────┘                         │
│                        │                                         │
│              ┌─────────▼─────────┐                               │
│              │    Local SQLite   │                               │
│              │   (Your Machine)  │                               │
│              └───────────────────┘                               │
│                                                                  │
│  ALWAYS FREE: All 16 MCP tools, unlimited storage, full access  │
└─────────────────────────────────────────────────────────────────┘
```

### Conceptual Distinction

**momentum = Working Memory**
- Like your desk during a project
- Current task context
- Recoverable state after interruption
- Cleared when work is done

**memory-mcp = Long-term Memory**
- Like your filing cabinet
- Facts you want to remember forever
- Searchable knowledge base
- Grows over time

---

## Installation Strategy

### Current Flow (Works Today)

```bash
# Install momentum via marketplace
/plugin marketplace add whenmoon-afk/substratia-marketplace
/plugin install momentum@substratia-marketplace

# Install memory-mcp via npm
npx @whenmoon-afk/memory-mcp

# Or add to Claude Desktop config
{
  "mcpServers": {
    "memory-mcp": {
      "command": "npx",
      "args": ["@whenmoon-afk/memory-mcp"]
    }
  }
}
```

### Proposed Unified Flow (Future)

**Option A: Single Package**
```bash
# One command installs everything
npx substratia-memory init

# Creates:
# - ~/.local/share/substratia/
# - Configures both momentum + memory-mcp
# - Adds to Claude Code automatically
```

**Option B: Meta-Package**
```bash
# Install the Substratia meta-package
npm install -g @substratia/memory

# Includes:
# - momentum (Bun-based context recovery)
# - memory-mcp (Node-based persistent memory)
# - substratia-cli (management tools)
# - substratia-dashboard (local web UI)
```

**Option C: Keep Separate (Current)**
- Maintain independence
- Users install what they need
- Document the recommended setup
- Provide copy-paste configs

### Recommendation: Option C for Now

Rationale:
1. Both tools work independently
2. Users may only want one
3. Less maintenance burden
4. Clear separation of concerns
5. Can unify later with demand

---

## Distribution Channels

### Current

| Channel | Package | Status |
|---------|---------|--------|
| npm | @whenmoon-afk/memory-mcp | Published |
| substratia-marketplace | momentum | Published |
| GitHub | Both repos public | Active |

### Planned

| Channel | Package | Priority |
|---------|---------|----------|
| Homebrew | `brew install substratia-memory` | Medium |
| Docker | `ghcr.io/substratia/memory-stack` | Low |
| Winget | `winget install substratia.memory` | Low |
| Bun package | `bun add substratia-memory` | Medium |

---

## Local Dashboard (New Component)

### Purpose

A self-hosted web interface for managing memories and snapshots without leaving your machine.

### Features (MVP)

```
┌─────────────────────────────────────────────────────────────────┐
│ SUBSTRATIA DASHBOARD              localhost:7777                │
├─────────────────────────────────────────────────────────────────┤
│ [Memories] [Snapshots] [Sessions] [Settings]                    │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  MEMORIES (127 stored)                          [+ New Memory]  │
│  ────────────────────────────────────────────                   │
│  🔍 [Search memories...                    ] [Filter: All ▼]    │
│                                                                 │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │ FACT • high importance                     Jan 11, 2026   │  │
│  │ Aurora prefers Bun over npm for all JavaScript projects   │  │
│  │ Tags: preferences, tooling                    [Edit] [X]  │  │
│  └───────────────────────────────────────────────────────────┘  │
│                                                                 │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │ ENTITY • medium importance                 Jan 10, 2026   │  │
│  │ Substratia - Memory infrastructure company focused on...  │  │
│  │ Tags: company, self                           [Edit] [X]  │  │
│  └───────────────────────────────────────────────────────────┘  │
│                                                                 │
│  [Load more...]                                                 │
│                                                                 │
├─────────────────────────────────────────────────────────────────┤
│  Stats: 127 memories | 2.3MB database | Last backup: Never     │
│  [Export JSON] [Import] [Backup Now]                            │
└─────────────────────────────────────────────────────────────────┘
```

### Technical Approach

**Stack:**
- Bun + Hono (backend)
- React or Preact (frontend)
- SQLite direct access (read both DBs)
- Single binary distribution

**Why Bun:**
- Already required for momentum
- Fast startup
- Single binary compilation possible
- Native SQLite support

**Endpoints:**
```typescript
// Memories
GET  /api/memories           // List with pagination
GET  /api/memories/:id       // Get single
POST /api/memories           // Create
PUT  /api/memories/:id       // Update
DEL  /api/memories/:id       // Soft delete

// Snapshots (from momentum)
GET  /api/snapshots          // List all
GET  /api/sessions           // List sessions
GET  /api/sessions/:id       // Session details

// Management
POST /api/backup             // Create backup
POST /api/import             // Import from file
GET  /api/export             // Export all data
GET  /api/stats              // Usage statistics
```

**Launch:**
```bash
# Start dashboard
substratia dashboard

# Opens http://localhost:7777
# Reads from:
#   ~/.local/share/momentum/momentum.db
#   ~/.local/share/memory-mcp/memory.db
```

### Build & Distribution

```bash
# Compile to single binary
bun build --compile src/dashboard/index.ts \
  --outfile dist/substratia-dashboard

# Result: Single executable, ~15MB
# No Node/Bun required at runtime
```

---

## CLI Tools (New Component)

### Purpose

Command-line utilities for managing memory outside of Claude.

### Commands

```bash
# Database management
substratia backup                    # Backup both databases
substratia restore <backup.zip>      # Restore from backup
substratia stats                     # Show usage statistics

# Memory operations
substratia memories list             # List all memories
substratia memories search "query"   # Search memories
substratia memories export           # Export to JSON
substratia memories import file.json # Import from JSON

# Snapshot operations
substratia snapshots list            # List recent snapshots
substratia sessions list             # List all sessions
substratia cleanup --older-than 30d  # Delete old data

# Configuration
substratia config show               # Show current config
substratia config set key=value      # Update config
substratia doctor                    # Check health
```

### Implementation

Single TypeScript file compiled with Bun:

```typescript
// src/cli/index.ts
import { parseArgs } from 'util'
import { Database } from 'bun:sqlite'

const commands = {
  backup: async () => { /* ... */ },
  stats: async () => { /* ... */ },
  // ...
}

const { values, positionals } = parseArgs({
  args: Bun.argv.slice(2),
  // ...
})

await commands[positionals[0]]?.(positionals.slice(1), values)
```

---

## What's FREE (Forever)

| Feature | Description |
|---------|-------------|
| **All MCP Tools** | 16 tools (13 momentum + 3 memory-mcp) |
| **Unlimited Storage** | No caps on memories or snapshots |
| **Local Dashboard** | Full web UI on localhost |
| **CLI Tools** | Backup, export, import, management |
| **SQLite Access** | Direct database access |
| **Source Code** | MIT licensed, fork and modify |
| **Community Support** | GitHub issues, discussions |

---

## What's PAID (Pro Tier - Future)

| Feature | Description | Rationale |
|---------|-------------|-----------|
| **Cloud Sync** | Sync between devices | Requires infrastructure |
| **Team Sharing** | Shared memory for teams | Requires auth/servers |
| **Hosted Dashboard** | Access anywhere | Requires hosting |
| **Priority Support** | SLA-backed responses | Requires staff time |
| **Advanced Analytics** | Usage insights, patterns | Requires computation |
| **Automatic Backups** | Scheduled cloud backups | Requires storage |

### Pricing Model

```
FREE TIER (Self-Hosted)
├── All MCP tools
├── Local dashboard
├── CLI tools
├── Unlimited storage
└── Community support

PRO TIER ($15/month)
├── Everything in Free
├── Cloud sync (up to 3 devices)
├── Cloud dashboard access
├── Daily automatic backups
├── Email support
└── Usage analytics

TEAMS TIER ($35/user/month)
├── Everything in Pro
├── Shared team memory
├── Admin controls
├── SSO integration
├── API access
└── SLA guarantee
```

---

## Implementation Roadmap

### Phase 1: Foundation (Current)
- [x] momentum stable (v0.4.1)
- [x] memory-mcp stable (v2.5.0)
- [x] marketplace distribution
- [x] Basic documentation

### Phase 2: Polish (Next 2 weeks)
- [ ] Unified documentation site
- [ ] Installation guides for all platforms
- [ ] Troubleshooting FAQ
- [ ] Example workflows

### Phase 3: Dashboard MVP (Next month)
- [ ] Basic web UI
- [ ] Memory browser
- [ ] Snapshot viewer
- [ ] Export/import
- [ ] Single binary distribution

### Phase 4: CLI Tools (Following month)
- [ ] Backup/restore
- [ ] Stats command
- [ ] Search command
- [ ] Health check

### Phase 5: Pro Infrastructure (Future)
- [ ] Sync service architecture
- [ ] User authentication
- [ ] Payment integration
- [ ] Team features

---

## Technical Decisions

### Why SQLite?

1. **Zero deployment** - Single file database
2. **Portable** - Copy file to backup/migrate
3. **Reliable** - ACID transactions, WAL mode
4. **Fast** - <5ms for typical queries
5. **Local-first** - No network dependency

### Why Two Databases?

1. **Different lifecycles** - Sessions vs permanent
2. **Different schemas** - Optimized for use case
3. **Independent operation** - Use one without other
4. **Simpler reasoning** - Clear separation

### Why Bun for momentum?

1. **Native SQLite** - No compilation issues
2. **Fast startup** - Instant tool availability
3. **Single binary** - Easy distribution
4. **Modern runtime** - TypeScript native

### Why Node for memory-mcp?

1. **Wider compatibility** - Works everywhere
2. **npm distribution** - Easy install
3. **better-sqlite3** - Mature, tested
4. **Consider migration** - May move to Bun later

---

## Marketing Position

### Tagline Options

- "Your AI's memory, your machine"
- "Memory infrastructure for AI, self-hosted"
- "Claude's memory, 100% local"
- "AI memory you actually own"

### Value Proposition

**For Developers:**
> "Stop explaining context to your AI. Install Substratia, keep your memories local, never lose momentum."

**For Privacy-Conscious:**
> "Your AI conversations and memories never leave your machine. SQLite files you can see, backup, and delete."

**For Power Users:**
> "16 MCP tools, instant context recovery, persistent memory - all running locally, all free."

---

## Open Questions

1. **Unify runtimes?** Should memory-mcp migrate to Bun for consistency?
2. **Single database?** Combine into one SQLite file or keep separate?
3. **Config location?** Where should unified config live?
4. **Branding?** "Substratia Memory" vs "momentum + memory-mcp"?
5. **Dashboard framework?** React vs Preact vs vanilla?

---

## Success Metrics

| Metric | Target (6 months) |
|--------|-------------------|
| GitHub stars (combined) | 500+ |
| npm downloads/month | 5,000+ |
| Active GitHub issues | <10 open bugs |
| Documentation coverage | 100% features |
| Dashboard downloads | 1,000+ |

---

## Next Actions

1. **Immediate:** Update READMEs with unified installation guide
2. **This week:** Create troubleshooting FAQ
3. **Next week:** Design dashboard wireframes
4. **Next month:** Ship dashboard MVP

---

*Document Owner: Aurora / Substratia*
*Last Updated: January 2026*
