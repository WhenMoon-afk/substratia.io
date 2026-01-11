'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function Home() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return

    setStatus('loading')
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      const data = await res.json()

      if (res.ok) {
        setStatus('success')
        setMessage("You're on the list! We'll notify you when we launch.")
        setEmail('')
      } else {
        setStatus('error')
        setMessage(data.error || 'Something went wrong')
      }
    } catch {
      setStatus('error')
      setMessage('Failed to subscribe. Please try again.')
    }
  }

  return (
    <main className="min-h-screen text-white">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            <span className="text-forge-cyan">Prompt</span>Forge
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8">
            Build production-ready agents.md and CLAUDE.md files in minutes.
            Free drag-and-drop builder with AI assistance.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/builder"
              className="px-8 py-4 bg-forge-purple hover:bg-forge-purple/80 rounded-lg font-semibold text-lg transition-all"
            >
              Start Building - Free
            </Link>
            <Link
              href="/templates"
              className="px-8 py-4 border border-white/30 hover:bg-white/10 rounded-lg font-semibold text-lg transition-all"
            >
              Browse Templates
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <FeatureCard
            title="Drag & Drop"
            description="Visual builder for agent configs. No coding required."
            icon="🎯"
          />
          <FeatureCard
            title="AI Assistant"
            description="Built-in AI helps you brainstorm and optimize your prompts."
            icon="🤖"
          />
          <FeatureCard
            title="Battle-Tested"
            description="Templates from real production systems. They work."
            icon="⚡"
          />
        </div>
      </section>

      {/* Stats Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto text-center">
          <StatCard number="20+" label="Capabilities" />
          <StatCard number="9" label="Rule Sets" />
          <StatCard number="6" label="Templates" />
          <StatCard number="Free" label="Builder Tool" />
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto bg-white/5 border border-white/10 rounded-2xl p-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Get Early Access</h2>
          <p className="text-gray-300 mb-6">
            Join the waitlist for premium templates and courses.
          </p>

          {status === 'success' ? (
            <div className="bg-green-500/20 border border-green-500/50 rounded-lg p-4 text-green-300">
              {message}
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className="flex-1 px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-forge-cyan"
              />
              <button
                type="submit"
                disabled={status === 'loading'}
                className="px-6 py-3 bg-forge-cyan text-forge-dark font-semibold rounded-lg hover:bg-forge-cyan/80 transition-all disabled:opacity-50"
              >
                {status === 'loading' ? 'Joining...' : 'Join Waitlist'}
              </button>
            </form>
          )}

          {status === 'error' && (
            <p className="mt-4 text-red-400 text-sm">{message}</p>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="container mx-auto px-4 py-8 border-t border-white/10">
        <div className="text-center text-gray-400">
          <p>Built by practitioners. Tested in production.</p>
          <div className="mt-4 flex justify-center gap-6 text-sm">
            <Link href="/builder" className="hover:text-white transition-all">Builder</Link>
            <Link href="/templates" className="hover:text-white transition-all">Templates</Link>
            <a href="https://github.com/WhenMoon-afk/agentforge" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-all">GitHub</a>
          </div>
        </div>
      </footer>
    </main>
  )
}

function FeatureCard({ title, description, icon }: { title: string; description: string; icon: string }) {
  return (
    <div className="bg-white/5 border border-white/10 rounded-xl p-6 text-center hover:border-forge-purple/50 transition-all">
      <div className="text-4xl mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-400">{description}</p>
    </div>
  )
}

function StatCard({ number, label }: { number: string; label: string }) {
  return (
    <div className="p-4">
      <div className="text-3xl md:text-4xl font-bold text-forge-cyan">{number}</div>
      <div className="text-gray-400 text-sm mt-1">{label}</div>
    </div>
  )
}
