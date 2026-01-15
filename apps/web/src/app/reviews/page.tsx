'use client'

import Link from 'next/link'
import ShareButton from '@/components/ShareButton'

const comparisons = [
  {
    slug: 'ai-coding-assistants',
    title: 'Best AI Coding Assistants 2026',
    description: 'Claude Code, Cursor, GitHub Copilot, Codeium, and Windsurf compared. Find your perfect AI pair programmer.',
    category: 'Developer Tools',
    tools: ['Claude Code', 'Cursor', 'Copilot', 'Codeium', 'Windsurf'],
    updated: 'January 2026',
  },
  {
    slug: 'markdown-editors',
    title: 'Best Markdown Editors 2026',
    description: 'Obsidian, Notion, Typora, VS Code, and iA Writer compared. Find the best tool for notes and writing.',
    category: 'Writing & Notes',
    tools: ['Obsidian', 'Notion', 'Typora', 'VS Code', 'iA Writer'],
    updated: 'January 2026',
  },
  {
    slug: 'ai-image-generators',
    title: 'Best AI Image Generators 2026',
    description: 'Comparing Midjourney, DALL-E 3, Stable Diffusion, Grok, and more. Which is best for your needs?',
    category: 'Image Generation',
    tools: ['Midjourney', 'DALL-E 3', 'Stable Diffusion', 'Grok', 'Flux'],
    updated: 'January 2026',
  },
  {
    slug: 'ai-video-generators',
    title: 'Best AI Video Generators 2026',
    description: 'Runway Gen-3, Pika Labs, Luma Dream Machine, Kling AI, and Grok video compared.',
    category: 'Video Generation',
    tools: ['Runway', 'Pika', 'Luma', 'Kling', 'Grok'],
    updated: 'January 2026',
  },
  {
    slug: 'mcp-memory-servers',
    title: 'Best MCP Memory Servers',
    description: 'Persistent memory solutions for Claude and AI assistants. memory-mcp vs alternatives.',
    category: 'AI Memory',
    tools: ['memory-mcp', 'mem0', 'Basic Memory', 'Obsidian MCP'],
    updated: 'January 2026',
    existingPost: '/blog/memory-mcp-vs-alternatives',
  },
]

export default function ReviewsPage() {
  return (
    <main className="min-h-screen text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="flex justify-end mb-4">
          <ShareButton title="AI Tool Reviews - Substratia" />
        </div>
        {/* Header */}
        <div className="max-w-4xl mx-auto text-center mb-12">
          <div className="inline-block px-4 py-1 bg-forge-purple/20 border border-forge-purple/50 rounded-full text-sm text-forge-purple mb-4">
            Honest Reviews
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            AI Tool <span className="text-forge-cyan">Comparisons</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Side-by-side comparisons to help you choose the right AI tools. No affiliate links, just honest analysis.
          </p>
        </div>

        {/* Comparison Cards */}
        <div className="max-w-4xl mx-auto space-y-6 mb-16">
          {comparisons.map((comparison) => (
            <Link
              key={comparison.slug}
              href={comparison.existingPost || `/reviews/${comparison.slug}`}
              className="block bg-white/5 border border-white/10 rounded-xl p-6 hover:border-forge-cyan/50 transition-all group"
            >
              <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                <div>
                  <span className="text-xs text-forge-purple bg-forge-purple/20 px-2 py-1 rounded-full">
                    {comparison.category}
                  </span>
                  <h2 className="text-2xl font-bold mt-2 group-hover:text-forge-cyan transition-colors">
                    {comparison.title}
                  </h2>
                </div>
                <span className="text-xs text-gray-500">
                  Updated {comparison.updated}
                </span>
              </div>

              <p className="text-gray-400 mb-4">
                {comparison.description}
              </p>

              <div className="flex flex-wrap gap-2">
                {comparison.tools.map((tool) => (
                  <span
                    key={tool}
                    className="text-xs bg-white/10 px-2 py-1 rounded-lg text-gray-300"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </Link>
          ))}
        </div>

        {/* Coming Soon */}
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-8">
            Coming <span className="text-forge-purple">Soon</span>
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              { title: 'Best AI Writing Tools', desc: 'Long-form content generators compared' },
              { title: 'Best Vector Databases', desc: 'Pinecone, Weaviate, Chroma, Qdrant' },
              { title: 'Best LLM APIs', desc: 'OpenAI, Anthropic, Google, Mistral compared' },
              { title: 'Best AI Voice Generators', desc: 'ElevenLabs, Murf, Play.ht, and more' },
            ].map((item) => (
              <div
                key={item.title}
                className="bg-white/5 border border-white/10 rounded-xl p-4 opacity-60"
              >
                <h3 className="font-medium text-gray-300">{item.title}</h3>
                <p className="text-sm text-gray-500">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <p className="text-gray-400 mb-4">
            Want to try our free AI tools?
          </p>
          <div className="flex justify-center gap-4 flex-wrap">
            <Link
              href="/tools"
              className="inline-block px-6 py-3 bg-forge-cyan text-forge-dark hover:bg-forge-cyan/80 rounded-xl font-semibold transition-all"
            >
              Explore Free Tools
            </Link>
            <Link
              href="/blog"
              className="inline-block px-6 py-3 bg-white/10 hover:bg-white/20 rounded-xl font-semibold transition-all"
            >
              Read Our Blog
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}
