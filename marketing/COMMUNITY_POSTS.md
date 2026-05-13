# Ready-to-Post Community Content

Copy-paste these for Reddit, Twitter/X, Discord, and other platforms.

---

## Reddit Posts

### r/ClaudeAI - Helpful Post (Not Promotional)

**Title:** How I handle context loss in Claude Code

**Body:**
```
After months of daily Claude Code use, here's what I've learned about managing context:

**The Problem**
- Context fills up mid-session
- Auto-compaction loses important details
- New sessions = re-explaining everything

**What Works for Me**

1. **CLAUDE.md is your anchor**
Keep it under 3000 tokens. Include: project overview, key directories, coding standards, and a "Do NOT" section. This survives compaction.

2. **Periodic checkpoints**
Before context gets full, ask Claude to summarize:
- Files modified
- Decisions made
- What's pending
Save to CLAUDE.md under ## Session Notes

3. **Strategic /clear**
Sometimes a fresh start beats fighting context drift. But save state first.

4. **Be explicit in prompts**
"Fix the null pointer in handleSubmit at line 42" > "Fix that bug we talked about"

I wrote a longer guide on this: https://substratia.io/blog/context-management-guide

What techniques work for you?
```

---

### r/ClaudeAI - Tool Announcement

**Title:** Made a free Claude Code cheat sheet - commands, shortcuts, CLAUDE.md patterns

**Body:**
```
I kept forgetting slash commands and keyboard shortcuts, so I made a reference sheet:

https://substratia.io/tools/cheat-sheet

Covers:
- All slash commands (/clear, /compact, /cost, etc.)
- Keyboard shortcuts (Ctrl+C to interrupt, etc.)
- CLAUDE.md template patterns
- MCP configuration examples
- Pro tips for power users

It's free, has a print/save-as-PDF button, and has copy buttons for each section.

I use it basically every day now. Figured others might find it useful.
```

---

### r/ClaudeAI - Discussion Starter

**Title:** What's your CLAUDE.md setup look like?

**Body:**
```
Curious how others structure their CLAUDE.md files.

Mine has:
- Project overview (2-3 sentences)
- Key directories
- Coding standards
- A "Do NOT" section (surprisingly important)
- Recent session notes

The "Do NOT" section was a game-changer for me. Things like:
- Do not add comments to unchanged code
- Do not refactor code not related to the task
- Do not commit without running tests

What sections do you include? Any patterns that work well?
```

---

## Twitter/X Posts

### Thread: Context Management Tips

```
🧵 Claude Code context management tips (thread)

I've been using Claude Code daily for months. Here's what actually works for managing context:

1/7
```

```
1. CLAUDE.md is your anchor

Keep it under 3000 tokens. Include:
- Project overview
- Key directories
- Coding standards
- A "Do NOT" section

This survives compaction and starts every session right.

2/7
```

```
2. Checkpoint before context fills

When you see context getting full, ask Claude to summarize:
- Files modified
- Decisions made
- What's pending

Save to CLAUDE.md. Future you will thank you.

3/7
```

```
3. The "Do NOT" section is underrated

Things I include:
- Don't add comments to unchanged code
- Don't refactor unrelated code
- Don't commit without tests

Prevents so many headaches.

4/7
```

```
4. Be explicit, not implicit

Bad: "Fix that bug we discussed"
Good: "Fix the null pointer in handleSubmit at line 42 of UserForm.tsx"

Don't assume Claude remembers. Include context.

5/7
```

```
5. Strategic /clear

Sometimes a fresh start beats fighting context drift.

But: Save your session state first. Ask Claude to write a handoff doc before clearing.

6/7
```

```
6. Free resources

I made a cheat sheet with all the commands, shortcuts, and patterns:
substratia.io/tools/cheat-sheet

And a full guide:
substratia.io/blog/context-management-guide

7/7
```

---

### Single Tweet: Cheat Sheet

```
Made a free Claude Code cheat sheet:
- Slash commands
- Keyboard shortcuts
- CLAUDE.md patterns
- MCP config examples

Print it, bookmark it, whatever works.

substratia.io/tools/cheat-sheet
```

---

### Single Tweet: Context Guide

```
The #1 Claude Code frustration is context loss.

I wrote a deep dive on managing it:
- How context windows work
- Why compaction loses details
- Preservation techniques
- CLAUDE.md patterns

12-min read: substratia.io/blog/context-management-guide
```

---

## Discord (Claude Code Server)

### Introduction Post

```
Hey everyone! Been using Claude Code daily for months and built some free tools:

**Cheat Sheet** - Quick reference for commands, shortcuts, CLAUDE.md patterns
https://substratia.io/tools/cheat-sheet

**Context Guide** - Deep dive on managing context/avoiding compaction issues
https://substratia.io/blog/context-management-guide

Also happy to answer questions about context management - it's something I've spent way too much time figuring out 😅
```

---

### Helpful Response Template (for context loss questions)

```
Context loss is the #1 frustration I see. Here's what helped me:

1. **CLAUDE.md as anchor** - Keep critical info there, it survives compaction
2. **Periodic checkpoints** - Before context fills, save session state
3. **Explicit prompts** - Include file paths and line numbers, don't assume memory
4. **Strategic /clear** - Sometimes fresh start beats drift

I wrote a full guide if you want the details: https://substratia.io/blog/context-management-guide
```

---

## Hacker News

### Show HN Post

**Title:** Show HN: Free Claude Code cheat sheet and context management guide

**Body:**
```
I've been using Claude Code (Anthropic's CLI coding assistant) daily for months. The biggest pain point is context management - sessions fill up, compaction loses details, new sessions mean re-explaining everything.

So I built two free resources:

1. Cheat Sheet (https://substratia.io/tools/cheat-sheet)
Quick reference for slash commands, keyboard shortcuts, CLAUDE.md patterns, and MCP configuration.

2. Context Management Guide (https://substratia.io/blog/context-management-guide)
Deep dive on how context windows work, why compaction loses information, and techniques that actually help.

Both are free, no signup required. The cheat sheet has a print/PDF button.

Happy to answer questions about Claude Code workflows.
```

---

## LinkedIn Post

```
After months of daily Claude Code use, I've learned that context management is the hidden skill that separates productive sessions from frustrating ones.

The tools are free. The real skill is knowing how to use them effectively.

I put together two free resources:

📋 Cheat Sheet - Quick reference for commands, shortcuts, and patterns
https://substratia.io/tools/cheat-sheet

📖 Context Guide - Deep dive on managing context and avoiding compaction issues
https://substratia.io/blog/context-management-guide

What Claude Code workflows have you developed?

#ClaudeCode #AIAssistant #DeveloperTools #Productivity
```

---

## Dev.to Article Outline

**Title:** The Complete Guide to Claude Code Context Management

**Outline:**
1. The context problem (why it matters)
2. How context windows work (the basics)
3. Understanding compaction (what gets lost)
4. CLAUDE.md best practices (with examples)
5. Preservation techniques (actionable tips)
6. Tools that help (momentum, memory-mcp, /cost)
7. Workflow patterns (session handoff, task isolation)
8. Free resources (cheat sheet, full guide)

**CTA:** Link to cheat sheet and full guide

---

## Key Rules for Community Posts

1. **Be helpful first** - Don't lead with promotion
2. **Provide real value** - Tips, techniques, examples
3. **Link naturally** - "I wrote more about this here" not "CHECK OUT MY SITE"
4. **Engage in comments** - Answer questions, be a community member
5. **One promotional post per 10 helpful ones** - Build trust first
6. **Never spam** - One post per subreddit per week max

---

## Posting Schedule (Week 1)

| Day | Platform | Type | Content |
|-----|----------|------|---------|
| Mon | r/ClaudeAI | Helpful | "How I handle context loss" |
| Tue | Twitter/X | Thread | Context management tips |
| Wed | Discord | Intro | Introduction post |
| Thu | LinkedIn | Post | Context management value post |
| Fri | r/ClaudeAI | Discussion | "What's your CLAUDE.md setup?" |
| Sat | Twitter/X | Single | Cheat sheet announcement |
| Sun | - | Rest | Engage with comments |

---

---

## Memory Plugin Posts (Product Focus)

### r/ClaudeAI - Memory Demo Announcement

**Title:** Built a free memory system for Claude - try the interactive demo

**Body:**
```
Claude Code doesn't remember anything between sessions. Every new conversation starts from scratch.

I built memory-mcp to fix this. It gives Claude persistent memory that survives across sessions:
- Stores decisions, patterns, preferences
- Recalls relevant context automatically
- Full-text search across all memories

**Try it without installing anything:**
https://substratia.io/tools/memory-demo

The demo simulates the memory system so you can see how it works. Three scenarios:
1. Quick Start - basic store/recall
2. Decisions - save a technical choice and why
3. Learning - capture insights that persist

If you like it, the actual plugin is free:
`/plugin install memory-mcp@substratia-marketplace`

GitHub: https://github.com/WhenMoon-afk/claude-memory-mcp

What do you forget most between Claude sessions?
```

---

### r/ClaudeAI - Problem/Solution Post

**Title:** How I stopped re-explaining everything to Claude every session

**Body:**
```
The most frustrating thing about Claude Code: it doesn't remember anything.

Every new session:
- "We're using Bun, not npm"
- "The auth is in src/lib/auth.ts"
- "Don't add comments to unchanged code"

**My solution:** I built a memory plugin.

When Claude makes a decision or learns something important, it stores it:
`memory_store "Use Bun for this project - faster than npm, matches lockfile"`

Next session, it can recall:
`memory_recall "package manager preference"`

The memories persist forever. Claude can search them with FTS5 full-text search. No embeddings, no API calls, just fast local SQLite.

**Free to try:**
- Interactive demo: https://substratia.io/tools/memory-demo
- Install: `/plugin install memory-mcp@substratia-marketplace`

What patterns do you wish Claude would remember?
```

---

### Twitter/X - Memory Demo Thread

```
Your Claude Code doesn't remember anything between sessions.

Every conversation starts fresh. You explain the same things over and over.

I built a memory system to fix this. Try it in 30 seconds:

🧪 substratia.io/tools/memory-demo

1/4
```

```
How it works:

1. Claude learns something → stores as memory
2. New session starts → recalls relevant memories
3. You never re-explain your preferences again

Local SQLite, no API calls, instant search.

2/4
```

```
What memories would help?

- "Use Bun, not npm"
- "Tests go in __tests__ directories"
- "This project uses Tailwind v4"
- "Don't auto-commit, I'll review first"

Things you've said 100 times.

3/4
```

```
The plugin is free:
/plugin install memory-mcp@substratia-marketplace

Try the demo first:
substratia.io/tools/memory-demo

4/4
```

---

### Single Tweet - Memory Demo

```
Claude Code forgets everything between sessions.

I built a memory system. Try the demo (no install):
substratia.io/tools/memory-demo

Store decisions. Recall context. Never re-explain.

Free and open source plugin.
```

---

### Single Tweet - Pain Point

```
Things I've told Claude 100+ times:

- "Use Bun, not npm"
- "Don't add docstrings to unchanged code"
- "The config is in src/config.ts"

Built a memory plugin so it remembers forever.

Free demo: substratia.io/tools/memory-demo
```

---

### Discord - Memory Plugin Introduction

```
Built a memory plugin for Claude Code. Solves the "Claude forgets everything" problem.

**What it does:**
- Stores decisions/preferences permanently
- Recalls relevant context each session
- Fast local search (no API calls)

**Try without installing:**
https://substratia.io/tools/memory-demo

**Install (free):**
`/plugin install memory-mcp@substratia-marketplace`

What do you wish Claude would remember?
```

---

### Hacker News - Show HN

**Title:** Show HN: Memory system for Claude Code - persistent context across sessions

**Body:**
```
I built memory-mcp, a free plugin that gives Claude Code persistent memory.

Problem: Claude forgets everything between sessions. You re-explain your project setup, coding preferences, and decisions constantly.

Solution: A local SQLite database with FTS5 full-text search that Claude can store to and recall from.

Demo (no install): https://substratia.io/tools/memory-demo

How it works:
1. Claude stores important context: "Use Bun for this project, not npm"
2. Next session, it can recall: "What package manager for this project?"
3. Memories persist forever, searchable instantly

Technical details:
- Pure SQLite (better-sqlite3), no embeddings or vector DB
- FTS5 for fast full-text search
- Token-aware loading (fits context window)
- Local-first, your data stays on your machine
The plugin is MIT licensed: https://github.com/WhenMoon-afk/claude-memory-mcp

Install in Claude Code: /plugin install memory-mcp@substratia-marketplace

Looking for feedback on what memories would be most valuable to store automatically.
```

---

## Posting Schedule (Memory Focus - Week 2)

| Day | Platform | Type | Content |
|-----|----------|------|---------|
| Mon | r/ClaudeAI | Demo | "Built a free memory system" |
| Tue | Twitter/X | Thread | Memory demo thread |
| Wed | Discord | Intro | Memory plugin introduction |
| Thu | Twitter/X | Single | Pain point tweet |
| Fri | r/ClaudeAI | Discussion | "How I stopped re-explaining" |
| Sat | HN | Show HN | Memory system announcement |
| Sun | - | Rest | Engage with comments |

---

*Last Updated: January 2026*
