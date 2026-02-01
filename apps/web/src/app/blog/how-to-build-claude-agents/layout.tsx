import type { Metadata } from 'next'
import { siteUrl, breadcrumb } from '@/lib/site-config'
import { StructuredData } from '@/components/StructuredData'

export const metadata: Metadata = {
  title: 'How to Build Claude Agents: A Practical Guide | Substratia',
  description: 'Step-by-step guide to building effective Claude Code agents with CLAUDE.md configuration.',
  keywords: ['Claude agents', 'CLAUDE.md', 'AI agents', 'Claude Code tutorial', 'agent building'],
  openGraph: {
    title: 'How to Build Claude Agents',
    description: 'Step-by-step guide to building effective Claude Code agents.',
    type: 'article',
    url: siteUrl('/blog/how-to-build-claude-agents'),
  },
  twitter: {
    card: 'summary_large_image',
    title: 'How to Build Claude Agents',
    description: 'Practical guide to building Claude Code agents.',
  },
}

const breadcrumbLd = breadcrumb(['Blog', '/blog'], ['How to Build Claude Agents', '/blog/how-to-build-claude-agents'])

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'How to Build Claude Agents: A Practical Guide',
  description: 'Step-by-step guide to building effective Claude Code agents with CLAUDE.md configuration.',
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
    '@id': siteUrl('/blog/how-to-build-claude-agents'),
  },
}

export default function HowToBuildClaudeAgentsLayout({
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
