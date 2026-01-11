import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Free AI Tools - Token Counter, Prompt Library | Substratia',
  description: 'Free tools for AI developers: token counter, prompt library, CLAUDE.md builder. Estimate costs, manage context, improve your AI workflow.',
  keywords: 'token counter, claude token counter, gpt token counter, AI tools, prompt library, context window calculator',
}

const tools = [
  {
    name: 'Token Counter',
    description: 'Count tokens, estimate costs, and check context window usage for Claude, GPT-4, and other models.',
    href: '/tools/token-counter',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
      </svg>
    ),
    color: 'cyan',
    badge: 'Popular',
  },
  {
    name: 'AgentForge Builder',
    description: 'Drag-and-drop builder for CLAUDE.md files. 28 capabilities, 13 guardrail rulesets.',
    href: '/builder',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" />
      </svg>
    ),
    color: 'purple',
  },
  {
    name: 'Prompt Library',
    description: 'Curated collection of prompts for communication, creativity, productivity, and more.',
    href: '/tools/prompts',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
      </svg>
    ),
    color: 'cyan',
    badge: 'Coming Soon',
  },
]

export default function ToolsIndexPage() {
  return (
    <main className="min-h-screen text-white">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="max-w-4xl mx-auto text-center mb-12">
          <div className="inline-block px-4 py-1 bg-forge-cyan/20 border border-forge-cyan/50 rounded-full text-sm text-forge-cyan mb-4">
            Free Forever
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            AI <span className="text-forge-cyan">Tools</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Free utilities to improve your AI workflow. No signup required.
          </p>
        </div>

        {/* Tools Grid */}
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {tools.map((tool) => (
            <Link
              key={tool.name}
              href={tool.href}
              className={`group bg-white/5 border border-white/10 rounded-xl p-6 hover:border-forge-${tool.color}/50 transition-all relative`}
            >
              {tool.badge && (
                <span className={`absolute -top-2 -right-2 px-2 py-0.5 text-xs font-medium rounded-full ${
                  tool.badge === 'Coming Soon'
                    ? 'bg-gray-600 text-gray-300'
                    : 'bg-forge-cyan text-forge-dark'
                }`}>
                  {tool.badge}
                </span>
              )}
              <div className={`w-12 h-12 rounded-xl bg-forge-${tool.color}/20 flex items-center justify-center text-forge-${tool.color} mb-4 group-hover:scale-110 transition-transform`}>
                {tool.icon}
              </div>
              <h2 className="text-xl font-bold mb-2 group-hover:text-forge-cyan transition-colors">
                {tool.name}
              </h2>
              <p className="text-gray-400 text-sm">{tool.description}</p>
            </Link>
          ))}
        </div>

        {/* Memory Tools Section */}
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-8">
            Memory <span className="text-forge-purple">Infrastructure</span>
          </h2>
          <p className="text-gray-400 text-center mb-8 max-w-2xl mx-auto">
            Beyond utilities—these are the core memory tools that give your AI persistent memory.
          </p>
          <div className="flex justify-center gap-4">
            <Link
              href="/templates"
              className="px-6 py-3 bg-forge-purple hover:bg-forge-purple/80 rounded-xl font-semibold transition-all"
            >
              View Memory Tools
            </Link>
            <Link
              href="/docs"
              className="px-6 py-3 bg-white/10 hover:bg-white/20 rounded-xl font-semibold transition-all"
            >
              Documentation
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}
