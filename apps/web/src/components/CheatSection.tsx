'use client'

import { useState } from 'react'

export default function CheatSection({
  id,
  title,
  children,
  onCopy,
  copied,
  content,
}: {
  id: string
  title: string
  children: React.ReactNode
  onCopy: (id: string, content: string) => void
  copied: boolean
  content: string
}) {
  const [shared, setShared] = useState(false)

  const shareSection = () => {
    const url = `${window.location.origin}${window.location.pathname}#${id}`
    navigator.clipboard.writeText(url)
    setShared(true)
    setTimeout(() => setShared(false), 2000)
  }

  return (
    <div id={id} className="glass rounded-2xl p-6 print:break-inside-avoid scroll-mt-24">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold text-forge-cyan">{title}</h3>
        <div className="flex gap-2 print:hidden">
          <button
            onClick={shareSection}
            className={`text-xs px-3 py-1 rounded transition-all ${
              shared
                ? 'bg-green-500 text-white'
                : 'bg-forge-purple/20 hover:bg-forge-purple/30 text-forge-purple'
            }`}
          >
            {shared ? 'Link Copied!' : 'Share'}
          </button>
          <button
            onClick={() => onCopy(id, content)}
            className={`text-xs px-3 py-1 rounded transition-all ${
              copied ? 'bg-green-500 text-white' : 'bg-white/10 hover:bg-white/20'
            }`}
          >
            {copied ? 'Copied!' : 'Copy'}
          </button>
        </div>
      </div>
      {children}
    </div>
  )
}
