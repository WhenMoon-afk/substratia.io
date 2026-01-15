import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'FAQ - Claude Code & Memory Tools | Substratia',
  description: 'Frequently asked questions about Claude Code, momentum, memory-mcp, and our consulting services. Get answers to common questions.',
  keywords: ['Claude Code FAQ', 'momentum FAQ', 'memory-mcp FAQ', 'MCP server questions', 'Claude Code help'],
  openGraph: {
    title: 'FAQ - Claude Code & Memory Tools',
    description: 'Get answers to common questions about Claude Code and memory tools.',
    type: 'website',
    url: 'https://substratia.io/faq',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FAQ - Claude Code & Memory Tools',
    description: 'Answers to common questions about Claude Code, momentum, and memory-mcp.',
  },
}

const breadcrumbLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://substratia.io' },
    { '@type': 'ListItem', position: 2, name: 'FAQ', item: 'https://substratia.io/faq' },
  ],
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is Claude Code?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Claude Code is Anthropic\'s official CLI tool for AI-assisted software development. It allows developers to interact with Claude directly from the terminal to write, edit, and debug code.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is momentum?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'momentum is a free, open-source Claude Code plugin for fast context recovery. It takes snapshots of your work and can restore them in under 5 milliseconds after using /clear.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is memory-mcp?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'memory-mcp is a free, open-source MCP server that gives Claude persistent memory across sessions. It uses SQLite with FTS5 full-text search for efficient storage and retrieval.',
      },
    },
    {
      '@type': 'Question',
      name: 'Are these tools free?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, all tools (momentum, memory-mcp, and the web tools at substratia.io/tools) are completely free and open source under the MIT license.',
      },
    },
    {
      '@type': 'Question',
      name: 'Do you offer consulting?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, we offer Claude Code consulting services including setup sessions ($200), team workshops ($1,500), and ongoing advisory packages. Visit substratia.io/consulting for details.',
      },
    },
  ],
}

export default function FAQLayout({
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
