'use client'

import { useState } from 'react'
import { newsletterUrl } from '@/lib/site-config'

interface NewsletterCaptureProps {
  source?: string
  heading?: string
  description?: string
  compact?: boolean
}

export default function NewsletterCapture({
  source = 'tool-page',
  heading = 'Get Claude Code tips weekly',
  description = 'Join developers getting AI coding insights, tool updates, and practical tips.',
  compact = false,
}: NewsletterCaptureProps) {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return

    setStatus('loading')

    // Open Substack subscription in new tab with email pre-filled
    window.open(newsletterUrl(email, source), '_blank', 'noopener,noreferrer')

    setStatus('success')
    setEmail('')
    setTimeout(() => setStatus('idle'), 3000)
  }

  if (status === 'success') {
    return (
      <div className={`${compact ? 'p-4' : 'p-6'} bg-green-500/10 border border-green-500/20 rounded-xl text-center`}>
        <p className="text-green-400 font-medium">Almost there!</p>
        <p className="text-sm text-gray-400 mt-1">Complete signup in the Substack tab.</p>
      </div>
    )
  }

  if (compact) {
    return (
      <div className="p-4 bg-gradient-to-r from-forge-purple/10 to-forge-cyan/10 border border-white/10 rounded-xl">
        <p className="text-sm font-medium mb-3">{heading}</p>
        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            required
            className="flex-1 px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-gray-500 focus:outline-none focus:border-forge-cyan/50 transition-colors text-sm"
          />
          <button
            type="submit"
            disabled={status === 'loading'}
            className="px-4 py-2 bg-forge-cyan text-forge-dark font-medium rounded-xl hover:opacity-90 transition-opacity disabled:opacity-50 text-sm whitespace-nowrap"
          >
            {status === 'loading' ? '...' : 'Subscribe'}
          </button>
        </form>
        {status === 'error' && (
          <p className="text-red-400 text-xs mt-2">Something went wrong. Try again.</p>
        )}
      </div>
    )
  }

  return (
    <div className="p-6 bg-gradient-to-r from-forge-purple/10 to-forge-cyan/10 border border-white/10 rounded-xl">
      <h3 className="text-lg font-semibold mb-1">{heading}</h3>
      <p className="text-sm text-gray-400 mb-4">{description}</p>
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your@email.com"
          required
          className="flex-1 px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-gray-500 focus:outline-none focus:border-forge-cyan/50 transition-colors text-sm"
        />
        <button
          type="submit"
          disabled={status === 'loading'}
          className="px-5 py-2.5 bg-gradient-to-r from-forge-purple to-forge-cyan text-white font-medium rounded-xl hover:opacity-90 transition-opacity disabled:opacity-50 text-sm whitespace-nowrap"
        >
          {status === 'loading' ? 'Subscribing...' : 'Subscribe'}
        </button>
      </form>
      {status === 'error' && (
        <p className="text-red-400 text-xs mt-2">Something went wrong. Try again.</p>
      )}
    </div>
  )
}
