import type { Metadata } from 'next'
import { siteUrl, breadcrumb } from '@/lib/site-config'
import { StructuredData } from '@/components/StructuredData'

export const metadata: Metadata = {
  title: 'AGENTS.md vs CLAUDE.md: Complete Guide | Substratia',
  description: 'Learn the differences between AGENTS.md and CLAUDE.md files, when to use each, and best practices for configuring AI coding agents.',
  keywords: ['AGENTS.md', 'CLAUDE.md', 'AI agent configuration', 'Claude Code', 'agent setup'],
  openGraph: {
    title: 'AGENTS.md vs CLAUDE.md: Complete Guide',
    description: 'Learn the differences between AGENTS.md and CLAUDE.md files.',
    type: 'article',
    url: siteUrl('/blog/agents-md-vs-claude-md'),
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AGENTS.md vs CLAUDE.md Guide',
    description: 'When to use each file for AI agent configuration.',
  },
}

const breadcrumbLd = breadcrumb(['Blog', '/blog'], ['AGENTS.md vs CLAUDE.md', '/blog/agents-md-vs-claude-md'])

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'AGENTS.md vs CLAUDE.md: Complete Guide to AI Agent Configuration',
  description: 'Learn the differences between AGENTS.md and CLAUDE.md files, when to use each, and best practices for configuring AI coding agents.',
  author: {
    '@type': 'Organization',
    name: 'Substratia',
    url: siteUrl(),
  },
  publisher: {
    '@type': 'Organization',
    name: 'Substratia',
    url: siteUrl(),
  },
  datePublished: '2026-01-11',
  mainEntityOfPage: {
    '@type': 'WebPage',
    '@id': siteUrl('/blog/agents-md-vs-claude-md'),
  },
}

export default function AgentsMdVsClaudeMdLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <StructuredData data={[jsonLd, breadcrumbLd]} />
      {children}
    </>
  )
}
