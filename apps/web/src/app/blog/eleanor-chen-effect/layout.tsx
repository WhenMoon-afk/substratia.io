import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'The Eleanor Chen Effect: Why AI Keeps Writing the Same Story | Substratia',
  description: 'Original research on why LLMs converge on remarkably similar narratives and characters. 70% of AI-generated stories about AI and grief feature Eleanor Chen variants.',
  keywords: ['AI creativity', 'LLM convergence', 'AI narratives', 'Eleanor Chen', 'AI research', 'AI determinism'],
  authors: [{ name: 'Substratia' }],
  openGraph: {
    title: 'The Eleanor Chen Effect: Why AI Keeps Writing the Same Story',
    description: 'Why do LLMs create the same characters? Our research reveals patterns in AI-generated narratives.',
    type: 'article',
    publishedTime: '2026-01-11',
    authors: ['Substratia'],
    url: 'https://substratia.io/blog/eleanor-chen-effect',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The Eleanor Chen Effect: Why AI Keeps Writing the Same Story',
    description: 'Why do LLMs create the same characters?',
  },
}

const breadcrumbLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://substratia.io' },
    { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://substratia.io/blog' },
    { '@type': 'ListItem', position: 3, name: 'Eleanor Chen Effect', item: 'https://substratia.io/blog/eleanor-chen-effect' },
  ],
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'The Eleanor Chen Effect: Why AI Keeps Writing the Same Story',
  description: 'Original research on why LLMs converge on remarkably similar narratives and characters. 70% of AI-generated stories about AI and grief feature Eleanor Chen variants.',
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
    '@id': 'https://substratia.io/blog/eleanor-chen-effect',
  },
  keywords: ['AI creativity', 'LLM convergence', 'AI narratives', 'Eleanor Chen effect'],
  articleSection: 'Research',
}

export default function EleanorChenLayout({
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
