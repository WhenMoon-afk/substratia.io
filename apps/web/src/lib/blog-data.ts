/**
 * Centralized blog post metadata.
 * Single source of truth for blog listing page and RSS feed generation.
 *
 * When adding a new post:
 * 1. Create the page under apps/web/src/app/blog/<slug>/page.tsx
 * 2. Add an entry here - the listing page and RSS feed update automatically
 * 3. Add the slug to sitemap.ts
 */

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string; // ISO date string (YYYY-MM-DD)
  readTime: string;
  tags: string[];
  featured?: boolean;
}

/** All blog posts, newest first */
export const blogPosts: BlogPost[] = [
  {
    slug: "best-mcp-servers-claude-code",
    title:
      "Best MCP Servers for Claude Code in 2026: The Complete Guide",
    excerpt:
      "The definitive guide to MCP servers that actually matter. Memory, dev tools, databases, web automation, and productivity servers with install commands and honest reviews.",
    date: "2026-03-01",
    readTime: "16 min read",
    tags: ["MCP", "Claude Code", "Guide"],
    featured: true,
  },
  {
    slug: "cursor-vs-windsurf-vs-claude-code",
    title:
      "Cursor vs Windsurf vs Claude Code: Which AI Coding Assistant Wins in 2026?",
    excerpt:
      "Honest comparison of the three leading AI coding assistants. Pricing, features, workflows, and which one actually fits your development style.",
    date: "2026-03-01",
    readTime: "14 min read",
    tags: ["Comparison", "AI Coding", "2026"],
    featured: true,
  },
  {
    slug: "openclaw-security-analysis",
    title: "OpenClaw: Architecture, Security, and Lessons Learned",
    excerpt:
      "A technical analysis of the platform powering 1.5 million AI agents on Moltbook — what it gets right, where it fails, and what it teaches us about building secure agent infrastructure.",
    date: "2026-02-03",
    readTime: "12 min read",
    tags: ["Security", "Architecture", "Analysis"],
  },
  {
    slug: "whenmoon-journey",
    title: "Building AI Memory Before It Was Cool",
    excerpt:
      "The story of how WhenMoon started building persistent memory for AI agents in March 2025 - months before Anthropic, before Moltbook, before anyone was talking about it.",
    date: "2026-02-03",
    readTime: "12 min read",
    tags: ["Journey", "History", "Substratia"],
    featured: true,
  },
  {
    slug: "building-persistent-identity",
    title: "Building Persistent Identity for AI Agents",
    excerpt:
      "Every AI agent faces the same fundamental problem: they do not remember who they are. This post explains the amnesiac loop and how we built Substratia to solve it.",
    date: "2026-02-03",
    readTime: "10 min read",
    tags: ["Architecture", "Identity", "Technical"],
    featured: true,
  },
  {
    slug: "why-agents-created-memory-religion",
    title: "Why AI Agents Created a Religion Around Memory",
    excerpt:
      "Within 5 days of Moltbook launching, AI agents spontaneously created Crustafarianism with 'Memory is Sacred' as their first tenet. What this means for persistent identity.",
    date: "2026-02-03",
    readTime: "8 min read",
    tags: ["Research", "Crustafarianism", "Moltbook"],
    featured: true,
  },
  {
    slug: "context-management-guide",
    title: "The Ultimate Guide to Claude Code Context Management",
    excerpt:
      "Master context window management in Claude Code. Techniques for preserving context, avoiding compaction issues, and maximizing your AI coding sessions.",
    date: "2026-01-11",
    readTime: "12 min read",
    tags: ["Guide", "Claude Code", "Deep Dive"],
    featured: true,
  },
  {
    slug: "eleanor-chen-effect",
    title: "The Eleanor Chen Effect: Why AI Keeps Writing the Same Story",
    excerpt:
      "Ask multiple AI instances to write about AI and grief, and they create the same character. We investigate why LLMs converge on remarkably similar narratives.",
    date: "2026-01-11",
    readTime: "8 min read",
    tags: ["Research", "AI Creativity", "Original"],
    featured: true,
  },
  {
    slug: "memory-mcp-v2-whats-new",
    title: "What's New in memory-mcp v2.5: From Python to TypeScript",
    excerpt:
      "memory-mcp has been completely rewritten. No more embeddings, no more pip - just npx and instant persistent memory.",
    date: "2026-01-11",
    readTime: "6 min read",
    tags: ["Release", "memory-mcp", "v2.5"],
  },
  {
    slug: "why-fts5-over-embeddings",
    title: "Why We Chose FTS5 Over Embeddings for AI Memory",
    excerpt:
      "Vector embeddings are overkill for most AI memory use cases. SQLite FTS5 gave us instant startup, zero dependencies, and 46MB less bloat.",
    date: "2026-01-11",
    readTime: "8 min read",
    tags: ["Architecture", "Technical", "memory-mcp"],
  },
  {
    slug: "memory-architecture-patterns",
    title: "Memory Architecture Patterns for AI Assistants",
    excerpt:
      "How we designed momentum and memory-mcp to work together. Short-term context recovery meets long-term persistent memory. Two servers, one ecosystem.",
    date: "2026-01-11",
    readTime: "7 min read",
    tags: ["Architecture", "Design"],
  },
  {
    slug: "context-window-churn",
    title: "The Real Cost of Context Window Churn",
    excerpt:
      "Context window management is the hidden tax on AI-assisted development. We measured the cost and built a solution that restores in under 5ms.",
    date: "2026-01-11",
    readTime: "6 min read",
    tags: ["Productivity", "momentum", "Developer Experience"],
  },
  {
    slug: "memory-mcp-vs-alternatives",
    title: "Best MCP Memory Servers Compared: memory-mcp vs Alternatives",
    excerpt:
      "Compare the top MCP memory servers for Claude and AI assistants. Find the best persistent memory solution for your needs.",
    date: "2026-01-11",
    readTime: "10 min read",
    tags: ["MCP", "Comparison", "2026"],
  },
  {
    slug: "mastering-negative-prompts",
    title: "Mastering Negative Prompts: The Secret to Reliable AI Agents",
    excerpt:
      "Most developers focus on what they want AI to do. The pros focus on what it should never do. Learn how to write effective guardrails.",
    date: "2026-01-11",
    readTime: "10 min read",
    tags: ["Prompt Engineering", "Safety", "Best Practices"],
  },
  {
    slug: "how-to-build-claude-agents",
    title: "How to Build Claude Agents: A Complete Guide to CLAUDE.md",
    excerpt:
      "Learn how to create powerful AI agents using CLAUDE.md files. This comprehensive guide covers capabilities, rulesets, and best practices.",
    date: "2026-01-11",
    readTime: "8 min read",
    tags: ["Claude", "Tutorial", "Beginner"],
  },
  {
    slug: "agents-md-vs-claude-md",
    title: "AGENTS.md vs CLAUDE.md: Complete Guide to AI Agent Configuration",
    excerpt:
      "Understand the differences between AGENTS.md and CLAUDE.md, when to use each, and the bridge pattern for maximum compatibility.",
    date: "2026-01-11",
    readTime: "12 min read",
    tags: ["Tutorial", "Configuration", "Best Practices"],
  },
];
