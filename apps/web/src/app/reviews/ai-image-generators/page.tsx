'use client'

import { useState, useCallback, useEffect } from 'react'
import Link from 'next/link'
import ShareButton from '@/components/ShareButton'

interface Generator {
  name: string
  company: string
  pricing: string
  bestFor: string
  quality: number
  speed: number
  ease: number
  control: number
  pros: string[]
  cons: string[]
  promptStyle: string
}

const generators: Generator[] = [
  {
    name: 'Midjourney v6.1',
    company: 'Midjourney',
    pricing: '$10-60/month',
    bestFor: 'Artistic, stylized images',
    quality: 95,
    speed: 80,
    ease: 75,
    control: 85,
    pros: [
      'Best aesthetic quality overall',
      'Excellent at artistic styles',
      'Strong community and resources',
      'Consistent, reliable output',
    ],
    cons: [
      'Discord-only interface',
      'No API access',
      'Limited fine control',
      'Subscription required',
    ],
    promptStyle: 'Natural language with --ar, --v, --stylize parameters',
  },
  {
    name: 'DALL-E 3',
    company: 'OpenAI',
    pricing: '$20/month (ChatGPT Plus)',
    bestFor: 'Text rendering, following instructions',
    quality: 90,
    speed: 85,
    ease: 95,
    control: 70,
    pros: [
      'Best text rendering in images',
      'Excellent instruction following',
      'Easy to use via ChatGPT',
      'API available',
    ],
    cons: [
      'Less artistic than Midjourney',
      'Content restrictions',
      'Limited style control',
      'No negative prompts',
    ],
    promptStyle: 'Natural language descriptions, ChatGPT enhances prompts',
  },
  {
    name: 'Stable Diffusion XL',
    company: 'Stability AI',
    pricing: 'Free (local) / $10+/month (hosted)',
    bestFor: 'Maximum control, local generation',
    quality: 88,
    speed: 70,
    ease: 50,
    control: 98,
    pros: [
      'Free and open source',
      'Run locally, full privacy',
      'Extensive customization',
      'Huge community of models',
    ],
    cons: [
      'Requires technical setup',
      'Needs powerful GPU',
      'Steeper learning curve',
      'Inconsistent quality without tuning',
    ],
    promptStyle: 'Weighted syntax (keyword:1.2), extensive negative prompts',
  },
  {
    name: 'Grok (xAI)',
    company: 'xAI',
    pricing: '$8-16/month (X Premium)',
    bestFor: 'Quick generation, integrated with X',
    quality: 85,
    speed: 90,
    ease: 90,
    control: 65,
    pros: [
      'Very fast generation',
      'Integrated with X/Twitter',
      'Good general quality',
      'Also does video generation',
    ],
    cons: [
      'Less refined than Midjourney',
      'Requires X subscription',
      'Limited style options',
      'Newer, less documented',
    ],
    promptStyle: 'Natural language, simple and direct',
  },
  {
    name: 'Flux',
    company: 'Black Forest Labs',
    pricing: 'Free tier / Pay-per-use',
    bestFor: 'Photorealism, faces',
    quality: 92,
    speed: 75,
    ease: 80,
    control: 80,
    pros: [
      'Excellent photorealism',
      'Great at human faces',
      'Good free tier',
      'Multiple model variants',
    ],
    cons: [
      'Newer, less mature ecosystem',
      'Limited artistic styles',
      'Fewer resources/tutorials',
      'Variable availability',
    ],
    promptStyle: 'Natural language with detailed descriptions',
  },
]

function ScoreBar({ score, label }: { score: number; label: string }) {
  return (
    <div className="mb-2">
      <div className="flex justify-between text-xs text-gray-400 mb-1">
        <span>{label}</span>
        <span>{score}/100</span>
      </div>
      <div className="h-2 bg-white/10 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-forge-purple to-forge-cyan rounded-full"
          style={{ width: `${score}%` }}
        />
      </div>
    </div>
  )
}

function slugify(name: string) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
}

export default function AIImageGeneratorsPage() {
  const [sharedGen, setSharedGen] = useState<string | null>(null)

  // Scroll to generator from URL hash on mount
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

  const shareGenerator = useCallback(async (gen: Generator) => {
    const slug = slugify(gen.name)
    const shareUrl = `${window.location.origin}${window.location.pathname}#${slug}`
    await navigator.clipboard.writeText(shareUrl)
    setSharedGen(gen.name)
    setTimeout(() => setSharedGen(null), 2000)
  }, [])

  const downloadComparison = useCallback(() => {
    const content = `# Best AI Image Generators 2026

## Quick Comparison

| Tool | Best For | Pricing | Quality |
|------|----------|---------|---------|
${generators.map(g => `| ${g.name} | ${g.bestFor} | ${g.pricing} | ${g.quality}/100 |`).join('\n')}

## Detailed Reviews

${generators.map((g, i) => `### #${i + 1} ${g.name}
**Company:** ${g.company}
**Pricing:** ${g.pricing}
**Best For:** ${g.bestFor}

**Scores:**
- Quality: ${g.quality}/100
- Speed: ${g.speed}/100
- Ease of Use: ${g.ease}/100
- Creative Control: ${g.control}/100

**Pros:**
${g.pros.map(p => `- ${p}`).join('\n')}

**Cons:**
${g.cons.map(c => `- ${c}`).join('\n')}

**Prompt Style:** ${g.promptStyle}

---
`).join('\n')}

Generated by substratia.io/reviews/ai-image-generators
`
    const blob = new Blob([content], { type: 'text/markdown' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'ai-image-generators-comparison.md'
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
            <ShareButton title="Best AI Image Generators 2026 - Substratia" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Best AI Image Generators <span className="text-forge-cyan">2026</span>
          </h1>
          <p className="text-xl text-gray-300 mb-6">
            A comprehensive comparison of the top AI image generation tools. Updated January 2026.
          </p>
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400">
            <span>Last updated: January 2026</span>
            <span>|</span>
            <span>5 tools compared</span>
            <button
              onClick={downloadComparison}
              className="px-3 py-1 bg-forge-cyan/20 hover:bg-forge-cyan/30 text-forge-cyan rounded-lg transition-all"
            >
              Download .md
            </button>
          </div>
        </div>

        {/* Quick Summary Table */}
        <div className="max-w-4xl mx-auto mb-12 overflow-x-auto">
          <h2 className="text-2xl font-bold mb-6">Quick Comparison</h2>
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left py-3 px-4">Tool</th>
                <th className="text-left py-3 px-4">Best For</th>
                <th className="text-left py-3 px-4">Pricing</th>
                <th className="text-center py-3 px-4">Quality</th>
              </tr>
            </thead>
            <tbody>
              {generators.map((gen) => (
                <tr key={gen.name} className="border-b border-white/5 hover:bg-white/5">
                  <td className="py-3 px-4 font-medium">{gen.name}</td>
                  <td className="py-3 px-4 text-gray-400">{gen.bestFor}</td>
                  <td className="py-3 px-4 text-gray-400">{gen.pricing}</td>
                  <td className="py-3 px-4 text-center">
                    <span className={`px-2 py-1 rounded text-xs ${
                      gen.quality >= 90 ? 'bg-green-500/20 text-green-400' :
                      gen.quality >= 85 ? 'bg-yellow-500/20 text-yellow-400' :
                      'bg-gray-500/20 text-gray-400'
                    }`}>
                      {gen.quality}/100
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Detailed Cards */}
        <div className="max-w-4xl mx-auto space-y-8 mb-12">
          <h2 className="text-2xl font-bold">Detailed Breakdown</h2>

          {generators.map((gen, index) => (
            <div
              key={gen.name}
              id={slugify(gen.name)}
              className="bg-white/5 border border-white/10 rounded-xl p-6 scroll-mt-24"
            >
              <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
                <div>
                  <span className="text-forge-cyan text-sm">#{index + 1}</span>
                  <h3 className="text-2xl font-bold">{gen.name}</h3>
                  <p className="text-gray-400">{gen.company}</p>
                </div>
                <div className="text-right">
                  <div className="text-forge-purple font-medium">{gen.pricing}</div>
                  <div className="text-sm text-gray-500">Best for: {gen.bestFor}</div>
                </div>
              </div>

              {/* Scores */}
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <ScoreBar score={gen.quality} label="Image Quality" />
                  <ScoreBar score={gen.speed} label="Generation Speed" />
                </div>
                <div>
                  <ScoreBar score={gen.ease} label="Ease of Use" />
                  <ScoreBar score={gen.control} label="Creative Control" />
                </div>
              </div>

              {/* Pros/Cons */}
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h4 className="text-sm font-medium text-green-400 mb-2">Pros</h4>
                  <ul className="space-y-1">
                    {gen.pros.map((pro) => (
                      <li key={pro} className="text-sm text-gray-400 flex items-start gap-2">
                        <span className="text-green-400">+</span> {pro}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-red-400 mb-2">Cons</h4>
                  <ul className="space-y-1">
                    {gen.cons.map((con) => (
                      <li key={con} className="text-sm text-gray-400 flex items-start gap-2">
                        <span className="text-red-400">-</span> {con}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Prompt Style */}
              <div className="bg-black/30 rounded-lg p-4 flex justify-between items-start gap-4">
                <div className="flex-1">
                  <h4 className="text-xs text-gray-500 mb-1">Prompt Style</h4>
                  <p className="text-sm text-gray-300">{gen.promptStyle}</p>
                </div>
                <button
                  onClick={() => shareGenerator(gen)}
                  className={`px-3 py-1 text-xs rounded-lg transition-all shrink-0 ${
                    sharedGen === gen.name
                      ? 'bg-green-500 text-white'
                      : 'bg-forge-cyan/20 hover:bg-forge-cyan/30 text-forge-cyan'
                  }`}
                >
                  {sharedGen === gen.name ? 'Link Copied!' : 'Share'}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Recommendations */}
        <div className="max-w-4xl mx-auto mb-12">
          <h2 className="text-2xl font-bold mb-6">Our Recommendations</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gradient-to-br from-forge-purple/20 to-transparent border border-forge-purple/30 rounded-xl p-6">
              <h3 className="font-bold text-lg mb-2">Best Overall Quality</h3>
              <p className="text-forge-cyan text-xl font-bold mb-2">Midjourney v6.1</p>
              <p className="text-gray-400 text-sm">
                For pure aesthetic quality and artistic output, Midjourney remains the leader.
                If you want images that look like professional artwork, this is your choice.
              </p>
            </div>
            <div className="bg-gradient-to-br from-forge-cyan/20 to-transparent border border-forge-cyan/30 rounded-xl p-6">
              <h3 className="font-bold text-lg mb-2">Best for Beginners</h3>
              <p className="text-forge-cyan text-xl font-bold mb-2">DALL-E 3</p>
              <p className="text-gray-400 text-sm">
                Integrated into ChatGPT, DALL-E 3 is the easiest to use. Just describe what
                you want in plain English. Great text rendering too.
              </p>
            </div>
            <div className="bg-gradient-to-br from-green-500/20 to-transparent border border-green-500/30 rounded-xl p-6">
              <h3 className="font-bold text-lg mb-2">Best Free Option</h3>
              <p className="text-forge-cyan text-xl font-bold mb-2">Stable Diffusion XL</p>
              <p className="text-gray-400 text-sm">
                Run it locally for free with full control. Requires technical setup and a
                good GPU, but offers unmatched customization.
              </p>
            </div>
            <div className="bg-gradient-to-br from-yellow-500/20 to-transparent border border-yellow-500/30 rounded-xl p-6">
              <h3 className="font-bold text-lg mb-2">Best for Photorealism</h3>
              <p className="text-forge-cyan text-xl font-bold mb-2">Flux</p>
              <p className="text-gray-400 text-sm">
                For photorealistic images, especially human faces, Flux produces remarkably
                realistic results. Great free tier available.
              </p>
            </div>
          </div>
        </div>

        {/* Tool CTA */}
        <div className="max-w-4xl mx-auto bg-white/5 border border-white/10 rounded-xl p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Build Better Prompts</h2>
          <p className="text-gray-400 mb-6 max-w-xl mx-auto">
            Use our free Image Prompt Generator to craft prompts optimized for any of these
            platforms. 50+ style presets, negative prompts, and platform-specific formatting.
          </p>
          <Link
            href="/tools/image-prompt-generator"
            className="inline-block px-6 py-3 bg-forge-cyan text-forge-dark hover:bg-forge-cyan/80 rounded-xl font-semibold transition-all"
          >
            Try Image Prompt Generator
          </Link>
        </div>

        {/* Related */}
        <div className="max-w-4xl mx-auto mt-12">
          <h2 className="text-xl font-bold mb-4">Related Comparisons</h2>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/reviews/ai-video-generators"
              className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-sm transition-all"
            >
              AI Video Generators &rarr;
            </Link>
            <Link
              href="/blog/memory-mcp-vs-alternatives"
              className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-sm transition-all"
            >
              MCP Memory Servers &rarr;
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}
