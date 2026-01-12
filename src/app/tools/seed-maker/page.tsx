'use client'

import { useState, useCallback, useRef, useEffect } from 'react'
import Link from 'next/link'
import ShareButton from '@/components/ShareButton'

export default function SeedMakerPage() {
  const [entropyProgress, setEntropyProgress] = useState(0)
  const [result, setResult] = useState('')
  const [length, setLength] = useState(64)
  const [history, setHistory] = useState<string[]>([])
  const [copied, setCopied] = useState(false)
  const [options, setOptions] = useState({
    lower: true,
    upper: true,
    numbers: true,
    special: false,
  })

  const entropyPoolRef = useRef(new Uint32Array(256))
  const entropyIndexRef = useRef(0)
  const mouseEntropyRef = useRef(0)
  const lastPosRef = useRef({ x: 0, y: 0 })
  const entropyTarget = 50

  const addEntropy = useCallback((value: number) => {
    entropyPoolRef.current[entropyIndexRef.current % entropyPoolRef.current.length] ^= Math.floor(value)
    entropyIndexRef.current++
  }, [])

  // Initialize with basic entropy
  useEffect(() => {
    addEntropy(Date.now())
    addEntropy(performance.now() * 1000)
    addEntropy(window.screen.width * window.screen.height)

    if (typeof window !== 'undefined' && window.crypto) {
      const seed = new Uint32Array(32)
      crypto.getRandomValues(seed)
      seed.forEach((v) => addEntropy(v))
    }

    // Load history from localStorage
    const saved = localStorage.getItem('seedHistory')
    if (saved) {
      try {
        setHistory(JSON.parse(saved))
      } catch {}
    }
  }, [addEntropy])

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      const dx = e.clientX - lastPosRef.current.x
      const dy = e.clientY - lastPosRef.current.y
      lastPosRef.current = { x: e.clientX, y: e.clientY }

      if (Math.abs(dx) > 2 || Math.abs(dy) > 2) {
        addEntropy((e.clientX << 16) | e.clientY)
        addEntropy(performance.now() * 1000)

        if (mouseEntropyRef.current < entropyTarget) {
          mouseEntropyRef.current++
          setEntropyProgress((mouseEntropyRef.current / entropyTarget) * 100)
        }
      }
    },
    [addEntropy]
  )

  const addTimeEntropy = useCallback(() => {
    const t1 = performance.now()
    let x = 0
    for (let i = 0; i < 10000; i++) x += Math.sqrt(i)
    const t2 = performance.now()

    addEntropy(t1 * 1000000)
    addEntropy(t2 * 1000000)
    addEntropy(x)

    // Add 10% progress
    mouseEntropyRef.current = Math.min(entropyTarget, mouseEntropyRef.current + 5)
    setEntropyProgress((mouseEntropyRef.current / entropyTarget) * 100)
  }, [addEntropy])

  const generate = useCallback(() => {
    let charset = ''
    if (options.lower) charset += 'abcdefghijklmnopqrstuvwxyz'
    if (options.upper) charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    if (options.numbers) charset += '0123456789'
    if (options.special) charset += '!@#$%^&*()-_=+[]{}|;:,.<>?'

    if (!charset) {
      charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
    }

    let output = ''
    const randomBytes = new Uint8Array(length)

    if (typeof window !== 'undefined' && window.crypto) {
      crypto.getRandomValues(randomBytes)
    }

    for (let i = 0; i < length; i++) {
      const poolValue = entropyPoolRef.current[i % entropyPoolRef.current.length] & 0xff
      const combined = randomBytes[i] ^ poolValue
      output += charset[combined % charset.length]
    }

    setResult(output)

    // Add to history
    const newHistory = [output, ...history.slice(0, 9)]
    setHistory(newHistory)
    localStorage.setItem('seedHistory', JSON.stringify(newHistory))
  }, [length, options, history])

  const copyResult = useCallback(() => {
    if (result) {
      navigator.clipboard.writeText(result)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    }
  }, [result])

  const clearHistory = useCallback(() => {
    setHistory([])
    localStorage.removeItem('seedHistory')
  }, [])

  const downloadResult = useCallback(() => {
    if (!result) return
    const blob = new Blob([result], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `seed-${Date.now()}.txt`
    a.click()
    URL.revokeObjectURL(url)
  }, [result])

  const exportHistory = useCallback(() => {
    if (history.length === 0) return
    const data = {
      exportDate: new Date().toISOString(),
      seeds: history,
    }
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'seed-history.json'
    a.click()
    URL.revokeObjectURL(url)
  }, [history])

  return (
    <main className="min-h-screen text-white">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="max-w-4xl mx-auto mb-8">
          <div className="flex items-center justify-between mb-4">
            <Link href="/tools" className="text-forge-cyan hover:underline text-sm">
              ← Back to Tools
            </Link>
            <ShareButton title="Seed Maker - Substratia" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            Seed <span className="text-forge-purple">Maker</span>
          </h1>
          <p className="text-gray-400">
            Generate high-entropy random strings using mouse movements. Everything runs locally in your browser.
          </p>
        </div>

        <div className="max-w-4xl mx-auto grid lg:grid-cols-3 gap-6">
          {/* Main Panel */}
          <div className="lg:col-span-2 space-y-4">
            {/* Entropy Collection */}
            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
              <label className="text-sm text-gray-400 block mb-3">Collect Entropy</label>
              <div
                onMouseMove={handleMouseMove}
                className={`h-32 rounded-lg border-2 border-dashed transition-all flex flex-col items-center justify-center cursor-crosshair ${
                  entropyProgress >= 100
                    ? 'border-green-500/50 bg-green-500/10'
                    : 'border-white/20 bg-black/20 hover:border-forge-cyan/50'
                }`}
              >
                <p className="text-gray-400 text-sm mb-2">
                  {entropyProgress >= 100 ? 'Entropy collected!' : 'Move your mouse here to collect entropy'}
                </p>
                <div className="w-48 h-2 bg-white/10 rounded-full overflow-hidden">
                  <div
                    className={`h-full transition-all ${entropyProgress >= 100 ? 'bg-green-500' : 'bg-forge-cyan'}`}
                    style={{ width: `${entropyProgress}%` }}
                  />
                </div>
              </div>
              <button
                onClick={addTimeEntropy}
                className="mt-3 px-4 py-2 bg-white/5 hover:bg-white/10 rounded-lg text-sm transition-all"
              >
                Add Time Entropy
              </button>
            </div>

            {/* Options */}
            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
              <label className="text-sm text-gray-400 block mb-3">Options</label>
              <div className="flex flex-wrap gap-4 mb-4">
                <select
                  value={length}
                  onChange={(e) => setLength(parseInt(e.target.value))}
                  className="bg-black/30 border border-white/10 rounded-lg px-3 py-2 text-sm"
                >
                  <option value={16}>16 characters</option>
                  <option value={32}>32 characters</option>
                  <option value={64}>64 characters</option>
                  <option value={128}>128 characters</option>
                  <option value={256}>256 characters</option>
                </select>
              </div>
              <div className="flex flex-wrap gap-4">
                {[
                  { key: 'lower', label: 'a-z' },
                  { key: 'upper', label: 'A-Z' },
                  { key: 'numbers', label: '0-9' },
                  { key: 'special', label: '!@#$%' },
                ].map((opt) => (
                  <label key={opt.key} className="flex items-center gap-2 text-sm cursor-pointer">
                    <input
                      type="checkbox"
                      checked={options[opt.key as keyof typeof options]}
                      onChange={(e) => setOptions({ ...options, [opt.key]: e.target.checked })}
                      className="rounded border-white/20 bg-black/30"
                    />
                    {opt.label}
                  </label>
                ))}
              </div>
            </div>

            {/* Generate */}
            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
              <button
                onClick={generate}
                className="w-full px-6 py-3 bg-forge-purple hover:bg-forge-purple/80 rounded-xl font-semibold transition-all mb-4"
              >
                Generate
              </button>
              <div className="relative">
                <textarea
                  value={result}
                  readOnly
                  placeholder="Your generated string will appear here..."
                  className="w-full h-24 bg-black/30 border border-white/10 rounded-lg p-4 text-sm font-mono resize-none"
                />
                <div className="absolute top-2 right-2 flex gap-1">
                  <button
                    onClick={copyResult}
                    disabled={!result}
                    className={`px-3 py-1 rounded text-xs font-medium transition-all disabled:opacity-50 ${
                      copied ? 'bg-green-500 text-white' : 'bg-white/10 hover:bg-white/20'
                    }`}
                  >
                    {copied ? 'Copied!' : 'Copy'}
                  </button>
                  <button
                    onClick={downloadResult}
                    disabled={!result}
                    className="px-3 py-1 rounded text-xs font-medium bg-white/10 hover:bg-white/20 transition-all disabled:opacity-50"
                  >
                    Download
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            {/* History */}
            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
              <div className="flex justify-between items-center mb-3">
                <span className="text-sm text-gray-400">History</span>
                <div className="flex gap-2">
                  {history.length > 0 && (
                    <button onClick={exportHistory} className="text-xs text-forge-cyan hover:text-forge-cyan/80 transition-all">
                      Export
                    </button>
                  )}
                  <button onClick={clearHistory} className="text-xs text-gray-500 hover:text-white transition-all">
                    Clear
                  </button>
                </div>
              </div>
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {history.length === 0 ? (
                  <p className="text-xs text-gray-500">No history yet</p>
                ) : (
                  history.map((item, i) => (
                    <button
                      key={i}
                      onClick={() => setResult(item)}
                      className="w-full text-left text-xs font-mono p-2 bg-black/20 hover:bg-black/40 rounded truncate transition-all"
                    >
                      {item}
                    </button>
                  ))
                )}
              </div>
            </div>

            {/* Info */}
            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
              <h3 className="font-semibold text-forge-cyan mb-2">How it works</h3>
              <p className="text-xs text-gray-400 mb-3">
                This tool combines browser crypto APIs with entropy from your mouse movements to generate
                high-quality random strings.
              </p>
              <h3 className="font-semibold text-forge-cyan mb-2">Use cases</h3>
              <ul className="text-xs text-gray-400 space-y-1">
                <li>• API keys and tokens</li>
                <li>• Password generation</li>
                <li>• Cryptographic seeds</li>
                <li>• Provably fair gaming</li>
              </ul>
            </div>

            {/* Privacy Note */}
            <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4">
              <p className="text-xs text-green-400">
                100% client-side. Nothing is sent to any server. Your seeds stay on your device.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
