export interface ContentItem {
  title: string;
  text?: string;
  steps?: string[];
  code?: string;
  list?: { name: string; desc: string }[];
}

export interface Section {
  title: string;
  id: string;
  content: ContentItem[];
}

export const sections: Section[] = [
  {
    title: "SDK for Any AI",
    id: "sdk",
    content: [
      {
        title: "2 Lines of Code",
        text: "Add persistent memory to any AI system - OpenAI, Claude, Gemini, or local LLMs. The @substratia-io/memory SDK works everywhere.",
        code: `import { remember } from '@substratia-io/memory'
await remember("User prefers dark mode")`,
      },
      {
        title: "Installation",
        code: `npm install @substratia-io/memory`,
      },
      {
        title: "Setup",
        steps: [
          "Get an API key at substratia.io/dashboard",
          "Set environment variable: export SUBSTRATIA_API_KEY=sk_your_key",
          "Import and use remember(), recall(), or forget()",
        ],
      },
      {
        title: "Full API",
        code: `import { remember, recall, forget } from '@substratia-io/memory'

// Store a memory
await remember("User prefers dark mode")

// Search memories
const memories = await recall("preferences")

// Delete a memory
await forget(memoryId)`,
      },
    ],
  },
  {
    title: "Memory Tools",
    id: "memory-tools",
    content: [
      {
        title: "Two Tools, One Ecosystem",
        text: "Substratia provides two complementary memory tools: momentum for short-term context recovery (within a session) and memory-mcp for long-term persistent memory (across sessions). Use both together for complete memory coverage.",
      },
      {
        title: "momentum - Context Recovery",
        list: [
          {
            name: "Purpose",
            desc: "Fast context recovery after /clear commands",
          },
          {
            name: "Install",
            desc: "/plugin install momentum@substratia-marketplace",
          },
          { name: "Requires", desc: "Node.js 18+" },
          { name: "Speed", desc: "Restores 150K tokens in under 5ms" },
          {
            name: "Dashboard",
            desc: "Optional - connect via Dashboard API key",
          },
        ],
      },
      {
        title: "memory-mcp - Persistent Memory",
        list: [
          { name: "Purpose", desc: "Store and recall facts across sessions" },
          { name: "Install", desc: "npx @whenmoon-afk/memory-mcp" },
          { name: "Requires", desc: "Node.js 18+" },
          {
            name: "Search",
            desc: "FTS5 full-text search with relevance scoring",
          },
          {
            name: "Dashboard",
            desc: "Optional - connect via Dashboard API key",
          },
        ],
      },
    ],
  },
  {
    title: "Quick Start",
    id: "quick-start",
    content: [
      {
        title: "What are Agent Config Files?",
        text: "CLAUDE.md and agents.md are configuration files that define how AI agents behave, what they can do, and what they should avoid. You can create these manually or use our prompt tools to help.",
      },
      {
        title: "Your First Agent",
        steps: [
          "Go to the Builder page",
          "Enter your agent name and description",
          'Select capabilities from the library (e.g., "Verify Facts", "Code Review")',
          'Add rulesets to define boundaries (e.g., "Security Rules", "Loop Prevention")',
          "Preview your configuration in real-time",
          "Download or copy your .md file",
        ],
      },
    ],
  },
  {
    title: "Understanding Agent Files",
    id: "agent-files",
    content: [
      {
        title: "CLAUDE.md vs agents.md",
        text: "Both file types serve the same purpose: defining agent behavior. CLAUDE.md is the convention for Claude-based agents, while agents.md is a more generic format.",
      },
      {
        title: "File Structure",
        code: `# Agent Name

## Core Principles
- Capability 1
- Capability 2

## Negative Prompt (Critical Rules)
### NEVER DO
- Rule 1
- Rule 2

## Positive Guidelines
### ALWAYS DO
- Guideline 1
- Guideline 2`,
      },
    ],
  },
  {
    title: "Capabilities",
    id: "capabilities",
    content: [
      {
        title: "What are Capabilities?",
        text: "Capabilities define what your agent can do. They are positive instructions that guide behavior. There are 20+ common capabilities across 5 categories.",
      },
      {
        title: "Categories",
        list: [
          {
            name: "Core",
            desc: "Essential behaviors like fact verification and error handling",
          },
          { name: "Safety", desc: "Security and protection mechanisms" },
          { name: "Behavior", desc: "How the agent communicates and operates" },
          { name: "Tools", desc: "Integration with external tools and APIs" },
          { name: "Domain", desc: "Specialized knowledge areas" },
        ],
      },
    ],
  },
  {
    title: "Rulesets",
    id: "rulesets",
    content: [
      {
        title: "What are Rulesets?",
        text: "Rulesets are collections of rules that define boundaries. They can be positive (ALWAYS DO) or negative (NEVER DO). Negative prompts are especially important for preventing costly mistakes.",
      },
      {
        title: "Built-in Rulesets",
        list: [
          {
            name: "Loop Prevention",
            desc: "Prevents agents from getting stuck in repetitive patterns",
          },
          {
            name: "Security Rules",
            desc: "Protects credentials, data, and system access",
          },
          { name: "Code Safety", desc: "Ensures safe coding practices" },
          {
            name: "Verification",
            desc: "Requires confirmation before destructive actions",
          },
          {
            name: "Communication",
            desc: "Clear and accurate user communication",
          },
          { name: "Git Safety", desc: "Safe version control practices" },
          {
            name: "File Safety",
            desc: "Protection against accidental file operations",
          },
          {
            name: "API Best Practices",
            desc: "Rate limiting and error handling",
          },
          {
            name: "Autonomous Rules",
            desc: "Self-governance for long-running agents",
          },
        ],
      },
    ],
  },
  {
    title: "Best Practices",
    id: "best-practices",
    content: [
      {
        title: "Start Simple",
        text: "Begin with 3-5 core capabilities and 2-3 essential rulesets. Add more as you understand your agent's needs.",
      },
      {
        title: "Test Iteratively",
        text: "Run your agent with the configuration, observe its behavior, and refine. Good agent configs evolve over time.",
      },
      {
        title: "Prioritize Negative Prompts",
        text: "What your agent should NOT do is often more important than what it should do. See our blog post on Mastering Negative Prompts.",
      },
      {
        title: "Be Specific",
        text: 'Vague instructions lead to unpredictable behavior. "Don\'t break things" is worse than "NEVER delete files without explicit user confirmation".',
      },
    ],
  },
  {
    title: "Integration Guides",
    id: "integration-guides",
    content: [
      {
        title: "Claude Desktop Setup",
        text: "Add MCP servers to your Claude Desktop configuration file. Location varies by OS (see Config file locations below).",
        code: `{
  "mcpServers": {
    "memory-mcp": {
      "command": "npx",
      "args": ["@whenmoon-afk/memory-mcp"]
    }
  }
}`,
      },
      {
        title: "Claude Code (momentum)",
        text: "momentum is installed as a Claude Code plugin, not via config file.",
        steps: [
          "Ensure Node.js 18+ is installed",
          "Run: /plugin install momentum@substratia-marketplace",
          "Restart Claude Code",
          "Use save_snapshot and restore_context tools",
        ],
      },
      {
        title: "Cursor / Windsurf",
        text: "MCP configuration for Cursor and Windsurf follows the same pattern as Claude Desktop. Add to your MCP config:",
        code: `{
  "mcpServers": {
    "memory-mcp": {
      "command": "npx",
      "args": ["@whenmoon-afk/memory-mcp"],
      "env": {
        "MEMORY_DB_PATH": "~/Documents/memory-mcp/memory.db"
      }
    }
  }
}`,
      },
      {
        title: "Windows-Specific Setup",
        text: 'Windows requires the full path to npx.cmd. Replace "npx" with the full path:',
        code: `{
  "mcpServers": {
    "memory-mcp": {
      "command": "C:\\\\Program Files\\\\nodejs\\\\npx.cmd",
      "args": ["@whenmoon-afk/memory-mcp"]
    }
  }
}`,
      },
    ],
  },
  {
    title: "Troubleshooting",
    id: "troubleshooting",
    content: [
      {
        title: "Tools not appearing in Claude Desktop",
        text: "Restart Claude Desktop completely (Cmd+Q / Alt+F4, then reopen). Verify your config file is valid JSON (use a validator). Ensure Node.js 18+ is installed for both memory-mcp and momentum.",
      },
      {
        title: '"Connection closed" on Windows',
        text: 'Windows requires either the cmd /c wrapper method OR the full path to npx.cmd. Example: "C:\\\\Program Files\\\\nodejs\\\\npx.cmd" instead of just "npx".',
      },
      {
        title: "Getting stale npm versions",
        text: 'Clear the npm cache with "npm cache clean --force", or use "npx --yes" to force fetching the latest version.',
      },
      {
        title: "memory.db lost after Claude Desktop update",
        text: "The default database location may be inside versioned app folders that get purged on update. Set the MEMORY_DB_PATH environment variable to a stable location like ~/Documents/memory-mcp/memory.db.",
      },
      {
        title: "momentum: Node.js not found",
        text: "momentum requires Node.js 18+. Install from nodejs.org or use nvm. Restart Claude Code after installation.",
      },
      {
        title: "Config file locations",
        list: [
          {
            name: "macOS",
            desc: "~/Library/Application Support/Claude/claude_desktop_config.json",
          },
          {
            name: "Windows",
            desc: "%APPDATA%\\\\Claude\\\\claude_desktop_config.json",
          },
          {
            name: "Linux",
            desc: "~/.config/Claude/claude_desktop_config.json",
          },
        ],
      },
    ],
  },
];
