'use client'

import { useState, useCallback, useMemo, useRef } from 'react'
import Link from 'next/link'
import ShareButton from '@/components/ShareButton'
import RelatedTools from '@/components/RelatedTools'
import ReactMarkdown from 'react-markdown'
import rehypeSanitize from 'rehype-sanitize'
import remarkGfm from 'remark-gfm'

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
  const previewRef = useRef<HTMLDivElement>(null)

  // Get HTML from the rendered preview for copy/export
  const getRenderedHtml = useCallback(() => {
    if (previewRef.current) {
      return previewRef.current.innerHTML
    }
    return ''
  }, [])

  const copyRaw = useCallback(async () => {
    await navigator.clipboard.writeText(markdown)
    setCopiedRaw(true)
    setTimeout(() => setCopiedRaw(false), 2000)
  }, [markdown])

  const copyHtml = useCallback(async () => {
    const html = getRenderedHtml()
    await navigator.clipboard.writeText(html)
    setCopiedHtml(true)
    setTimeout(() => setCopiedHtml(false), 2000)
  }, [getRenderedHtml])

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
    const html = getRenderedHtml()
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
    table { border-collapse: collapse; width: 100%; margin: 1em 0; }
    th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
    th { background: #f5f5f5; }
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
  }, [getRenderedHtml])

  // Export as PDF (via print dialog)
  const exportPdf = useCallback(() => {
    const html = getRenderedHtml()
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
      table { border-collapse: collapse; width: 100%; margin: 1em 0; }
      th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
      th { background: #f5f5f5; }
    }
  </style>
</head>
<body>
${html}
<script>window.onload = function() { window.print(); window.close(); }</script>
</body>
</html>`)
    printWindow.document.close()
  }, [getRenderedHtml])

  // Calculate stats
  const stats = useMemo(() => ({
    characters: markdown.length,
    words: markdown.split(/\s+/).filter(Boolean).length,
    lines: markdown.split('\n').length,
  }), [markdown])

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
                ref={previewRef}
                className="w-full h-[500px] px-4 py-3 bg-black/30 border border-white/10 rounded-lg overflow-auto markdown-preview"
              >
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  rehypePlugins={[rehypeSanitize]}
                  components={{
                    // Custom link component to open in new tab
                    a: ({ href, children }) => (
                      <a
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="markdown-link"
                      >
                        {children}
                      </a>
                    ),
                    // Custom code block component
                    code: ({ className, children, ...props }) => {
                      const isInline = !className
                      if (isInline) {
                        return <code className="inline-code" {...props}>{children}</code>
                      }
                      return (
                        <code className={className} {...props}>
                          {children}
                        </code>
                      )
                    },
                    // Custom pre component for code blocks
                    pre: ({ children }) => (
                      <pre className="code-block">{children}</pre>
                    ),
                    // Custom checkbox for task lists
                    input: ({ type, checked, ...props }) => {
                      if (type === 'checkbox') {
                        return (
                          <input
                            type="checkbox"
                            checked={checked}
                            disabled
                            className="task-checkbox"
                            {...props}
                          />
                        )
                      }
                      return <input type={type} {...props} />
                    },
                  }}
                >
                  {markdown}
                </ReactMarkdown>
              </div>
            </div>
          )}
        </div>

        {/* Stats */}
        <div className="mt-6 bg-white/5 border border-white/10 rounded-xl p-4">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-white">{stats.characters.toLocaleString()}</div>
              <div className="text-xs text-gray-500">Characters</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-forge-cyan">{stats.words.toLocaleString()}</div>
              <div className="text-xs text-gray-500">Words</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-forge-purple">{stats.lines}</div>
              <div className="text-xs text-gray-500">Lines</div>
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

        {/* Related Tools */}
        <RelatedTools currentPath="/tools/markdown-preview" />

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
          background: none;
          padding: 0;
        }
        .markdown-preview .task-checkbox {
          width: 1em;
          height: 1em;
          margin-right: 0.5em;
          accent-color: #00d9ff;
        }
        .markdown-preview img {
          max-width: 100%;
          border-radius: 8px;
          margin: 1em 0;
        }
        .markdown-preview table {
          border-collapse: collapse;
          width: 100%;
          margin: 1em 0;
        }
        .markdown-preview th, .markdown-preview td {
          border: 1px solid rgba(255,255,255,0.2);
          padding: 8px 12px;
          text-align: left;
        }
        .markdown-preview th {
          background: rgba(255,255,255,0.1);
          font-weight: bold;
        }
        .markdown-preview tr:nth-child(even) {
          background: rgba(255,255,255,0.05);
        }
      `}</style>
    </main>
  )
}
