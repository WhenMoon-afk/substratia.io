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
    name: 'Claude Code',
    tagline: 'Agentic coding with deep reasoning',
    pricing: '$20-200/month',
    pricingDetails: 'Pro $20, Max $100, Max+ $200. API available.',
    bestFor: 'Complex refactoring, multi-file changes, autonomous tasks',
    features: [
      'Full agentic capabilities (file creation, terminal commands)',
      'Extended thinking with ultrathink/thinkhard modes',
      'Multi-file awareness and refactoring',
      'Git integration and commit generation',
      'Subagent spawning for parallel tasks',
      'Context recovery with momentum plugin',
    ],
    limitations: [
      'CLI-based (no IDE integration yet)',
      'Context window limitations on long sessions',
      'Requires explicit permission grants',
      'Learning curve for prompt optimization',
    ],
    verdict: 'The most capable agentic coding assistant. Best for complex, multi-step tasks where you need Claude to work autonomously.',
    rating: 9,
    url: 'https://claude.ai/code',
  },
  {
    name: 'Cursor',
    tagline: 'AI-first code editor',
    pricing: '$20/month',
    pricingDetails: 'Pro plan. Free tier with limited requests.',
    bestFor: 'Daily coding with inline assistance, quick edits',
    features: [
      'Full IDE (VS Code fork) with AI built-in',
      'Inline code completion (Tab to accept)',
      'Chat with codebase context',
      'Cmd+K for inline edits',
      'Multi-file editing in composer',
      'Multiple model support (Claude, GPT-4)',
    ],
    limitations: [
      'Must use their editor (not a plugin)',
      'Agentic features still maturing',
      'Can be expensive at scale',
      'Occasional hallucinations in suggestions',
    ],
    verdict: 'Excellent for developers who want AI deeply integrated into their editor. Great balance of assistance and control.',
    rating: 8,
    url: 'https://cursor.com',
  },
  {
    name: 'GitHub Copilot',
    tagline: 'Your AI pair programmer',
    pricing: '$10-39/month',
    pricingDetails: 'Individual $10, Business $19, Enterprise $39.',
    bestFor: 'Code completion, boilerplate generation',
    features: [
      'Works in VS Code, JetBrains, Neovim',
      'Fast inline completions',
      'Chat interface with @workspace',
      'PR summaries and code review',
      'Enterprise security and compliance',
      'Copilot Workspace for planning',
    ],
    limitations: [
      'Less capable at complex reasoning',
      'Context window smaller than competitors',
      'Chat less sophisticated than Claude',
      'Limited agentic capabilities',
    ],
    verdict: 'The industry standard for code completion. Great for teams needing enterprise features and broad IDE support.',
    rating: 7,
    url: 'https://github.com/features/copilot',
  },
  {
    name: 'Codeium',
    tagline: 'Free AI coding assistant',
    pricing: 'Free / $15/month',
    pricingDetails: 'Generous free tier. Teams plan for advanced features.',
    bestFor: 'Budget-conscious developers, students',
    features: [
      'Free unlimited autocomplete',
      'Chat with codebase context',
      '70+ IDE integrations',
      'In-editor search (Codeium Search)',
      'Self-hosted option available',
      'Fine-tuning on your code',
    ],
    limitations: [
      'Quality slightly below Copilot/Cursor',
      'Less sophisticated reasoning',
      'Fewer advanced features',
      'Smaller community',
    ],
    verdict: 'Best free option available. Surprisingly capable for $0, making it ideal for students and budget-conscious teams.',
    rating: 7,
    url: 'https://codeium.com',
  },
  {
    name: 'Windsurf (Codeium)',
    tagline: 'Agentic IDE by Codeium',
    pricing: '$15/month',
    pricingDetails: 'Pro plan includes Cascade agentic features.',
    bestFor: 'Agentic coding with IDE comfort',
    features: [
      'Full IDE (VS Code fork)',
      'Cascade: autonomous multi-step actions',
      'Flows: AI-guided workflows',
      'Deep codebase understanding',
      'Terminal command execution',
      'Built on Codeium infrastructure',
    ],
    limitations: [
      'Newer product, still maturing',
      'Must use their editor',
      'Cascade quality inconsistent',
      'Competing with Cursor',
    ],
    verdict: 'Promising Cursor alternative with unique Cascade feature. Worth trying for the agentic capabilities at a competitive price.',
    rating: 7,
    url: 'https://codeium.com/windsurf',
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

export default function AICodingAssistantsPage() {
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
    const content = `# Best AI Coding Assistants 2026

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

Generated by substratia.io/reviews/ai-coding-assistants
`
    const blob = new Blob([content], { type: 'text/markdown' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'ai-coding-assistants-comparison.md'
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
            <ShareButton title="Best AI Coding Assistants 2026 - Substratia" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Best AI Coding Assistants <span className="text-forge-cyan">2026</span>
          </h1>
          <p className="text-xl text-gray-300 mb-6">
            A comprehensive comparison of the top AI tools for software development.
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
              <h3 className="font-bold mb-2">For Complex Tasks</h3>
              <p className="text-2xl font-bold text-forge-cyan mb-2">Claude Code</p>
              <p className="text-sm text-gray-400">
                Best for multi-file refactoring, autonomous coding, and complex reasoning tasks.
              </p>
            </div>
            <div className="bg-gradient-to-br from-forge-purple/20 to-transparent border border-forge-purple/30 rounded-xl p-6">
              <h3 className="font-bold mb-2">For Daily Coding</h3>
              <p className="text-2xl font-bold text-forge-purple mb-2">Cursor</p>
              <p className="text-sm text-gray-400">
                Best for developers who want AI deeply integrated into their editing workflow.
              </p>
            </div>
            <div className="bg-gradient-to-br from-green-500/20 to-transparent border border-green-500/30 rounded-xl p-6">
              <h3 className="font-bold mb-2">For Budget</h3>
              <p className="text-2xl font-bold text-green-400 mb-2">Codeium</p>
              <p className="text-sm text-gray-400">
                Best free option with surprisingly capable autocomplete and chat features.
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="max-w-4xl mx-auto mt-16 text-center">
          <h2 className="text-2xl font-bold mb-4">Optimize Your Claude Code Prompts</h2>
          <p className="text-gray-400 mb-6">
            Using Claude Code? Our tools help you get the most out of it.
          </p>
          <div className="flex justify-center gap-4 flex-wrap">
            <Link
              href="/tools/prompt-optimizer"
              className="px-6 py-3 bg-forge-cyan text-forge-dark hover:bg-forge-cyan/80 rounded-xl font-semibold transition-all"
            >
              Prompt Optimizer
            </Link>
            <Link
              href="/tools/cost-calculator"
              className="px-6 py-3 bg-forge-purple hover:bg-forge-purple/80 rounded-xl font-semibold transition-all"
            >
              Cost Calculator
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
