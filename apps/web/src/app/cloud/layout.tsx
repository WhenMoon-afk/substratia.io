import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Substratia - Open Source Developer Tools for Claude Code',
  description: 'Free, open source developer tools for Claude Code. memory-mcp, momentum, and more. All MIT licensed.',
  keywords: [
    'Claude Code tools',
    'open source',
    'developer tools',
    'memory-mcp',
    'momentum',
    'AI memory',
    'Substratia'
  ],
  openGraph: {
    title: 'Substratia - Open Source Developer Tools',
    description: 'Free, open source developer tools for Claude Code. Built by developers, for developers.',
    type: 'website',
    url: 'https://substratia.io/cloud',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Substratia - Open Source Developer Tools',
    description: 'Free, open source developer tools for Claude Code. Built by developers, for developers.',
  },
}

export default function CloudLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
