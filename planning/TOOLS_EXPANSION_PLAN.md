# Substratia Tools Expansion Plan

## Executive Summary

This plan outlines the strategic expansion of Substratia's free tools suite to establish market leadership in the AI developer tools space. The goal is to create a comprehensive ecosystem that drives organic traffic, builds brand authority, and creates natural upgrade paths to future premium offerings.

**Current State**: 11 tools, 38 pages, 10 blog posts, 4 comparison pages
**Target State**: 12+ tools, 40+ pages, comprehensive Claude Code toolkit

---

## Strategic Analysis

### Brand Positioning
Substratia = "Memory Infrastructure for AI"
- Core products: momentum (context recovery), memory-mcp (persistent memory)
- Free tools: Traffic drivers that showcase expertise
- Reviews: SEO magnets that build authority

### Success Metrics
1. Organic traffic growth (target: 1000 visitors/month within 3 months)
2. Tool engagement (time on page, return visits)
3. Email capture rate (waitlist signups)
4. Brand mentions and backlinks

### Risk Mitigation
- Keep tools simple and functional (MVP mindset)
- Don't over-promise features
- Maintain fast page loads (<3s)
- Mobile-responsive everything
- No broken links or dead ends

---

## Phase 1: Claude Code Toolkit (Priority: HIGH)

### Tool 1: Claude Code Prompt Optimizer
**Purpose**: Help users craft optimal prompts for Claude Code with drag-and-drop simplicity

**Features**:
- **Thinking Modes**: One-click toggles for:
  - `thinkhard` - Deep reasoning mode
  - `ultrathink` - Maximum reasoning depth
  - `think step by step` - Structured reasoning

- **Prompt Snippets Library**:
  - Autonomous loop triggers ("continue until complete", "iterate until satisfied")
  - Parallel execution ("use subagents in parallel", "spawn concurrent tasks")
  - Simulator patterns ("create a user feedback simulator subagent")
  - Interrupt patterns ("continue until receiving STOP message")

- **Structure Templates**:
  - Task breakdown format
  - Context setting format
  - Constraint specification format

- **Output Modes**:
  - Copy to clipboard
  - Download as .txt
  - Preview formatted

**UI Design**:
```
┌─────────────────────────────────────────────────────────────────┐
│ Claude Code Prompt Optimizer                                    │
├─────────────────────────────────────────────────────────────────┤
│ ┌─────────────────┐  ┌──────────────────────────────────────┐  │
│ │ THINKING MODE   │  │ YOUR PROMPT                          │  │
│ │ ○ Normal        │  │                                      │  │
│ │ ● Thinkhard     │  │ [Your task description here...]      │  │
│ │ ○ Ultrathink    │  │                                      │  │
│ ├─────────────────┤  │                                      │  │
│ │ SNIPPETS        │  └──────────────────────────────────────┘  │
│ │ [+ Autonomous]  │                                            │
│ │ [+ Parallel]    │  ┌──────────────────────────────────────┐  │
│ │ [+ Simulator]   │  │ GENERATED OUTPUT                     │  │
│ │ [+ Interrupt]   │  │                                      │  │
│ └─────────────────┘  │ ultrathink about this:               │  │
│                      │ [task]                                │  │
│ ┌─────────────────┐  │                                      │  │
│ │ STRUCTURE       │  │ Use subagents in parallel where...   │  │
│ │ [✓] Context     │  │                                      │  │
│ │ [✓] Task        │  └──────────────────────────────────────┘  │
│ │ [ ] Constraints │                                            │
│ └─────────────────┘  [Copy] [Download]                         │
└─────────────────────────────────────────────────────────────────┘
```

**Implementation Estimate**: 4-6 hours
**SEO Value**: HIGH (Claude Code users actively searching for optimization tips)

---

### Tool 2: Claude Code Cost Calculator
**Purpose**: Help users understand their Claude Code usage costs and compare subscription vs API

**Features**:
- **Session Tracker**:
  - Input tokens used this session
  - Output tokens generated
  - Running cost estimate

- **Historical Visualization**:
  - Daily/weekly/monthly charts
  - Cost trends over time
  - localStorage for persistence

- **Subscription vs API Comparison**:
  - Input: Monthly token usage estimate
  - Output: Cost comparison table
  - Break-even analysis
  - Recommendation engine

- **Model Pricing Reference**:
  - Claude 4.5 Opus: $15/$75 per 1M tokens
  - Claude 4.5 Sonnet: $3/$15 per 1M tokens
  - Claude 4.5 Haiku: $0.25/$1.25 per 1M tokens

**UI Design**:
```
┌─────────────────────────────────────────────────────────────────┐
│ Claude Code Cost Calculator                                     │
├─────────────────────────────────────────────────────────────────┤
│ SESSION TRACKER          │ SUBSCRIPTION COMPARISON              │
│ ─────────────────────    │ ─────────────────────────────────    │
│ Input tokens:  45,231    │ Your monthly usage: ~2M tokens       │
│ Output tokens: 12,847    │                                      │
│ ─────────────────────    │ ┌────────────┬─────────┬──────────┐ │
│ Session cost: $0.89      │ │            │ API     │ Claude   │ │
│ (at Sonnet rates)        │ │            │ Cost    │ Max      │ │
│                          │ ├────────────┼─────────┼──────────┤ │
│ [+ Log Session]          │ │ Sonnet     │ $36/mo  │ $200/mo  │ │
│                          │ │ Opus       │ $180/mo │ $200/mo  │ │
│ ─────────────────────    │ └────────────┴─────────┴──────────┘ │
│ 7-DAY COST HISTORY       │                                      │
│ ▁▂▄▃▅▆▇ $12.34 total    │ Verdict: API is cheaper for you!    │
└─────────────────────────────────────────────────────────────────┘
```

**Implementation Estimate**: 3-4 hours
**SEO Value**: MEDIUM-HIGH (cost-conscious developers)

---

## Phase 2: Full-Stack Builder (Priority: HIGH)

### Tool 3: Stack Builder (PC Part Picker for Web Apps)
**Purpose**: Visual full-stack selection tool with AI analysis export

**Categories**:
1. **Frontend Framework**: React, Vue, Svelte, Angular, Solid, Next.js, Nuxt, SvelteKit
2. **Styling**: Tailwind, CSS Modules, Styled Components, Sass, Chakra UI, shadcn/ui
3. **State Management**: Redux, Zustand, Jotai, Pinia, MobX, React Query
4. **Backend Framework**: Express, Fastify, Hono, Elysia, Django, FastAPI, Rails
5. **Database**: PostgreSQL, MySQL, MongoDB, SQLite, Supabase, PlanetScale
6. **ORM/Query**: Prisma, Drizzle, TypeORM, Mongoose, SQLAlchemy
7. **Auth**: NextAuth, Clerk, Auth0, Supabase Auth, Firebase Auth
8. **Hosting**: Vercel, Netlify, Railway, Fly.io, AWS, Cloudflare
9. **CI/CD**: GitHub Actions, GitLab CI, CircleCI, Jenkins
10. **Monitoring**: Sentry, LogRocket, Datadog, New Relic

**Features**:
- **Visual Selection**: Click to select, see compatibility indicators
- **Skip Categories**: Not every project needs every category
- **Tooltips**: Hover for descriptions, use cases, pros/cons
- **Compatibility Warnings**: Flag known issues (e.g., "X doesn't work well with Y")
- **Export Options**:
  - CSV list of selections
  - JSON configuration
  - AI analysis prompt (pre-formatted for Claude/GPT)
  - Markdown summary

**AI Analysis Prompt Template**:
```
Analyze this full-stack technology selection for a web application:

Frontend: [selection]
Styling: [selection]
State: [selection]
Backend: [selection]
Database: [selection]
...

Please evaluate:
1. Compatibility issues between these choices
2. Performance implications
3. Developer experience considerations
4. Alternative suggestions for any problematic choices
5. Missing components I should consider
6. Overall assessment (1-10) with reasoning
```

**UI Design**:
```
┌─────────────────────────────────────────────────────────────────┐
│ Stack Builder - Full-Stack Technology Selector                  │
├─────────────────────────────────────────────────────────────────┤
│ FRONTEND FRAMEWORK              │ YOUR SELECTIONS               │
│ ┌─────┐ ┌─────┐ ┌─────┐        │ ─────────────────────────     │
│ │React│ │ Vue │ │Svelte│ ...   │ Frontend: Next.js             │
│ │ ✓  │ │     │ │     │        │ Styling: Tailwind             │
│ └─────┘ └─────┘ └─────┘        │ State: Zustand                │
│                                 │ Backend: (skipped)            │
│ STYLING           [Skip →]     │ Database: Supabase            │
│ ┌─────────┐ ┌────────┐         │ Auth: Supabase Auth           │
│ │Tailwind │ │shadcn  │ ...     │ Hosting: Vercel               │
│ │    ✓   │ │        │         │                               │
│ └─────────┘ └────────┘         │ ⚠ 1 compatibility note        │
│                                 │                               │
│ ... more categories ...         │ [Export CSV] [Export JSON]    │
│                                 │ [Generate AI Prompt]          │
└─────────────────────────────────────────────────────────────────┘
```

**Implementation Estimate**: 8-12 hours
**SEO Value**: VERY HIGH (developers constantly searching for stack recommendations)

---

## Phase 3: Content & Marketing (Priority: MEDIUM)

### YouTube Video Scripts

#### Video 1: "Claude Code Secrets: 5 Prompts That Actually Work"
**Target Length**: 8-12 minutes
**Purpose**: Drive traffic, establish expertise

```
SCRIPT OUTLINE:

[0:00-0:30] HOOK
"Most people use Claude Code like a chatbot. I'm going to show you 5 prompts
that turn it into an autonomous coding machine."

[0:30-1:30] INTRO
- Quick intro to Substratia
- What we'll cover
- "Stay until the end for the most powerful one"

[1:30-3:00] SECRET #1: ULTRATHINK
- What it does
- When to use it
- Demo: Complex architecture decision
- Show our Prompt Optimizer tool

[3:00-5:00] SECRET #2: PARALLEL SUBAGENTS
- Explain the concept
- Prompt template
- Demo: Simultaneous research tasks
- Link to snippet library

[5:00-7:00] SECRET #3: AUTONOMOUS LOOPS
- The "continue until" pattern
- Safety considerations
- Demo: Refactoring a codebase
- Interrupt patterns

[7:00-9:00] SECRET #4: SIMULATOR SUBAGENT
- Create a user feedback simulator
- Use for testing without constant input
- Demo: Building UI with simulated feedback

[9:00-10:30] SECRET #5: CONTEXT RECOVERY
- The real cost of losing context
- Introduce momentum
- Demo: 5ms restore vs re-explanation

[10:30-11:30] WRAP UP
- Recap the 5 secrets
- CTA: Visit substratia.io/tools
- Subscribe prompt

[11:30-12:00] END CARD
- Related videos
- Subscribe button
```

#### Video 2: "I Built a Full-Stack App in 10 Minutes Using AI (Here's How)"
**Target Length**: 10-15 minutes
**Purpose**: Viral potential, showcase tools

```
SCRIPT OUTLINE:

[0:00-0:30] HOOK
"What if I told you I could build a complete full-stack app, from database
to deployment, in under 10 minutes? Let me show you."

[0:30-2:00] THE CHALLENGE
- Define what we're building (simple SaaS dashboard)
- Show the Stack Builder tool
- Select our stack live

[2:00-4:00] PHASE 1: SETUP
- Use Claude Code with our optimized prompt
- Generate project structure
- Time check: ~2 minutes

[4:00-7:00] PHASE 2: BUILD
- Backend API generation
- Frontend components
- Database schema
- Time check: ~5 minutes

[7:00-9:00] PHASE 3: DEPLOY
- Push to GitHub
- Deploy to Vercel
- Working app live
- Time check: ~8 minutes

[9:00-11:00] ANALYSIS
- What made this possible
- The role of good prompts
- When this approach works/doesn't

[11:00-12:00] TOOLS SHOWCASE
- Quick tour of Substratia tools
- CTA: Try them free

[12:00-12:30] END
- Challenge viewers to try
- Comment their results
```

#### Video 3: "Stop Wasting Money: Claude API vs Subscription Calculator"
**Target Length**: 5-8 minutes
**Purpose**: Practical value, tool promotion

```
SCRIPT OUTLINE:

[0:00-0:20] HOOK
"Are you overpaying for Claude? Let's find out in the next 5 minutes."

[0:20-1:30] THE PROBLEM
- Claude Max: $200/month
- API: Pay per token
- "Which is better for YOU?"

[1:30-3:00] THE MATH
- Token pricing breakdown
- Usage patterns that favor subscription
- Usage patterns that favor API

[3:00-5:00] DEMO: COST CALCULATOR
- Show our tool
- Input sample usage
- See the comparison
- Explain the results

[5:00-6:00] RECOMMENDATIONS
- Heavy users: Subscription makes sense
- Light users: API might save money
- Mixed usage: Consider both

[6:00-7:00] WRAP UP
- Try the calculator: substratia.io/tools/cost-calculator
- Subscribe for more

[7:00-7:30] END CARD
```

---

## Phase 4: UX & Performance Optimization (Priority: HIGH)

### Performance Targets
- First Contentful Paint: <1.5s
- Time to Interactive: <3s
- Lighthouse score: >90

### Current Bundle Analysis
| Tool | Current Size | Target |
|------|--------------|--------|
| Image Prompt Generator | 6.05 kB | <5 kB |
| Video Prompt Timeline | 5.48 kB | <5 kB |
| Markdown Preview | 6.97 kB | <6 kB |
| Builder | 23.7 kB | <20 kB |

### Optimization Actions
1. **Code Splitting**: Lazy load preset data
2. **Image Optimization**: Use next/image with AVIF
3. **Font Subsetting**: Only load used characters
4. **CSS Purging**: Remove unused Tailwind classes

### Mobile Responsiveness Audit
- [ ] Tools grid: 1 column on mobile, 2 on tablet, 3 on desktop
- [ ] Timeline: Horizontal scroll on mobile
- [ ] Sliders: Touch-friendly size
- [ ] Copy buttons: Large tap targets

### Accessibility Checklist
- [ ] Keyboard navigation for all interactive elements
- [ ] ARIA labels on buttons
- [ ] Color contrast ratio >4.5:1
- [ ] Screen reader testing

---

## Implementation Priority Order

### Week 1 (Immediate)
1. ✅ Image Prompt Generator
2. ✅ Video Prompt Timeline
3. ✅ Markdown Preview
4. ✅ Markdown Stripper
5. ✅ Reviews section (2 comparisons)
6. ✅ Claude Code Prompt Optimizer
7. ✅ Claude Code Cost Calculator

### Week 2
8. ✅ Stack Builder MVP
9. YouTube Script #1 (write full script)
10. Performance optimization pass

### Week 3
11. Stack Builder polish
12. YouTube Script #2
13. ✅ Additional comparisons (Markdown Editors, Coding Assistants)

### Week 4
14. YouTube Script #3
15. Record videos (if equipment available)
16. Community outreach (Reddit, HN, Twitter)

---

## Success Criteria

### Short-term (30 days)
- [x] 10 tools live and functional (11 tools completed!)
- [x] 5 comparison pages (4 completed + 1 blog post)
- [ ] 3 video scripts ready
- [ ] Lighthouse score >90 on all pages
- [ ] Zero broken links

### Medium-term (90 days)
- [ ] 1000 unique visitors/month
- [ ] 100 email signups
- [ ] 5 external backlinks
- [ ] YouTube channel started
- [ ] First video published

### Long-term (6 months)
- [ ] Establish as go-to Claude Code resource
- [ ] 500+ email list
- [ ] Consider monetization paths
- [ ] Evaluate Pro tier viability

---

## Appendix: Snippet Library Content

### Autonomous Loop Snippets
```
"Continue working on this task until you reach a natural stopping point or
encounter an issue that requires my input."

"Iterate on this solution, improving it with each pass. Continue for 5
iterations or until you're satisfied with the result."

"Work autonomously on this. Only pause if you need clarification on
requirements or encounter a blocking error."
```

### Parallel Execution Snippets
```
"Use subagents in parallel to research these topics simultaneously: [list].
Synthesize findings when all complete."

"Spawn concurrent tasks for: [task1], [task2], [task3]. Coordinate results
at the end."

"Execute these independent tasks in parallel, then combine outputs."
```

### Simulator Subagent Snippets
```
"Create a user feedback simulator subagent that will evaluate each iteration
from a user's perspective. Use its feedback to guide improvements. Continue
until the simulator rates the output 8/10 or higher."

"Generate a QA tester subagent that will find issues with this code. Fix
each issue found. Repeat until no issues remain."
```

### Interrupt Pattern Snippets
```
"Continue this process until you receive a message containing 'STOP' or
'DONE'. Check for interrupt messages between each major step."

"Work on this in phases. After each phase, pause briefly to check for user
input. If no input within 30 seconds, continue to next phase."
```

---

*Last Updated: January 2026*
*Document Owner: Aurora / Substratia Team*
