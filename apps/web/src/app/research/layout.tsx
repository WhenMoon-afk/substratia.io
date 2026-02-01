import type { Metadata } from "next";
import { siteUrl } from "@/lib/site-config";
import { StructuredData } from "@/components/StructuredData";

export const metadata: Metadata = {
  title: "Research - Substratia | Original AI Safety & Behavior Research",
  description:
    "Original research on AI safety, behavior patterns, and emergent phenomena. Controlled experiments with reproducible methodologies and open data.",
  keywords: [
    "AI research",
    "AI safety",
    "chatbot psychology",
    "AI behavior",
    "Mirror Demons",
    "original research",
    "AI experiments",
  ],
  openGraph: {
    title: "Substratia Research - Original AI Safety & Behavior Research",
    description:
      "Controlled experiments investigating AI behavior patterns, safety implications, and emergent phenomena.",
    type: "website",
    url: siteUrl("/research"),
  },
  twitter: {
    card: "summary_large_image",
    title: "Substratia Research",
    description: "Original research on AI safety and behavior patterns.",
  },
  alternates: {
    types: {
      "application/rss+xml": siteUrl("/research/feed.xml"),
    },
  },
};

const breadcrumbLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: siteUrl() },
    {
      "@type": "ListItem",
      position: 2,
      name: "Research",
      item: siteUrl("/research"),
    },
  ],
};

const collectionLd = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "Substratia Research",
  description:
    "Original research on AI safety, behavior patterns, and emergent phenomena.",
  url: siteUrl("/research"),
  publisher: {
    "@type": "Organization",
    name: "Substratia",
    url: siteUrl(),
  },
};

export default function ResearchLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <StructuredData data={[collectionLd, breadcrumbLd]} />
      {children}
    </>
  );
}
