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

### Blog (10 posts)
| Slug | Title | Type |
|------|-------|------|
| `mirror-demons` | Mirror Demons: How AI Chatbots Can Amplify Delusions | Original Research |
| `eleanor-chen-effect` | The Eleanor Chen Effect | Original Research |
| `why-fts5-over-embeddings` | Why We Chose FTS5 Over Embeddings | Architecture |
| `memory-architecture-patterns` | Memory Architecture Patterns | Architecture |
| `context-window-churn` | The Real Cost of Context Window Churn | Productivity |
| `memory-mcp-v2-whats-new` | What's New in memory-mcp v2.5 | Release |
| `memory-mcp-vs-alternatives` | MCP Memory Servers Compared | Comparison |
| `mastering-negative-prompts` | Mastering Negative Prompts | Best Practices |
| `how-to-build-claude-agents` | How to Build Claude Agents | Tutorial |
| `agents-md-vs-claude-md` | AGENTS.md vs CLAUDE.md | Tutorial |

### Tools (4 tools)
| Tool | Path | Description |
|------|------|-------------|
| Token Counter | `/tools/token-counter` | Count tokens, estimate costs for Claude/GPT-4 |
| Prompt Library | `/tools/prompts` | 16 curated prompts, click to copy |
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
│   ├── blog/                  # Blog posts (10 posts)
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

1. Unify momentum + memory-mcp into single Bun-native package
2. Add dynamic stats (GitHub stars, npm downloads)
3. Add user testimonials section
4. Cross-post Mirror Demons to Substack
5. Execute traffic playbook (Reddit, HN)

---

## Session Log

**2026-01-11** (Session 4 - Continued from context compaction):
- Added agents-md-vs-claude-md blog post to index (was missing)
- Added Open Graph and Twitter social sharing images to metadata
- Fixed waitlist anchor link on pricing page (/#waitlist now works)
- Updated CLAUDE.md with accurate blog post count (10 posts)
- Verified all blog posts are in sitemap and index
- Cleaned up and verified codebase consistency
- Created dev.to article for traffic playbook execution
- Updated token counter with January 2026 model pricing (Claude 4.5 series)
- Updated prompt library model references to Claude 4.5 series
- Fixed outdated model references throughout codebase
- Fixed pricing FAQ to use future tense (Pro not launched yet)
- Aligned footer nav with header nav (added Tools link, fixed Memory label)
- Updated ACTIVATION_GUIDE to reflect Formspree already configured
- Fixed context-window-churn blog post with accurate benchmark numbers
- Fixed "Claude 3.7 Sonnet" references in Eleanor Chen Effect (version never existed)
- Removed unused Metadata import from token-counter
- Added missing pricing page to sitemap

**2026-01-11** (Session 3):
- Added 3 new blog posts:
  - "Why We Chose FTS5 Over Embeddings" - technical credibility piece
  - "Memory Architecture Patterns" - two-server design philosophy
  - "The Real Cost of Context Window Churn" - developer productivity focus
- Expanded Prompt Library from 12 to 16 prompts:
  - Session Handoff: Document work for continuity
  - Debug Assistant: Systematic debugging
  - API Documenter: Generate API docs
  - Explain Like Five: Simplify complex concepts
- Enhanced /docs with:
  - Memory Tools section explaining momentum vs memory-mcp
  - Comprehensive Troubleshooting FAQ
  - Config file locations for macOS, Windows, Linux
- Fixed momentum install command consistency (substratia-marketplace)
- Researched and documented Tailscale-inspired open-core strategy
- Implemented Bun single-binary compilation for momentum
- Fixed momentum plugin issues (CLAUDE_DATA_DIR, duplicate hooks)

**2026-01-11** (Session 2):
- Fixed blog visibility in navigation (was missing from nav)
- Reduced pricing emphasis site-wide (removed from nav, softened in landing/pro pages)
- Softened Pro tier claims to be exploratory ("We're exploring..." vs firm promises)
- Expanded Prompt Library from 8 to 12 prompts (+Code Reviewer, Meeting Summarizer, Learning Companion, Devils Advocate)
- Created mirror-demons GitHub repo with raw research data (https://github.com/WhenMoon-afk/mirror-demons)
- Added GitHub link to Mirror Demons blog post
- Integrated Substack (skyceres.substack.com) in nav and footer
- Cross-linked Eleanor Chen Effect and Mirror Demons research articles
- Updated docs page: fixed branding (PromptForge → AgentForge), added memory tool links
- Removed ALL PromptForge references across entire codebase (replaced with Substratia/AgentForge)
- Updated blog post CTAs (Premium → Memory Tools)
- Added JSON-LD structured data for SEO (Organization schema)
- Fixed sitemap.xml: updated to substratia.io domain, added all pages
- Fixed robots.txt: updated domain and branding
- Migrated claude-memory-mcp from npm to Bun (all 34 tests passing)

**2026-01-11** (Session 1):
- Added Mirror Demons blog post (original research on AI delusion amplification)
- Added Seed Maker tool (client-side entropy generator)
- Various content improvements
