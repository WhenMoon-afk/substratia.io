"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import ShareButton from "@/components/ShareButton";
import CtaSection from "@/components/home/CtaSection";

const posts = [
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

function SectionDivider({ variant = "cyan" }: { variant?: "cyan" | "purple" }) {
  const gradient =
    variant === "cyan"
      ? "from-transparent via-forge-cyan/20 to-transparent"
      : "from-transparent via-forge-purple/20 to-transparent";

  return (
    <div className="relative z-10 py-1" aria-hidden="true">
      <div className={`h-px bg-gradient-to-r ${gradient} max-w-4xl mx-auto`} />
    </div>
  );
}

export default function BlogPage() {
  const [sharedSlug, setSharedSlug] = useState<string | null>(null);

  const sharePost = useCallback(async (post: (typeof posts)[0]) => {
    const shareUrl = `${window.location.origin}/blog/${post.slug}`;
    await navigator.clipboard.writeText(shareUrl);
    setSharedSlug(post.slug);
    setTimeout(() => setSharedSlug(null), 2000);
  }, []);

  const featuredPosts = posts.filter((p) => p.featured);
  const regularPosts = posts.filter((p) => !p.featured);

  return (
    <main className="min-h-screen text-white relative">
      <div className="neural-bg" />
      <div className="fixed inset-0 gradient-mesh pointer-events-none z-0" />

      {/* Header */}
      <section className="relative z-10 pt-16 pb-12">
        <div className="container mx-auto px-4">
          <div className="flex justify-end mb-4 max-w-4xl mx-auto">
            <ShareButton title="Blog - Substratia" />
          </div>
          <div className="max-w-4xl mx-auto text-center animate-fade-up">
            <div className="inline-block px-4 py-1 bg-forge-cyan/20 border border-forge-cyan/50 rounded-full text-sm text-forge-cyan mb-4">
              Tutorials &amp; Guides
            </div>
            <h1 className="text-4xl md:text-5xl font-bold font-display mb-4">
              <span className="hero-gradient-text">Blog</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Tutorials, tips, and best practices for building AI agents.
            </p>
          </div>
        </div>
      </section>

      <SectionDivider variant="cyan" />

      {/* Featured Posts */}
      {featuredPosts.length > 0 && (
        <section className="relative z-10 py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-sm font-semibold text-forge-cyan uppercase tracking-wider mb-6 animate-fade-up">
                Featured
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                {featuredPosts.map((post, i) => (
                  <article
                    key={post.slug}
                    className="group glass gradient-border rounded-xl p-6 transition-all hover:scale-[1.01] animate-fade-up"
                    style={{ animationDelay: `${i * 100}ms` }}
                  >
                    <div className="flex flex-wrap gap-2 mb-3">
                      {post.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-xs px-2 py-1 bg-forge-purple/20 text-forge-purple rounded"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <Link href={`/blog/${post.slug}`}>
                      <h3 className="text-xl font-bold mb-2 group-hover:text-forge-cyan transition-colors">
                        {post.title}
                      </h3>
                    </Link>
                    <p className="text-gray-400 text-sm mb-4 leading-relaxed">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3 text-sm text-gray-500">
                        <span>{post.date}</span>
                        <span className="text-forge-cyan/50">|</span>
                        <span>{post.readTime}</span>
                      </div>
                      <button
                        onClick={() => sharePost(post)}
                        className={`px-3 py-1 text-xs rounded-xl transition-all ${
                          sharedSlug === post.slug
                            ? "bg-green-500 text-white"
                            : "bg-forge-cyan/20 hover:bg-forge-cyan/30 text-forge-cyan"
                        }`}
                      >
                        {sharedSlug === post.slug ? "Copied!" : "Share"}
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      <SectionDivider variant="purple" />

      {/* All Posts */}
      <section className="relative z-10 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto space-y-6">
            {regularPosts.map((post, i) => (
              <article
                key={post.slug}
                className="group glass rounded-xl p-6 transition-all hover:border-forge-purple/50 hover:scale-[1.005] animate-fade-up"
                style={{ animationDelay: `${Math.min(i * 75, 300)}ms` }}
              >
                <div className="flex flex-wrap gap-2 mb-3">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-2 py-1 bg-forge-purple/20 text-forge-purple rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <Link href={`/blog/${post.slug}`}>
                  <h2 className="text-xl font-semibold mb-2 group-hover:text-forge-cyan transition-colors">
                    {post.title}
                  </h2>
                </Link>
                <p className="text-gray-400 text-sm mb-4 leading-relaxed">
                  {post.excerpt}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 text-sm text-gray-500">
                    <span>{post.date}</span>
                    <span className="text-forge-cyan/50">|</span>
                    <span>{post.readTime}</span>
                  </div>
                  <button
                    onClick={() => sharePost(post)}
                    className={`px-3 py-1 text-xs rounded-xl transition-all ${
                      sharedSlug === post.slug
                        ? "bg-green-500 text-white"
                        : "bg-forge-cyan/20 hover:bg-forge-cyan/30 text-forge-cyan"
                    }`}
                  >
                    {sharedSlug === post.slug ? "Copied!" : "Share"}
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <SectionDivider variant="cyan" />

      {/* CTA */}
      <CtaSection />
    </main>
  );
}
