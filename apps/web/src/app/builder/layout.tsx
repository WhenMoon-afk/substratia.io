import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'AgentForge Builder - Visual CLAUDE.md Generator | Substratia',
  description: 'Drag-and-drop builder for CLAUDE.md and agents.md files. 28 capabilities, 13 guardrail rulesets. Create AI agent configurations visually. Free, no signup.',
  keywords: 'CLAUDE.md builder, agents.md generator, AI agent config, Claude Code configuration, agent capabilities, AI guardrails, visual agent builder',
  openGraph: {
    title: 'AgentForge - Visual AI Agent Builder',
    description: 'Drag-and-drop builder for CLAUDE.md files. 28 capabilities, 13 rulesets. Free, no signup required.',
    type: 'website',
    url: 'https://substratia.io/builder',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AgentForge - Visual AI Agent Builder',
    description: 'Drag-and-drop builder for CLAUDE.md files. 28 capabilities, 13 rulesets. Free.',
  },
}

const breadcrumbLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://substratia.io' },
    { '@type': 'ListItem', position: 2, name: 'Builder', item: 'https://substratia.io/builder' },
  ],
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'AgentForge Builder',
  applicationCategory: 'DeveloperApplication',
  operatingSystem: 'Web',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
  },
  description: 'Drag-and-drop builder for CLAUDE.md files. 28 capabilities, 13 guardrail rulesets.',
  url: 'https://substratia.io/builder',
}

export default function BuilderLayout({
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
