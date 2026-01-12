import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Claude Code Cost Calculator - API vs Subscription | Substratia',
  description: 'Calculate your Claude Code costs. Compare API pricing vs subscription plans. Track sessions, visualize usage, and find the most cost-effective option.',
  keywords: 'Claude Code cost, Claude API pricing, Claude Max subscription, Claude cost calculator, API vs subscription, Claude token cost',
  openGraph: {
    title: 'Claude Code Cost Calculator - API vs Subscription',
    description: 'Calculate your Claude Code costs. Compare API pricing vs subscription plans. Find the most cost-effective option.',
    type: 'website',
    url: 'https://substratia.io/tools/cost-calculator',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Claude Code Cost Calculator',
    description: 'Compare API pricing vs subscription plans. Find the most cost-effective option.',
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Claude Code Cost Calculator',
  applicationCategory: 'DeveloperApplication',
  operatingSystem: 'Web',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
  },
  description: 'Calculate and compare Claude Code API vs subscription costs.',
  url: 'https://substratia.io/tools/cost-calculator',
}

export default function CostCalculatorLayout({
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
