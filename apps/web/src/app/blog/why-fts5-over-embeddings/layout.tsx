import type { Metadata } from 'next'

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
    url: 'https://substratia.io/blog/why-fts5-over-embeddings',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Why We Chose FTS5 Over Embeddings for AI Memory',
    description: 'Technical deep-dive on FTS5 vs vector embeddings.',
  },
}

const breadcrumbLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://substratia.io' },
    { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://substratia.io/blog' },
    { '@type': 'ListItem', position: 3, name: 'FTS5 Over Embeddings', item: 'https://substratia.io/blog/why-fts5-over-embeddings' },
  ],
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'TechArticle',
  headline: 'Why We Chose FTS5 Over Embeddings for AI Memory',
  description: 'Technical deep-dive on why SQLite FTS5 beats vector embeddings for most AI memory use cases. 46MB savings, instant startup, zero dependencies.',
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
    '@id': 'https://substratia.io/blog/why-fts5-over-embeddings',
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
