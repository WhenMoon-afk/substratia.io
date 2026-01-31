'use client'

import { useState } from 'react'
import Link from 'next/link'
import ShareButton from '@/components/ShareButton'

const tools = [
  {
    name: 'Memory Demo',
    description: 'Experience AI memory in action. See how Claude remembers decisions, preferences, and learnings across sessions.',
    href: '/tools/memory-demo',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
    color: 'purple',
    badge: 'Interactive',
  },
  {
    name: 'Claude Code Cost Calculator',
    description: 'Track session costs, compare API vs subscription pricing. Find your most cost-effective option.',
    href: '/tools/cost-calculator',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    color: 'cyan',
    badge: 'New',
  },
  {
    name: 'Claude Code Prompt Optimizer',
    description: 'Build optimized prompts with thinking modes (ultrathink, thinkhard), autonomous loops, and snippets.',
    href: '/tools/prompt-optimizer',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    color: 'purple',
    badge: 'New',
  },
  {
    name: 'Claude Code Cheat Sheet',
    description: 'Essential reference: slash commands, shortcuts, CLAUDE.md patterns, MCP config. Print or save as PDF.',
    href: '/tools/cheat-sheet',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
    color: 'cyan',
    badge: 'Free',
  },
  {
    name: 'Stack Builder',
    description: 'Build your full-stack visually. Select technologies, check compatibility, export for AI analysis.',
    href: '/tools/stack-builder',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
      </svg>
    ),
    color: 'cyan',
    badge: 'New',
  },
  {
    name: 'Token Counter',
    description: 'Count tokens, estimate costs, and check context window usage for Claude, GPT-4, and other models.',
    href: '/tools/token-counter',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
      </svg>
    ),
    color: 'purple',
    badge: 'Popular',
  },
  {
    name: 'Prompt Library',
    description: 'Curated prompts for communication, creativity, productivity. Click to copy.',
    href: '/tools/prompts',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
      </svg>
    ),
    color: 'cyan',
    badge: '24 Prompts',
  },
  {
    name: 'Seed Maker',
    description: 'Generate high-entropy random strings from mouse movements. 100% client-side.',
    href: '/tools/seed-maker',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
      </svg>
    ),
    color: 'purple',
  },
  {
    name: 'Image Prompt Generator',
    description: 'Build AI image prompts visually. 50+ style presets, negative prompts, platform-specific output.',
    href: '/tools/image-prompt-generator',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
    color: 'cyan',
    badge: 'New',
  },
  {
    name: 'Video Prompt Timeline',
    description: 'Build video prompts scene-by-scene. 7 keyframes, moment library, platform export.',
    href: '/tools/video-prompt-timeline',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
      </svg>
    ),
    color: 'purple',
    badge: 'New',
  },
  {
    name: 'Markdown Preview',
    description: 'Live markdown editor with instant preview. Edit on the left, see rendered output on the right.',
    href: '/tools/markdown-preview',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
      </svg>
    ),
    color: 'cyan',
    badge: 'New',
  },
  {
    name: 'Markdown Stripper',
    description: 'Remove all markdown formatting instantly. Paste markdown, get clean plain text.',
    href: '/tools/markdown-stripper',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
      </svg>
    ),
    color: 'purple',
    badge: 'New',
  },
]

export default function ToolsIndexPage() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const FORMSPREE_ENDPOINT = 'https://formspree.io/f/mreezwlv'

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return

    setStatus('loading')
    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({ email, source: 'tools-index', interest: 'ai-tools' }),
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

  return (
    <main className="min-h-screen text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="flex justify-end mb-4">
          <ShareButton title="Free AI Tools - Substratia" />
        </div>
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
                <span className="absolute -top-2 -right-2 px-2 py-0.5 text-xs font-medium rounded-full bg-forge-cyan text-forge-dark">
                  {tool.badge}
                </span>
              )}
              <div className={`w-12 h-12 rounded-xl bg-forge-${tool.color}/20 flex items-center justify-center text-forge-${tool.color} mb-4 group-hover:scale-110 transition-transform`} aria-hidden="true">
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

        {/* Newsletter Section */}
        <div className="max-w-xl mx-auto text-center mt-20 pt-12 border-t border-white/10">
          <h2 className="text-2xl font-bold mb-4">Stay Updated</h2>
          <p className="text-gray-400 mb-6">
            Get notified when we release new tools and Claude Code tips.
          </p>
          {status === 'success' ? (
            <div className="bg-green-500/20 border border-green-500/50 rounded-xl p-4 text-green-300">
              You&apos;re in! We&apos;ll let you know when new tools drop.
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
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
          {status === 'error' && (
            <p className="text-red-400 text-sm mt-2">Something went wrong. Please try again.</p>
          )}
        </div>

        {/* Start Here CTA */}
        <div className="text-center mt-12">
          <p className="text-gray-400 mb-4">New to Claude Code?</p>
          <Link
            href="/start-here"
            className="inline-block px-6 py-3 bg-forge-purple hover:bg-forge-purple/80 rounded-xl font-semibold transition-all"
          >
            Start Here Guide
          </Link>
        </div>
      </div>
    </main>
  )
}
