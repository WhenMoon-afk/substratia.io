'use client'

import { useState } from 'react'
import Link from 'next/link'

interface FAQItem {
  question: string
  answer: string | React.ReactNode
  category: 'general' | 'tools' | 'consulting' | 'technical'
}

const faqs: FAQItem[] = [
  // General
  {
    category: 'general',
    question: 'What is Claude Code?',
    answer: 'Claude Code is Anthropic\'s official CLI tool for AI-assisted software development. It allows developers to interact with Claude directly from the terminal to write, edit, and debug code. It\'s available with Claude Pro ($20/mo) and Claude Max ($100-200/mo) subscriptions.',
  },
  {
    category: 'general',
    question: 'What is Substratia?',
    answer: 'Substratia is a collection of free, open-source tools for Claude Code and AI memory management. We also offer consulting services to help individuals and teams get the most out of Claude Code.',
  },
  {
    category: 'general',
    question: 'Are these tools free?',
    answer: 'Yes, all tools are completely free and open source under the MIT license. This includes momentum, memory-mcp, and all web tools at substratia.io/tools. They will remain free forever.',
  },
  // Tools
  {
    category: 'tools',
    question: 'What is momentum?',
    answer: (
      <span>
        momentum is a Claude Code plugin for fast context recovery. It takes snapshots of your working state and can restore them in under 5 milliseconds after using /clear. Install with: <code className="bg-white/10 px-2 py-0.5 rounded text-sm">/plugin install momentum@substratia-marketplace</code>
      </span>
    ),
  },
  {
    category: 'tools',
    question: 'What is memory-mcp?',
    answer: (
      <span>
        memory-mcp is an MCP server that gives Claude persistent memory across sessions. Claude can store facts, recall information, and search memories using natural language. It uses SQLite with FTS5 full-text search. Install with: <code className="bg-white/10 px-2 py-0.5 rounded text-sm">npx @whenmoon-afk/memory-mcp</code>
      </span>
    ),
  },
  {
    category: 'tools',
    question: 'What\'s the difference between momentum and memory-mcp?',
    answer: 'momentum is for short-term context recovery within sessions (snapshot your work, restore after /clear). memory-mcp is for long-term persistent memory across sessions (store facts, recall them tomorrow). They work together as complementary tools.',
  },
  {
    category: 'tools',
    question: 'Do I need both momentum and memory-mcp?',
    answer: 'No, they serve different purposes. Use momentum if you want fast context recovery within sessions. Use memory-mcp if you want Claude to remember facts across sessions. Many users find value in both.',
  },
  {
    category: 'tools',
    question: 'Where is my data stored?',
    answer: 'All data is stored locally on your machine in SQLite databases. momentum stores snapshots in ~/.local/share/momentum/ (Linux/macOS) or %LOCALAPPDATA%/momentum (Windows). memory-mcp stores memories in a similar location. Nothing is sent to the cloud.',
  },
  // Consulting
  {
    category: 'consulting',
    question: 'Do you offer consulting?',
    answer: (
      <span>
        Yes! We offer Claude Code consulting services including setup sessions, team workshops, and ongoing advisory. <Link href="/consulting" className="text-forge-cyan hover:underline">View all services and pricing →</Link>
      </span>
    ),
  },
  {
    category: 'consulting',
    question: 'What\'s included in a Setup Session?',
    answer: 'A 1.5-hour hands-on session where we configure Claude Code for your specific needs. You\'ll leave with a working setup including a custom CLAUDE.md file, MCP tools configured, and best practices guidance. Price: $200.',
  },
  {
    category: 'consulting',
    question: 'Can you train my team?',
    answer: 'Yes! The Team Workshop is a half-day training for 5-15 developers covering Claude Code fundamentals, team-specific workflows, and hands-on exercises. Price: $1,500. For larger teams or full-day training, contact us.',
  },
  {
    category: 'consulting',
    question: 'Do you offer ongoing support?',
    answer: 'Yes, we have three advisory tiers: Light ($500/mo, 2 hrs), Standard ($1,200/mo, 5 hrs + weekly calls), and Premium ($2,500/mo, 10 hrs + on-call support). These include email support, async questions, and regular check-ins.',
  },
  {
    category: 'consulting',
    question: 'How do I book a session?',
    answer: (
      <span>
        Fill out the contact form on the <Link href="/consulting#contact" className="text-forge-cyan hover:underline">consulting page</Link>. I&apos;ll respond within 24 hours to discuss your needs and schedule a time.
      </span>
    ),
  },
  // Technical
  {
    category: 'technical',
    question: 'What is a context window?',
    answer: 'The context window is Claude\'s working memory during a conversation—approximately 200,000 tokens. Everything you say, files Claude reads, and Claude\'s responses consume context. When it fills up, Claude compacts (summarizes) the conversation, which can lose details.',
  },
  {
    category: 'technical',
    question: 'What is compaction?',
    answer: 'When the context window fills up, Claude Code automatically summarizes the conversation to free up space. This is called compaction. It\'s lossy—details get dropped. Tools like momentum help preserve context across compaction events.',
  },
  {
    category: 'technical',
    question: 'What is CLAUDE.md?',
    answer: 'CLAUDE.md is a configuration file in your project root that gives Claude context about your project. It survives compaction and is read at the start of every session. Include project overview, coding standards, key directories, and a "Do NOT" section for constraints.',
  },
  {
    category: 'technical',
    question: 'What is MCP?',
    answer: 'MCP (Model Context Protocol) is a standard for connecting AI assistants to external tools and data sources. MCP servers like memory-mcp add capabilities to Claude Code. They\'re configured in ~/.claude/claude_desktop_config.json.',
  },
  {
    category: 'technical',
    question: 'Why SQLite instead of a vector database?',
    answer: 'For most AI memory use cases, SQLite with FTS5 (full-text search) is sufficient and has major advantages: instant startup, zero dependencies, no API costs, works offline, and data stays on your machine. Vector embeddings add complexity without proportional benefit for typical usage.',
  },
]

const categories = [
  { id: 'all', label: 'All' },
  { id: 'general', label: 'General' },
  { id: 'tools', label: 'Tools' },
  { id: 'consulting', label: 'Consulting' },
  { id: 'technical', label: 'Technical' },
]

export default function FAQPage() {
  const [activeCategory, setActiveCategory] = useState('all')
  const [openItems, setOpenItems] = useState<Set<number>>(new Set())

  const filteredFaqs = activeCategory === 'all'
    ? faqs
    : faqs.filter(faq => faq.category === activeCategory)

  const toggleItem = (index: number) => {
    const newOpenItems = new Set(openItems)
    if (newOpenItems.has(index)) {
      newOpenItems.delete(index)
    } else {
      newOpenItems.add(index)
    }
    setOpenItems(newOpenItems)
  }

  return (
    <main className="min-h-screen text-white relative">
      <div className="neural-bg" />
      <div className="fixed inset-0 gradient-mesh pointer-events-none z-0" />

      <section className="relative z-10 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-center mb-4">
              Frequently Asked <span className="text-forge-cyan">Questions</span>
            </h1>
            <p className="text-gray-400 text-center mb-12">
              Everything you need to know about Claude Code, our tools, and consulting services.
            </p>

            {/* Category Filter */}
            <div className="flex flex-wrap justify-center gap-2 mb-12">
              {categories.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-4 py-2 rounded-lg text-sm transition-all ${
                    activeCategory === cat.id
                      ? 'bg-forge-cyan text-forge-dark font-semibold'
                      : 'bg-white/5 hover:bg-white/10 text-gray-300'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* FAQ Items */}
            <div className="space-y-4">
              {filteredFaqs.map((faq, index) => (
                <div key={index} className="glass rounded-xl overflow-hidden">
                  <button
                    onClick={() => toggleItem(index)}
                    className="w-full px-6 py-4 text-left flex items-center justify-between"
                  >
                    <span className="font-medium pr-4">{faq.question}</span>
                    <svg
                      className={`w-5 h-5 flex-shrink-0 transition-transform ${
                        openItems.has(index) ? 'rotate-180' : ''
                      }`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {openItems.has(index) && (
                    <div className="px-6 pb-4 text-gray-300">
                      {faq.answer}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Still Have Questions */}
            <div className="mt-16 text-center">
              <h2 className="text-2xl font-bold mb-4">Still Have Questions?</h2>
              <p className="text-gray-400 mb-6">
                Can&apos;t find what you&apos;re looking for? Get in touch.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link
                  href="/consulting#contact"
                  className="px-6 py-3 bg-forge-cyan text-forge-dark font-semibold rounded-xl hover:bg-forge-cyan/90 transition-all"
                >
                  Contact Us
                </Link>
                <Link
                  href="/docs"
                  className="px-6 py-3 bg-white/10 hover:bg-white/20 rounded-xl font-semibold transition-all"
                >
                  View Documentation
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
