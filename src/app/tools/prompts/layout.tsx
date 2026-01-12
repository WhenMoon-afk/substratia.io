import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Prompt Library - 24 Curated AI Prompts | Substratia',
  description: 'Free prompt library with 24 battle-tested prompts for communication, creativity, productivity, and Claude Code workflows. Click to copy. Works with Claude, GPT-4, and other AI models.',
  keywords: 'AI prompts, Claude prompts, GPT prompts, prompt library, prompt templates, AI productivity, prompt engineering',
  openGraph: {
    title: 'Free Prompt Library - 24 Curated AI Prompts',
    description: 'Battle-tested prompts for communication, creativity, and productivity. Click to copy. Works with any AI.',
    type: 'website',
    url: 'https://substratia.io/tools/prompts',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free AI Prompt Library',
    description: '24 battle-tested prompts. Click to copy. Works with Claude, GPT-4, and more.',
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Prompt Library',
  applicationCategory: 'DeveloperApplication',
  operatingSystem: 'Web',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
  },
  description: 'Free prompt library with 24 battle-tested prompts for communication, creativity, and productivity.',
  url: 'https://substratia.io/tools/prompts',
}

export default function PromptsLayout({
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
      {children}
    </>
  )
}
