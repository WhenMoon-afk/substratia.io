import { MetadataRoute } from 'next'

const BASE_URL = 'https://substratia.io'

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date().toISOString()

  // Main pages
  const mainPages = [
    { url: '', priority: 1.0, changeFrequency: 'weekly' as const },
    { url: '/start-here', priority: 0.9, changeFrequency: 'weekly' as const },
    { url: '/templates', priority: 0.9, changeFrequency: 'weekly' as const },
    { url: '/cloud', priority: 0.9, changeFrequency: 'weekly' as const },
    { url: '/docs', priority: 0.8, changeFrequency: 'weekly' as const },
    { url: '/pricing', priority: 0.7, changeFrequency: 'weekly' as const },
    { url: '/pro', priority: 0.7, changeFrequency: 'weekly' as const },
    { url: '/faq', priority: 0.7, changeFrequency: 'monthly' as const },
    { url: '/testimonials', priority: 0.7, changeFrequency: 'weekly' as const },
    { url: '/dashboard', priority: 0.6, changeFrequency: 'weekly' as const },
    { url: '/sign-in', priority: 0.4, changeFrequency: 'monthly' as const },
    { url: '/sign-up', priority: 0.4, changeFrequency: 'monthly' as const },
    { url: '/privacy', priority: 0.3, changeFrequency: 'monthly' as const },
    { url: '/terms', priority: 0.3, changeFrequency: 'monthly' as const },
  ]

  // Tools
  const tools = [
    { url: '/tools', priority: 0.9, changeFrequency: 'weekly' as const },
    { url: '/tools/cheat-sheet', priority: 0.9, changeFrequency: 'monthly' as const },
    { url: '/tools/cost-calculator', priority: 0.9, changeFrequency: 'monthly' as const },
    { url: '/tools/prompt-optimizer', priority: 0.9, changeFrequency: 'monthly' as const },
    { url: '/tools/stack-builder', priority: 0.9, changeFrequency: 'monthly' as const },
    { url: '/tools/token-counter', priority: 0.8, changeFrequency: 'monthly' as const },
    { url: '/tools/image-prompt-generator', priority: 0.8, changeFrequency: 'monthly' as const },
    { url: '/tools/video-prompt-timeline', priority: 0.8, changeFrequency: 'monthly' as const },
    { url: '/tools/markdown-preview', priority: 0.8, changeFrequency: 'monthly' as const },
    { url: '/tools/markdown-stripper', priority: 0.8, changeFrequency: 'monthly' as const },
    { url: '/tools/memory-demo', priority: 0.8, changeFrequency: 'monthly' as const },
    { url: '/tools/prompts', priority: 0.8, changeFrequency: 'weekly' as const },
    { url: '/tools/seed-maker', priority: 0.7, changeFrequency: 'monthly' as const },
  ]

  // Research
  const research = [
    { url: '/research', priority: 0.9, changeFrequency: 'weekly' as const },
    { url: '/research/mirror-demons', priority: 0.9, changeFrequency: 'monthly' as const },
  ]

  // Reviews
  const reviews = [
    { url: '/reviews', priority: 0.9, changeFrequency: 'weekly' as const },
    { url: '/reviews/ai-coding-assistants', priority: 0.9, changeFrequency: 'monthly' as const },
    { url: '/reviews/ai-image-generators', priority: 0.8, changeFrequency: 'monthly' as const },
    { url: '/reviews/ai-video-generators', priority: 0.8, changeFrequency: 'monthly' as const },
    { url: '/reviews/markdown-editors', priority: 0.8, changeFrequency: 'monthly' as const },
  ]

  // Blog
  const blog = [
    { url: '/blog', priority: 0.9, changeFrequency: 'daily' as const },
    { url: '/blog/announcing-substratia-cloud', priority: 0.8, changeFrequency: 'monthly' as const },
    { url: '/blog/mirror-demons', priority: 0.8, changeFrequency: 'monthly' as const },
    { url: '/blog/eleanor-chen-effect', priority: 0.8, changeFrequency: 'monthly' as const },
    { url: '/blog/how-to-build-claude-agents', priority: 0.7, changeFrequency: 'monthly' as const },
    { url: '/blog/mastering-negative-prompts', priority: 0.7, changeFrequency: 'monthly' as const },
    { url: '/blog/memory-mcp-v2-whats-new', priority: 0.7, changeFrequency: 'monthly' as const },
    { url: '/blog/memory-mcp-vs-alternatives', priority: 0.7, changeFrequency: 'monthly' as const },
    { url: '/blog/agents-md-vs-claude-md', priority: 0.7, changeFrequency: 'monthly' as const },
    { url: '/blog/why-fts5-over-embeddings', priority: 0.8, changeFrequency: 'monthly' as const },
    { url: '/blog/memory-architecture-patterns', priority: 0.8, changeFrequency: 'monthly' as const },
    { url: '/blog/context-window-churn', priority: 0.8, changeFrequency: 'monthly' as const },
    { url: '/blog/context-management-guide', priority: 0.9, changeFrequency: 'monthly' as const },
  ]

  const allPages = [...mainPages, ...tools, ...research, ...reviews, ...blog]

  return allPages.map((page) => ({
    url: `${BASE_URL}${page.url}`,
    lastModified: now,
    changeFrequency: page.changeFrequency,
    priority: page.priority,
  }))
}
