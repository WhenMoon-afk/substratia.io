import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Claude Code Prompt Optimizer - Build Better AI Prompts | Substratia',
  description: 'Free tool to optimize prompts for Claude Code. Thinking modes (ultrathink, thinkhard), autonomous loops, parallel execution, subagent patterns. Copy-paste ready.',
  keywords: 'Claude Code prompts, ultrathink, thinkhard, Claude Code optimizer, AI prompt builder, autonomous AI loops, parallel subagents, Claude Code tips',
  openGraph: {
    title: 'Claude Code Prompt Optimizer - Build Better AI Prompts',
    description: 'Optimize your Claude Code prompts with thinking modes, autonomous patterns, and parallel execution snippets.',
    type: 'website',
    url: 'https://substratia.io/tools/prompt-optimizer',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Claude Code Prompt Optimizer',
    description: 'Build prompts with ultrathink, autonomous loops, and parallel execution.',
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Claude Code Prompt Optimizer',
  applicationCategory: 'DeveloperApplication',
  operatingSystem: 'Web',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
  },
  description: 'Build optimized prompts for Claude Code with thinking modes and autonomous patterns.',
  url: 'https://substratia.io/tools/prompt-optimizer',
}

const breadcrumbLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://substratia.io' },
    { '@type': 'ListItem', position: 2, name: 'Tools', item: 'https://substratia.io/tools' },
    { '@type': 'ListItem', position: 3, name: 'Prompt Optimizer', item: 'https://substratia.io/tools/prompt-optimizer' },
  ],
}

export default function PromptOptimizerLayout({
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
