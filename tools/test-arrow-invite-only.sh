#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "$0")/.."

test -f apps/web/src/lib/arrow-access.ts
grep -q 'ARROW_ALLOWED_EMAILS' apps/web/src/lib/arrow-access.ts
grep -q 'isArrowAllowedEmail' apps/web/src/lib/arrow-access.ts
grep -q 'getArrowAllowedEmails' apps/web/src/lib/arrow-access.ts

grep -q 'isArrowAllowedEmail' apps/web/src/app/play/harborlight/page.tsx
grep -q 'Arrow Server is invite-only' apps/web/src/app/play/harborlight/page.tsx
grep -q 'ARROW_ALLOWED_EMAILS' .env.example

if rg -n 'emie\\.torphy89@gmail\\.com' \
  apps packages tools .env.example apps/web/.env.local.example; then
  echo "owner email must be configured privately, not committed in source" >&2
  exit 1
fi

echo "PASS: Arrow invite-only allowlist wiring"
