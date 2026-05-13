#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "$0")/.."

test -f apps/web/src/lib/arrow-launch-token.ts
grep -q 'ARROW_LAUNCH_SECRET' apps/web/src/lib/arrow-launch-token.ts
grep -q 'createHmac' apps/web/src/lib/arrow-launch-token.ts
grep -q 'randomBytes' apps/web/src/lib/arrow-launch-token.ts
grep -q 'LAUNCH_TOKEN_PREFIX = "arrow-launch"' apps/web/src/lib/arrow-launch-token.ts
grep -q 'LAUNCH_TOKEN_VERSION = "v1"' apps/web/src/lib/arrow-launch-token.ts
grep -q 'DEFAULT_TTL_SECONDS = 900' apps/web/src/lib/arrow-launch-token.ts
grep -q 'digest("base64url")' apps/web/src/lib/arrow-launch-token.ts

grep -q 'mintArrowLaunchToken' apps/web/src/app/play/arrow/page.tsx
grep -q 'buildArrowGameUrl' apps/web/src/app/play/arrow/page.tsx
grep -q '#launch=' apps/web/src/lib/arrow-launch-token.ts
grep -q 'encodeURIComponent(launchToken)' apps/web/src/lib/arrow-launch-token.ts
grep -q 'ARROW_LAUNCH_SECRET' .env.example

if rg -n 'temporary invite token|Use only the token shared|RP_ENGINE_TOKEN|emie\\.torphy89@gmail\\.com' \
  apps/web/src/app/play/arrow/page.tsx apps/web/src/lib/arrow-launch-token.ts .env.example; then
  echo "Arrow launch bridge must not surface raw invite-token instructions, reusable engine tokens, or owner email in source" >&2
  exit 1
fi

expected='arrow-launch:v1:1800000120:nonce-123:8tG6UQopTAJWJwkezbHVaBKgF6X1DmzogDNI288WyPM'
actual=$(bun -e "import { mintArrowLaunchToken } from './apps/web/src/lib/arrow-launch-token.ts'; process.stdout.write(mintArrowLaunchToken({ secret: 'test-launch-secret', nonce: 'nonce-123', now: new Date(1800000000000), ttlSeconds: 120 }) || '');")
test "$actual" = "$expected"

echo "PASS: Arrow launch token bridge wiring"
