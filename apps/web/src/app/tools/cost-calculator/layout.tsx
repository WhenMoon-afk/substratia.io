import type { Metadata } from 'next'
import { siteUrl, breadcrumb } from '@/lib/site-config'
import { StructuredData } from '@/components/StructuredData'

export const metadata: Metadata = {
  title: 'Claude Code Cost Calculator - API vs Subscription | Substratia',
  description: 'Calculate your Claude Code costs. Compare API pricing vs subscription plans. Track sessions, visualize usage, and find the most cost-effective option.',
  keywords: 'Claude Code cost, Claude API pricing, Claude Max subscription, Claude cost calculator, API vs subscription, Claude token cost',
  openGraph: {
    title: 'Claude Code Cost Calculator - API vs Subscription',
    description: 'Calculate your Claude Code costs. Compare API pricing vs subscription plans. Find the most cost-effective option.',
    type: 'website',
    url: siteUrl('/tools/cost-calculator'),
    images: [
      {
        url: siteUrl('/api/og?title=Claude%20Code%20Cost%20Calculator&subtitle=API%20vs%20Subscription%20Comparison'),
        width: 1200,
        height: 630,
        alt: 'Claude Code Cost Calculator',
      },
    ],
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
  url: siteUrl('/tools/cost-calculator'),
}

const breadcrumbLd = breadcrumb(['Tools', '/tools'], ['Cost Calculator', '/tools/cost-calculator'])

export default function CostCalculatorLayout({
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
