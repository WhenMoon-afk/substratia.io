import type { Metadata } from 'next'
import { siteUrl, breadcrumb } from '@/lib/site-config'
import { StructuredData } from '@/components/StructuredData'

export const metadata: Metadata = {
  title: 'Claude Code Prompt Optimizer - Build Better AI Prompts | Substratia',
  description: 'Free tool to optimize prompts for Claude Code. Thinking modes (ultrathink, thinkhard), autonomous loops, parallel execution, subagent patterns. Copy-paste ready.',
  keywords: 'Claude Code prompts, ultrathink, thinkhard, Claude Code optimizer, AI prompt builder, autonomous AI loops, parallel subagents, Claude Code tips',
  openGraph: {
    title: 'Claude Code Prompt Optimizer - Build Better AI Prompts',
    description: 'Optimize your Claude Code prompts with thinking modes, autonomous patterns, and parallel execution snippets.',
    type: 'website',
    url: siteUrl('/tools/prompt-optimizer'),
    images: [
      {
        url: siteUrl('/api/og?title=Prompt%20Optimizer&subtitle=Build%20Better%20Claude%20Code%20Prompts'),
        width: 1200,
        height: 630,
        alt: 'Claude Code Prompt Optimizer',
      },
    ],
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
  url: siteUrl('/tools/prompt-optimizer'),
}

const breadcrumbLd = breadcrumb(['Tools', '/tools'], ['Prompt Optimizer', '/tools/prompt-optimizer'])

export default function PromptOptimizerLayout({
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
