/**
 * Centralized site configuration.
 * Single source of truth for URLs, brand info, and social links.
 */

export const SITE_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://substratia.io'

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
    github: 'https://github.com/WhenMoon-afk',
    newsletter: 'https://skyceres.substack.com',
  },
  analytics: {
    plausibleDomain: 'substratia.io',
  },
} as const

/** Fully qualified URL for a given path */
export function siteUrl(path: string = ''): string {
  return `${SITE_URL}${path}`
}
