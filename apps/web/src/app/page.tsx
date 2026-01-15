'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'

export default function Home() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')
  const [mounted, setMounted] = useState(false)

  // Cloud waitlist state
  const [cloudEmail, setCloudEmail] = useState('')
  const [cloudStatus, setCloudStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [cloudMessage, setCloudMessage] = useState('')

  useEffect(() => {
    setMounted(true)
  }, [])

  const FORMSPREE_ENDPOINT = 'https://formspree.io/f/mreezwlv'

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return

    setStatus('loading')
    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({ email }),
      })

      if (res.ok) {
        setStatus('success')
        setMessage("You're in! Check your inbox for weekly tips.")
        setEmail('')
      } else {
        setStatus('error')
        setMessage('Subscription failed. Please try again.')
      }
    } catch {
      setStatus('error')
      setMessage('Network error. Please try again.')
    }
  }

  const handleCloudWaitlist = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!cloudEmail) return

    setCloudStatus('loading')
    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          email: cloudEmail,
          source: 'cloud-sync-waitlist',
          interest: 'Substratia Cloud - Cross-device memory sync'
        }),
      })

      if (res.ok) {
        setCloudStatus('success')
        setCloudMessage("You're on the list! We'll notify you when cloud sync launches.")
        setCloudEmail('')
      } else {
        setCloudStatus('error')
        setCloudMessage('Something went wrong. Please try again.')
      }
    } catch {
      setCloudStatus('error')
      setCloudMessage('Network error. Please try again.')
    }
  }

  return (
    <main className="min-h-screen text-white relative">
      {/* Neural pattern background */}
      <div className="neural-bg" />

      {/* Gradient mesh overlay */}
      <div className="fixed inset-0 gradient-mesh pointer-events-none z-0" />

      {/* Hero Section */}
      <section className="relative z-10 min-h-[90vh] flex items-center">
        <div className="container mx-auto px-4 py-20">
          <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: Content */}
            <div className={`${mounted ? 'animate-fade-up' : 'opacity-0'}`}>
              <div className="flex items-center gap-3 mb-6">
                <Image
                  src="/brand/logo-icon.png"
                  alt="Substratia"
                  width={48}
                  height={48}
                  className="rounded-lg"
                />
                <Image
                  src="/brand/wordmark.png"
                  alt="SUBSTRATIA"
                  width={180}
                  height={40}
                  className="h-8 w-auto"
                />
              </div>

              <h1 className="text-4xl md:text-6xl font-bold font-display mb-6 leading-tight">
                Memory Tools for
                <br />
                <span className="text-forge-cyan text-glow-cyan">Claude Code</span>
              </h1>

              <p className="text-xl text-gray-300 mb-8 max-w-xl">
                Stop losing context between sessions. Our open-source tools give Claude Code
                persistent memory - instant context recovery, cross-session recall, and more.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Link
                  href="/start-here"
                  className="px-8 py-4 bg-forge-cyan text-forge-dark font-semibold text-lg rounded-xl hover:bg-forge-cyan/90 transition-all glow-cyan text-center"
                >
                  Start Here
                </Link>
                <Link
                  href="/tools"
                  className="px-8 py-4 bg-white/10 font-semibold text-lg rounded-xl hover:bg-white/20 transition-all text-center"
                >
                  Free Tools
                </Link>
                <a
                  href="https://github.com/WhenMoon-afk"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 py-4 glass hover:bg-white/10 rounded-xl font-semibold text-lg transition-all text-center"
                >
                  View on GitHub
                </a>
              </div>

              <p className="text-sm text-gray-500">
                Used by <span className="text-forge-cyan">575+</span> developers monthly via npm
              </p>
            </div>

            {/* Right: Hero Image */}
            <div className={`relative ${mounted ? 'animate-fade-up delay-200' : 'opacity-0'}`}>
              <div className="relative aspect-square max-w-lg mx-auto">
                <div className="absolute inset-0 bg-gradient-to-br from-forge-cyan/20 to-forge-purple/20 rounded-3xl blur-3xl" />
                <Image
                  src="/brand/hero.png"
                  alt="Neural network to circuit to abstract waves"
                  fill
                  className="object-contain relative z-10 float"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tools Section */}
      <section className="relative z-10 py-24 bg-gradient-to-b from-transparent via-forge-dark-lighter/50 to-transparent">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold font-display mb-4">
              Built for <span className="text-forge-purple">Claude Code Power Users</span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Free, open-source, MIT licensed. The only memory tools built specifically for Claude Code.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {/* momentum */}
            <div className="tool-card gradient-border p-6 rounded-2xl">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-forge-cyan/20 flex items-center justify-center">
                  <svg className="w-6 h-6 text-forge-cyan" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-bold font-mono">momentum</h3>
                  <span className="text-xs text-forge-cyan">Context Recovery</span>
                </div>
              </div>
              <p className="text-gray-400 text-sm mb-4">
                Snapshot your context, restore in milliseconds. Never lose your working state.
              </p>
              <div className="code-block text-xs mb-4">
                <code className="text-forge-cyan">/plugin install momentum@substratia-marketplace</code>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-500">SQLite persistence</span>
                <a
                  href="https://github.com/WhenMoon-afk/momentum"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-forge-cyan hover:underline"
                >
                  GitHub
                </a>
              </div>
            </div>

            {/* memory-mcp */}
            <div className="tool-card gradient-border p-6 rounded-2xl">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-forge-purple/20 flex items-center justify-center">
                  <svg className="w-6 h-6 text-forge-purple" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-bold font-mono">memory-mcp</h3>
                  <span className="text-xs text-forge-purple">Persistent Memory</span>
                </div>
              </div>
              <p className="text-gray-400 text-sm mb-4">
                Store, recall, search facts across sessions. Full-text search, no embeddings needed.
              </p>
              <div className="code-block text-xs mb-4">
                <code className="text-forge-purple">npx @whenmoon-afk/memory-mcp</code>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-500">v2.5.0 on npm</span>
                <a
                  href="https://www.npmjs.com/package/@whenmoon-afk/memory-mcp"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-forge-purple hover:underline"
                >
                  npm
                </a>
              </div>
            </div>

            {/* AgentForge */}
            <div className="tool-card gradient-border p-6 rounded-2xl">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-forge-cyan/20 flex items-center justify-center">
                  <svg className="w-6 h-6 text-forge-cyan" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-bold">AgentForge</h3>
                  <span className="text-xs text-forge-cyan">Visual Builder</span>
                </div>
              </div>
              <p className="text-gray-400 text-sm mb-4">
                Drag-and-drop builder for CLAUDE.md files. 28 capabilities, 13 guardrail rulesets.
              </p>
              <div className="code-block text-xs mb-4">
                <code className="text-gray-400">substratia.io/builder</code>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-500">Free forever</span>
                <Link
                  href="/builder"
                  className="text-sm text-forge-cyan hover:underline"
                >
                  Try Now
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="relative z-10 py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold font-display text-center mb-16">
              How They <span className="text-forge-cyan">Work Together</span>
            </h2>

            <div className="space-y-8">
              <div className="glass-strong rounded-2xl p-6 flex gap-6 items-start">
                <div className="w-12 h-12 rounded-full bg-forge-purple/30 flex items-center justify-center flex-shrink-0 text-xl font-bold">1</div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Context window full?</h3>
                  <p className="text-gray-400">
                    Use <span className="text-forge-cyan font-mono">momentum</span> to snapshot your work,
                    then /clear and restore in &lt;5ms. No context lost.
                  </p>
                </div>
              </div>

              <div className="glass-strong rounded-2xl p-6 flex gap-6 items-start">
                <div className="w-12 h-12 rounded-full bg-forge-purple/30 flex items-center justify-center flex-shrink-0 text-xl font-bold">2</div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">New session tomorrow?</h3>
                  <p className="text-gray-400">
                    Use <span className="text-forge-purple font-mono">memory-mcp</span> to recall facts
                    from past sessions. Your AI actually remembers.
                  </p>
                </div>
              </div>

              <div className="glass-strong rounded-2xl p-6 flex gap-6 items-start">
                <div className="w-12 h-12 rounded-full bg-forge-purple/30 flex items-center justify-center flex-shrink-0 text-xl font-bold">3</div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Building a new agent?</h3>
                  <p className="text-gray-400">
                    Use <span className="text-forge-cyan font-mono">AgentForge</span> to visually
                    configure capabilities and guardrails. Export and deploy.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="relative z-10 py-16">
        <div className="container mx-auto px-4">
          <div className="glass rounded-2xl p-8 max-w-4xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-4xl font-bold text-forge-cyan mb-1">&lt;5ms</div>
                <div className="text-sm text-gray-400">Context restore</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-forge-purple mb-1">3</div>
                <div className="text-sm text-gray-400">Free tools</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-forge-cyan mb-1">FTS5</div>
                <div className="text-sm text-gray-400">Search engine</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-forge-purple mb-1">MIT</div>
                <div className="text-sm text-gray-400">Licensed</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Cloud Sync Waitlist - Primary CTA */}
      <section id="cloud" className="relative z-10 py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-forge-purple/20 via-forge-dark-lighter to-forge-cyan/10 p-8 md:p-12 border border-white/10">
              {/* Decorative elements */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-forge-cyan/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-forge-purple/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

              <div className="relative z-10">
                <div className="flex items-center justify-center gap-3 mb-6">
                  <span className="px-3 py-1 bg-forge-purple/30 border border-forge-purple/50 rounded-full text-xs text-forge-purple font-semibold uppercase tracking-wide">
                    Coming Soon
                  </span>
                </div>

                <h2 className="text-3xl md:text-4xl font-bold font-display text-center mb-4">
                  Substratia <span className="text-forge-cyan text-glow-cyan">Cloud</span>
                </h2>

                <p className="text-xl text-gray-300 text-center mb-6 max-w-2xl mx-auto">
                  Your AI memories, synced everywhere. Never lose context when switching devices.
                </p>

                <div className="grid md:grid-cols-3 gap-6 mb-10">
                  <div className="text-center p-4">
                    <div className="w-12 h-12 rounded-xl bg-forge-cyan/20 flex items-center justify-center mx-auto mb-3">
                      <svg className="w-6 h-6 text-forge-cyan" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                      </svg>
                    </div>
                    <h3 className="font-semibold mb-1">Cloud Backup</h3>
                    <p className="text-sm text-gray-400">Automatic daily backups of your memory database</p>
                  </div>

                  <div className="text-center p-4">
                    <div className="w-12 h-12 rounded-xl bg-forge-purple/20 flex items-center justify-center mx-auto mb-3">
                      <svg className="w-6 h-6 text-forge-purple" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                      </svg>
                    </div>
                    <h3 className="font-semibold mb-1">Cross-Device Sync</h3>
                    <p className="text-sm text-gray-400">Desktop, laptop, work machine - always in sync</p>
                  </div>

                  <div className="text-center p-4">
                    <div className="w-12 h-12 rounded-xl bg-forge-cyan/20 flex items-center justify-center mx-auto mb-3">
                      <svg className="w-6 h-6 text-forge-cyan" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                    </div>
                    <h3 className="font-semibold mb-1">Web Dashboard</h3>
                    <p className="text-sm text-gray-400">Search and browse your memories from any browser</p>
                  </div>
                </div>

                {cloudStatus === 'success' ? (
                  <div className="max-w-md mx-auto bg-green-500/20 border border-green-500/50 rounded-xl p-4 text-green-300 text-center">
                    {cloudMessage}
                  </div>
                ) : (
                  <form onSubmit={handleCloudWaitlist} className="max-w-md mx-auto">
                    <div className="flex flex-col sm:flex-row gap-3">
                      <input
                        type="email"
                        value={cloudEmail}
                        onChange={(e) => setCloudEmail(e.target.value)}
                        placeholder="Enter your email for early access"
                        aria-label="Email address for cloud sync waitlist"
                        required
                        className="flex-1 px-4 py-3 bg-white/5 border border-white/20 rounded-xl focus:outline-none focus:border-forge-cyan transition-all text-center sm:text-left"
                      />
                      <button
                        type="submit"
                        disabled={cloudStatus === 'loading'}
                        className="px-6 py-3 bg-forge-cyan text-forge-dark font-semibold rounded-xl hover:bg-forge-cyan/90 transition-all glow-cyan disabled:opacity-50 whitespace-nowrap"
                      >
                        {cloudStatus === 'loading' ? 'Joining...' : 'Join Waitlist'}
                      </button>
                    </div>
                    <p className="text-xs text-gray-500 text-center mt-3">
                      Free tools stay free forever. Cloud features are optional.
                    </p>
                  </form>
                )}
                {cloudStatus === 'error' && (
                  <p className="mt-4 text-red-400 text-sm text-center">{cloudMessage}</p>
                )}

                <div className="flex items-center justify-center gap-6 mt-8 text-sm text-gray-500">
                  <span className="flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    $9/month planned
                  </span>
                  <span className="flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Early access discount
                  </span>
                  <Link href="/cloud" className="text-forge-cyan hover:underline">
                    Learn more
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section id="waitlist" className="relative z-10 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-xl mx-auto text-center">
            <h2 className="text-2xl font-bold mb-4">Stay Updated</h2>
            <p className="text-gray-400 mb-6">
              Get weekly Claude Code tips, new tool announcements, and best practices.
            </p>
            {status === 'success' ? (
              <div className="bg-green-500/20 border border-green-500/50 rounded-xl p-4 text-green-300">
                {message}
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-4">
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
                  className="px-6 py-3 bg-forge-purple hover:bg-forge-purple/80 rounded-xl font-semibold transition-all disabled:opacity-50"
                >
                  {status === 'loading' ? 'Subscribing...' : 'Subscribe'}
                </button>
              </form>
            )}
            {status === 'error' && (
              <p className="mt-4 text-red-400 text-sm">{message}</p>
            )}
          </div>
        </div>
      </section>

      {/* Community / Coverage */}
      <section className="relative z-10 py-24 bg-gradient-to-b from-transparent via-forge-dark-lighter/30 to-transparent">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold font-display text-center mb-4">
            Listed on <span className="text-forge-cyan">9+ Directories</span>
          </h2>
          <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
            memory-mcp has been indexed by the MCP community with zero marketing spend.
          </p>
          <div className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto">
            {[
              { name: 'PulseMCP', url: 'https://pulsemcp.com/servers/whenmoon-memory' },
              { name: 'Glama.ai', url: 'https://glama.ai/mcp/servers/@WhenMoon-afk/claude-memory-mcp' },
              { name: 'LobeHub', url: 'https://lobehub.com/mcp/whenmoon-afk-claude-memory-mcp' },
              { name: 'mcp.so', url: 'https://mcp.so/server/claude-memory-mcp/WhenMoon-afk' },
              { name: 'playbooks.com', url: 'https://playbooks.com/mcp/whenmoon-memory' },
              { name: 'awesome-mcp-servers', url: 'https://github.com/TensorBlock/awesome-mcp-servers' },
            ].map((dir) => (
              <a
                key={dir.name}
                href={dir.url}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 glass hover:bg-white/10 rounded-lg text-sm text-gray-300 hover:text-white transition-all"
              >
                {dir.name}
              </a>
            ))}
          </div>
          <p className="text-center text-gray-500 text-sm mt-8">
            575+ npm downloads in the last 30 days
          </p>
        </div>
      </section>

      {/* Support Section */}
      <section className="relative z-10 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl font-bold mb-4">Support Development</h2>
            <p className="text-gray-400 mb-6">
              These tools are free forever. If they help you, consider supporting continued development.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="https://github.com/sponsors/WhenMoon-afk"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 glass hover:bg-white/10 rounded-xl font-medium transition-all"
              >
                GitHub Sponsors
              </a>
              <a
                href="https://ko-fi.com/substratia"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 glass hover:bg-white/10 rounded-xl font-medium transition-all"
              >
                Ko-fi
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/10 py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-3">
              <Image
                src="/brand/logo-icon.png"
                alt="Substratia"
                width={32}
                height={32}
                className="rounded-lg"
              />
              <span className="font-semibold">Substratia</span>
              <span className="text-gray-500 text-sm">Memory Infrastructure for AI</span>
            </div>

            <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-400">
              <Link href="/templates" className="hover:text-white transition-all">Memory</Link>
              <Link href="/tools" className="hover:text-white transition-all">Tools</Link>
              <Link href="/reviews" className="hover:text-white transition-all">Reviews</Link>
              <Link href="/blog" className="hover:text-white transition-all">Blog</Link>
              <Link href="/docs" className="hover:text-white transition-all">Docs</Link>
              <a href="https://github.com/WhenMoon-afk" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-all">GitHub</a>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-white/5 text-center text-sm text-gray-500">
            <p className="font-mono">Intelligence is substrate-agnostic.</p>
            <p className="mt-2">Built by practitioners.</p>
          </div>
        </div>
      </footer>
    </main>
  )
}

