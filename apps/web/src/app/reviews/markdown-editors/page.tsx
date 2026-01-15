'use client'

import { useState, useCallback, useEffect } from 'react'
import Link from 'next/link'
import ShareButton from '@/components/ShareButton'

interface Tool {
  name: string
  tagline: string
  pricing: string
  pricingDetails: string
  bestFor: string
  features: string[]
  limitations: string[]
  verdict: string
  rating: number
  url: string
}

const tools: Tool[] = [
  {
    name: 'Obsidian',
    tagline: 'A second brain, for you, forever',
    pricing: 'Free / $50/year',
    pricingDetails: 'Free for personal use. Sync $4/mo, Publish $8/mo.',
    bestFor: 'Knowledge management, linked notes, PKM enthusiasts',
    features: [
      'Local-first (your files, your control)',
      'Powerful linking with [[backlinks]]',
      'Graph view for visualizing connections',
      'Massive plugin ecosystem (1000+)',
      'Canvas for visual note-taking',
      'Works offline, syncs via your choice',
    ],
    limitations: [
      'Learning curve for beginners',
      'Mobile apps less polished',
      'Sync requires payment or DIY',
      'Can become overwhelming with plugins',
    ],
    verdict: 'The gold standard for personal knowledge management. Best for power users who want full control over their notes.',
    rating: 9,
    url: 'https://obsidian.md',
  },
  {
    name: 'Notion',
    tagline: 'All-in-one workspace',
    pricing: 'Free / $10/month',
    pricingDetails: 'Free for personal. Plus $10/mo, Business $15/mo.',
    bestFor: 'Team collaboration, databases, project management',
    features: [
      'Databases with multiple views',
      'Real-time collaboration',
      'Templates for everything',
      'API for integrations',
      'AI features built-in',
      'Beautiful, polished interface',
    ],
    limitations: [
      'Cloud-only (no offline mode)',
      'Not pure markdown (proprietary format)',
      'Can be slow with large workspaces',
      'Export limitations',
    ],
    verdict: 'Best for teams and those who need databases alongside notes. Less suitable for markdown purists.',
    rating: 8,
    url: 'https://notion.so',
  },
  {
    name: 'Typora',
    tagline: 'A minimal markdown editor',
    pricing: '$14.99 (one-time)',
    pricingDetails: 'One-time purchase. Free trial available.',
    bestFor: 'Distraction-free writing, clean exports',
    features: [
      'True WYSIWYG markdown',
      'Live preview while typing',
      'Clean, minimal interface',
      'Excellent export (PDF, Word, HTML)',
      'Custom themes',
      'Focus and typewriter modes',
    ],
    limitations: [
      'No built-in sync',
      'Single file focus (no vault)',
      'Limited organization features',
      'No mobile version',
    ],
    verdict: 'The purest markdown writing experience. Perfect for writers who just want to write without distractions.',
    rating: 8,
    url: 'https://typora.io',
  },
  {
    name: 'VS Code',
    tagline: 'Code editor with great markdown support',
    pricing: 'Free',
    pricingDetails: 'Completely free and open source.',
    bestFor: 'Developers, documentation, README files',
    features: [
      'Free and open source',
      'Excellent extensions (Markdown All in One, etc.)',
      'Git integration built-in',
      'Live preview side-by-side',
      'Snippets and shortcuts',
      'Works with any file system',
    ],
    limitations: [
      'Not designed for notes/PKM',
      'Requires extensions for good experience',
      'Overkill for simple writing',
      'No graph or backlinks without extensions',
    ],
    verdict: 'Already using VS Code? It handles markdown excellently with the right extensions. Best for developers.',
    rating: 7,
    url: 'https://code.visualstudio.com',
  },
  {
    name: 'iA Writer',
    tagline: 'The focused writing app',
    pricing: '$49.99 (one-time)',
    pricingDetails: 'One-time per platform. Family sharing available.',
    bestFor: 'Professional writers, long-form content',
    features: [
      'Beautiful, distraction-free design',
      'Focus mode highlights current sentence',
      'Syntax highlighting for markdown',
      'iCloud/Dropbox sync',
      'Excellent typography',
      'Cross-platform (Mac, Windows, iOS, Android)',
    ],
    limitations: [
      'Expensive for casual users',
      'Separate purchase per platform',
      'No linking/backlinks',
      'Limited organization',
    ],
    verdict: 'Premium writing experience for serious writers. The typography and focus features are unmatched.',
    rating: 8,
    url: 'https://ia.net/writer',
  },
]

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1">
      {[...Array(10)].map((_, i) => (
        <div
          key={i}
          className={`w-2 h-6 rounded-sm ${
            i < rating ? 'bg-forge-cyan' : 'bg-white/10'
          }`}
        />
      ))}
      <span className="ml-2 text-forge-cyan font-bold">{rating}/10</span>
    </div>
  )
}

function slugify(name: string) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
}

export default function MarkdownEditorsPage() {
  const [sharedTool, setSharedTool] = useState<string | null>(null)
  const [copiedVerdict, setCopiedVerdict] = useState<string | null>(null)

  // Scroll to tool from URL hash on mount
  useEffect(() => {
    if (typeof window === 'undefined') return
    const hash = window.location.hash.slice(1)
    if (hash) {
      setTimeout(() => {
        const element = document.getElementById(hash)
        if (element) element.scrollIntoView({ behavior: 'smooth', block: 'center' })
      }, 100)
    }
  }, [])

  const shareTool = useCallback(async (tool: Tool) => {
    const slug = slugify(tool.name)
    const shareUrl = `${window.location.origin}${window.location.pathname}#${slug}`
    await navigator.clipboard.writeText(shareUrl)
    setSharedTool(tool.name)
    setTimeout(() => setSharedTool(null), 2000)
  }, [])

  const copyVerdict = useCallback(async (tool: Tool) => {
    await navigator.clipboard.writeText(`${tool.name}: ${tool.verdict}`)
    setCopiedVerdict(tool.name)
    setTimeout(() => setCopiedVerdict(null), 2000)
  }, [])

  const downloadComparison = useCallback(() => {
    const content = `# Best Markdown Editors 2026

## Quick Comparison

| Tool | Best For | Pricing | Rating |
|------|----------|---------|--------|
${tools.map(t => `| ${t.name} | ${t.bestFor} | ${t.pricing} | ${t.rating}/10 |`).join('\n')}

## Detailed Reviews

${tools.map((t, i) => `### #${i + 1} ${t.name}
**${t.tagline}**

**Pricing:** ${t.pricing} (${t.pricingDetails})
**Best For:** ${t.bestFor}
**Rating:** ${t.rating}/10

**Strengths:**
${t.features.map(f => `- ${f}`).join('\n')}

**Limitations:**
${t.limitations.map(l => `- ${l}`).join('\n')}

**Verdict:** ${t.verdict}

---
`).join('\n')}

Generated by substratia.io/reviews/markdown-editors
`
    const blob = new Blob([content], { type: 'text/markdown' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'markdown-editors-comparison.md'
    a.click()
    URL.revokeObjectURL(url)
  }, [])

  return (
    <main className="min-h-screen text-white">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="flex items-center justify-between mb-4">
            <Link href="/reviews" className="text-forge-cyan hover:underline text-sm">
              &larr; Back to Reviews
            </Link>
            <ShareButton title="Best Markdown Editors 2026 - Substratia" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Best Markdown Editors <span className="text-forge-cyan">2026</span>
          </h1>
          <p className="text-xl text-gray-300 mb-6">
            A comprehensive comparison of the top tools for writing and organizing in markdown.
          </p>
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400">
            <span>Last updated: January 2026</span>
            <span>|</span>
            <span>5 tools compared</span>
            <span>|</span>
            <span>By Substratia</span>
            <button
              onClick={downloadComparison}
              className="px-3 py-1 bg-forge-cyan/20 hover:bg-forge-cyan/30 text-forge-cyan rounded-lg transition-all"
            >
              Download .md
            </button>
          </div>
        </div>

        {/* Quick Comparison Table */}
        <div className="max-w-5xl mx-auto mb-16 overflow-x-auto">
          <h2 className="text-2xl font-bold mb-6">Quick Comparison</h2>
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-white/20">
                <th className="text-left py-3 px-4">Tool</th>
                <th className="text-left py-3 px-4">Best For</th>
                <th className="text-left py-3 px-4">Pricing</th>
                <th className="text-left py-3 px-4">Rating</th>
              </tr>
            </thead>
            <tbody>
              {tools.map((tool) => (
                <tr key={tool.name} className="border-b border-white/10 hover:bg-white/5">
                  <td className="py-3 px-4 font-medium">{tool.name}</td>
                  <td className="py-3 px-4 text-gray-400 text-sm">{tool.bestFor}</td>
                  <td className="py-3 px-4 text-forge-cyan">{tool.pricing}</td>
                  <td className="py-3 px-4">
                    <span className="text-forge-cyan font-bold">{tool.rating}/10</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Detailed Reviews */}
        <div className="max-w-4xl mx-auto space-y-12">
          <h2 className="text-2xl font-bold">Detailed Reviews</h2>

          {tools.map((tool, index) => (
            <div
              key={tool.name}
              id={slugify(tool.name)}
              className="bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8 scroll-mt-24"
            >
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-2xl font-bold text-forge-cyan">#{index + 1}</span>
                    <h3 className="text-2xl font-bold">{tool.name}</h3>
                  </div>
                  <p className="text-gray-400">{tool.tagline}</p>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <StarRating rating={tool.rating} />
                  <a
                    href={tool.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-forge-cyan hover:underline"
                  >
                    Visit website &rarr;
                  </a>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h4 className="font-semibold text-green-400 mb-2">Strengths</h4>
                  <ul className="space-y-1">
                    {tool.features.map((feature, i) => (
                      <li key={i} className="text-sm text-gray-300 flex items-start gap-2">
                        <span className="text-green-400 mt-1">+</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-red-400 mb-2">Limitations</h4>
                  <ul className="space-y-1">
                    {tool.limitations.map((limitation, i) => (
                      <li key={i} className="text-sm text-gray-300 flex items-start gap-2">
                        <span className="text-red-400 mt-1">-</span>
                        {limitation}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="flex flex-col md:flex-row gap-4 mb-4 p-4 bg-white/5 rounded-xl">
                <div className="flex-1">
                  <span className="text-xs text-gray-500 uppercase">Pricing</span>
                  <p className="font-medium">{tool.pricing}</p>
                  <p className="text-sm text-gray-400">{tool.pricingDetails}</p>
                </div>
                <div className="flex-1">
                  <span className="text-xs text-gray-500 uppercase">Best For</span>
                  <p className="font-medium">{tool.bestFor}</p>
                </div>
              </div>

              <div className="border-t border-white/10 pt-4">
                <div className="flex justify-between items-start gap-4">
                  <div className="flex-1">
                    <h4 className="font-semibold mb-2">Our Verdict</h4>
                    <p className="text-gray-300">{tool.verdict}</p>
                  </div>
                  <div className="flex gap-2 shrink-0">
                    <button
                      onClick={() => copyVerdict(tool)}
                      className={`px-3 py-1 text-xs rounded-lg transition-all ${
                        copiedVerdict === tool.name
                          ? 'bg-green-500 text-white'
                          : 'bg-white/10 hover:bg-white/20'
                      }`}
                    >
                      {copiedVerdict === tool.name ? 'Copied!' : 'Copy'}
                    </button>
                    <button
                      onClick={() => shareTool(tool)}
                      className={`px-3 py-1 text-xs rounded-lg transition-all ${
                        sharedTool === tool.name
                          ? 'bg-green-500 text-white'
                          : 'bg-forge-cyan/20 hover:bg-forge-cyan/30 text-forge-cyan'
                      }`}
                    >
                      {sharedTool === tool.name ? 'Link Copied!' : 'Share'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Recommendations */}
        <div className="max-w-4xl mx-auto mt-16">
          <h2 className="text-2xl font-bold mb-6">Our Recommendations</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-forge-cyan/20 to-transparent border border-forge-cyan/30 rounded-xl p-6">
              <h3 className="font-bold mb-2">For Knowledge Management</h3>
              <p className="text-2xl font-bold text-forge-cyan mb-2">Obsidian</p>
              <p className="text-sm text-gray-400">
                Best for building a personal knowledge base with linked notes and powerful organization.
              </p>
            </div>
            <div className="bg-gradient-to-br from-forge-purple/20 to-transparent border border-forge-purple/30 rounded-xl p-6">
              <h3 className="font-bold mb-2">For Teams</h3>
              <p className="text-2xl font-bold text-forge-purple mb-2">Notion</p>
              <p className="text-sm text-gray-400">
                Best for collaborative workspaces combining notes, databases, and project management.
              </p>
            </div>
            <div className="bg-gradient-to-br from-green-500/20 to-transparent border border-green-500/30 rounded-xl p-6">
              <h3 className="font-bold mb-2">For Writers</h3>
              <p className="text-2xl font-bold text-green-400 mb-2">Typora</p>
              <p className="text-sm text-gray-400">
                Best for distraction-free writing with beautiful WYSIWYG markdown editing.
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="max-w-4xl mx-auto mt-16 text-center">
          <h2 className="text-2xl font-bold mb-4">Try Our Markdown Tools</h2>
          <p className="text-gray-400 mb-6">
            Preview your markdown or strip formatting instantly with our free tools.
          </p>
          <div className="flex justify-center gap-4 flex-wrap">
            <Link
              href="/tools/markdown-preview"
              className="px-6 py-3 bg-forge-cyan text-forge-dark hover:bg-forge-cyan/80 rounded-xl font-semibold transition-all"
            >
              Markdown Preview
            </Link>
            <Link
              href="/tools/markdown-stripper"
              className="px-6 py-3 bg-forge-purple hover:bg-forge-purple/80 rounded-xl font-semibold transition-all"
            >
              Markdown Stripper
            </Link>
            <Link
              href="/tools"
              className="px-6 py-3 bg-white/10 hover:bg-white/20 rounded-xl font-semibold transition-all"
            >
              All Tools
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}
