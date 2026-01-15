import Link from 'next/link'
import ShareButton from '@/components/ShareButton'

export default function AnnouncingSubstratiaCloudPage() {
  return (
    <article className="min-h-screen text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <Link href="/blog" className="text-forge-cyan hover:underline text-sm">
              ← Back to Blog
            </Link>
            <ShareButton title="Announcing Substratia Cloud - Your Claude Code Memories, Everywhere" />
          </div>

          <div className="mb-8">
            <div className="flex gap-2 mb-4">
              <span className="px-2 py-1 bg-forge-cyan/20 text-forge-cyan text-xs rounded">Announcement</span>
              <span className="px-2 py-1 bg-yellow-500/20 text-yellow-400 text-xs rounded">Coming Soon</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Announcing Substratia Cloud: Your Claude Code Memories, Everywhere
            </h1>
            <p className="text-gray-400">
              January 12, 2026 · 6 min read
            </p>
          </div>

          {/* Lead */}
          <div className="text-xl text-gray-300 mb-12 leading-relaxed">
            <p>
              You&apos;ve spent hours teaching Claude about your codebase. Your preferences, your patterns,
              your project structure—all carefully built up over countless sessions. Then you switch to
              your laptop, and it&apos;s all gone. <strong>We&apos;re building something to fix that.</strong>
            </p>
          </div>

          {/* CTA Banner */}
          <div className="bg-gradient-to-r from-forge-purple/20 to-forge-cyan/20 rounded-xl p-6 mb-12 border border-white/10">
            <p className="text-center text-lg mb-4">
              Be the first to know when Substratia Cloud launches
            </p>
            <div className="flex justify-center">
              <Link
                href="/cloud"
                className="px-6 py-3 bg-forge-cyan text-black font-semibold rounded-lg hover:bg-forge-cyan/90 transition-colors"
              >
                Join the Waitlist →
              </Link>
            </div>
          </div>

          {/* Content */}
          <div className="prose prose-invert prose-lg max-w-none">
            {/* The Problem */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-forge-cyan mb-4">The Problem We&apos;re Solving</h2>
              <p className="text-gray-300 mb-4">
                If you use Claude Code daily, you know the pain:
              </p>
              <ul className="list-disc pl-6 text-gray-300 space-y-2 mb-4">
                <li><strong>Desktop to laptop</strong> → memories don&apos;t sync</li>
                <li><strong>Work to home machine</strong> → context is lost</li>
                <li><strong>New device setup</strong> → start from zero</li>
                <li><strong>Accidental data loss</strong> → no backups</li>
              </ul>
              <p className="text-gray-300 mb-4">
                Our open-source tools—<Link href="/templates" className="text-forge-cyan hover:underline">momentum</Link> and{' '}
                <Link href="/templates" className="text-forge-cyan hover:underline">memory-mcp</Link>—solve
                the local storage problem brilliantly. Thousands of developers use them daily to give Claude
                persistent memory.
              </p>
              <p className="text-gray-300">
                But local storage has limits. Your memories are trapped on one machine.
              </p>
            </section>

            {/* The Vision */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-forge-cyan mb-4">Our Vision: Memory Without Boundaries</h2>
              <p className="text-gray-300 mb-4">
                Substratia Cloud is the natural evolution of our memory infrastructure. One simple idea:
              </p>
              <div className="bg-white/5 rounded-xl p-6 mb-6">
                <p className="text-xl text-center font-medium">
                  &quot;Your Claude Code memories should follow you, not stay behind.&quot;
                </p>
              </div>
              <p className="text-gray-300 mb-4">
                We&apos;re not replacing your local tools—we&apos;re supercharging them. The same momentum
                snapshots, the same memory-mcp knowledge base, now synced seamlessly across every device
                you use.
              </p>
            </section>

            {/* What We're Building */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-forge-cyan mb-4">What We&apos;re Building</h2>

              <h3 className="text-xl font-semibold mt-8 mb-4">1. Cloud Backup</h3>
              <p className="text-gray-300 mb-4">
                Automatic, encrypted backups of your memory databases. Never lose context again—even if
                your laptop dies, your memories are safe. One-click restore to any machine.
              </p>

              <h3 className="text-xl font-semibold mt-8 mb-4">2. Cross-Device Sync</h3>
              <p className="text-gray-300 mb-4">
                Real-time synchronization between all your machines. Start a project on your desktop,
                continue on your laptop, finish on your home machine—Claude remembers everything from
                every session, everywhere.
              </p>

              <h3 className="text-xl font-semibold mt-8 mb-4">3. Web Dashboard</h3>
              <p className="text-gray-300 mb-4">
                Browse, search, and manage your Claude Code memories from any browser. See what Claude
                remembers, organize memories into collections, clean up outdated context—without touching
                the command line.
              </p>
              <div className="bg-white/5 rounded-xl p-6 mb-6">
                <h4 className="font-semibold mb-3">Dashboard Features (Planned)</h4>
                <ul className="text-gray-300 space-y-2">
                  <li>✓ Full-text search across all memories</li>
                  <li>✓ Memory timeline visualization</li>
                  <li>✓ Project-based organization</li>
                  <li>✓ Bulk export and import</li>
                  <li>✓ Usage analytics and insights</li>
                </ul>
              </div>
            </section>

            {/* Open Core Model */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-forge-cyan mb-4">Our Commitment: Open Core Forever</h2>
              <p className="text-gray-300 mb-4">
                Let&apos;s be clear about what&apos;s free and what&apos;s not:
              </p>
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div className="bg-green-500/10 rounded-xl p-6 border border-green-500/20">
                  <h3 className="font-bold text-green-400 mb-3">Forever Free</h3>
                  <ul className="text-gray-300 space-y-2 text-sm">
                    <li>✓ momentum (context recovery)</li>
                    <li>✓ memory-mcp (persistent memory)</li>
                    <li>✓ Local storage, unlimited</li>
                    <li>✓ All CLI features</li>
                    <li>✓ Open source, MIT license</li>
                  </ul>
                </div>
                <div className="bg-forge-purple/10 rounded-xl p-6 border border-forge-purple/20">
                  <h3 className="font-bold text-forge-purple mb-3">Cloud (Paid)</h3>
                  <ul className="text-gray-300 space-y-2 text-sm">
                    <li>○ Cloud backup & sync</li>
                    <li>○ Web dashboard</li>
                    <li>○ Cross-device memory</li>
                    <li>○ Team collaboration</li>
                    <li>○ Priority support</li>
                  </ul>
                </div>
              </div>
              <p className="text-gray-300">
                Our local tools work perfectly offline, forever. Cloud is for those who want
                convenience—the same great tools, managed and synced for you.
              </p>
            </section>

            {/* Pricing Philosophy */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-forge-cyan mb-4">Pricing Philosophy</h2>
              <p className="text-gray-300 mb-4">
                We&apos;re still finalizing pricing, but here&apos;s our thinking:
              </p>
              <ul className="list-disc pl-6 text-gray-300 space-y-2 mb-4">
                <li><strong>Solo developers</strong>: ~$9/month for personal cloud sync</li>
                <li><strong>Teams</strong>: ~$19/seat/month with shared knowledge bases</li>
                <li><strong>Enterprise</strong>: Custom pricing with SSO, compliance, SLAs</li>
              </ul>
              <p className="text-gray-300 mb-4">
                Our goal isn&apos;t to extract maximum value—it&apos;s to be affordable enough
                that cloud sync is an obvious choice for anyone who uses Claude Code on multiple machines.
              </p>
              <p className="text-gray-300">
                Early waitlist members will get founding member pricing—locked in for life.
              </p>
            </section>

            {/* Timeline */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-forge-cyan mb-4">Timeline</h2>
              <p className="text-gray-300 mb-4">
                We&apos;re being honest: this is early. We&apos;re validating demand before building.
              </p>
              <div className="bg-white/5 rounded-xl p-6 mb-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <span className="w-20 text-forge-cyan font-mono text-sm">Now</span>
                    <span className="text-gray-300">Waitlist open, gathering feedback</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="w-20 text-gray-500 font-mono text-sm">Q1 2026</span>
                    <span className="text-gray-400">Alpha with early adopters</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="w-20 text-gray-500 font-mono text-sm">Q2 2026</span>
                    <span className="text-gray-400">Public beta launch</span>
                  </div>
                </div>
              </div>
              <p className="text-gray-300">
                If you join the waitlist, you&apos;re helping us prioritize features. Tell us what matters
                most to you.
              </p>
            </section>

            {/* Why Now */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-forge-cyan mb-4">Why We&apos;re Building This</h2>
              <p className="text-gray-300 mb-4">
                We built momentum because we kept losing our own context. We built memory-mcp because
                Claude kept forgetting our conversations. Now we&apos;re building Substratia Cloud
                because we work on multiple machines and got tired of our memories being stuck.
              </p>
              <p className="text-gray-300 mb-4">
                This isn&apos;t speculative product development. This is scratching our own itch,
                then offering the solution to everyone else who has the same problem.
              </p>
              <p className="text-gray-300">
                575+ developers already use our npm packages monthly. This is the next step.
              </p>
            </section>

            {/* Final CTA */}
            <section className="mb-12">
              <div className="bg-gradient-to-r from-forge-purple/20 to-forge-cyan/20 rounded-xl p-8 border border-white/10 text-center">
                <h2 className="text-2xl font-bold mb-4">Ready to Never Lose Context Again?</h2>
                <p className="text-gray-300 mb-6 max-w-xl mx-auto">
                  Join the waitlist for Substratia Cloud. Be first to try it, lock in founding
                  member pricing, and help shape what we build.
                </p>
                <Link
                  href="/cloud"
                  className="inline-block px-8 py-4 bg-forge-cyan text-black font-semibold rounded-lg hover:bg-forge-cyan/90 transition-colors"
                >
                  Join the Waitlist →
                </Link>
              </div>
            </section>
          </div>

          {/* Author */}
          <div className="border-t border-white/10 pt-8 mt-12">
            <p className="text-gray-400 text-sm">
              Written by the Substratia team. Questions? Reach out at{' '}
              <a href="mailto:hello@substratia.io" className="text-forge-cyan hover:underline">
                hello@substratia.io
              </a>
            </p>
          </div>

          {/* Related Posts */}
          <div className="mt-12 pt-8 border-t border-white/10">
            <h3 className="font-bold mb-6">Related Articles</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <Link href="/blog/context-management-guide" className="block p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors">
                <span className="text-forge-cyan text-sm">Guide</span>
                <h4 className="font-semibold mt-1">The Ultimate Guide to Claude Code Context Management</h4>
              </Link>
              <Link href="/blog/context-window-churn" className="block p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors">
                <span className="text-forge-cyan text-sm">Productivity</span>
                <h4 className="font-semibold mt-1">The Real Cost of Context Window Churn</h4>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BlogPosting',
            headline: 'Announcing Substratia Cloud: Your Claude Code Memories, Everywhere',
            description: 'Introducing Substratia Cloud - cloud backup, cross-device sync, and web dashboard for your Claude Code memories.',
            datePublished: '2026-01-12',
            author: {
              '@type': 'Organization',
              name: 'Substratia'
            },
            publisher: {
              '@type': 'Organization',
              name: 'Substratia',
              url: 'https://substratia.io'
            }
          })
        }}
      />
    </article>
  )
}
