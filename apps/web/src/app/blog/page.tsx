"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import ShareButton from "@/components/ShareButton";
import CtaSection from "@/components/home/CtaSection";
import { blogPosts as posts } from "@/lib/blog-data";
import { SectionDivider } from "@/components/SectionDivider";

export default function BlogPage() {
  const [sharedSlug, setSharedSlug] = useState<string | null>(null);

  const sharePost = useCallback(async (post: (typeof posts)[0]) => {
    try {
      const shareUrl = `${window.location.origin}/blog/${post.slug}`;
      await navigator.clipboard.writeText(shareUrl);
      setSharedSlug(post.slug);
      setTimeout(() => setSharedSlug(null), 2000);
    } catch {
      // Clipboard unavailable - fall back to native share or silently fail
      const shareUrl = `${window.location.origin}/blog/${post.slug}`;
      if (navigator.share) {
        navigator.share({ title: post.title, url: shareUrl }).catch(() => {});
      }
    }
  }, []);

  const featuredPosts = posts.filter((p) => p.featured);
  const regularPosts = posts.filter((p) => !p.featured);

  return (
    <main className="min-h-screen text-white relative">
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
                          className="text-xs px-2 py-1 bg-forge-purple/20 text-forge-purple rounded-sm"
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
                      className="text-xs px-2 py-1 bg-forge-purple/20 text-forge-purple rounded-sm"
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
