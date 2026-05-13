#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "$0")/.."

player_facing_files=(
  apps/web/src/app/page.tsx
  apps/web/src/app/dashboard/page.tsx
  apps/web/src/app/play/arrow/page.tsx
  apps/web/src/app/sign-in/[[...sign-in]]/page.tsx
  apps/web/src/app/sign-up/[[...sign-up]]/page.tsx
  apps/web/src/components/Footer.tsx
  apps/web/src/lib/site-config.ts
)

arrow_facing_files=(
  apps/web/src/app/page.tsx
  apps/web/src/app/play/arrow/page.tsx
  apps/web/src/app/sign-in/[[...sign-in]]/page.tsx
  apps/web/src/app/sign-up/[[...sign-up]]/page.tsx
  apps/web/src/components/Footer.tsx
  apps/web/src/lib/site-config.ts
)

for file in "${arrow_facing_files[@]}"; do
  grep -q 'Arrow Server' "$file"
done

grep -q 'description: siteConfig.description' apps/web/src/app/layout.tsx

if rg -n 'Harborlight|test world|live RP engine demo|front door for.*RP-engine|Memory Infrastructure for AI Agents|context reset is amnesia|agent memory.*infrastructure|Google login as the human gate|visual browser client|raw MUD|guide agent|Book of Aurora|move through the scene|Player dashboard|Substratia Memory Dashboard|memories and snapshots|Intelligence is substrate-agnostic|Built by practitioners|NewsletterCapture' \
  apps/web/src/app/layout.tsx "${player_facing_files[@]}"; then
  echo "player-facing Arrow surfaces must not use stale, internal, legacy-dashboard, or protected-world framing" >&2
  exit 1
fi

grep -q 'afterSignInUrl="/play/arrow"' apps/web/src/app/sign-in/[[...sign-in]]/page.tsx
grep -q 'afterSignUpUrl="/play/arrow"' apps/web/src/app/sign-up/[[...sign-up]]/page.tsx
grep -q 'redirect("/play/arrow")' apps/web/src/app/dashboard/page.tsx

if rg -n 'DashboardProviders|RedirectToSignIn|SignedOut' apps/web/src/app/dashboard/layout.tsx; then
  echo "retired dashboard layout must not intercept the Arrow redirect with legacy auth UI" >&2
  exit 1
fi

if rg -n "'/dashboard\\(\\.\\*\\)'" apps/web/src/proxy.ts; then
  echo "dashboard should not be protected by Clerk before its Arrow redirect can run" >&2
  exit 1
fi

if rg -n 'href: "/dashboard"|href: "/docs"|href: "/blog"' apps/web/src/lib/site-config.ts; then
  echo "primary navigation should not link legacy dashboard, docs, or blog surfaces during the Arrow reset" >&2
  exit 1
fi

echo "PASS: Arrow Server product framing"
