import type { Metadata } from 'next'
import { siteUrl, breadcrumb } from '@/lib/site-config'
import { StructuredData } from '@/components/StructuredData'

export const metadata: Metadata = {
  title: 'Token Counter - Estimate Costs for Claude, GPT-4 | Substratia',
  description: 'Free token counter for AI models. Count tokens, estimate costs, and check context window usage for Claude 4.5, GPT-4, and other LLMs. No signup required.',
  keywords: 'token counter, claude token counter, gpt-4 token counter, AI cost calculator, context window calculator, LLM tokens, tiktoken',
  openGraph: {
    title: 'Free Token Counter for Claude & GPT-4',
    description: 'Count tokens and estimate costs for Claude 4.5, GPT-4, and other AI models. 100% free, no signup.',
    type: 'website',
    url: siteUrl('/tools/token-counter'),
    images: [
      {
        url: siteUrl('/api/og?title=Token%20Counter&subtitle=Count%20tokens%20for%20Claude%20%26%20GPT-4'),
        width: 1200,
        height: 630,
        alt: 'Token Counter',
      },
    ],
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
  url: siteUrl('/tools/token-counter'),
}

const breadcrumbLd = breadcrumb(['Tools', '/tools'], ['Token Counter', '/tools/token-counter'])

export default function TokenCounterLayout({
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
