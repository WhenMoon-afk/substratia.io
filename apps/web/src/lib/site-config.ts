export const SITE_URL =
  process.env.NEXT_PUBLIC_APP_URL || "https://substratia.io";

const GITHUB_ORG = "https://github.com/WhenMoon-afk";

export const navLinks = [
  { href: "/blog", label: "Blog" },
  { href: "/research", label: "Research" },
] as const;

export const siteConfig = {
  name: "Substratia",
  url: SITE_URL,
  title: "Substratia | Personal Notes on AI and Software",
  description:
    "Personal writing on AI, software, and ongoing research projects.",
  shortDescription: "A personal blog focused on AI, software, and research.",
  keywords: "AI, software engineering, research, programming, blog",
  brand: {
    logo: "/brand/logo-icon.png",
    social: "/brand/social.png",
  },
  links: {
    github: GITHUB_ORG,
    newsletter: "https://skyceres.substack.com",
    repos: {
      website: `${GITHUB_ORG}/substratia.io`,
      mirrorDemons: `${GITHUB_ORG}/mirror-demons-research`,
      eleanorChenEffect: `${GITHUB_ORG}/eleanor-chen-effect`,
    },
  },
  analytics: {
    plausibleDomain: "substratia.io",
  },
} as const;

export function siteUrl(path: string = ""): string {
  return `${SITE_URL}${path}`;
}

export function breadcrumb(
  ...items: [name: string, path: string][]
): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteUrl() },
      ...items.map(([name, path], i) => ({
        "@type": "ListItem",
        position: i + 2,
        name,
        item: siteUrl(path),
      })),
    ],
  };
}

export function newsletterUrl(email: string, source: string): string {
  return `${siteConfig.links.newsletter}/subscribe?email=${encodeURIComponent(email)}&utm_source=substratia&utm_medium=${encodeURIComponent(source)}`;
}
