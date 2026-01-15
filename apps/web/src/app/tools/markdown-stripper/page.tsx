'use client'

import { useState, useCallback, useMemo } from 'react'
import Link from 'next/link'
import ShareButton from '@/components/ShareButton'

// Strip markdown formatting from text
function stripMarkdown(text: string): string {
  if (!text) return ''

  let result = text

  // Remove code blocks (``` ... ```)
  result = result.replace(/```[\s\S]*?```/g, (match) => {
    // Keep the code content, just remove the backticks
    return match.replace(/```\w*\n?/g, '').replace(/```/g, '')
  })

  // Remove inline code (`code`)
  result = result.replace(/`([^`]+)`/g, '$1')

  // Remove images ![alt](url)
  result = result.replace(/!\[([^\]]*)\]\([^)]+\)/g, '$1')

  // Remove links [text](url) - keep the text
  result = result.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')

  // Remove reference links [text][ref]
  result = result.replace(/\[([^\]]+)\]\[[^\]]*\]/g, '$1')

  // Remove reference definitions [ref]: url
  result = result.replace(/^\[[^\]]+\]:\s*\S+.*$/gm, '')

  // Remove headers (# ## ### etc)
  result = result.replace(/^#{1,6}\s+/gm, '')

  // Remove bold/italic (**text**, *text*, __text__, _text_)
  result = result.replace(/(\*\*|__)(.*?)\1/g, '$2')
  result = result.replace(/(\*|_)(.*?)\1/g, '$2')

  // Remove strikethrough ~~text~~
  result = result.replace(/~~(.*?)~~/g, '$1')

  // Remove blockquotes (> text)
  result = result.replace(/^>\s*/gm, '')

  // Remove horizontal rules (---, ***, ___)
  result = result.replace(/^[-*_]{3,}\s*$/gm, '')

  // Remove unordered list markers (-, *, +)
  result = result.replace(/^[\s]*[-*+]\s+/gm, '')

  // Remove ordered list markers (1., 2., etc)
  result = result.replace(/^[\s]*\d+\.\s+/gm, '')

  // Remove task list markers [ ] and [x]
  result = result.replace(/\[[ x]\]\s*/gi, '')

  // Remove HTML tags
  result = result.replace(/<[^>]+>/g, '')

  // Remove extra blank lines (collapse multiple newlines to max 2)
  result = result.replace(/\n{3,}/g, '\n\n')

  // Trim whitespace
  result = result.trim()

  return result
}

export default function MarkdownStripperPage() {
  const [input, setInput] = useState('')
  const [copied, setCopied] = useState(false)

  const strippedText = useMemo(() => stripMarkdown(input), [input])

  const copyToClipboard = useCallback(async () => {
    if (!strippedText) return
    await navigator.clipboard.writeText(strippedText)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }, [strippedText])

  const clearAll = useCallback(() => {
    setInput('')
  }, [])

  const pasteFromClipboard = useCallback(async () => {
    try {
      const text = await navigator.clipboard.readText()
      setInput(text)
    } catch {
      // Clipboard access denied
    }
  }, [])

  const downloadText = useCallback(() => {
    if (!strippedText) return
    const blob = new Blob([strippedText], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'stripped-text.txt'
    a.click()
    URL.revokeObjectURL(url)
  }, [strippedText])

  const charDiff = input.length - strippedText.length
  const percentReduced = input.length > 0
    ? Math.round((charDiff / input.length) * 100)
    : 0
  const inputWords = input.trim() ? input.trim().split(/\s+/).length : 0
  const outputWords = strippedText.trim() ? strippedText.trim().split(/\s+/).length : 0

  return (
    <main className="min-h-screen text-white">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <Link href="/tools" className="text-forge-cyan hover:underline text-sm">
              &larr; Back to Tools
            </Link>
            <ShareButton title="Markdown Stripper - Substratia" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            Markdown <span className="text-forge-cyan">Stripper</span>
          </h1>
          <p className="text-gray-400">
            Paste markdown text, get clean plain text instantly. Removes all formatting.
          </p>
        </div>

        {/* Main Grid */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Input */}
          <div className="bg-white/5 border border-white/10 rounded-xl p-4">
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-sm font-medium text-gray-400">Markdown Input</h3>
              <div className="flex gap-2">
                <button
                  onClick={pasteFromClipboard}
                  className="px-3 py-1 text-xs bg-white/10 hover:bg-white/20 rounded-lg transition-all"
                >
                  Paste
                </button>
                <button
                  onClick={clearAll}
                  className="px-3 py-1 text-xs bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-lg transition-all"
                >
                  Clear
                </button>
              </div>
            </div>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Paste your markdown here...

# Example Heading
This is **bold** and *italic* text.
- List item 1
- List item 2

[Link text](https://example.com)

`inline code`"
              className="w-full h-[400px] px-4 py-3 bg-black/30 border border-white/10 rounded-lg focus:outline-none focus:border-forge-cyan text-white font-mono text-sm resize-none"
            />
            <div className="mt-2 text-xs text-gray-500">
              {input.length.toLocaleString()} characters
            </div>
          </div>

          {/* Output */}
          <div className="bg-white/5 border border-white/10 rounded-xl p-4">
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-sm font-medium text-gray-400">Plain Text Output</h3>
              <div className="flex gap-2">
                <button
                  onClick={copyToClipboard}
                  disabled={!strippedText}
                  className={`px-3 py-1 text-xs rounded-lg transition-all ${
                    copied
                      ? 'bg-green-500 text-white'
                      : 'bg-forge-cyan text-forge-dark hover:bg-forge-cyan/80 disabled:opacity-50 disabled:cursor-not-allowed'
                  }`}
                >
                  {copied ? 'Copied!' : 'Copy'}
                </button>
                <button
                  onClick={downloadText}
                  disabled={!strippedText}
                  className="px-3 py-1 text-xs bg-white/10 hover:bg-white/20 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Download
                </button>
              </div>
            </div>
            <div className="w-full h-[400px] px-4 py-3 bg-black/30 border border-white/10 rounded-lg overflow-auto">
              {strippedText ? (
                <pre className="text-white text-sm whitespace-pre-wrap break-words font-sans">
                  {strippedText}
                </pre>
              ) : (
                <p className="text-gray-500 italic text-sm">
                  Plain text will appear here...
                </p>
              )}
            </div>
            <div className="mt-2 text-xs text-gray-500">
              {strippedText.length.toLocaleString()} characters
              {charDiff > 0 && (
                <span className="text-forge-cyan ml-2">
                  ({charDiff.toLocaleString()} chars removed, {percentReduced}% reduction)
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-6 bg-white/5 border border-white/10 rounded-xl p-4">
          <div className="grid grid-cols-3 md:grid-cols-6 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-white">{input.length.toLocaleString()}</div>
              <div className="text-xs text-gray-500">Input Chars</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-forge-cyan">{strippedText.length.toLocaleString()}</div>
              <div className="text-xs text-gray-500">Output Chars</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-forge-purple">{charDiff.toLocaleString()}</div>
              <div className="text-xs text-gray-500">Removed</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-green-400">{percentReduced}%</div>
              <div className="text-xs text-gray-500">Reduction</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-white">{inputWords.toLocaleString()}</div>
              <div className="text-xs text-gray-500">Input Words</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-forge-cyan">{outputWords.toLocaleString()}</div>
              <div className="text-xs text-gray-500">Output Words</div>
            </div>
          </div>
        </div>

        {/* What Gets Stripped */}
        <div className="mt-6 bg-gradient-to-r from-forge-purple/20 to-forge-cyan/20 rounded-xl p-4">
          <h3 className="font-medium mb-3">What Gets Stripped</h3>
          <div className="grid md:grid-cols-3 gap-4 text-sm text-gray-400">
            <ul className="space-y-1">
              <li>- Headers (#, ##, ###)</li>
              <li>- Bold (**text**)</li>
              <li>- Italic (*text*)</li>
              <li>- Strikethrough (~~text~~)</li>
            </ul>
            <ul className="space-y-1">
              <li>- Links [text](url)</li>
              <li>- Images ![alt](url)</li>
              <li>- Code blocks (```)</li>
              <li>- Inline code (`code`)</li>
            </ul>
            <ul className="space-y-1">
              <li>- Lists (-, *, 1.)</li>
              <li>- Blockquotes (&gt;)</li>
              <li>- Horizontal rules (---)</li>
              <li>- HTML tags</li>
            </ul>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <p className="text-gray-400 mb-4">
            Need to preview markdown instead?
          </p>
          <div className="flex justify-center gap-4 flex-wrap">
            <Link
              href="/tools/markdown-preview"
              className="inline-block px-6 py-3 bg-forge-purple hover:bg-forge-purple/80 rounded-xl font-semibold transition-all"
            >
              Try Markdown Preview
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
