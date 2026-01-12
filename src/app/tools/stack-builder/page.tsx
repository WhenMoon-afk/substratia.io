'use client'

import { useState, useCallback, useMemo, useEffect } from 'react'
import Link from 'next/link'
import ShareButton from '@/components/ShareButton'
import {
  categories,
  getCompatibilityWarnings,
  generateAIPrompt,
  generateMarkdown,
  generateCSV,
  generateJSON,
  type TechOption,
} from '@/data/stackBuilderPresets'

type ExportFormat = 'ai' | 'markdown' | 'csv' | 'json'

export default function StackBuilderPage() {
  const [selections, setSelections] = useState<Record<string, string>>({})
  const [skipped, setSkipped] = useState<Record<string, boolean>>({})
  const [activeCategory, setActiveCategory] = useState(0)
  const [hoveredOption, setHoveredOption] = useState<TechOption | null>(null)
  const [copied, setCopied] = useState<string | null>(null)
  const [shared, setShared] = useState(false)

  // Load state from URL on mount
  useEffect(() => {
    if (typeof window === 'undefined') return
    const params = new URLSearchParams(window.location.search)
    const stateParam = params.get('stack')
    if (stateParam) {
      try {
        const decoded = JSON.parse(atob(stateParam))
        if (decoded && typeof decoded === 'object') {
          setSelections(decoded)
        }
      } catch {
        // Invalid state param, ignore
      }
    }
  }, [])

  // Share via URL
  const shareStack = useCallback(async () => {
    const stateStr = btoa(JSON.stringify(selections))
    const shareUrl = `${window.location.origin}${window.location.pathname}?stack=${stateStr}`
    await navigator.clipboard.writeText(shareUrl)
    setShared(true)
    setTimeout(() => setShared(false), 2000)
  }, [selections])

  const currentCategory = categories[activeCategory]
  const warnings = useMemo(() => getCompatibilityWarnings(selections), [selections])

  const selectOption = useCallback((optionId: string) => {
    setSelections(prev => ({
      ...prev,
      [currentCategory.id]: prev[currentCategory.id] === optionId ? '' : optionId,
    }))
    setSkipped(prev => ({ ...prev, [currentCategory.id]: false }))
  }, [currentCategory.id])

  const skipCategory = useCallback(() => {
    setSelections(prev => ({ ...prev, [currentCategory.id]: '' }))
    setSkipped(prev => ({ ...prev, [currentCategory.id]: true }))
  }, [currentCategory.id])

  const nextCategory = useCallback(() => {
    if (activeCategory < categories.length - 1) {
      setActiveCategory(prev => prev + 1)
    }
  }, [activeCategory])

  const prevCategory = useCallback(() => {
    if (activeCategory > 0) {
      setActiveCategory(prev => prev - 1)
    }
  }, [activeCategory])

  const selectedCount = useMemo(() => {
    return Object.values(selections).filter(Boolean).length
  }, [selections])

  const exportStack = useCallback(async (format: ExportFormat) => {
    let content: string
    let filename: string

    switch (format) {
      case 'ai':
        content = generateAIPrompt(selections)
        await navigator.clipboard.writeText(content)
        setCopied('ai')
        setTimeout(() => setCopied(null), 2000)
        return
      case 'markdown':
        content = generateMarkdown(selections)
        filename = 'stack.md'
        break
      case 'csv':
        content = generateCSV(selections)
        filename = 'stack.csv'
        break
      case 'json':
        content = generateJSON(selections)
        filename = 'stack.json'
        break
    }

    const blob = new Blob([content], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = filename
    a.click()
    URL.revokeObjectURL(url)
  }, [selections])

  const clearAll = useCallback(() => {
    setSelections({})
    setSkipped({})
    setActiveCategory(0)
  }, [])

  const isOptionIncompatible = useCallback((option: TechOption) => {
    if (!option.incompatibleWith) return false
    return option.incompatibleWith.some(id =>
      Object.values(selections).includes(id)
    )
  }, [selections])

  return (
    <main className="min-h-screen text-white">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <Link href="/tools" className="text-forge-cyan hover:underline text-sm">
              &larr; Back to Tools
            </Link>
            <ShareButton title="Stack Builder - Substratia" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            Stack <span className="text-forge-cyan">Builder</span>
          </h1>
          <p className="text-gray-400">
            Build your perfect full-stack. Select technologies, check compatibility, export for AI analysis.
          </p>
        </div>

        {/* Progress */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-sm text-gray-400">Progress:</span>
            <span className="text-sm font-medium">{activeCategory + 1} / {categories.length}</span>
          </div>
          <div className="flex gap-1">
            {categories.map((cat, i) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(i)}
                className={`flex-1 h-2 rounded-full transition-all ${
                  i < activeCategory ? 'bg-forge-cyan' :
                  i === activeCategory ? 'bg-forge-purple' :
                  selections[cat.id] ? 'bg-forge-cyan/50' :
                  skipped[cat.id] ? 'bg-white/20' :
                  'bg-white/10'
                }`}
                title={cat.name}
              />
            ))}
          </div>
        </div>

        {/* Main Grid */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Column 1: Category Selector */}
          <div className="lg:col-span-2 space-y-6">
            {/* Current Category */}
            <div className="bg-white/5 border border-white/10 rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-xl font-bold">{currentCategory.name}</h2>
                  <p className="text-sm text-gray-400">{currentCategory.description}</p>
                </div>
                {currentCategory.skippable && (
                  <button
                    onClick={skipCategory}
                    className={`px-3 py-1 text-sm rounded-lg transition-all ${
                      skipped[currentCategory.id]
                        ? 'bg-white/20 text-white'
                        : 'bg-white/5 text-gray-400 hover:bg-white/10'
                    }`}
                  >
                    {skipped[currentCategory.id] ? 'Skipped' : 'Skip'}
                  </button>
                )}
              </div>

              {/* Options Grid */}
              <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
                {currentCategory.options.map(option => {
                  const isSelected = selections[currentCategory.id] === option.id
                  const incompatible = isOptionIncompatible(option)

                  return (
                    <button
                      key={option.id}
                      onClick={() => selectOption(option.id)}
                      onMouseEnter={() => setHoveredOption(option)}
                      onMouseLeave={() => setHoveredOption(null)}
                      className={`p-4 rounded-xl text-left transition-all relative ${
                        isSelected
                          ? 'bg-forge-cyan/20 border-2 border-forge-cyan'
                          : incompatible
                          ? 'bg-white/5 border border-red-500/30 opacity-60'
                          : 'bg-white/5 border border-white/10 hover:border-white/30'
                      }`}
                    >
                      {incompatible && (
                        <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center text-xs">
                          !
                        </span>
                      )}
                      <div className="font-medium mb-1">{option.name}</div>
                      <div className="text-xs text-gray-500 line-clamp-2">{option.description}</div>
                    </button>
                  )
                })}
              </div>

              {/* Navigation */}
              <div className="flex justify-between mt-6">
                <button
                  onClick={prevCategory}
                  disabled={activeCategory === 0}
                  className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  &larr; Previous
                </button>
                <button
                  onClick={nextCategory}
                  disabled={activeCategory === categories.length - 1}
                  className="px-4 py-2 bg-forge-cyan text-forge-dark hover:bg-forge-cyan/80 rounded-lg transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  Next &rarr;
                </button>
              </div>
            </div>

            {/* Option Details (Hover) */}
            {hoveredOption && (
              <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                <h3 className="font-bold mb-2">{hoveredOption.name}</h3>
                <p className="text-sm text-gray-400 mb-3">{hoveredOption.description}</p>
                <div className="grid sm:grid-cols-3 gap-4 text-sm">
                  <div>
                    <div className="text-green-400 font-medium mb-1">Pros</div>
                    <ul className="text-gray-400 space-y-1">
                      {hoveredOption.pros.map((pro, i) => (
                        <li key={i}>+ {pro}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <div className="text-red-400 font-medium mb-1">Cons</div>
                    <ul className="text-gray-400 space-y-1">
                      {hoveredOption.cons.map((con, i) => (
                        <li key={i}>- {con}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <div className="text-forge-cyan font-medium mb-1">Best For</div>
                    <p className="text-gray-400">{hoveredOption.bestFor}</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Column 2: Selections Summary */}
          <div className="space-y-4">
            {/* Your Stack */}
            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold">Your Stack</h3>
                <button
                  onClick={clearAll}
                  className="text-xs text-red-400 hover:text-red-300"
                >
                  Clear All
                </button>
              </div>

              <div className="space-y-2 max-h-[300px] overflow-y-auto">
                {categories.map(cat => {
                  const selection = selections[cat.id]
                  const option = selection ? cat.options.find(o => o.id === selection) : null
                  const isSkipped = skipped[cat.id]

                  return (
                    <div
                      key={cat.id}
                      className={`p-2 rounded-lg text-sm ${
                        option ? 'bg-forge-cyan/10' : isSkipped ? 'bg-white/5' : 'bg-white/5 opacity-50'
                      }`}
                    >
                      <div className="text-xs text-gray-500">{cat.name}</div>
                      <div className={option ? 'text-white' : 'text-gray-500'}>
                        {option?.name || (isSkipped ? '(skipped)' : '(not selected)')}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Warnings */}
            {warnings.length > 0 && (
              <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4">
                <h3 className="font-bold text-red-400 mb-2">Compatibility Notes</h3>
                <ul className="text-sm text-red-300 space-y-1">
                  {warnings.map((warning, i) => (
                    <li key={i}>- {warning}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Stats */}
            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-forge-cyan">{selectedCount}</div>
                  <div className="text-xs text-gray-500">Selected</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-forge-purple">{warnings.length}</div>
                  <div className="text-xs text-gray-500">Warnings</div>
                </div>
              </div>
            </div>

            {/* Export Options */}
            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
              <h3 className="font-bold mb-3">Export</h3>
              <div className="space-y-2">
                <button
                  onClick={() => exportStack('ai')}
                  disabled={selectedCount === 0}
                  className={`w-full px-4 py-3 rounded-lg font-medium transition-all ${
                    copied === 'ai'
                      ? 'bg-green-500 text-white'
                      : 'bg-forge-purple hover:bg-forge-purple/80 text-white disabled:opacity-50 disabled:cursor-not-allowed'
                  }`}
                >
                  {copied === 'ai' ? 'Copied!' : 'Copy AI Analysis Prompt'}
                </button>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    onClick={() => exportStack('markdown')}
                    disabled={selectedCount === 0}
                    className="px-3 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    .md
                  </button>
                  <button
                    onClick={() => exportStack('csv')}
                    disabled={selectedCount === 0}
                    className="px-3 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    .csv
                  </button>
                  <button
                    onClick={() => exportStack('json')}
                    disabled={selectedCount === 0}
                    className="px-3 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    .json
                  </button>
                  <button
                    onClick={shareStack}
                    disabled={selectedCount === 0}
                    className={`px-3 py-2 rounded-lg text-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed ${
                      shared
                        ? 'bg-green-500 text-white'
                        : 'bg-forge-cyan/30 hover:bg-forge-cyan/50 text-forge-cyan'
                    }`}
                  >
                    {shared ? 'Link Copied!' : 'Share URL'}
                  </button>
                </div>
              </div>
            </div>

            {/* Tips */}
            <div className="bg-gradient-to-r from-forge-purple/20 to-forge-cyan/20 rounded-xl p-4">
              <h3 className="font-medium mb-2">Tips</h3>
              <ul className="text-sm text-gray-400 space-y-1">
                <li>- Hover options to see pros/cons</li>
                <li>- Skip categories you don&apos;t need</li>
                <li>- Export AI prompt for Claude/GPT analysis</li>
                <li>- Check warnings for incompatibilities</li>
              </ul>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <p className="text-gray-400 mb-4">
            Need help optimizing your Claude Code prompts?
          </p>
          <div className="flex justify-center gap-4 flex-wrap">
            <Link
              href="/tools/prompt-optimizer"
              className="inline-block px-6 py-3 bg-forge-purple hover:bg-forge-purple/80 rounded-xl font-semibold transition-all"
            >
              Try Prompt Optimizer
            </Link>
            <Link
              href="/tools"
              className="inline-block px-6 py-3 bg-white/10 hover:bg-white/20 rounded-xl font-semibold transition-all"
            >
              All Tools
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}
