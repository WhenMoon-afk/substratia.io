import Link from 'next/link'
import ShareButton from '@/components/ShareButton'

export default function PricingPage() {
  return (
    <main className="min-h-screen text-white py-16">
      <div className="container mx-auto px-4">
        <div className="flex justify-end mb-4">
          <ShareButton title="Substratia - Open Source Developer Tools" />
        </div>

        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            100% <span className="text-forge-cyan">Free &amp; Open Source</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            All Substratia tools are free, open source, and MIT licensed. No paid tiers, no sign-up required.
          </p>
        </div>

        {/* Single Free Tier */}
        <div className="max-w-lg mx-auto mb-24">
          <div className="bg-gradient-to-b from-forge-cyan/10 to-forge-dark border-2 border-forge-cyan/30 rounded-2xl p-8 relative">
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-forge-cyan text-forge-dark rounded-full text-sm font-bold">
              Everything Included
            </div>
            <h3 className="text-2xl font-bold mb-2 text-center">Free Forever</h3>
            <div className="flex items-baseline justify-center gap-1 mb-4">
              <span className="text-5xl font-bold">$0</span>
              <span className="text-gray-400">forever</span>
            </div>
            <p className="text-gray-400 mb-6 text-center">All tools, no limits, no catch.</p>

            <Link
              href="/start-here"
              className="block w-full text-center py-3 rounded-lg font-semibold transition-all mb-8 bg-forge-cyan hover:bg-forge-cyan/80 text-forge-dark"
            >
              Get Started
            </Link>

            <ul className="space-y-3">
              {[
                'memory-mcp - Persistent memory for Claude Code',
                'momentum - Context recovery across sessions',
                'AgentForge - Visual CLAUDE.md builder',
                'All developer tools and utilities',
                'Unlimited local memories (SQLite)',
                'Automatic memory via hooks',
                'Export to .md files',
                'MIT licensed - use however you want',
                'Community support on GitHub',
              ].map((feature) => (
                <li key={feature} className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-forge-cyan flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-300">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Open Source Commitment */}
        <div className="max-w-3xl mx-auto mb-24 text-center">
          <h2 className="text-3xl font-bold mb-6">
            <span className="text-forge-cyan">Open Source</span> Commitment
          </h2>
          <p className="text-gray-400 text-lg mb-8">
            All Substratia tools are MIT licensed and will remain free forever.
            We believe AI developer tools should be accessible to everyone.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="https://github.com/WhenMoon-afk/claude-memory-mcp"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-white/10 hover:bg-white/20 rounded-lg font-medium transition-all"
            >
              View on GitHub
            </a>
            <Link
              href="/tools/memory-demo"
              className="px-6 py-3 bg-forge-cyan/20 border border-forge-cyan/50 hover:bg-forge-cyan/30 rounded-lg font-medium transition-all text-forge-cyan"
            >
              Try Interactive Demo
            </Link>
          </div>
        </div>

        {/* FAQ */}
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            Frequently Asked <span className="text-forge-cyan">Questions</span>
          </h2>
          <div className="space-y-6">
            {[
              {
                id: 'faq-free',
                q: 'Are all the tools really free?',
                a: 'Yes! Every tool on Substratia is open source under MIT license. You can use, modify, and distribute them freely. No hidden costs.',
              },
              {
                id: 'faq-selfhost',
                q: 'Can I self-host everything?',
                a: 'Absolutely. All tools run locally on your machine. Your data stays on your device. No server required.',
              },
              {
                id: 'faq-support',
                q: 'How do I get support?',
                a: 'Open an issue on GitHub or join the community discussions. We actively maintain all repositories.',
              },
              {
                id: 'faq-contribute',
                q: 'Can I contribute?',
                a: 'Yes! We welcome contributions. Check the GitHub repos for contribution guidelines and open issues.',
              },
            ].map((faq) => (
              <div key={faq.id} id={faq.id} className="bg-white/5 border border-white/10 rounded-xl p-6 scroll-mt-24">
                <h3 className="font-semibold mb-2">{faq.q}</h3>
                <p className="text-gray-400">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-16 py-12 bg-gradient-to-r from-forge-purple/20 to-forge-cyan/20 rounded-2xl">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-gray-400 mb-8">Free, open source, and built for Claude Code developers.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/tools/memory-demo"
              className="px-8 py-4 bg-forge-cyan hover:bg-forge-cyan/80 text-forge-dark rounded-lg font-semibold text-lg transition-all"
            >
              Try Memory Demo
            </Link>
            <Link
              href="/start-here"
              className="px-8 py-4 border border-white/30 hover:bg-white/10 rounded-lg font-semibold text-lg transition-all"
            >
              Get Started
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}
