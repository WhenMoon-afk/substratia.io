'use client'

import { useState, useCallback, useEffect } from 'react'
import Link from 'next/link'
import ShareButton from '@/components/ShareButton'

interface VideoGenerator {
  name: string
  company: string
  pricing: string
  bestFor: string
  quality: number
  motion: number
  duration: string
  ease: number
  pros: string[]
  cons: string[]
  features: string[]
}

const generators: VideoGenerator[] = [
  {
    name: 'Runway Gen-3 Alpha',
    company: 'Runway',
    pricing: '$12-76/month',
    bestFor: 'Professional video production',
    quality: 95,
    motion: 92,
    duration: '10-18 sec',
    ease: 85,
    pros: [
      'Best overall video quality',
      'Excellent motion coherence',
      'Advanced camera controls',
      'Professional-grade output',
    ],
    cons: [
      'Most expensive option',
      'Credit-based system',
      'Longer generation times',
      'Limited free tier',
    ],
    features: ['Text-to-video', 'Image-to-video', 'Camera controls', 'Motion brush', 'Video extension'],
  },
  {
    name: 'Pika Labs 1.5',
    company: 'Pika',
    pricing: '$8-58/month',
    bestFor: 'Creative, stylized videos',
    quality: 88,
    motion: 85,
    duration: '3-4 sec',
    ease: 90,
    pros: [
      'Good balance of quality and price',
      'Creative style options',
      'Fast generation',
      'User-friendly interface',
    ],
    cons: [
      'Shorter video duration',
      'Less realistic than Runway',
      'Limited camera control',
      'Occasional artifacts',
    ],
    features: ['Text-to-video', 'Image-to-video', 'Style presets', 'Sound effects', 'Lip sync'],
  },
  {
    name: 'Luma Dream Machine',
    company: 'Luma AI',
    pricing: '$24-100/month',
    bestFor: 'Realistic motion, complex scenes',
    quality: 90,
    motion: 90,
    duration: '5-10 sec',
    ease: 80,
    pros: [
      'Very realistic motion',
      'Good at complex scenes',
      'Camera movement support',
      'Improving rapidly',
    ],
    cons: [
      'Can struggle with humans',
      'Variable quality',
      'Higher pricing tier',
      'Newer platform',
    ],
    features: ['Text-to-video', 'Image-to-video', 'Camera motion', 'Keyframe control', 'Video extension'],
  },
  {
    name: 'Kling AI',
    company: 'Kuaishou',
    pricing: 'Free tier / Credits',
    bestFor: 'Long-form video, value',
    quality: 85,
    motion: 82,
    duration: 'Up to 2 min',
    ease: 75,
    pros: [
      'Longest video duration',
      'Good free tier',
      'Improving quality',
      'Multiple aspect ratios',
    ],
    cons: [
      'Quality behind leaders',
      'Inconsistent results',
      'Less intuitive interface',
      'Limited English support',
    ],
    features: ['Text-to-video', 'Image-to-video', 'Long-form generation', 'Character consistency'],
  },
  {
    name: 'Grok Video',
    company: 'xAI',
    pricing: '$8-16/month (X Premium)',
    bestFor: 'Quick generation, social content',
    quality: 80,
    motion: 78,
    duration: '5-10 sec',
    ease: 92,
    pros: [
      'Very fast generation',
      'Easy to use',
      'Integrated with X',
      'Good for quick content',
    ],
    cons: [
      'Lower quality than leaders',
      'Limited controls',
      'Requires X subscription',
      'Fewer features',
    ],
    features: ['Text-to-video', 'Quick generation', 'Social media integration'],
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

export default function AIVideoGeneratorsPage() {
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

  const shareGenerator = useCallback(async (gen: VideoGenerator) => {
    const slug = slugify(gen.name)
    const shareUrl = `${window.location.origin}${window.location.pathname}#${slug}`
    await navigator.clipboard.writeText(shareUrl)
    setSharedGen(gen.name)
    setTimeout(() => setSharedGen(null), 2000)
  }, [])

  const downloadComparison = useCallback(() => {
    const content = `# Best AI Video Generators 2026

## Quick Comparison

| Tool | Best For | Max Duration | Pricing | Quality |
|------|----------|--------------|---------|---------|
${generators.map(g => `| ${g.name} | ${g.bestFor} | ${g.duration} | ${g.pricing} | ${g.quality}/100 |`).join('\n')}

## Detailed Reviews

${generators.map((g, i) => `### #${i + 1} ${g.name}
**Company:** ${g.company}
**Pricing:** ${g.pricing}
**Best For:** ${g.bestFor}
**Max Duration:** ${g.duration}

**Scores:**
- Quality: ${g.quality}/100
- Motion: ${g.motion}/100
- Ease of Use: ${g.ease}/100

**Features:** ${g.features.join(', ')}

**Pros:**
${g.pros.map(p => `- ${p}`).join('\n')}

**Cons:**
${g.cons.map(c => `- ${c}`).join('\n')}

---
`).join('\n')}

Generated by substratia.io/reviews/ai-video-generators
`
    const blob = new Blob([content], { type: 'text/markdown' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'ai-video-generators-comparison.md'
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
            <ShareButton title="Best AI Video Generators 2026 - Substratia" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Best AI Video Generators <span className="text-forge-cyan">2026</span>
          </h1>
          <p className="text-xl text-gray-300 mb-6">
            A comprehensive comparison of AI video generation tools. Text-to-video, image-to-video, and beyond.
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
                <th className="text-left py-3 px-4">Max Duration</th>
                <th className="text-left py-3 px-4">Pricing</th>
                <th className="text-center py-3 px-4">Quality</th>
              </tr>
            </thead>
            <tbody>
              {generators.map((gen) => (
                <tr key={gen.name} className="border-b border-white/5 hover:bg-white/5">
                  <td className="py-3 px-4 font-medium">{gen.name}</td>
                  <td className="py-3 px-4 text-gray-400">{gen.bestFor}</td>
                  <td className="py-3 px-4 text-gray-400">{gen.duration}</td>
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
                  <div className="text-sm text-gray-500">Max: {gen.duration}</div>
                </div>
              </div>

              {/* Scores */}
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <ScoreBar score={gen.quality} label="Video Quality" />
                  <ScoreBar score={gen.motion} label="Motion Coherence" />
                </div>
                <div>
                  <ScoreBar score={gen.ease} label="Ease of Use" />
                </div>
              </div>

              {/* Features */}
              <div className="mb-6">
                <h4 className="text-sm font-medium text-gray-400 mb-2">Key Features</h4>
                <div className="flex flex-wrap gap-2">
                  {gen.features.map((feature) => (
                    <span
                      key={feature}
                      className="text-xs bg-forge-cyan/10 text-forge-cyan px-2 py-1 rounded-lg"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </div>

              {/* Pros/Cons */}
              <div className="grid md:grid-cols-2 gap-6 mb-4">
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

              {/* Share Button */}
              <div className="flex justify-end">
                <button
                  onClick={() => shareGenerator(gen)}
                  className={`px-3 py-1 text-xs rounded-lg transition-all ${
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
              <p className="text-forge-cyan text-xl font-bold mb-2">Runway Gen-3 Alpha</p>
              <p className="text-gray-400 text-sm">
                For professional-grade video with the best motion coherence and camera controls.
                Worth the premium for serious creators.
              </p>
            </div>
            <div className="bg-gradient-to-br from-forge-cyan/20 to-transparent border border-forge-cyan/30 rounded-xl p-6">
              <h3 className="font-bold text-lg mb-2">Best Value</h3>
              <p className="text-forge-cyan text-xl font-bold mb-2">Pika Labs 1.5</p>
              <p className="text-gray-400 text-sm">
                Great balance of quality, features, and price. Fast generation and creative
                style options make it perfect for most users.
              </p>
            </div>
            <div className="bg-gradient-to-br from-green-500/20 to-transparent border border-green-500/30 rounded-xl p-6">
              <h3 className="font-bold text-lg mb-2">Best Free Option</h3>
              <p className="text-forge-cyan text-xl font-bold mb-2">Kling AI</p>
              <p className="text-gray-400 text-sm">
                Generous free tier and the longest video duration available. Quality is
                improving rapidly with each update.
              </p>
            </div>
            <div className="bg-gradient-to-br from-yellow-500/20 to-transparent border border-yellow-500/30 rounded-xl p-6">
              <h3 className="font-bold text-lg mb-2">Fastest & Easiest</h3>
              <p className="text-forge-cyan text-xl font-bold mb-2">Grok Video</p>
              <p className="text-gray-400 text-sm">
                For quick social media content without the learning curve. Integrated with
                X for seamless sharing.
              </p>
            </div>
          </div>
        </div>

        {/* Tool CTA */}
        <div className="max-w-4xl mx-auto bg-white/5 border border-white/10 rounded-xl p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Plan Your Video Scenes</h2>
          <p className="text-gray-400 mb-6 max-w-xl mx-auto">
            Use our free Video Prompt Timeline to plan your video scene by scene. Build prompts
            for 7 keyframes, export for any platform.
          </p>
          <Link
            href="/tools/video-prompt-timeline"
            className="inline-block px-6 py-3 bg-forge-cyan text-forge-dark hover:bg-forge-cyan/80 rounded-xl font-semibold transition-all"
          >
            Try Video Prompt Timeline
          </Link>
        </div>

        {/* Related */}
        <div className="max-w-4xl mx-auto mt-12">
          <h2 className="text-xl font-bold mb-4">Related Comparisons</h2>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/reviews/ai-image-generators"
              className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-sm transition-all"
            >
              AI Image Generators &rarr;
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
