import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Claude Code Consulting | Expert Setup, Training & Advisory',
  description: 'Get expert help with Claude Code. From initial setup and CLAUDE.md configuration to team workshops and ongoing advisory. Book a session today.',
  keywords: ['Claude Code consulting', 'Claude Code training', 'AI coding assistant help', 'CLAUDE.md expert', 'Claude Code workshop', 'AI developer training'],
  openGraph: {
    title: 'Claude Code Consulting | Expert Setup, Training & Advisory',
    description: 'Get expert help with Claude Code. From initial setup to team workshops.',
    type: 'website',
    url: 'https://substratia.io/consulting',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Claude Code Consulting',
    description: 'Expert help with Claude Code setup, training, and advisory.',
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Claude Code Consulting',
  description: 'Expert consulting services for Claude Code including setup, training, and ongoing advisory.',
  provider: {
    '@type': 'Organization',
    name: 'Substratia',
    url: 'https://substratia.io',
  },
  serviceType: 'AI Development Consulting',
  areaServed: 'Worldwide',
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Claude Code Consulting Services',
    itemListElement: [
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Claude Code Audit',
          description: '1-hour review of your setup, CLAUDE.md, and workflows with actionable recommendations.',
        },
        price: '150',
        priceCurrency: 'USD',
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Setup Session',
          description: '1.5-hour hands-on configuration of Claude Code for your specific needs.',
        },
        price: '200',
        priceCurrency: 'USD',
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Team Workshop',
          description: 'Half-day training for 5-15 developers covering fundamentals and team-specific workflows.',
        },
        price: '1500',
        priceCurrency: 'USD',
      },
    ],
  },
}

export default function ConsultingLayout({
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
