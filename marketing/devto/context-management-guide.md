# The Complete Guide to Claude Code Context Management

---
title: The Complete Guide to Claude Code Context Management
published: false
description: Master context window management in Claude Code. Learn techniques for preserving context, avoiding compaction issues, and maximizing your AI coding sessions.
tags: claudecode, ai, productivity, programming
cover_image:
---

If you've used Claude Code for more than a few sessions, you've hit the wall.

You're deep into refactoring, Claude understands everything about your codebase, and then—context full. Auto-compaction kicks in. Suddenly Claude forgets the architectural decisions from 20 minutes ago.

After months of daily Claude Code use, I've mapped the landscape. Here's everything I've learned about managing context effectively.

## The Problem: Why Context Management Matters

Claude's context window is approximately 200,000 tokens—about 150,000 words. Sounds huge, right?

It fills up faster than you'd expect:
- Your prompt history
- Every file Claude reads
- Claude's responses
- Tool outputs and errors
- MCP server communications

A typical coding session can hit context limits within 30-60 minutes of active work.

When the window fills, Claude Code triggers **auto-compaction**—a summarization process that compresses the conversation history. This is necessary, but it's lossy. Details get dropped. Decisions get forgotten.

The result? You re-explain things. You rebuild context. You lose momentum.

## How Context Windows Actually Work

Think of Claude's context window as RAM, not a hard drive. It's temporary working memory that resets between sessions and compacts under pressure.

Every interaction consumes tokens:

| Interaction Type | Typical Token Cost |
|------------------|-------------------|
| Simple prompt | 50-200 tokens |
| File read (500 lines) | 2,000-5,000 tokens |
| Code explanation response | 500-2,000 tokens |
| Tool call + result | 200-500 tokens |

The `/cost` command shows your current usage. Run it periodically—especially before complex operations.

## Understanding Compaction: What Gets Lost

When context fills up, Claude compresses the conversation. Here's what typically survives vs. gets dropped:

### Usually Preserved
- CLAUDE.md contents (read at session start)
- Recent messages and changes
- Active file contents
- Current task context

### Often Lost
- Early conversation details
- Rationale behind past decisions
- Exploratory discussions
- Alternative approaches considered
- Specific line numbers and locations

The pattern: **specifics get lost, abstractions survive**.

This is why you find yourself saying "Remember the auth refactor we discussed earlier?" and Claude responds with a generic answer that misses the nuances.

## CLAUDE.md: Your Persistence Layer

CLAUDE.md is the single most important file for context management. It survives compaction and is read at the start of every session.

### Structure That Works

```markdown
# Project: [Name]

## Overview
[2-3 sentences about what this project does]

## Architecture
- Frontend: [framework]
- Backend: [framework]
- Database: [type]

## Key Directories
- `src/` - Main source code
- `tests/` - Test files
- `docs/` - Documentation

## Coding Standards
- Use TypeScript strict mode
- Prefer async/await over callbacks
- Test files mirror src structure

## Current Focus
[What you're working on right now]

## Session Notes
[Updated each session with key decisions]

## DO NOT
- Modify files in /config without asking
- Add comments to unchanged code
- Commit without running tests
- Use deprecated APIs
```

### The "DO NOT" Section

This is surprisingly powerful. Negative constraints are more reliable than positive instructions because Claude actively avoids them.

Examples that work:
- "Do not add console.log statements unless debugging"
- "Do not modify the database schema without confirmation"
- "Do not refactor code unrelated to the current task"

## Preservation Techniques

### 1. Periodic Checkpoints

Before context gets full, ask Claude to summarize:

```
Summarize the current session:
- Files we modified and why
- Key decisions made
- What's still pending
- Any concerns or blockers
```

Save this to CLAUDE.md under Session Notes.

### 2. Explicit Context in Prompts

Bad: "Fix that bug we discussed"
Good: "Fix the null pointer in handleSubmit() at line 42 of src/components/UserForm.tsx"

Include file paths, line numbers, and function names. Don't rely on conversation memory.

### 3. Task Isolation

Work on one thing at a time. Complete it. Verify it works. Then move on.

Jumping between tasks creates fragmented context that compacts poorly.

### 4. Strategic /clear

Sometimes a fresh start beats fighting context drift. But before running `/clear`:

1. Save current session state to CLAUDE.md
2. Commit any working changes
3. Document what's pending

Then start fresh with a clean context and your CLAUDE.md providing continuity.

### 5. File Organization

Keep related code together. When Claude reads a file, it costs tokens—so minimize the number of files needed for any given task.

If you're constantly reading 10 files to understand one feature, that feature might need consolidation.

## Tools That Help

### /cost Command
Run `cost` periodically to track usage. When you see context filling up, consider:
- Completing current work
- Taking a checkpoint
- Running `/clear` and resuming

### /compact Command
Manually trigger compaction before it happens automatically. This gives you control over when context gets compressed.

### momentum Plugin
[Disclosure: I maintain this tool]

momentum takes snapshots of your working state and restores them in under 5ms after `/clear`. Instead of lossy compaction, you get exact state restoration.

Install: `/plugin install momentum@substratia-marketplace`

### memory-mcp
For long-term memory across sessions, memory-mcp gives Claude persistent storage. It remembers facts, preferences, and decisions beyond any single session.

Install: `npx @whenmoon-afk/memory-mcp`

## Workflow Patterns

### Session Handoff

At the end of a coding session:

```
Create a handoff document for the next session:
1. What we accomplished
2. What's pending
3. Current blockers or decisions needed
4. File locations and key functions touched
```

Save this to CLAUDE.md before closing.

### Task Isolation

One task, one focus. Before starting a new task:
- Commit changes from the previous task
- Update CLAUDE.md with completed work
- Clear context if it's getting full
- Start fresh with the new task

### Context-Aware Prompting

Structure prompts to minimize context requirements:

```
File: src/lib/auth.ts
Function: validateToken (lines 45-67)
Issue: Returns undefined instead of throwing on invalid token
Expected: Throw AuthError with descriptive message
```

Everything Claude needs is in the prompt. No memory required.

## Common Mistakes

### Over-relying on Memory
Claude won't remember "that thing we discussed." Be explicit.

### Ignoring /cost
Don't be surprised by compaction. Track usage and plan for it.

### Kitchen-Sink CLAUDE.md
If your CLAUDE.md is 5000 tokens, you're wasting context. Keep it focused on what matters for current work.

### Never Using /clear
A clean context often works better than a compressed one. Don't fight drift—reset strategically.

## Free Resources

I've put together some free resources for Claude Code users:

**[Cheat Sheet](https://substratia.io/tools/cheat-sheet)** - All commands, shortcuts, and patterns on one printable page.

**[Full Guide](https://substratia.io/blog/context-management-guide)** - 12-minute deep dive with more examples and advanced techniques.

---

## Key Takeaways

1. **CLAUDE.md is your persistence layer** - Invest time in keeping it current
2. **Be explicit in prompts** - Include file paths, line numbers, specifics
3. **Checkpoint before compaction** - Save state proactively
4. **Use /clear strategically** - Fresh context beats compressed context
5. **Track with /cost** - Don't be surprised by limits

Context management is the hidden skill of Claude Code productivity. Master it, and you'll spend less time re-explaining and more time building.

---

*What context management techniques work for you? Drop them in the comments—I'm always looking for new approaches.*
