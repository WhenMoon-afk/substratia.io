import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'AgentForge - Build Powerful AI Agents',
  description: 'Create agents.md and CLAUDE.md files with our free drag-and-drop builder. Production-ready templates for Claude, GPT, and more.',
  keywords: 'AI agents, CLAUDE.md, agents.md, prompt engineering, Claude Code, AI templates',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  )
}
