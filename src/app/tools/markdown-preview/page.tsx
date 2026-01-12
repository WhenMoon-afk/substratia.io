'use client'

import { useState, useCallback, useMemo } from 'react'
import Link from 'next/link'
import ShareButton from '@/components/ShareButton'

// Simple markdown to HTML converter (no dependencies)
function markdownToHtml(text: string): string {
  if (!text) return ''

  let html = text

  // Escape HTML entities first (but preserve our markdown)
  html = html
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')

  // Code blocks (``` ... ```) - must be before other processing
  html = html.replace(/```(\w*)\n([\s\S]*?)```/g, (_, lang, code) => {
    return `<pre class="code-block"><code class="language-${lang || 'text'}">${code.trim()}</code></pre>`
  })

  // Inline code (`code`)
  html = html.replace(/`([^`]+)`/g, '<code class="inline-code">$1</code>')

  // Headers
  html = html.replace(/^######\s+(.+)$/gm, '<h6>$1</h6>')
  html = html.replace(/^#####\s+(.+)$/gm, '<h5>$1</h5>')
  html = html.replace(/^####\s+(.+)$/gm, '<h4>$1</h4>')
  html = html.replace(/^###\s+(.+)$/gm, '<h3>$1</h3>')
  html = html.replace(/^##\s+(.+)$/gm, '<h2>$1</h2>')
  html = html.replace(/^#\s+(.+)$/gm, '<h1>$1</h1>')

  // Horizontal rules
  html = html.replace(/^[-*_]{3,}\s*$/gm, '<hr />')

  // Images ![alt](url)
  html = html.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1" class="markdown-img" />')

  // Links [text](url)
  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer" class="markdown-link">$1</a>')

  // Bold and italic combined (***text*** or ___text___)
  html = html.replace(/(\*\*\*|___)(.*?)\1/g, '<strong><em>$2</em></strong>')

  // Bold (**text** or __text__)
  html = html.replace(/(\*\*|__)(.*?)\1/g, '<strong>$2</strong>')

  // Italic (*text* or _text_)
  html = html.replace(/(\*|_)(.*?)\1/g, '<em>$2</em>')

  // Strikethrough ~~text~~
  html = html.replace(/~~(.*?)~~/g, '<del>$1</del>')

  // Blockquotes (> text) - handle multiple lines
  html = html.replace(/^&gt;\s*(.+)$/gm, '<blockquote>$1</blockquote>')
  // Merge consecutive blockquotes
  html = html.replace(/<\/blockquote>\n<blockquote>/g, '\n')

  // Task lists [ ] and [x]
  html = html.replace(/^(\s*)[-*+]\s+\[x\]\s+(.+)$/gim, '$1<div class="task-item"><input type="checkbox" checked disabled /> $2</div>')
  html = html.replace(/^(\s*)[-*+]\s+\[\s\]\s+(.+)$/gim, '$1<div class="task-item"><input type="checkbox" disabled /> $2</div>')

  // Unordered lists (-, *, +)
  html = html.replace(/^[-*+]\s+(.+)$/gm, '<li>$1</li>')

  // Ordered lists (1., 2., etc)
  html = html.replace(/^\d+\.\s+(.+)$/gm, '<li class="ordered">$1</li>')

  // Wrap consecutive <li> in <ul> or <ol>
  html = html.replace(/(<li>[\s\S]*?<\/li>)+/g, (match) => {
    if (match.includes('class="ordered"')) {
      return `<ol>${match.replace(/ class="ordered"/g, '')}</ol>`
    }
    return `<ul>${match}</ul>`
  })

  // Paragraphs - wrap remaining lines that aren't already wrapped
  const lines = html.split('\n')
  const processedLines = lines.map(line => {
    const trimmed = line.trim()
    if (!trimmed) return ''
    if (trimmed.startsWith('<')) return line // Already HTML
    return `<p>${line}</p>`
  })
  html = processedLines.join('\n')

  // Clean up empty paragraphs
  html = html.replace(/<p>\s*<\/p>/g, '')

  // Fix double-wrapped elements
  html = html.replace(/<p>(<h[1-6]>)/g, '$1')
  html = html.replace(/(<\/h[1-6]>)<\/p>/g, '$1')
  html = html.replace(/<p>(<ul>)/g, '$1')
  html = html.replace(/(<\/ul>)<\/p>/g, '$1')
  html = html.replace(/<p>(<ol>)/g, '$1')
  html = html.replace(/(<\/ol>)<\/p>/g, '$1')
  html = html.replace(/<p>(<blockquote>)/g, '$1')
  html = html.replace(/(<\/blockquote>)<\/p>/g, '$1')
  html = html.replace(/<p>(<pre)/g, '$1')
  html = html.replace(/(<\/pre>)<\/p>/g, '$1')
  html = html.replace(/<p>(<hr)/g, '$1')
  html = html.replace(/(\/&gt;)<\/p>/g, '$1')
  html = html.replace(/<p>(<div class="task-item">)/g, '$1')
  html = html.replace(/(<\/div>)<\/p>/g, '$1')

  return html
}

const defaultMarkdown = `# Welcome to Markdown Preview

This is a **live preview** tool. Edit on the left, see the result on the right.

## Features

- **Bold** and *italic* text
- ~~Strikethrough~~ text
- [Links](https://substratia.io)
- Lists (like this one!)

### Code Support

Inline \`code\` and code blocks:

\`\`\`javascript
function hello() {
  console.log("Hello, world!");
}
\`\`\`

> Blockquotes look like this

---

### Task Lists

- [x] Learn markdown
- [x] Try this tool
- [ ] Build something cool

Enjoy writing! ✨`

export default function MarkdownPreviewPage() {
  const [markdown, setMarkdown] = useState(defaultMarkdown)
  const [copiedRaw, setCopiedRaw] = useState(false)
  const [copiedHtml, setCopiedHtml] = useState(false)
  const [viewMode, setViewMode] = useState<'split' | 'edit' | 'preview'>('split')

  const html = useMemo(() => markdownToHtml(markdown), [markdown])

  const copyRaw = useCallback(async () => {
    await navigator.clipboard.writeText(markdown)
    setCopiedRaw(true)
    setTimeout(() => setCopiedRaw(false), 2000)
  }, [markdown])

  const copyHtml = useCallback(async () => {
    await navigator.clipboard.writeText(html)
    setCopiedHtml(true)
    setTimeout(() => setCopiedHtml(false), 2000)
  }, [html])

  const clearAll = useCallback(() => {
    setMarkdown('')
  }, [])

  const loadExample = useCallback(() => {
    setMarkdown(defaultMarkdown)
  }, [])

  // Download as .md file
  const downloadMarkdown = useCallback(() => {
    const blob = new Blob([markdown], { type: 'text/markdown' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'document.md'
    a.click()
    URL.revokeObjectURL(url)
  }, [markdown])

  // Download as .html file
  const downloadHtml = useCallback(() => {
    const fullHtml = `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Markdown Document</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 800px; margin: 40px auto; padding: 20px; line-height: 1.7; color: #333; }
    h1, h2 { border-bottom: 1px solid #eee; padding-bottom: 0.3em; }
    code { background: #f4f4f4; padding: 0.2em 0.4em; border-radius: 4px; font-family: monospace; }
    pre { background: #f4f4f4; padding: 1em; border-radius: 8px; overflow-x: auto; }
    pre code { background: none; padding: 0; }
    blockquote { border-left: 4px solid #ddd; padding-left: 1em; margin: 1em 0; color: #666; }
    a { color: #0066cc; }
    hr { border: none; border-top: 1px solid #eee; margin: 2em 0; }
    ul, ol { padding-left: 2em; }
  </style>
</head>
<body>
${html}
</body>
</html>`
    const blob = new Blob([fullHtml], { type: 'text/html' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'document.html'
    a.click()
    URL.revokeObjectURL(url)
  }, [html])

  // Export as PDF (via print dialog)
  const exportPdf = useCallback(() => {
    const printWindow = window.open('', '_blank')
    if (!printWindow) {
      alert('Please allow popups to export PDF')
      return
    }
    printWindow.document.write(`<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Markdown Document</title>
  <style>
    @media print {
      body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 100%; margin: 0; padding: 20px; line-height: 1.7; color: #000; }
      h1, h2 { border-bottom: 1px solid #ccc; padding-bottom: 0.3em; }
      code { background: #eee; padding: 0.2em 0.4em; border-radius: 4px; font-family: monospace; }
      pre { background: #f5f5f5; padding: 1em; border-radius: 8px; overflow-x: auto; border: 1px solid #ddd; }
      pre code { background: none; padding: 0; }
      blockquote { border-left: 4px solid #999; padding-left: 1em; margin: 1em 0; color: #555; }
      a { color: #0066cc; text-decoration: underline; }
      hr { border: none; border-top: 1px solid #ccc; margin: 2em 0; }
      ul, ol { padding-left: 2em; }
    }
  </style>
</head>
<body>
${html}
<script>window.onload = function() { window.print(); window.close(); }</script>
</body>
</html>`)
    printWindow.document.close()
  }, [html])

  return (
    <main className="min-h-screen text-white">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <Link href="/tools" className="text-forge-cyan hover:underline text-sm">
              &larr; Back to Tools
            </Link>
            <ShareButton title="Markdown Preview - Substratia" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            Markdown <span className="text-forge-cyan">Preview</span>
          </h1>
          <p className="text-gray-400">
            Live markdown editor with instant preview. Edit on the left, see rendered output on the right.
          </p>
        </div>

        {/* Controls */}
        <div className="flex flex-wrap gap-2 mb-4 items-center justify-between">
          <div className="flex gap-2">
            {/* View Mode Toggle */}
            <div className="bg-white/5 rounded-lg p-1 flex">
              <button
                onClick={() => setViewMode('edit')}
                className={`px-3 py-1 text-xs rounded transition-all ${
                  viewMode === 'edit' ? 'bg-forge-cyan text-forge-dark' : 'text-gray-400 hover:text-white'
                }`}
              >
                Edit
              </button>
              <button
                onClick={() => setViewMode('split')}
                className={`px-3 py-1 text-xs rounded transition-all ${
                  viewMode === 'split' ? 'bg-forge-cyan text-forge-dark' : 'text-gray-400 hover:text-white'
                }`}
              >
                Split
              </button>
              <button
                onClick={() => setViewMode('preview')}
                className={`px-3 py-1 text-xs rounded transition-all ${
                  viewMode === 'preview' ? 'bg-forge-cyan text-forge-dark' : 'text-gray-400 hover:text-white'
                }`}
              >
                Preview
              </button>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              onClick={downloadMarkdown}
              disabled={!markdown}
              className="px-3 py-1 text-xs bg-white/10 hover:bg-white/20 rounded-lg transition-all disabled:opacity-50"
            >
              Download .md
            </button>
            <button
              onClick={downloadHtml}
              disabled={!markdown}
              className="px-3 py-1 text-xs bg-white/10 hover:bg-white/20 rounded-lg transition-all disabled:opacity-50"
            >
              Download .html
            </button>
            <button
              onClick={exportPdf}
              disabled={!markdown}
              className="px-3 py-1 text-xs bg-forge-purple/30 hover:bg-forge-purple/50 text-forge-purple rounded-lg transition-all disabled:opacity-50"
            >
              Export PDF
            </button>
            <button
              onClick={loadExample}
              className="px-3 py-1 text-xs bg-white/10 hover:bg-white/20 rounded-lg transition-all"
            >
              Load Example
            </button>
            <button
              onClick={clearAll}
              className="px-3 py-1 text-xs bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-lg transition-all"
            >
              Clear
            </button>
          </div>
        </div>

        {/* Editor and Preview */}
        <div className={`grid gap-6 ${viewMode === 'split' ? 'lg:grid-cols-2' : 'grid-cols-1'}`}>
          {/* Edit Panel */}
          {(viewMode === 'edit' || viewMode === 'split') && (
            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-sm font-medium text-gray-400">Edit Mode</h3>
                <button
                  onClick={copyRaw}
                  className={`px-3 py-1 text-xs rounded-lg transition-all ${
                    copiedRaw
                      ? 'bg-green-500 text-white'
                      : 'bg-white/10 hover:bg-white/20'
                  }`}
                >
                  {copiedRaw ? 'Copied!' : 'Copy Raw'}
                </button>
              </div>
              <textarea
                value={markdown}
                onChange={(e) => setMarkdown(e.target.value)}
                placeholder="Type or paste your markdown here..."
                className="w-full h-[500px] px-4 py-3 bg-black/30 border border-white/10 rounded-lg focus:outline-none focus:border-forge-cyan text-white font-mono text-sm resize-none"
              />
            </div>
          )}

          {/* Preview Panel */}
          {(viewMode === 'preview' || viewMode === 'split') && (
            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-sm font-medium text-gray-400">Reading Mode</h3>
                <button
                  onClick={copyHtml}
                  className={`px-3 py-1 text-xs rounded-lg transition-all ${
                    copiedHtml
                      ? 'bg-green-500 text-white'
                      : 'bg-white/10 hover:bg-white/20'
                  }`}
                >
                  {copiedHtml ? 'Copied!' : 'Copy HTML'}
                </button>
              </div>
              <div
                className="w-full h-[500px] px-4 py-3 bg-black/30 border border-white/10 rounded-lg overflow-auto markdown-preview"
                dangerouslySetInnerHTML={{ __html: html }}
              />
            </div>
          )}
        </div>

        {/* Stats */}
        <div className="mt-6 bg-white/5 border border-white/10 rounded-xl p-4">
          <div className="grid grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-white">{markdown.length.toLocaleString()}</div>
              <div className="text-xs text-gray-500">Characters</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-forge-cyan">{markdown.split(/\s+/).filter(Boolean).length.toLocaleString()}</div>
              <div className="text-xs text-gray-500">Words</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-forge-purple">{markdown.split('\n').length}</div>
              <div className="text-xs text-gray-500">Lines</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-green-400">{html.length.toLocaleString()}</div>
              <div className="text-xs text-gray-500">HTML Chars</div>
            </div>
          </div>
        </div>

        {/* Supported Syntax */}
        <div className="mt-6 bg-gradient-to-r from-forge-purple/20 to-forge-cyan/20 rounded-xl p-4">
          <h3 className="font-medium mb-3">Supported Syntax</h3>
          <div className="grid md:grid-cols-3 gap-4 text-sm text-gray-400">
            <ul className="space-y-1">
              <li>- Headers (# to ######)</li>
              <li>- **Bold** and *italic*</li>
              <li>- ~~Strikethrough~~</li>
              <li>- [Links](url)</li>
            </ul>
            <ul className="space-y-1">
              <li>- ![Images](url)</li>
              <li>- `Inline code`</li>
              <li>- ```Code blocks```</li>
              <li>- &gt; Blockquotes</li>
            </ul>
            <ul className="space-y-1">
              <li>- Unordered lists (-, *, +)</li>
              <li>- Ordered lists (1., 2.)</li>
              <li>- [ ] Task lists</li>
              <li>- --- Horizontal rules</li>
            </ul>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <p className="text-gray-400 mb-4">
            Need to strip markdown formatting instead?
          </p>
          <div className="flex justify-center gap-4 flex-wrap">
            <Link
              href="/tools/markdown-stripper"
              className="inline-block px-6 py-3 bg-forge-purple hover:bg-forge-purple/80 rounded-xl font-semibold transition-all"
            >
              Try Markdown Stripper
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

      {/* Markdown Preview Styles */}
      <style jsx global>{`
        .markdown-preview {
          color: #e5e7eb;
          line-height: 1.7;
        }
        .markdown-preview h1 {
          font-size: 2em;
          font-weight: bold;
          margin: 0.67em 0;
          border-bottom: 1px solid rgba(255,255,255,0.1);
          padding-bottom: 0.3em;
        }
        .markdown-preview h2 {
          font-size: 1.5em;
          font-weight: bold;
          margin: 0.83em 0;
          border-bottom: 1px solid rgba(255,255,255,0.1);
          padding-bottom: 0.3em;
        }
        .markdown-preview h3 {
          font-size: 1.25em;
          font-weight: bold;
          margin: 1em 0;
        }
        .markdown-preview h4, .markdown-preview h5, .markdown-preview h6 {
          font-size: 1em;
          font-weight: bold;
          margin: 1em 0;
        }
        .markdown-preview p {
          margin: 1em 0;
        }
        .markdown-preview strong {
          font-weight: bold;
          color: #fff;
        }
        .markdown-preview em {
          font-style: italic;
        }
        .markdown-preview del {
          text-decoration: line-through;
          opacity: 0.7;
        }
        .markdown-preview a.markdown-link {
          color: #00d9ff;
          text-decoration: none;
        }
        .markdown-preview a.markdown-link:hover {
          text-decoration: underline;
        }
        .markdown-preview ul, .markdown-preview ol {
          margin: 1em 0;
          padding-left: 2em;
        }
        .markdown-preview ul {
          list-style-type: disc;
        }
        .markdown-preview ol {
          list-style-type: decimal;
        }
        .markdown-preview li {
          margin: 0.25em 0;
        }
        .markdown-preview blockquote {
          border-left: 4px solid #7c3aed;
          padding-left: 1em;
          margin: 1em 0;
          color: #9ca3af;
          font-style: italic;
        }
        .markdown-preview hr {
          border: none;
          border-top: 1px solid rgba(255,255,255,0.2);
          margin: 2em 0;
        }
        .markdown-preview code.inline-code {
          background: rgba(255,255,255,0.1);
          padding: 0.2em 0.4em;
          border-radius: 4px;
          font-family: monospace;
          font-size: 0.9em;
          color: #f472b6;
        }
        .markdown-preview pre.code-block {
          background: rgba(0,0,0,0.5);
          padding: 1em;
          border-radius: 8px;
          overflow-x: auto;
          margin: 1em 0;
        }
        .markdown-preview pre.code-block code {
          font-family: monospace;
          font-size: 0.9em;
          color: #e5e7eb;
        }
        .markdown-preview .task-item {
          display: flex;
          align-items: center;
          gap: 0.5em;
          margin: 0.25em 0;
        }
        .markdown-preview .task-item input {
          width: 1em;
          height: 1em;
          accent-color: #00d9ff;
        }
        .markdown-preview img.markdown-img {
          max-width: 100%;
          border-radius: 8px;
          margin: 1em 0;
        }
      `}</style>
    </main>
  )
}
