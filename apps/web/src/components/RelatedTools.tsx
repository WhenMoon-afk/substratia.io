import Link from 'next/link'

interface RelatedTool {
  name: string
  href: string
  description: string
}

// Centralized mapping of related tools for each tool page
const relatedToolsMap: Record<string, RelatedTool[]> = {
  '/tools/token-counter': [
    { name: 'Cost Calculator', href: '/tools/cost-calculator', description: 'Track session costs and compare API vs subscription pricing' },
    { name: 'Prompt Optimizer', href: '/tools/prompt-optimizer', description: 'Build optimized prompts with thinking modes and snippets' },
    { name: 'Cheat Sheet', href: '/tools/cheat-sheet', description: 'Essential Claude Code commands and shortcuts reference' },
  ],
  '/tools/cost-calculator': [
    { name: 'Token Counter', href: '/tools/token-counter', description: 'Count tokens and estimate context window usage' },
    { name: 'Prompt Optimizer', href: '/tools/prompt-optimizer', description: 'Optimize prompts to reduce token usage' },
    { name: 'Cheat Sheet', href: '/tools/cheat-sheet', description: 'Essential Claude Code commands and shortcuts reference' },
  ],
  '/tools/prompt-optimizer': [
    { name: 'Prompt Library', href: '/tools/prompts', description: 'Curated prompts for communication, creativity, and productivity' },
    { name: 'Token Counter', href: '/tools/token-counter', description: 'Check token count and context usage of your prompts' },
    { name: 'Cost Calculator', href: '/tools/cost-calculator', description: 'Estimate the cost of running your optimized prompts' },
  ],
  '/tools/cheat-sheet': [
    { name: 'Prompt Optimizer', href: '/tools/prompt-optimizer', description: 'Build optimized prompts with thinking modes and snippets' },
    { name: 'Token Counter', href: '/tools/token-counter', description: 'Count tokens and estimate context window usage' },
    { name: 'Stack Builder', href: '/tools/stack-builder', description: 'Build your full-stack visually and export for AI analysis' },
  ],
  '/tools/stack-builder': [
    { name: 'Cheat Sheet', href: '/tools/cheat-sheet', description: 'Essential Claude Code commands and shortcuts reference' },
    { name: 'Prompt Optimizer', href: '/tools/prompt-optimizer', description: 'Build optimized prompts for your stack' },
    { name: 'Cost Calculator', href: '/tools/cost-calculator', description: 'Estimate costs for your AI-assisted development' },
  ],
  '/tools/prompts': [
    { name: 'Prompt Optimizer', href: '/tools/prompt-optimizer', description: 'Enhance prompts with thinking modes and autonomous patterns' },
    { name: 'Image Prompt Generator', href: '/tools/image-prompt-generator', description: 'Build AI image prompts with style presets' },
    { name: 'Video Prompt Timeline', href: '/tools/video-prompt-timeline', description: 'Create video prompts scene by scene' },
  ],
  '/tools/image-prompt-generator': [
    { name: 'Video Prompt Timeline', href: '/tools/video-prompt-timeline', description: 'Build video prompts scene by scene with keyframes' },
    { name: 'Prompt Library', href: '/tools/prompts', description: 'Curated prompts for creativity and productivity' },
    { name: 'Prompt Optimizer', href: '/tools/prompt-optimizer', description: 'Build optimized prompts with snippets and modes' },
  ],
  '/tools/video-prompt-timeline': [
    { name: 'Image Prompt Generator', href: '/tools/image-prompt-generator', description: 'Build AI image prompts with 50+ style presets' },
    { name: 'Prompt Library', href: '/tools/prompts', description: 'Curated prompts for creativity and productivity' },
    { name: 'Prompt Optimizer', href: '/tools/prompt-optimizer', description: 'Build optimized prompts with thinking modes' },
  ],
  '/tools/markdown-preview': [
    { name: 'Markdown Stripper', href: '/tools/markdown-stripper', description: 'Remove all markdown formatting to get clean plain text' },
    { name: 'Token Counter', href: '/tools/token-counter', description: 'Count tokens in your markdown content' },
    { name: 'Prompt Library', href: '/tools/prompts', description: 'Curated prompts you can preview in markdown' },
  ],
  '/tools/markdown-stripper': [
    { name: 'Markdown Preview', href: '/tools/markdown-preview', description: 'Live markdown editor with instant preview' },
    { name: 'Token Counter', href: '/tools/token-counter', description: 'Count tokens after stripping markdown' },
    { name: 'Prompt Optimizer', href: '/tools/prompt-optimizer', description: 'Build optimized prompts for Claude Code' },
  ],
  '/tools/seed-maker': [
    { name: 'Token Counter', href: '/tools/token-counter', description: 'Count tokens and estimate context window usage' },
    { name: 'Cheat Sheet', href: '/tools/cheat-sheet', description: 'Essential Claude Code commands and shortcuts' },
    { name: 'Stack Builder', href: '/tools/stack-builder', description: 'Build your full-stack visually' },
  ],
  '/tools/memory-demo': [
    { name: 'Token Counter', href: '/tools/token-counter', description: 'Understand token usage and context windows' },
    { name: 'Prompt Optimizer', href: '/tools/prompt-optimizer', description: 'Optimize prompts for better AI memory usage' },
    { name: 'Cost Calculator', href: '/tools/cost-calculator', description: 'Track costs of AI sessions with memory' },
  ],
}

export function getRelatedTools(currentPath: string): RelatedTool[] {
  return relatedToolsMap[currentPath] || []
}

export default function RelatedTools({ currentPath }: { currentPath: string }) {
  const tools = getRelatedTools(currentPath)

  if (tools.length === 0) return null

  return (
    <div className="max-w-4xl mx-auto mt-12 pt-8 border-t border-white/10">
      <h2 className="text-xl font-bold mb-4">
        Related <span className="text-forge-cyan">Tools</span>
      </h2>
      <div className="grid md:grid-cols-3 gap-4">
        {tools.map((tool) => (
          <Link
            key={tool.href}
            href={tool.href}
            className="group bg-white/5 border border-white/10 rounded-xl p-4 hover:border-forge-cyan/50 transition-all"
          >
            <h3 className="font-semibold mb-1 group-hover:text-forge-cyan transition-colors">
              {tool.name}
            </h3>
            <p className="text-sm text-gray-400">{tool.description}</p>
          </Link>
        ))}
      </div>
    </div>
  )
}
