import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'The Ultimate Guide to Claude Code Context Management | Substratia',
  description: 'Master context window management in Claude Code. Learn techniques for preserving context, avoiding compaction issues, and maximizing your AI coding sessions.',
  keywords: ['Claude Code context', 'context window management', 'Claude Code compaction', 'AI coding context', 'Claude Code tips', 'context preservation', 'CLAUDE.md'],
  authors: [{ name: 'Substratia' }],
  openGraph: {
    title: 'The Ultimate Guide to Claude Code Context Management',
    description: 'Master context window management in Claude Code. Learn techniques for preserving context and maximizing your AI coding sessions.',
    type: 'article',
    publishedTime: '2026-01-11',
    authors: ['Substratia'],
    url: 'https://substratia.io/blog/context-management-guide',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The Ultimate Guide to Claude Code Context Management',
    description: 'Master context window management in Claude Code.',
  },
}

const breadcrumbLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://substratia.io' },
    { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://substratia.io/blog' },
    { '@type': 'ListItem', position: 3, name: 'Context Management Guide', item: 'https://substratia.io/blog/context-management-guide' },
  ],
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'The Ultimate Guide to Claude Code Context Management',
  description: 'Master context window management in Claude Code. Learn techniques for preserving context, avoiding compaction issues, and maximizing your AI coding sessions.',
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
  dateModified: '2026-01-11',
  mainEntityOfPage: {
    '@type': 'WebPage',
    '@id': 'https://substratia.io/blog/context-management-guide',
  },
  keywords: ['Claude Code', 'context management', 'AI coding', 'compaction', 'CLAUDE.md'],
}

export default function ContextGuideLayout({
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
