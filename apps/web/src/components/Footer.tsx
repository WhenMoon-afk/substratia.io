'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

export default function Footer() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return

    setStatus('loading')

    // Open Substack subscription in new tab with email pre-filled
    const substackUrl = `https://skyceres.substack.com/subscribe?email=${encodeURIComponent(email)}`
    window.open(substackUrl, '_blank', 'noopener,noreferrer')

    setStatus('success')
    setEmail('')
    setTimeout(() => setStatus('idle'), 3000)
  }

  return (
    <footer className="relative z-10 border-t border-white/10 py-12 bg-[#0a0a14]">
      <div className="container mx-auto px-4">
        {/* Newsletter Section */}
        <div className="mb-10 pb-10 border-b border-white/5">
          <div className="max-w-xl mx-auto text-center">
            <h3 className="text-lg font-semibold mb-2">
              Stay updated on <span className="text-forge-cyan">AI memory</span> research
            </h3>
            <p className="text-sm text-gray-400 mb-4">
              Get notified about new tools, research papers, and Claude Code tips.
            </p>
            <form onSubmit={handleSubscribe} className="flex gap-2 max-w-md mx-auto">
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
                className="px-5 py-2.5 bg-gradient-to-r from-forge-purple to-forge-cyan text-white font-medium rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 text-sm whitespace-nowrap"
              >
                {status === 'loading' ? 'Opening...' : 'Subscribe'}
              </button>
            </form>
            {status === 'success' && (
              <p className="text-green-400 text-xs mt-2">Complete signup in Substack tab!</p>
            )}
            {status === 'error' && (
              <p className="text-red-400 text-xs mt-2">Something went wrong. Try again.</p>
            )}
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-3">
            <Image
              src="/brand/logo-icon.png"
              alt="Substratia"
              width={32}
              height={32}
              className="rounded-lg"
            />
            <span className="font-semibold">Substratia</span>
            <span className="text-gray-500 text-sm hidden sm:inline">Open Source Developer Tools</span>
          </div>

          <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-400">
            <Link href="/templates" className="hover:text-white transition-all">Memory</Link>
            <Link href="/tools" className="hover:text-white transition-all">Tools</Link>
            <Link href="/reviews" className="hover:text-white transition-all">Reviews</Link>
            <Link href="/blog" className="hover:text-white transition-all">Blog</Link>
            <Link href="/docs" className="hover:text-white transition-all">Docs</Link>
            <a href="https://github.com/WhenMoon-afk" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-all">GitHub</a>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
          <div className="text-center md:text-left">
            <p className="font-mono">Intelligence is substrate-agnostic.</p>
            <p className="mt-1">Built by practitioners.</p>
          </div>
          <div className="flex gap-4 text-xs text-gray-500">
            <Link href="/privacy" className="hover:text-gray-300 transition-all">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-gray-300 transition-all">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
