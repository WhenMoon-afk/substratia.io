import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Best AI Coding Assistants 2026 - Claude Code vs Cursor vs GitHub Copilot | Substratia',
  description: 'Compare the top AI coding assistants: Claude Code, Cursor, GitHub Copilot, Codeium, and Windsurf. Features, pricing, and which is best for your workflow.',
  keywords: 'Claude Code, Cursor AI, GitHub Copilot, Codeium, Windsurf, AI coding assistant, code completion, AI pair programming, best coding AI',
  openGraph: {
    title: 'Best AI Coding Assistants 2026 - Complete Comparison',
    description: 'Compare Claude Code, Cursor, GitHub Copilot, Codeium, and Windsurf. Find the best AI coding assistant for your needs.',
    type: 'article',
    url: 'https://substratia.io/reviews/ai-coding-assistants',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Best AI Coding Assistants 2026',
    description: 'Compare Claude Code, Cursor, GitHub Copilot, Codeium, and Windsurf.',
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'Best AI Coding Assistants 2026',
  description: 'A comparison of the top AI coding assistants for developers.',
  itemListElement: [
    {
      '@type': 'ListItem',
      position: 1,
      item: {
        '@type': 'SoftwareApplication',
        name: 'Claude Code',
        applicationCategory: 'DeveloperApplication',
        operatingSystem: 'Cross-platform',
        aggregateRating: { '@type': 'AggregateRating', ratingValue: '9', bestRating: '10' },
      },
    },
    {
      '@type': 'ListItem',
      position: 2,
      item: {
        '@type': 'SoftwareApplication',
        name: 'Cursor',
        applicationCategory: 'DeveloperApplication',
        operatingSystem: 'Cross-platform',
        aggregateRating: { '@type': 'AggregateRating', ratingValue: '8', bestRating: '10' },
      },
    },
    {
      '@type': 'ListItem',
      position: 3,
      item: {
        '@type': 'SoftwareApplication',
        name: 'GitHub Copilot',
        applicationCategory: 'DeveloperApplication',
        operatingSystem: 'Cross-platform',
        aggregateRating: { '@type': 'AggregateRating', ratingValue: '7', bestRating: '10' },
      },
    },
    {
      '@type': 'ListItem',
      position: 4,
      item: {
        '@type': 'SoftwareApplication',
        name: 'Codeium',
        applicationCategory: 'DeveloperApplication',
        operatingSystem: 'Cross-platform',
        aggregateRating: { '@type': 'AggregateRating', ratingValue: '7', bestRating: '10' },
      },
    },
    {
      '@type': 'ListItem',
      position: 5,
      item: {
        '@type': 'SoftwareApplication',
        name: 'Windsurf',
        applicationCategory: 'DeveloperApplication',
        operatingSystem: 'Cross-platform',
        aggregateRating: { '@type': 'AggregateRating', ratingValue: '7', bestRating: '10' },
      },
    },
  ],
}

const breadcrumbLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://substratia.io' },
    { '@type': 'ListItem', position: 2, name: 'Reviews', item: 'https://substratia.io/reviews' },
    { '@type': 'ListItem', position: 3, name: 'AI Coding Assistants', item: 'https://substratia.io/reviews/ai-coding-assistants' },
  ],
}

export default function AICodingAssistantsLayout({
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
