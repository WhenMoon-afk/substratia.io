import type { Metadata } from 'next'
import { siteUrl } from '@/lib/site-config'

export const metadata: Metadata = {
  title: 'Blog - Substratia | AI Memory Tools & Agent Building',
  description: 'Tutorials, comparisons, and best practices for AI memory tools, MCP servers, and agent configuration.',
  keywords: ['MCP memory server', 'Claude memory', 'AI agents', 'CLAUDE.md', 'prompt engineering', 'memory-mcp', 'Claude Code'],
  openGraph: {
    title: 'Substratia Blog - AI Memory Tools & Agent Building',
    description: 'Tutorials, tips, and best practices for building AI agents with Claude Code.',
    type: 'website',
    url: siteUrl('/blog'),
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Substratia Blog',
    description: 'Tutorials and best practices for AI memory tools and Claude Code.',
  },
}

const breadcrumbLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: siteUrl() },
    { '@type': 'ListItem', position: 2, name: 'Blog', item: siteUrl('/blog') },
  ],
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Blog',
  name: 'Substratia Blog',
  description: 'Tutorials, comparisons, and best practices for AI memory tools, MCP servers, and agent configuration.',
  url: siteUrl('/blog'),
  publisher: {
    '@type': 'Organization',
    name: 'Substratia',
    url: siteUrl(),
  },
}

export default function BlogLayout({
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
