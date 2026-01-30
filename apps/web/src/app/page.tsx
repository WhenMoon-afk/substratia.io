'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'

// Loading skeleton component for stats
function StatSkeleton() {
  return <span className="inline-block w-12 h-4 bg-gray-700 rounded animate-pulse" />
}

export default function Home() {
  const [mounted, setMounted] = useState(false)
  const [npmDownloads, setNpmDownloads] = useState<number | null>(null)
  const [githubStars, setGithubStars] = useState<number | null>(null)
  const [statsLoading, setStatsLoading] = useState(true)

  useEffect(() => {
    setMounted(true)
    // Fetch npm download count and GitHub stars in parallel
    Promise.all([
      fetch('https://api.npmjs.org/downloads/point/last-month/claude-memory-mcp')
        .then(res => res.json())
        .then(data => {
          if (data.downloads) {
            setNpmDownloads(data.downloads)
          }
        })
        .catch(() => {}),
      fetch('https://api.github.com/repos/WhenMoon-afk/claude-memory-mcp')
        .then(res => res.json())
        .then(data => {
          if (data.stargazers_count) {
            setGithubStars(data.stargazers_count)
          }
        })
        .catch(() => {})
    ]).finally(() => {
      setStatsLoading(false)
    })
  }, [])

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
                Never Explain Twice
              </h1>

              <p className="text-xl text-gray-300 mb-8 max-w-xl">
                Open-source memory tools for Claude Code. Your AI remembers decisions,
                preferences, and context across every session.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Link
                  href="/start-here"
                  className="px-8 py-4 bg-forge-cyan text-forge-dark font-semibold text-lg rounded-xl hover:bg-forge-cyan/90 transition-all glow-cyan text-center"
                >
                  Get Started
                </Link>
              </div>

              <p className="text-sm text-gray-500">
                Free &amp; open source
                {statsLoading ? (
                  <> &bull; <StatSkeleton /></>
                ) : (
                  <>
                    {githubStars && <> &bull; <span className="text-forge-purple">{githubStars}</span> GitHub stars</>}
                    {npmDownloads && <> &bull; <span className="text-forge-cyan">{npmDownloads.toLocaleString()}+</span> npm downloads</>}
                  </>
                )}
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
            {/* Interactive Demo */}
            <Link href="/tools/memory-demo" className="tool-card gradient-border p-6 rounded-2xl block hover:border-forge-cyan/50 transition-all">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-forge-cyan/20 flex items-center justify-center">
                  <svg className="w-6 h-6 text-forge-cyan" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-bold">Try Demo</h3>
                  <span className="text-xs text-forge-cyan">See Memory in Action</span>
                </div>
              </div>
              <p className="text-gray-400 text-sm mb-4">
                Experience how Claude remembers decisions, preferences, and learnings across sessions.
              </p>
              <div className="code-block text-xs mb-4">
                <code className="text-forge-cyan">Interactive • No signup</code>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-500">3 demo scenarios</span>
                <span className="text-sm text-forge-cyan">
                  Try Now →
                </span>
              </div>
            </Link>

            {/* memory-mcp */}
            <div className="tool-card gradient-border p-6 rounded-2xl border-2 border-forge-purple/30">
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
                Store decisions, preferences, learnings. Automatic hooks save important context.
              </p>
              <div className="code-block text-xs mb-4">
                <code className="text-forge-purple">/plugin install memory-mcp@substratia-marketplace</code>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-500">MIT licensed</span>
                <a
                  href="https://github.com/WhenMoon-afk/claude-memory-mcp"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-forge-purple hover:underline"
                >
                  GitHub
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

      {/* Testimonials */}
      <section className="relative z-10 py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold font-display text-center mb-12">
            What <span className="text-forge-purple">Developers</span> Are Saying
          </h2>
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              {
                quote: "Finally, Claude remembers my project conventions. No more re-explaining my stack every session.",
                author: "Senior Dev",
                role: "Full-Stack Engineer",
              },
              {
                quote: "The 2-line setup is real. Installed memory-mcp and Claude immediately started referencing past decisions.",
                author: "Tech Lead",
                role: "Startup CTO",
              },
              {
                quote: "AgentForge saved me hours of trial and error with CLAUDE.md. The guardrails alone are worth it.",
                author: "Solo Dev",
                role: "Indie Hacker",
              },
            ].map((testimonial, i) => (
              <div
                key={i}
                className="gradient-border rounded-xl p-6 bg-forge-dark-lighter/30"
              >
                <svg className="w-8 h-8 text-forge-purple/40 mb-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
                <p className="text-gray-300 mb-4 text-sm leading-relaxed">
                  &ldquo;{testimonial.quote}&rdquo;
                </p>
                <div className="border-t border-white/10 pt-4">
                  <p className="text-white font-medium text-sm">{testimonial.author}</p>
                  <p className="text-gray-500 text-xs">{testimonial.role}</p>
                </div>
              </div>
            ))}
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
            {statsLoading ? (
              <StatSkeleton />
            ) : (
              <>
                {githubStars && <><span className="text-forge-purple">{githubStars}</span> GitHub stars</>}
                {githubStars && npmDownloads && ' · '}
                {npmDownloads && <><span className="text-forge-cyan">{npmDownloads.toLocaleString()}+</span> npm downloads/month</>}
              </>
            )}
          </p>
        </div>
      </section>
    </main>
  )
}

