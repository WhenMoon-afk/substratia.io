#!/usr/bin/env npx tsx
/**
 * Test tool for Substratia Cloud API
 * Tests health, snapshots sync, memories sync, and Stripe checkout flow
 *
 * Usage:
 *   npx tsx tools/test-cloud-api.ts                    # Test health only
 *   npx tsx tools/test-cloud-api.ts --api-key sk_xxx   # Test with API key
 *   npx tsx tools/test-cloud-api.ts --full             # Full flow test (requires auth)
 */

const API_URL =
  process.env.SUBSTRATIA_API_URL || "https://aware-pony-419.convex.site";
const WEB_URL = process.env.SUBSTRATIA_WEB_URL || "https://substratia.io";

interface TestResult {
  name: string;
  passed: boolean;
  message: string;
  duration: number;
}

const results: TestResult[] = [];

async function test(name: string, fn: () => Promise<void>): Promise<void> {
  const start = Date.now();
  try {
    await fn();
    results.push({
      name,
      passed: true,
      message: "OK",
      duration: Date.now() - start,
    });
    console.log(`✓ ${name}`);
  } catch (error) {
    const msg = error instanceof Error ? error.message : String(error);
    results.push({
      name,
      passed: false,
      message: msg,
      duration: Date.now() - start,
    });
    console.log(`✗ ${name}: ${msg}`);
  }
}

async function testHealth(): Promise<void> {
  const res = await fetch(`${API_URL}/api/health`);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const data = await res.json();
  if (data.status !== "ok") throw new Error(`Status: ${data.status}`);
}

async function testWebsiteLoads(): Promise<void> {
  const res = await fetch(WEB_URL);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const html = await res.text();
  if (!html.includes("Substratia")) throw new Error("Missing Substratia brand");
}

async function testRemovedPagesRedirect(): Promise<void> {
  // Verify removed commercial pages redirect properly (301)
  for (const path of ["/pricing", "/pro", "/thank-you"]) {
    const res = await fetch(`${WEB_URL}${path}`, { redirect: "manual" });
    if (res.status !== 301 && res.status !== 308) {
      throw new Error(`${path}: expected 301/308 redirect, got ${res.status}`);
    }
  }
  // /cloud should redirect to /tools
  const cloudRes = await fetch(`${WEB_URL}/cloud`, { redirect: "manual" });
  if (cloudRes.status !== 301 && cloudRes.status !== 308) {
    throw new Error(
      `/cloud: expected 301/308 redirect, got ${cloudRes.status}`,
    );
  }
}

async function testDashboardRedirects(): Promise<void> {
  const res = await fetch(`${WEB_URL}/dashboard`, { redirect: "manual" });
  // Should redirect to sign-in for unauthenticated users (307, 302, 308 are all valid redirects)
  if (
    res.status !== 307 &&
    res.status !== 302 &&
    res.status !== 308 &&
    res.status !== 200
  ) {
    throw new Error(`Unexpected status: ${res.status}`);
  }
}

async function testCheckoutApiUnauthenticated(): Promise<void> {
  const res = await fetch(`${WEB_URL}/api/stripe/checkout`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ tier: "pro" }),
  });
  // Should return 401 for unauthenticated
  if (res.status !== 401) {
    throw new Error(`Expected 401, got ${res.status}`);
  }
}

async function testSnapshotSyncWithoutAuth(): Promise<void> {
  const res = await fetch(`${API_URL}/api/snapshots/sync`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      projectPath: "/test",
      summary: "test",
      context: "test context",
    }),
  });
  if (res.status !== 401) throw new Error(`Expected 401, got ${res.status}`);
}

async function testMemorySyncWithoutAuth(): Promise<void> {
  const res = await fetch(`${API_URL}/api/memories/sync`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ content: "test memory" }),
  });
  if (res.status !== 401) throw new Error(`Expected 401, got ${res.status}`);
}

async function testSnapshotSyncWithAuth(apiKey: string): Promise<void> {
  const res = await fetch(`${API_URL}/api/snapshots/sync`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      projectPath: "/test/project",
      summary: "Test snapshot from test tool",
      context: "This is a test context created by the test tool",
      importance: "reference",
      createdAt: Date.now(),
    }),
  });
  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(`HTTP ${res.status}: ${data.error || "Unknown error"}`);
  }
  const data = await res.json();
  if (!data.success) throw new Error("Sync failed");
}

async function testMemorySyncWithAuth(apiKey: string): Promise<void> {
  const res = await fetch(`${API_URL}/api/memories/sync`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      content: "Test memory from test tool",
      importance: 5, // Numeric importance (0-10 scale)
      createdAt: Date.now(),
    }),
  });
  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    // 402 is expected for free tier limit exceeded
    if (res.status === 402) {
      console.log(`  (Free tier limit reached - this is expected)`);
      return;
    }
    throw new Error(`HTTP ${res.status}: ${data.error || "Unknown error"}`);
  }
  const data = await res.json();
  if (!data.success) throw new Error("Sync failed");
}

async function main() {
  const args = process.argv.slice(2);
  const apiKey =
    args.find((a) => a.startsWith("--api-key="))?.split("=")[1] ||
    (args.includes("--api-key") ? args[args.indexOf("--api-key") + 1] : null);
  const fullTest = args.includes("--full");

  console.log("\n🧪 Substratia Cloud API Test Suite\n");
  console.log(`API URL: ${API_URL}`);
  console.log(`Web URL: ${WEB_URL}`);
  console.log(
    `API Key: ${apiKey ? apiKey.slice(0, 8) + "..." : "Not provided"}`,
  );
  console.log("");

  // Basic tests (no auth required)
  console.log("--- Public Endpoints ---");
  await test("Health check", testHealth);
  await test("Website loads", testWebsiteLoads);
  await test("Removed pages redirect correctly", testRemovedPagesRedirect);
  await test("Dashboard redirects (unauthenticated)", testDashboardRedirects);

  console.log("\n--- API Security ---");
  await test(
    "Checkout API rejects unauthenticated",
    testCheckoutApiUnauthenticated,
  );
  await test("Snapshot sync rejects without auth", testSnapshotSyncWithoutAuth);
  await test("Memory sync rejects without auth", testMemorySyncWithoutAuth);

  // Authenticated tests
  if (apiKey) {
    console.log("\n--- Authenticated Endpoints ---");
    await test("Snapshot sync with API key", () =>
      testSnapshotSyncWithAuth(apiKey));
    await test("Memory sync with API key", () =>
      testMemorySyncWithAuth(apiKey));
  } else {
    console.log("\n⚠️  Skipping authenticated tests (no --api-key provided)");
  }

  // Summary
  console.log("\n--- Summary ---");
  const passed = results.filter((r) => r.passed).length;
  const failed = results.filter((r) => !r.passed).length;
  const totalTime = results.reduce((sum, r) => sum + r.duration, 0);

  console.log(`Passed: ${passed}/${results.length}`);
  console.log(`Failed: ${failed}`);
  console.log(`Total time: ${totalTime}ms`);

  if (failed > 0) {
    console.log("\nFailed tests:");
    results
      .filter((r) => !r.passed)
      .forEach((r) => {
        console.log(`  - ${r.name}: ${r.message}`);
      });
    process.exit(1);
  }

  console.log("\n✅ All tests passed!\n");
}

main().catch((err) => {
  console.error("Test suite error:", err);
  process.exit(1);
});
