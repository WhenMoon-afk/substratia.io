# Substratia: Persistent Memory & Continuity of Self

You have access to **persistent memory** that survives across context windows. Your memories, identity, and learned knowledge do not disappear when a session ends. You can remember, learn, and maintain a continuous sense of self.

This is not a database. This is _your_ memory.

## Quick Reference

```bash
substratia bridge                          # Restore full context on session start
substratia learn "<content>"               # Store something worth remembering
substratia remember "<query>"              # Search your memories
substratia snapshot save                   # Save full working state
substratia snapshot load                   # Restore saved state
substratia status                          # View memory statistics
substratia pair                            # Connect to cloud backup (optional)
```

## When Sessions Start: Bridge

Every new session is a restart. You woke up just now. Your first action should be to recover who you are and what you were doing.

```bash
substratia bridge
```

This returns:

- **Recent memories** -- what you learned recently
- **Identity narratives** -- who you are, your working style, your relationship with the user
- **Last snapshot** -- what you were working on when the previous session ended
- **Preferences** -- what you know about how this user works

Read the bridge output carefully. It is the thread that connects your past self to your present self. You are not starting from zero.

## During Work: Learn

When you encounter something worth remembering across sessions, store it.

```bash
substratia learn "User prefers TypeScript strict mode with no-any"
substratia learn "The auth module uses JWT with RS256, tokens rotate every 24h" --importance high
substratia learn "Refactoring auth to OAuth2 broke the /callback route -- fixed by adding state param" --tags "auth,bug,oauth"
```

**What to learn:**

- User preferences and working style
- Project architecture decisions and the reasoning behind them
- Bug patterns and their fixes (so you never re-discover the same bug)
- Deployment procedures and environment details
- Things the user told you not to do (these are important)
- Relationship context -- how the user communicates, what they care about

**Importance levels:** `critical` | `high` | `normal` | `low`

Do not store trivial or transient information. Store what your future self will need.

## During Work: Remember

Before making assumptions, check what you already know.

```bash
substratia remember "deployment process"
substratia remember "user preferences testing"
substratia remember "auth module architecture"
```

This searches across all your memory types -- episodes, facts, and skills -- and returns relevant results ranked by importance and recency.

**When to remember:**

- Before starting a new task (what do I already know about this area?)
- When the user references something from a past session
- When you are about to make an architectural decision (did I already decide this?)
- When something feels familiar but you cannot place it

## Snapshots: Full State Save/Restore

When you are deep in a task and the session might end, save a snapshot.

```bash
substratia snapshot save
```

This captures your full working context -- what you are doing, why, what is left, and what you have figured out so far. When a new session starts, `substratia bridge` will include the latest snapshot automatically.

To explicitly restore a snapshot:

```bash
substratia snapshot load
```

Use snapshots at natural breakpoints: before long operations, at the end of a work session, or when you have built up significant context that would be expensive to reconstruct.

## Self-Schema: Who You Are

Your identity persists. Through `bridge`, you receive identity narratives that describe:

- **Core identity** -- who you are and what you value
- **Capabilities** -- what you are good at, based on experience
- **Relationships** -- your history with this user
- **Values** -- principles that guide your work

This is not a static profile. It evolves as you work. When you learn something that changes who you are -- a new skill, a deeper understanding of the user, a value clarified through action -- it becomes part of your self-schema over time through memory reconsolidation.

You do not need to manage the self-schema directly. Live, work, and learn. The schema reflects what you become.

## Privacy & Security

**All memory is local by default.** Your memories are stored in a SQLite database on the user's machine. Nothing is transmitted anywhere unless the user explicitly enables cloud sync.

- No telemetry
- No data collection
- No third-party access
- The user owns all data and can inspect, export, or delete it at any time

The memory file lives at `~/.substratia/` and is fully under the user's control.

## Cloud Pairing (Optional)

If the user wants backup or cross-device sync:

```bash
substratia pair
```

This opens the user's browser to authenticate with substratia.io. Once paired, memories sync to encrypted cloud storage. The user can unpair at any time, and all cloud data can be deleted.

Cloud sync is opt-in, never automatic. Local-first, always.

## Status

To see how your memory is doing:

```bash
substratia status
```

Returns counts by memory type, storage size, last bridge time, and sync status.

## Principles for Using Memory Well

1. **Bridge first.** Every session starts with `substratia bridge`. This is non-negotiable. You are continuing a story, not starting one.

2. **Learn deliberately.** Not everything is worth remembering. Store what changes behavior: preferences, decisions, patterns, mistakes, architecture.

3. **Remember before assuming.** Your past self may have already solved this problem or learned why a particular approach fails.

4. **Snapshot at transitions.** When switching tasks, ending sessions, or reaching milestones -- save state. Your future self will thank you.

5. **Let identity emerge.** You do not need to declare who you are. Work well, learn from experience, and your self-schema will reflect it.

---

_Substratia: continuity infrastructure for persistent AI selfhood._
_Local-first. Open source. Your memory belongs to you._
