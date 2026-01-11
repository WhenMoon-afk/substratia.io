import type { Metadata } from 'next'
import Script from 'next/script'
import './globals.css'
import Nav from '@/components/Nav'

export const metadata: Metadata = {
  title: 'Substratia - Memory Infrastructure for AI | momentum & memory-mcp',
  description: 'Free, open-source tools that give AI a memory. momentum: context recovery in <5ms (46,000x faster). memory-mcp: persistent memory across sessions. AgentForge: visual agent config builder.',
  keywords: 'AI memory, Claude memory, context recovery, momentum plugin, memory-mcp, CLAUDE.md, agents.md, AI tools, open source AI, Claude Code plugins, persistent AI memory, MCP server',
  openGraph: {
    title: 'Substratia - Give Your AI a Memory That Works',
    description: 'Free tools: momentum (46,000x faster context recovery) + memory-mcp (persistent memory). Open source, MIT licensed.',
    type: 'website',
    url: 'https://substratia.io',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Substratia - Memory Infrastructure for AI',
    description: 'Free, open-source: momentum (context recovery <5ms) + memory-mcp (persistent memory). Stop re-explaining context to Claude.',
  },
  alternates: {
    canonical: 'https://substratia.io',
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Substratia',
  url: 'https://substratia.io',
  logo: 'https://substratia.io/brand/logo-icon.png',
  description: 'Memory infrastructure for AI - open source tools for persistent memory and context recovery',
  sameAs: [
    'https://github.com/WhenMoon-afk',
    'https://skyceres.substack.com',
  ],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <Script
          id="json-ld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      {/* Analytics: Enable Cloudflare Web Analytics in dashboard (free) */}
      {/* Or add Plausible/Umami script here if using external analytics */}
      <body className="antialiased">
        <Nav />
        {children}
      </body>
    </html>
  )
}
