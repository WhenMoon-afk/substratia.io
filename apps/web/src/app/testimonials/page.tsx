'use client'

import { useState } from 'react'
import Link from 'next/link'
import ShareButton from '@/components/ShareButton'

interface Testimonial {
  id: string
  quote: string
  author: string
  role: string
  company?: string
  service: string
  result?: string
  image?: string
}

// Placeholder testimonials - will be replaced with real ones from consulting clients
const testimonials: Testimonial[] = [
  // When we get real testimonials, they'll go here
  // {
  //   id: '1',
  //   quote: 'Example testimonial text...',
  //   author: 'John Doe',
  //   role: 'Senior Developer',
  //   company: 'TechCorp',
  //   service: 'Setup Session',
  //   result: '40% faster context management',
  // },
]

export default function TestimonialsPage() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const FORMSPREE_ENDPOINT = 'https://formspree.io/f/mreezwlv'

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return

    setStatus('loading')
    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({ email, source: 'testimonials', interest: 'consulting' }),
      })
      if (res.ok) {
        setStatus('success')
        setEmail('')
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  const hasTestimonials = testimonials.length > 0

  return (
    <main className="min-h-screen text-white relative">
      <div className="neural-bg" />
      <div className="fixed inset-0 gradient-mesh pointer-events-none z-0" />

      <section className="relative z-10 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <Link href="/" className="text-forge-cyan hover:underline text-sm">
                ← Back to Home
              </Link>
              <ShareButton title="Client Success Stories - Substratia" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-center mb-4">
              Client <span className="text-forge-cyan">Success Stories</span>
            </h1>
            <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
              Real results from developers and teams who transformed their Claude Code workflows.
            </p>

            {hasTestimonials ? (
              <div className="space-y-8">
                {testimonials.map((testimonial) => (
                  <div key={testimonial.id} className="glass rounded-xl p-8">
                    <div className="flex items-start gap-4">
                      {testimonial.image ? (
                        <img
                          src={testimonial.image}
                          alt={testimonial.author}
                          className="w-16 h-16 rounded-full object-cover"
                        />
                      ) : (
                        <div className="w-16 h-16 rounded-full bg-forge-purple/20 flex items-center justify-center text-2xl font-bold text-forge-purple">
                          {testimonial.author.charAt(0)}
                        </div>
                      )}
                      <div className="flex-1">
                        <blockquote className="text-xl mb-4 text-gray-200">
                          &ldquo;{testimonial.quote}&rdquo;
                        </blockquote>
                        <div className="flex flex-wrap items-center gap-4">
                          <div>
                            <div className="font-semibold">{testimonial.author}</div>
                            <div className="text-sm text-gray-400">
                              {testimonial.role}
                              {testimonial.company && ` at ${testimonial.company}`}
                            </div>
                          </div>
                          <div className="flex-1" />
                          <span className="px-3 py-1 bg-forge-cyan/20 text-forge-cyan text-sm rounded-full">
                            {testimonial.service}
                          </span>
                        </div>
                        {testimonial.result && (
                          <div className="mt-4 p-3 bg-green-500/10 border border-green-500/30 rounded-lg">
                            <span className="text-green-400 font-medium">Result: </span>
                            <span className="text-gray-300">{testimonial.result}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              /* Coming Soon State */
              <div className="glass rounded-xl p-12 text-center">
                <div className="w-20 h-20 rounded-full bg-forge-cyan/20 flex items-center justify-center mx-auto mb-6">
                  <svg className="w-10 h-10 text-forge-cyan" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold mb-4">Coming Soon</h2>
                <p className="text-gray-400 mb-8 max-w-lg mx-auto">
                  We&apos;re just getting started with consulting. Testimonials from early clients will appear here soon.
                </p>

                <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
                  <Link
                    href="/consulting"
                    className="px-6 py-3 bg-forge-cyan text-forge-dark font-semibold rounded-xl hover:bg-forge-cyan/90 transition-all"
                  >
                    Become an Early Client
                  </Link>
                  <span className="text-gray-500">or</span>
                  <Link
                    href="/blog/context-management-guide"
                    className="text-forge-cyan hover:underline"
                  >
                    Read our free resources
                  </Link>
                </div>
              </div>
            )}

            {/* Why Work With Us */}
            <div className="mt-16">
              <h2 className="text-2xl font-bold text-center mb-8">Why Teams Choose Us</h2>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="glass rounded-xl p-6 text-center">
                  <div className="text-3xl mb-4">200+</div>
                  <div className="text-sm text-gray-400">Hours spent daily in Claude Code</div>
                </div>
                <div className="glass rounded-xl p-6 text-center">
                  <div className="text-3xl mb-4">48</div>
                  <div className="text-sm text-gray-400">GitHub stars on our open source tools</div>
                </div>
                <div className="glass rounded-xl p-6 text-center">
                  <div className="text-3xl mb-4">575+</div>
                  <div className="text-sm text-gray-400">npm downloads last month</div>
                </div>
              </div>
            </div>

            {/* Newsletter */}
            <div className="mt-16 text-center pt-12 border-t border-white/10">
              <h2 className="text-2xl font-bold mb-4">Get Updates</h2>
              <p className="text-gray-400 mb-6">
                Be the first to hear about new case studies and consulting offers.
              </p>
              {status === 'success' ? (
                <div className="bg-green-500/20 border border-green-500/50 rounded-xl p-4 text-green-300 max-w-md mx-auto">
                  You&apos;re subscribed! We&apos;ll keep you posted.
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    aria-label="Email address for newsletter subscription"
                    required
                    className="flex-1 px-4 py-3 bg-white/5 border border-white/20 rounded-xl focus:outline-none focus:border-forge-cyan transition-all"
                  />
                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="px-6 py-3 bg-forge-cyan text-forge-dark font-semibold rounded-xl hover:bg-forge-cyan/90 transition-all disabled:opacity-50"
                  >
                    {status === 'loading' ? '...' : 'Subscribe'}
                  </button>
                </form>
              )}
              {status === 'error' && (
                <p className="text-red-400 text-sm mt-2">Something went wrong. Please try again.</p>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
