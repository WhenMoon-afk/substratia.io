'use client'

import { useState, useCallback, useEffect } from 'react'
import Link from 'next/link'
import ShareButton from '@/components/ShareButton'

interface ContentItem {
  title: string
  text?: string
  steps?: string[]
  code?: string
  list?: { name: string; desc: string }[]
}

interface Section {
  title: string
  id: string
  content: ContentItem[]
}

const sections: Section[] = [
  {
    title: 'Memory Tools',
    id: 'memory-tools',
    content: [
      {
        title: 'Two Tools, One Ecosystem',
        text: 'Substratia provides two complementary memory tools: momentum for short-term context recovery (within a session) and memory-mcp for long-term persistent memory (across sessions). Use both together for complete memory coverage.',
      },
      {
        title: 'momentum - Context Recovery',
        list: [
          { name: 'Purpose', desc: 'Fast context recovery after /clear commands' },
          { name: 'Install', desc: '/plugin install momentum@substratia-marketplace' },
          { name: 'Requires', desc: 'Bun runtime v1.0.0+' },
          { name: 'Speed', desc: 'Restores 150K tokens in under 5ms' },
        ],
      },
      {
        title: 'memory-mcp - Persistent Memory',
        list: [
          { name: 'Purpose', desc: 'Store and recall facts across sessions' },
          { name: 'Install', desc: 'npx @whenmoon-afk/memory-mcp' },
          { name: 'Requires', desc: 'Node.js 18+' },
          { name: 'Search', desc: 'FTS5 full-text search with relevance scoring' },
        ],
      },
    ],
  },
  {
    title: 'Quick Start',
    id: 'quick-start',
    content: [
      {
        title: 'What is AgentForge?',
        text: 'AgentForge is a visual builder for creating AI agent configuration files (CLAUDE.md and agents.md). These files define how AI agents behave, what they can do, and what they should avoid.',
      },
      {
        title: 'Your First Agent',
        steps: [
          'Go to the Builder page',
          'Enter your agent name and description',
          'Select capabilities from the library (e.g., "Verify Facts", "Code Review")',
          'Add rulesets to define boundaries (e.g., "Security Rules", "Loop Prevention")',
          'Preview your configuration in real-time',
          'Download or copy your .md file',
        ],
      },
    ],
  },
  {
    title: 'Understanding Agent Files',
    id: 'agent-files',
    content: [
      {
        title: 'CLAUDE.md vs agents.md',
        text: 'Both file types serve the same purpose: defining agent behavior. CLAUDE.md is the convention for Claude-based agents, while agents.md is a more generic format. AgentForge supports both.',
      },
      {
        title: 'File Structure',
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
    title: 'Capabilities',
    id: 'capabilities',
    content: [
      {
        title: 'What are Capabilities?',
        text: 'Capabilities define what your agent can do. They are positive instructions that guide behavior. AgentForge includes 20+ built-in capabilities across 5 categories.',
      },
      {
        title: 'Categories',
        list: [
          { name: 'Core', desc: 'Essential behaviors like fact verification and error handling' },
          { name: 'Safety', desc: 'Security and protection mechanisms' },
          { name: 'Behavior', desc: 'How the agent communicates and operates' },
          { name: 'Tools', desc: 'Integration with external tools and APIs' },
          { name: 'Domain', desc: 'Specialized knowledge areas' },
        ],
      },
    ],
  },
  {
    title: 'Rulesets',
    id: 'rulesets',
    content: [
      {
        title: 'What are Rulesets?',
        text: 'Rulesets are collections of rules that define boundaries. They can be positive (ALWAYS DO) or negative (NEVER DO). Negative prompts are especially important for preventing costly mistakes.',
      },
      {
        title: 'Built-in Rulesets',
        list: [
          { name: 'Loop Prevention', desc: 'Prevents agents from getting stuck in repetitive patterns' },
          { name: 'Security Rules', desc: 'Protects credentials, data, and system access' },
          { name: 'Code Safety', desc: 'Ensures safe coding practices' },
          { name: 'Verification', desc: 'Requires confirmation before destructive actions' },
          { name: 'Communication', desc: 'Clear and accurate user communication' },
          { name: 'Git Safety', desc: 'Safe version control practices' },
          { name: 'File Safety', desc: 'Protection against accidental file operations' },
          { name: 'API Best Practices', desc: 'Rate limiting and error handling' },
          { name: 'Autonomous Rules', desc: 'Self-governance for long-running agents' },
        ],
      },
    ],
  },
  {
    title: 'Best Practices',
    id: 'best-practices',
    content: [
      {
        title: 'Start Simple',
        text: 'Begin with 3-5 core capabilities and 2-3 essential rulesets. Add more as you understand your agent\'s needs.',
      },
      {
        title: 'Test Iteratively',
        text: 'Run your agent with the configuration, observe its behavior, and refine. Good agent configs evolve over time.',
      },
      {
        title: 'Prioritize Negative Prompts',
        text: 'What your agent should NOT do is often more important than what it should do. See our blog post on Mastering Negative Prompts.',
      },
      {
        title: 'Be Specific',
        text: 'Vague instructions lead to unpredictable behavior. "Don\'t break things" is worse than "NEVER delete files without explicit user confirmation".',
      },
    ],
  },
  {
    title: 'Integration Guides',
    id: 'integration-guides',
    content: [
      {
        title: 'Claude Desktop Setup',
        text: 'Add MCP servers to your Claude Desktop configuration file. Location varies by OS (see Config file locations below).',
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
        title: 'Claude Code (momentum)',
        text: 'momentum is installed as a Claude Code plugin, not via config file.',
        steps: [
          'Ensure Bun is installed (curl -fsSL https://bun.sh/install | bash)',
          'Run: /plugin install momentum@substratia-marketplace',
          'Restart Claude Code',
          'Use save_context and restore_context tools',
        ],
      },
      {
        title: 'Cursor / Windsurf',
        text: 'MCP configuration for Cursor and Windsurf follows the same pattern as Claude Desktop. Add to your MCP config:',
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
        title: 'Windows-Specific Setup',
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
    title: 'Troubleshooting',
    id: 'troubleshooting',
    content: [
      {
        title: 'Tools not appearing in Claude Desktop',
        text: 'Restart Claude Desktop completely (Cmd+Q / Alt+F4, then reopen). Verify your config file is valid JSON (use a validator). Ensure Node.js 18+ is installed for memory-mcp, or Bun 1.0+ for momentum.',
      },
      {
        title: '"Connection closed" on Windows',
        text: 'Windows requires either the cmd /c wrapper method OR the full path to npx.cmd. Example: "C:\\\\Program Files\\\\nodejs\\\\npx.cmd" instead of just "npx".',
      },
      {
        title: 'Getting stale npm versions',
        text: 'Clear the npm cache with "npm cache clean --force", or use "npx --yes" to force fetching the latest version.',
      },
      {
        title: 'memory.db lost after Claude Desktop update',
        text: 'The default database location may be inside versioned app folders that get purged on update. Set the MEMORY_DB_PATH environment variable to a stable location like ~/Documents/memory-mcp/memory.db.',
      },
      {
        title: 'momentum: Bun not found',
        text: 'Install Bun with: curl -fsSL https://bun.sh/install | bash (macOS/Linux) or use the Windows installer from bun.sh. Restart your terminal after installation.',
      },
      {
        title: 'Config file locations',
        list: [
          { name: 'macOS', desc: '~/Library/Application Support/Claude/claude_desktop_config.json' },
          { name: 'Windows', desc: '%APPDATA%\\\\Claude\\\\claude_desktop_config.json' },
          { name: 'Linux', desc: '~/.config/Claude/claude_desktop_config.json' },
        ],
      },
    ],
  },
]

export default function DocsPage() {
  const [copiedCode, setCopiedCode] = useState<string | null>(null)
  const [sharedSection, setSharedSection] = useState<string | null>(null)

  // Handle URL hash navigation on mount
  useEffect(() => {
    if (typeof window === 'undefined') return
    const hash = window.location.hash.slice(1)
    if (hash) {
      setTimeout(() => {
        const element = document.getElementById(hash)
        if (element) element.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }, 100)
    }
  }, [])

  const copyCode = useCallback(async (code: string, id: string) => {
    await navigator.clipboard.writeText(code)
    setCopiedCode(id)
    setTimeout(() => setCopiedCode(null), 2000)
  }, [])

  const shareSection = useCallback(async (sectionId: string) => {
    const shareUrl = `${window.location.origin}${window.location.pathname}#${sectionId}`
    await navigator.clipboard.writeText(shareUrl)
    setSharedSection(sectionId)
    setTimeout(() => setSharedSection(null), 2000)
  }, [])

  return (
    <main className="min-h-screen text-white py-12">
      <div className="container mx-auto px-4">
        <div className="flex justify-end mb-4 max-w-6xl mx-auto">
          <ShareButton title="Documentation - Substratia" />
        </div>
        <div className="flex gap-12 max-w-6xl mx-auto">
          {/* Sidebar */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <div className="sticky top-24">
              <h3 className="text-sm font-semibold text-gray-400 mb-4">ON THIS PAGE</h3>
              <nav className="space-y-2">
                {sections.map((section) => (
                  <a
                    key={section.id}
                    href={`#${section.id}`}
                    className="block text-gray-400 hover:text-white transition-colors"
                  >
                    {section.title}
                  </a>
                ))}
              </nav>
              <div className="mt-8 pt-8 border-t border-white/10">
                <Link
                  href="/builder"
                  className="block px-4 py-2 bg-forge-purple hover:bg-forge-purple/80 rounded-lg text-center font-medium transition-all"
                >
                  Open Builder
                </Link>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-1 min-w-0">
            <h1 className="text-4xl font-bold mb-4">Documentation</h1>
            <p className="text-xl text-gray-400 mb-12">
              Everything you need to know about Substratia&apos;s memory tools and AgentForge builder.
            </p>

            {sections.map((section) => (
              <section key={section.id} id={section.id} className="mb-16 scroll-mt-24">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-forge-cyan">{section.title}</h2>
                  <button
                    onClick={() => shareSection(section.id)}
                    className={`px-3 py-1 text-xs rounded-lg transition-all ${
                      sharedSection === section.id
                        ? 'bg-green-500 text-white'
                        : 'bg-forge-cyan/20 hover:bg-forge-cyan/30 text-forge-cyan'
                    }`}
                  >
                    {sharedSection === section.id ? 'Link Copied!' : 'Share'}
                  </button>
                </div>
                <div className="space-y-8">
                  {section.content.map((item, idx) => (
                    <div key={idx} className="bg-white/5 border border-white/10 rounded-xl p-6">
                      <h3 className="text-xl font-semibold mb-3">{item.title}</h3>

                      {item.text && (
                        <p className="text-gray-400">{item.text}</p>
                      )}

                      {item.steps && (
                        <ol className="list-decimal list-inside space-y-2 text-gray-400">
                          {item.steps.map((step, i) => (
                            <li key={i}>{step}</li>
                          ))}
                        </ol>
                      )}

                      {item.code && (
                        <div className="mt-4 relative">
                          <pre className="bg-forge-dark border border-white/10 rounded-lg p-4 overflow-x-auto text-sm pr-16">
                            {item.code}
                          </pre>
                          <button
                            onClick={() => copyCode(item.code!, `${section.id}-${idx}`)}
                            className={`absolute top-2 right-2 px-2 py-1 text-xs rounded transition-all ${
                              copiedCode === `${section.id}-${idx}`
                                ? 'bg-green-500 text-white'
                                : 'bg-white/10 hover:bg-white/20'
                            }`}
                          >
                            {copiedCode === `${section.id}-${idx}` ? 'Copied!' : 'Copy'}
                          </button>
                        </div>
                      )}

                      {item.list && (
                        <ul className="space-y-3">
                          {item.list.map((listItem, i) => (
                            <li key={i} className="flex items-start gap-3">
                              <span className="text-forge-purple font-semibold">{listItem.name}:</span>
                              <span className="text-gray-400">{listItem.desc}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            ))}

            {/* Related Resources */}
            <section className="mt-16 pt-8 border-t border-white/10">
              <h2 className="text-2xl font-bold mb-6">Related Resources</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <a
                  href="https://github.com/WhenMoon-afk/momentum"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 bg-white/5 border border-white/10 rounded-xl hover:border-forge-cyan transition-all"
                >
                  <div className="text-forge-cyan text-sm mb-1">GitHub</div>
                  <div className="font-semibold">momentum</div>
                  <div className="text-sm text-gray-400 mt-1">Fast context recovery plugin</div>
                </a>
                <a
                  href="https://github.com/WhenMoon-afk/claude-memory-mcp"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 bg-white/5 border border-white/10 rounded-xl hover:border-forge-purple transition-all"
                >
                  <div className="text-forge-purple text-sm mb-1">GitHub</div>
                  <div className="font-semibold">memory-mcp</div>
                  <div className="text-sm text-gray-400 mt-1">Persistent memory MCP server</div>
                </a>
                <Link
                  href="/blog/how-to-build-claude-agents"
                  className="p-4 bg-white/5 border border-white/10 rounded-xl hover:border-forge-purple transition-all"
                >
                  <div className="text-forge-cyan text-sm mb-1">Blog</div>
                  <div className="font-semibold">How to Build Claude Agents</div>
                  <div className="text-sm text-gray-400 mt-1">Complete guide to CLAUDE.md files</div>
                </Link>
                <Link
                  href="/templates"
                  className="p-4 bg-white/5 border border-white/10 rounded-xl hover:border-forge-purple transition-all"
                >
                  <div className="text-forge-cyan text-sm mb-1">Tools</div>
                  <div className="font-semibold">Memory Tools</div>
                  <div className="text-sm text-gray-400 mt-1">Explore the full ecosystem</div>
                </Link>
              </div>
            </section>
          </div>
        </div>
      </div>
    </main>
  )
}
