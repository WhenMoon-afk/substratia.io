import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Start Here - Claude Code Getting Started Guide | Substratia',
  description: 'New to Claude Code? Start here. A curated learning path from beginner to power user with free tools, guides, and resources.',
  keywords: ['Claude Code tutorial', 'Claude Code getting started', 'Claude Code beginner', 'Claude Code guide', 'learn Claude Code'],
  openGraph: {
    title: 'Start Here - Claude Code Getting Started Guide',
    description: 'New to Claude Code? A curated learning path from beginner to power user.',
    type: 'website',
    url: 'https://substratia.io/start-here',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Claude Code Getting Started Guide',
    description: 'A curated learning path from beginner to power user.',
  },
}

const breadcrumbLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://substratia.io' },
    { '@type': 'ListItem', position: 2, name: 'Start Here', item: 'https://substratia.io/start-here' },
  ],
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'LearningResource',
  name: 'Claude Code Getting Started Guide',
  description: 'A curated learning path from beginner to power user with free tools, guides, and resources.',
  educationalLevel: 'Beginner',
  learningResourceType: 'Guide',
  provider: {
    '@type': 'Organization',
    name: 'Substratia',
    url: 'https://substratia.io',
  },
  isAccessibleForFree: true,
  url: 'https://substratia.io/start-here',
}

export default function StartHereLayout({
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
