# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project: Substratia

**Live Site**: https://substratia.io
**GitHub**: https://github.com/WhenMoon-afk/substratia
**Philosophy**: Intelligence is substrate-agnostic

Memory infrastructure for AI - persistence, context, and knowledge management tools.

---

## Quick Commands

```bash
bun install        # Install dependencies
bun run dev        # Dev server at localhost:3000
bun run build      # Production build (static export to /out)
bun run lint       # ESLint
```

## Deployment

Push to master → Cloudflare Pages auto-deploys in ~90s

```bash
git add -A && git commit -m "feat: description" && git push origin master
```

---

## Current Content (as of 2026-01-11)

### Blog (8 posts)
| Slug | Title | Type |
|------|-------|------|
| `mirror-demons` | Mirror Demons: How AI Chatbots Can Amplify Delusions | Original Research |
| `eleanor-chen-effect` | The Eleanor Chen Effect | Original Research |
| `claude-md-guide` | The Complete CLAUDE.md Guide | SEO/Educational |
| `ai-agent-configuration` | AI Agent Configuration Best Practices | SEO/Educational |
| `prompt-engineering-tips` | Prompt Engineering Tips | SEO/Educational |
| `10_ways_to_plan_your_day` | 10 Ways to Plan Your Day | SEO/Marketing |
| `meal_planning_for_beginners` | Meal Planning for Beginners | SEO/Marketing |
| `how_to_start_budgeting_2026` | How to Start Budgeting in 2026 | SEO/Marketing |

### Tools (4 tools)
| Tool | Path | Description |
|------|------|-------------|
| Token Counter | `/tools/token-counter` | Count tokens, estimate costs for Claude/GPT-4 |
| Prompt Library | `/tools/prompts` | 8 curated prompts, click to copy |
| Seed Maker | `/tools/seed-maker` | High-entropy random strings from mouse movements |
| AgentForge Builder | `/builder` | Drag-and-drop CLAUDE.md builder |

### Pages
- `/` - Landing page (memory infrastructure)
- `/templates` - Memory tools (momentum, memory-mcp)
- `/tools` - Free AI tools index
- `/builder` - AgentForge drag-and-drop builder
- `/blog` - Blog index
- `/docs` - Documentation
- `/pro` - Pro tier waitlist (exploratory, not launched)
- `/pricing` - Pricing page (de-emphasized)

---

## Architecture

### Tech Stack
- **Framework**: Next.js 14 (App Router, Static Export)
- **Styling**: Tailwind CSS 3.4
- **Drag-and-Drop**: @dnd-kit (core + sortable)
- **Package Manager**: Bun
- **Hosting**: Cloudflare Pages
- **Domain**: substratia.io (Cloudflare)
- **Email Capture**: Formspree (https://formspree.io/f/mreezwlv)

### Path Alias
`@/*` → `./src/*` (configured in tsconfig.json)

### Directory Structure
```
src/
├── app/
│   ├── page.tsx              # Landing page
│   ├── builder/page.tsx      # Drag-and-drop config builder
│   ├── templates/page.tsx    # Memory tools listings
│   ├── pricing/page.tsx      # Subscription tiers
│   ├── pro/page.tsx          # Pro waitlist
│   ├── docs/page.tsx         # Documentation
│   ├── blog/                  # Blog posts (8 posts)
│   │   ├── page.tsx          # Blog index
│   │   ├── mirror-demons/    # Original research
│   │   ├── eleanor-chen-effect/
│   │   └── ...
│   ├── tools/                # Free tools
│   │   ├── page.tsx          # Tools index
│   │   ├── token-counter/
│   │   ├── prompts/
│   │   └── seed-maker/
│   └── layout.tsx            # Root layout with metadata
├── components/
│   ├── Nav.tsx               # Global navigation
│   ├── AIAssistant.tsx       # Builder sidebar
│   └── DraggableCapability.tsx
├── data/
│   └── presets.ts            # 28 capabilities + 13 rulesets
└── globals.css               # Tailwind + custom CSS variables
```

### Build Configuration (next.config.js)

- `output: 'export'` - Static HTML export to `/out` directory
- `images.unoptimized: true` - Required for static export
- `trailingSlash: true` - URL formatting for Cloudflare Pages

### Client vs Server Components
- **Client** ('use client'): builder/page.tsx, landing page, Nav.tsx, tools
- **Server** (default): layout.tsx, blog pages, docs

---

## Branding

- **Parent Brand**: Substratia (memory infrastructure for AI)
- **Products**: momentum, memory-mcp, AgentForge
- **Tagline**: "Memory Infrastructure for AI"
- **Philosophy**: "Intelligence is substrate-agnostic"

### Colors (tailwind.config.js)
```
forge-dark:   #1a1a2e
forge-purple: #7b2cbf / #7c3aed
forge-cyan:   #00d9ff / #00d4ff (brand accent)
```

---

## Navigation Structure

Current nav links (src/components/Nav.tsx):
1. Memory (/templates)
2. Tools (/tools)
3. Builder (/builder)
4. Blog (/blog)
5. Docs (/docs)
6. GitHub (external)

Footer links:
- Memory, Tools, Builder, Blog, Docs

---

## Pro Tier Status

**Current State**: Exploratory / Waitlist only

The /pro page collects emails but makes no firm promises. Language is intentionally soft:
- "We're exploring what Pro features would be most valuable"
- "Potential Tiers" not "Pricing"
- "What We're Exploring" not "What's Included"

**Why**: No backend infrastructure exists yet. Claims must be achievable before launch.

---

## Related Projects

| Project | Purpose | Repo |
|---------|---------|------|
| momentum | Fast context recovery (<5ms) | github.com/WhenMoon-afk/momentum |
| claude-memory-mcp | Persistent memory MCP server | github.com/WhenMoon-afk/claude-memory-mcp |
| substratia-marketplace | Plugin distribution | github.com/WhenMoon-afk/substratia-marketplace |
| mirror-demons | AI delusion amplification research | github.com/WhenMoon-afk/mirror-demons |
| eleanor-chen-effect | AI creativity determinism research | github.com/WhenMoon-afk/eleanor-chen-effect |

---

## Next Tasks (Session Continuity)

1. Add more prompts to Prompt Library
2. Create Mirror Demons GitHub repo (research artifact)
3. Start Bun migration on claude-memory-mcp
4. Integrate Substack (skyceres.substack.com) with site
5. Continue content/SEO iteration

---

## Session Log

**2026-01-11**:
- Added Mirror Demons blog post (original research on AI delusion amplification)
- Added Seed Maker tool (client-side entropy generator)
- Fixed blog visibility in navigation
- Reduced pricing emphasis site-wide
- Softened Pro tier claims to be exploratory
- Updated CLAUDE.md with current state
- Expanded Prompt Library from 8 to 12 prompts
- Created mirror-demons GitHub repo with raw research data
- Added GitHub link to Mirror Demons blog post
- Integrated Substack (skyceres.substack.com) in nav and footer
- Cross-linked Eleanor Chen Effect and Mirror Demons research articles
