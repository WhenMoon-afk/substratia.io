# Monorepo Conversion Design

**Date**: 2026-01-15
**Status**: Approved
**Scope**: Convert substratia.io to Turborepo monorepo with React Native mobile app

## Summary

Transform the existing Next.js web app into a monorepo structure with:
- Shared Convex backend package
- New React Native (Expo) mobile app for Android
- Turborepo for build orchestration
- Bun as package manager

## Key Decisions

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Structure | Apps + Packages | Industry-standard Turborepo pattern, scales well |
| Location | In-place conversion | Preserves git history |
| Mobile styling | NativeWind v4 | Standard Tailwind for RN, matches web approach |
| Expo workflow | Managed | Simpler maintenance, no ejecting |
| Platform | Android-only | Focused scope, can add iOS later |
| Mobile scope | Dashboard only | Auth + view data + API key management |

## Directory Structure

```
substratia.io/
├── apps/
│   ├── web/          # Next.js (existing, moved)
│   └── mobile/       # Expo (new)
├── packages/
│   ├── convex/       # Shared backend + types
│   └── shared/       # Shared utilities
├── turbo.json
├── package.json
└── bun.lock
```

## Implementation Phases

1. **Scaffold** - Create monorepo structure, root configs
2. **Move Web** - Relocate to apps/web/, update paths
3. **Extract Convex** - Move to packages/convex/, export types
4. **Create Mobile** - Expo app with Clerk + Convex
5. **Build Screens** - Dashboard, snapshots, memories, API keys
6. **Verify** - Test both apps, build Android APK

## Mobile App Screens

- `sign-in.tsx` / `sign-up.tsx` - Clerk auth
- `(auth)/dashboard.tsx` - Stats, recent items
- `(auth)/snapshots.tsx` - Full list with search
- `(auth)/memories.tsx` - Full list with search
- `(auth)/api-keys.tsx` - Create, list, revoke

## Convex Sharing Strategy

Both apps import from `@substratia/convex`:
```typescript
import { api } from '@substratia/convex/api';
const snapshots = useQuery(api.snapshots.getRecent, { limit: 5 });
```

Single Convex deployment serves both clients.

## Verification Checklist

- [ ] Web app runs at localhost:3000
- [ ] Convex dev generates types
- [ ] Mobile starts with expo start
- [ ] Auth works on both platforms
- [ ] Data syncs between platforms
- [ ] Android APK builds with EAS

## References

- Full implementation plan: `.claude/plans/quizzical-nibbling-bunny.md`
- Negative prompt (anti-patterns): See implementation plan
