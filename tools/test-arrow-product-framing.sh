#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "$0")/.."

player_facing_files=(
  apps/web/src/app/page.tsx
  apps/web/src/app/dashboard/page.tsx
  apps/web/src/app/play/harborlight/page.tsx
  apps/web/src/lib/site-config.ts
)

for file in "${player_facing_files[@]}"; do
  grep -q 'Arrow Server' "$file"
done

if rg -n 'Harborlight|test world|live RP engine demo|front door for.*RP-engine' "${player_facing_files[@]}"; then
  echo "player-facing Arrow surfaces must not use stale Harborlight/test-world/engine-demo framing" >&2
  exit 1
fi

echo "PASS: Arrow Server product framing"
