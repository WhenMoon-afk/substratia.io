'use client'

import { useState, useCallback, useMemo, useEffect } from 'react'
import Link from 'next/link'
import ShareButton from '@/components/ShareButton'

type ThinkingMode = 'normal' | 'thinkhard' | 'ultrathink'

interface Snippet {
  id: string
  name: string
  category: 'autonomous' | 'parallel' | 'simulator' | 'structure' | 'interrupt'
  content: string
  description: string
}

const thinkingModes: { id: ThinkingMode; name: string; description: string; prefix: string }[] = [
  { id: 'normal', name: 'Normal', description: 'Standard reasoning', prefix: '' },
  { id: 'thinkhard', name: 'Think Hard', description: 'Deep reasoning for complex problems', prefix: 'thinkhard about this:\n\n' },
  { id: 'ultrathink', name: 'Ultrathink', description: 'Maximum reasoning depth', prefix: 'ultrathink about this:\n\n' },
]

const snippets: Snippet[] = [
  // Autonomous patterns
  {
    id: 'continue-complete',
    name: 'Continue Until Complete',
    category: 'autonomous',
    content: 'Continue working on this task until you reach a natural stopping point or encounter an issue that requires my input.',
    description: 'Basic autonomous loop',
  },
  {
    id: 'iterate-improve',
    name: 'Iterate & Improve',
    category: 'autonomous',
    content: 'Iterate on this solution, improving it with each pass. Continue for 5 iterations or until you are satisfied with the result.',
    description: 'Self-improving loop',
  },
  {
    id: 'autonomous-work',
    name: 'Work Autonomously',
    category: 'autonomous',
    content: 'Work autonomously on this. Only pause if you need clarification on requirements or encounter a blocking error.',
    description: 'Minimal interruption mode',
  },

  // Parallel execution
  {
    id: 'parallel-research',
    name: 'Parallel Research',
    category: 'parallel',
    content: 'Use subagents in parallel to research these topics simultaneously. Synthesize findings when all complete.',
    description: 'Concurrent research tasks',
  },
  {
    id: 'spawn-tasks',
    name: 'Spawn Concurrent Tasks',
    category: 'parallel',
    content: 'Spawn concurrent tasks for the items listed above. Coordinate and combine results at the end.',
    description: 'Multiple simultaneous tasks',
  },
  {
    id: 'parallel-execute',
    name: 'Execute in Parallel',
    category: 'parallel',
    content: 'Execute these independent tasks in parallel, then combine and summarize outputs.',
    description: 'General parallel execution',
  },

  // Simulator patterns
  {
    id: 'user-simulator',
    name: 'User Feedback Simulator',
    category: 'simulator',
    content: 'Create a user feedback simulator subagent that will evaluate each iteration from a user perspective. Use its feedback to guide improvements. Continue until the simulator rates the output 8/10 or higher.',
    description: 'Simulated user testing',
  },
  {
    id: 'qa-tester',
    name: 'QA Tester Subagent',
    category: 'simulator',
    content: 'Generate a QA tester subagent that will find issues with this code. Fix each issue found. Repeat until no issues remain.',
    description: 'Automated QA loop',
  },
  {
    id: 'critic-subagent',
    name: 'Critic Subagent',
    category: 'simulator',
    content: 'Create a critic subagent that will evaluate the output against best practices and suggest improvements. Incorporate feedback and iterate.',
    description: 'Self-critique pattern',
  },

  // Structure templates
  {
    id: 'context-first',
    name: 'Context Block',
    category: 'structure',
    content: '## Context\n[Describe the current situation, codebase, or problem domain]\n\n## Task\n[What you want accomplished]\n\n## Constraints\n[Any limitations or requirements]',
    description: 'Structured prompt format',
  },
  {
    id: 'step-by-step',
    name: 'Step by Step',
    category: 'structure',
    content: 'Think through this step by step:\n1. First, analyze the problem\n2. Then, identify potential solutions\n3. Evaluate each solution\n4. Implement the best approach',
    description: 'Explicit reasoning steps',
  },

  // Interrupt patterns
  {
    id: 'stop-interrupt',
    name: 'STOP Interrupt',
    category: 'interrupt',
    content: 'Continue this process until you receive a message containing "STOP" or "DONE". Check for interrupt messages between each major step.',
    description: 'Keyword-based stopping',
  },
  {
    id: 'phase-check',
    name: 'Phase Check',
    category: 'interrupt',
    content: 'Work on this in phases. After each phase, pause briefly to check for user input. If no input, continue to the next phase.',
    description: 'Phased execution with checkpoints',
  },
]

const categoryLabels: Record<Snippet['category'], string> = {
  autonomous: 'Autonomous Loops',
  parallel: 'Parallel Execution',
  simulator: 'Simulator Subagents',
  structure: 'Structure Templates',
  interrupt: 'Interrupt Patterns',
}

const categoryColors: Record<Snippet['category'], string> = {
  autonomous: 'cyan',
  parallel: 'purple',
  simulator: 'green',
  structure: 'yellow',
  interrupt: 'red',
}

export default function PromptOptimizerPage() {
  const [thinkingMode, setThinkingMode] = useState<ThinkingMode>('normal')
  const [userPrompt, setUserPrompt] = useState('')
  const [selectedSnippets, setSelectedSnippets] = useState<string[]>([])
  const [copied, setCopied] = useState(false)
  const [activeCategory, setActiveCategory] = useState<Snippet['category'] | null>(null)
  const [shared, setShared] = useState(false)

  // Load state from URL on mount
  useEffect(() => {
    if (typeof window === 'undefined') return
    const params = new URLSearchParams(window.location.search)
    const stateParam = params.get('config')
    if (stateParam) {
      try {
        const decoded = JSON.parse(atob(stateParam))
        if (decoded) {
          if (decoded.thinkingMode) setThinkingMode(decoded.thinkingMode)
          if (decoded.userPrompt) setUserPrompt(decoded.userPrompt)
          if (decoded.selectedSnippets) setSelectedSnippets(decoded.selectedSnippets)
        }
      } catch {
        // Invalid state param, ignore
      }
    }
  }, [])

  const toggleSnippet = useCallback((snippetId: string) => {
    setSelectedSnippets(prev =>
      prev.includes(snippetId)
        ? prev.filter(id => id !== snippetId)
        : [...prev, snippetId]
    )
  }, [])

  const generatedPrompt = useMemo(() => {
    const mode = thinkingModes.find(m => m.id === thinkingMode)
    const prefix = mode?.prefix || ''

    const selectedSnippetContents = selectedSnippets
      .map(id => snippets.find(s => s.id === id)?.content)
      .filter(Boolean)

    let result = prefix

    if (userPrompt.trim()) {
      result += userPrompt.trim()
    }

    if (selectedSnippetContents.length > 0) {
      if (result) result += '\n\n---\n\n'
      result += selectedSnippetContents.join('\n\n')
    }

    return result
  }, [thinkingMode, userPrompt, selectedSnippets])

  const copyToClipboard = useCallback(async () => {
    if (!generatedPrompt) return
    await navigator.clipboard.writeText(generatedPrompt)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }, [generatedPrompt])

  const clearAll = useCallback(() => {
    setUserPrompt('')
    setSelectedSnippets([])
    setThinkingMode('normal')
  }, [])

  // Share via URL
  const shareConfig = useCallback(async () => {
    const state = { thinkingMode, userPrompt, selectedSnippets }
    const stateStr = btoa(JSON.stringify(state))
    const shareUrl = `${window.location.origin}${window.location.pathname}?config=${stateStr}`
    await navigator.clipboard.writeText(shareUrl)
    setShared(true)
    setTimeout(() => setShared(false), 2000)
  }, [thinkingMode, userPrompt, selectedSnippets])

  const filteredSnippets = useMemo(() => {
    if (!activeCategory) return snippets
    return snippets.filter(s => s.category === activeCategory)
  }, [activeCategory])

  const categories = Object.entries(categoryLabels) as [Snippet['category'], string][]

  return (
    <main className="min-h-screen text-white">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <Link href="/tools" className="text-forge-cyan hover:underline text-sm">
              &larr; Back to Tools
            </Link>
            <ShareButton title="Claude Code Prompt Optimizer - Substratia" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            Claude Code <span className="text-forge-cyan">Prompt Optimizer</span>
          </h1>
          <p className="text-gray-400">
            Build optimized prompts for Claude Code. Add thinking modes, autonomous patterns, and parallel execution.
          </p>
        </div>

        {/* Main Grid */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Column 1: Controls */}
          <div className="space-y-6">
            {/* Thinking Mode */}
            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
              <h3 className="text-sm font-medium text-gray-400 mb-3">Thinking Mode</h3>
              <div className="space-y-2">
                {thinkingModes.map(mode => (
                  <label
                    key={mode.id}
                    className={`flex items-start gap-3 p-3 rounded-lg cursor-pointer transition-all ${
                      thinkingMode === mode.id
                        ? 'bg-forge-cyan/20 border border-forge-cyan'
                        : 'bg-white/5 border border-transparent hover:bg-white/10'
                    }`}
                  >
                    <input
                      type="radio"
                      name="thinkingMode"
                      value={mode.id}
                      checked={thinkingMode === mode.id}
                      onChange={() => setThinkingMode(mode.id)}
                      className="mt-1 accent-forge-cyan"
                    />
                    <div>
                      <div className="font-medium">{mode.name}</div>
                      <div className="text-xs text-gray-500">{mode.description}</div>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Your Prompt */}
            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
              <h3 className="text-sm font-medium text-gray-400 mb-3">Your Task</h3>
              <textarea
                value={userPrompt}
                onChange={(e) => setUserPrompt(e.target.value)}
                placeholder="Describe what you want Claude Code to do..."
                className="w-full h-32 px-3 py-2 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-forge-cyan text-white text-sm resize-none"
              />
            </div>

            {/* Selected Snippets */}
            {selectedSnippets.length > 0 && (
              <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                <h3 className="text-sm font-medium text-gray-400 mb-3">
                  Selected ({selectedSnippets.length})
                </h3>
                <div className="flex flex-wrap gap-2">
                  {selectedSnippets.map(id => {
                    const snippet = snippets.find(s => s.id === id)
                    if (!snippet) return null
                    return (
                      <button
                        key={id}
                        onClick={() => toggleSnippet(id)}
                        className={`px-2 py-1 text-xs rounded-full flex items-center gap-1 bg-forge-${categoryColors[snippet.category]}/20 border border-forge-${categoryColors[snippet.category]}/50`}
                      >
                        {snippet.name}
                        <span className="text-gray-400 hover:text-white">&times;</span>
                      </button>
                    )
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Column 2: Snippet Library */}
          <div className="bg-white/5 border border-white/10 rounded-xl p-4">
            <h3 className="text-sm font-medium text-gray-400 mb-3">Prompt Snippets</h3>

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

            {/* Snippets Grid */}
            <div className="space-y-2 max-h-[450px] overflow-y-auto">
              {filteredSnippets.map(snippet => (
                <button
                  key={snippet.id}
                  onClick={() => toggleSnippet(snippet.id)}
                  className={`w-full p-3 text-left rounded-lg transition-all ${
                    selectedSnippets.includes(snippet.id)
                      ? `bg-forge-${categoryColors[snippet.category]}/20 border border-forge-${categoryColors[snippet.category]}`
                      : 'bg-white/5 border border-white/10 hover:bg-white/10'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="font-medium text-sm">{snippet.name}</div>
                      <div className="text-xs text-gray-500">{snippet.description}</div>
                    </div>
                    <span className={`text-xs px-2 py-0.5 rounded bg-forge-${categoryColors[snippet.category]}/20 text-forge-${categoryColors[snippet.category]}`}>
                      {categoryLabels[snippet.category].split(' ')[0]}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Column 3: Output */}
          <div className="space-y-4">
            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-sm font-medium text-gray-400">Generated Prompt</h3>
                <button
                  onClick={clearAll}
                  className="text-xs text-red-400 hover:text-red-300"
                >
                  Clear All
                </button>
              </div>

              <div className="bg-black/30 rounded-lg p-4 min-h-[300px] max-h-[400px] overflow-auto">
                {generatedPrompt ? (
                  <pre className="text-sm text-gray-200 whitespace-pre-wrap break-words font-mono">
                    {generatedPrompt}
                  </pre>
                ) : (
                  <p className="text-sm text-gray-500 italic">
                    Add a task and select snippets to generate your optimized prompt...
                  </p>
                )}
              </div>

              <div className="flex gap-2 mt-4">
                <button
                  onClick={copyToClipboard}
                  disabled={!generatedPrompt}
                  className={`flex-1 px-4 py-3 rounded-lg font-medium transition-all ${
                    copied
                      ? 'bg-green-500 text-white'
                      : 'bg-forge-cyan text-forge-dark hover:bg-forge-cyan/80 disabled:opacity-50 disabled:cursor-not-allowed'
                  }`}
                >
                  {copied ? 'Copied!' : 'Copy Prompt'}
                </button>
                <button
                  onClick={shareConfig}
                  disabled={!generatedPrompt}
                  className={`px-4 py-3 rounded-lg font-medium transition-all ${
                    shared
                      ? 'bg-green-500 text-white'
                      : 'bg-forge-purple hover:bg-forge-purple/80 text-white disabled:opacity-50 disabled:cursor-not-allowed'
                  }`}
                >
                  {shared ? 'Copied!' : 'Share URL'}
                </button>
              </div>
            </div>

            {/* Stats */}
            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-forge-cyan">
                    {thinkingMode === 'normal' ? '-' : thinkingMode === 'thinkhard' ? '2x' : '3x'}
                  </div>
                  <div className="text-xs text-gray-500">Reasoning</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-forge-purple">{selectedSnippets.length}</div>
                  <div className="text-xs text-gray-500">Snippets</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-white">{generatedPrompt.length}</div>
                  <div className="text-xs text-gray-500">Chars</div>
                </div>
              </div>
            </div>

            {/* Tips */}
            <div className="bg-gradient-to-r from-forge-purple/20 to-forge-cyan/20 rounded-xl p-4">
              <h3 className="font-medium mb-2">Tips</h3>
              <ul className="text-sm text-gray-400 space-y-1">
                <li>- Use <code className="text-forge-cyan">ultrathink</code> for complex architecture</li>
                <li>- Combine autonomous + interrupt for long tasks</li>
                <li>- Simulator subagents reduce back-and-forth</li>
                <li>- Structure templates improve consistency</li>
              </ul>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <p className="text-gray-400 mb-4">
            Want to track your Claude Code costs?
          </p>
          <div className="flex justify-center gap-4 flex-wrap">
            <Link
              href="/tools/cost-calculator"
              className="inline-block px-6 py-3 bg-forge-purple hover:bg-forge-purple/80 rounded-xl font-semibold transition-all"
            >
              Try Cost Calculator
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
