import type { Metadata } from 'next'
import { siteUrl, breadcrumb } from '@/lib/site-config'
import { StructuredData } from '@/components/StructuredData'

export const metadata: Metadata = {
  title: 'Claude Code Cheat Sheet | Essential Commands & Tips',
  description: 'The ultimate Claude Code reference. Slash commands, keyboard shortcuts, CLAUDE.md tips, MCP configuration, and power user techniques. Free to download.',
  keywords: ['Claude Code cheat sheet', 'Claude Code commands', 'Claude Code shortcuts', 'CLAUDE.md reference', 'Claude Code tips', 'AI coding assistant guide'],
  openGraph: {
    title: 'Claude Code Cheat Sheet | Essential Commands & Tips',
    description: 'The ultimate Claude Code reference. Slash commands, shortcuts, CLAUDE.md tips, and more.',
    type: 'website',
    url: siteUrl('/tools/cheat-sheet'),
    images: [
      {
        url: siteUrl('/api/og?title=Claude%20Code%20Cheat%20Sheet&subtitle=Commands%2C%20Shortcuts%20%26%20Tips'),
        width: 1200,
        height: 630,
        alt: 'Claude Code Cheat Sheet',
      },
    ],
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
  url: siteUrl('/tools/cheat-sheet'),
}

const breadcrumbLd = breadcrumb(['Tools', '/tools'], ['Cheat Sheet', '/tools/cheat-sheet'])

export default function CheatSheetLayout({
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
