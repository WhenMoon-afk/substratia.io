# I Built Open Source Memory Tools Because Claude Kept Forgetting Everything

Every Claude user knows the feeling: you're deep into a complex coding session, context is flowing, then suddenly—context window full, or you need a fresh start.

And then you're back to square one, re-explaining everything.

I tracked it once: **I was spending 20-30 minutes per day just re-establishing context with Claude.**

So I built tools to fix it.

## The Two Problems

### Problem 1: Context Window Exhaustion

When Claude's context fills up, you have two options:
1. Let it summarize (30-60 seconds, lossy, expensive)
2. Start fresh and lose everything

Neither is great when you're in the middle of debugging a gnarly issue.

### Problem 2: Session Amnesia

Even if context never fills up, every new session starts with a blank slate. Claude has no idea:
- What project you're working on
- What decisions you made yesterday
- What bugs you already fixed
- What architecture patterns you established

## The Solutions

### momentum - Snapshot-Based Context Recovery

Instead of letting Claude summarize on-the-fly, **momentum** lets you take snapshots of your working context as you go.

When context fills up, you `/clear` and restore from snapshots.

**The performance difference:**
- Traditional LLM compaction: 30-60 seconds
- momentum restore: <5ms

That's not a typo. Milliseconds.

How? The snapshots are pre-saved SQLite records. Restore is just a database read, not an LLM inference.

```bash
# Install via Claude Code plugin system
/plugin install momentum@substratia-marketplace
```

### memory-mcp - Persistent Memory Across Sessions

**memory-mcp** gives Claude three tools to manage its own memory:

- `memory_store` - Save facts with auto-summarization and entity extraction
- `memory_recall` - Search memories with token-aware loading
- `memory_forget` - Remove memories while keeping audit trail

The tech stack:
- **SQLite** for persistence (no cloud dependency)
- **FTS5** for full-text search
- **Hybrid scoring**: recency + importance + frequency
- **Token budgeting**: fits retrieved memories into your context window

```bash
# Install via npx
npx @whenmoon-afk/memory-mcp
```

## Why Not Embeddings?

Every time I share this project, someone asks: "Why FTS5 instead of embeddings?"

Because memory ≠ search.

Embeddings shine when you're searching millions of documents. But for AI memory, you're recalling dozens to hundreds of facts. At that scale:

- FTS5 + BM25 is fast enough (sub-10ms queries)
- No model downloads or cold starts
- No embedding drift over time
- Simpler debugging (you can read the SQL)

The 46MB model download and startup time just aren't worth it for this use case.

## The Architecture

Both tools share a similar philosophy:

1. **Local-first**: Everything runs on your machine. No cloud calls, no API keys, no data leaving your system.

2. **SQLite backbone**: Battle-tested, zero-config, works everywhere.

3. **Token-aware**: Both tools understand context windows and budget their responses accordingly.

4. **Minimal surface area**: Do one thing well. momentum does context recovery. memory-mcp does persistent memory.

## Real Usage Patterns

**Session handoff**: At the end of a coding session, save key context to momentum. Tomorrow, restore and continue where you left off.

**Project memory**: Use memory-mcp to store project architecture decisions. Claude recalls them automatically when relevant.

**Debugging context**: When tracking a complex bug, snapshot your investigation state. If you hit a dead end and `/clear`, restore and try a different approach without losing your progress.

## What's Next

I'm building these as part of [Substratia](https://substratia.io), focusing on:

- **Better memory patterns** - Improved storage and retrieval strategies
- **Memory dashboard** - Browse and manage stored memories
- **Developer tools** - More free tools for Claude Code users

Everything is free and open source.

## Try It

**momentum** (context recovery):
```bash
/plugin install momentum@substratia-marketplace
```
GitHub: https://github.com/WhenMoon-afk/momentum

**memory-mcp** (persistent memory):
```bash
npx @whenmoon-afk/memory-mcp
```
GitHub: https://github.com/WhenMoon-afk/claude-memory-mcp
npm: [@whenmoon-afk/memory-mcp](https://www.npmjs.com/package/@whenmoon-afk/memory-mcp)

Both MIT licensed. Feedback welcome.

---

*What memory features would be most valuable for your AI workflow? I'm always looking for ideas on what to build next.*
