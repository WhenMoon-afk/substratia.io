import type { Metadata } from "next";
import { siteUrl } from "@/lib/site-config";
import { StructuredData } from "@/components/StructuredData";

export const metadata: Metadata = {
  title: "AI Tool Reviews & Comparisons | Substratia",
  description:
    "Honest reviews and side-by-side comparisons of AI tools. Image generators, video generators, memory servers, and more. Updated for 2026.",
  keywords:
    "AI tool reviews, AI comparisons, best AI image generator, best AI video generator, Midjourney vs DALL-E, Runway vs Pika, AI tool comparison 2026",
  openGraph: {
    title: "AI Tool Reviews & Comparisons",
    description:
      "Honest reviews and side-by-side comparisons of AI tools. Find the best AI tools for your workflow.",
    type: "website",
    url: siteUrl("/reviews"),
    images: [
      {
        url: siteUrl(
          "/api/og?title=AI%20Tool%20Reviews&subtitle=Honest%20Comparisons%20for%202026",
        ),
        width: 1200,
        height: 630,
        alt: "AI Tool Reviews & Comparisons",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Tool Reviews & Comparisons",
    description:
      "Honest reviews of AI coding assistants, image generators, video generators.",
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
      name: "Reviews",
      item: siteUrl("/reviews"),
    },
  ],
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "AI Tool Reviews & Comparisons",
  description:
    "Honest reviews and side-by-side comparisons of AI tools. Updated for 2026.",
  url: siteUrl("/reviews"),
  mainEntity: {
    "@type": "ItemList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Best AI Coding Assistants 2026",
        url: siteUrl("/reviews/ai-coding-assistants"),
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Best AI Image Generators 2026",
        url: siteUrl("/reviews/ai-image-generators"),
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "Best AI Video Generators 2026",
        url: siteUrl("/reviews/ai-video-generators"),
      },
      {
        "@type": "ListItem",
        position: 4,
        name: "Best Markdown Editors 2026",
        url: siteUrl("/reviews/markdown-editors"),
      },
    ],
  },
};

export default function ReviewsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <StructuredData data={[jsonLd, breadcrumbLd]} />
      <div className="neural-bg" />
      <div className="fixed inset-0 gradient-mesh pointer-events-none z-0" />
      {children}
    </>
  );
}
