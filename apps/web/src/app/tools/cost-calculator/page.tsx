'use client'

import { useState, useCallback, useMemo, useEffect } from 'react'
import Link from 'next/link'
import ShareButton from '@/components/ShareButton'

interface Model {
  id: string
  name: string
  inputPer1M: number
  outputPer1M: number
}

interface Session {
  id: string
  date: string
  inputTokens: number
  outputTokens: number
  model: string
}

const models: Model[] = [
  { id: 'opus', name: 'Claude 4.5 Opus', inputPer1M: 15, outputPer1M: 75 },
  { id: 'sonnet', name: 'Claude 4.5 Sonnet', inputPer1M: 3, outputPer1M: 15 },
  { id: 'haiku', name: 'Claude 4.5 Haiku', inputPer1M: 0.25, outputPer1M: 1.25 },
]

const STORAGE_KEY = 'substratia-cost-sessions'

function loadSessions(): Session[] {
  if (typeof window === 'undefined') return []
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    return stored ? JSON.parse(stored) : []
  } catch {
    return []
  }
}

function saveSessions(sessions: Session[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(sessions))
}

function formatCurrency(amount: number): string {
  return `$${amount.toFixed(2)}`
}

function calculateCost(inputTokens: number, outputTokens: number, model: Model): number {
  return (inputTokens / 1_000_000) * model.inputPer1M + (outputTokens / 1_000_000) * model.outputPer1M
}

export default function CostCalculatorPage() {
  const [selectedModel, setSelectedModel] = useState('sonnet')
  const [inputTokens, setInputTokens] = useState<number>(0)
  const [outputTokens, setOutputTokens] = useState<number>(0)
  const [sessions, setSessions] = useState<Session[]>([])
  const [monthlyUsage, setMonthlyUsage] = useState<number>(2_000_000)
  const [savedSession, setSavedSession] = useState(false)
  const [shared, setShared] = useState(false)
  const [exported, setExported] = useState(false)

  // Load sessions on mount + check for URL params
  useEffect(() => {
    setSessions(loadSessions())

    // Load state from URL
    if (typeof window === 'undefined') return
    const params = new URLSearchParams(window.location.search)
    const stateParam = params.get('calc')
    if (stateParam) {
      try {
        const decoded = JSON.parse(atob(stateParam))
        if (decoded) {
          if (decoded.model) setSelectedModel(decoded.model)
          if (decoded.input) setInputTokens(decoded.input)
          if (decoded.output) setOutputTokens(decoded.output)
          if (decoded.monthlyUsage) setMonthlyUsage(decoded.monthlyUsage)
        }
      } catch {
        // Invalid state param, ignore
      }
    }
  }, [])

  const model = useMemo(() => models.find(m => m.id === selectedModel) || models[1], [selectedModel])

  const currentCost = useMemo(() => {
    return calculateCost(inputTokens, outputTokens, model)
  }, [inputTokens, outputTokens, model])

  const logSession = useCallback(() => {
    if (inputTokens === 0 && outputTokens === 0) return

    const newSession: Session = {
      id: `session-${Date.now()}`,
      date: new Date().toISOString(),
      inputTokens,
      outputTokens,
      model: selectedModel,
    }

    const updated = [newSession, ...sessions].slice(0, 50) // Keep last 50
    setSessions(updated)
    saveSessions(updated)

    setInputTokens(0)
    setOutputTokens(0)
    setSavedSession(true)
    setTimeout(() => setSavedSession(false), 2000)
  }, [inputTokens, outputTokens, selectedModel, sessions])

  const clearSessions = useCallback(() => {
    setSessions([])
    saveSessions([])
  }, [])

  // Share via URL
  const shareCalc = useCallback(async () => {
    const state = {
      model: selectedModel,
      input: inputTokens,
      output: outputTokens,
      monthlyUsage,
    }
    const stateStr = btoa(JSON.stringify(state))
    const shareUrl = `${window.location.origin}${window.location.pathname}?calc=${stateStr}`
    await navigator.clipboard.writeText(shareUrl)
    setShared(true)
    setTimeout(() => setShared(false), 2000)
  }, [selectedModel, inputTokens, outputTokens, monthlyUsage])

  // Calculate totals from sessions
  const sessionStats = useMemo(() => {
    const last7Days = sessions.filter(s => {
      const date = new Date(s.date)
      const now = new Date()
      const diff = now.getTime() - date.getTime()
      return diff < 7 * 24 * 60 * 60 * 1000
    })

    const totalCost = last7Days.reduce((sum, s) => {
      const m = models.find(m => m.id === s.model) || models[1]
      return sum + calculateCost(s.inputTokens, s.outputTokens, m)
    }, 0)

    const totalTokens = last7Days.reduce((sum, s) => sum + s.inputTokens + s.outputTokens, 0)

    return { sessions: last7Days.length, totalCost, totalTokens }
  }, [sessions])

  // Export sessions as JSON
  const exportSessions = useCallback(() => {
    const data = {
      exportDate: new Date().toISOString(),
      sessions,
      stats: sessionStats,
    }
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'claude-cost-sessions.json'
    a.click()
    URL.revokeObjectURL(url)
    setExported(true)
    setTimeout(() => setExported(false), 2000)
  }, [sessions, sessionStats])

  // Subscription comparison
  const comparison = useMemo(() => {
    const sonnetModel = models.find(m => m.id === 'sonnet')!
    const opusModel = models.find(m => m.id === 'opus')!

    // Assume 80% input, 20% output for typical usage
    const inputRatio = 0.8
    const outputRatio = 0.2

    const sonnetApiCost = (monthlyUsage * inputRatio / 1_000_000) * sonnetModel.inputPer1M +
                          (monthlyUsage * outputRatio / 1_000_000) * sonnetModel.outputPer1M

    const opusApiCost = (monthlyUsage * inputRatio / 1_000_000) * opusModel.inputPer1M +
                        (monthlyUsage * outputRatio / 1_000_000) * opusModel.outputPer1M

    const subscriptionCost = 200 // Claude Max

    return {
      sonnetApi: sonnetApiCost,
      opusApi: opusApiCost,
      subscription: subscriptionCost,
      recommendation: sonnetApiCost < subscriptionCost ? 'api' : 'subscription',
      savings: Math.abs(sonnetApiCost - subscriptionCost),
    }
  }, [monthlyUsage])

  return (
    <main className="min-h-screen text-white">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <Link href="/tools" className="text-forge-cyan hover:underline text-sm">
              &larr; Back to Tools
            </Link>
            <ShareButton title="Claude Code Cost Calculator - Substratia" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            Claude Code <span className="text-forge-cyan">Cost Calculator</span>
          </h1>
          <p className="text-gray-400">
            Track your Claude Code usage costs. Compare API pricing vs subscription plans.
          </p>
        </div>

        {/* Main Grid */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Left Column: Session Tracker */}
          <div className="space-y-6">
            {/* Current Session */}
            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
              <h3 className="text-sm font-medium text-gray-400 mb-4">Current Session</h3>

              {/* Model Selector */}
              <div className="mb-4">
                <label className="block text-xs text-gray-500 mb-1">Model</label>
                <select
                  value={selectedModel}
                  onChange={(e) => setSelectedModel(e.target.value)}
                  className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-forge-cyan text-white text-sm"
                >
                  {models.map(m => (
                    <option key={m.id} value={m.id} className="bg-forge-dark">
                      {m.name} (${m.inputPer1M}/${m.outputPer1M} per 1M)
                    </option>
                  ))}
                </select>
              </div>

              {/* Token Inputs */}
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Input Tokens</label>
                  <input
                    type="number"
                    value={inputTokens || ''}
                    onChange={(e) => setInputTokens(parseInt(e.target.value) || 0)}
                    placeholder="0"
                    className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-forge-cyan text-white text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Output Tokens</label>
                  <input
                    type="number"
                    value={outputTokens || ''}
                    onChange={(e) => setOutputTokens(parseInt(e.target.value) || 0)}
                    placeholder="0"
                    className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-forge-cyan text-white text-sm"
                  />
                </div>
              </div>

              {/* Cost Display */}
              <div className="bg-black/30 rounded-lg p-4 mb-4 text-center">
                <div className="text-xs text-gray-500 mb-1">Session Cost</div>
                <div className="text-3xl font-bold text-forge-cyan">
                  {formatCurrency(currentCost)}
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  at {model.name} rates
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2">
                <button
                  onClick={logSession}
                  disabled={inputTokens === 0 && outputTokens === 0}
                  className={`flex-1 px-4 py-2 rounded-lg font-medium transition-all ${
                    savedSession
                      ? 'bg-green-500 text-white'
                      : 'bg-forge-cyan text-forge-dark hover:bg-forge-cyan/80 disabled:opacity-50 disabled:cursor-not-allowed'
                  }`}
                >
                  {savedSession ? 'Logged!' : 'Log Session'}
                </button>
                <button
                  onClick={shareCalc}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    shared
                      ? 'bg-green-500 text-white'
                      : 'bg-forge-purple hover:bg-forge-purple/80 text-white'
                  }`}
                >
                  {shared ? 'Copied!' : 'Share'}
                </button>
              </div>
            </div>

            {/* 7-Day History */}
            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-sm font-medium text-gray-400">7-Day History</h3>
                {sessions.length > 0 && (
                  <div className="flex gap-2">
                    <button
                      onClick={exportSessions}
                      className={`text-xs transition-all ${
                        exported ? 'text-green-400' : 'text-forge-cyan hover:text-forge-cyan/80'
                      }`}
                    >
                      {exported ? 'Exported!' : 'Export JSON'}
                    </button>
                    <button
                      onClick={clearSessions}
                      className="text-xs text-red-400 hover:text-red-300"
                    >
                      Clear All
                    </button>
                  </div>
                )}
              </div>

              {sessions.length > 0 ? (
                <>
                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-4 mb-4">
                    <div className="text-center">
                      <div className="text-xl font-bold text-white">{sessionStats.sessions}</div>
                      <div className="text-xs text-gray-500">Sessions</div>
                    </div>
                    <div className="text-center">
                      <div className="text-xl font-bold text-forge-cyan">{formatCurrency(sessionStats.totalCost)}</div>
                      <div className="text-xs text-gray-500">Total Cost</div>
                    </div>
                    <div className="text-center">
                      <div className="text-xl font-bold text-forge-purple">{(sessionStats.totalTokens / 1000).toFixed(0)}K</div>
                      <div className="text-xs text-gray-500">Tokens</div>
                    </div>
                  </div>

                  {/* Recent Sessions */}
                  <div className="space-y-2 max-h-[200px] overflow-y-auto">
                    {sessions.slice(0, 10).map(session => {
                      const m = models.find(m => m.id === session.model) || models[1]
                      const cost = calculateCost(session.inputTokens, session.outputTokens, m)
                      const date = new Date(session.date)
                      return (
                        <div key={session.id} className="flex justify-between items-center text-sm bg-white/5 rounded-lg p-2">
                          <div>
                            <span className="text-gray-400">
                              {date.toLocaleDateString()} {date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </span>
                            <span className="text-xs text-gray-500 ml-2">
                              {((session.inputTokens + session.outputTokens) / 1000).toFixed(1)}K tokens
                            </span>
                          </div>
                          <span className="text-forge-cyan">{formatCurrency(cost)}</span>
                        </div>
                      )
                    })}
                  </div>
                </>
              ) : (
                <p className="text-center text-gray-500 py-8">
                  No sessions logged yet. Log your first session above.
                </p>
              )}
            </div>
          </div>

          {/* Right Column: Subscription Comparison */}
          <div className="space-y-6">
            {/* Usage Slider */}
            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
              <h3 className="text-sm font-medium text-gray-400 mb-4">Monthly Usage Estimate</h3>

              <div className="mb-4">
                <div className="flex justify-between text-sm text-gray-400 mb-2">
                  <span>100K tokens</span>
                  <span className="text-white font-medium">{(monthlyUsage / 1_000_000).toFixed(1)}M tokens/month</span>
                  <span>10M tokens</span>
                </div>
                <input
                  type="range"
                  min="100000"
                  max="10000000"
                  step="100000"
                  value={monthlyUsage}
                  onChange={(e) => setMonthlyUsage(parseInt(e.target.value))}
                  className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer accent-forge-cyan"
                />
              </div>

              <p className="text-xs text-gray-500">
                Drag to estimate your monthly token usage. Average Claude Code user: 1-3M tokens/month.
              </p>
            </div>

            {/* Comparison Table */}
            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
              <h3 className="text-sm font-medium text-gray-400 mb-4">Cost Comparison</h3>

              <div className="space-y-3">
                {/* API Sonnet */}
                <div className={`p-4 rounded-lg ${comparison.recommendation === 'api' ? 'bg-green-500/10 border border-green-500/30' : 'bg-white/5'}`}>
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="font-medium">API (Sonnet)</div>
                      <div className="text-xs text-gray-500">Pay per token</div>
                    </div>
                    <div className="text-right">
                      <div className="text-xl font-bold text-forge-cyan">{formatCurrency(comparison.sonnetApi)}/mo</div>
                      {comparison.recommendation === 'api' && (
                        <div className="text-xs text-green-400">Save {formatCurrency(comparison.savings)}</div>
                      )}
                    </div>
                  </div>
                </div>

                {/* API Opus */}
                <div className="p-4 rounded-lg bg-white/5">
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="font-medium">API (Opus)</div>
                      <div className="text-xs text-gray-500">Pay per token</div>
                    </div>
                    <div className="text-right">
                      <div className="text-xl font-bold text-forge-purple">{formatCurrency(comparison.opusApi)}/mo</div>
                    </div>
                  </div>
                </div>

                {/* Subscription */}
                <div className={`p-4 rounded-lg ${comparison.recommendation === 'subscription' ? 'bg-green-500/10 border border-green-500/30' : 'bg-white/5'}`}>
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="font-medium">Claude Max</div>
                      <div className="text-xs text-gray-500">Unlimited usage</div>
                    </div>
                    <div className="text-right">
                      <div className="text-xl font-bold text-white">{formatCurrency(comparison.subscription)}/mo</div>
                      {comparison.recommendation === 'subscription' && (
                        <div className="text-xs text-green-400">Save {formatCurrency(comparison.savings)}</div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Verdict */}
              <div className="mt-4 p-4 bg-gradient-to-r from-forge-purple/20 to-forge-cyan/20 rounded-lg">
                <div className="text-sm font-medium mb-1">Our Recommendation</div>
                <div className="text-lg">
                  {comparison.recommendation === 'api' ? (
                    <>
                      <span className="text-green-400">API</span> is more cost-effective for your usage
                    </>
                  ) : (
                    <>
                      <span className="text-green-400">Claude Max</span> subscription makes sense
                    </>
                  )}
                </div>
                <div className="text-xs text-gray-400 mt-1">
                  You would save {formatCurrency(comparison.savings)}/month with {comparison.recommendation === 'api' ? 'API' : 'subscription'}
                </div>
              </div>
            </div>

            {/* Pricing Reference */}
            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
              <h3 className="text-sm font-medium text-gray-400 mb-3">Current API Pricing (Jan 2026)</h3>
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-gray-500">
                    <th className="text-left py-2">Model</th>
                    <th className="text-right py-2">Input/1M</th>
                    <th className="text-right py-2">Output/1M</th>
                  </tr>
                </thead>
                <tbody>
                  {models.map(m => (
                    <tr key={m.id} className="border-t border-white/5">
                      <td className="py-2">{m.name}</td>
                      <td className="text-right text-gray-400">${m.inputPer1M}</td>
                      <td className="text-right text-gray-400">${m.outputPer1M}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <p className="text-gray-400 mb-4">
            Want to optimize your prompts for better results?
          </p>
          <div className="flex justify-center gap-4 flex-wrap">
            <Link
              href="/tools/prompt-optimizer"
              className="inline-block px-6 py-3 bg-forge-purple hover:bg-forge-purple/80 rounded-xl font-semibold transition-all"
            >
              Try Prompt Optimizer
            </Link>
            <Link
              href="/tools/token-counter"
              className="inline-block px-6 py-3 bg-white/10 hover:bg-white/20 rounded-xl font-semibold transition-all"
            >
              Token Counter
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}
