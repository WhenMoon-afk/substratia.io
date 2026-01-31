'use client'

import { useState, useCallback, useEffect } from 'react'
import Link from 'next/link'
import ShareButton from '@/components/ShareButton'

interface Tool {
  id: string
  name: string
  tagline: string
  description: string
  stats: Record<string, string>
  features: string[]
  installCommand: string
  githubUrl?: string
  npmUrl?: string
  internalUrl?: string
  color: string
}

const tools: Tool[] = [
  {
    id: 'momentum',
    name: 'momentum',
    tagline: 'Context Recovery',
    description: 'Instant context recovery for Claude Code. Save snapshots as you work, restore in milliseconds after /clear.',
    stats: {
      restore: '<5ms',
      storage: 'SQLite',
      price: 'Free',
    },
    features: [
      'Snapshot-based context saving',
      'Instant restoration (<5ms)',
      'Session management',
      'Context search',
      'Importance tagging',
      'SQLite persistence',
    ],
    installCommand: '/plugin install momentum@substratia-marketplace',
    githubUrl: 'https://github.com/WhenMoon-afk/momentum',
    color: 'cyan',
  },
  {
    id: 'memory-mcp',
    name: 'memory-mcp',
    tagline: 'Persistent Memory',
    description: 'Give your AI persistent memory across sessions. Store, recall, and search facts that survive conversation resets.',
    stats: {
      search: 'FTS5',
      storage: 'SQLite',
      price: 'Free',
    },
    features: [
      'Store memories with auto-summarization',
      'Full-text search (no embeddings)',
      'Token budgeting for context',
      'Entity extraction',
      'Hybrid relevance scoring',
      'Soft deletes with audit trail',
    ],
    installCommand: 'npx @whenmoon-afk/memory-mcp',
    githubUrl: 'https://github.com/WhenMoon-afk/claude-memory-mcp',
    npmUrl: 'https://www.npmjs.com/package/@whenmoon-afk/memory-mcp',
    color: 'purple',
  },
]

export default function TemplatesClient() {
  const [copiedCommand, setCopiedCommand] = useState<string | null>(null)
  const [sharedTool, setSharedTool] = useState<string | null>(null)

  // Handle URL hash navigation on mount
  useEffect(() => {
    if (typeof window === 'undefined') return
    const hash = window.location.hash.slice(1)
    if (hash) {
      setTimeout(() => {
        const element = document.getElementById(hash)
        if (element) element.scrollIntoView({ behavior: 'smooth', block: 'center' })
      }, 100)
    }
  }, [])

  const copyCommand = useCallback(async (tool: Tool) => {
    await navigator.clipboard.writeText(tool.installCommand)
    setCopiedCommand(tool.id)
    setTimeout(() => setCopiedCommand(null), 2000)
  }, [])

  const shareTool = useCallback(async (tool: Tool) => {
    const shareUrl = `${window.location.origin}${window.location.pathname}#${tool.id}`
    await navigator.clipboard.writeText(shareUrl)
    setSharedTool(tool.id)
    setTimeout(() => setSharedTool(null), 2000)
  }, [])

  return (
    <main className="min-h-screen text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-8">
          <Link href="/" className="text-forge-cyan hover:underline text-sm">
            ← Back to Home
          </Link>
          <ShareButton title="Memory Tools - Substratia" />
        </div>
        {/* Hero */}
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-1 bg-forge-cyan/20 border border-forge-cyan/50 rounded-full text-sm text-forge-cyan mb-4">
            Open Source / MIT Licensed
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Memory <span className="text-forge-cyan">Tools</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-8">
            Free, open-source tools that give your AI assistant a memory.
            Install in minutes, use forever.
          </p>
        </div>

        {/* Tools Grid */}
        <div className="space-y-12 max-w-5xl mx-auto mb-16">
          {tools.map((tool) => (
            <div
              key={tool.id}
              id={tool.id}
              className={`bg-white/5 border border-white/10 rounded-2xl p-8 hover:border-forge-${tool.color}/50 transition-all scroll-mt-24`}
            >
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6 mb-6">
                <div>
                  <div className={`inline-block px-2 py-1 text-xs rounded bg-forge-${tool.color}/20 text-forge-${tool.color} mb-2`}>
                    {tool.tagline}
                  </div>
                  <h2 className="text-2xl font-bold mb-2">{tool.name}</h2>
                  <p className="text-gray-400">{tool.description}</p>
                </div>
                <div className="flex flex-wrap gap-4 text-center">
                  {Object.entries(tool.stats).map(([key, value]) => (
                    <div key={key} className="bg-white/5 rounded-lg px-4 py-2">
                      <div className={`text-lg font-bold text-forge-${tool.color}`}>{value}</div>
                      <div className="text-xs text-gray-500 capitalize">{key}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h3 className="text-sm font-semibold text-gray-400 mb-3">Features</h3>
                  <ul className="space-y-2">
                    {tool.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2 text-sm">
                        <svg className={`w-4 h-4 text-forge-${tool.color} flex-shrink-0 mt-0.5`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-gray-300">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-gray-400 mb-3">Install</h3>
                  <div className="bg-black/30 rounded-lg p-4 font-mono text-sm mb-4 flex items-center justify-between gap-2">
                    <code className="text-forge-cyan overflow-x-auto">{tool.installCommand}</code>
                    <button
                      onClick={() => copyCommand(tool)}
                      className={`px-2 py-1 text-xs rounded transition-all shrink-0 ${
                        copiedCommand === tool.id
                          ? 'bg-green-500 text-white'
                          : 'bg-white/10 hover:bg-white/20'
                      }`}
                    >
                      {copiedCommand === tool.id ? 'Copied!' : 'Copy'}
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    {tool.githubUrl && (
                      <a
                        href={tool.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-sm font-medium transition-all"
                      >
                        GitHub
                      </a>
                    )}
                    {tool.npmUrl && (
                      <a
                        href={tool.npmUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-sm font-medium transition-all"
                      >
                        npm
                      </a>
                    )}
                    {tool.internalUrl && (
                      <Link
                        href={tool.internalUrl}
                        className={`px-4 py-2 bg-forge-${tool.color} text-forge-dark hover:bg-forge-${tool.color}/80 rounded-lg text-sm font-medium transition-all`}
                      >
                        Try Now
                      </Link>
                    )}
                    <button
                      onClick={() => shareTool(tool)}
                      className={`px-4 py-2 text-sm font-medium rounded-lg transition-all ${
                        sharedTool === tool.id
                          ? 'bg-green-500 text-white'
                          : 'bg-forge-cyan/20 hover:bg-forge-cyan/30 text-forge-cyan'
                      }`}
                    >
                      {sharedTool === tool.id ? 'Link Copied!' : 'Share'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Open Source CTA */}
        <div className="max-w-3xl mx-auto text-center bg-gradient-to-r from-forge-purple/20 to-forge-cyan/20 rounded-2xl p-8 mb-16">
          <h2 className="text-2xl font-bold mb-4">Free & Open Source</h2>
          <p className="text-gray-400 mb-6">
            All Substratia tools are MIT licensed and free forever.
            Contribute, customize, or just use them as-is.
          </p>
          <a
            href="https://github.com/WhenMoon-afk"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-6 py-3 bg-forge-purple hover:bg-forge-purple/80 rounded-lg font-semibold transition-all"
          >
            View on GitHub
          </a>
        </div>

        {/* How They Work Together */}
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8">
            How They <span className="text-forge-cyan">Work Together</span>
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white/5 border border-white/10 rounded-xl p-6">
              <h3 className="font-semibold mb-2">Context Window Full?</h3>
              <p className="text-gray-400 text-sm mb-3">
                Use <span className="text-forge-cyan font-mono">momentum</span> to snapshot your work,
                then /clear and restore instantly.
              </p>
              <div className="text-xs text-gray-500">Best for: Mid-session context management</div>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-xl p-6">
              <h3 className="font-semibold mb-2">New Session?</h3>
              <p className="text-gray-400 text-sm mb-3">
                Use <span className="text-forge-purple font-mono">memory-mcp</span> to recall facts
                from past sessions automatically.
              </p>
              <div className="text-xs text-gray-500">Best for: Cross-session knowledge</div>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-xl p-6">
              <h3 className="font-semibold mb-2">Both Together</h3>
              <p className="text-gray-400 text-sm mb-3">
                Manage sessions with <span className="text-forge-cyan font-mono">momentum</span>,
                persist knowledge with <span className="text-forge-purple font-mono">memory-mcp</span>.
                Complete AI workflow.
              </p>
              <div className="text-xs text-gray-500">Best for: Complete AI workflow</div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
