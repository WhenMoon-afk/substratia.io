"use client";

import { useState, useCallback, useEffect } from "react";
import Link from "next/link";
import ShareButton from "@/components/ShareButton";
import { Button } from "@/components/ui/Button";
import { siteConfig } from "@/lib/site-config";
import { faqs, categories, type FAQItem } from "@/data/faqData";
import { useHash } from "@/hooks/useHash";

export default function FAQPage() {
  const hash = useHash();
  const hashFaq = hash ? faqs.find((f) => f.id === hash) : null;

  const [activeCategory, setActiveCategory] = useState("all");
  const [openItems, setOpenItems] = useState<Set<string>>(() =>
    hashFaq ? new Set([hash]) : new Set(),
  );
  const [sharedId, setSharedId] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Scroll to hash-targeted FAQ item after mount
  useEffect(() => {
    if (!hash) return;
    const timer = setTimeout(() => {
      const element = document.getElementById(hash);
      if (element)
        element.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 100);
    return () => clearTimeout(timer);
  }, [hash]);

  const shareFaq = useCallback(async (faq: FAQItem) => {
    const shareUrl = `${window.location.origin}${window.location.pathname}#${faq.id}`;
    await navigator.clipboard.writeText(shareUrl);
    setSharedId(faq.id);
    setTimeout(() => setSharedId(null), 2000);
  }, []);

  const copyAnswer = useCallback(async (faq: FAQItem) => {
    const fullAnswer = faq.code
      ? `Q: ${faq.question}\nA: ${faq.answer} Install with: ${faq.code}`
      : `Q: ${faq.question}\nA: ${faq.answer}`;
    await navigator.clipboard.writeText(fullAnswer);
    setCopiedId(faq.id);
    setTimeout(() => setCopiedId(null), 2000);
  }, []);

  const filteredFaqs =
    activeCategory === "all"
      ? faqs
      : faqs.filter((faq) => faq.category === activeCategory);

  const toggleItem = (id: string) => {
    const newOpenItems = new Set(openItems);
    if (newOpenItems.has(id)) {
      newOpenItems.delete(id);
    } else {
      newOpenItems.add(id);
    }
    setOpenItems(newOpenItems);
  };

  return (
    <main className="min-h-screen text-white relative">
      <div className="neural-bg" />
      <div className="fixed inset-0 gradient-mesh pointer-events-none z-0" />

      <section className="relative z-10 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <Link
                href="/"
                className="text-forge-cyan hover:underline text-sm"
              >
                ← Back to Home
              </Link>
              <ShareButton title="FAQ - Substratia" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold font-display text-center mb-4">
              Frequently Asked{" "}
              <span className="text-forge-cyan">Questions</span>
            </h1>
            <p className="text-gray-400 text-center mb-12">
              Everything you need to know about persistent memory for AI agents.
            </p>

            {/* Category Filter */}
            <div
              className="flex flex-wrap justify-center gap-2 mb-12"
              role="tablist"
              aria-label="Filter FAQ by category"
            >
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  role="tab"
                  aria-selected={activeCategory === cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-4 py-2 rounded-lg text-sm transition-all ${
                    activeCategory === cat.id
                      ? "bg-forge-cyan text-forge-dark font-semibold"
                      : "bg-white/5 hover:bg-white/10 text-gray-300"
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* FAQ Items */}
            <div className="space-y-4">
              {filteredFaqs.map((faq) => (
                <div
                  key={faq.id}
                  id={faq.id}
                  className="glass rounded-xl overflow-hidden scroll-mt-24"
                >
                  <h3>
                    <button
                      onClick={() => toggleItem(faq.id)}
                      aria-expanded={openItems.has(faq.id)}
                      aria-controls={`faq-panel-${faq.id}`}
                      className="w-full px-6 py-4 text-left flex items-center justify-between"
                    >
                      <span className="font-medium pr-4">{faq.question}</span>
                      <svg
                        className={`w-5 h-5 shrink-0 transition-transform ${
                          openItems.has(faq.id) ? "rotate-180" : ""
                        }`}
                        aria-hidden="true"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </button>
                  </h3>
                  {openItems.has(faq.id) && (
                    <div
                      id={`faq-panel-${faq.id}`}
                      role="region"
                      aria-labelledby={faq.id}
                      className="px-6 pb-4"
                    >
                      <div className="text-gray-300 mb-3">
                        {faq.answer}
                        {faq.code && (
                          <>
                            {" "}
                            Install with:{" "}
                            <code className="bg-white/10 px-2 py-0.5 rounded-sm text-sm">
                              {faq.code}
                            </code>
                          </>
                        )}
                      </div>
                      <div className="flex gap-2 pt-2 border-t border-white/10">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            copyAnswer(faq);
                          }}
                          aria-label={
                            copiedId === faq.id
                              ? "Answer copied to clipboard"
                              : `Copy answer to: ${faq.question}`
                          }
                          className={`px-3 py-1 text-xs rounded-lg transition-all ${
                            copiedId === faq.id
                              ? "bg-green-500 text-white"
                              : "bg-white/10 hover:bg-white/20"
                          }`}
                        >
                          {copiedId === faq.id ? "Copied!" : "Copy"}
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            shareFaq(faq);
                          }}
                          aria-label={
                            sharedId === faq.id
                              ? "Link copied to clipboard"
                              : `Share link to: ${faq.question}`
                          }
                          className={`px-3 py-1 text-xs rounded-lg transition-all ${
                            sharedId === faq.id
                              ? "bg-green-500 text-white"
                              : "bg-forge-cyan/20 hover:bg-forge-cyan/30 text-forge-cyan"
                          }`}
                        >
                          {sharedId === faq.id ? "Link Copied!" : "Share"}
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Related Resources */}
            <div className="mt-16 pt-12 border-t border-white/10">
              <h2 className="text-2xl font-bold text-center mb-8">
                Explore More
              </h2>
              <div className="grid md:grid-cols-3 gap-6">
                <Link
                  href="/tools/cheat-sheet"
                  className="glass rounded-xl p-6 hover:border-forge-cyan/50 transition-all text-center"
                >
                  <div className="text-3xl mb-3">📋</div>
                  <h3 className="font-semibold mb-2">Cheat Sheet</h3>
                  <p className="text-sm text-gray-400">
                    Commands, shortcuts, patterns
                  </p>
                </Link>
                <Link
                  href="/blog/context-management-guide"
                  className="glass rounded-xl p-6 hover:border-forge-cyan/50 transition-all text-center"
                >
                  <div className="text-3xl mb-3">📖</div>
                  <h3 className="font-semibold mb-2">Context Guide</h3>
                  <p className="text-sm text-gray-400">
                    Deep dive on context management
                  </p>
                </Link>
                <Link
                  href="/tools"
                  className="glass rounded-xl p-6 hover:border-forge-cyan/50 transition-all text-center"
                >
                  <div className="text-3xl mb-3">🛠️</div>
                  <h3 className="font-semibold mb-2">Free Tools</h3>
                  <p className="text-sm text-gray-400">
                    12 tools, no signup required
                  </p>
                </Link>
              </div>
            </div>

            {/* Still Have Questions */}
            <div className="mt-16 text-center">
              <h2 className="text-2xl font-bold mb-4">Still Have Questions?</h2>
              <p className="text-gray-400 mb-6">
                Can&apos;t find what you&apos;re looking for? Get in touch.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button
                  href={siteConfig.links.github}
                  external
                  variant="primary"
                >
                  GitHub
                </Button>
                <Button href="/docs" variant="secondary">
                  View Documentation
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
