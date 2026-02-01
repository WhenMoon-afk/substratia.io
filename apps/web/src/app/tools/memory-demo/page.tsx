"use client";

import { useState } from "react";
import Link from "next/link";
import NewsletterCapture from "@/components/NewsletterCapture";
import RelatedTools from "@/components/RelatedTools";
import ChatComparison from "@/components/memory-demo/ChatComparison";
import MemoryBank from "@/components/memory-demo/MemoryBank";
import MemoryDemoCta from "@/components/memory-demo/MemoryDemoCta";

export default function MemoryDemoPage() {
  const [activeTab, setActiveTab] = useState<"without" | "with">("without");

  return (
    <main className="min-h-screen text-white bg-[#0a0a14]">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/tools"
            className="text-forge-cyan hover:underline text-sm mb-4 inline-block"
          >
            &larr; Back to Tools
          </Link>
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            Stop Repeating <span className="text-forge-cyan">Yourself</span>
          </h1>
          <p className="text-gray-400 max-w-2xl text-lg">
            See what happens when Claude actually remembers your preferences.
          </p>
        </div>

        {/* Main Demo */}
        <div className="grid lg:grid-cols-3 gap-6">
          <ChatComparison activeTab={activeTab} onSwitchTab={setActiveTab} />
          <MemoryBank activeTab={activeTab} />
        </div>

        {/* Related Tools */}
        <RelatedTools currentPath="/tools/memory-demo" />

        {/* CTA */}
        <MemoryDemoCta />

        {/* Newsletter */}
        <div className="mt-8 max-w-xl mx-auto">
          <NewsletterCapture source="memory-demo" compact />
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
      `}</style>
    </main>
  );
}
