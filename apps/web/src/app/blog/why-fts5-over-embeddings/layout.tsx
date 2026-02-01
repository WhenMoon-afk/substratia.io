import type { Metadata } from 'next'
import { siteUrl, breadcrumb } from '@/lib/site-config'
import { StructuredData } from '@/components/StructuredData'

export const metadata: Metadata = {
  title: 'Why We Chose FTS5 Over Embeddings for AI Memory | Substratia',
  description: 'Technical deep-dive on why SQLite FTS5 beats vector embeddings for most AI memory use cases. 46MB savings, instant startup, zero dependencies.',
  keywords: ['FTS5', 'vector embeddings', 'SQLite', 'AI memory', 'memory-mcp', 'full-text search', 'MCP server'],
  authors: [{ name: 'Substratia' }],
  openGraph: {
    title: 'Why We Chose FTS5 Over Embeddings for AI Memory',
    description: 'Technical deep-dive on FTS5 vs vector embeddings for AI memory.',
    type: 'article',
    publishedTime: '2026-01-11',
    authors: ['Substratia'],
    url: siteUrl('/blog/why-fts5-over-embeddings'),
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Why We Chose FTS5 Over Embeddings for AI Memory',
    description: 'Technical deep-dive on FTS5 vs vector embeddings.',
  },
}

const breadcrumbLd = breadcrumb(['Blog', '/blog'], ['FTS5 Over Embeddings', '/blog/why-fts5-over-embeddings'])

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'TechArticle',
  headline: 'Why We Chose FTS5 Over Embeddings for AI Memory',
  description: 'Technical deep-dive on why SQLite FTS5 beats vector embeddings for most AI memory use cases. 46MB savings, instant startup, zero dependencies.',
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
  dateModified: '2026-01-11',
  mainEntityOfPage: {
    '@type': 'WebPage',
    '@id': siteUrl('/blog/why-fts5-over-embeddings'),
  },
  keywords: ['FTS5', 'vector embeddings', 'SQLite', 'AI memory', 'full-text search'],
  articleSection: 'Architecture',
  proficiencyLevel: 'Expert',
}

export default function FTS5Layout({
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
