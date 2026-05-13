#!/usr/bin/env bash
# Quick website validation without full Playwright
# Use this for fast checks; use validate-website.ts for comprehensive testing
#
# Usage: ./tools/quick-validate.sh [URL]

set -euo pipefail

BASE_URL="${1:-http://localhost:3000}"
PAGES=("/" "/start-here" "/tools" "/docs" "/safety")
ERRORS=0

echo "Quick Website Validation"
echo "========================"
echo "URL: $BASE_URL"
echo ""

# Check if server is running
if ! curl -s --head "$BASE_URL" >/dev/null 2>&1; then
  echo "❌ Server not responding at $BASE_URL"
  echo "   Start with: bun run dev:web"
  exit 1
fi

echo "✅ Server is responding"
echo ""

# Check each page returns 200
echo "Checking pages..."
for page in "${PAGES[@]}"; do
  status=$(curl -s -o /dev/null -w "%{http_code}" "${BASE_URL}${page}")
  if [[ "$status" == "200" ]]; then
    echo "  ✅ $page ($status)"
  else
    echo "  ❌ $page ($status)"
    ((ERRORS++)) || true
  fi
done

echo ""

# Check critical resources
echo "Checking resources..."
RESOURCES=(
  "/brand/logo-icon.png"
  "/brand/wordmark.png"
  "/brand/hero.png"
  "/brand/social.png"
)

for resource in "${RESOURCES[@]}"; do
  status=$(curl -s -o /dev/null -w "%{http_code}" "${BASE_URL}${resource}")
  if [[ "$status" == "200" ]]; then
    echo "  ✅ $resource"
  else
    echo "  ❌ $resource ($status)"
    ((ERRORS++)) || true
  fi
done

echo ""

# Check external API connectivity (CSP issues would block these)
echo "Checking external APIs (CSP test)..."
# Note: This tests the APIs directly, not through the site
# The validate-website.ts script with Playwright tests actual CSP behavior

APIS=(
  "https://api.github.com/repos/WhenMoon-afk/claude-memory-mcp"
  "https://api.npmjs.org/downloads/point/last-month/@anthropic-ai/claude-code"
)

for api in "${APIS[@]}"; do
  status=$(curl -s -o /dev/null -w "%{http_code}" "$api" 2>/dev/null || echo "000")
  if [[ "$status" == "200" ]]; then
    echo "  ✅ API reachable: ${api:0:50}..."
  else
    echo "  ⚠️ API status $status: ${api:0:50}..."
  fi
done

echo ""
echo "========================"

if [[ $ERRORS -gt 0 ]]; then
  echo "❌ $ERRORS error(s) found"
  exit 1
else
  echo "✅ All quick checks passed"
  echo ""
  echo "For comprehensive testing with console error detection:"
  echo "  npx tsx tools/validate-website.ts"
fi
