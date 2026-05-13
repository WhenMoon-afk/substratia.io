'use client'

import { useState, useCallback, useMemo, useRef, useEffect } from 'react'
import Link from 'next/link'
import ShareButton from '@/components/ShareButton'
import NewsletterCapture from '@/components/NewsletterCapture'
import RelatedTools from '@/components/RelatedTools'
import { downloadMarkdown as downloadMdFile, downloadHtml as downloadHtmlFile } from '@/lib/file-utils'
import { defaultMarkdown } from '@/components/markdown-preview/defaultMarkdown'
import { wrapHtmlForDownload, wrapHtmlForPrint } from '@/components/markdown-preview/htmlTemplates'
import Toolbar from '@/components/markdown-preview/Toolbar'
import type { ViewMode } from '@/components/markdown-preview/Toolbar'
import EditorPanel from '@/components/markdown-preview/EditorPanel'
import PreviewPanel from '@/components/markdown-preview/PreviewPanel'
import StatsBar from '@/components/markdown-preview/StatsBar'
import SupportedSyntax from '@/components/markdown-preview/SupportedSyntax'
import MarkdownStyles from '@/components/markdown-preview/MarkdownStyles'

export default function MarkdownPreviewPage() {
  const [markdown, setMarkdown] = useState(defaultMarkdown)
  const [viewMode, setViewMode] = useState<ViewMode>('split')
  const previewRef = useRef<HTMLDivElement>(null)

  // Get HTML from the rendered preview for copy/export
  const getRenderedHtml = useCallback(() => {
    if (previewRef.current) {
      return previewRef.current.innerHTML
    }
    return ''
  }, [])

  const clearAll = useCallback(() => {
    setMarkdown('')
  }, [])

  const loadExample = useCallback(() => {
    setMarkdown(defaultMarkdown)
  }, [])

  // Download as .md file
  const downloadMarkdown = useCallback(() => {
    downloadMdFile(markdown, 'document.md')
  }, [markdown])

  // Download as .html file
  const downloadHtml = useCallback(() => {
    const html = getRenderedHtml()
    downloadHtmlFile(wrapHtmlForDownload(html), 'document.html')
  }, [getRenderedHtml])

  // Export as PDF (via print dialog)
  const exportPdf = useCallback(() => {
    const html = getRenderedHtml()
    const printWindow = window.open('', '_blank')
    if (!printWindow) {
      alert('Please allow popups to export PDF')
      return
    }
    printWindow.document.write(wrapHtmlForPrint(html))
    printWindow.document.close()
  }, [getRenderedHtml])

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        clearAll()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [clearAll])

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

        <Toolbar
          viewMode={viewMode}
          onViewModeChange={setViewMode}
          hasContent={!!markdown}
          onDownloadMarkdown={downloadMarkdown}
          onDownloadHtml={downloadHtml}
          onExportPdf={exportPdf}
          onLoadExample={loadExample}
          onClear={clearAll}
        />

        {/* Editor and Preview */}
        <div className={`grid gap-6 ${viewMode === 'split' ? 'lg:grid-cols-2' : 'grid-cols-1'}`}>
          {(viewMode === 'edit' || viewMode === 'split') && (
            <EditorPanel markdown={markdown} onChange={setMarkdown} />
          )}
          {(viewMode === 'preview' || viewMode === 'split') && (
            <PreviewPanel ref={previewRef} markdown={markdown} />
          )}
        </div>

        <StatsBar characters={stats.characters} words={stats.words} lines={stats.lines} />
        <SupportedSyntax />
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

        {/* Newsletter */}
        <div className="mt-8 max-w-xl mx-auto">
          <NewsletterCapture source="markdown-preview" compact />
        </div>
      </div>

      <MarkdownStyles />
    </main>
  )
}
