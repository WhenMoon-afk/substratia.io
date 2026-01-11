'use client'

import Link from 'next/link'

export default function Home() {
  return (
    <main className="min-h-screen text-white">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            <span className="text-forge-cyan">Forge</span> Powerful AI Agents
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

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto bg-white/5 border border-white/10 rounded-2xl p-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Get Early Access</h2>
          <p className="text-gray-300 mb-6">
            Join the waitlist for premium templates and courses.
          </p>
          <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-forge-cyan"
            />
            <button
              type="submit"
              className="px-6 py-3 bg-forge-cyan text-forge-dark font-semibold rounded-lg hover:bg-forge-cyan/80 transition-all"
            >
              Join Waitlist
            </button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="container mx-auto px-4 py-8 border-t border-white/10">
        <div className="text-center text-gray-400">
          <p>Built by practitioners. Tested in production.</p>
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
