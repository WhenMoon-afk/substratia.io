import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Token Counter - Estimate Costs for Claude, GPT-4 | Substratia',
  description: 'Free token counter for AI models. Count tokens, estimate costs, and check context window usage for Claude 4.5, GPT-4, and other LLMs. No signup required.',
  keywords: 'token counter, claude token counter, gpt-4 token counter, AI cost calculator, context window calculator, LLM tokens, tiktoken',
  openGraph: {
    title: 'Free Token Counter for Claude & GPT-4',
    description: 'Count tokens and estimate costs for Claude 4.5, GPT-4, and other AI models. 100% free, no signup.',
    type: 'website',
    url: 'https://substratia.io/tools/token-counter',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Token Counter for Claude & GPT-4',
    description: 'Count tokens and estimate costs for AI models. 100% free, no signup.',
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Token Counter',
  applicationCategory: 'DeveloperApplication',
  operatingSystem: 'Web',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
  },
  description: 'Count tokens and estimate costs for Claude, GPT-4, and other AI models.',
  url: 'https://substratia.io/tools/token-counter',
}

const breadcrumbLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://substratia.io' },
    { '@type': 'ListItem', position: 2, name: 'Tools', item: 'https://substratia.io/tools' },
    { '@type': 'ListItem', position: 3, name: 'Token Counter', item: 'https://substratia.io/tools/token-counter' },
  ],
}

export default function TokenCounterLayout({
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
