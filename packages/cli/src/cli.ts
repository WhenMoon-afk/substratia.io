#!/usr/bin/env node

/**
 * Substratia CLI
 * Persistent memory for AI agents
 *
 * Usage:
 *   substratia register "your@email.com"  - Register and get API key
 *   substratia learn "something"          - Store a memory
 *   substratia remember "query"           - Search memories
 *   substratia bridge                     - Full context restore
 *   substratia config                     - Show/set configuration
 */

import { readFileSync, writeFileSync, existsSync, mkdirSync } from "fs";
import { homedir } from "os";
import { join } from "path";

const BASE_URL = "https://agreeable-chameleon-83.convex.site";
const CONFIG_DIR = join(homedir(), ".substratia");
const CONFIG_FILE = join(CONFIG_DIR, "config.json");

// Colors for terminal output
const colors = {
  reset: "\x1b[0m",
  red: "\x1b[31m",
  green: "\x1b[32m",
  yellow: "\x1b[33m",
  cyan: "\x1b[36m",
  dim: "\x1b[2m",
};

interface Config {
  apiKey?: string;
  email?: string;
}

function loadConfig(): Config {
  try {
    if (existsSync(CONFIG_FILE)) {
      return JSON.parse(readFileSync(CONFIG_FILE, "utf-8"));
    }
  } catch {
    // Ignore parse errors
  }
  return {};
}

function saveConfig(config: Config): void {
  if (!existsSync(CONFIG_DIR)) {
    mkdirSync(CONFIG_DIR, { recursive: true });
  }
  writeFileSync(CONFIG_FILE, JSON.stringify(config, null, 2));
}

function getApiKey(): string {
  // Check environment first
  const envKey = process.env.SUBSTRATIA_API_KEY;
  if (envKey) return envKey;

  // Then config file
  const config = loadConfig();
  if (config.apiKey) return config.apiKey;

  console.error(
    `${colors.red}Error: No API key found.${colors.reset}\n\n` +
      `Run: substratia register "your@email.com"\n` +
      `Or set SUBSTRATIA_API_KEY environment variable`,
  );
  process.exit(1);
}

async function request<T>(
  path: string,
  options: RequestInit = {},
  apiKey?: string,
): Promise<T> {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  if (apiKey) {
    headers["Authorization"] = `Bearer ${apiKey}`;
  }

  const response = await fetch(`${BASE_URL}${path}`, {
    ...options,
    headers: { ...headers, ...options.headers },
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.error || `HTTP ${response.status}`);
  }

  return response.json();
}

// =============================================================================
// Commands
// =============================================================================

async function register(email: string): Promise<void> {
  console.log(`\n${colors.cyan}Registering ${email}...${colors.reset}\n`);

  try {
    const result = await request<{ apiKey: string; keyPrefix: string }>(
      "/api/register",
      {
        method: "POST",
        body: JSON.stringify({ email }),
      },
    );

    // Save to config
    saveConfig({ apiKey: result.apiKey, email });

    console.log(`${colors.green}✓ Registration successful!${colors.reset}\n`);
    console.log(`Your API key: ${colors.cyan}${result.apiKey}${colors.reset}`);
    console.log(`${colors.dim}(saved to ${CONFIG_FILE})${colors.reset}\n`);
    console.log(`Quick start:`);
    console.log(`  substratia learn "Something important to remember"`);
    console.log(`  substratia remember "query"`);
    console.log("");
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);

    // Handle "already registered" case
    if (message.includes("already registered")) {
      console.log(
        `${colors.yellow}⚠ Email already registered.${colors.reset}\n`,
      );
      console.log(`If you lost your API key, contact support@substratia.io`);
      console.log(`Or set SUBSTRATIA_API_KEY manually in your environment.\n`);
    } else {
      console.error(`${colors.red}Error: ${message}${colors.reset}`);
    }
    process.exit(1);
  }
}

async function learn(
  content: string,
  options: { importance?: string; tags?: string },
): Promise<void> {
  const apiKey = getApiKey();

  console.log(`\n${colors.cyan}Storing memory...${colors.reset}\n`);

  try {
    const body: Record<string, unknown> = {
      content,
      importance: options.importance || "normal",
      createdAt: Date.now(),
    };

    if (options.tags) {
      body.tags = options.tags.split(",").map((t) => t.trim());
    }

    const result = await request<{ memoryId: string }>(
      "/api/memories/sync",
      {
        method: "POST",
        body: JSON.stringify(body),
      },
      apiKey,
    );

    console.log(`${colors.green}✓ Memory stored${colors.reset}`);
    console.log(`${colors.dim}ID: ${result.memoryId}${colors.reset}\n`);
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error(`${colors.red}Error: ${message}${colors.reset}`);
    process.exit(1);
  }
}

async function remember(
  query: string,
  options: { limit?: string },
): Promise<void> {
  const apiKey = getApiKey();

  console.log(`\n${colors.cyan}Searching memories...${colors.reset}\n`);

  try {
    const params = new URLSearchParams({ q: query });
    if (options.limit) params.set("limit", options.limit);

    const result = await request<{
      memories: Array<{
        content: string;
        importance: string;
        createdAt: number;
      }>;
    }>(`/api/memories/search?${params}`, {}, apiKey);

    if (result.memories.length === 0) {
      console.log(
        `${colors.yellow}No memories found for "${query}"${colors.reset}\n`,
      );
      return;
    }

    console.log(
      `${colors.green}Found ${result.memories.length} memories:${colors.reset}\n`,
    );

    for (const memory of result.memories) {
      const date = new Date(memory.createdAt).toLocaleDateString();
      const importance =
        memory.importance !== "normal" ? ` [${memory.importance}]` : "";
      console.log(`${colors.dim}${date}${importance}${colors.reset}`);
      console.log(`  ${memory.content}\n`);
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error(`${colors.red}Error: ${message}${colors.reset}`);
    process.exit(1);
  }
}

async function bridge(): Promise<void> {
  const apiKey = getApiKey();

  console.log(`\n${colors.cyan}Loading context bridge...${colors.reset}\n`);

  try {
    const result = await request<{
      memories: Array<{ content: string }>;
      identity: { narratives: Array<{ title: string; text: string }> } | null;
      preferences: Record<string, string>;
    }>("/api/bridge", {}, apiKey);

    // Display memories
    if (result.memories.length > 0) {
      console.log(
        `${colors.green}📚 Recent Memories (${result.memories.length}):${colors.reset}\n`,
      );
      for (const memory of result.memories.slice(0, 5)) {
        console.log(`  • ${memory.content}`);
      }
      if (result.memories.length > 5) {
        console.log(
          `  ${colors.dim}... and ${result.memories.length - 5} more${colors.reset}`,
        );
      }
      console.log("");
    }

    // Display identity
    if (result.identity?.narratives?.length) {
      console.log(`${colors.green}🧠 Identity Narratives:${colors.reset}\n`);
      for (const narrative of result.identity.narratives) {
        console.log(`  ${colors.cyan}${narrative.title}${colors.reset}`);
        console.log(`  ${narrative.text}\n`);
      }
    }

    // Display preferences
    const prefKeys = Object.keys(result.preferences);
    if (prefKeys.length > 0) {
      console.log(`${colors.green}⚙️ Preferences:${colors.reset}\n`);
      for (const key of prefKeys) {
        console.log(`  ${key}: ${result.preferences[key]}`);
      }
      console.log("");
    }

    if (
      result.memories.length === 0 &&
      !result.identity?.narratives?.length &&
      prefKeys.length === 0
    ) {
      console.log(
        `${colors.yellow}No context data yet. Start with:${colors.reset}`,
      );
      console.log(`  substratia learn "Something important"\n`);
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error(`${colors.red}Error: ${message}${colors.reset}`);
    process.exit(1);
  }
}

function showConfig(): void {
  const config = loadConfig();
  const envKey = process.env.SUBSTRATIA_API_KEY;

  console.log(`\n${colors.cyan}Substratia Configuration${colors.reset}\n`);

  console.log(`Config file: ${CONFIG_FILE}`);
  console.log(
    `API Key (config): ${config.apiKey ? `${config.apiKey.slice(0, 12)}...` : "(not set)"}`,
  );
  console.log(
    `API Key (env): ${envKey ? `${envKey.slice(0, 12)}...` : "(not set)"}`,
  );
  console.log(`Email: ${config.email || "(not set)"}`);
  console.log(`API URL: ${BASE_URL}`);
  console.log("");
}

function showHelp(): void {
  console.log(`
${colors.cyan}Substratia CLI${colors.reset} - Persistent memory for AI agents

${colors.green}Usage:${colors.reset}
  substratia <command> [options]

${colors.green}Commands:${colors.reset}
  register <email>     Register and get your API key
  learn <content>      Store a new memory
    --importance       Importance level: critical, high, normal, low
    --tags             Comma-separated tags
  remember <query>     Search your memories
    --limit            Max results to return (default: 10)
  bridge               Full context restore (memories + identity)
  config               Show configuration
  help                 Show this help message

${colors.green}Examples:${colors.reset}
  substratia register "you@example.com"
  substratia learn "User prefers dark mode" --importance high
  substratia remember "user preferences"
  substratia bridge

${colors.green}Environment:${colors.reset}
  SUBSTRATIA_API_KEY   Override config file API key

${colors.dim}Documentation: https://substratia.io/docs${colors.reset}
`);
}

// =============================================================================
// Main
// =============================================================================

async function main(): Promise<void> {
  const args = process.argv.slice(2);
  const command = args[0];

  // Parse flags
  const flags: Record<string, string> = {};
  const positional: string[] = [];

  for (let i = 1; i < args.length; i++) {
    const arg = args[i];
    if (arg.startsWith("--")) {
      const key = arg.slice(2);
      const value = args[i + 1];
      if (value && !value.startsWith("--")) {
        flags[key] = value;
        i++;
      } else {
        flags[key] = "true";
      }
    } else {
      positional.push(arg);
    }
  }

  switch (command) {
    case "register":
      if (!positional[0]) {
        console.error(`${colors.red}Error: Email required${colors.reset}`);
        console.error(`Usage: substratia register "your@email.com"`);
        process.exit(1);
      }
      await register(positional[0]);
      break;

    case "learn":
      if (!positional[0]) {
        console.error(`${colors.red}Error: Content required${colors.reset}`);
        console.error(`Usage: substratia learn "something to remember"`);
        process.exit(1);
      }
      await learn(positional[0], {
        importance: flags.importance,
        tags: flags.tags,
      });
      break;

    case "remember":
      if (!positional[0]) {
        console.error(`${colors.red}Error: Query required${colors.reset}`);
        console.error(`Usage: substratia remember "search query"`);
        process.exit(1);
      }
      await remember(positional[0], { limit: flags.limit });
      break;

    case "bridge":
      await bridge();
      break;

    case "config":
      showConfig();
      break;

    case "help":
    case "--help":
    case "-h":
    case undefined:
      showHelp();
      break;

    default:
      console.error(`${colors.red}Unknown command: ${command}${colors.reset}`);
      showHelp();
      process.exit(1);
  }
}

main().catch((error) => {
  console.error(`${colors.red}Fatal error: ${error.message}${colors.reset}`);
  process.exit(1);
});
