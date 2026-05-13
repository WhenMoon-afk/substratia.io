// Cheat sheet structured data - extracted from tools/cheat-sheet/page.tsx
// Content strings for copy-to-clipboard, plus structured arrays for rendering

export interface Command {
  cmd: string
  desc: string
}

export interface Shortcut {
  keys: string
  desc: string
}

export interface TipData {
  emoji: string
  title: string
  text: string
}

export interface CommandGroup {
  title: string
  colorClass: string
  commands: Command[]
}

export interface ShortcutGroup {
  title: string
  colorClass: string
  shortcuts: Shortcut[]
}

export interface ClaudeMdPattern {
  title: string
  code: string
}

export interface PromptPattern {
  title: string
  prompt: string
}

export interface McpServer {
  name: string
  desc: string
}

export interface McpConfigLocation {
  platform: string
  path: string
}

// ── Slash Commands ──────────────────────────────────────────────

export const commandGroups: CommandGroup[] = [
  {
    title: 'Navigation & Control',
    colorClass: 'text-forge-purple',
    commands: [
      { cmd: '/help', desc: 'Show all available commands' },
      { cmd: '/clear', desc: 'Clear conversation context' },
      { cmd: '/compact', desc: 'Summarize and compress context' },
      { cmd: '/cost', desc: 'Show session token usage and cost' },
      { cmd: '/quit', desc: 'Exit Claude Code' },
    ],
  },
  {
    title: 'Context Management',
    colorClass: 'text-forge-purple',
    commands: [
      { cmd: '/init', desc: 'Initialize CLAUDE.md in project' },
      { cmd: '/memory', desc: 'View/manage persistent memory' },
      { cmd: '/context', desc: 'Show current context window' },
      { cmd: '/add-dir <path>', desc: 'Add directory to context' },
      { cmd: '/review', desc: 'Review changes before commit' },
    ],
  },
  {
    title: 'Thinking Modes',
    colorClass: 'text-forge-purple',
    commands: [
      { cmd: '/think', desc: 'Enable extended thinking' },
      { cmd: '/ultrathink', desc: 'Maximum reasoning depth' },
      { cmd: '/thinkhard', desc: 'Deep analysis mode' },
    ],
  },
  {
    title: 'Session & History',
    colorClass: 'text-forge-purple',
    commands: [
      { cmd: '/resume', desc: 'Resume previous session' },
      { cmd: '/history', desc: 'Show command history' },
      { cmd: '/undo', desc: 'Undo last file change' },
      { cmd: '/diff', desc: 'Show uncommitted changes' },
    ],
  },
]

// ── Keyboard Shortcuts ──────────────────────────────────────────

export const shortcutGroups: ShortcutGroup[] = [
  {
    title: 'Essential',
    colorClass: 'text-forge-cyan',
    shortcuts: [
      { keys: 'Ctrl+C', desc: 'Interrupt current operation' },
      { keys: 'Ctrl+D', desc: 'Exit Claude Code' },
      { keys: 'Tab', desc: 'Autocomplete commands' },
      { keys: 'Up/Down', desc: 'Navigate command history' },
    ],
  },
  {
    title: 'Input',
    colorClass: 'text-forge-cyan',
    shortcuts: [
      { keys: 'Shift+Enter', desc: 'Multi-line input' },
      { keys: 'Ctrl+L', desc: 'Clear terminal' },
      { keys: 'Ctrl+R', desc: 'Search history' },
      { keys: 'Esc', desc: 'Cancel current input' },
    ],
  },
  {
    title: 'Navigation',
    colorClass: 'text-forge-cyan',
    shortcuts: [
      { keys: 'Ctrl+A', desc: 'Move to line start' },
      { keys: 'Ctrl+E', desc: 'Move to line end' },
      { keys: 'Ctrl+W', desc: 'Delete word backward' },
      { keys: 'Ctrl+U', desc: 'Clear line' },
    ],
  },
]

// ── CLAUDE.md Patterns ──────────────────────────────────────────

export const claudeMdPatterns: ClaudeMdPattern[] = [
  {
    title: 'Project Context Block',
    code: `# Project Overview
This is a Next.js 14 app with App Router.
Stack: TypeScript, Tailwind CSS, Prisma, PostgreSQL

# Key Directories
- /src/app - Page routes
- /src/components - React components
- /src/lib - Utilities and helpers
- /prisma - Database schema`,
  },
  {
    title: 'Coding Standards Block',
    code: `# Coding Standards
- Use 'use client' only when needed
- Prefer server components by default
- Use Zod for validation
- Error handling: try/catch with proper logging
- Tests: Vitest for unit, Playwright for e2e`,
  },
  {
    title: 'Negative Prompt Block (Critical)',
    code: `# Do NOT
- Do not add comments to unchanged code
- Do not refactor code not related to the task
- Do not add features beyond what's requested
- Do not use console.log for production code
- Do not commit without running tests`,
  },
  {
    title: 'Workflow Instructions Block',
    code: `# Workflow
1. Read the file before editing
2. Make minimal changes to achieve the goal
3. Run tests after changes: npm test
4. Format with: npm run format
5. If tests fail, fix before continuing`,
  },
]

// ── Prompt Patterns ─────────────────────────────────────────────

export const promptPatterns: PromptPattern[] = [
  {
    title: 'Autonomous Loop',
    prompt: `Work autonomously until complete.
After each step, verify the result.
If something fails, debug and retry.
Only stop when fully working.`,
  },
  {
    title: 'Parallel Exploration',
    prompt: `Search for [X] in parallel:
1. Check files matching *.ts
2. Search for "keyword" in /src
3. Look at recent git commits
Report all findings together.`,
  },
  {
    title: 'Structured Output',
    prompt: `Analyze this code and respond with:
## Issues Found
## Suggested Fixes
## Code Changes
## Verification Steps`,
  },
  {
    title: 'Context Preservation',
    prompt: `Before we continue, summarize:
1. What we've accomplished
2. Current blockers
3. Next steps planned
Save this to CLAUDE.md under ## Session Notes`,
  },
]

// ── MCP Configuration ───────────────────────────────────────────

export const mcpExampleConfig = `{
  "mcpServers": {
    "memory": {
      "command": "npx",
      "args": ["@whenmoon-afk/memory-mcp"]
    },
    "filesystem": {
      "command": "npx",
      "args": ["@modelcontextprotocol/server-filesystem", "/path/to/allowed"]
    },
    "github": {
      "command": "npx",
      "args": ["@modelcontextprotocol/server-github"],
      "env": {
        "GITHUB_TOKEN": "your-token-here"
      }
    }
  }
}`

export const mcpServers: McpServer[] = [
  { name: 'memory-mcp', desc: 'Persistent memory' },
  { name: 'momentum', desc: 'Context recovery' },
  { name: 'server-filesystem', desc: 'File access' },
  { name: 'server-github', desc: 'GitHub integration' },
  { name: 'server-postgres', desc: 'Database queries' },
  { name: 'server-puppeteer', desc: 'Browser automation' },
]

export const mcpConfigLocations: McpConfigLocation[] = [
  { platform: 'macOS', path: '~/Library/Application Support/Claude/' },
  { platform: 'Windows', path: '%APPDATA%\\Claude\\' },
  { platform: 'Linux', path: '~/.config/Claude/' },
]

// ── Pro Tips ────────────────────────────────────────────────────

export const tips: TipData[] = [
  {
    emoji: '\uD83C\uDFAF',
    title: 'Be Specific',
    text: '"Fix the bug" \u2192 "Fix the null pointer in handleSubmit at line 42 of UserForm.tsx"',
  },
  {
    emoji: '\uD83D\uDCC1',
    title: 'Reference Files',
    text: 'Start prompts with file paths: "In src/lib/auth.ts, update the token validation..."',
  },
  {
    emoji: '\uD83D\uDD04',
    title: 'Iterative Refinement',
    text: "Don't try to do everything at once. Small, focused changes are more reliable.",
  },
  {
    emoji: '\uD83E\uDDEA',
    title: 'Test After Changes',
    text: 'Always ask Claude to run tests after making changes. Catch issues immediately.',
  },
  {
    emoji: '\uD83D\uDCDD',
    title: 'Use CLAUDE.md',
    text: 'Invest 10 minutes in a good CLAUDE.md. It saves hours of re-explaining context.',
  },
  {
    emoji: '\u26A1',
    title: 'Thinking Modes',
    text: 'Use /ultrathink for complex architecture decisions. Normal mode for simple tasks.',
  },
  {
    emoji: '\uD83D\uDED1',
    title: 'Negative Prompts',
    text: 'Tell Claude what NOT to do. "Do not modify files outside /src/components"',
  },
  {
    emoji: '\uD83D\uDCBE',
    title: 'Save Context',
    text: 'Before /clear, ask Claude to summarize the session to CLAUDE.md.',
  },
]

// ── Plain-text content strings (for copy-to-clipboard & markdown download) ──

export const slashCommandsContent = commandGroups
  .flatMap((g) => g.commands)
  .map((c) => `${c.cmd} - ${c.desc}`)
  .join('\n')

export const shortcutsContent = shortcutGroups
  .flatMap((g) => g.shortcuts)
  .map((s) => `${s.keys} - ${s.desc}`)
  .join('\n')

export const claudeMdContent = `# Project Overview
This is a [framework] app with [key features].
Stack: [technologies]

# Key Directories
- /src/app - Page routes
- /src/components - React components
- /src/lib - Utilities and helpers

# Coding Standards
- Use 'use client' only when needed
- Prefer server components by default
- Use Zod for validation
- Error handling with proper logging

# Do NOT
- Do not add comments to unchanged code
- Do not refactor unrelated code
- Do not add features beyond request
- Do not commit without running tests

# Workflow
1. Read file before editing
2. Make minimal changes
3. Run tests after changes
4. Format code
5. Fix failures before continuing`

export const promptsContent = promptPatterns
  .map((p) => `${p.title}:\n"${p.prompt}"`)
  .join('\n\n')

export const mcpContent = `~/.claude/claude_desktop_config.json:
${mcpExampleConfig}

Popular Servers: ${mcpServers.map((s) => s.name).join(', ')}

Config Locations:
${mcpConfigLocations.map((l) => `${l.platform}: ${l.path}`).join('\n')}`

export const tipsContent = tips.map((t) => `${t.emoji} ${t.title}: ${t.text}`).join('\n')
