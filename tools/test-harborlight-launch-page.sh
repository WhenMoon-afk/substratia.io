#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "$0")/.."

test -f apps/web/src/app/play/arrow/page.tsx
test -f apps/web/src/app/play/harborlight/page.tsx
grep -q 'https://rp.substratia.io' apps/web/src/app/play/arrow/page.tsx
grep -q '<iframe' apps/web/src/app/play/arrow/page.tsx
grep -q 'redirect("/play/arrow")' apps/web/src/app/play/harborlight/page.tsx
grep -q '/play(.*)' apps/web/src/proxy.ts
grep -q '/play/arrow' apps/web/src/app/page.tsx
grep -q '/play/arrow' apps/web/src/app/dashboard/page.tsx
grep -q '/play/arrow' apps/web/src/lib/site-config.ts
grep -q 'https://rp.substratia.io' apps/web/next.config.js

if rg -n '/play/harborlight' apps/web/src/app/page.tsx apps/web/src/app/dashboard/page.tsx apps/web/src/lib/site-config.ts; then
  echo "player-facing links must use /play/arrow, not the legacy compatibility route" >&2
  exit 1
fi

echo "PASS: Arrow launch page wiring through /play/arrow route"
