# Substratia

**Memory infrastructure for AI** — Intelligence is substrate-agnostic.

## Monorepo Structure

This is a TurboRepo monorepo containing:

```
substratia/
├── apps/
│   ├── web/          # Next.js 15 web app (substratia.io)
│   └── mobile/       # Expo React Native app (Android)
├── packages/
│   ├── convex/       # Shared Convex backend
│   └── shared/       # Shared types and utilities
├── turbo.json        # TurboRepo configuration
└── package.json      # Workspace root
```

## Quick Start

```bash
# Install all dependencies
bun install

# Run web app (localhost:3000)
bun run dev:web

# Run mobile app
bun run dev:mobile
# Press 'a' for Android emulator

# Run Convex dev server
cd packages/convex && bun run dev

# Build all
bun run build
```

## Tech Stack

### Web (apps/web)
- Next.js 15 (App Router, SSR)
- TypeScript
- Tailwind CSS 3.4
- Clerk (auth)
- Convex (backend)
- Vercel (hosting)

### Mobile (apps/mobile)
- Expo SDK 54
- React Native 0.81
- Expo Router 6
- NativeWind (Tailwind for RN)
- Clerk + Convex (shared auth/backend)
- Android-focused

### Backend (packages/convex)
- Convex real-time database
- Shared between web and mobile
- Schema: users, snapshots, memories, apiKeys

## Live Site

[https://substratia.io](https://substratia.io)

## Features

### Memory Tools
- **momentum** - Fast context recovery (<5ms restore time)
- **memory-mcp** - Persistent memory across sessions
- **Memory Dashboard** - View and manage your snapshots and memories

### Free Tools (12 total)
- Claude Code Cheat Sheet, Cost Calculator, Prompt Optimizer
- Stack Builder, Token Counter, Prompt Library
- Seed Maker, Image/Video Prompt Generators
- Markdown Preview, Markdown Stripper

### Mobile App
- Dashboard with snapshot/memory stats
- View all saved snapshots
- View all saved memories
- Powered by Convex

## Environment Setup

Copy `.env.example` to `.env` and configure:

```env
CONVEX_URL=https://your-deployment.convex.cloud
NEXT_PUBLIC_CONVEX_URL=...
EXPO_PUBLIC_CONVEX_URL=...
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=...
EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY=...
```

## Related Projects

| Project | Description | Repo |
|---------|-------------|------|
| momentum | Context recovery plugin | [GitHub](https://github.com/WhenMoon-afk/momentum) |
| memory-mcp | Persistent memory MCP | [GitHub](https://github.com/WhenMoon-afk/claude-memory-mcp) |
| substratia-marketplace | Plugin distribution | [GitHub](https://github.com/WhenMoon-afk/substratia-marketplace) |

## License

MIT
