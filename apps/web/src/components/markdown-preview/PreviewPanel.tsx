'use client'

import { forwardRef, useState, useCallback } from 'react'
import ReactMarkdown from 'react-markdown'
import rehypeSanitize from 'rehype-sanitize'
import remarkGfm from 'remark-gfm'

interface PreviewPanelProps {
  markdown: string
}

const PreviewPanel = forwardRef<HTMLDivElement, PreviewPanelProps>(
  function PreviewPanel({ markdown }, ref) {
    const [copiedHtml, setCopiedHtml] = useState(false)

    const copyHtml = useCallback(async () => {
      const el = typeof ref === 'function' ? null : ref?.current
      if (el) {
        await navigator.clipboard.writeText(el.innerHTML)
        setCopiedHtml(true)
        setTimeout(() => setCopiedHtml(false), 2000)
      }
    }, [ref])

    return (
      <div className="bg-white/5 border border-white/10 rounded-xl p-4">
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-sm font-medium text-gray-400">Reading Mode</h3>
          <button
            onClick={copyHtml}
            className={`px-4 py-2 text-sm rounded-lg transition-all ${
              copiedHtml
                ? 'bg-green-500 text-white'
                : 'bg-white/10 hover:bg-white/20'
            }`}
          >
            {copiedHtml ? 'Copied!' : 'Copy HTML'}
          </button>
        </div>
        <div
          ref={ref}
          className="w-full h-80 sm:h-[500px] px-4 py-3 bg-black/30 border border-white/10 rounded-lg overflow-auto markdown-preview"
        >
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeSanitize]}
            components={{
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
              pre: ({ children }) => (
                <pre className="code-block">{children}</pre>
              ),
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
    )
  }
)

export default PreviewPanel
