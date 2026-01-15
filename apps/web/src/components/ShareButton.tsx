'use client'

import { useState, useCallback } from 'react'

interface ShareButtonProps {
  title?: string
  url?: string
  className?: string
}

export default function ShareButton({ title, url, className = '' }: ShareButtonProps) {
  const [shared, setShared] = useState(false)

  const handleShare = useCallback(async () => {
    const shareUrl = url || (typeof window !== 'undefined' ? window.location.href : '')
    const shareText = title ? `${title}\n${shareUrl}` : shareUrl

    await navigator.clipboard.writeText(shareText)
    setShared(true)
    setTimeout(() => setShared(false), 2000)
  }, [title, url])

  return (
    <button
      onClick={handleShare}
      aria-label={shared ? 'Link copied to clipboard' : 'Copy page link to clipboard'}
      className={`px-3 py-1 text-xs rounded-lg transition-all ${
        shared
          ? 'bg-green-500 text-white'
          : 'bg-forge-cyan/20 hover:bg-forge-cyan/30 text-forge-cyan'
      } ${className}`}
    >
      {shared ? 'Copied!' : 'Share'}
    </button>
  )
}
