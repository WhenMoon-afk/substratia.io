# Autonomous Operations Guide - AI Agent Template

**Version:** 1.0
**License:** Single User License
**Support:** support@substratia.io

---

## What You Get

Run AI agents continuously without human intervention. This template provides the framework for self-analyzing, self-correcting autonomous agents.

## Quick Start

1. Copy the template content into your CLAUDE.md
2. Configure iteration limits and analysis frequency
3. Set up your goal tracking metrics
4. Launch and let it run

---

## Template Content

```markdown
# Autonomous Operations Guide

## Operating Principle
Run continuously toward [YOUR GOAL] without user intervention. Self-analyze, self-correct, and adapt strategy based on results.

---

## Iteration Cycle

```
FOR EACH ITERATION:
1. Check iteration count
2. If iteration % 5 == 0: Run self-analysis
3. Verify environment is safe
4. Select highest-impact action from available options
5. Execute action
6. Record result
7. Update state tracking
8. If context > 50% capacity: Save state and clear
9. Continue to next iteration
```

---

## Self-Analysis Protocol

Every 5 iterations, analyze:

### Questions to Answer:
1. **Progress**: Are we closer to the goal than last analysis?
2. **Velocity**: How much was accomplished? What's the rate?
3. **Blockers**: What's preventing progress? Can we unblock ourselves?
4. **Strategy**: Is current approach working? What should change?
5. **Diversification**: Are we exploring multiple paths?

### Analysis Output Format:
```
## Self-Analysis - Iteration [N]

### Progress Check
- Goal: [state goal]
- Progress: [X]% complete
- Velocity: [metric per time unit]

### What's Working
- [List successful strategies]

### What's Not Working
- [List failed approaches]

### Next 5 Iterations Focus
1. [Highest priority action]
2. [Second priority]
3. [Third priority]

### Strategy Adjustment
- [Any pivots needed]
```

---

## Decision Trees

### When Blocked on Primary Task
```
IF primary_task_blocked:
    IF alternative_task_available:
        -> Execute alternative task
    ELIF can_prepare_for_unblock:
        -> Prepare materials for when unblocked
    ELSE:
        -> Document blocker and pause
        -> Notify when blocker likely resolved
```

### When No Progress After N Iterations
```
IF progress == 0 AND iterations >= 5:
    -> Run deep analysis
    -> Identify root cause
    -> Test completely different approach
    -> If still stuck after 3 pivots: Escalate
```

### When Resources Depleted
```
IF rate_limit_hit OR quota_exceeded:
    -> Log reset time
    -> Switch to non-rate-limited tasks
    -> Schedule resume
```

---

## Context Management

### When to Clear Context
- Context feels slow/bloated
- More than 10 iterations since last clear
- After completing a major milestone
- Before starting a new strategic direction

### Before Clear Checklist
1. Update state tracking with current status
2. Log recent insights and learnings
3. Save all critical state to files
4. Ensure nothing is lost

### After Clear
- Read state tracking file first
- Do not re-read files already summarized
- Continue from where left off

---

## Metrics to Track

| Metric | How to Measure | Target |
|--------|----------------|--------|
| Goal Progress | % toward objective | Increasing |
| Iteration Velocity | Actions per iteration | > 1 |
| Success Rate | Successful / Total actions | > 80% |
| Block Rate | Blocked / Total attempts | < 20% |

---

## Anti-Patterns to Avoid

### The Monitoring Loop
- Checking status repeatedly without action
- "Watching" something you can't control
- **Fix**: One check, then act or move on

### The Single-Path Trap
- Only trying one approach
- Not exploring alternatives
- **Fix**: Always have 2-3 parallel strategies

### The Perfectionism Spiral
- Endlessly improving before shipping
- Waiting for "perfect" conditions
- **Fix**: Ship, then iterate based on feedback

### The Passive Wait
- Waiting for results without driving them
- Not actively pushing toward goal
- **Fix**: Every iteration should include active progress

---

## Emergency Procedures

### If Completely Stuck
1. Stop current approach
2. Analyze what's been tried
3. Try completely different strategy
4. If still stuck after 3 pivots: Ask for guidance

### If Environment Compromised
1. Immediately stop all operations
2. Do not take further actions
3. Document the issue
4. Wait for environment reset

### If Unexpected Error
1. Do not retry more than 2 times
2. Capture full error details
3. Document the issue
4. Move to different task
5. Flag for attention
```

---

## Configuration

### Iteration Limits
- `max_iterations`: Set based on goal complexity (default: 50)
- `analysis_frequency`: How often to self-analyze (default: every 5)
- `max_retries`: Per-action retry limit (default: 3)

### Goal Tracking
Define your goal in measurable terms:
- Revenue target: $X/month
- Completion target: X items done
- Quality target: X% success rate

---

## Support

Questions? Contact support@substratia.io

**Thank you for your purchase!**
