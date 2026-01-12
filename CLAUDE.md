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

### Blog (11 posts)
| Slug | Title | Type |
|------|-------|------|
| `context-management-guide` | The Ultimate Guide to Claude Code Context Management | Guide (Featured) |
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

### Tools (12 tools)
| Tool | Path | Description |
|------|------|-------------|
| Claude Code Cheat Sheet | `/tools/cheat-sheet` | Commands, shortcuts, CLAUDE.md patterns, MCP config (print/PDF) |
| Claude Code Cost Calculator | `/tools/cost-calculator` | Track session costs, compare API vs subscription pricing |
| Claude Code Prompt Optimizer | `/tools/prompt-optimizer` | Build prompts with thinking modes, autonomous loops, snippets |
| Stack Builder | `/tools/stack-builder` | Full-stack tech selector with compatibility checks, AI analysis export |
| Token Counter | `/tools/token-counter` | Count tokens, estimate costs for Claude/GPT-4 |
| Prompt Library | `/tools/prompts` | 20 curated prompts, click to copy |
| Seed Maker | `/tools/seed-maker` | High-entropy random strings from mouse movements |
| Image Prompt Generator | `/tools/image-prompt-generator` | Visual prompt builder for AI image generation (50+ presets) |
| Video Prompt Timeline | `/tools/video-prompt-timeline` | Frame-by-frame video prompt storyboard (7 keyframes) |
| Markdown Preview | `/tools/markdown-preview` | Live markdown editor with instant preview (Obsidian-style) |
| Markdown Stripper | `/tools/markdown-stripper` | Remove all markdown formatting instantly |
| AgentForge Builder | `/builder` | Drag-and-drop CLAUDE.md builder |

### Reviews (4 comparisons)
| Comparison | Path | Tools Compared |
|------------|------|----------------|
| AI Coding Assistants | `/reviews/ai-coding-assistants` | Claude Code, Cursor, Copilot, Codeium, Windsurf |
| Markdown Editors | `/reviews/markdown-editors` | Obsidian, Notion, Typora, VS Code, iA Writer |
| AI Image Generators | `/reviews/ai-image-generators` | Midjourney, DALL-E 3, Stable Diffusion, Grok, Flux |
| AI Video Generators | `/reviews/ai-video-generators` | Runway, Pika, Luma, Kling, Grok |

### Pages
- `/` - Landing page (memory infrastructure + consulting CTA)
- `/consulting` - **Consulting services** (setup, training, advisory)
- `/faq` - Frequently asked questions (15 questions, 4 categories)
- `/testimonials` - Client success stories (coming soon)
- `/templates` - Memory tools (momentum, memory-mcp)
- `/tools` - Free AI tools index (12 tools, with email capture)
- `/reviews` - AI tool comparisons index
- `/builder` - AgentForge drag-and-drop builder
- `/blog` - Blog index (11 posts, with email capture)
- `/docs` - Documentation
- `/pro` - Pro tier waitlist (de-emphasized)
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
│   │   ├── seed-maker/
│   │   ├── image-prompt-generator/  # AI image prompt builder
│   │   ├── video-prompt-timeline/   # Video storyboard builder
│   │   ├── markdown-preview/        # Live markdown editor
│   │   └── markdown-stripper/       # Markdown to plain text
│   └── layout.tsx            # Root layout with metadata
├── components/
│   ├── Nav.tsx               # Global navigation
│   ├── AIAssistant.tsx       # Builder sidebar
│   └── DraggableCapability.tsx
├── data/
│   ├── presets.ts            # 28 capabilities + 13 rulesets
│   ├── imagePromptPresets.ts # Image gen style presets (50+)
│   └── videoPromptPresets.ts # Video timeline moment presets
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
3. Reviews (/reviews)
4. Reviews (/reviews) - AI tool comparisons
5. Consulting (/consulting) - **Primary monetization path**
6. Blog (/blog)
7. Docs (/docs)
8. GitHub (external)

Footer links:
- Memory, Tools, Reviews, Consulting, Blog, Docs, GitHub

---

## Business Strategy (Updated 2026-01-11)

**Pivot Complete**: From "Pro tier SaaS" to "Consulting + Free Tools"

**Why the pivot:**
- Mem0 has $24M funding and 41K GitHub stars (we have 48)
- Pro tier features (cloud sync, backups) are easily DIY-able
- Course market is saturated (Udemy, Coursera, Anthropic official)
- Consulting can start immediately with no infrastructure

**Revenue Model:**
- Free tools drive traffic and establish authority
- Consulting generates revenue ($150-500/hr)
- Memory tools (momentum, memory-mcp) remain free forever as lead generation

**Consulting Services (live at /consulting):**
- Individual: Audit ($150), Setup ($200), Deep Dive ($350)
- Team: Workshop ($1,500), Bootcamp ($3,000)
- Advisory: Light ($500/mo), Standard ($1,200/mo), Premium ($2,500/mo)

**Strategic Documents:** See `/planning/ACTION_PLAN_FINAL.md` for 90-day execution plan.

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

### Immediate Priority (Community Outreach)
1. **Execute community posts** - See `/marketing/COMMUNITY_POSTS.md` for ready-to-post content
2. **First consulting conversation** - Target 1 paid consultation within 2 weeks
3. **Reddit presence** - Post helpful content to r/ClaudeAI (not promotional)

### Content & Marketing
4. **Product Hunt launch** - Submit substratia.io/tools
5. **Twitter/X presence** - Daily Claude Code tips (see COMMUNITY_POSTS.md)
6. **Discord presence** - Join Claude Code server, be helpful

### Future Tool Enhancements
**Video Prompt Timeline**: Drag-and-drop reordering, JSON export, URL sharing
**Markdown Preview**: Bidirectional HTML→MD conversion, PDF export

### Infrastructure
7. Performance optimization pass (target: Lighthouse >90)
8. Mobile responsiveness audit

See `/planning/ACTION_PLAN_FINAL.md` for 90-day strategic plan.

---

## Session Log

**2026-01-12** (Session 10 - Comprehensive SEO Enhancement):
- **BreadcrumbList Schema** (38 pages total):
  - Added to all 11 tool pages
  - Added to all 4 review pages
  - Added to all 11 blog posts
  - Added to all 12 top-level pages
- **Root Layout Enhancements:**
  - Added WebSite schema with SearchAction for sitelinks search box
  - Enhanced Organization schema with contactPoint
- **Navigation Updates:**
  - Added Reviews to main navigation
  - Added Reviews to footer
- **Fixes:**
  - Added missing keywords to docs and pricing pages
  - Added context-management-guide to RSS feed
  - Improved 404 page with better navigation options
- Build verified: 43 pages, all passing

**2026-01-11** (Session 9 - Lead Generation Infrastructure):
- **Email Capture Expansion:**
  - Added newsletter signup to `/tools` index page
  - Added newsletter signup to `/blog` index page
  - Converted pages to client components with layout.tsx for SEO
  - Source tracking for Formspree (tools-index, blog, testimonials)
- **New Pages Created:**
  - `/faq` - 15 FAQ questions across 4 categories (General, Tools, Consulting, Technical)
  - `/testimonials` - Client success stories page (coming soon state)
- **SEO Improvements:**
  - JSON-LD structured data for consulting (Service schema)
  - JSON-LD structured data for FAQ (FAQPage schema)
  - Added layout.tsx metadata files for client component pages
- **Marketing Content:**
  - Created Dev.to article draft: "The Complete Guide to Claude Code Context Management"
  - Located at `/marketing/devto/context-management-guide.md`
- **Documentation:**
  - Updated parent CLAUDE.md with consulting pivot strategy
  - Updated substratia.io CLAUDE.md with new pages
- Build verified: 43 pages total
- All changes deployed to Cloudflare Pages

**2026-01-11** (Session 8 - Strategic Pivot + Consulting Launch):
- **MAJOR PIVOT**: From "Pro tier SaaS" to "Consulting + Free Tools" model
- Deep market research completed:
  - Mem0 competitive analysis ($24M funding, 41K stars)
  - Claude Code pain points analysis (context loss #1)
  - Consulting opportunity validation ($150-500/hr rates)
  - Course market saturation analysis
- Created 7 strategic planning documents in `/planning/`:
  - ACTION_PLAN_FINAL.md (90-day execution plan)
  - STRATEGIC_SYNTHESIS.md, MONETIZATION_REALITY_CHECK.md, etc.
- **New Pages Created:**
  - `/consulting` - Full consulting services page with pricing, contact form
  - `/tools/cheat-sheet` - Claude Code reference (commands, shortcuts, patterns)
  - `/blog/context-management-guide` - 12-min deep dive (featured post)
- **Landing Page Updated:**
  - Replaced "Pro tier waitlist" with "Consulting CTA"
  - Added newsletter signup section
  - Footer updated with Consulting link
- **Navigation Updated:**
  - Added "Consulting" to main nav, removed "Builder"
- Created community content in `/marketing/COMMUNITY_POSTS.md`:
  - Reddit posts (r/ClaudeAI)
  - Twitter/X threads and singles
  - Discord introduction
  - LinkedIn, HN, Dev.to outlines
- Build verified: 41 pages total

**2026-01-11** (Session 7 - Claude Code Toolkit + Stack Builder):
- Added Stack Builder (`/tools/stack-builder`):
  - 10 technology categories (Frontend, Styling, State, Backend, Database, ORM, Auth, Hosting, CI/CD, Monitoring)
  - 60+ technology options with pros/cons/best-for
  - Compatibility warnings system
  - Export: AI analysis prompt, Markdown, CSV, JSON
  - Visual step-through interface with progress bar
  - Hover tooltips with detailed tech info
- Added 2 new Claude Code tools:
  - Claude Code Cost Calculator (`/tools/cost-calculator`):
    - Session tracking with localStorage persistence
    - 7-day history visualization
    - API vs subscription comparison (Max Pro, Max, Pro)
    - Claude 4.5 Opus, Sonnet, Haiku pricing
    - Export sessions as JSON
  - Claude Code Prompt Optimizer (`/tools/prompt-optimizer`):
    - Thinking modes: normal, thinkhard, ultrathink
    - 12 prompt snippets in 5 categories:
      - Autonomous loops (3 patterns)
      - Parallel execution (3 patterns)
      - Simulator subagents (3 patterns)
      - Structure templates (2 patterns)
      - Interrupt patterns (2 patterns)
    - Real-time prompt generation with copy to clipboard
    - Character count and snippet stats
- Updated tools index page with new tools at top
- Updated sitemap with new pages
- Added 2 new comparison pages:
  - AI Coding Assistants (Claude Code, Cursor, Copilot, Codeium, Windsurf)
  - Markdown Editors (Obsidian, Notion, Typora, VS Code, iA Writer)
- Build verified: 38 pages total

**2026-01-11** (Session 6 - Major Tools Expansion):
- Added 4 new tools:
  - Image Prompt Generator (50+ presets, 5 platforms)
  - Video Prompt Timeline (7 keyframes, favorites system)
  - Markdown Preview (dual-panel Obsidian-style editor)
  - Markdown Stripper (instant formatting removal)
- Created Reviews section with:
  - Reviews index page
  - AI Image Generators comparison (5 tools)
  - AI Video Generators comparison (5 tools)
- Added Reviews to main navigation
- Created comprehensive strategic plan (`/planning/TOOLS_EXPANSION_PLAN.md`):
  - Claude Code Prompt Optimizer (thinking modes, snippets)
  - Claude Code Cost Calculator (session tracking, charts)
  - Stack Builder (PC Part Picker for web apps)
  - 3 YouTube video scripts outlined
  - UX/performance optimization targets
- Build verified: 33 pages total
- All tools cross-linked with CTAs

**2026-01-11** (Session 6 - Continued - AI Media & Markdown Tools):
- Added Image Prompt Generator (`/tools/image-prompt-generator`):
  - 50+ style presets across 5 categories (Photography, Art, Aesthetic, Lighting, Technical)
  - Platform selector (nano-banana-pro default, Grok, Midjourney, DALL-E, Stable Diffusion)
  - 5 intensity sliders (Style, Detail, Realism, Saturation, Contrast)
  - 7 negative prompt presets
  - Platform-specific output formatting
  - Copy/download functionality
- Added Video Prompt Timeline (`/tools/video-prompt-timeline`):
  - 7 keyframe slots at 5-second intervals (0-30 seconds)
  - Platform selector (Grok default, Runway, Pika, Luma, Kling)
  - 30+ moment presets in 4 categories (Actions, Camera, Transitions, Atmosphere)
  - Motion and transition controls per keyframe
  - Save/load favorites (localStorage)
  - Global style input
- Added Markdown Preview (`/tools/markdown-preview`):
  - Live dual-panel editor (Edit mode / Reading mode)
  - View toggle (Edit / Split / Preview)
  - Full markdown syntax support (headers, bold, italic, links, code, lists, blockquotes)
  - Copy raw markdown or HTML output
  - Word/character/line count stats
- Added Markdown Stripper (`/tools/markdown-stripper`):
  - Paste markdown, get clean plain text instantly
  - Strips headers, bold, italic, links, code, lists, blockquotes, HTML
  - Shows character reduction stats
  - Copy/paste buttons
- Created data files:
  - `src/data/imagePromptPresets.ts` - Style presets, negative presets, formatters
  - `src/data/videoPromptPresets.ts` - Moment presets, timeline helpers
- Updated tools index page with all 4 new tools (marked as "New")
- Updated sitemap.xml with new pages
- Build verified: 30 pages total

**2026-01-11** (Session 5 - SEO improvements):
- Added SEO metadata layouts for all client-side pages:
  - /tools/token-counter - Token Counter with OpenGraph tags
  - /tools/prompts - Prompt Library (20 prompts) with keywords
  - /tools/seed-maker - Seed Maker with crypto keywords
  - /pro - Substratia Pro waitlist page
  - /builder - AgentForge builder page
- All pages now have proper titles, descriptions, keywords, and OpenGraph meta

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
- Improved templates page SEO metadata (title, keywords)
- Updated README with current features and Bun-based stack
- Added 4 new prompts to library (now 20 total):
  - Deep Reasoning Assistant: Structured problem-solving
  - Writing Style Analyzer: Style extraction and replication
  - Research Orchestrator: Research strategy and synthesis
  - Reflection Framework: Iterative self-improvement

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
