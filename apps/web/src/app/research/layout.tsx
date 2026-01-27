import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Research - Substratia | Original AI Safety & Behavior Research',
  description: 'Original research on AI safety, behavior patterns, and emergent phenomena. Controlled experiments with reproducible methodologies and open data.',
  keywords: ['AI research', 'AI safety', 'chatbot psychology', 'AI behavior', 'Mirror Demons', 'original research', 'AI experiments'],
  openGraph: {
    title: 'Substratia Research - Original AI Safety & Behavior Research',
    description: 'Controlled experiments investigating AI behavior patterns, safety implications, and emergent phenomena.',
    type: 'website',
    url: 'https://substratia.io/research',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Substratia Research',
    description: 'Original research on AI safety and behavior patterns.',
  },
  alternates: {
    types: {
      'application/rss+xml': 'https://substratia.io/research/feed.xml',
    },
  },
}

const breadcrumbLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://substratia.io' },
    { '@type': 'ListItem', position: 2, name: 'Research', item: 'https://substratia.io/research' },
  ],
}

const collectionLd = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name: 'Substratia Research',
  description: 'Original research on AI safety, behavior patterns, and emergent phenomena.',
  url: 'https://substratia.io/research',
  publisher: {
    '@type': 'Organization',
    name: 'Substratia',
    url: 'https://substratia.io',
  },
}

export default function ResearchLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      {children}
    </>
  )
}
