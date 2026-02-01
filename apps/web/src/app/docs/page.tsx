"use client";

import { useEffect } from "react";
import ShareButton from "@/components/ShareButton";
import DocsSidebar from "@/components/docs/DocsSidebar";
import DocsSection from "@/components/docs/DocsSection";
import RelatedResources from "@/components/docs/RelatedResources";
import { sections } from "@/data/docsData";

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
    <main className="min-h-screen text-white py-12">
      <div className="container mx-auto px-4">
        <div className="flex justify-end mb-4 max-w-6xl mx-auto">
          <ShareButton title="Documentation - Substratia" />
        </div>
        <div className="flex gap-12 max-w-6xl mx-auto">
          <DocsSidebar sections={sections} />

          {/* Main Content */}
          <div className="flex-1 min-w-0">
            <h1 className="text-4xl font-bold mb-4">Documentation</h1>
            <p className="text-xl text-gray-400 mb-12">
              Everything you need to know about Substratia&apos;s memory tools
              and developer utilities.
            </p>

            {sections.map((section) => (
              <DocsSection key={section.id} section={section} />
            ))}

            <RelatedResources />
          </div>
        </div>
      </div>
    </main>
  );
}
