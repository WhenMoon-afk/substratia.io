'use client'

import { useState } from 'react'

interface Message {
  role: 'assistant' | 'user'
  content: string
}

const suggestions = [
  "What capabilities should I add for a code review agent?",
  "How do I prevent my agent from getting stuck in loops?",
  "What security rules are essential?",
  "Suggest rulesets for an autonomous agent",
]

const responses: Record<string, string> = {
  "code review": `For a code review agent, I recommend:

**Capabilities:**
- Code Review Focus (domain)
- Verify External Facts (core)
- Show Verification (behavior)

**Rulesets:**
- Code Safety (prevents unwanted changes)
- Security Rules (catches vulnerabilities)
- Verification Rules (ensures thorough review)

Click on these in the builder to add them!`,

  "loop": `To prevent loops, add the **Loop Prevention** ruleset. Key rules include:

- Don't repeat actions more than 3 times
- Don't take excessive screenshots
- Stop when blocked, don't keep retrying

Also consider adding **Autonomous Operation** for self-monitoring.`,

  "security": `Essential security rules:

1. **Security Rules** ruleset (critical)
   - Never expose secrets
   - Never bypass security measures
   - Verify before financial transactions

2. **Data Privacy** capability
   - Protects PII
   - Safe data handling

3. **Git Safety** ruleset
   - Prevents dangerous git operations`,

  "autonomous": `For autonomous agents, I recommend:

**Capabilities:**
- Automation Agent (domain)
- Context Awareness (behavior)
- Rate Limit Awareness (safety)

**Rulesets:**
- Autonomous Operation (positive)
- Loop Prevention (negative)
- Verification Rules (positive)

These help the agent run reliably without human intervention.`,
}

export default function AIAssistant() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: "Hi! I'm your AI assistant. I can help you choose the right capabilities and rulesets for your agent. What are you trying to build?"
    }
  ])
  const [input, setInput] = useState('')

  const handleSend = () => {
    if (!input.trim()) return

    const userMessage = input.toLowerCase()
    setMessages(prev => [...prev, { role: 'user', content: input }])
    setInput('')

    // Simple keyword matching for demo
    setTimeout(() => {
      let response = "I can help with that! Try clicking on capabilities and rulesets that match your use case. For specific recommendations, ask about code review, loops, security, or autonomous agents."

      for (const [keyword, resp] of Object.entries(responses)) {
        if (userMessage.includes(keyword)) {
          response = resp
          break
        }
      }

      setMessages(prev => [...prev, { role: 'assistant', content: response }])
    }, 500)
  }

  return (
    <div className="bg-white/5 border border-white/10 rounded-xl h-full flex flex-col">
      <div className="p-4 border-b border-white/10">
        <h3 className="font-semibold flex items-center gap-2">
          <span className="text-forge-cyan">AI</span> Assistant
          <span className="text-xs bg-forge-purple/30 px-2 py-0.5 rounded">Beta</span>
        </h3>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 max-h-[400px]" role="log" aria-live="polite">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`${
              msg.role === 'assistant'
                ? 'bg-forge-purple/20 border-l-2 border-forge-purple'
                : 'bg-white/5'
            } rounded-lg p-3`}
          >
            <div className="text-xs text-gray-400 mb-1">
              {msg.role === 'assistant' ? 'Assistant' : 'You'}
            </div>
            <div className="text-sm whitespace-pre-wrap">{msg.content}</div>
          </div>
        ))}
      </div>

      {/* Suggestions */}
      <div className="p-2 border-t border-white/10">
        <div className="text-xs text-gray-400 mb-2">Suggestions:</div>
        <div className="flex flex-wrap gap-1">
          {suggestions.map((s, i) => (
            <button
              key={i}
              onClick={() => setInput(s)}
              aria-label={`Use suggestion: ${s}`}
              className="text-xs px-2 py-1 bg-white/5 hover:bg-white/10 rounded transition-all"
            >
              {s.slice(0, 30)}...
            </button>
          ))}
        </div>
      </div>

      {/* Input */}
      <div className="p-4 border-t border-white/10">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask for help..."
            aria-label="Ask the AI assistant for help"
            className="flex-1 px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-sm focus:outline-none focus:border-forge-cyan"
          />
          <button
            onClick={handleSend}
            aria-label="Send message"
            className="px-4 py-2 bg-forge-purple hover:bg-forge-purple/80 rounded-lg text-sm font-medium transition-all"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  )
}
