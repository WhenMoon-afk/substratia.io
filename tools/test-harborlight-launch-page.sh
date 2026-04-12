#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "$0")/.."

test -f apps/web/src/app/play/harborlight/page.tsx
grep -q 'https://rp.substratia.io' apps/web/src/app/play/harborlight/page.tsx
grep -q '<iframe' apps/web/src/app/play/harborlight/page.tsx
grep -q '/play(.*)' apps/web/src/proxy.ts
grep -q '/play/harborlight' apps/web/src/app/page.tsx
grep -q '/play/harborlight' apps/web/src/app/dashboard/page.tsx
grep -q '/play/harborlight' apps/web/src/lib/site-config.ts
grep -q 'https://rp.substratia.io' apps/web/next.config.js

echo "PASS: Harborlight launch page wiring"
