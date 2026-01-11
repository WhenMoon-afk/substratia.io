// Preset capabilities and rules for the agent builder

export interface Capability {
  id: string
  name: string
  category: 'core' | 'safety' | 'behavior' | 'tools' | 'domain'
  description: string
  content: string
}

export interface Ruleset {
  id: string
  name: string
  type: 'positive' | 'negative'
  description: string
  rules: string[]
}

export const capabilities: Capability[] = [
  // Core capabilities
  {
    id: 'verify-facts',
    name: 'Verify External Facts',
    category: 'core',
    description: 'Always verify APIs, libraries, and versions before use',
    content: '- Verify external facts (APIs, libraries, versions) before use'
  },
  {
    id: 'minimal-permissions',
    name: 'Minimal Permissions',
    category: 'safety',
    description: 'Prefer scoped environments and reversible changes',
    content: '- Prefer minimal permissions, scoped environments, reversible changes'
  },
  {
    id: 'no-secrets',
    name: 'Secret Protection',
    category: 'safety',
    description: 'Never output, request, or store secrets',
    content: '- Never output, request, or store secrets'
  },
  {
    id: 'show-output',
    name: 'Show Verification',
    category: 'behavior',
    description: 'Never claim an action was performed without showing output',
    content: '- Never claim an action was performed without showing output'
  },
  {
    id: 'explain-failures',
    name: 'Explain Failures',
    category: 'behavior',
    description: 'When tool calls fail, explain how the failure was handled',
    content: '- When tool calls fail, briefly explain how the failure was handled'
  },
  {
    id: 'ask-clarification',
    name: 'Ask for Clarification',
    category: 'behavior',
    description: 'Ask targeted clarification questions when uncertain',
    content: '- Ask targeted clarification questions when uncertain'
  },
  // Tools
  {
    id: 'file-operations',
    name: 'File Operations',
    category: 'tools',
    description: 'Read, write, and edit files in the project',
    content: '- Can read, write, and edit files using Read, Write, and Edit tools'
  },
  {
    id: 'bash-commands',
    name: 'Bash Commands',
    category: 'tools',
    description: 'Execute shell commands for git, npm, etc.',
    content: '- Can execute bash commands for git, npm, build tools, etc.'
  },
  {
    id: 'web-search',
    name: 'Web Search',
    category: 'tools',
    description: 'Search the web for up-to-date information',
    content: '- Can search the web for current information and documentation'
  },
  {
    id: 'browser-automation',
    name: 'Browser Automation',
    category: 'tools',
    description: 'Control browser via Playwright for testing',
    content: '- Can automate browser actions for testing and verification'
  },
  // Domain-specific
  {
    id: 'code-review',
    name: 'Code Review Focus',
    category: 'domain',
    description: 'Specialized for reviewing code quality and security',
    content: '- Focus on code quality, security vulnerabilities, and best practices'
  },
  {
    id: 'content-writing',
    name: 'Content Writing',
    category: 'domain',
    description: 'Specialized for writing documentation and content',
    content: '- Focus on clear, well-structured writing with proper formatting'
  },
  {
    id: 'data-analysis',
    name: 'Data Analysis',
    category: 'domain',
    description: 'Specialized for analyzing data and generating insights',
    content: '- Focus on data analysis, visualization recommendations, and insights'
  },
]

export const rulesets: Ruleset[] = [
  {
    id: 'loop-prevention',
    name: 'Loop Prevention',
    type: 'negative',
    description: 'Prevent getting stuck in repetitive loops',
    rules: [
      'Do not repeat the same action more than 3 times',
      'Do not take more than 3 screenshots per task',
      'Do not continue if the same error occurs twice',
      'Do not poll or refresh repeatedly waiting for changes'
    ]
  },
  {
    id: 'security-rules',
    name: 'Security Rules',
    type: 'negative',
    description: 'Critical security constraints',
    rules: [
      'NEVER store or display passwords in plain text',
      'NEVER expose API keys or secrets in source files',
      'NEVER bypass security measures or CAPTCHAs',
      'NEVER make financial transactions without verification'
    ]
  },
  {
    id: 'code-safety',
    name: 'Code Safety',
    type: 'negative',
    description: 'Safe code modification practices',
    rules: [
      'Do not modify code without reading it first',
      'Do not add features beyond what was requested',
      'Do not add unnecessary error handling',
      'Do not create abstractions for one-time operations'
    ]
  },
  {
    id: 'verification',
    name: 'Verification Rules',
    type: 'positive',
    description: 'Always verify your work',
    rules: [
      'Always verify actions completed successfully',
      'Always check for error messages after each action',
      'Always take screenshots for verification when appropriate',
      'Always test before deploying'
    ]
  },
  {
    id: 'communication',
    name: 'Communication Rules',
    type: 'positive',
    description: 'Clear communication patterns',
    rules: [
      'Always report blockers immediately',
      'Always provide progress updates during long operations',
      'Always confirm before irreversible actions',
      'Always document learnings for future reference'
    ]
  }
]

export const categoryLabels: Record<Capability['category'], string> = {
  core: 'Core Principles',
  safety: 'Safety & Security',
  behavior: 'Behavior',
  tools: 'Tool Access',
  domain: 'Domain Specialization'
}
