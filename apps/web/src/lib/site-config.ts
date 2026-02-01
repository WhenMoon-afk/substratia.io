/**
 * Centralized site configuration.
 * Single source of truth for URLs, brand info, and social links.
 */

export const SITE_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://substratia.io'

const GITHUB_ORG = 'https://github.com/WhenMoon-afk'

export const siteConfig = {
  name: 'Substratia',
  url: SITE_URL,
  title: 'Substratia - Open-Source Developer Tools for Claude Code',
  description:
    'Free, open-source tools for Claude Code power users. memory-mcp: persistent memory across sessions. Plus 12+ free dev utilities.',
  shortDescription:
    'Open-source developer tools for Claude Code — persistent memory, visual agent config, and free dev utilities',
  keywords:
    'Claude Code tools, open source AI tools, memory-mcp, CLAUDE.md, AI developer tools, Claude Code plugins, MCP server, persistent AI memory',
  brand: {
    logo: '/brand/logo-icon.png',
    social: '/brand/social.png',
  },
  links: {
    github: GITHUB_ORG,
    newsletter: 'https://skyceres.substack.com',
    repos: {
      website: `${GITHUB_ORG}/substratia.io`,
      momentum: `${GITHUB_ORG}/momentum`,
      memoryMcp: `${GITHUB_ORG}/claude-memory-mcp`,
      mirrorDemons: `${GITHUB_ORG}/mirror-demons-research`,
      eleanorChenEffect: `${GITHUB_ORG}/eleanor-chen-effect`,
    },
  },
  analytics: {
    plausibleDomain: 'substratia.io',
  },
} as const

/** Fully qualified URL for a given path */
export function siteUrl(path: string = ''): string {
  return `${SITE_URL}${path}`
}

/**
 * Build a Schema.org BreadcrumbList from label/path pairs.
 *
 * Home is always prepended automatically.  Example:
 *
 *   breadcrumb(['Tools', '/tools'], ['Cheat Sheet', '/tools/cheat-sheet'])
 */
export function breadcrumb(
  ...items: [name: string, path: string][]
): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: siteUrl() },
      ...items.map(([name, path], i) => ({
        '@type': 'ListItem',
        position: i + 2,
        name,
        item: siteUrl(path),
      })),
    ],
  }
}

/** Newsletter subscription URL with UTM tracking */
export function newsletterUrl(email: string, source: string): string {
  return `${siteConfig.links.newsletter}/subscribe?email=${encodeURIComponent(email)}&utm_source=substratia&utm_medium=${encodeURIComponent(source)}`
}
