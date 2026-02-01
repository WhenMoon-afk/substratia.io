'use client'

import CopyButton from '@/components/CopyButton'
import { platforms, type Platform } from '@/data/imagePromptPresets'

interface PromptPreviewProps {
  platform: Platform
  generatedPrompt: { positive: string; negative: string }
  getFullPrompt: () => string
  hasSubject: boolean
  onDownloadPrompt: () => void
  onShareURL: () => void
  onExportJSON: () => void
  onDownloadJSON: () => void
  shared: boolean
  urlTooLong: boolean
  jsonCopied: boolean
}

export default function PromptPreview({
  platform,
  generatedPrompt,
  getFullPrompt,
  hasSubject,
  onDownloadPrompt,
  onShareURL,
  onExportJSON,
  onDownloadJSON,
  shared,
  urlTooLong,
  jsonCopied,
}: PromptPreviewProps) {
  return (
    <div className="bg-white/5 border border-white/10 rounded-xl p-4">
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-sm font-medium text-gray-400">Generated Prompt</h3>
        <span className="text-xs text-gray-500">
          {platforms.find(p => p.id === platform)?.name}
        </span>
      </div>

      {/* Positive Prompt */}
      <div className="mb-4">
        <div className="text-xs text-forge-cyan mb-1">Positive</div>
        <div className="bg-black/30 rounded-lg p-3 min-h-[120px]">
          {generatedPrompt.positive ? (
            <p className="text-sm text-gray-200 whitespace-pre-wrap break-words">
              {generatedPrompt.positive}
            </p>
          ) : (
            <p className="text-sm text-gray-500 italic">
              Enter a subject to generate your prompt...
            </p>
          )}
        </div>
      </div>

      {/* Negative Prompt */}
      {generatedPrompt.negative && (
        <div className="mb-4">
          <div className="text-xs text-red-400 mb-1">Negative</div>
          <div className="bg-black/30 rounded-lg p-3">
            <p className="text-sm text-gray-400 whitespace-pre-wrap break-words">
              {generatedPrompt.negative}
            </p>
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="flex flex-wrap gap-2">
        <CopyButton
          text={getFullPrompt()}
          label="Copy"
          successMessage="Image prompt copied!"
          disabled={!generatedPrompt.positive}
          className="flex-1 min-w-[80px]"
        />
        <button
          onClick={onDownloadPrompt}
          disabled={!generatedPrompt.positive}
          className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Download .txt
        </button>
        <button
          onClick={onShareURL}
          disabled={!hasSubject}
          className={`px-4 py-2 rounded-lg font-medium transition-all ${
            urlTooLong
              ? 'bg-amber-500 text-white'
              : shared
              ? 'bg-green-500 text-white'
              : 'bg-white/10 hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed'
          }`}
        >
          {urlTooLong ? 'Too large — export JSON instead' : shared ? 'Link Copied!' : 'Share URL'}
        </button>
      </div>
      <div className="flex gap-2 mt-2">
        <button
          onClick={onExportJSON}
          disabled={!hasSubject}
          className={`flex-1 px-4 py-2 rounded-lg font-medium transition-all text-sm ${
            jsonCopied
              ? 'bg-green-500 text-white'
              : 'bg-white/10 hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed'
          }`}
        >
          {jsonCopied ? 'JSON Copied!' : 'Export JSON'}
        </button>
        <button
          onClick={onDownloadJSON}
          disabled={!hasSubject}
          className="flex-1 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg font-medium transition-all text-sm disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Download .json
        </button>
      </div>
    </div>
  )
}
