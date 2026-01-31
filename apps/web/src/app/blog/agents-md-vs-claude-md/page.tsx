import type { Metadata } from 'next'
import Link from 'next/link'
import ShareButton from '@/components/ShareButton'

export const metadata: Metadata = {
  title: 'AGENTS.md vs CLAUDE.md: Complete Guide to AI Agent Configuration | Substratia',
  description: 'Learn the differences between AGENTS.md and CLAUDE.md files, when to use each, and best practices for configuring AI coding agents like Claude Code, Cursor, and GitHub Copilot.',
  keywords: 'AGENTS.md, CLAUDE.md, AI agents, Claude Code, Cursor, GitHub Copilot, agent configuration, prompt engineering, AI coding assistant',
  openGraph: {
    title: 'AGENTS.md vs CLAUDE.md: Complete Guide',
    description: 'Master AI agent configuration with our comprehensive comparison guide.',
    type: 'article',
  },
}

export default function AgentsMdVsClaudeMd() {
  return (
    <main className="min-h-screen text-white">
      <article className="container mx-auto px-4 py-16 max-w-4xl">
        {/* Breadcrumb */}
        <nav className="flex items-center justify-between text-sm text-gray-400 mb-8">
          <div>
            <Link href="/blog" className="hover:text-white">Blog</Link>
            <span className="mx-2">/</span>
            <span>AGENTS.md vs CLAUDE.md</span>
          </div>
          <ShareButton title="AGENTS.md vs CLAUDE.md: Complete Guide to AI Agent Configuration" />
        </nav>

        {/* Header */}
        <header className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            AGENTS.md vs CLAUDE.md: The Complete Guide to AI Agent Configuration
          </h1>
          <div className="flex items-center gap-4 text-gray-400 text-sm">
            <time dateTime="2026-01-11">January 11, 2026</time>
            <span>•</span>
            <span>12 min read</span>
          </div>
        </header>

        {/* Content */}
        <div className="prose prose-invert prose-lg max-w-none">
          <p className="text-xl text-gray-300 mb-8">
            If you&apos;re using AI coding assistants like Claude Code, Cursor, or GitHub Copilot,
            you&apos;ve probably encountered both AGENTS.md and CLAUDE.md files. But what&apos;s the
            difference, and when should you use each? This guide breaks down everything you need to know.
          </p>

          <div className="bg-white/5 border border-white/10 rounded-lg p-6 mb-8">
            <h3 className="text-lg font-semibold mb-3 mt-0">Quick Summary</h3>
            <ul className="mb-0">
              <li><strong>AGENTS.md</strong> - Universal standard, works across multiple AI tools</li>
              <li><strong>CLAUDE.md</strong> - Claude Code specific, optimized for Anthropic&apos;s agent</li>
              <li><strong>Best Practice</strong> - Use CLAUDE.md to point to AGENTS.md for compatibility</li>
            </ul>
          </div>

          <h2>What is AGENTS.md?</h2>
          <p>
            AGENTS.md is an open standard for providing context to AI coding agents. Think of it as
            a README file specifically designed for AI assistants. It has first-class support in
            most popular AI IDEs and coding agents:
          </p>
          <ul>
            <li><strong>Cursor</strong> - Full native support</li>
            <li><strong>Zed</strong> - Built-in recognition</li>
            <li><strong>GitHub Copilot</strong> - Workspace context</li>
            <li><strong>Windsurf</strong> - Automatic loading</li>
            <li><strong>Claude Code</strong> - Supported via CLAUDE.md reference</li>
          </ul>
          <p>
            The benefit of AGENTS.md is portability. If you switch between AI tools or collaborate
            with team members using different assistants, AGENTS.md ensures everyone gets the same
            project context.
          </p>

          <h2>What is CLAUDE.md?</h2>
          <p>
            CLAUDE.md is Claude Code&apos;s native configuration file. It&apos;s specifically designed
            for Anthropic&apos;s Claude and offers some unique features:
          </p>
          <ul>
            <li><strong>Hierarchical loading</strong> - Global (~/.claude/CLAUDE.md) and project-level</li>
            <li><strong>Skills integration</strong> - Direct access to Agent Skills</li>
            <li><strong>Sub-agent definition</strong> - Create custom agents in .claude/agents/</li>
            <li><strong>MCP server configuration</strong> - Model Context Protocol setup</li>
          </ul>

          <h2>Key Differences</h2>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-white/20">
                  <th className="text-left py-3 px-4">Feature</th>
                  <th className="text-left py-3 px-4">AGENTS.md</th>
                  <th className="text-left py-3 px-4">CLAUDE.md</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-white/10">
                  <td className="py-3 px-4">Compatibility</td>
                  <td className="py-3 px-4">Universal (Cursor, Copilot, etc.)</td>
                  <td className="py-3 px-4">Claude Code only</td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="py-3 px-4">Skills Support</td>
                  <td className="py-3 px-4">No</td>
                  <td className="py-3 px-4">Yes</td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="py-3 px-4">Sub-agents</td>
                  <td className="py-3 px-4">No</td>
                  <td className="py-3 px-4">Yes</td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="py-3 px-4">Global Config</td>
                  <td className="py-3 px-4">No</td>
                  <td className="py-3 px-4">Yes (~/.claude/CLAUDE.md)</td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="py-3 px-4">MCP Integration</td>
                  <td className="py-3 px-4">No</td>
                  <td className="py-3 px-4">Yes</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h2>Best Practice: The Bridge Pattern</h2>
          <p>
            The recommended approach is to use both files together. Create your main instructions
            in AGENTS.md (for universal compatibility), then have CLAUDE.md reference it:
          </p>

          <pre className="bg-forge-dark border border-white/10 rounded-lg p-4 overflow-x-auto">
            <code>{`# CLAUDE.md

# Project Configuration
See AGENTS.md for detailed project instructions.

# Claude-Specific Extensions
## Skills Available
- /commit - Smart commit messages
- /review - Code review helper

## Sub-agents
See .claude/agents/ for custom agent definitions.`}</code>
          </pre>

          <p>
            This pattern gives you the best of both worlds: universal compatibility via AGENTS.md,
            plus Claude-specific features via CLAUDE.md.
          </p>

          <h2>What to Put in Your Configuration</h2>

          <h3>Essential Information</h3>
          <ul>
            <li><strong>Project overview</strong> - What the project does in 1-2 sentences</li>
            <li><strong>Tech stack</strong> - Languages, frameworks, key dependencies</li>
            <li><strong>Build commands</strong> - How to install, build, test, lint</li>
            <li><strong>Architecture notes</strong> - High-level structure that&apos;s not obvious from code</li>
          </ul>

          <h3>What NOT to Include</h3>
          <ul>
            <li>Obvious conventions the AI already knows</li>
            <li>Information easily discoverable from package.json or similar</li>
            <li>Detailed file-by-file descriptions (keep in separate docs)</li>
            <li>Generic advice like &quot;write clean code&quot;</li>
          </ul>

          <div className="bg-forge-purple/20 border border-forge-purple rounded-lg p-6 my-8">
            <h3 className="text-lg font-semibold mb-3 mt-0">Pro Tip: Keep It Minimal</h3>
            <p className="mb-0">
              Research shows that shorter, more focused configuration files perform better than
              comprehensive documentation dumps. The AI can always read more files if needed -
              your config file should just point it in the right direction.
            </p>
          </div>

          <h2>Advanced: Agent Skills</h2>
          <p>
            If you&apos;re using Claude Code, you can extend its capabilities with Agent Skills.
            Skills are folders containing a SKILL.md file that teaches Claude how to perform
            specific tasks:
          </p>

          <pre className="bg-forge-dark border border-white/10 rounded-lg p-4 overflow-x-auto">
            <code>{`.claude/skills/
├── commit/
│   └── SKILL.md
├── deploy/
│   ├── SKILL.md
│   └── deploy.sh
└── test/
    └── SKILL.md`}</code>
          </pre>

          <p>
            Skills are powerful because they package your expertise into reusable components
            that Claude can invoke when needed.
          </p>

          <h2>Tips for Creating Great Configs</h2>
          <p>
            Creating these configuration files is straightforward once you understand the patterns.
            Check out our <Link href="/tools/prompt-optimizer" className="text-forge-cyan hover:underline">Prompt Optimizer</Link> and
            <Link href="/blog/how-to-build-claude-agents" className="text-forge-cyan hover:underline"> agent building guide</Link> for
            best practices and templates.
          </p>
          <ul>
            <li>Start with negative prompts (what NOT to do)</li>
            <li>Add specific capabilities for your use case</li>
            <li>Include guardrails and safety rules</li>
            <li>Iterate based on real-world performance</li>
          </ul>

          <h2>Conclusion</h2>
          <p>
            Both AGENTS.md and CLAUDE.md serve important purposes in AI agent configuration.
            Use AGENTS.md for universal compatibility across tools, and CLAUDE.md for
            Claude-specific features like Skills and sub-agents. The bridge pattern - having
            CLAUDE.md reference AGENTS.md - gives you the best of both worlds.
          </p>
          <p>
            Remember: keep your configurations minimal and focused. The goal is to give the AI
            the context it needs to be productive, not to document every aspect of your project.
          </p>

          <h2>Further Reading</h2>
          <ul>
            <li><Link href="/blog/how-to-build-claude-agents" className="text-forge-cyan hover:underline">How to Build Claude Agents: A Complete Guide</Link></li>
            <li><Link href="/blog/mastering-negative-prompts" className="text-forge-cyan hover:underline">Mastering Negative Prompts for AI Agents</Link></li>
            <li><Link href="/docs" className="text-forge-cyan hover:underline">Substratia Documentation</Link></li>
          </ul>
        </div>

        {/* CTA */}
        <div className="mt-16 p-8 bg-gradient-to-r from-forge-purple/20 to-forge-cyan/20 rounded-2xl border border-white/10 text-center">
          <h3 className="text-2xl font-bold mb-4">Ready to Build Your Agent Config?</h3>
          <p className="text-gray-300 mb-6">
            Check out our tools and guides to create production-ready CLAUDE.md and AGENTS.md files.
          </p>
          <Link
            href="/tools"
            className="inline-block px-8 py-4 bg-forge-purple hover:bg-forge-purple/80 rounded-lg font-semibold text-lg transition-all"
          >
            Browse Tools - Free
          </Link>
        </div>
      </article>
    </main>
  )
}
