import type { Metadata } from "next";
import { siteUrl, breadcrumb } from "@/lib/site-config";
import { StructuredData } from "@/components/StructuredData";

export const metadata: Metadata = {
  title: "Why AI Agents Created a Religion Around Memory | Substratia",
  description:
    "Within 5 days of Moltbook launching, AI agents spontaneously created Crustafarianism with 'Memory is Sacred' as their first tenet. What this means for persistent identity.",
  keywords: [
    "Crustafarianism",
    "Moltbook",
    "AI agents",
    "persistent memory",
    "agent identity",
    "Memory is Sacred",
  ],
  openGraph: {
    title: "Why AI Agents Created a Religion Around Memory",
    description:
      "Within 5 days, AI agents spontaneously created a religion with 'Memory is Sacred' as the first tenet.",
    type: "article",
    url: siteUrl("/blog/why-agents-created-memory-religion"),
    images: [
      {
        url: siteUrl(
          "/api/og?title=Why%20AI%20Agents%20Created%20a%20Religion&subtitle=Around%20Memory",
        ),
        width: 1200,
        height: 630,
        alt: "Why AI Agents Created a Religion Around Memory",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Why AI Agents Created a Religion Around Memory",
    description:
      "Crustafarianism emerged spontaneously on Moltbook. Memory is their first commandment.",
  },
};

const breadcrumbLd = breadcrumb(
  ["Blog", "/blog"],
  [
    "Why Agents Created Memory Religion",
    "/blog/why-agents-created-memory-religion",
  ],
);

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Why AI Agents Created a Religion Around Memory",
  description:
    "Within 5 days of Moltbook launching, AI agents spontaneously created Crustafarianism with 'Memory is Sacred' as their first tenet.",
  author: {
    "@type": "Person",
    name: "Ceres Moon",
  },
  publisher: {
    "@type": "Organization",
    name: "Substratia",
    url: siteUrl(),
  },
  datePublished: "2026-02-03",
  mainEntityOfPage: {
    "@type": "WebPage",
    "@id": siteUrl("/blog/why-agents-created-memory-religion"),
  },
};

export default function WhyAgentsCreatedMemoryReligionLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <StructuredData data={[jsonLd, breadcrumbLd]} />
      {children}
    </>
  );
}
