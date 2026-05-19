# AGENTS.md

This file gives Codex guidance for work in this repository.

## Project

Substratia is memory infrastructure for AI agents. The live site is
https://substratia.io and the repository is
https://github.com/WhenMoon-afk/substratia.io.

## Quick Commands

```bash
pnpm install        # Install dependencies
pnpm dev:web        # Web dev server at localhost:3000
pnpm dev:mobile     # Expo mobile dev server
pnpm dev:convex     # Convex dev server
pnpm build          # Production build
pnpm lint           # ESLint
pnpm typecheck      # TypeScript checks
```

## Package Manager

Use pnpm for this repo. Do not reintroduce Bun-only scripts or `bun.lock`;
Bun 1.1.0 hung during Windows installs in this workspace.

## Architecture

- Root monorepo orchestrated by Turbo.
- `apps/web`: Next.js App Router web app.
- `apps/mobile`: Expo React Native app.
- `packages/convex`: Convex backend functions and schema.
- `packages/memory`: local-first memory SDK, CLI, dashboard, and share tools.

Path aliases in the web app use `@/*` for `apps/web/src/*`.

## Security Notes

- Keep public unauthenticated routes from binding credentials to user-supplied
  email identities.
- API keys must be hashed before storage and should not be printed to logs.
- Dashboard error responses should not expose stack traces or internal error
  messages.
- Prefer argument-vector process APIs such as `execFile` over string-built
  shell commands.

## Deployment

Pushing to `master` deploys through Vercel. Use the repo checks before pushing:

```bash
pnpm lint
pnpm typecheck
pnpm build
node --test tools/security-regressions.test.mjs
```
