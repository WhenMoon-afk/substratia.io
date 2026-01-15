import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Free AI Tools - Stack Builder, Claude Code Calculator, Prompt Optimizer | Substratia',
  description: 'Free tools for developers: stack builder, Claude Code cost calculator, prompt optimizer, token counter, image/video prompt builders, markdown tools. No signup required.',
  keywords: ['stack builder', 'tech stack selector', 'Claude Code cost', 'Claude Code prompts', 'ultrathink', 'token counter', 'AI tools', 'full stack builder', 'web development stack'],
  openGraph: {
    title: 'Free AI Tools for Developers',
    description: '12 free tools for AI-assisted development. No signup required.',
    type: 'website',
    url: 'https://substratia.io/tools',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free AI Tools for Developers',
    description: '12 free tools: stack builder, cost calculator, prompt optimizer, and more.',
  },
}

const breadcrumbLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://substratia.io' },
    { '@type': 'ListItem', position: 2, name: 'Tools', item: 'https://substratia.io/tools' },
  ],
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name: 'Free AI Tools for Developers',
  description: 'Free tools for developers: stack builder, Claude Code cost calculator, prompt optimizer, token counter, and more.',
  url: 'https://substratia.io/tools',
  mainEntity: {
    '@type': 'ItemList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Claude Code Cheat Sheet', url: 'https://substratia.io/tools/cheat-sheet' },
      { '@type': 'ListItem', position: 2, name: 'Claude Code Cost Calculator', url: 'https://substratia.io/tools/cost-calculator' },
      { '@type': 'ListItem', position: 3, name: 'Claude Code Prompt Optimizer', url: 'https://substratia.io/tools/prompt-optimizer' },
      { '@type': 'ListItem', position: 4, name: 'Stack Builder', url: 'https://substratia.io/tools/stack-builder' },
      { '@type': 'ListItem', position: 5, name: 'Token Counter', url: 'https://substratia.io/tools/token-counter' },
      { '@type': 'ListItem', position: 6, name: 'Prompt Library', url: 'https://substratia.io/tools/prompts' },
      { '@type': 'ListItem', position: 7, name: 'Seed Maker', url: 'https://substratia.io/tools/seed-maker' },
      { '@type': 'ListItem', position: 8, name: 'Image Prompt Generator', url: 'https://substratia.io/tools/image-prompt-generator' },
      { '@type': 'ListItem', position: 9, name: 'Video Prompt Timeline', url: 'https://substratia.io/tools/video-prompt-timeline' },
      { '@type': 'ListItem', position: 10, name: 'Markdown Preview', url: 'https://substratia.io/tools/markdown-preview' },
      { '@type': 'ListItem', position: 11, name: 'Markdown Stripper', url: 'https://substratia.io/tools/markdown-stripper' },
    ],
  },
}

export default function ToolsLayout({
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
