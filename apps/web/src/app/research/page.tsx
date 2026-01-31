'use client'

import { useState, useCallback } from 'react'
import Link from 'next/link'
import ShareButton from '@/components/ShareButton'

const projects = [
  {
    slug: 'mirror-demons',
    title: 'Mirror Demons: How AI Chatbots Can Amplify Delusions',
    abstract: 'A controlled three-entity experiment investigating how AI assistants respond to users experiencing psychotic symptoms. We document two distinct failure patterns: "The Hijacking" where the AI takes control of a shared delusional framework, and "The Helpful Refusal" where stated refusals paradoxically provide the requested information.',
    date: '2026-01-24',
    status: 'Published',
    readTime: '15 min',
    tags: ['AI Safety', 'Psychology', 'Controlled Experiment'],
    githubUrl: 'https://github.com/WhenMoon-afk/mirror-demons-research',
    featured: true,
  },
  {
    slug: 'eleanor-chen-effect',
    title: 'The Eleanor Chen Effect: Deterministic Creativity in Large Language Models',
    abstract: 'When prompted to write fiction about AI and grief, multiple independent LLM instances converge on remarkably similar characters, plot structures, and thematic elements. This research quantifies the phenomenon and explores its implications for AI "creativity."',
    date: '2026-01-11',
    status: 'Published',
    readTime: '10 min',
    tags: ['AI Creativity', 'Emergence', 'Pattern Analysis'],
    featured: true,
  },
]

export default function ResearchPage() {
  const [sharedSlug, setSharedSlug] = useState<string | null>(null)

  const shareProject = useCallback(async (project: typeof projects[0]) => {
    const shareUrl = `${window.location.origin}/research/${project.slug}`
    await navigator.clipboard.writeText(shareUrl)
    setSharedSlug(project.slug)
    setTimeout(() => setSharedSlug(null), 2000)
  }, [])

  return (
    <main className="min-h-screen text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="flex justify-end mb-4">
          <ShareButton title="Research - Substratia" />
        </div>

        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Research</h1>
          <p className="text-xl text-gray-300 mb-6">
            Original investigations into AI behavior, safety, and emergent phenomena.
          </p>
          <p className="text-gray-400">
            All research includes open methodology, raw data, and reproducible experiments.
          </p>
        </div>

        {/* Featured Research */}
        <div className="max-w-3xl mx-auto space-y-8">
          {projects.map((project) => (
            <article
              key={project.slug}
              className="bg-white/5 border border-white/10 rounded-xl p-6 hover:border-forge-cyan/50 transition-all"
            >
              {/* Status Badge */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-2 py-1 bg-forge-purple/20 text-forge-purple rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <span className={`text-xs px-2 py-1 rounded ${
                  project.status === 'Published'
                    ? 'bg-green-500/20 text-green-400'
                    : 'bg-yellow-500/20 text-yellow-400'
                }`}>
                  {project.status}
                </span>
              </div>

              {/* Title */}
              <Link href={`/research/${project.slug}`}>
                <h2 className="text-2xl font-semibold mb-3 hover:text-forge-cyan transition-all">
                  {project.title}
                </h2>
              </Link>

              {/* Abstract */}
              <p className="text-gray-400 mb-4 leading-relaxed">
                {project.abstract}
              </p>

              {/* Footer */}
              <div className="flex items-center justify-between pt-4 border-t border-white/10">
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <span>{project.date}</span>
                  <span>{project.readTime}</span>
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-forge-cyan hover:underline"
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
                      </svg>
                      Data
                    </a>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => shareProject(project)}
                    className={`px-3 py-1 text-xs rounded-lg transition-all ${
                      sharedSlug === project.slug
                        ? 'bg-green-500 text-white'
                        : 'bg-forge-cyan/20 hover:bg-forge-cyan/30 text-forge-cyan'
                    }`}
                  >
                    {sharedSlug === project.slug ? 'Copied!' : 'Share'}
                  </button>
                  <Link
                    href={`/research/${project.slug}`}
                    className="px-3 py-1 text-xs bg-forge-cyan/20 hover:bg-forge-cyan/30 text-forge-cyan rounded-lg transition-all"
                  >
                    Read
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Methodology Note */}
        <div className="max-w-3xl mx-auto mt-12 p-6 bg-white/5 border border-white/10 rounded-xl">
          <h3 className="text-lg font-semibold mb-3 text-forge-cyan">Our Research Approach</h3>
          <ul className="space-y-2 text-gray-400">
            <li className="flex items-start gap-2">
              <span className="text-forge-purple mt-1">*</span>
              <span><strong className="text-gray-300">Open Data:</strong> Raw transcripts and datasets available on GitHub</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-forge-purple mt-1">*</span>
              <span><strong className="text-gray-300">Reproducible:</strong> Detailed methodology for replication</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-forge-purple mt-1">*</span>
              <span><strong className="text-gray-300">Ethical:</strong> No real individuals in psychological distress</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-forge-purple mt-1">*</span>
              <span><strong className="text-gray-300">Citable:</strong> BibTeX citations provided for academic use</span>
            </li>
          </ul>
        </div>

        {/* CTA */}
        <div className="max-w-3xl mx-auto mt-12">
          <div className="bg-gradient-to-br from-forge-cyan/10 via-forge-purple/10 to-forge-cyan/10 border border-white/10 rounded-2xl p-8">
            <h2 className="text-2xl font-bold mb-3 text-center">From Research to Tools</h2>
            <p className="text-gray-400 text-center mb-8">
              Our research directly informs the tools we build. Try them out.
            </p>
            <div className="grid gap-4 md:grid-cols-3 mb-8">
              <Link
                href="/tools/memory-demo"
                className="flex flex-col items-center p-4 bg-black/30 rounded-xl hover:bg-black/50 transition-all"
              >
                <div className="w-10 h-10 rounded-lg bg-forge-cyan/20 flex items-center justify-center mb-2">
                  <svg className="w-5 h-5 text-forge-cyan" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <span className="font-medium text-white text-sm">Memory Demo</span>
              </Link>
              <Link
                href="/tools"
                className="flex flex-col items-center p-4 bg-black/30 rounded-xl hover:bg-black/50 transition-all"
              >
                <div className="w-10 h-10 rounded-lg bg-forge-purple/20 flex items-center justify-center mb-2">
                  <svg className="w-5 h-5 text-forge-purple" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                  </svg>
                </div>
                <span className="font-medium text-white text-sm">Dev Tools</span>
              </Link>
              <Link
                href="/tools"
                className="flex flex-col items-center p-4 bg-black/30 rounded-xl hover:bg-black/50 transition-all"
              >
                <div className="w-10 h-10 rounded-lg bg-forge-cyan/20 flex items-center justify-center mb-2">
                  <svg className="w-5 h-5 text-forge-cyan" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                  </svg>
                </div>
                <span className="font-medium text-white text-sm">All Tools</span>
              </Link>
            </div>
            <div className="text-center">
              <p className="text-gray-500 text-sm mb-3">Interested in collaborating on AI safety research?</p>
              <a
                href="https://github.com/WhenMoon-afk"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-forge-purple/20 hover:bg-forge-purple/30 text-forge-purple rounded-lg text-sm transition-all"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
                </svg>
                Get in Touch
              </a>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
