# Welcome Email Sequence

This document contains the email sequence for new newsletter subscribers.
Use with any email automation tool (ConvertKit, Mailchimp, Buttondown, etc.).

---

## Email 1: Welcome (Immediate)

**Subject:** Welcome to Substratia - Here's your first Claude Code tip

**Body:**

Hey!

Thanks for subscribing. I'm going to keep this short.

Here's your first Claude Code tip:

**The #1 thing that improved my Claude Code workflow:**

Create a CLAUDE.md file in your project root with a "DO NOT" section.

Example:
```
## DO NOT
- Add comments to unchanged code
- Refactor code unrelated to the current task
- Commit without running tests
```

Negative constraints are more reliable than positive instructions. Claude actively avoids them.

That's it for today. More tips coming soon.

**Quick links:**
- [Cheat Sheet](https://substratia.io/tools/cheat-sheet) - Commands, shortcuts, patterns
- [Context Guide](https://substratia.io/blog/context-management-guide) - Deep dive on context management
- [Free Tools](https://substratia.io/tools) - 12 tools, no signup required

Reply to this email if you have questions. I read every reply.

— Substratia

---

## Email 2: Day 2 - Context Management

**Subject:** The hidden cost of context loss (and how to avoid it)

**Body:**

Hey,

Yesterday we talked about CLAUDE.md. Today, let's go deeper.

**The Problem:**

Claude's context window fills up. Auto-compaction kicks in. Details get lost.

You re-explain things. You rebuild context. You lose momentum.

I measured this across my own sessions. The average developer loses 15-20 minutes per session to context management issues.

**The Fix:**

1. **Use /cost regularly** - Know when you're getting close to limits
2. **Checkpoint before compaction** - Ask Claude to summarize to CLAUDE.md
3. **Be explicit in prompts** - Include file paths, line numbers, don't rely on memory

I wrote a full 12-minute guide on this:
→ [The Ultimate Guide to Claude Code Context Management](https://substratia.io/blog/context-management-guide)

Tomorrow: The keyboard shortcuts that save me 30+ minutes per day.

— Substratia

---

## Email 3: Day 3 - Shortcuts

**Subject:** 5 Claude Code shortcuts you're probably not using

**Body:**

Hey,

Quick one today. These shortcuts save me 30+ minutes daily:

1. **Ctrl+C** - Interrupt Claude mid-response (when it's going wrong)
2. **Shift+Tab** - Toggle between single-line and multi-line input
3. **Esc** - Clear current input
4. **Up Arrow** - Recall previous prompts
5. **/compact** - Manually trigger compaction (better than waiting for auto)

Bonus: **/cost** shows your token usage. Run it before complex operations.

Want all the shortcuts in one place? I made a printable cheat sheet:
→ [Claude Code Cheat Sheet](https://substratia.io/tools/cheat-sheet)

Tomorrow: The CLAUDE.md pattern that changed everything.

— Substratia

---

## Email 4: Day 5 - CLAUDE.md Deep Dive

**Subject:** The CLAUDE.md structure that works

**Body:**

Hey,

On Day 1, I mentioned the "DO NOT" section. Today, let's look at the full structure.

Here's the template I use for every project:

```markdown
# Project: [Name]

## Overview
[2-3 sentences]

## Key Directories
- `src/` - Main source code
- `tests/` - Test files

## Coding Standards
- Use TypeScript strict mode
- Prefer async/await

## Current Focus
[What you're working on NOW]

## Session Notes
[Updated each session]

## DO NOT
- Modify config without asking
- Add comments to unchanged code
- Commit without tests
```

The key insight: **Keep it under 3000 tokens.** This file gets read every session. Bloat wastes context.

Want to optimize your CLAUDE.md?
→ [Prompt Optimizer](https://substratia.io/tools/prompt-optimizer) - Build better prompts for Claude Code

— Substratia

---

## Email 5: Day 7 - Consulting Soft Pitch

**Subject:** When DIY isn't enough

**Body:**

Hey,

Over the past week, I've shared:
- CLAUDE.md best practices
- Context management techniques
- Keyboard shortcuts
- Template structures

Most people can get 80% of the benefit from these free resources.

But sometimes you need more:
- Your team is adopting Claude Code and you want it done right
- You're stuck on a specific workflow problem
- You want a personalized setup, not generic advice

That's why I offer consulting.

**What I provide:**
- Claude Code Audit ($150) - 1hr review with recommendations
- Setup Session ($200) - 1.5hr hands-on configuration
- Team Workshop ($1,500) - Half-day training for 5-15 developers

No pressure. The free resources will keep coming either way.

But if you want personalized help:
→ [Book a Session](https://substratia.io/consulting)

— Substratia

P.S. Reply to this email with your biggest Claude Code challenge. I read every reply and might address it in a future email.

---

## Email 6: Day 14 - Check-in

**Subject:** How's Claude Code going?

**Body:**

Hey,

It's been two weeks since you subscribed.

Quick question: What's your biggest Claude Code frustration right now?

Reply with a sentence or two. I read every reply.

Your answers help me:
1. Write better content
2. Build more useful tools
3. Understand what actually matters

No sales pitch today. Just genuinely curious.

— Substratia

---

## Ongoing: Weekly Tips (Every Tuesday)

After the welcome sequence, subscribers get weekly tips:
- 1 actionable Claude Code tip
- 1 link to relevant resource
- Occasional new tool announcements

**Format:**

**Subject:** [Emoji] Claude Code tip: [Specific topic]

**Body:**
- 1-2 paragraph tip
- Code example if relevant
- Link to related resource
- No fluff

---

## Segmentation Notes

Track these subscriber attributes for segmentation:
- **Source:** tools-index, blog, cheat-sheet, consulting, testimonials
- **Interest:** ai-tools, claude-code-tips, claude-code-articles, consulting
- **Engagement:** opens, clicks, replies

Use for targeted follow-ups:
- High engagement + consulting interest → More consulting content
- High engagement + tools interest → Tool announcements
- Low engagement → Re-engagement sequence or cleanup

---

*Last Updated: January 2026*
