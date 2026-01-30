'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import NewsletterCapture from '@/components/NewsletterCapture'
import RelatedTools from '@/components/RelatedTools'

// Realistic memories that feel like they came from actual dev work
const REALISTIC_MEMORIES = [
  {
    id: 'mem_1',
    content: 'Use Bun instead of npm - this project uses bun.lock',
    context: 'Project setup',
    importance: 9,
    timesUsed: 12,
  },
  {
    id: 'mem_2',
    content: "Don't add comments to unchanged code",
    context: 'Code style preference',
    importance: 8,
    timesUsed: 23,
  },
  {
    id: 'mem_3',
    content: 'Auth tokens stored in httpOnly cookies, not localStorage',
    context: 'Security decision',
    importance: 10,
    timesUsed: 8,
  },
  {
    id: 'mem_4',
    content: 'Tests go in __tests__ folder, not alongside components',
    context: 'Project structure',
    importance: 7,
    timesUsed: 15,
  },
  {
    id: 'mem_5',
    content: "Always run 'bun test' before committing",
    context: 'Workflow',
    importance: 8,
    timesUsed: 31,
  },
]

// What you'd have to say WITHOUT memory
const WITHOUT_MEMORY_EXCHANGE = [
  { role: 'claude', text: "I'll help you set up the test. Should I put it in a `__tests__` folder or next to the component?" },
  { role: 'user', text: "Tests go in __tests__ folder" },
  { role: 'claude', text: "Got it. I'll use npm to install the testing library—" },
  { role: 'user', text: "No, use Bun. This project uses bun.lock" },
  { role: 'claude', text: "Right, Bun it is. I'll add some helpful comments—" },
  { role: 'user', text: "Please don't add comments to unchanged code" },
  { role: 'claude', text: "Understood. For the auth test, should tokens be in localStorage or cookies?" },
  { role: 'user', text: "httpOnly cookies. We decided this for security." },
]

// What happens WITH memory
const WITH_MEMORY_EXCHANGE = [
  { role: 'claude', text: "I'll create the test in `__tests__/` using Bun, no comments on unchanged code. Testing the httpOnly cookie auth flow." },
  { role: 'user', text: "Perfect." },
]

export default function MemoryDemoPage() {
  const [activeTab, setActiveTab] = useState<'without' | 'with'>('without')
  const [visibleMessages, setVisibleMessages] = useState(0)
  const [showComparison, setShowComparison] = useState(false)
  const [highlightedMemory, setHighlightedMemory] = useState<string | null>(null)
  const [copyFeedback, setCopyFeedback] = useState<string | null>(null)
  const [shareLink, setShareLink] = useState<string | null>(null)

  // Copy memories to clipboard as formatted text
  const copyToClipboard = async () => {
    const text = REALISTIC_MEMORIES.map(m =>
      `[${m.context}] ${m.content} (importance: ${m.importance}/10, used ${m.timesUsed}x)`
    ).join('\n')

    try {
      await navigator.clipboard.writeText(text)
      setCopyFeedback('Copied!')
      setTimeout(() => setCopyFeedback(null), 2000)
    } catch {
      setCopyFeedback('Failed to copy')
      setTimeout(() => setCopyFeedback(null), 2000)
    }
  }

  // Export memories as JSON file
  const exportAsJSON = () => {
    const data = {
      exportedAt: new Date().toISOString(),
      memories: REALISTIC_MEMORIES,
    }
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'claude-memories-demo.json'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
    setCopyFeedback('Exported!')
    setTimeout(() => setCopyFeedback(null), 2000)
  }

  // Generate shareable link with current state
  const generateShareLink = () => {
    const state = {
      tab: activeTab,
      memories: REALISTIC_MEMORIES.length,
    }
    const encoded = btoa(JSON.stringify(state))
    const url = `${window.location.origin}${window.location.pathname}?demo=${encoded}`
    setShareLink(url)
    navigator.clipboard.writeText(url).then(() => {
      setCopyFeedback('Link copied!')
      setTimeout(() => setCopyFeedback(null), 2000)
    }).catch(() => {})
  }

  // Animate messages appearing
  useEffect(() => {
    const messages = activeTab === 'without' ? WITHOUT_MEMORY_EXCHANGE : WITH_MEMORY_EXCHANGE
    if (visibleMessages < messages.length) {
      const timer = setTimeout(() => {
        setVisibleMessages(v => v + 1)
      }, activeTab === 'without' ? 800 : 1200)
      return () => clearTimeout(timer)
    }
  }, [visibleMessages, activeTab])

  // Reset animation when switching tabs
  const switchTab = (tab: 'without' | 'with') => {
    setActiveTab(tab)
    setVisibleMessages(0)
    setShowComparison(false)
  }

  const messages = activeTab === 'without' ? WITHOUT_MEMORY_EXCHANGE : WITH_MEMORY_EXCHANGE

  // Calculate time wasted (4 corrections × 30 seconds each)
  const correctionsCount = WITHOUT_MEMORY_EXCHANGE.filter(m => m.role === 'user').length - 1
  const timeWasted = correctionsCount * 30 // seconds

  return (
    <main className="min-h-screen text-white bg-[#0a0a14]">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <Link href="/tools" className="text-forge-cyan hover:underline text-sm mb-4 inline-block">
            ← Back to Tools
          </Link>
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            Stop Repeating <span className="text-forge-cyan">Yourself</span>
          </h1>
          <p className="text-gray-400 max-w-2xl text-lg">
            See what happens when Claude actually remembers your preferences.
          </p>
        </div>

        {/* Main Demo */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Chat Comparison */}
          <div className="lg:col-span-2">
            {/* Tab Switcher */}
            <div className="flex gap-2 mb-4">
              <button
                onClick={() => switchTab('without')}
                className={`flex-1 py-3 px-4 rounded-xl font-medium transition-all ${
                  activeTab === 'without'
                    ? 'bg-red-500/20 border-2 border-red-500/50 text-red-300'
                    : 'bg-white/5 border border-white/10 text-gray-400 hover:bg-white/10'
                }`}
              >
                <span className="block text-lg">😤 Without Memory</span>
                <span className="text-sm opacity-70">Every session starts fresh</span>
              </button>
              <button
                onClick={() => switchTab('with')}
                className={`flex-1 py-3 px-4 rounded-xl font-medium transition-all ${
                  activeTab === 'with'
                    ? 'bg-green-500/20 border-2 border-green-500/50 text-green-300'
                    : 'bg-white/5 border border-white/10 text-gray-400 hover:bg-white/10'
                }`}
              >
                <span className="block text-lg">✨ With Memory</span>
                <span className="text-sm opacity-70">Claude remembers</span>
              </button>
            </div>

            {/* Chat Window */}
            <div className={`rounded-xl border overflow-hidden ${
              activeTab === 'without'
                ? 'bg-red-500/5 border-red-500/20'
                : 'bg-green-500/5 border-green-500/20'
            }`}>
              <div className={`p-3 border-b flex items-center gap-2 ${
                activeTab === 'without' ? 'border-red-500/20' : 'border-green-500/20'
              }`}>
                <div className={`w-3 h-3 rounded-full ${
                  activeTab === 'without' ? 'bg-red-400' : 'bg-green-400'
                }`}></div>
                <span className="text-sm text-gray-400">
                  {activeTab === 'without' ? 'Standard Claude Code' : 'Claude Code + memory-mcp'}
                </span>
              </div>

              {/* Messages */}
              <div className="p-4 min-h-[350px] space-y-3">
                <div className="text-center text-gray-500 text-sm mb-4">
                  New session: &quot;Help me write a test for the auth component&quot;
                </div>

                {messages.slice(0, visibleMessages).map((msg, i) => (
                  <div
                    key={i}
                    className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in`}
                  >
                    <div className={`max-w-[85%] rounded-xl px-4 py-3 ${
                      msg.role === 'user'
                        ? 'bg-forge-cyan/20 border border-forge-cyan/30'
                        : 'bg-white/10 border border-white/10'
                    }`}>
                      <div className="text-xs text-gray-500 mb-1">
                        {msg.role === 'user' ? 'You (correcting again...)' : 'Claude'}
                      </div>
                      <div className="text-sm">{msg.text}</div>
                    </div>
                  </div>
                ))}

                {visibleMessages < messages.length && (
                  <div className="flex justify-start">
                    <div className="bg-white/10 rounded-xl px-4 py-3 border border-white/10">
                      <div className="flex gap-1">
                        <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></span>
                        <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></span>
                        <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Summary when done */}
                {visibleMessages >= messages.length && (
                  <div className={`mt-6 p-4 rounded-xl ${
                    activeTab === 'without'
                      ? 'bg-red-500/10 border border-red-500/30'
                      : 'bg-green-500/10 border border-green-500/30'
                  }`}>
                    {activeTab === 'without' ? (
                      <>
                        <div className="text-red-300 font-semibold mb-2">
                          {correctionsCount} corrections needed
                        </div>
                        <div className="text-gray-400 text-sm">
                          ~{Math.round(timeWasted / 60)} minutes wasted this session.
                          Multiply by every session, every project...
                        </div>
                        <button
                          onClick={() => switchTab('with')}
                          className="mt-3 px-4 py-2 bg-green-500/20 border border-green-500/30 text-green-300 rounded-lg text-sm hover:bg-green-500/30 transition-colors"
                        >
                          See it with memory →
                        </button>
                      </>
                    ) : (
                      <>
                        <div className="text-green-300 font-semibold mb-2">
                          0 corrections needed
                        </div>
                        <div className="text-gray-400 text-sm">
                          Claude remembered everything. One message, done.
                        </div>
                      </>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Stats Comparison */}
            {activeTab === 'with' && visibleMessages >= messages.length && (
              <div className="mt-6 grid grid-cols-3 gap-4">
                <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-center">
                  <div className="text-3xl font-bold text-red-400 line-through opacity-50">{correctionsCount}</div>
                  <div className="text-sm text-gray-500">Corrections</div>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-center">
                  <div className="text-3xl font-bold text-green-400">89</div>
                  <div className="text-sm text-gray-500">Memories stored</div>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-center">
                  <div className="text-3xl font-bold text-forge-cyan">2.5h</div>
                  <div className="text-sm text-gray-500">Saved/month</div>
                </div>
              </div>
            )}
          </div>

          {/* Memory Bank */}
          <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden">
            <div className="p-4 border-b border-white/10">
              <h2 className="font-semibold">What Claude Remembers</h2>
              <p className="text-xs text-gray-500 mt-1">
                {activeTab === 'with' ? 'Active memories from past sessions' : 'Nothing - every session starts fresh'}
              </p>
            </div>

            <div className="p-4 space-y-3 max-h-[450px] overflow-y-auto">
              {activeTab === 'without' ? (
                <div className="text-center py-12 text-gray-500">
                  <div className="text-4xl mb-3 opacity-50">🧠</div>
                  <p>No memories</p>
                  <p className="text-sm mt-1">Claude starts fresh every time</p>
                </div>
              ) : (
                REALISTIC_MEMORIES.map((memory) => (
                  <div
                    key={memory.id}
                    className={`p-3 rounded-lg border transition-all cursor-pointer ${
                      highlightedMemory === memory.id
                        ? 'bg-forge-cyan/10 border-forge-cyan/30'
                        : 'bg-black/20 border-white/5 hover:border-white/20'
                    }`}
                    onMouseEnter={() => setHighlightedMemory(memory.id)}
                    onMouseLeave={() => setHighlightedMemory(null)}
                  >
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <span className="text-xs text-gray-500">{memory.context}</span>
                      <span className={`text-xs px-1.5 py-0.5 rounded ${
                        memory.importance >= 9 ? 'bg-red-500/20 text-red-300' :
                        memory.importance >= 7 ? 'bg-yellow-500/20 text-yellow-300' :
                        'bg-gray-500/20 text-gray-400'
                      }`}>
                        {memory.importance}/10
                      </span>
                    </div>
                    <p className="text-sm text-gray-300">{memory.content}</p>
                    <div className="mt-2 text-xs text-gray-600">
                      Used {memory.timesUsed} times
                    </div>
                  </div>
                ))
              )}
            </div>

            {activeTab === 'with' && (
              <div className="p-4 border-t border-white/10 bg-black/20 space-y-3">
                {/* Action Buttons */}
                <div className="flex gap-2">
                  <button
                    onClick={copyToClipboard}
                    className="flex-1 px-3 py-2 text-xs bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition-colors flex items-center justify-center gap-1.5"
                  >
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                    Copy
                  </button>
                  <button
                    onClick={exportAsJSON}
                    className="flex-1 px-3 py-2 text-xs bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition-colors flex items-center justify-center gap-1.5"
                  >
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                    Export JSON
                  </button>
                  <button
                    onClick={generateShareLink}
                    className="flex-1 px-3 py-2 text-xs bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition-colors flex items-center justify-center gap-1.5"
                  >
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                    </svg>
                    Share
                  </button>
                </div>

                {/* Feedback Message */}
                {copyFeedback && (
                  <div className="text-xs text-center text-green-400 animate-fade-in">
                    {copyFeedback}
                  </div>
                )}

                {/* Share Link Display */}
                {shareLink && (
                  <div className="p-2 bg-black/30 rounded-lg">
                    <div className="text-xs text-gray-500 mb-1">Share this demo:</div>
                    <div className="text-xs text-forge-cyan break-all font-mono">
                      {shareLink}
                    </div>
                  </div>
                )}

                <div className="text-xs text-gray-500 text-center">
                  Memories persist across sessions
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Related Tools */}
        <RelatedTools currentPath="/tools/memory-demo" />

        {/* CTA */}
        <div className="mt-12 bg-gradient-to-r from-forge-purple/20 to-forge-cyan/20 rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-bold mb-3">Ready to stop repeating yourself?</h2>
          <p className="text-gray-400 mb-6 max-w-xl mx-auto">
            Install memory-mcp and Claude will remember your preferences, decisions, and project context forever.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="https://github.com/whenmoon-afk/claude-memory-mcp"
              className="px-6 py-3 bg-forge-cyan text-forge-dark font-semibold rounded-xl hover:opacity-90 transition-opacity"
            >
              Install Free Plugin
            </Link>
          </div>
          <p className="text-xs text-gray-500 mt-4">
            Free and open source. Your data stays on your machine.
          </p>
        </div>

        {/* Newsletter */}
        <div className="mt-8 max-w-xl mx-auto">
          <NewsletterCapture source="memory-demo" compact />
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
      `}</style>
    </main>
  )
}
