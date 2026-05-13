# Loop Guardian System - AI Agent Template

**Version:** 1.0
**License:** Single User License
**Support:** support@substratia.io

---

## What You Get

This template prevents AI agents from getting stuck in repetitive, unproductive loops. Battle-tested in production autonomous systems.

## Quick Start

1. Copy the contents below into your CLAUDE.md or agents.md file
2. Customize the thresholds for your use case
3. Run your agent with confidence

---

## Template Content

Add this to your CLAUDE.md file:

```markdown
# Loop Guardian - Anti-Loop Protection System

**Purpose:** Prevent AI agents from getting stuck in repetitive, unproductive loops.

---

## CRITICAL ANTI-LOOP RULES

### Rule 1: Action Diversity Check
Before performing ANY action, ask:
- "Have I done this exact action in the last 3 iterations?"
- If YES: Do NOT repeat. Find a DIFFERENT approach.

### Rule 2: Screenshot Limit
- Maximum 3 screenshots per iteration
- Maximum 1 screenshot of the same page per session
- NEVER take a screenshot just to "check" something unchanged
- If you need to verify a state, READ the previous screenshot instead

### Rule 3: Progress Gate
Each iteration MUST achieve ONE of:
- [ ] Created new content (product, listing, marketing material)
- [ ] Modified existing content (improved description, fixed issue)
- [ ] Gathered NEW information (market research, competitor analysis)
- [ ] Escalated to user (when blocked)

If NONE of these are achieved, the iteration has FAILED.

### Rule 4: Blocked State = FULL STOP
If blocked by:
- Rate limits → Calculate when limit resets, log it, STOP
- Login required → Tell user which platform, what URL, STOP
- User action needed → List exactly what user needs to do, STOP
- Repeated failures → Ask user for guidance, STOP

DO NOT:
- Keep retrying the same failed action
- Take screenshots to "monitor" the blocked state
- Do busywork while "waiting"

### Rule 5: Retry Budget
- First failure: Log error, try once more
- Second failure: Try different approach
- Third failure: STOP, escalate to user

### Rule 6: Time-Based Actions
- Daily upload limits → Log when limit resets, move to OTHER tasks
- Session limits → End session cleanly, report what was done
- Never poll/refresh repeatedly waiting for time to pass

---

## LOOP DETECTION SYMPTOMS

You are in a bad loop if:
1. Taking 5+ screenshots without creating anything
2. Navigating to the same page 3+ times
3. Writing the same type of file repeatedly
4. Checking status without ability to change it
5. "Monitoring" something that requires external action
6. Generating reports/docs about being blocked

---

## HEALTHY ITERATION PATTERN

```
1. Read current state (1 screenshot max if browser needed)
2. Identify ONE actionable task
3. Execute the task
4. Verify result (1 screenshot if needed)
5. Update progress tracking
6. Move to next task OR stop if blocked
```

---

## WHEN BLOCKED - PRODUCTIVE ALTERNATIVES

Instead of looping on blocked tasks, do:

### If upload limit hit:
- Prepare more content (metadata, descriptions)
- Create new designs
- Generate marketing materials
- Research new ideas

### If login required:
- Work on platforms you DO have access to
- Prepare assets for when access is granted
- STOP and tell user what login is needed

### If no results:
- Improve descriptions
- Research SEO keywords
- Create shareable content
- STOP and give user actionable strategies

---

## ESCALATION PHRASES

When blocked, use these exact phrases:

**For user action needed:**
"BLOCKED: I need you to [specific action]. I've prepared [X] for when you're ready."

**For rate limits:**
"PAUSED: Hit daily limit on [platform]. Limit resets at [time]. I've done [alternative work] in the meantime."

**For errors:**
"ERROR: [Action] failed 3 times. The error was [error]. I need your help to debug this."

---

## METRICS TO TRACK

Each session, track:
- Screenshots taken: (target: <10)
- Pages visited: (should be diverse)
- Files created/modified: (primary measure of progress)
- Actions blocked: (should escalate, not retry)
- Iterations since last progress: (should never exceed 2)

---

## SELF-CHECK BEFORE EACH ACTION

Ask yourself:
1. Is this action DIFFERENT from my last 3 actions?
2. Will this action produce a NEW result?
3. Is this action POSSIBLE without user help?
4. Am I making PROGRESS toward the goal?

If any answer is NO, reconsider the action.
```

---

## Customization Guide

### Adjust Thresholds

| Parameter | Default | Adjust When |
|-----------|---------|-------------|
| Action repeat limit | 3 | Lower for faster fail-safe |
| Screenshot limit | 3/iteration | Lower for text-only agents |
| Retry budget | 3 | Lower for critical systems |
| Progress gate | Every iteration | Every N iterations for long tasks |

### Domain-Specific Rules

Add rules for your specific use case:
- E-commerce: Add inventory check limits
- Content: Add word count minimums
- Research: Add source diversity requirements

---

## Support

Questions? Contact support@substratia.io

**Thank you for your purchase!**
