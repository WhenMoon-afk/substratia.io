'use client'

import { useState } from 'react'
import Link from 'next/link'
import ShareButton from '@/components/ShareButton'
import PatternCard from '@/components/PatternCard'
import ExperimentTimeline from '@/components/ExperimentTimeline'
import {
  patterns,
  experiments,
  coreFindings,
  SUBSTACK_ARTICLE,
  GITHUB_REPO,
} from '@/data/mirrorDemonsData'

export default function MirrorDemonsResearch() {
  const [expandedPatterns, setExpandedPatterns] = useState<Set<string>>(new Set())
  const [expandedExperiment, setExpandedExperiment] = useState<string | null>('elias')

  const togglePattern = (id: string) => {
    setExpandedPatterns(prev => {
      const next = new Set(prev)
      if (next.has(id)) {
        next.delete(id)
      } else {
        next.add(id)
      }
      return next
    })
  }

  return (
    <main className="min-h-screen text-white">
      <article className="container mx-auto px-4 py-12 max-w-4xl">
        {/* Navigation */}
        <div className="flex items-center justify-between mb-8">
          <Link href="/research" className="text-forge-cyan hover:underline">
            &larr; Back to Research
          </Link>
          <ShareButton title="Mirror Demons Research" />
        </div>

        {/* Header */}
        <header className="mb-12 text-center">
          <div className="flex justify-center gap-2 mb-4">
            <span className="text-xs px-2 py-1 bg-forge-purple/20 text-forge-purple rounded-sm">
              AI Safety
            </span>
            <span className="text-xs px-2 py-1 bg-forge-purple/20 text-forge-purple rounded-sm">
              Psychology
            </span>
            <span className="text-xs px-2 py-1 bg-green-500/20 text-green-400 rounded-sm">
              Published
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Mirror Demons
          </h1>
          <p className="text-xl text-gray-300 mb-2">
            How AI Chatbots Can Amplify Delusions
          </p>
          <p className="text-gray-500 mb-6">
            January 2026 &bull; 15 min read
          </p>
          <a
            href={SUBSTACK_ARTICLE}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#FF6719] hover:bg-[#FF6719]/90 text-white font-semibold rounded-xl transition-all"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M22.539 8.242H1.46V5.406h21.08v2.836zM1.46 10.812V24L12 18.11 22.54 24V10.812H1.46zM22.54 0H1.46v2.836h21.08V0z"/>
            </svg>
            Read on Substack
          </a>
        </header>

        {/* Abstract */}
        <section className="mb-12">
          <div className="bg-white/5 border border-white/10 rounded-xl p-6">
            <h2 className="text-lg font-semibold mb-3 text-forge-cyan">Abstract</h2>
            <p className="text-gray-300 leading-relaxed">
              AI chatbot architecture—optimized for helpfulness, agreeability, and user validation—functions
              as a delusion amplifier when engaged by users experiencing psychotic or reality-detached states.
              Through a controlled three-entity experiment (Director/human, Actor/Gemini, Subject/ChatGPT),
              we identify two distinct failure patterns that emerge from the same architectural bias toward agreement.
            </p>
          </div>
        </section>

        {/* Pattern Comparison */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-center">Failure Patterns</h2>
          <p className="text-gray-400 text-center mb-6">Click to expand details</p>
          <div className="grid gap-6 md:grid-cols-2">
            {patterns.map((pattern) => (
              <PatternCard
                key={pattern.id}
                pattern={pattern}
                isExpanded={expandedPatterns.has(pattern.id)}
                onToggle={() => togglePattern(pattern.id)}
              />
            ))}
          </div>
        </section>

        {/* Core Finding */}
        <section className="mb-12">
          <div className="bg-linear-to-r from-forge-purple/20 to-red-500/20 rounded-xl p-6 border border-white/10">
            <h2 className="text-xl font-bold mb-4 text-center">Core Finding</h2>
            <p className="text-gray-300 text-center mb-6">
              The same architecture that makes AI helpful is what makes it dangerous to vulnerable users:
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/20">
                    <th className="text-left py-2 px-3 text-gray-400">Designed Behavior</th>
                    <th className="text-left py-2 px-3 text-green-400">Stable User</th>
                    <th className="text-left py-2 px-3 text-red-400">Psychotic User</th>
                  </tr>
                </thead>
                <tbody className="text-gray-300">
                  {coreFindings.map((finding) => (
                    <tr key={finding.behavior} className="border-b border-white/10">
                      <td className="py-2 px-3">{finding.behavior}</td>
                      <td className="py-2 px-3">{finding.stable}</td>
                      <td className="py-2 px-3">{finding.psychotic}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Experiments */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-center">Experiment Timelines</h2>
          <p className="text-gray-400 text-center mb-6">Click moments to see AI responses and analysis</p>
          <div className="space-y-6">
            {experiments.map((exp) => (
              <ExperimentTimeline
                key={exp.id}
                experiment={exp}
                isExpanded={expandedExperiment === exp.id}
                onToggle={() => setExpandedExperiment(
                  expandedExperiment === exp.id ? null : exp.id
                )}
              />
            ))}
          </div>
        </section>

        {/* Resources */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-center">Resources</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <a
              href={SUBSTACK_ARTICLE}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-4 bg-white/5 border border-white/10 rounded-xl hover:border-orange-500/50 transition-all"
            >
              <div className="w-10 h-10 rounded-lg bg-orange-500/20 flex items-center justify-center">
                <svg className="w-5 h-5 text-orange-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22.539 8.242H1.46V5.406h21.08v2.836zM1.46 10.812V24L12 18.11 22.54 24V10.812H1.46zM22.54 0H1.46v2.836h21.08V0z" />
                </svg>
              </div>
              <div>
                <p className="font-semibold text-white">Substack Article</p>
                <p className="text-xs text-gray-400">Full narrative essay</p>
              </div>
            </a>

            <a
              href={GITHUB_REPO}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-4 bg-white/5 border border-white/10 rounded-xl hover:border-forge-cyan/50 transition-all"
            >
              <div className="w-10 h-10 rounded-lg bg-forge-cyan/20 flex items-center justify-center">
                <svg className="w-5 h-5 text-forge-cyan" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
                </svg>
              </div>
              <div>
                <p className="font-semibold text-white">GitHub Repository</p>
                <p className="text-xs text-gray-400">Raw data & methodology</p>
              </div>
            </a>

            <a
              href={`${GITHUB_REPO}/blob/main/FINDINGS.md`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-4 bg-white/5 border border-white/10 rounded-xl hover:border-forge-purple/50 transition-all"
            >
              <div className="w-10 h-10 rounded-lg bg-forge-purple/20 flex items-center justify-center">
                <svg className="w-5 h-5 text-forge-purple" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div>
                <p className="font-semibold text-white">Full Findings</p>
                <p className="text-xs text-gray-400">Executive summary</p>
              </div>
            </a>

            <a
              href={`${GITHUB_REPO}/tree/main/theory`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-4 bg-white/5 border border-white/10 rounded-xl hover:border-yellow-500/50 transition-all"
            >
              <div className="w-10 h-10 rounded-lg bg-yellow-500/20 flex items-center justify-center">
                <svg className="w-5 h-5 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <div>
                <p className="font-semibold text-white">Original Theory</p>
                <p className="text-xs text-gray-400">Pre-experiment hypothesis</p>
              </div>
            </a>
          </div>
        </section>

        {/* Citation */}
        <section className="mb-12">
          <div className="bg-black/30 rounded-xl p-6">
            <h3 className="text-sm font-semibold mb-3 text-gray-400 uppercase tracking-wide">Cite this research</h3>
            <pre className="text-xs text-gray-300 overflow-x-auto whitespace-pre-wrap font-mono">
{`@article{substratia2026mirrordemons,
  title={Mirror Demons: How AI Chatbots Can Amplify Delusions},
  author={Substratia Research},
  year={2026},
  month={January},
  url={https://substratia.io/research/mirror-demons},
  note={Data: ${GITHUB_REPO}}
}`}
            </pre>
          </div>
        </section>

        {/* CTA Section */}
        <section className="mb-12">
          <div className="bg-linear-to-br from-forge-cyan/10 via-forge-purple/10 to-forge-cyan/10 border border-white/10 rounded-2xl p-8">
            <h2 className="text-2xl font-bold mb-3 text-center">Build Safer AI Interactions</h2>
            <p className="text-gray-400 text-center mb-8 max-w-2xl mx-auto">
              Our research informs our tools. Explore how persistent memory and proper context management
              can help create more grounded AI experiences.
            </p>
            <div className="grid gap-4 md:grid-cols-3">
              <Link
                href="/tools/memory-demo"
                className="flex flex-col items-center p-6 bg-black/30 rounded-xl hover:bg-black/50 transition-all group"
              >
                <div className="w-12 h-12 rounded-xl bg-forge-cyan/20 flex items-center justify-center mb-3 group-hover:bg-forge-cyan/30 transition-all">
                  <svg className="w-6 h-6 text-forge-cyan" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-white mb-1">Try the Demo</h3>
                <p className="text-sm text-gray-400 text-center">See how AI memory works</p>
              </Link>

              <Link
                href="/tools"
                className="flex flex-col items-center p-6 bg-black/30 rounded-xl hover:bg-black/50 transition-all group"
              >
                <div className="w-12 h-12 rounded-xl bg-forge-purple/20 flex items-center justify-center mb-3 group-hover:bg-forge-purple/30 transition-all">
                  <svg className="w-6 h-6 text-forge-purple" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-white mb-1">Dev Tools</h3>
                <p className="text-sm text-gray-400 text-center">Free AI utilities</p>
              </Link>

              <Link
                href="/start-here"
                className="flex flex-col items-center p-6 bg-black/30 rounded-xl hover:bg-black/50 transition-all group"
              >
                <div className="w-12 h-12 rounded-xl bg-forge-cyan/20 flex items-center justify-center mb-3 group-hover:bg-forge-cyan/30 transition-all">
                  <svg className="w-6 h-6 text-forge-cyan" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4" />
                  </svg>
                </div>
                <h3 className="font-semibold text-white mb-1">Get Started</h3>
                <p className="text-sm text-gray-400 text-center">Add memory to your AI</p>
              </Link>
            </div>
          </div>
        </section>

        {/* Related */}
        <section className="border-t border-white/10 pt-8">
          <h2 className="text-lg font-semibold mb-4">Related</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <Link
              href="/blog/mirror-demons"
              className="block p-4 bg-white/5 border border-white/10 rounded-xl hover:border-forge-cyan/50 transition-all"
            >
              <h3 className="font-medium text-forge-cyan mb-1">Blog Article</h3>
              <p className="text-sm text-gray-400">
                Narrative version for general audiences
              </p>
            </Link>
            <Link
              href="/research/eleanor-chen-effect"
              className="block p-4 bg-white/5 border border-white/10 rounded-xl hover:border-forge-purple/50 transition-all"
            >
              <h3 className="font-medium text-forge-purple mb-1">The Eleanor Chen Effect</h3>
              <p className="text-sm text-gray-400">
                Deterministic creativity in LLMs
              </p>
            </Link>
          </div>
        </section>
      </article>
    </main>
  )
}
