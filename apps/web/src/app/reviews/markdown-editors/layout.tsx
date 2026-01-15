import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Best Markdown Editors 2026 - Obsidian vs Notion vs Typora | Substratia',
  description: 'Compare the top markdown editors: Obsidian, Notion, Typora, VS Code, and iA Writer. Features, pricing, and which is best for notes, docs, and writing.',
  keywords: 'Obsidian, Notion, Typora, markdown editor, note taking app, VS Code markdown, iA Writer, best markdown editor, PKM tools',
  openGraph: {
    title: 'Best Markdown Editors 2026 - Complete Comparison',
    description: 'Compare Obsidian, Notion, Typora, VS Code, and iA Writer. Find the best markdown editor for your workflow.',
    type: 'article',
    url: 'https://substratia.io/reviews/markdown-editors',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Best Markdown Editors 2026',
    description: 'Compare Obsidian, Notion, Typora, VS Code, and iA Writer.',
  },
}

const breadcrumbLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://substratia.io' },
    { '@type': 'ListItem', position: 2, name: 'Reviews', item: 'https://substratia.io/reviews' },
    { '@type': 'ListItem', position: 3, name: 'Markdown Editors', item: 'https://substratia.io/reviews/markdown-editors' },
  ],
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'Best Markdown Editors 2026',
  description: 'A comparison of the top markdown editors for writers and developers.',
  itemListElement: [
    {
      '@type': 'ListItem',
      position: 1,
      item: {
        '@type': 'SoftwareApplication',
        name: 'Obsidian',
        applicationCategory: 'ProductivityApplication',
        operatingSystem: 'Cross-platform',
      },
    },
    {
      '@type': 'ListItem',
      position: 2,
      item: {
        '@type': 'SoftwareApplication',
        name: 'Notion',
        applicationCategory: 'ProductivityApplication',
        operatingSystem: 'Cross-platform',
      },
    },
    {
      '@type': 'ListItem',
      position: 3,
      item: {
        '@type': 'SoftwareApplication',
        name: 'Typora',
        applicationCategory: 'ProductivityApplication',
        operatingSystem: 'Cross-platform',
      },
    },
    {
      '@type': 'ListItem',
      position: 4,
      item: {
        '@type': 'SoftwareApplication',
        name: 'VS Code',
        applicationCategory: 'DeveloperApplication',
        operatingSystem: 'Cross-platform',
      },
    },
    {
      '@type': 'ListItem',
      position: 5,
      item: {
        '@type': 'SoftwareApplication',
        name: 'iA Writer',
        applicationCategory: 'ProductivityApplication',
        operatingSystem: 'Cross-platform',
      },
    },
  ],
}

export default function MarkdownEditorsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      {children}
    </>
  )
}
