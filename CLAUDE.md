# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project: Subtratia AgentForge

**Goal**: $1000/month profit via AI tools platform (primary) + digital products (secondary).

**Brand**: AgentForge by Subtratia (part of Subtratia plugin marketplace ecosystem)

## Current State (2026-01-11)

### DEPLOYED & LIVE
- **URL**: https://whenmoon-afk.github.io/agentforge/
- **GitHub**: https://github.com/WhenMoon-afk/agentforge
- **Auto-deploy**: GitHub Actions on push to master

### TOS WARNING
GitHub Pages prohibits commercial SaaS. Current site has pricing page that violates TOS.
**Action needed**: Migrate to Netlify or Cloudflare (user will authenticate), or use Ghost for commercial content.

### Completed Features
| Feature | Status |
|---------|--------|
| Landing page | LIVE |
| Agent builder (DnD) | LIVE |
| Templates page | LIVE |
| Pricing page | LIVE (TOS issue) |
| Blog (3 posts) | LIVE |
| Email capture | LIVE (no backend) |
| SEO (sitemap, robots.txt) | LIVE |

### Pending Work
- New blog post ready: `src/app/blog/agents-md-vs-claude-md/page.tsx` (not pushed)
- Need: Migrate to TOS-compliant hosting
- Need: Set up Ghost for blog/memberships OR Netlify/Cloudflare for full site
- Need: Connect payment processing (Stripe via Ghost, or Gumroad links)

## Quick Commands

```bash
cd /home/local-user/Github/company-overseer/agentforge
bun install        # Install deps (use bun, not npm)
bun run dev        # Dev server at localhost:3000
bun run build      # Production build
bun run lint       # Linter
```

## Architecture

```
agentforge/
├── src/app/
│   ├── page.tsx              # Landing (Subtratia branding)
│   ├── builder/page.tsx      # DnD agent config builder
│   ├── templates/page.tsx    # Premium templates ($29-$199)
│   ├── pricing/page.tsx      # Subscription tiers (TOS issue)
│   ├── docs/page.tsx         # Documentation
│   ├── blog/                 # SEO content
│   │   ├── how-to-build-claude-agents/
│   │   ├── mastering-negative-prompts/
│   │   └── agents-md-vs-claude-md/  # NEW - not pushed
│   └── api/subscribe/route.ts
├── src/components/
│   ├── Nav.tsx               # Shows "AgentForge by Subtratia"
│   ├── AIAssistant.tsx
│   └── DraggableCapability.tsx
├── src/data/presets.ts       # 28 capabilities, 13 rulesets
├── next.config.js            # Static export for GitHub Pages
├── .github/workflows/deploy.yml  # Auto-deploy to GH Pages
└── public/
    ├── sitemap.xml           # URLs point to GH Pages
    └── robots.txt
```

## Key Files in Parent Repo

```
/home/local-user/Github/company-overseer/
├── .claude/
│   ├── RESUME_STATE.md       # Current state, metrics
│   ├── LOOP_GUARDIAN.md      # Anti-loop rules
│   ├── AUTONOMOUS_OPS.md     # Autonomous operation guide
│   └── AI_PLATFORM_STRATEGY.md
├── tools/
│   ├── browser_automation.py  # CDP browser control
│   └── browser_session_guard.py  # Domain allowlist
└── app.py                     # Flask dashboard (port 5000)
```

## Hosting Migration Options

| Option | Commercial OK | Payment Built-in | Notes |
|--------|--------------|------------------|-------|
| Netlify | Yes | No (add Stripe) | User can auth, deploy via CLI |
| Cloudflare Pages | Yes | No | Alternative to Netlify |
| Ghost | Yes | Yes (Stripe) | Best for blog/memberships |
| GitHub Pages | **NO** | No | Current - TOS violation |

**Recommended**: Ghost for content/payments + Netlify for builder app

## Revenue Strategy

### Products Ready to Sell
| Template | Price |
|----------|-------|
| Loop Guardian System | $29 |
| Autonomous Ops Guide | $39 |
| CEO/Overseer Framework | $49 |
| Complete System Bundle | $199 |

### Monetization Path
1. Set up Ghost with Stripe memberships
2. Move blog/premium content to Ghost
3. Keep free builder on Netlify (or GH Pages if stripped of commercial content)
4. Drive traffic via SEO blog posts

## Platform Limits
- **Gumroad**: 10 products/day limit - don't waste time if hit
- **Etsy**: Account ready, no products uploaded yet

## Git Workflow

```bash
# In agentforge/
git add -A && git commit -m "feat: description" && git push origin master
# GitHub Actions auto-deploys to https://whenmoon-afk.github.io/agentforge/
```

## Next Priority Actions

1. **User authenticates Netlify or Cloudflare** - migrate for TOS compliance
2. **Push pending blog post** - `agents-md-vs-claude-md`
3. **Set up Ghost** - for memberships/payments (Ghost Pro or self-hosted)
4. **Create Gumroad products** - when limit resets, add templates
5. **Drive traffic** - more SEO content, social sharing
