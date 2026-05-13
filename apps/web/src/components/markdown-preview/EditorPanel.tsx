'use client'

import CopyButton from '@/components/CopyButton'

interface EditorPanelProps {
  markdown: string
  onChange: (value: string) => void
}

export default function EditorPanel({ markdown, onChange }: EditorPanelProps) {
  return (
    <div className="bg-white/5 border border-white/10 rounded-xl p-4">
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-sm font-medium text-gray-400">Edit Mode</h3>
        <CopyButton
          text={markdown}
          label="Copy Raw"
          successMessage="Raw markdown copied!"
          variant="ghost"
          size="sm"
        />
      </div>
      <textarea
        value={markdown}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Type or paste your markdown here..."
        className="w-full h-80 sm:h-[500px] px-4 py-3 bg-black/30 border border-white/10 rounded-lg focus:outline-hidden focus:border-forge-cyan text-white font-mono text-sm resize-none"
      />
    </div>
  )
}
