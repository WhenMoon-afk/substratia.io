'use client'

import { useState, useCallback, useEffect } from 'react'
import Link from 'next/link'
import ShareButton from '@/components/ShareButton'

export default function CheatSheetPage() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [copiedSection, setCopiedSection] = useState<string | null>(null)

  const FORMSPREE_ENDPOINT = 'https://formspree.io/f/mreezwlv'

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return

    setStatus('loading')
    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({ email, source: 'cheat-sheet', interest: 'claude-code-tips' }),
      })
      if (res.ok) {
        setStatus('success')
        setEmail('')
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  const copySection = (id: string, content: string) => {
    navigator.clipboard.writeText(content)
    setCopiedSection(id)
    setTimeout(() => setCopiedSection(null), 2000)
  }

  // Scroll to section from URL hash
  useEffect(() => {
    if (typeof window === 'undefined') return
    const hash = window.location.hash.slice(1)
    if (hash) {
      setTimeout(() => {
        const element = document.getElementById(hash)
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
      }, 100)
    }
  }, [])

  // Download as markdown
  const downloadMarkdown = useCallback(() => {
    const content = `# Claude Code Cheat Sheet

## Slash Commands
${slashCommandsContent}

## Keyboard Shortcuts
${shortcutsContent}

## CLAUDE.md Template
\`\`\`markdown
${claudeMdContent}
\`\`\`

## Power Prompts
${promptsContent}

## MCP Configuration
\`\`\`json
${mcpContent}
\`\`\`

## Pro Tips
${tipsContent}

---
Downloaded from substratia.io/tools/cheat-sheet
`
    const blob = new Blob([content], { type: 'text/markdown' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'claude-code-cheat-sheet.md'
    a.click()
    URL.revokeObjectURL(url)
  }, [])

  return (
    <main className="min-h-screen text-white relative">
      <div className="neural-bg" />
      <div className="fixed inset-0 gradient-mesh pointer-events-none z-0" />

      {/* Header */}
      <section className="relative z-10 py-12">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-4">
            <Link href="/tools" className="text-forge-cyan hover:underline text-sm">
              ← Back to Tools
            </Link>
            <ShareButton title="Claude Code Cheat Sheet - Substratia" />
          </div>
          <div className="max-w-4xl">
            <div className="inline-block px-3 py-1 bg-green-500/20 border border-green-500/50 rounded-full text-xs text-green-400 mb-4">
              Free Resource
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Claude Code <span className="text-forge-cyan">Cheat Sheet</span>
            </h1>
            <p className="text-xl text-gray-300 mb-6">
              The essential reference for Claude Code power users. Commands, shortcuts, CLAUDE.md patterns, and advanced techniques.
            </p>
            <div className="flex gap-4">
              <button
                onClick={() => window.print()}
                className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-sm transition-all"
              >
                Print / Save PDF
              </button>
              <button
                onClick={downloadMarkdown}
                className="px-4 py-2 bg-forge-cyan/20 hover:bg-forge-cyan/30 text-forge-cyan rounded-lg text-sm transition-all"
              >
                Download .md
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Cheat Sheet Content */}
      <section className="relative z-10 py-8 print:py-0">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto space-y-8 print:space-y-4">

            {/* Slash Commands */}
            <CheatSection
              id="slash-commands"
              title="Slash Commands"
              onCopy={copySection}
              copied={copiedSection === 'slash-commands'}
              content={slashCommandsContent}
            >
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-semibold text-forge-purple mb-2">Navigation & Control</h4>
                  <CommandList commands={[
                    { cmd: '/help', desc: 'Show all available commands' },
                    { cmd: '/clear', desc: 'Clear conversation context' },
                    { cmd: '/compact', desc: 'Summarize and compress context' },
                    { cmd: '/cost', desc: 'Show session token usage and cost' },
                    { cmd: '/quit', desc: 'Exit Claude Code' },
                  ]} />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-forge-purple mb-2">Context Management</h4>
                  <CommandList commands={[
                    { cmd: '/init', desc: 'Initialize CLAUDE.md in project' },
                    { cmd: '/memory', desc: 'View/manage persistent memory' },
                    { cmd: '/context', desc: 'Show current context window' },
                    { cmd: '/add-dir <path>', desc: 'Add directory to context' },
                    { cmd: '/review', desc: 'Review changes before commit' },
                  ]} />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-forge-purple mb-2">Thinking Modes</h4>
                  <CommandList commands={[
                    { cmd: '/think', desc: 'Enable extended thinking' },
                    { cmd: '/ultrathink', desc: 'Maximum reasoning depth' },
                    { cmd: '/thinkhard', desc: 'Deep analysis mode' },
                  ]} />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-forge-purple mb-2">Session & History</h4>
                  <CommandList commands={[
                    { cmd: '/resume', desc: 'Resume previous session' },
                    { cmd: '/history', desc: 'Show command history' },
                    { cmd: '/undo', desc: 'Undo last file change' },
                    { cmd: '/diff', desc: 'Show uncommitted changes' },
                  ]} />
                </div>
              </div>
            </CheatSection>

            {/* Keyboard Shortcuts */}
            <CheatSection
              id="shortcuts"
              title="Keyboard Shortcuts"
              onCopy={copySection}
              copied={copiedSection === 'shortcuts'}
              content={shortcutsContent}
            >
              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <h4 className="text-sm font-semibold text-forge-cyan mb-2">Essential</h4>
                  <ShortcutList shortcuts={[
                    { keys: 'Ctrl+C', desc: 'Interrupt current operation' },
                    { keys: 'Ctrl+D', desc: 'Exit Claude Code' },
                    { keys: 'Tab', desc: 'Autocomplete commands' },
                    { keys: 'Up/Down', desc: 'Navigate command history' },
                  ]} />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-forge-cyan mb-2">Input</h4>
                  <ShortcutList shortcuts={[
                    { keys: 'Shift+Enter', desc: 'Multi-line input' },
                    { keys: 'Ctrl+L', desc: 'Clear terminal' },
                    { keys: 'Ctrl+R', desc: 'Search history' },
                    { keys: 'Esc', desc: 'Cancel current input' },
                  ]} />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-forge-cyan mb-2">Navigation</h4>
                  <ShortcutList shortcuts={[
                    { keys: 'Ctrl+A', desc: 'Move to line start' },
                    { keys: 'Ctrl+E', desc: 'Move to line end' },
                    { keys: 'Ctrl+W', desc: 'Delete word backward' },
                    { keys: 'Ctrl+U', desc: 'Clear line' },
                  ]} />
                </div>
              </div>
            </CheatSection>

            {/* CLAUDE.md Patterns */}
            <CheatSection
              id="claude-md"
              title="CLAUDE.md Patterns"
              onCopy={copySection}
              copied={copiedSection === 'claude-md'}
              content={claudeMdContent}
            >
              <div className="space-y-4">
                <div className="glass rounded-lg p-4">
                  <h4 className="text-sm font-semibold text-forge-purple mb-2">Project Context Block</h4>
                  <pre className="text-xs bg-black/50 rounded p-3 overflow-x-auto">
{`# Project Overview
This is a Next.js 14 app with App Router.
Stack: TypeScript, Tailwind CSS, Prisma, PostgreSQL

# Key Directories
- /src/app - Page routes
- /src/components - React components
- /src/lib - Utilities and helpers
- /prisma - Database schema`}
                  </pre>
                </div>

                <div className="glass rounded-lg p-4">
                  <h4 className="text-sm font-semibold text-forge-purple mb-2">Coding Standards Block</h4>
                  <pre className="text-xs bg-black/50 rounded p-3 overflow-x-auto">
{`# Coding Standards
- Use 'use client' only when needed
- Prefer server components by default
- Use Zod for validation
- Error handling: try/catch with proper logging
- Tests: Vitest for unit, Playwright for e2e`}
                  </pre>
                </div>

                <div className="glass rounded-lg p-4">
                  <h4 className="text-sm font-semibold text-forge-purple mb-2">Negative Prompt Block (Critical)</h4>
                  <pre className="text-xs bg-black/50 rounded p-3 overflow-x-auto">
{`# Do NOT
- Do not add comments to unchanged code
- Do not refactor code not related to the task
- Do not add features beyond what's requested
- Do not use console.log for production code
- Do not commit without running tests`}
                  </pre>
                </div>

                <div className="glass rounded-lg p-4">
                  <h4 className="text-sm font-semibold text-forge-purple mb-2">Workflow Instructions Block</h4>
                  <pre className="text-xs bg-black/50 rounded p-3 overflow-x-auto">
{`# Workflow
1. Read the file before editing
2. Make minimal changes to achieve the goal
3. Run tests after changes: npm test
4. Format with: npm run format
5. If tests fail, fix before continuing`}
                  </pre>
                </div>
              </div>
            </CheatSection>

            {/* Prompt Patterns */}
            <CheatSection
              id="prompts"
              title="Power User Prompt Patterns"
              onCopy={copySection}
              copied={copiedSection === 'prompts'}
              content={promptsContent}
            >
              <div className="grid md:grid-cols-2 gap-4">
                <div className="glass rounded-lg p-4">
                  <h4 className="text-sm font-semibold text-forge-cyan mb-2">Autonomous Loop</h4>
                  <pre className="text-xs bg-black/50 rounded p-2 overflow-x-auto whitespace-pre-wrap">
{`Work autonomously until complete.
After each step, verify the result.
If something fails, debug and retry.
Only stop when fully working.`}
                  </pre>
                </div>

                <div className="glass rounded-lg p-4">
                  <h4 className="text-sm font-semibold text-forge-cyan mb-2">Parallel Exploration</h4>
                  <pre className="text-xs bg-black/50 rounded p-2 overflow-x-auto whitespace-pre-wrap">
{`Search for [X] in parallel:
1. Check files matching *.ts
2. Search for "keyword" in /src
3. Look at recent git commits
Report all findings together.`}
                  </pre>
                </div>

                <div className="glass rounded-lg p-4">
                  <h4 className="text-sm font-semibold text-forge-cyan mb-2">Structured Output</h4>
                  <pre className="text-xs bg-black/50 rounded p-2 overflow-x-auto whitespace-pre-wrap">
{`Analyze this code and respond with:
## Issues Found
## Suggested Fixes
## Code Changes
## Verification Steps`}
                  </pre>
                </div>

                <div className="glass rounded-lg p-4">
                  <h4 className="text-sm font-semibold text-forge-cyan mb-2">Context Preservation</h4>
                  <pre className="text-xs bg-black/50 rounded p-2 overflow-x-auto whitespace-pre-wrap">
{`Before we continue, summarize:
1. What we've accomplished
2. Current blockers
3. Next steps planned
Save this to CLAUDE.md under ## Session Notes`}
                  </pre>
                </div>
              </div>
            </CheatSection>

            {/* MCP Configuration */}
            <CheatSection
              id="mcp"
              title="MCP Server Configuration"
              onCopy={copySection}
              copied={copiedSection === 'mcp'}
              content={mcpContent}
            >
              <div className="space-y-4">
                <div className="glass rounded-lg p-4">
                  <h4 className="text-sm font-semibold text-forge-purple mb-2">Location: ~/.claude/claude_desktop_config.json</h4>
                  <pre className="text-xs bg-black/50 rounded p-3 overflow-x-auto">
{`{
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
}`}
                  </pre>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="glass rounded-lg p-4">
                    <h4 className="text-sm font-semibold text-forge-cyan mb-2">Popular MCP Servers</h4>
                    <ul className="text-xs space-y-1 text-gray-300">
                      <li><span className="text-forge-cyan">memory-mcp</span> - Persistent memory</li>
                      <li><span className="text-forge-cyan">momentum</span> - Context recovery</li>
                      <li><span className="text-forge-cyan">server-filesystem</span> - File access</li>
                      <li><span className="text-forge-cyan">server-github</span> - GitHub integration</li>
                      <li><span className="text-forge-cyan">server-postgres</span> - Database queries</li>
                      <li><span className="text-forge-cyan">server-puppeteer</span> - Browser automation</li>
                    </ul>
                  </div>
                  <div className="glass rounded-lg p-4">
                    <h4 className="text-sm font-semibold text-forge-cyan mb-2">Config Locations</h4>
                    <ul className="text-xs space-y-1 text-gray-300">
                      <li><span className="text-gray-500">macOS:</span> ~/Library/Application Support/Claude/</li>
                      <li><span className="text-gray-500">Windows:</span> %APPDATA%\\Claude\\</li>
                      <li><span className="text-gray-500">Linux:</span> ~/.config/Claude/</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CheatSection>

            {/* Tips & Tricks */}
            <CheatSection
              id="tips"
              title="Pro Tips"
              onCopy={copySection}
              copied={copiedSection === 'tips'}
              content={tipsContent}
            >
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <Tip emoji="🎯" title="Be Specific">
                    &quot;Fix the bug&quot; → &quot;Fix the null pointer in handleSubmit at line 42 of UserForm.tsx&quot;
                  </Tip>
                  <Tip emoji="📁" title="Reference Files">
                    Start prompts with file paths: &quot;In src/lib/auth.ts, update the token validation...&quot;
                  </Tip>
                  <Tip emoji="🔄" title="Iterative Refinement">
                    Don&apos;t try to do everything at once. Small, focused changes are more reliable.
                  </Tip>
                  <Tip emoji="🧪" title="Test After Changes">
                    Always ask Claude to run tests after making changes. Catch issues immediately.
                  </Tip>
                </div>
                <div className="space-y-3">
                  <Tip emoji="📝" title="Use CLAUDE.md">
                    Invest 10 minutes in a good CLAUDE.md. It saves hours of re-explaining context.
                  </Tip>
                  <Tip emoji="⚡" title="Thinking Modes">
                    Use /ultrathink for complex architecture decisions. Normal mode for simple tasks.
                  </Tip>
                  <Tip emoji="🛑" title="Negative Prompts">
                    Tell Claude what NOT to do. &quot;Do not modify files outside /src/components&quot;
                  </Tip>
                  <Tip emoji="💾" title="Save Context">
                    Before /clear, ask Claude to summarize the session to CLAUDE.md.
                  </Tip>
                </div>
              </div>
            </CheatSection>

          </div>
        </div>
      </section>

      {/* Email Capture */}
      <section className="relative z-10 py-16 print:hidden">
        <div className="container mx-auto px-4">
          <div className="max-w-xl mx-auto text-center">
            <h2 className="text-2xl font-bold mb-4">Get More Claude Code Tips</h2>
            <p className="text-gray-400 mb-6">
              Join the newsletter for weekly tips, new tool announcements, and advanced techniques.
            </p>
            {status === 'success' ? (
              <div className="bg-green-500/20 border border-green-500/50 rounded-xl p-4 text-green-300">
                You&apos;re in! Check your inbox for tips.
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  aria-label="Email address for newsletter subscription"
                  required
                  className="flex-1 px-4 py-3 bg-white/5 border border-white/20 rounded-xl focus:outline-none focus:border-forge-cyan transition-all"
                />
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="px-6 py-3 bg-forge-cyan text-forge-dark font-semibold rounded-xl hover:bg-forge-cyan/90 transition-all disabled:opacity-50"
                >
                  {status === 'loading' ? '...' : 'Subscribe'}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative z-10 py-12 print:hidden">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-400 mb-4">Need personalized help with Claude Code?</p>
          <Link
            href="/consulting"
            className="inline-block px-6 py-3 bg-forge-purple hover:bg-forge-purple/80 rounded-xl font-semibold transition-all"
          >
            Book a Consulting Session
          </Link>
        </div>
      </section>

      {/* Print Styles */}
      <style jsx global>{`
        @media print {
          .neural-bg, .gradient-mesh, nav, footer { display: none !important; }
          .glass { background: white !important; border: 1px solid #ddd !important; }
          * { color: black !important; }
          pre { background: #f5f5f5 !important; }
          .text-forge-cyan, .text-forge-purple { color: #333 !important; font-weight: bold; }
        }
      `}</style>
    </main>
  )
}

// Content for copy functionality
const slashCommandsContent = `/help - Show all available commands
/clear - Clear conversation context
/compact - Summarize and compress context
/cost - Show session token usage and cost
/quit - Exit Claude Code
/init - Initialize CLAUDE.md in project
/memory - View/manage persistent memory
/context - Show current context window
/add-dir <path> - Add directory to context
/review - Review changes before commit
/think - Enable extended thinking
/ultrathink - Maximum reasoning depth
/thinkhard - Deep analysis mode
/resume - Resume previous session
/history - Show command history
/undo - Undo last file change
/diff - Show uncommitted changes`

const shortcutsContent = `Ctrl+C - Interrupt current operation
Ctrl+D - Exit Claude Code
Tab - Autocomplete commands
Up/Down - Navigate command history
Shift+Enter - Multi-line input
Ctrl+L - Clear terminal
Ctrl+R - Search history
Esc - Cancel current input
Ctrl+A - Move to line start
Ctrl+E - Move to line end
Ctrl+W - Delete word backward
Ctrl+U - Clear line`

const claudeMdContent = `# Project Overview
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

const promptsContent = `Autonomous Loop:
"Work autonomously until complete. After each step, verify the result. If something fails, debug and retry. Only stop when fully working."

Parallel Exploration:
"Search for [X] in parallel: 1. Check files matching *.ts 2. Search for 'keyword' in /src 3. Look at recent git commits. Report all findings together."

Structured Output:
"Analyze this code and respond with: ## Issues Found ## Suggested Fixes ## Code Changes ## Verification Steps"

Context Preservation:
"Before we continue, summarize: 1. What we've accomplished 2. Current blockers 3. Next steps planned. Save this to CLAUDE.md under ## Session Notes"`

const mcpContent = `~/.claude/claude_desktop_config.json:
{
  "mcpServers": {
    "memory": {
      "command": "npx",
      "args": ["@whenmoon-afk/memory-mcp"]
    }
  }
}

Popular Servers: memory-mcp, momentum, server-filesystem, server-github, server-postgres, server-puppeteer

Config Locations:
macOS: ~/Library/Application Support/Claude/
Windows: %APPDATA%\\Claude\\
Linux: ~/.config/Claude/`

const tipsContent = `🎯 Be Specific: "Fix the bug" → "Fix the null pointer in handleSubmit at line 42"
📁 Reference Files: Start prompts with file paths
🔄 Iterative Refinement: Small, focused changes are more reliable
🧪 Test After Changes: Always run tests after making changes
📝 Use CLAUDE.md: Invest 10 minutes, save hours
⚡ Thinking Modes: /ultrathink for complex decisions
🛑 Negative Prompts: Tell Claude what NOT to do
💾 Save Context: Summarize before /clear`

function CheatSection({
  id,
  title,
  children,
  onCopy,
  copied,
  content
}: {
  id: string
  title: string
  children: React.ReactNode
  onCopy: (id: string, content: string) => void
  copied: boolean
  content: string
}) {
  const [shared, setShared] = useState(false)

  const shareSection = () => {
    const url = `${window.location.origin}${window.location.pathname}#${id}`
    navigator.clipboard.writeText(url)
    setShared(true)
    setTimeout(() => setShared(false), 2000)
  }

  return (
    <div id={id} className="glass rounded-2xl p-6 print:break-inside-avoid scroll-mt-24">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold text-forge-cyan">{title}</h3>
        <div className="flex gap-2 print:hidden">
          <button
            onClick={shareSection}
            className={`text-xs px-3 py-1 rounded transition-all ${
              shared ? 'bg-green-500 text-white' : 'bg-forge-purple/20 hover:bg-forge-purple/30 text-forge-purple'
            }`}
          >
            {shared ? 'Link Copied!' : 'Share'}
          </button>
          <button
            onClick={() => onCopy(id, content)}
            className={`text-xs px-3 py-1 rounded transition-all ${
              copied ? 'bg-green-500 text-white' : 'bg-white/10 hover:bg-white/20'
            }`}
          >
            {copied ? 'Copied!' : 'Copy'}
          </button>
        </div>
      </div>
      {children}
    </div>
  )
}

function CommandList({ commands }: { commands: { cmd: string; desc: string }[] }) {
  return (
    <ul className="space-y-1 text-sm">
      {commands.map((c, i) => (
        <li key={i} className="flex gap-2">
          <code className="text-forge-cyan font-mono text-xs">{c.cmd}</code>
          <span className="text-gray-400 text-xs">- {c.desc}</span>
        </li>
      ))}
    </ul>
  )
}

function ShortcutList({ shortcuts }: { shortcuts: { keys: string; desc: string }[] }) {
  return (
    <ul className="space-y-1 text-sm">
      {shortcuts.map((s, i) => (
        <li key={i} className="flex gap-2">
          <kbd className="px-1.5 py-0.5 bg-white/10 rounded text-xs font-mono">{s.keys}</kbd>
          <span className="text-gray-400 text-xs">{s.desc}</span>
        </li>
      ))}
    </ul>
  )
}

function Tip({ emoji, title, children }: { emoji: string; title: string; children: React.ReactNode }) {
  return (
    <div className="glass rounded-lg p-3">
      <div className="flex items-start gap-2">
        <span className="text-lg">{emoji}</span>
        <div>
          <h5 className="text-sm font-semibold">{title}</h5>
          <p className="text-xs text-gray-400">{children}</p>
        </div>
      </div>
    </div>
  )
}
