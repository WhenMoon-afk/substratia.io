import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Claude Code Cheat Sheet | Essential Commands & Tips',
  description: 'The ultimate Claude Code reference. Slash commands, keyboard shortcuts, CLAUDE.md tips, MCP configuration, and power user techniques. Free to download.',
  keywords: ['Claude Code cheat sheet', 'Claude Code commands', 'Claude Code shortcuts', 'CLAUDE.md reference', 'Claude Code tips', 'AI coding assistant guide'],
  openGraph: {
    title: 'Claude Code Cheat Sheet | Essential Commands & Tips',
    description: 'The ultimate Claude Code reference. Slash commands, shortcuts, CLAUDE.md tips, and more.',
    type: 'website',
    url: 'https://substratia.io/tools/cheat-sheet',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Claude Code Cheat Sheet',
    description: 'The ultimate Claude Code quick reference guide.',
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Claude Code Cheat Sheet',
  applicationCategory: 'DeveloperApplication',
  operatingSystem: 'Web',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
  },
  description: 'Essential Claude Code reference with commands, shortcuts, and CLAUDE.md tips.',
  url: 'https://substratia.io/tools/cheat-sheet',
}

const breadcrumbLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://substratia.io' },
    { '@type': 'ListItem', position: 2, name: 'Tools', item: 'https://substratia.io/tools' },
    { '@type': 'ListItem', position: 3, name: 'Cheat Sheet', item: 'https://substratia.io/tools/cheat-sheet' },
  ],
}

export default function CheatSheetLayout({
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
