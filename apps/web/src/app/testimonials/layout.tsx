import type { Metadata } from "next";
import { siteUrl } from "@/lib/site-config";
import { StructuredData } from "@/components/StructuredData";

export const metadata: Metadata = {
  title: "Testimonials - Claude Code Success Stories | Substratia",
  description:
    "See how teams and developers have improved their Claude Code workflows with our free tools. Real results from real users.",
  keywords: [
    "Claude Code tools",
    "testimonials",
    "case studies",
    "AI workflow results",
    "Claude Code success",
  ],
  openGraph: {
    title: "Claude Code Success Stories",
    description:
      "Real results from developers and teams who improved their Claude Code workflows.",
    type: "website",
    url: siteUrl("/testimonials"),
  },
  twitter: {
    card: "summary_large_image",
    title: "Claude Code Success Stories",
    description:
      "Success stories from developers using our free Claude Code tools.",
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
      name: "Testimonials",
      item: siteUrl("/testimonials"),
    },
  ],
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Claude Code Success Stories",
  description:
    "Success stories from developers and teams who improved their Claude Code workflows.",
  url: siteUrl("/testimonials"),
  mainEntity: {
    "@type": "ItemList",
    name: "User Success Stories",
    description:
      "Testimonials from developers using our free Claude Code tools.",
  },
};

export default function TestimonialsLayout({
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
