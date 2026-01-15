import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'AGENTS.md vs CLAUDE.md: Complete Guide | Substratia',
  description: 'Learn the differences between AGENTS.md and CLAUDE.md files, when to use each, and best practices for configuring AI coding agents.',
  keywords: ['AGENTS.md', 'CLAUDE.md', 'AI agent configuration', 'Claude Code', 'agent setup'],
  openGraph: {
    title: 'AGENTS.md vs CLAUDE.md: Complete Guide',
    description: 'Learn the differences between AGENTS.md and CLAUDE.md files.',
    type: 'article',
    url: 'https://substratia.io/blog/agents-md-vs-claude-md',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AGENTS.md vs CLAUDE.md Guide',
    description: 'When to use each file for AI agent configuration.',
  },
}

const breadcrumbLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://substratia.io' },
    { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://substratia.io/blog' },
    { '@type': 'ListItem', position: 3, name: 'AGENTS.md vs CLAUDE.md', item: 'https://substratia.io/blog/agents-md-vs-claude-md' },
  ],
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'AGENTS.md vs CLAUDE.md: Complete Guide to AI Agent Configuration',
  description: 'Learn the differences between AGENTS.md and CLAUDE.md files, when to use each, and best practices for configuring AI coding agents.',
  author: {
    '@type': 'Organization',
    name: 'Substratia',
    url: 'https://substratia.io',
  },
  publisher: {
    '@type': 'Organization',
    name: 'Substratia',
    url: 'https://substratia.io',
  },
  datePublished: '2026-01-11',
  mainEntityOfPage: {
    '@type': 'WebPage',
    '@id': 'https://substratia.io/blog/agents-md-vs-claude-md',
  },
}

export default function AgentsMdVsClaudeMdLayout({
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
