# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project: Substratia

**Live Site**: https://substratia.io
**GitHub**: https://github.com/WhenMoon-afk/substratia
**Philosophy**: Intelligence is substrate-agnostic

Open-source developer tools for Claude Code - context management, productivity tools, and AI-powered development resources.

---

## Quick Commands

```bash
bun install        # Install dependencies
bun run dev        # Dev server at localhost:3000
bun run build      # Production build for Vercel
bun run lint       # ESLint
npx convex dev     # Run Convex dev server (for backend changes)
```

## Deployment

Push to master → Vercel auto-deploys in ~60s

```bash
git add -A && git commit -m "feat: description" && git push origin master
```

Manual deploy: `npx vercel --prod --token $VERCEL_TOKEN`

---

## Current Content (as of 2026-01-18)

### Blog (12 posts)
| Slug | Title | Type |
|------|-------|------|
| `announcing-substratia-cloud` | Announcing Substratia Cloud | Announcement (Featured) |
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

### Reviews (4 comparisons)
| Comparison | Path | Tools Compared |
|------------|------|----------------|
| AI Coding Assistants | `/reviews/ai-coding-assistants` | Claude Code, Cursor, Copilot, Codeium, Windsurf |
| Markdown Editors | `/reviews/markdown-editors` | Obsidian, Notion, Typora, VS Code, iA Writer |
| AI Image Generators | `/reviews/ai-image-generators` | Midjourney, DALL-E 3, Stable Diffusion, Grok, Flux |
| AI Video Generators | `/reviews/ai-video-generators` | Runway, Pika, Luma, Kling, Grok |

### Pages
- `/` - Landing page (developer tools overview + Cloud CTA)
- `/cloud` - **Substratia Cloud** landing page (Early Access, features, pricing)
- `/dashboard` - **Cloud dashboard** (requires auth, shows snapshots/memories)
- `/sign-in` - Clerk authentication (Google OAuth)
- `/sign-up` - Clerk registration
- `/faq` - Frequently asked questions (10 questions, 3 categories)
- `/testimonials` - Client success stories (coming soon)
- `/templates` - Memory tools (momentum, memory-mcp)
- `/tools` - Free AI tools index (12 tools, with email capture)
- `/reviews` - AI tool comparisons index
- `/blog` - Blog index (12 posts, with email capture)
- `/docs` - Documentation
- `/start-here` - Getting started guide
- `/pricing` - Pricing page
- `/privacy` - Privacy policy (GDPR compliance)
- `/terms` - Terms of service

---

## Architecture

### Tech Stack
- **Framework**: Next.js 14 (App Router, SSR)
- **Styling**: Tailwind CSS 3.4
- **Backend**: Convex (real-time database)
- **Auth**: Clerk (custom domain: clerk.substratia.io)
- **Package Manager**: Bun
- **Hosting**: Vercel (SSR required for auth)
- **DNS**: Cloudflare
- **Domain**: substratia.io
- **Email Capture**: Formspree (https://formspree.io/f/mreezwlv)

### Path Alias
`@/*` → `./src/*` (configured in tsconfig.json)

### Directory Structure
```
src/
├── app/
│   ├── page.tsx              # Landing page
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
│   └── ...
├── data/
│   ├── imagePromptPresets.ts # Image gen style presets (50+)
│   └── videoPromptPresets.ts # Video timeline moment presets
└── globals.css               # Tailwind + custom CSS variables
```

### Build Configuration (next.config.js)

- `images.unoptimized: true` - Using Vercel image optimization
- `trailingSlash: true` - URL consistency
- **No static export** - SSR required for Clerk auth pages

### Client vs Server Components
- **Client** ('use client'): landing page, Nav.tsx, tools
- **Server** (default): layout.tsx, blog pages, docs

---

## Branding

- **Parent Brand**: Substratia (open-source developer tools for Claude Code)
- **Products**: momentum, memory-mcp
- **Tagline**: "Open-Source Developer Tools for Claude Code"
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
1. Start Here (/start-here)
2. Cloud (/cloud) - **Primary monetization path** [Badge: New]
3. Dashboard (/dashboard) - Requires auth
4. Tools (/tools)
5. Reviews (/reviews)
6. Blog (/blog)
7. Docs (/docs)
8. GitHub (external)

Footer links:
- Memory, Tools, Reviews, Blog, Docs, GitHub
- Privacy Policy, Terms of Service (legal links)

---

## Security

### Security Headers (next.config.js)
All responses include:
- `Strict-Transport-Security` - HSTS with 1-year max-age
- `Content-Security-Policy` - Script/style/connect-src restrictions
- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: SAMEORIGIN`
- `X-XSS-Protection: 1; mode=block`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Permissions-Policy` - Camera/mic/geolocation disabled

### Route Protection (middleware.ts)
- Server-side auth protection for `/dashboard` routes
- Unauthenticated users redirected to sign-in at edge
- Defense-in-depth beyond client-side checks

### API Security
- Rate limiting on `/api/subscribe` (5 req/min per IP)
- API keys are SHA-256 hashed before storage
- All mutations require authenticated sessions (Clerk)
- User data is scoped and isolated per account
- Sensitive admin functions are internal-only (not client-callable)

### Authentication (Clerk)
- HttpOnly, Secure, SameSite=Strict cookies
- Google OAuth via custom domain (clerk.substratia.io)
- JWT-based auth with Convex validation
- Session management with secure defaults

### CI/CD Security
- **Pre-commit hooks**: Block secret commits (husky + TruffleHog)
- **Dependabot**: Weekly dependency updates (`.github/dependabot.yml`)
- **GitHub Actions**: CodeQL scanning, TruffleHog secrets scan (`.github/workflows/security.yml`)

### Security Documentation
- `SECURITY.md` - Vulnerability disclosure policy
- `/privacy` - Privacy policy page
- `/terms` - Terms of service page

---

## Business Strategy (Updated 2026-01-15)

**Current Focus**: Free Tools + Substratia Cloud SaaS

**Why Cloud SaaS:**
- Infrastructure is defensible (AI can't replace hosting)
- Recurring revenue compounds
- Consulting doesn't scale and is AI-vulnerable
- Cloud sync is the #1 requested feature

**Revenue Model:**
- Free tools drive traffic and establish authority
- Cloud subscription for sync, backup, cross-device access
- Pro ($9/mo) / Team ($19/seat/mo) / Enterprise (custom)
- Memory tools (momentum, memory-mcp) remain free forever as lead generation

**Break-even:** 23 Pro subscribers OR 11 Team seats

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

## Implementation Status (Updated 2026-01-20)

### Completed
- ✅ **memory-mcp cloud sync** - Memories auto-sync to Convex on store
- ✅ **Stripe webhook** - `/api/stripe/webhook` handles subscription events
- ✅ **Tier enforcement** - Free tier limited to 100 memories (402 when exceeded)
- ✅ **Stripe checkout** - `/api/stripe/checkout` creates checkout sessions
- ✅ **Pricing page** - Subscribe button triggers Stripe checkout
- ✅ **Dashboard** - Shows synced memories and snapshots

### Environment Variables Needed
```
# Vercel (frontend)
STRIPE_SECRET_KEY=sk_live_xxx
STRIPE_PRO_PRICE_ID=price_xxx

# Convex (backend) - set via `npx convex env set`
STRIPE_WEBHOOK_SECRET=whsec_xxx
STRIPE_PRO_PRICE_ID=price_xxx
```

### Stripe Webhook URL
`https://agreeable-chameleon-83.convex.site/api/stripe/webhook`

Events: checkout.session.completed, customer.subscription.updated, customer.subscription.deleted, invoice.payment_failed

---

## Next Tasks (Session Continuity)

### Immediate Priority
1. **Configure Stripe** - Create product, set env vars, test webhook
2. **Simplify login** - Disable GitHub OAuth in Clerk, keep only Google

### Marketing
3. **Product Hunt launch** - Submit substratia.io with cloud features
4. **Community posts** - See `/marketing/COMMUNITY_POSTS.md`
5. **Reddit/Twitter presence** - Share helpful Claude Code content

### Future Enhancements
- **Team features**: Shared knowledge bases, collaboration
- **momentum cloud sync**: Currently only snapshots sync (memories prioritized)
