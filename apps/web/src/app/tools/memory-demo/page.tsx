'use client'

import { useState, useCallback, useEffect } from 'react'
import Link from 'next/link'

interface Memory {
  id: string
  content: string
  summary: string
  type: 'decision' | 'preference' | 'learning' | 'pattern' | 'fact'
  importance: number
  createdAt: Date
  entities: string[]
}

interface Message {
  role: 'user' | 'assistant' | 'system'
  content: string
  memory?: Memory
}

const EXAMPLE_MEMORIES: Memory[] = [
  {
    id: 'mem_1',
    content: 'User prefers Tailwind CSS over styled-components for this project. They value utility-first CSS for rapid prototyping and consistent styling.',
    summary: 'Prefers Tailwind CSS over styled-components',
    type: 'preference',
    importance: 8,
    createdAt: new Date(Date.now() - 86400000 * 3),
    entities: ['Tailwind CSS', 'styled-components', 'CSS']
  },
  {
    id: 'mem_2',
    content: 'Auth implementation uses JWT tokens with 24h expiry. Tokens stored in httpOnly cookies to prevent XSS attacks. Refresh tokens have 7-day expiry.',
    summary: 'Auth uses JWT with httpOnly cookies',
    type: 'decision',
    importance: 9,
    createdAt: new Date(Date.now() - 86400000 * 7),
    entities: ['JWT', 'auth', 'cookies', 'security']
  },
  {
    id: 'mem_3',
    content: 'Fixed CORS issue by adding specific origin headers. The issue occurred because browser was blocking preflight OPTIONS requests. Solution: explicitly list allowed origins.',
    summary: 'CORS fix: explicit origin headers needed',
    type: 'learning',
    importance: 7,
    createdAt: new Date(Date.now() - 86400000 * 2),
    entities: ['CORS', 'security', 'debugging']
  }
]

const DEMO_SCENARIOS = [
  {
    name: 'Quick Start',
    description: 'See how memory works in action',
    messages: [
      { role: 'user', content: 'What CSS framework should I use for this project?' },
      { role: 'assistant', content: "Let me check what we've discussed before...\n\n*Searching memories...*\n\nI found that you **prefer Tailwind CSS** for this project. You mentioned valuing utility-first CSS for rapid prototyping.\n\nShould I set up Tailwind for you?" },
    ]
  },
  {
    name: 'Store Decision',
    description: 'Save an architectural decision',
    messages: [
      { role: 'user', content: "Let's use PostgreSQL with Prisma for the database layer" },
      { role: 'assistant', content: "Great choice! PostgreSQL with Prisma gives you type-safe database access.\n\n*Storing this decision...*\n\nI've saved this as an **architectural decision** for future reference. Next time you ask about the database, I'll remember this." }
    ]
  },
  {
    name: 'Recall Learning',
    description: 'Find past debugging solutions',
    messages: [
      { role: 'user', content: "I'm getting CORS errors again, how did we fix this before?" },
      { role: 'assistant', content: "Let me search our past sessions...\n\n*Found relevant memory from 2 days ago:*\n\nWe fixed CORS by adding **explicit origin headers** to the server config. The issue was that the browser blocked preflight OPTIONS requests.\n\nWant me to show you the exact configuration we used?" }
    ]
  }
]

export default function MemoryDemoPage() {
  const [memories, setMemories] = useState<Memory[]>(EXAMPLE_MEMORIES)
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [activeScenario, setActiveScenario] = useState<number | null>(null)

  const filteredMemories = memories.filter(m =>
    searchQuery === '' ||
    m.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
    m.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
    m.entities.some(e => e.toLowerCase().includes(searchQuery.toLowerCase()))
  )

  const runScenario = useCallback((index: number) => {
    setActiveScenario(index)
    const scenario = DEMO_SCENARIOS[index]
    setMessages([])
    setIsTyping(true)

    let messageIndex = 0
    const addNextMessage = () => {
      if (messageIndex < scenario.messages.length) {
        const msg = scenario.messages[messageIndex]
        setMessages(prev => [...prev, {
          role: msg.role as 'user' | 'assistant',
          content: msg.content
        }])
        messageIndex++
        setTimeout(addNextMessage, msg.role === 'user' ? 500 : 1500)
      } else {
        setIsTyping(false)
      }
    }

    setTimeout(addNextMessage, 300)
  }, [])

  const handleStore = useCallback(() => {
    if (!input.trim()) return

    const newMemory: Memory = {
      id: `mem_${Date.now()}`,
      content: input,
      summary: input.slice(0, 50) + (input.length > 50 ? '...' : ''),
      type: 'learning',
      importance: 7,
      createdAt: new Date(),
      entities: input.match(/\b[A-Z][a-z]+\b/g) || []
    }

    setMemories(prev => [newMemory, ...prev])
    setMessages(prev => [
      ...prev,
      { role: 'user', content: `Remember: ${input}` },
      { role: 'system', content: `Memory stored: "${newMemory.summary}"`, memory: newMemory }
    ])
    setInput('')
  }, [input])

  const handleRecall = useCallback(() => {
    if (!input.trim()) return

    const query = input.toLowerCase()
    const found = memories.filter(m =>
      m.content.toLowerCase().includes(query) ||
      m.summary.toLowerCase().includes(query) ||
      m.entities.some(e => e.toLowerCase().includes(query))
    )

    setMessages(prev => [
      ...prev,
      { role: 'user', content: `Search: ${input}` },
      {
        role: 'system',
        content: found.length > 0
          ? `Found ${found.length} memor${found.length === 1 ? 'y' : 'ies'}:\n${found.map(m => `- ${m.summary}`).join('\n')}`
          : 'No memories found matching your query.'
      }
    ])
    setInput('')
  }, [input, memories])

  const formatDate = (date: Date) => {
    const now = new Date()
    const diff = now.getTime() - date.getTime()
    const days = Math.floor(diff / (1000 * 60 * 60 * 24))
    if (days === 0) return 'Today'
    if (days === 1) return 'Yesterday'
    return `${days} days ago`
  }

  const getTypeColor = (type: Memory['type']) => {
    switch (type) {
      case 'decision': return 'bg-purple-500/20 text-purple-300 border-purple-500/30'
      case 'preference': return 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30'
      case 'learning': return 'bg-green-500/20 text-green-300 border-green-500/30'
      case 'pattern': return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30'
      case 'fact': return 'bg-blue-500/20 text-blue-300 border-blue-500/30'
    }
  }

  return (
    <main className="min-h-screen text-white bg-[#0a0a14]">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <Link href="/tools" className="text-forge-cyan hover:underline text-sm mb-4 inline-block">
            ← Back to Tools
          </Link>
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            Memory <span className="text-forge-cyan">Demo</span>
          </h1>
          <p className="text-gray-400 max-w-2xl">
            Experience how AI memory works. Claude remembers decisions, preferences, and learnings across sessions - no more repeating yourself.
          </p>
        </div>

        {/* Demo Scenarios */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold mb-4 text-gray-300">Try a scenario:</h2>
          <div className="flex flex-wrap gap-3">
            {DEMO_SCENARIOS.map((scenario, index) => (
              <button
                key={index}
                onClick={() => runScenario(index)}
                className={`px-4 py-2 rounded-xl transition-all duration-200 border ${
                  activeScenario === index
                    ? 'bg-forge-cyan/20 border-forge-cyan text-forge-cyan'
                    : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20'
                }`}
              >
                <span className="font-medium">{scenario.name}</span>
                <span className="text-gray-400 text-sm ml-2">{scenario.description}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-5 gap-6">
          {/* Chat Panel */}
          <div className="lg:col-span-3 bg-white/5 border border-white/10 rounded-xl overflow-hidden">
            <div className="p-4 border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-green-400 animate-pulse"></div>
                <span className="font-medium">Claude with Memory</span>
              </div>
              <button
                onClick={() => { setMessages([]); setActiveScenario(null) }}
                className="text-xs text-gray-400 hover:text-white px-2 py-1 rounded hover:bg-white/10"
              >
                Clear Chat
              </button>
            </div>

            {/* Messages */}
            <div className="h-[400px] overflow-y-auto p-4 space-y-4">
              {messages.length === 0 && (
                <div className="text-center text-gray-500 py-12">
                  <p className="mb-2">Click a scenario above to see memory in action</p>
                  <p className="text-sm">Or type below to store/recall your own memories</p>
                </div>
              )}
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] rounded-xl px-4 py-3 ${
                      msg.role === 'user'
                        ? 'bg-forge-cyan/20 border border-forge-cyan/30'
                        : msg.role === 'system'
                        ? 'bg-green-500/10 border border-green-500/30'
                        : 'bg-white/10 border border-white/10'
                    }`}
                  >
                    <div className="text-xs text-gray-400 mb-1">
                      {msg.role === 'user' ? 'You' : msg.role === 'system' ? 'Memory System' : 'Claude'}
                    </div>
                    <div className="whitespace-pre-wrap text-sm">{msg.content}</div>
                    {msg.memory && (
                      <div className={`mt-2 px-2 py-1 rounded text-xs ${getTypeColor(msg.memory.type)}`}>
                        Type: {msg.memory.type} | Importance: {msg.memory.importance}/10
                      </div>
                    )}
                  </div>
                </div>
              ))}
              {isTyping && (
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
            </div>

            {/* Input */}
            <div className="p-4 border-t border-white/10">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type a memory to store or query to search..."
                  className="flex-1 px-4 py-3 bg-black/30 border border-white/10 rounded-xl focus:outline-none focus:border-forge-cyan text-white text-sm"
                  onKeyDown={(e) => e.key === 'Enter' && handleStore()}
                />
                <button
                  onClick={handleStore}
                  className="px-4 py-3 bg-purple-500/20 border border-purple-500/30 text-purple-300 rounded-xl hover:bg-purple-500/30 transition-colors text-sm"
                >
                  Store
                </button>
                <button
                  onClick={handleRecall}
                  className="px-4 py-3 bg-forge-cyan/20 border border-forge-cyan/30 text-forge-cyan rounded-xl hover:bg-forge-cyan/30 transition-colors text-sm"
                >
                  Recall
                </button>
              </div>
            </div>
          </div>

          {/* Memory Bank */}
          <div className="lg:col-span-2 bg-white/5 border border-white/10 rounded-xl overflow-hidden">
            <div className="p-4 border-b border-white/10">
              <h2 className="font-medium mb-3">Memory Bank</h2>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Filter memories..."
                className="w-full px-3 py-2 bg-black/30 border border-white/10 rounded-lg focus:outline-none focus:border-forge-cyan text-white text-sm"
              />
            </div>

            <div className="h-[450px] overflow-y-auto p-4 space-y-3">
              {filteredMemories.map((memory) => (
                <div
                  key={memory.id}
                  className="bg-black/20 border border-white/5 rounded-lg p-3 hover:border-white/20 transition-colors"
                >
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <span className={`px-2 py-0.5 rounded text-xs border ${getTypeColor(memory.type)}`}>
                      {memory.type}
                    </span>
                    <span className="text-xs text-gray-500">{formatDate(memory.createdAt)}</span>
                  </div>
                  <p className="text-sm text-gray-300 mb-2">{memory.summary}</p>
                  <div className="flex flex-wrap gap-1">
                    {memory.entities.slice(0, 3).map((entity, i) => (
                      <span key={i} className="px-1.5 py-0.5 bg-white/5 rounded text-xs text-gray-400">
                        {entity}
                      </span>
                    ))}
                    {memory.entities.length > 3 && (
                      <span className="text-xs text-gray-500">+{memory.entities.length - 3}</span>
                    )}
                  </div>
                  <div className="mt-2 flex items-center gap-2">
                    <div className="flex-1 h-1 bg-white/10 rounded">
                      <div
                        className="h-1 bg-forge-cyan rounded"
                        style={{ width: `${memory.importance * 10}%` }}
                      ></div>
                    </div>
                    <span className="text-xs text-gray-500">{memory.importance}/10</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-4 border-t border-white/10 bg-black/20">
              <div className="text-center text-sm text-gray-400">
                {memories.length} memories stored
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <div className="glass rounded-2xl p-8 max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold mb-4">Ready to give Claude memory?</h2>
            <p className="text-gray-400 mb-6">
              Install memory-mcp and never repeat yourself again. Free for local use, cloud sync available.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="https://github.com/whenmoon-afk/claude-memory-mcp"
                className="px-6 py-3 bg-forge-cyan text-forge-dark font-medium rounded-xl hover:opacity-90 transition-opacity"
              >
                View on GitHub
              </Link>
              <Link
                href="/dashboard"
                className="px-6 py-3 bg-white/10 border border-white/20 rounded-xl hover:bg-white/20 transition-colors"
              >
                Get Cloud Access
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
