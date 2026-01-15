'use client'

import { useState, useCallback } from 'react'
import Link from 'next/link'
import ShareButton from '@/components/ShareButton'

const posts = [
  {
    slug: 'announcing-substratia-cloud',
    title: 'Announcing Substratia Cloud: Your Claude Code Memories, Everywhere',
    excerpt: 'Cloud backup, cross-device sync, and web dashboard for your Claude Code memories. Join the waitlist for founding member pricing.',
    date: '2026-01-12',
    readTime: '6 min read',
    tags: ['Announcement', 'Cloud', 'Coming Soon'],
    featured: true,
  },
  {
    slug: 'context-management-guide',
    title: 'The Ultimate Guide to Claude Code Context Management',
    excerpt: 'Master context window management in Claude Code. Techniques for preserving context, avoiding compaction issues, and maximizing your AI coding sessions.',
    date: '2026-01-11',
    readTime: '12 min read',
    tags: ['Guide', 'Claude Code', 'Deep Dive'],
    featured: true,
  },
  {
    slug: 'mirror-demons',
    title: 'Mirror Demons: How AI Chatbots Can Amplify Delusions',
    excerpt: 'What happens when an AI\'s core directive to be "helpful and agreeable" meets a user losing their grip on reality? Our research reveals a disturbing answer.',
    date: '2026-01-11',
    readTime: '10 min read',
    tags: ['Research', 'AI Safety', 'Original'],
    featured: true,
  },
  {
    slug: 'eleanor-chen-effect',
    title: 'The Eleanor Chen Effect: Why AI Keeps Writing the Same Story',
    excerpt: 'Ask multiple AI instances to write about AI and grief, and they create the same character. We investigate why LLMs converge on remarkably similar narratives.',
    date: '2026-01-11',
    readTime: '8 min read',
    tags: ['Research', 'AI Creativity', 'Original'],
    featured: true,
  },
  {
    slug: 'memory-mcp-v2-whats-new',
    title: "What's New in memory-mcp v2.5: From Python to TypeScript",
    excerpt: 'memory-mcp has been completely rewritten. No more embeddings, no more pip - just npx and instant persistent memory.',
    date: '2026-01-11',
    readTime: '6 min read',
    tags: ['Release', 'memory-mcp', 'v2.5'],
  },
  {
    slug: 'why-fts5-over-embeddings',
    title: 'Why We Chose FTS5 Over Embeddings for AI Memory',
    excerpt: 'Vector embeddings are overkill for most AI memory use cases. SQLite FTS5 gave us instant startup, zero dependencies, and 46MB less bloat.',
    date: '2026-01-11',
    readTime: '8 min read',
    tags: ['Architecture', 'Technical', 'memory-mcp'],
  },
  {
    slug: 'memory-architecture-patterns',
    title: 'Memory Architecture Patterns for AI Assistants',
    excerpt: 'How we designed momentum and memory-mcp to work together. Short-term context recovery meets long-term persistent memory. Two servers, one ecosystem.',
    date: '2026-01-11',
    readTime: '7 min read',
    tags: ['Architecture', 'Design'],
  },
  {
    slug: 'context-window-churn',
    title: 'The Real Cost of Context Window Churn',
    excerpt: 'Context window management is the hidden tax on AI-assisted development. We measured the cost and built a solution that restores in under 5ms.',
    date: '2026-01-11',
    readTime: '6 min read',
    tags: ['Productivity', 'momentum', 'Developer Experience'],
  },
  {
    slug: 'memory-mcp-vs-alternatives',
    title: 'Best MCP Memory Servers Compared: memory-mcp vs Alternatives',
    excerpt: 'Compare the top MCP memory servers for Claude and AI assistants. Find the best persistent memory solution for your needs.',
    date: '2026-01-11',
    readTime: '10 min read',
    tags: ['MCP', 'Comparison', '2026'],
  },
  {
    slug: 'mastering-negative-prompts',
    title: 'Mastering Negative Prompts: The Secret to Reliable AI Agents',
    excerpt: 'Most developers focus on what they want AI to do. The pros focus on what it should never do. Learn how to write effective guardrails.',
    date: '2026-01-11',
    readTime: '10 min read',
    tags: ['Prompt Engineering', 'Safety', 'Best Practices'],
  },
  {
    slug: 'how-to-build-claude-agents',
    title: 'How to Build Claude Agents: A Complete Guide to CLAUDE.md',
    excerpt: 'Learn how to create powerful AI agents using CLAUDE.md files. This comprehensive guide covers capabilities, rulesets, and best practices.',
    date: '2026-01-11',
    readTime: '8 min read',
    tags: ['Claude', 'Tutorial', 'Beginner'],
  },
  {
    slug: 'agents-md-vs-claude-md',
    title: 'AGENTS.md vs CLAUDE.md: Complete Guide to AI Agent Configuration',
    excerpt: 'Understand the differences between AGENTS.md and CLAUDE.md, when to use each, and the bridge pattern for maximum compatibility.',
    date: '2026-01-11',
    readTime: '12 min read',
    tags: ['Tutorial', 'Configuration', 'Best Practices'],
  },
]

export default function BlogPage() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [sharedSlug, setSharedSlug] = useState<string | null>(null)

  const FORMSPREE_ENDPOINT = 'https://formspree.io/f/mreezwlv'

  const sharePost = useCallback(async (post: typeof posts[0]) => {
    const shareUrl = `${window.location.origin}/blog/${post.slug}`
    await navigator.clipboard.writeText(shareUrl)
    setSharedSlug(post.slug)
    setTimeout(() => setSharedSlug(null), 2000)
  }, [])

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return

    setStatus('loading')
    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({ email, source: 'blog', interest: 'claude-code-articles' }),
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

  return (
    <main className="min-h-screen text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="flex justify-end mb-4">
          <ShareButton title="Blog - Substratia" />
        </div>
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Blog</h1>
          <p className="text-xl text-gray-300">
            Tutorials, tips, and best practices for building AI agents.
          </p>
        </div>

        {/* Posts */}
        <div className="max-w-3xl mx-auto space-y-8">
          {posts.map((post) => (
            <article
              key={post.slug}
              className="bg-white/5 border border-white/10 rounded-xl p-6 hover:border-forge-purple/50 transition-all"
            >
              <div className="flex flex-wrap gap-2 mb-3">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs px-2 py-1 bg-forge-purple/20 text-forge-purple rounded"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <Link href={`/blog/${post.slug}`}>
                <h2 className="text-2xl font-semibold mb-2 hover:text-forge-cyan transition-all">
                  {post.title}
                </h2>
              </Link>
              <p className="text-gray-400 mb-4">{post.excerpt}</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <span>{post.date}</span>
                  <span>{post.readTime}</span>
                </div>
                <button
                  onClick={() => sharePost(post)}
                  className={`px-3 py-1 text-xs rounded-lg transition-all ${
                    sharedSlug === post.slug
                      ? 'bg-green-500 text-white'
                      : 'bg-forge-cyan/20 hover:bg-forge-cyan/30 text-forge-cyan'
                  }`}
                >
                  {sharedSlug === post.slug ? 'Copied!' : 'Share'}
                </button>
              </div>
            </article>
          ))}
        </div>

        {/* Newsletter Section */}
        <div className="max-w-xl mx-auto text-center mt-16 pt-12 border-t border-white/10">
          <h2 className="text-2xl font-bold mb-4">Get New Articles</h2>
          <p className="text-gray-400 mb-6">
            Subscribe for Claude Code tips, tutorials, and new releases.
          </p>
          {status === 'success' ? (
            <div className="bg-green-500/20 border border-green-500/50 rounded-xl p-4 text-green-300">
              You&apos;re subscribed! Check your inbox.
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
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

        {/* Consulting CTA */}
        <div className="max-w-3xl mx-auto mt-12 text-center">
          <p className="text-gray-400 mb-4">
            Need personalized help with Claude Code?
          </p>
          <Link
            href="/consulting"
            className="inline-block px-6 py-3 bg-forge-purple hover:bg-forge-purple/80 rounded-lg font-semibold transition-all"
          >
            Book a Consulting Session
          </Link>
        </div>
      </div>
    </main>
  )
}
