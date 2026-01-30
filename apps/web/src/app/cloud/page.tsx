import Link from 'next/link'
import Image from 'next/image'

export default function CloudPage() {
  return (
    <main className="min-h-screen text-white relative">
      {/* Neural pattern background */}
      <div className="neural-bg" />
      <div className="fixed inset-0 gradient-mesh pointer-events-none z-0" />

      {/* Hero */}
      <section className="relative z-10 pt-32 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold font-display mb-6 leading-tight">
              Open Source <span className="text-forge-cyan text-glow-cyan">Developer Tools</span>
            </h1>

            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              All Substratia tools are free, open source, and MIT licensed.
              Built by developers, for developers.
            </p>

            <div className="max-w-md mx-auto">
              <Link
                href="/start-here"
                className="block w-full px-8 py-4 bg-forge-cyan text-forge-dark font-bold text-lg rounded-xl hover:bg-forge-cyan/90 transition-all glow-cyan text-center mb-4"
              >
                Get Started
              </Link>
              <p className="text-gray-400 text-sm text-center">
                No sign-up required.{' '}
                <a
                  href="https://github.com/WhenMoon-afk"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-forge-cyan hover:underline"
                >
                  View on GitHub
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Tools Overview */}
      <section className="relative z-10 py-24 bg-gradient-to-b from-transparent via-forge-dark-lighter/50 to-transparent">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold font-display text-center mb-12">
              What We <span className="text-forge-purple">Build</span>
            </h2>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="glass-strong rounded-2xl p-8">
                <div className="w-14 h-14 rounded-xl bg-forge-purple/20 flex items-center justify-center mb-6">
                  <svg className="w-7 h-7 text-forge-purple" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-3">memory-mcp</h3>
                <p className="text-gray-400">
                  Persistent memory for Claude Code. Store decisions, preferences,
                  and learnings that survive across sessions. Local SQLite storage.
                </p>
              </div>

              <div className="glass-strong rounded-2xl p-8">
                <div className="w-14 h-14 rounded-xl bg-forge-cyan/20 flex items-center justify-center mb-6">
                  <svg className="w-7 h-7 text-forge-cyan" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-3">momentum</h3>
                <p className="text-gray-400">
                  Context recovery for Claude Code. Pick up exactly where you left off,
                  even after context window resets.
                </p>
              </div>

              <div className="glass-strong rounded-2xl p-8">
                <div className="w-14 h-14 rounded-xl bg-forge-cyan/20 flex items-center justify-center mb-6">
                  <svg className="w-7 h-7 text-forge-cyan" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-3">AgentForge</h3>
                <p className="text-gray-400">
                  Visual drag-and-drop builder for CLAUDE.md files. 28 capabilities,
                  13 guardrail rulesets, instant export.
                </p>
              </div>

              <div className="glass-strong rounded-2xl p-8">
                <div className="w-14 h-14 rounded-xl bg-forge-purple/20 flex items-center justify-center mb-6">
                  <svg className="w-7 h-7 text-forge-purple" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-3">Developer Tools</h3>
                <p className="text-gray-400">
                  Token counter, prompt optimizer, cheat sheet, stack builder,
                  and more. All free, all browser-based.
                </p>
              </div>
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
              <span className="text-gray-500 text-sm">Open Source Developer Tools</span>
            </div>

            <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-400">
              <Link href="/" className="hover:text-white transition-all">Home</Link>
              <Link href="/tools" className="hover:text-white transition-all">Tools</Link>
              <Link href="/blog" className="hover:text-white transition-all">Blog</Link>
              <Link href="/docs" className="hover:text-white transition-all">Docs</Link>
              <a href="https://github.com/WhenMoon-afk" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-all">GitHub</a>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
            <p className="font-mono text-center md:text-left">Intelligence is substrate-agnostic.</p>
            <div className="flex gap-4 text-xs text-gray-500">
              <Link href="/privacy" className="hover:text-gray-300 transition-all">Privacy Policy</Link>
              <Link href="/terms" className="hover:text-gray-300 transition-all">Terms of Service</Link>
            </div>
          </div>
        </div>
      </footer>
    </main>
  )
}
