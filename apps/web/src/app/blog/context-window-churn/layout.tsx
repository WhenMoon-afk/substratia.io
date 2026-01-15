import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'The Real Cost of Context Window Churn | Substratia',
  description: 'How context window limitations affect developer productivity and what you can do about it.',
  keywords: ['context window', 'Claude Code', 'developer productivity', 'AI context', 'token limits'],
  openGraph: {
    title: 'The Real Cost of Context Window Churn',
    description: 'How context window limitations affect developer productivity.',
    type: 'article',
    url: 'https://substratia.io/blog/context-window-churn',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The Real Cost of Context Window Churn',
    description: 'How context limits affect developer productivity.',
  },
}

const breadcrumbLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://substratia.io' },
    { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://substratia.io/blog' },
    { '@type': 'ListItem', position: 3, name: 'Context Window Churn', item: 'https://substratia.io/blog/context-window-churn' },
  ],
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'The Real Cost of Context Window Churn',
  description: 'How context window limitations affect developer productivity and what you can do about it.',
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
    '@id': 'https://substratia.io/blog/context-window-churn',
  },
}

export default function ContextWindowChurnLayout({
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
