'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import ShareButton from '@/components/ShareButton'

export default function ProPage() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

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
        body: JSON.stringify({
          email,
          source: 'pro-page',
          interest: 'substratia-pro'
        }),
      })

      if (res.ok) {
        setStatus('success')
        setMessage("You're on the list! We'll email you when Pro launches.")
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
      <section className="relative z-10 py-20">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8 max-w-4xl mx-auto">
            <Link href="/" className="text-forge-cyan hover:underline text-sm">
              ← Back to Home
            </Link>
            <ShareButton title="Substratia Pro - Coming Soon" />
          </div>
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-block px-4 py-1 bg-forge-purple/20 border border-forge-purple/50 rounded-full text-sm text-forge-purple mb-6">
              Coming Soon
            </div>

            <div className="flex items-center justify-center gap-3 mb-6">
              <Image
                src="/brand/logo-icon.png"
                alt="Substratia"
                width={48}
                height={48}
                className="rounded-lg"
              />
              <h1 className="text-4xl md:text-6xl font-bold font-display">
                Substratia <span className="text-forge-cyan">Pro</span>
              </h1>
            </div>

            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              We&apos;re exploring what Pro features would be most valuable.
              Join the waitlist to help shape what we build next.
            </p>

            {/* Email Capture */}
            <div className="max-w-md mx-auto mb-12">
              {status === 'success' ? (
                <div className="bg-green-500/20 border border-green-500/50 rounded-xl p-4 text-green-300">
                  {message}
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    aria-label="Email address for Pro waitlist"
                    required
                    className="flex-1 px-4 py-3 bg-white/5 border border-white/20 rounded-xl focus:outline-none focus:border-forge-cyan transition-all"
                  />
                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="px-6 py-3 bg-forge-cyan text-forge-dark font-semibold rounded-xl hover:bg-forge-cyan/90 transition-all disabled:opacity-50 glow-cyan"
                  >
                    {status === 'loading' ? 'Joining...' : 'Get Early Access'}
                  </button>
                </form>
              )}
              {status === 'error' && (
                <p className="mt-3 text-red-400 text-sm">{message}</p>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Problem / Solution */}
      <section className="relative z-10 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
            <div className="glass rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-red-400 mb-4">The Problem</h3>
              <ul className="space-y-3 text-gray-400">
                <li className="flex gap-3">
                  <span className="text-red-400">-</span>
                  Memory stuck on one machine
                </li>
                <li className="flex gap-3">
                  <span className="text-red-400">-</span>
                  No visibility into what AI remembers
                </li>
                <li className="flex gap-3">
                  <span className="text-red-400">-</span>
                  No backup if something breaks
                </li>
                <li className="flex gap-3">
                  <span className="text-red-400">-</span>
                  Teams can&apos;t share knowledge
                </li>
              </ul>
            </div>
            <div className="glass rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-forge-cyan mb-4">The Solution</h3>
              <ul className="space-y-3 text-gray-300">
                <li className="flex gap-3">
                  <span className="text-forge-cyan">+</span>
                  Sync across all your devices
                </li>
                <li className="flex gap-3">
                  <span className="text-forge-cyan">+</span>
                  Dashboard to view and edit memories
                </li>
                <li className="flex gap-3">
                  <span className="text-forge-cyan">+</span>
                  Automatic backups and recovery
                </li>
                <li className="flex gap-3">
                  <span className="text-forge-cyan">+</span>
                  Shared team memory (Teams tier)
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="relative z-10 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            What We&apos;re <span className="text-forge-purple">Exploring</span>
          </h2>
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <FeatureCard
              title="Cloud Sync"
              description="Your memories sync across laptop, desktop, and any device. Start work at home, continue at the office."
              icon={
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                </svg>
              }
            />
            <FeatureCard
              title="Memory Dashboard"
              description="Web UI to browse what your AI remembers. Search, edit, and delete memories with full control."
              icon={
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              }
            />
            <FeatureCard
              title="Automatic Backups"
              description="Daily backups with point-in-time recovery. Never lose important context again."
              icon={
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4" />
                </svg>
              }
            />
            <FeatureCard
              title="Memory Analytics"
              description="Insights into what your AI remembers most. Identify gaps and optimize your workflow."
              icon={
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              }
            />
            <FeatureCard
              title="Priority Support"
              description="Direct access to the team behind the tools. Get help when you need it."
              icon={
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              }
            />
            <FeatureCard
              title="Team Sharing"
              description="Share memories across your team. Build collective knowledge that makes everyone smarter. (Teams tier)"
              icon={
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              }
            />
          </div>
        </div>
      </section>

      {/* Pricing Preview */}
      <section className="relative z-10 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4">
            Potential <span className="text-forge-cyan">Tiers</span>
          </h2>
          <p className="text-gray-400 text-center mb-12 max-w-xl mx-auto">
            Free tools stay free forever. We&apos;re exploring what Pro features would be worth paying for.
          </p>
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="glass rounded-2xl p-6">
              <h3 className="text-xl font-bold mb-2">Free</h3>
              <div className="text-3xl font-bold text-forge-cyan mb-4">$0</div>
              <p className="text-gray-400 text-sm mb-4">Forever free, open source</p>
              <ul className="space-y-2 text-sm text-gray-300">
                <li>- momentum context recovery</li>
                <li>- memory-mcp persistent memory</li>
                <li>- AgentForge visual builder</li>
                <li>- Local SQLite storage</li>
              </ul>
            </div>
            <div className="gradient-border rounded-2xl p-6 relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-forge-purple text-xs font-semibold rounded-full">
                Most Popular
              </div>
              <h3 className="text-xl font-bold mb-2">Pro</h3>
              <div className="text-3xl font-bold text-forge-cyan mb-4">$15<span className="text-lg text-gray-400">/mo</span></div>
              <p className="text-gray-400 text-sm mb-4">For serious users</p>
              <ul className="space-y-2 text-sm text-gray-300">
                <li>+ Everything in Free</li>
                <li>+ Cloud sync across devices</li>
                <li>+ Memory dashboard</li>
                <li>+ Automatic backups</li>
                <li>+ Priority support</li>
              </ul>
            </div>
            <div className="glass rounded-2xl p-6">
              <h3 className="text-xl font-bold mb-2">Teams</h3>
              <div className="text-3xl font-bold text-forge-cyan mb-4">$35<span className="text-lg text-gray-400">/user</span></div>
              <p className="text-gray-400 text-sm mb-4">For organizations</p>
              <ul className="space-y-2 text-sm text-gray-300">
                <li>+ Everything in Pro</li>
                <li>+ Shared team memory</li>
                <li>+ Admin controls</li>
                <li>+ SSO integration</li>
                <li>+ SLA guarantee</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative z-10 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">
              Get Notified at Launch
            </h2>
            <p className="text-gray-400 mb-8">
              Join the waitlist for early access and launch pricing.
            </p>
            {status === 'success' ? (
              <div className="bg-green-500/20 border border-green-500/50 rounded-xl p-4 text-green-300 max-w-md mx-auto">
                {message}
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  aria-label="Email address for Pro waitlist"
                  required
                  className="flex-1 px-4 py-3 bg-white/5 border border-white/20 rounded-xl focus:outline-none focus:border-forge-cyan transition-all"
                />
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="px-6 py-3 bg-forge-purple hover:bg-forge-purple/80 rounded-xl font-semibold transition-all disabled:opacity-50 glow-purple"
                >
                  {status === 'loading' ? 'Joining...' : 'Join Waitlist'}
                </button>
              </form>
            )}

            <div className="mt-12 flex justify-center gap-6 text-sm text-gray-500">
              <Link href="/templates" className="hover:text-white transition-all">
                Try Free Tools
              </Link>
              <Link href="/pricing" className="hover:text-white transition-all">
                Full Pricing Details
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

function FeatureCard({ title, description, icon }: { title: string; description: string; icon: React.ReactNode }) {
  return (
    <div className="glass rounded-xl p-6">
      <div className="w-12 h-12 rounded-xl bg-forge-purple/20 flex items-center justify-center text-forge-purple mb-4">
        {icon}
      </div>
      <h3 className="font-semibold mb-2">{title}</h3>
      <p className="text-sm text-gray-400">{description}</p>
    </div>
  )
}
