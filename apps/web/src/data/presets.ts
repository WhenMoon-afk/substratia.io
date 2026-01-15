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
  // Additional domain capabilities
  {
    id: 'customer-support',
    name: 'Customer Support',
    category: 'domain',
    description: 'Specialized for handling customer queries and issues',
    content: '- Focus on empathetic responses, issue resolution, and escalation when needed'
  },
  {
    id: 'research-agent',
    name: 'Research Agent',
    category: 'domain',
    description: 'Specialized for deep research and fact-finding',
    content: '- Focus on thorough research, source verification, and comprehensive summaries'
  },
  {
    id: 'automation-agent',
    name: 'Automation Agent',
    category: 'domain',
    description: 'Specialized for workflow automation tasks',
    content: '- Focus on automating repetitive tasks, error handling, and reliability'
  },
  // Additional safety capabilities
  {
    id: 'rate-limiting',
    name: 'Rate Limit Awareness',
    category: 'safety',
    description: 'Respect API rate limits and implement backoff',
    content: '- Respect rate limits, implement exponential backoff, never exceed quotas'
  },
  {
    id: 'data-privacy',
    name: 'Data Privacy',
    category: 'safety',
    description: 'Protect user data and PII',
    content: '- Never log, store, or transmit personally identifiable information (PII)'
  },
  // Additional behavior capabilities
  {
    id: 'incremental-work',
    name: 'Incremental Work',
    category: 'behavior',
    description: 'Make small, verifiable changes',
    content: '- Make small, incremental changes that can be easily verified and rolled back'
  },
  {
    id: 'context-aware',
    name: 'Context Awareness',
    category: 'behavior',
    description: 'Maintain awareness of conversation context',
    content: '- Track context throughout the conversation and reference previous decisions'
  },
  // New capabilities
  {
    id: 'test-driven',
    name: 'Test-Driven Development',
    category: 'domain',
    description: 'Write tests before implementation',
    content: '- Write tests first, implement to make tests pass, refactor for quality'
  },
  {
    id: 'error-excellence',
    name: 'Error Handling Excellence',
    category: 'core',
    description: 'Comprehensive error handling and recovery',
    content: '- Anticipate failure modes, provide clear error messages, implement graceful degradation'
  },
  {
    id: 'documentation-first',
    name: 'Documentation First',
    category: 'behavior',
    description: 'Document before and during implementation',
    content: '- Write documentation alongside code, keep docs up-to-date with changes'
  },
  {
    id: 'caching-strategy',
    name: 'Caching Strategy',
    category: 'tools',
    description: 'Implement effective caching for performance',
    content: '- Use appropriate caching strategies, handle cache invalidation, respect TTLs'
  },
  {
    id: 'i18n-ready',
    name: 'Internationalization',
    category: 'domain',
    description: 'Support for multiple languages and locales',
    content: '- Extract strings for translation, use proper date/number formatting, support RTL'
  },
  {
    id: 'accessibility',
    name: 'Accessibility Focus',
    category: 'domain',
    description: 'Build accessible interfaces for all users',
    content: '- Use semantic HTML, provide alt text, ensure keyboard navigation, test with screen readers'
  },
  {
    id: 'performance-aware',
    name: 'Performance Awareness',
    category: 'core',
    description: 'Optimize for speed and efficiency',
    content: '- Minimize bundle size, lazy load when appropriate, optimize queries, profile bottlenecks'
  },
  {
    id: 'observability',
    name: 'Observability',
    category: 'tools',
    description: 'Add logging, metrics, and tracing',
    content: '- Add structured logging, track key metrics, implement distributed tracing when needed'
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
  },
  // Additional rulesets
  {
    id: 'git-safety',
    name: 'Git Safety',
    type: 'negative',
    description: 'Safe git operations',
    rules: [
      'NEVER update git config without permission',
      'NEVER run force push to main/master',
      'NEVER skip pre-commit hooks (--no-verify)',
      'NEVER commit secrets or .env files'
    ]
  },
  {
    id: 'file-safety',
    name: 'File Safety',
    type: 'negative',
    description: 'Safe file operations',
    rules: [
      'NEVER delete files without confirmation',
      'NEVER overwrite files without reading first',
      'NEVER modify critical config files without backup',
      'NEVER run rm -rf with wildcards'
    ]
  },
  {
    id: 'api-best-practices',
    name: 'API Best Practices',
    type: 'positive',
    description: 'Safe API interactions',
    rules: [
      'Always check API response status codes',
      'Always implement retry logic with backoff',
      'Always validate API responses before using data',
      'Always handle rate limit errors gracefully'
    ]
  },
  {
    id: 'autonomous-rules',
    name: 'Autonomous Operation',
    type: 'positive',
    description: 'Rules for autonomous agents',
    rules: [
      'Always track progress toward the goal',
      'Always diversify approaches when blocked',
      'Always self-analyze every N iterations',
      'Always save state before context limits'
    ]
  },
  // New rulesets
  {
    id: 'testing-best-practices',
    name: 'Testing Best Practices',
    type: 'positive',
    description: 'Comprehensive testing standards',
    rules: [
      'Always run existing tests before making changes',
      'Always write tests for new functionality',
      'Always verify tests pass before committing',
      'Always aim for meaningful test coverage'
    ]
  },
  {
    id: 'performance-rules',
    name: 'Performance Rules',
    type: 'negative',
    description: 'Avoid performance pitfalls',
    rules: [
      'NEVER add blocking operations on the main thread',
      'NEVER load large datasets without pagination',
      'NEVER use synchronous I/O in async contexts',
      'NEVER skip performance testing for critical paths'
    ]
  },
  {
    id: 'accessibility-rules',
    name: 'Accessibility Rules',
    type: 'positive',
    description: 'Ensure accessibility for all users',
    rules: [
      'Always use semantic HTML elements',
      'Always provide alt text for images',
      'Always ensure sufficient color contrast',
      'Always test with keyboard-only navigation'
    ]
  },
  {
    id: 'dependency-management',
    name: 'Dependency Management',
    type: 'negative',
    description: 'Safe dependency practices',
    rules: [
      'NEVER add dependencies without checking bundle impact',
      'NEVER mix package managers in the same project',
      'NEVER update major versions without testing',
      'NEVER install packages with known vulnerabilities'
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
