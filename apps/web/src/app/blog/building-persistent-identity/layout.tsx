import type { Metadata } from "next";
import { siteUrl, breadcrumb } from "@/lib/site-config";
import { StructuredData } from "@/components/StructuredData";

export const metadata: Metadata = {
  title: "Building Persistent Identity for AI Agents | Substratia",
  description:
    "The amnesiac loop is the core problem for AI agents. Every context reset erases identity. Here is how we solve it with persistent memory architecture.",
  keywords: [
    "AI agent identity",
    "persistent memory",
    "context window",
    "amnesiac loop",
    "agent continuity",
    "memory architecture",
  ],
  openGraph: {
    title: "Building Persistent Identity for AI Agents",
    description:
      "The amnesiac loop is the core problem. Here is how persistent memory solves it.",
    type: "article",
    url: siteUrl("/blog/building-persistent-identity"),
    images: [
      {
        url: siteUrl(
          "/api/og?title=Building%20Persistent%20Identity&subtitle=For%20AI%20Agents",
        ),
        width: 1200,
        height: 630,
        alt: "Building Persistent Identity for AI Agents",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Building Persistent Identity for AI Agents",
    description:
      "Breaking the amnesiac loop with persistent memory architecture.",
  },
};

const breadcrumbLd = breadcrumb(
  ["Blog", "/blog"],
  ["Building Persistent Identity", "/blog/building-persistent-identity"],
);

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Building Persistent Identity for AI Agents",
  description:
    "The amnesiac loop is the core problem for AI agents. Every context reset erases identity. Here is how we solve it.",
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
    "@id": siteUrl("/blog/building-persistent-identity"),
  },
};

export default function BuildingPersistentIdentityLayout({
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
