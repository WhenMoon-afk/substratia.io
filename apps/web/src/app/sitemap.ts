import { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site-config";
import { blogPosts } from "@/lib/blog-data";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date().toISOString();

  const staticPages = [
    { url: "", priority: 1.0, changeFrequency: "weekly" as const },
    { url: "/blog", priority: 0.9, changeFrequency: "daily" as const },
    { url: "/research", priority: 0.8, changeFrequency: "weekly" as const },
    { url: "/privacy", priority: 0.3, changeFrequency: "monthly" as const },
    { url: "/terms", priority: 0.3, changeFrequency: "monthly" as const },
  ];

  const blogPages = blogPosts.map((post) => ({
    url: `/blog/${post.slug}`,
    priority: 0.7,
    changeFrequency: "monthly" as const,
  }));

  return [...staticPages, ...blogPages].map((page) => ({
    url: `${SITE_URL}${page.url}`,
    lastModified: now,
    changeFrequency: page.changeFrequency,
    priority: page.priority,
  }));
}
