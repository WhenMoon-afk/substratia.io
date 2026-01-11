import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Blog - Substratia | AI Memory Tools & Agent Building',
  description: 'Tutorials, comparisons, and best practices for AI memory tools, MCP servers, and agent configuration.',
  keywords: 'MCP memory server, Claude memory, AI agents, CLAUDE.md, prompt engineering, memory-mcp',
}

const posts = [
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
]

export default function BlogPage() {
  return (
    <main className="min-h-screen text-white">
      <div className="container mx-auto px-4 py-12">
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
              <div className="flex items-center gap-4 text-sm text-gray-500">
                <span>{post.date}</span>
                <span>{post.readTime}</span>
              </div>
            </article>
          ))}
        </div>

        {/* CTA */}
        <div className="max-w-3xl mx-auto mt-12 text-center">
          <p className="text-gray-400 mb-4">
            Ready to build your own AI agent?
          </p>
          <Link
            href="/builder"
            className="inline-block px-6 py-3 bg-forge-purple hover:bg-forge-purple/80 rounded-lg font-semibold transition-all"
          >
            Try the Free Builder
          </Link>
        </div>
      </div>
    </main>
  )
}
