import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Documentation - Substratia | Memory Infrastructure for AI',
  description: 'Learn how to use Substratia tools: momentum for context recovery, memory-mcp for persistent memory, and AgentForge for visual agent configuration.',
}

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
