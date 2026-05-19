import { readFileSync } from "node:fs";
import test from "node:test";
import assert from "node:assert/strict";

const read = (path) =>
  readFileSync(new URL(`../${path}`, import.meta.url), "utf8");

test("CLI output does not disclose API key material", () => {
  const cli = read("packages/memory/src/cli/cli.ts");
  const cloudTest = read("tools/test-cloud-api.ts");

  assert.doesNotMatch(cli, /console\.log\([^)]*result\.apiKey/s);
  assert.doesNotMatch(cli, /console\.log\([^)]*config\.apiKey/s);
  assert.doesNotMatch(cli, /console\.log\([^)]*envKey/s);
  assert.doesNotMatch(cloudTest, /console\.log\([^)]*apiKey\.slice/s);
  assert.doesNotMatch(cloudTest, /console\.log\([^)]*\$\{apiKey\}/s);
});

test("dashboard server keeps internals out of HTTP 500 responses", () => {
  const server = read("packages/memory/src/dashboard/server.ts");

  assert.doesNotMatch(server, /error\(res,\s*500,\s*message\)/);
});

test("dashboard browser launcher does not build shell commands with URLs", () => {
  const server = read("packages/memory/src/dashboard/server.ts");

  assert.doesNotMatch(server, /cmd\s*=\s*`/);
  assert.doesNotMatch(server, /exec\(cmd/);
});

test("dashboard API does not allow browser cross-origin reads or writes", () => {
  const server = read("packages/memory/src/dashboard/server.ts");

  assert.doesNotMatch(server, /"Access-Control-Allow-Origin":\s*"\*"/);
  assert.doesNotMatch(server, /"Access-Control-Allow-Methods":\s*"GET, DELETE, OPTIONS"/);
  assert.match(server, /function rejectCrossOriginRequest/);
});

test("public registration does not bind API keys to supplied email identities", () => {
  const http = read("packages/convex/convex/http.ts");
  const users = read("packages/convex/convex/users.ts");

  assert.doesNotMatch(http, /internal\.users\.createByEmail/);
  assert.doesNotMatch(http, /keyPrefix:\s*existingKeys\[0\]\.keyPrefix/);
  assert.match(http, /internal\.users\.createApiRegistrationUser/);
  assert.match(users, /createApiRegistrationUser/);

  const registrationUserMutation = users.match(
    /export const createApiRegistrationUser = internalMutation\(\{[\s\S]*?\n\}\);/,
  )?.[0];
  assert.ok(registrationUserMutation);
  assert.doesNotMatch(registrationUserMutation, /withIndex\("by_email"/);
});
