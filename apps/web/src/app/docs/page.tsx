"use client";

import { useEffect, useState } from "react";
import ShareButton from "@/components/ShareButton";
import DocsSidebar from "@/components/docs/DocsSidebar";
import DocsSection from "@/components/docs/DocsSection";
import RelatedResources from "@/components/docs/RelatedResources";
import CtaSection from "@/components/home/CtaSection";
import { sections } from "@/data/docsData";
import { SectionDivider } from "@/components/SectionDivider";

function MobileTableOfContents() {
  const [open, setOpen] = useState(false);

  return (
    <div className="lg:hidden mb-8 animate-fade-up">
      <button
        onClick={() => setOpen(!open)}
        className="w-full glass rounded-xl px-5 py-3 flex items-center justify-between text-sm font-medium text-forge-cyan"
      >
        <span>On this page</span>
        <svg
          className={`w-4 h-4 transition-transform ${open ? "rotate-180" : ""}`}
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
      {open && (
        <nav className="glass rounded-xl mt-2 p-4 space-y-2">
          {sections.map((section) => (
            <a
              key={section.id}
              href={`#${section.id}`}
              onClick={() => setOpen(false)}
              className="block text-sm text-gray-400 hover:text-white transition-colors py-1"
            >
              {section.title}
            </a>
          ))}
        </nav>
      )}
    </div>
  );
}

export default function DocsPage() {
  // Handle URL hash navigation on mount
  useEffect(() => {
    if (typeof window === "undefined") return;
    const hash = window.location.hash.slice(1);
    if (hash) {
      setTimeout(() => {
        const element = document.getElementById(hash);
        if (element)
          element.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
    }
  }, []);

  return (
    <main className="min-h-screen text-white relative">
      <div className="neural-bg" />
      <div className="fixed inset-0 gradient-mesh pointer-events-none z-0" />

      {/* Header */}
      <section className="relative z-10 pt-16 pb-12">
        <div className="container mx-auto px-4">
          <div className="flex justify-end mb-4 max-w-6xl mx-auto">
            <ShareButton title="Documentation - Substratia" />
          </div>
          <div className="max-w-6xl mx-auto text-center animate-fade-up">
            <div className="inline-block px-4 py-1 bg-forge-cyan/20 border border-forge-cyan/50 rounded-full text-sm text-forge-cyan mb-4">
              Reference
            </div>
            <h1 className="text-4xl md:text-5xl font-bold font-display mb-4">
              <span className="hero-gradient-text">Documentation</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Everything you need to know about Substratia&apos;s memory tools
              and developer utilities.
            </p>
          </div>
        </div>
      </section>

      <SectionDivider variant="purple" />

      {/* Content */}
      <section className="relative z-10 py-12">
        <div className="container mx-auto px-4">
          <div className="flex gap-12 max-w-6xl mx-auto">
            <DocsSidebar sections={sections} />

            {/* Main Content */}
            <div className="flex-1 min-w-0">
              <MobileTableOfContents />
              {sections.map((section) => (
                <DocsSection key={section.id} section={section} />
              ))}

              <SectionDivider variant="cyan" />

              <RelatedResources />
            </div>
          </div>
        </div>
      </section>

      <SectionDivider variant="purple" />

      <CtaSection />
    </main>
  );
}
