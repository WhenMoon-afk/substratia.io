'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

export default function CloudPage() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

  const FORMSPREE_ENDPOINT = 'https://formspree.io/f/mreezwlv'

  const handleSubmit = async (e: React.FormEvent) => {
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
        body: JSON.stringify({
          email,
          source: 'cloud-landing-page',
          interest: 'Substratia Cloud - Early Access'
        }),
      })

      if (res.ok) {
        setStatus('success')
        setMessage("You're on the list! We'll email you when early access opens.")
        setEmail('')
      } else {
        setStatus('error')
        setMessage('Something went wrong. Please try again.')
      }
    } catch {
      setStatus('error')
      setMessage('Network error. Please try again.')
    }
  }

  return (
    <main className="min-h-screen text-white relative">
      {/* Neural pattern background */}
      <div className="neural-bg" />
      <div className="fixed inset-0 gradient-mesh pointer-events-none z-0" />

      {/* Hero */}
      <section className="relative z-10 pt-32 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-block px-4 py-1 bg-forge-cyan/30 border border-forge-cyan/50 rounded-full text-sm text-forge-cyan font-semibold uppercase tracking-wide mb-6">
              Early Access
            </div>

            <h1 className="text-4xl md:text-6xl font-bold font-display mb-6 leading-tight">
              Substratia <span className="text-forge-cyan text-glow-cyan">Cloud</span>
            </h1>

            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Your Claude Code memories, synced across all your devices.
              Never lose context when switching machines.
            </p>

            {/* Quick stats */}
            <div className="flex flex-wrap justify-center gap-8 mb-12 text-sm">
              <div className="flex items-center gap-2 text-gray-400">
                <svg className="w-5 h-5 text-forge-cyan" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Free tools stay free forever
              </div>
              <div className="flex items-center gap-2 text-gray-400">
                <svg className="w-5 h-5 text-forge-cyan" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Early access discount
              </div>
              <div className="flex items-center gap-2 text-gray-400">
                <svg className="w-5 h-5 text-forge-cyan" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Your data, encrypted
              </div>
            </div>

            {/* Early Access CTA */}
            <div className="max-w-md mx-auto">
              <Link
                href="/sign-up"
                className="block w-full px-8 py-4 bg-forge-cyan text-forge-dark font-bold text-lg rounded-xl hover:bg-forge-cyan/90 transition-all glow-cyan text-center mb-4"
              >
                Try Early Access Free
              </Link>
              <p className="text-gray-400 text-sm text-center mb-6">
                Already have an account?{' '}
                <Link href="/sign-in" className="text-forge-cyan hover:underline">
                  Sign in
                </Link>
              </p>

              <div className="relative my-8">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-white/10"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-forge-dark text-gray-500">or get notified at launch</span>
                </div>
              </div>

              {status === 'success' ? (
                <div className="bg-green-500/20 border border-green-500/50 rounded-xl p-6 text-green-300">
                  <svg className="w-12 h-12 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {message}
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email for launch updates"
                    required
                    className="w-full px-4 py-4 bg-white/5 border border-white/20 rounded-xl focus:outline-none focus:border-forge-cyan transition-all text-center text-lg"
                  />
                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="w-full px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-semibold text-lg rounded-xl transition-all disabled:opacity-50"
                  >
                    {status === 'loading' ? 'Joining...' : 'Join Waitlist'}
                  </button>
                </form>
              )}
              {status === 'error' && (
                <p className="mt-4 text-red-400 text-sm">{message}</p>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* The Problem */}
      <section className="relative z-10 py-24 bg-gradient-to-b from-transparent via-forge-dark-lighter/50 to-transparent">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold font-display text-center mb-12">
              The <span className="text-forge-purple">Problem</span>
            </h2>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="glass-strong rounded-2xl p-6 text-center">
                <div className="text-4xl mb-4">💻</div>
                <h3 className="font-semibold mb-2">Multiple Machines</h3>
                <p className="text-gray-400 text-sm">
                  Laptop at home, desktop at work, MacBook on the go.
                  Each has its own memory database.
                </p>
              </div>

              <div className="glass-strong rounded-2xl p-6 text-center">
                <div className="text-4xl mb-4">🔄</div>
                <h3 className="font-semibold mb-2">Context Loss</h3>
                <p className="text-gray-400 text-sm">
                  Switch devices and lose all accumulated context.
                  Start over every time.
                </p>
              </div>

              <div className="glass-strong rounded-2xl p-6 text-center">
                <div className="text-4xl mb-4">💾</div>
                <h3 className="font-semibold mb-2">No Backup</h3>
                <p className="text-gray-400 text-sm">
                  Local SQLite database. One hardware failure
                  and months of memories are gone.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Solution */}
      <section className="relative z-10 py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold font-display text-center mb-12">
              The <span className="text-forge-cyan">Solution</span>
            </h2>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="glass-strong rounded-2xl p-8">
                <div className="w-14 h-14 rounded-xl bg-forge-cyan/20 flex items-center justify-center mb-6">
                  <svg className="w-7 h-7 text-forge-cyan" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-3">Automatic Cloud Backup</h3>
                <p className="text-gray-400">
                  Your memory database backed up daily. Never lose months of
                  accumulated context to a hardware failure or accidental deletion.
                </p>
              </div>

              <div className="glass-strong rounded-2xl p-8">
                <div className="w-14 h-14 rounded-xl bg-forge-purple/20 flex items-center justify-center mb-6">
                  <svg className="w-7 h-7 text-forge-purple" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-3">Cross-Device Sync</h3>
                <p className="text-gray-400">
                  Work on your laptop, continue on your desktop. Your Claude Code
                  memories follow you across all your machines automatically.
                </p>
              </div>

              <div className="glass-strong rounded-2xl p-8">
                <div className="w-14 h-14 rounded-xl bg-forge-cyan/20 flex items-center justify-center mb-6">
                  <svg className="w-7 h-7 text-forge-cyan" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-3">Web Dashboard</h3>
                <p className="text-gray-400">
                  Search and browse your memories from any browser. Review past
                  sessions, find that snippet you remember saving.
                </p>
              </div>

              <div className="glass-strong rounded-2xl p-8">
                <div className="w-14 h-14 rounded-xl bg-forge-purple/20 flex items-center justify-center mb-6">
                  <svg className="w-7 h-7 text-forge-purple" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-3">End-to-End Encrypted</h3>
                <p className="text-gray-400">
                  Your memories are encrypted before leaving your machine.
                  We can store them but we cannot read them.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="relative z-10 py-24 bg-gradient-to-b from-transparent via-forge-dark-lighter/50 to-transparent">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold font-display text-center mb-4">
              Simple, <span className="text-forge-cyan">Transparent</span> Pricing
            </h2>
            <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
              Free tools stay free forever. Cloud is optional for those who want
              the convenience of sync and backup.
            </p>

            <div className="grid md:grid-cols-3 gap-6">
              {/* Free */}
              <div className="glass rounded-2xl p-8">
                <div className="text-sm text-gray-500 uppercase tracking-wide mb-2">Free Forever</div>
                <div className="text-4xl font-bold mb-1">$0</div>
                <div className="text-gray-400 text-sm mb-6">Local tools, no cloud</div>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start gap-2 text-sm">
                    <svg className="w-5 h-5 text-forge-cyan flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>momentum context recovery</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm">
                    <svg className="w-5 h-5 text-forge-cyan flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>memory-mcp persistence</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm">
                    <svg className="w-5 h-5 text-forge-cyan flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Local SQLite storage</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm">
                    <svg className="w-5 h-5 text-forge-cyan flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Works offline</span>
                  </li>
                </ul>
                <Link
                  href="/start-here"
                  className="block w-full px-6 py-3 bg-white/10 hover:bg-white/20 rounded-xl font-semibold text-center transition-all"
                >
                  Get Started Free
                </Link>
              </div>

              {/* Pro */}
              <div className="gradient-border rounded-2xl p-8 relative">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-forge-cyan text-forge-dark text-xs font-bold rounded-full">
                  MOST POPULAR
                </div>
                <div className="text-sm text-forge-cyan uppercase tracking-wide mb-2">Pro</div>
                <div className="text-4xl font-bold mb-1">$9<span className="text-lg font-normal text-gray-400">/mo</span></div>
                <div className="text-gray-400 text-sm mb-6">For power users</div>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start gap-2 text-sm">
                    <svg className="w-5 h-5 text-forge-cyan flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Everything in Free</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm">
                    <svg className="w-5 h-5 text-forge-cyan flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span><strong>Daily cloud backup</strong></span>
                  </li>
                  <li className="flex items-start gap-2 text-sm">
                    <svg className="w-5 h-5 text-forge-cyan flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span><strong>Cross-device sync</strong></span>
                  </li>
                  <li className="flex items-start gap-2 text-sm">
                    <svg className="w-5 h-5 text-forge-cyan flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span><strong>Web dashboard</strong></span>
                  </li>
                  <li className="flex items-start gap-2 text-sm">
                    <svg className="w-5 h-5 text-forge-cyan flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>30-day backup history</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm">
                    <svg className="w-5 h-5 text-forge-cyan flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Email support</span>
                  </li>
                </ul>
                <Link
                  href="/sign-up"
                  className="block w-full px-6 py-3 bg-forge-cyan text-forge-dark hover:bg-forge-cyan/90 rounded-xl font-bold text-center transition-all glow-cyan"
                >
                  Try Free
                </Link>
              </div>

              {/* Team */}
              <div className="glass rounded-2xl p-8">
                <div className="text-sm text-gray-500 uppercase tracking-wide mb-2">Team</div>
                <div className="text-4xl font-bold mb-1">$19<span className="text-lg font-normal text-gray-400">/seat/mo</span></div>
                <div className="text-gray-400 text-sm mb-6">For dev teams</div>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start gap-2 text-sm">
                    <svg className="w-5 h-5 text-forge-cyan flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Everything in Pro</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm">
                    <svg className="w-5 h-5 text-forge-cyan flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span><strong>Shared team contexts</strong></span>
                  </li>
                  <li className="flex items-start gap-2 text-sm">
                    <svg className="w-5 h-5 text-forge-cyan flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span><strong>Team memory search</strong></span>
                  </li>
                  <li className="flex items-start gap-2 text-sm">
                    <svg className="w-5 h-5 text-forge-cyan flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Activity feed & audit log</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm">
                    <svg className="w-5 h-5 text-forge-cyan flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>90-day backup history</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm">
                    <svg className="w-5 h-5 text-forge-cyan flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Priority support</span>
                  </li>
                </ul>
                <Link
                  href="/sign-up"
                  className="block w-full px-6 py-3 bg-white/10 hover:bg-white/20 rounded-xl font-semibold text-center transition-all"
                >
                  Try Free
                </Link>
              </div>
            </div>

            <p className="text-center text-gray-500 text-sm mt-8">
              Enterprise tier coming soon with SSO, compliance features, and custom data retention.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="relative z-10 py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold font-display text-center mb-12">
              Frequently Asked <span className="text-forge-cyan">Questions</span>
            </h2>

            <div className="space-y-6">
              <div className="glass-strong rounded-xl p-6">
                <h3 className="font-semibold mb-2">When will Substratia Cloud launch?</h3>
                <p className="text-gray-400 text-sm">
                  We're validating demand now. If enough people join the waitlist, we'll build
                  and ship an MVP within 2-3 months. Early access members get a permanent discount.
                </p>
              </div>

              <div className="glass-strong rounded-xl p-6">
                <h3 className="font-semibold mb-2">Will the free tools stay free?</h3>
                <p className="text-gray-400 text-sm">
                  Yes, forever. momentum and memory-mcp are open source (MIT licensed) and will
                  always be free. Cloud is an optional add-on for people who want convenience features.
                </p>
              </div>

              <div className="glass-strong rounded-xl p-6">
                <h3 className="font-semibold mb-2">How is my data secured?</h3>
                <p className="text-gray-400 text-sm">
                  Your memories are encrypted on your device before upload. We use industry-standard
                  encryption (AES-256) and never have access to your unencrypted data.
                </p>
              </div>

              <div className="glass-strong rounded-xl p-6">
                <h3 className="font-semibold mb-2">Can I export my data?</h3>
                <p className="text-gray-400 text-sm">
                  Yes. Your data is yours. You can export everything at any time as a SQLite
                  database or JSON. No vendor lock-in.
                </p>
              </div>

              <div className="glass-strong rounded-xl p-6">
                <h3 className="font-semibold mb-2">What about team/enterprise features?</h3>
                <p className="text-gray-400 text-sm">
                  Team tier includes shared contexts and team memory search. Enterprise tier
                  (coming later) will add SSO, SCIM, audit logs, and compliance certifications.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative z-10 py-24 bg-gradient-to-b from-transparent via-forge-dark-lighter/50 to-transparent">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold font-display mb-6">
              Ready for Claude Code That <span className="text-forge-cyan">Remembers</span>?
            </h2>
            <p className="text-gray-300 mb-8">
              Try Substratia Cloud free during early access. Your memories, synced everywhere.
            </p>

            <div className="max-w-md mx-auto">
              <Link
                href="/sign-up"
                className="inline-block px-8 py-4 bg-forge-cyan text-forge-dark font-bold text-lg rounded-xl hover:bg-forge-cyan/90 transition-all glow-cyan mb-4"
              >
                Get Started Free
              </Link>
              <p className="text-gray-400 text-sm">
                Already have an account?{' '}
                <Link href="/dashboard" className="text-forge-cyan hover:underline">
                  Go to Dashboard
                </Link>
              </p>
            </div>

            <div className="mt-12 flex flex-wrap justify-center gap-6 text-sm text-gray-500">
              <Link href="/start-here" className="hover:text-white transition-all">
                Get Started Free
              </Link>
              <Link href="/tools" className="hover:text-white transition-all">
                Free Tools
              </Link>
              <Link href="/docs" className="hover:text-white transition-all">
                Documentation
              </Link>
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
              <span className="text-gray-500 text-sm">Memory Tools for Claude Code</span>
            </div>

            <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-400">
              <Link href="/" className="hover:text-white transition-all">Home</Link>
              <Link href="/tools" className="hover:text-white transition-all">Tools</Link>
              <Link href="/blog" className="hover:text-white transition-all">Blog</Link>
              <Link href="/docs" className="hover:text-white transition-all">Docs</Link>
              <a href="https://github.com/WhenMoon-afk" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-all">GitHub</a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  )
}
