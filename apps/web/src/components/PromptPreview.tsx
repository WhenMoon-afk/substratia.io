'use client'

import CopyButton from '@/components/CopyButton'
import { videoPlatforms, type VideoPlatform } from '@/data/videoPromptPresets'

interface PromptPreviewProps {
  generatedPrompt: string
  platform: VideoPlatform
  hasKeyframes: boolean
  onDownloadPrompt: () => void
  onSaveToFavorites: () => void
  onShareURL: () => void
  onExportJSON: () => void
  onDownloadJSON: () => void
  saved: boolean
  shared: boolean
  jsonCopied: boolean
}

export default function PromptPreview({
  generatedPrompt,
  platform,
  hasKeyframes,
  onDownloadPrompt,
  onSaveToFavorites,
  onShareURL,
  onExportJSON,
  onDownloadJSON,
  saved,
  shared,
  jsonCopied,
}: PromptPreviewProps) {
  return (
    <div className="bg-white/5 border border-white/10 rounded-xl p-4 mb-6">
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-sm font-medium text-gray-400">Generated Prompt</h3>
        <span className="text-xs text-gray-500">
          {videoPlatforms.find(p => p.id === platform)?.name} format
        </span>
      </div>

      <div className="bg-black/30 rounded-lg p-4 min-h-[120px]">
        {generatedPrompt ? (
          <pre className="text-sm text-gray-200 whitespace-pre-wrap break-words font-mono">
            {generatedPrompt}
          </pre>
        ) : (
          <p className="text-sm text-gray-500 italic">
            Add keyframes to generate your video prompt...
          </p>
        )}
      </div>

      {/* Actions */}
      <div className="flex flex-wrap gap-2 mt-4">
        <CopyButton
          text={generatedPrompt}
          label="Copy"
          successMessage="Video prompt copied!"
          disabled={!generatedPrompt}
        />
        <button
          onClick={onDownloadPrompt}
          disabled={!generatedPrompt}
          className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Download .txt
        </button>
        <button
          onClick={onSaveToFavorites}
          disabled={!hasKeyframes}
          className={`px-4 py-2 rounded-lg font-medium transition-all ${
            saved
              ? 'bg-forge-purple text-white'
              : 'bg-forge-purple/30 hover:bg-forge-purple/50 text-forge-purple disabled:opacity-50 disabled:cursor-not-allowed'
          }`}
        >
          {saved ? 'Saved!' : 'Save to Favorites'}
        </button>
        <button
          onClick={onShareURL}
          disabled={!hasKeyframes}
          className={`px-4 py-2 rounded-lg font-medium transition-all ${
            shared
              ? 'bg-green-500 text-white'
              : 'bg-white/10 hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed'
          }`}
        >
          {shared ? 'Link Copied!' : 'Share URL'}
        </button>
        <button
          onClick={onExportJSON}
          disabled={!hasKeyframes}
          className={`px-4 py-2 rounded-lg font-medium transition-all ${
            jsonCopied
              ? 'bg-green-500 text-white'
              : 'bg-white/10 hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed'
          }`}
        >
          {jsonCopied ? 'JSON Copied!' : 'Export JSON'}
        </button>
        <button
          onClick={onDownloadJSON}
          disabled={!hasKeyframes}
          className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Download .json
        </button>
      </div>
    </div>
  )
}
