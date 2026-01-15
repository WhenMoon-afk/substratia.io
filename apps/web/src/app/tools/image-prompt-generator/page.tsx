'use client'

import { useState, useCallback, useMemo, useEffect } from 'react'
import Link from 'next/link'
import ShareButton from '@/components/ShareButton'
import {
  platforms,
  stylePresets,
  negativePresets,
  aspectRatios,
  categoryLabels,
  formatPrompt,
  type Platform,
  type StyleCategory,
  type StylePreset,
  type NegativePreset,
} from '@/data/imagePromptPresets'

interface Sliders {
  styleIntensity: number
  detailLevel: number
  realism: number
  saturation: number
  contrast: number
}

export default function ImagePromptGeneratorPage() {
  const [platform, setPlatform] = useState<Platform>('nano-banana-pro')
  const [subject, setSubject] = useState('')
  const [selectedStyles, setSelectedStyles] = useState<string[]>([])
  const [selectedNegatives, setSelectedNegatives] = useState<string[]>(['quality', 'anatomy'])
  const [aspectRatio, setAspectRatio] = useState('widescreen')
  const [activeCategory, setActiveCategory] = useState<StyleCategory | null>(null)
  const [sliders, setSliders] = useState<Sliders>({
    styleIntensity: 50,
    detailLevel: 70,
    realism: 50,
    saturation: 50,
    contrast: 50,
  })
  const [copied, setCopied] = useState(false)
  const [shared, setShared] = useState(false)
  const [jsonCopied, setJsonCopied] = useState(false)

  // Load state from URL on mount
  useEffect(() => {
    if (typeof window === 'undefined') return
    const params = new URLSearchParams(window.location.search)
    const stateParam = params.get('state')
    if (stateParam) {
      try {
        const decoded = JSON.parse(atob(stateParam))
        if (decoded) {
          if (decoded.platform) setPlatform(decoded.platform)
          if (decoded.subject) setSubject(decoded.subject)
          if (decoded.selectedStyles) setSelectedStyles(decoded.selectedStyles)
          if (decoded.selectedNegatives) setSelectedNegatives(decoded.selectedNegatives)
          if (decoded.aspectRatio) setAspectRatio(decoded.aspectRatio)
          if (decoded.sliders) setSliders(decoded.sliders)
        }
      } catch {
        // Invalid state param, ignore
      }
    }
  }, [])

  const toggleStyle = useCallback((styleId: string) => {
    setSelectedStyles(prev =>
      prev.includes(styleId)
        ? prev.filter(id => id !== styleId)
        : [...prev, styleId]
    )
  }, [])

  const toggleNegative = useCallback((negativeId: string) => {
    setSelectedNegatives(prev =>
      prev.includes(negativeId)
        ? prev.filter(id => id !== negativeId)
        : [...prev, negativeId]
    )
  }, [])

  const updateSlider = useCallback((key: keyof Sliders, value: number) => {
    setSliders(prev => ({ ...prev, [key]: value }))
  }, [])

  const selectedStylePresets = useMemo(
    () => stylePresets.filter(s => selectedStyles.includes(s.id)),
    [selectedStyles]
  )

  const selectedNegativePresets = useMemo(
    () => negativePresets.filter(n => selectedNegatives.includes(n.id)),
    [selectedNegatives]
  )

  const selectedAspectRatio = useMemo(
    () => aspectRatios.find(ar => ar.id === aspectRatio) || aspectRatios[0],
    [aspectRatio]
  )

  const generatedPrompt = useMemo(() => {
    if (!subject.trim()) {
      return { positive: '', negative: '' }
    }
    return formatPrompt(
      subject,
      selectedStylePresets,
      selectedNegativePresets,
      selectedAspectRatio,
      sliders,
      platform
    )
  }, [subject, selectedStylePresets, selectedNegativePresets, selectedAspectRatio, sliders, platform])

  const copyToClipboard = useCallback(async () => {
    const fullPrompt = generatedPrompt.negative
      ? `${generatedPrompt.positive}\n\nNegative: ${generatedPrompt.negative}`
      : generatedPrompt.positive

    await navigator.clipboard.writeText(fullPrompt)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }, [generatedPrompt])

  const downloadPrompt = useCallback(() => {
    const fullPrompt = generatedPrompt.negative
      ? `Positive Prompt:\n${generatedPrompt.positive}\n\nNegative Prompt:\n${generatedPrompt.negative}`
      : generatedPrompt.positive

    const blob = new Blob([fullPrompt], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'image-prompt.txt'
    a.click()
    URL.revokeObjectURL(url)
  }, [generatedPrompt])

  // Get current state for export/sharing
  const getCurrentState = useCallback(() => ({
    platform,
    subject,
    selectedStyles,
    selectedNegatives,
    aspectRatio,
    sliders,
  }), [platform, subject, selectedStyles, selectedNegatives, aspectRatio, sliders])

  // Export as JSON
  const exportJSON = useCallback(async () => {
    const json = JSON.stringify(getCurrentState(), null, 2)
    await navigator.clipboard.writeText(json)
    setJsonCopied(true)
    setTimeout(() => setJsonCopied(false), 2000)
  }, [getCurrentState])

  // Download as JSON file
  const downloadJSON = useCallback(() => {
    const json = JSON.stringify(getCurrentState(), null, 2)
    const blob = new Blob([json], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'image-prompt-config.json'
    a.click()
    URL.revokeObjectURL(url)
  }, [getCurrentState])

  // Share via URL
  const shareURL = useCallback(async () => {
    const stateStr = btoa(JSON.stringify(getCurrentState()))
    const shareUrl = `${window.location.origin}${window.location.pathname}?state=${stateStr}`
    await navigator.clipboard.writeText(shareUrl)
    setShared(true)
    setTimeout(() => setShared(false), 2000)
  }, [getCurrentState])

  const filteredStyles = useMemo(() => {
    if (!activeCategory) return stylePresets
    return stylePresets.filter(s => s.category === activeCategory)
  }, [activeCategory])

  const categories = Object.entries(categoryLabels) as [StyleCategory, string][]

  return (
    <main className="min-h-screen text-white">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <Link href="/tools" className="text-forge-cyan hover:underline text-sm">
              &larr; Back to Tools
            </Link>
            <ShareButton title="Image Prompt Generator - Substratia" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            Image <span className="text-forge-cyan">Prompt Generator</span>
          </h1>
          <p className="text-gray-400">
            Build AI image prompts visually. Select styles, adjust intensity, copy to your favorite platform.
          </p>
        </div>

        {/* Main Grid */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Column 1: Controls */}
          <div className="space-y-6">
            {/* Platform Selector */}
            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
              <label className="block text-sm font-medium text-gray-400 mb-2">Platform</label>
              <select
                value={platform}
                onChange={(e) => setPlatform(e.target.value as Platform)}
                className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-forge-cyan text-white"
              >
                {platforms.map(p => (
                  <option key={p.id} value={p.id} className="bg-forge-dark">
                    {p.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Subject Input */}
            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
              <label className="block text-sm font-medium text-gray-400 mb-2">Subject</label>
              <textarea
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="A majestic dragon flying over a medieval castle..."
                className="w-full h-24 px-3 py-2 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-forge-cyan text-white resize-none"
              />
            </div>

            {/* Aspect Ratio */}
            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
              <label className="block text-sm font-medium text-gray-400 mb-2">Aspect Ratio</label>
              <select
                value={aspectRatio}
                onChange={(e) => setAspectRatio(e.target.value)}
                className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-forge-cyan text-white"
              >
                {aspectRatios.map(ar => (
                  <option key={ar.id} value={ar.id} className="bg-forge-dark">
                    {ar.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Sliders */}
            <div className="bg-white/5 border border-white/10 rounded-xl p-4 space-y-4">
              <h3 className="text-sm font-medium text-gray-400">Intensity Controls</h3>

              {[
                { key: 'styleIntensity', label: 'Style Intensity', min: 'Subtle', max: 'Strong' },
                { key: 'detailLevel', label: 'Detail Level', min: 'Simple', max: 'Ultra' },
                { key: 'realism', label: 'Realism', min: 'Stylized', max: 'Photo' },
                { key: 'saturation', label: 'Saturation', min: 'Muted', max: 'Vibrant' },
                { key: 'contrast', label: 'Contrast', min: 'Flat', max: 'High' },
              ].map(({ key, label, min, max }) => (
                <div key={key}>
                  <div className="flex justify-between text-xs text-gray-500 mb-1">
                    <span>{min}</span>
                    <span className="text-white">{label}: {sliders[key as keyof Sliders]}%</span>
                    <span>{max}</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={sliders[key as keyof Sliders]}
                    onChange={(e) => updateSlider(key as keyof Sliders, parseInt(e.target.value))}
                    className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer accent-forge-cyan"
                  />
                </div>
              ))}
            </div>

            {/* Negative Prompts */}
            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
              <h3 className="text-sm font-medium text-gray-400 mb-3">Negative Prompts</h3>
              <div className="space-y-2">
                {negativePresets.map(neg => (
                  <label key={neg.id} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selectedNegatives.includes(neg.id)}
                      onChange={() => toggleNegative(neg.id)}
                      className="w-4 h-4 rounded border-white/30 bg-white/10 text-forge-cyan focus:ring-forge-cyan"
                    />
                    <span className="text-sm text-gray-300">{neg.name}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Column 2: Style Presets */}
          <div className="bg-white/5 border border-white/10 rounded-xl p-4">
            <h3 className="text-sm font-medium text-gray-400 mb-3">Style Presets</h3>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-2 mb-4">
              <button
                onClick={() => setActiveCategory(null)}
                className={`px-3 py-1 text-xs rounded-full transition-all ${
                  activeCategory === null
                    ? 'bg-forge-cyan text-forge-dark'
                    : 'bg-white/10 text-gray-400 hover:bg-white/20'
                }`}
              >
                All
              </button>
              {categories.map(([key, label]) => (
                <button
                  key={key}
                  onClick={() => setActiveCategory(key)}
                  className={`px-3 py-1 text-xs rounded-full transition-all ${
                    activeCategory === key
                      ? 'bg-forge-cyan text-forge-dark'
                      : 'bg-white/10 text-gray-400 hover:bg-white/20'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>

            {/* Selected Styles */}
            {selectedStyles.length > 0 && (
              <div className="mb-4">
                <div className="text-xs text-gray-500 mb-2">Selected ({selectedStyles.length})</div>
                <div className="flex flex-wrap gap-2">
                  {selectedStylePresets.map(style => (
                    <button
                      key={style.id}
                      onClick={() => toggleStyle(style.id)}
                      className="px-2 py-1 text-xs bg-forge-purple/30 border border-forge-purple rounded-full flex items-center gap-1"
                    >
                      {style.emoji} {style.name}
                      <span className="text-gray-400 hover:text-white">&times;</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Style Grid */}
            <div className="grid grid-cols-2 gap-2 max-h-[400px] overflow-y-auto">
              {filteredStyles.map(style => (
                <button
                  key={style.id}
                  onClick={() => toggleStyle(style.id)}
                  className={`p-2 text-left text-sm rounded-lg transition-all ${
                    selectedStyles.includes(style.id)
                      ? 'bg-forge-purple/30 border border-forge-purple'
                      : 'bg-white/5 border border-white/10 hover:bg-white/10'
                  }`}
                >
                  <span className="mr-1">{style.emoji}</span>
                  {style.name}
                </button>
              ))}
            </div>
          </div>

          {/* Column 3: Preview */}
          <div className="space-y-4">
            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-sm font-medium text-gray-400">Generated Prompt</h3>
                <span className="text-xs text-gray-500">
                  {platforms.find(p => p.id === platform)?.name}
                </span>
              </div>

              {/* Positive Prompt */}
              <div className="mb-4">
                <div className="text-xs text-forge-cyan mb-1">Positive</div>
                <div className="bg-black/30 rounded-lg p-3 min-h-[120px]">
                  {generatedPrompt.positive ? (
                    <p className="text-sm text-gray-200 whitespace-pre-wrap break-words">
                      {generatedPrompt.positive}
                    </p>
                  ) : (
                    <p className="text-sm text-gray-500 italic">
                      Enter a subject to generate your prompt...
                    </p>
                  )}
                </div>
              </div>

              {/* Negative Prompt */}
              {generatedPrompt.negative && (
                <div className="mb-4">
                  <div className="text-xs text-red-400 mb-1">Negative</div>
                  <div className="bg-black/30 rounded-lg p-3">
                    <p className="text-sm text-gray-400 whitespace-pre-wrap break-words">
                      {generatedPrompt.negative}
                    </p>
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={copyToClipboard}
                  disabled={!generatedPrompt.positive}
                  className={`flex-1 min-w-[80px] px-4 py-2 rounded-lg font-medium transition-all ${
                    copied
                      ? 'bg-green-500 text-white'
                      : 'bg-forge-cyan text-forge-dark hover:bg-forge-cyan/80 disabled:opacity-50 disabled:cursor-not-allowed'
                  }`}
                >
                  {copied ? 'Copied!' : 'Copy'}
                </button>
                <button
                  onClick={downloadPrompt}
                  disabled={!generatedPrompt.positive}
                  className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Download .txt
                </button>
                <button
                  onClick={shareURL}
                  disabled={!subject.trim()}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    shared
                      ? 'bg-green-500 text-white'
                      : 'bg-white/10 hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed'
                  }`}
                >
                  {shared ? 'Link Copied!' : 'Share URL'}
                </button>
              </div>
              <div className="flex gap-2 mt-2">
                <button
                  onClick={exportJSON}
                  disabled={!subject.trim()}
                  className={`flex-1 px-4 py-2 rounded-lg font-medium transition-all text-sm ${
                    jsonCopied
                      ? 'bg-green-500 text-white'
                      : 'bg-white/10 hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed'
                  }`}
                >
                  {jsonCopied ? 'JSON Copied!' : 'Export JSON'}
                </button>
                <button
                  onClick={downloadJSON}
                  disabled={!subject.trim()}
                  className="flex-1 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg font-medium transition-all text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Download .json
                </button>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-forge-cyan">{selectedStyles.length}</div>
                  <div className="text-xs text-gray-500">Styles</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-forge-purple">{selectedNegatives.length}</div>
                  <div className="text-xs text-gray-500">Negatives</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-white">{generatedPrompt.positive.length}</div>
                  <div className="text-xs text-gray-500">Chars</div>
                </div>
              </div>
            </div>

            {/* Tips */}
            <div className="bg-gradient-to-r from-forge-purple/20 to-forge-cyan/20 rounded-xl p-4">
              <h3 className="font-medium mb-2">Tips</h3>
              <ul className="text-sm text-gray-400 space-y-1">
                <li>- Start with a clear, specific subject</li>
                <li>- Mix styles from different categories</li>
                <li>- Adjust sliders to fine-tune output</li>
                <li>- Platform syntax auto-adjusts</li>
              </ul>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <p className="text-gray-400 mb-4">
            Need to build video prompts too?
          </p>
          <div className="flex justify-center gap-4 flex-wrap">
            <Link
              href="/tools/video-prompt-timeline"
              className="inline-block px-6 py-3 bg-forge-purple hover:bg-forge-purple/80 rounded-xl font-semibold transition-all"
            >
              Try Video Prompt Timeline
            </Link>
            <Link
              href="/templates"
              className="inline-block px-6 py-3 bg-white/10 hover:bg-white/20 rounded-xl font-semibold transition-all"
            >
              Explore Memory Tools
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}
