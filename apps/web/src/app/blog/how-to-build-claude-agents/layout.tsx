import type { Metadata } from 'next'
import { siteUrl } from '@/lib/site-config'

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

const breadcrumbLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: siteUrl() },
    { '@type': 'ListItem', position: 2, name: 'Blog', item: siteUrl('/blog') },
    { '@type': 'ListItem', position: 3, name: 'How to Build Claude Agents', item: siteUrl('/blog/how-to-build-claude-agents') },
  ],
}

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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      {children}
    </>
  )
}
