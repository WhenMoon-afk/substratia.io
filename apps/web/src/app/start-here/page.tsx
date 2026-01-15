'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import ShareButton from '@/components/ShareButton'

interface Step {
  number: number
  title: string
  description: string
  resources: {
    title: string
    href: string
    type: 'tool' | 'guide' | 'blog'
    time?: string
  }[]
  completed?: boolean
}

const learningPath: Step[] = [
  {
    number: 1,
    title: 'Get the Essentials',
    description: 'Start with the reference materials you\'ll use daily.',
    resources: [
      { title: 'Claude Code Cheat Sheet', href: '/tools/cheat-sheet', type: 'tool', time: '5 min' },
      { title: 'FAQ', href: '/faq', type: 'guide', time: '10 min' },
    ],
  },
  {
    number: 2,
    title: 'Master Context Management',
    description: 'The #1 skill that separates productive sessions from frustrating ones.',
    resources: [
      { title: 'Context Management Guide', href: '/blog/context-management-guide', type: 'blog', time: '12 min read' },
      { title: 'Token Counter', href: '/tools/token-counter', type: 'tool' },
    ],
  },
  {
    number: 3,
    title: 'Create Your CLAUDE.md',
    description: 'Set up your project configuration for optimal Claude Code performance.',
    resources: [
      { title: 'How to Build Claude Agents', href: '/blog/how-to-build-claude-agents', type: 'blog', time: '8 min read' },
      { title: 'AGENTS.md vs CLAUDE.md', href: '/blog/agents-md-vs-claude-md', type: 'blog', time: '12 min read' },
      { title: 'AgentForge Builder', href: '/builder', type: 'tool' },
    ],
  },
  {
    number: 4,
    title: 'Optimize Your Prompts',
    description: 'Learn patterns for reliable, effective prompts.',
    resources: [
      { title: 'Mastering Negative Prompts', href: '/blog/mastering-negative-prompts', type: 'blog', time: '10 min read' },
      { title: 'Prompt Library', href: '/tools/prompts', type: 'tool' },
      { title: 'Prompt Optimizer', href: '/tools/prompt-optimizer', type: 'tool' },
    ],
  },
  {
    number: 5,
    title: 'Add Memory Tools (Optional)',
    description: 'Give Claude persistent memory across sessions.',
    resources: [
      { title: 'Memory Tools Overview', href: '/templates', type: 'guide' },
      { title: 'Memory Architecture Patterns', href: '/blog/memory-architecture-patterns', type: 'blog', time: '7 min read' },
      { title: 'Why FTS5 Over Embeddings', href: '/blog/why-fts5-over-embeddings', type: 'blog', time: '8 min read' },
    ],
  },
]

export default function StartHerePage() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set())
  const [sharedProgress, setSharedProgress] = useState(false)

  const FORMSPREE_ENDPOINT = 'https://formspree.io/f/mreezwlv'

  // Load progress from localStorage on mount
  useEffect(() => {
    if (typeof window === 'undefined') return
    const saved = localStorage.getItem('substratia-start-here-progress')
    if (saved) {
      try {
        const parsed = JSON.parse(saved)
        if (Array.isArray(parsed)) {
          setCompletedSteps(new Set(parsed))
        }
      } catch {
        // Invalid data, ignore
      }
    }
  }, [])

  // Save progress to localStorage when it changes
  useEffect(() => {
    if (typeof window === 'undefined') return
    localStorage.setItem('substratia-start-here-progress', JSON.stringify(Array.from(completedSteps)))
  }, [completedSteps])

  const shareProgress = useCallback(async () => {
    const progress = `${completedSteps.size}/${learningPath.length}`
    const shareUrl = `${window.location.origin}${window.location.pathname}`
    const shareText = `I've completed ${progress} steps of the Claude Code learning path! ${shareUrl}`
    await navigator.clipboard.writeText(shareText)
    setSharedProgress(true)
    setTimeout(() => setSharedProgress(false), 2000)
  }, [completedSteps.size])

  const resetProgress = useCallback(() => {
    setCompletedSteps(new Set())
    localStorage.removeItem('substratia-start-here-progress')
  }, [])

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return

    setStatus('loading')
    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({ email, source: 'start-here', interest: 'claude-code-learning' }),
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

  const toggleStep = (stepNumber: number) => {
    const newCompleted = new Set(completedSteps)
    if (newCompleted.has(stepNumber)) {
      newCompleted.delete(stepNumber)
    } else {
      newCompleted.add(stepNumber)
    }
    setCompletedSteps(newCompleted)
  }

  return (
    <main className="min-h-screen text-white relative">
      <div className="neural-bg" />
      <div className="fixed inset-0 gradient-mesh pointer-events-none z-0" />

      {/* Header */}
      <section className="relative z-10 py-16">
        <div className="container mx-auto px-4">
          <div className="flex justify-end mb-4 max-w-3xl mx-auto">
            <ShareButton title="Start Here - Substratia" />
          </div>
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-block px-4 py-1 bg-forge-cyan/20 border border-forge-cyan/50 rounded-full text-sm text-forge-cyan mb-6">
              New to Claude Code?
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Start <span className="text-forge-cyan">Here</span>
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              A curated learning path from beginner to power user.
              Free resources, no fluff, just what works.
            </p>
            <div className="flex justify-center gap-2 text-sm text-gray-400">
              <span className="flex items-center gap-1">
                <svg className="w-4 h-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                5 steps
              </span>
              <span>•</span>
              <span>~2 hours total</span>
              <span>•</span>
              <span>All free</span>
            </div>
          </div>
        </div>
      </section>

      {/* Learning Path */}
      <section className="relative z-10 py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto space-y-6">
            {learningPath.map((step) => (
              <div
                key={step.number}
                className={`glass rounded-xl p-6 transition-all ${
                  completedSteps.has(step.number) ? 'border-green-500/50' : ''
                }`}
              >
                <div className="flex items-start gap-4">
                  <button
                    onClick={() => toggleStep(step.number)}
                    className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 transition-all ${
                      completedSteps.has(step.number)
                        ? 'bg-green-500 text-white'
                        : 'bg-forge-cyan/20 text-forge-cyan border border-forge-cyan/50'
                    }`}
                  >
                    {completedSteps.has(step.number) ? (
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    ) : (
                      step.number
                    )}
                  </button>
                  <div className="flex-1">
                    <h2 className="text-xl font-bold mb-2">{step.title}</h2>
                    <p className="text-gray-400 mb-4">{step.description}</p>
                    <div className="flex flex-wrap gap-3">
                      {step.resources.map((resource) => (
                        <Link
                          key={resource.href}
                          href={resource.href}
                          className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 rounded-lg text-sm transition-all"
                        >
                          {resource.type === 'tool' && (
                            <svg className="w-4 h-4 text-forge-cyan" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                          )}
                          {resource.type === 'blog' && (
                            <svg className="w-4 h-4 text-forge-purple" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                            </svg>
                          )}
                          {resource.type === 'guide' && (
                            <svg className="w-4 h-4 text-forge-cyan" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                          )}
                          {resource.title}
                          {resource.time && (
                            <span className="text-gray-500 text-xs">({resource.time})</span>
                          )}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Progress Summary */}
      <section className="relative z-10 py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="glass rounded-xl p-6 text-center">
              <div className="text-4xl font-bold text-forge-cyan mb-2">
                {completedSteps.size} / {learningPath.length}
              </div>
              <p className="text-gray-400 mb-4">
                {completedSteps.size === learningPath.length
                  ? 'You\'re a Claude Code power user!'
                  : 'Steps completed'}
              </p>
              <div className="flex justify-center gap-3">
                <button
                  onClick={shareProgress}
                  className={`px-4 py-2 text-sm rounded-lg transition-all ${
                    sharedProgress
                      ? 'bg-green-500 text-white'
                      : 'bg-forge-cyan/20 hover:bg-forge-cyan/30 text-forge-cyan'
                  }`}
                >
                  {sharedProgress ? 'Copied!' : 'Share Progress'}
                </button>
                {completedSteps.size > 0 && (
                  <button
                    onClick={resetProgress}
                    className="px-4 py-2 text-sm bg-white/10 hover:bg-white/20 rounded-lg transition-all text-gray-400"
                  >
                    Reset
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="relative z-10 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-xl mx-auto text-center">
            <h2 className="text-2xl font-bold mb-4">Get Weekly Tips</h2>
            <p className="text-gray-400 mb-6">
              Subscribe for Claude Code tips, new resources, and advanced techniques.
            </p>
            {status === 'success' ? (
              <div className="bg-green-500/20 border border-green-500/50 rounded-xl p-4 text-green-300">
                You&apos;re subscribed! Check your inbox.
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3">
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
        </div>
      </section>

    </main>
  )
}
