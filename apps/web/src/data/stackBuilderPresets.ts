// Stack Builder - Full-Stack Technology Selector Presets

export interface TechOption {
  id: string
  name: string
  description: string
  pros: string[]
  cons: string[]
  bestFor: string
  incompatibleWith?: string[] // IDs of incompatible options
}

export interface Category {
  id: string
  name: string
  description: string
  options: TechOption[]
  skippable: boolean
}

export const categories: Category[] = [
  {
    id: 'frontend',
    name: 'Frontend Framework',
    description: 'The foundation of your UI',
    skippable: false,
    options: [
      {
        id: 'react',
        name: 'React',
        description: 'Component-based UI library by Meta',
        pros: ['Massive ecosystem', 'Great DevTools', 'Job market leader'],
        cons: ['JSX learning curve', 'Many ways to do things'],
        bestFor: 'Large teams, complex apps',
      },
      {
        id: 'nextjs',
        name: 'Next.js',
        description: 'React framework with SSR, routing, and more',
        pros: ['Full-stack capable', 'Great DX', 'Vercel integration'],
        cons: ['React knowledge required', 'Can be overkill'],
        bestFor: 'Production React apps',
      },
      {
        id: 'vue',
        name: 'Vue.js',
        description: 'Progressive, approachable framework',
        pros: ['Gentle learning curve', 'Great docs', 'Single-file components'],
        cons: ['Smaller job market', 'Fewer libraries'],
        bestFor: 'Small-medium apps, solo devs',
      },
      {
        id: 'nuxt',
        name: 'Nuxt',
        description: 'Vue framework with SSR and file-based routing',
        pros: ['Vue ecosystem', 'Auto-imports', 'Great DX'],
        cons: ['Vue knowledge required', 'Smaller community'],
        bestFor: 'Production Vue apps',
      },
      {
        id: 'svelte',
        name: 'Svelte',
        description: 'Compile-time framework, no virtual DOM',
        pros: ['Tiny bundles', 'Simple syntax', 'Fast'],
        cons: ['Smaller ecosystem', 'Fewer jobs'],
        bestFor: 'Performance-critical apps',
      },
      {
        id: 'sveltekit',
        name: 'SvelteKit',
        description: 'Svelte framework with routing and SSR',
        pros: ['File-based routing', 'Fast', 'Modern'],
        cons: ['Svelte knowledge required', 'Newer ecosystem'],
        bestFor: 'Full-stack Svelte apps',
      },
      {
        id: 'angular',
        name: 'Angular',
        description: 'Full-featured enterprise framework by Google',
        pros: ['All-in-one solution', 'TypeScript-first', 'Enterprise support'],
        cons: ['Steep learning curve', 'Verbose'],
        bestFor: 'Large enterprise apps',
      },
      {
        id: 'solid',
        name: 'SolidJS',
        description: 'React-like syntax, no virtual DOM',
        pros: ['Very fast', 'React-like', 'Fine-grained reactivity'],
        cons: ['Small community', 'Fewer libraries'],
        bestFor: 'Performance-focused apps',
      },
    ],
  },
  {
    id: 'styling',
    name: 'Styling',
    description: 'How you style your components',
    skippable: true,
    options: [
      {
        id: 'tailwind',
        name: 'Tailwind CSS',
        description: 'Utility-first CSS framework',
        pros: ['Fast development', 'Consistent design', 'Small production builds'],
        cons: ['Verbose markup', 'Learning curve'],
        bestFor: 'Rapid prototyping, design systems',
      },
      {
        id: 'shadcn',
        name: 'shadcn/ui',
        description: 'Copy-paste components built on Radix + Tailwind',
        pros: ['Accessible', 'Customizable', 'Not a dependency'],
        cons: ['React only', 'Requires Tailwind'],
        bestFor: 'React apps needing polished UI',
        incompatibleWith: ['vue', 'nuxt', 'svelte', 'sveltekit', 'angular', 'solid'],
      },
      {
        id: 'css-modules',
        name: 'CSS Modules',
        description: 'Scoped CSS with local class names',
        pros: ['No runtime', 'Familiar CSS', 'Framework agnostic'],
        cons: ['More files', 'No dynamic styles'],
        bestFor: 'Teams with CSS expertise',
      },
      {
        id: 'styled-components',
        name: 'Styled Components',
        description: 'CSS-in-JS for React',
        pros: ['Dynamic styles', 'Scoped', 'Props-based'],
        cons: ['Runtime cost', 'React only'],
        bestFor: 'Dynamic theming',
        incompatibleWith: ['vue', 'nuxt', 'svelte', 'sveltekit', 'angular', 'solid'],
      },
      {
        id: 'emotion',
        name: 'Emotion',
        description: 'Performant CSS-in-JS library',
        pros: ['Flexible', 'Good performance', 'SSR support'],
        cons: ['Runtime cost', 'Multiple APIs'],
        bestFor: 'CSS-in-JS with SSR',
      },
      {
        id: 'sass',
        name: 'Sass/SCSS',
        description: 'CSS preprocessor with variables and nesting',
        pros: ['Powerful features', 'Mature ecosystem', 'Framework agnostic'],
        cons: ['Build step required', 'Can get complex'],
        bestFor: 'Large stylesheets, design systems',
      },
      {
        id: 'chakra',
        name: 'Chakra UI',
        description: 'Accessible component library for React',
        pros: ['Accessible', 'Customizable', 'Great DX'],
        cons: ['React only', 'Bundle size'],
        bestFor: 'React apps needing quick UI',
        incompatibleWith: ['vue', 'nuxt', 'svelte', 'sveltekit', 'angular', 'solid'],
      },
    ],
  },
  {
    id: 'state',
    name: 'State Management',
    description: 'How you manage application state',
    skippable: true,
    options: [
      {
        id: 'zustand',
        name: 'Zustand',
        description: 'Small, fast state management for React',
        pros: ['Minimal boilerplate', 'Small bundle', 'DevTools'],
        cons: ['React only', 'Less structured'],
        bestFor: 'Simple to medium state needs',
        incompatibleWith: ['vue', 'nuxt', 'svelte', 'sveltekit', 'angular', 'solid'],
      },
      {
        id: 'redux',
        name: 'Redux Toolkit',
        description: 'Predictable state container for JS apps',
        pros: ['Predictable', 'Great DevTools', 'Middleware'],
        cons: ['Boilerplate', 'Learning curve'],
        bestFor: 'Complex state, large teams',
      },
      {
        id: 'jotai',
        name: 'Jotai',
        description: 'Primitive and flexible state for React',
        pros: ['Atomic approach', 'Small', 'Suspense support'],
        cons: ['React only', 'Different mental model'],
        bestFor: 'Atomic state patterns',
        incompatibleWith: ['vue', 'nuxt', 'svelte', 'sveltekit', 'angular', 'solid'],
      },
      {
        id: 'pinia',
        name: 'Pinia',
        description: 'The official Vue store',
        pros: ['Vue 3 native', 'TypeScript support', 'DevTools'],
        cons: ['Vue only'],
        bestFor: 'Vue applications',
        incompatibleWith: ['react', 'nextjs', 'svelte', 'sveltekit', 'angular', 'solid'],
      },
      {
        id: 'tanstack-query',
        name: 'TanStack Query',
        description: 'Async state management for server data',
        pros: ['Caching', 'Background updates', 'Framework agnostic'],
        cons: ['Overhead for simple cases', 'Learning curve'],
        bestFor: 'Data-heavy apps with APIs',
      },
      {
        id: 'mobx',
        name: 'MobX',
        description: 'Simple, scalable state management',
        pros: ['Less boilerplate', 'Observable pattern', 'Flexible'],
        cons: ['Magic can confuse', 'Larger bundle'],
        bestFor: 'Complex reactive state',
      },
    ],
  },
  {
    id: 'backend',
    name: 'Backend Framework',
    description: 'Your server-side logic',
    skippable: true,
    options: [
      {
        id: 'express',
        name: 'Express',
        description: 'Minimal, flexible Node.js framework',
        pros: ['Mature', 'Flexible', 'Huge ecosystem'],
        cons: ['Minimal features', 'Manual setup'],
        bestFor: 'Custom APIs, microservices',
      },
      {
        id: 'fastify',
        name: 'Fastify',
        description: 'Fast, low-overhead Node.js framework',
        pros: ['Very fast', 'Schema validation', 'Plugin system'],
        cons: ['Smaller ecosystem', 'Different patterns'],
        bestFor: 'High-performance APIs',
      },
      {
        id: 'hono',
        name: 'Hono',
        description: 'Ultralight web framework for edge',
        pros: ['Tiny', 'Edge-native', 'Multi-runtime'],
        cons: ['Newer', 'Smaller community'],
        bestFor: 'Edge functions, Cloudflare Workers',
      },
      {
        id: 'elysia',
        name: 'Elysia',
        description: 'Bun-first TypeScript framework',
        pros: ['Very fast', 'End-to-end type safety', 'Great DX'],
        cons: ['Bun-focused', 'Newer'],
        bestFor: 'Bun projects, type-safe APIs',
      },
      {
        id: 'nestjs',
        name: 'NestJS',
        description: 'Enterprise Node.js framework',
        pros: ['Angular-style structure', 'TypeScript-first', 'Modular'],
        cons: ['Heavy', 'Learning curve'],
        bestFor: 'Enterprise applications',
      },
      {
        id: 'django',
        name: 'Django',
        description: 'Python web framework with batteries included',
        pros: ['Admin panel', 'ORM included', 'Mature'],
        cons: ['Python ecosystem', 'Monolithic'],
        bestFor: 'Content sites, rapid development',
      },
      {
        id: 'fastapi',
        name: 'FastAPI',
        description: 'Modern Python framework for APIs',
        pros: ['Fast', 'Auto-docs', 'Type hints'],
        cons: ['Python ecosystem', 'Newer'],
        bestFor: 'Python APIs, ML backends',
      },
      {
        id: 'rails',
        name: 'Ruby on Rails',
        description: 'Convention-over-configuration framework',
        pros: ['Rapid development', 'Mature ecosystem', 'Full-featured'],
        cons: ['Ruby ecosystem', 'Can be slow'],
        bestFor: 'Startups, MVPs',
      },
    ],
  },
  {
    id: 'database',
    name: 'Database',
    description: 'Where your data lives',
    skippable: false,
    options: [
      {
        id: 'postgresql',
        name: 'PostgreSQL',
        description: 'Advanced open-source relational database',
        pros: ['Feature-rich', 'ACID compliant', 'Extensions'],
        cons: ['More complex setup', 'Requires management'],
        bestFor: 'Complex queries, data integrity',
      },
      {
        id: 'mysql',
        name: 'MySQL',
        description: 'Popular open-source relational database',
        pros: ['Widespread', 'Good performance', 'Easy to learn'],
        cons: ['Less features than Postgres', 'License concerns'],
        bestFor: 'Web applications, WordPress',
      },
      {
        id: 'mongodb',
        name: 'MongoDB',
        description: 'Document-oriented NoSQL database',
        pros: ['Flexible schema', 'Scalable', 'JSON-native'],
        cons: ['No joins', 'Consistency trade-offs'],
        bestFor: 'Unstructured data, rapid iteration',
      },
      {
        id: 'sqlite',
        name: 'SQLite',
        description: 'Embedded file-based database',
        pros: ['Zero config', 'Portable', 'Fast for reads'],
        cons: ['Concurrent writes limited', 'No network'],
        bestFor: 'Prototypes, edge, mobile',
      },
      {
        id: 'supabase',
        name: 'Supabase',
        description: 'Open-source Firebase alternative with Postgres',
        pros: ['Postgres underneath', 'Real-time', 'Auth included'],
        cons: ['Vendor lock-in', 'Learning curve'],
        bestFor: 'Full-stack apps, real-time features',
      },
      {
        id: 'planetscale',
        name: 'PlanetScale',
        description: 'Serverless MySQL platform',
        pros: ['Branching', 'Serverless', 'Great DX'],
        cons: ['MySQL only', 'Pricing'],
        bestFor: 'Scalable MySQL, team workflows',
      },
      {
        id: 'turso',
        name: 'Turso',
        description: 'Edge-native SQLite platform',
        pros: ['Edge distribution', 'SQLite compatible', 'Low latency'],
        cons: ['Newer', 'SQLite limitations'],
        bestFor: 'Edge applications, low latency',
      },
    ],
  },
  {
    id: 'orm',
    name: 'ORM / Query Builder',
    description: 'How you interact with your database',
    skippable: true,
    options: [
      {
        id: 'prisma',
        name: 'Prisma',
        description: 'Type-safe ORM with great DX',
        pros: ['Type-safe', 'Migrations', 'Great DX'],
        cons: ['Bundle size', 'Performance overhead'],
        bestFor: 'TypeScript apps, rapid development',
      },
      {
        id: 'drizzle',
        name: 'Drizzle',
        description: 'Lightweight TypeScript ORM',
        pros: ['SQL-like', 'Small bundle', 'Edge-ready'],
        cons: ['Newer', 'Less features'],
        bestFor: 'Edge, performance-critical',
      },
      {
        id: 'typeorm',
        name: 'TypeORM',
        description: 'Traditional ORM for TypeScript',
        pros: ['Feature-rich', 'Mature', 'Decorator-based'],
        cons: ['Complex', 'Performance issues'],
        bestFor: 'Enterprise apps, complex schemas',
      },
      {
        id: 'kysely',
        name: 'Kysely',
        description: 'Type-safe SQL query builder',
        pros: ['Type-safe SQL', 'No magic', 'Lightweight'],
        cons: ['Lower-level', 'More verbose'],
        bestFor: 'Control over SQL, type safety',
      },
      {
        id: 'mongoose',
        name: 'Mongoose',
        description: 'MongoDB ODM for Node.js',
        pros: ['Schema validation', 'Middleware', 'Population'],
        cons: ['MongoDB only', 'Can be slow'],
        bestFor: 'MongoDB applications',
        incompatibleWith: ['postgresql', 'mysql', 'sqlite', 'planetscale', 'turso'],
      },
      {
        id: 'sqlalchemy',
        name: 'SQLAlchemy',
        description: 'Python SQL toolkit and ORM',
        pros: ['Powerful', 'Flexible', 'Mature'],
        cons: ['Python only', 'Learning curve'],
        bestFor: 'Python applications',
        incompatibleWith: ['express', 'fastify', 'hono', 'elysia', 'nestjs'],
      },
    ],
  },
  {
    id: 'auth',
    name: 'Authentication',
    description: 'How users log in',
    skippable: true,
    options: [
      {
        id: 'nextauth',
        name: 'NextAuth.js / Auth.js',
        description: 'Authentication for Next.js',
        pros: ['Easy setup', 'Many providers', 'Free'],
        cons: ['Next.js focused', 'Session management'],
        bestFor: 'Next.js applications',
      },
      {
        id: 'clerk',
        name: 'Clerk',
        description: 'Complete user management platform',
        pros: ['Beautiful UI', 'User management', 'Great DX'],
        cons: ['Paid at scale', 'Vendor lock-in'],
        bestFor: 'Apps needing user management UI',
      },
      {
        id: 'auth0',
        name: 'Auth0',
        description: 'Enterprise identity platform',
        pros: ['Enterprise features', 'Many integrations', 'Compliance'],
        cons: ['Expensive', 'Complex'],
        bestFor: 'Enterprise, compliance requirements',
      },
      {
        id: 'supabase-auth',
        name: 'Supabase Auth',
        description: 'Auth bundled with Supabase',
        pros: ['Integrated with DB', 'Row-level security', 'Free tier'],
        cons: ['Tied to Supabase', 'Less features'],
        bestFor: 'Supabase projects',
      },
      {
        id: 'firebase-auth',
        name: 'Firebase Auth',
        description: 'Google\'s authentication service',
        pros: ['Easy setup', 'Many providers', 'Free tier'],
        cons: ['Google lock-in', 'Limited customization'],
        bestFor: 'Quick auth setup, mobile apps',
      },
      {
        id: 'lucia',
        name: 'Lucia',
        description: 'Lightweight auth library',
        pros: ['No vendor lock-in', 'Database agnostic', 'Lightweight'],
        cons: ['More DIY', 'Less features'],
        bestFor: 'Custom auth requirements',
      },
    ],
  },
  {
    id: 'hosting',
    name: 'Hosting',
    description: 'Where your app runs',
    skippable: false,
    options: [
      {
        id: 'vercel',
        name: 'Vercel',
        description: 'Platform for frontend and serverless',
        pros: ['Great DX', 'Next.js native', 'Edge functions'],
        cons: ['Can get expensive', 'Vendor lock-in'],
        bestFor: 'Next.js, frontend-heavy apps',
      },
      {
        id: 'netlify',
        name: 'Netlify',
        description: 'Platform for web projects',
        pros: ['Easy deploys', 'Good free tier', 'Forms built-in'],
        cons: ['Build times', 'Function limits'],
        bestFor: 'Static sites, JAMstack',
      },
      {
        id: 'railway',
        name: 'Railway',
        description: 'Infrastructure platform for apps',
        pros: ['Simple pricing', 'Database hosting', 'Good DX'],
        cons: ['Newer', 'Fewer edge locations'],
        bestFor: 'Full-stack apps, backends',
      },
      {
        id: 'fly',
        name: 'Fly.io',
        description: 'Run apps close to users globally',
        pros: ['Global distribution', 'Containers', 'Good pricing'],
        cons: ['Learning curve', 'CLI-focused'],
        bestFor: 'Global apps, containers',
      },
      {
        id: 'cloudflare-pages',
        name: 'Cloudflare Pages',
        description: 'JAMstack platform on edge',
        pros: ['Fast', 'Generous free tier', 'Workers integration'],
        cons: ['Build limitations', 'Less flexible'],
        bestFor: 'Static sites, edge functions',
      },
      {
        id: 'aws',
        name: 'AWS',
        description: 'Amazon\'s cloud platform',
        pros: ['Every service imaginable', 'Scalable', 'Enterprise'],
        cons: ['Complex', 'Expensive mistakes possible'],
        bestFor: 'Enterprise, complex infrastructure',
      },
      {
        id: 'render',
        name: 'Render',
        description: 'Cloud to build and run apps',
        pros: ['Simple', 'Auto-scaling', 'Good DX'],
        cons: ['Cold starts', 'Fewer features'],
        bestFor: 'Simple deployments, backends',
      },
    ],
  },
  {
    id: 'cicd',
    name: 'CI/CD',
    description: 'Automated testing and deployment',
    skippable: true,
    options: [
      {
        id: 'github-actions',
        name: 'GitHub Actions',
        description: 'CI/CD built into GitHub',
        pros: ['Integrated with GitHub', 'Many actions', 'Free for public'],
        cons: ['GitHub lock-in', 'YAML complexity'],
        bestFor: 'GitHub projects',
      },
      {
        id: 'gitlab-ci',
        name: 'GitLab CI',
        description: 'CI/CD built into GitLab',
        pros: ['Integrated with GitLab', 'Feature-rich', 'Self-host option'],
        cons: ['GitLab lock-in', 'Can be complex'],
        bestFor: 'GitLab projects, self-hosted',
      },
      {
        id: 'circleci',
        name: 'CircleCI',
        description: 'CI/CD platform',
        pros: ['Fast', 'Good caching', 'Docker support'],
        cons: ['Pricing', 'Configuration complexity'],
        bestFor: 'Complex pipelines, Docker',
      },
      {
        id: 'vercel-ci',
        name: 'Vercel (built-in)',
        description: 'Automatic deployments on Vercel',
        pros: ['Zero config', 'Preview deployments', 'Fast'],
        cons: ['Vercel only', 'Limited customization'],
        bestFor: 'Vercel-hosted projects',
      },
    ],
  },
  {
    id: 'monitoring',
    name: 'Monitoring',
    description: 'Track errors and performance',
    skippable: true,
    options: [
      {
        id: 'sentry',
        name: 'Sentry',
        description: 'Error tracking and performance monitoring',
        pros: ['Great error tracking', 'Stack traces', 'Integrations'],
        cons: ['Can be expensive', 'Data volume'],
        bestFor: 'Error tracking, debugging',
      },
      {
        id: 'logrocket',
        name: 'LogRocket',
        description: 'Session replay and error tracking',
        pros: ['Session replay', 'User insights', 'Bug reproduction'],
        cons: ['Expensive', 'Privacy concerns'],
        bestFor: 'User behavior analysis, debugging',
      },
      {
        id: 'datadog',
        name: 'Datadog',
        description: 'Infrastructure and application monitoring',
        pros: ['Comprehensive', 'Great dashboards', 'APM'],
        cons: ['Very expensive', 'Complex'],
        bestFor: 'Enterprise, infrastructure monitoring',
      },
      {
        id: 'axiom',
        name: 'Axiom',
        description: 'Log management and analytics',
        pros: ['Generous free tier', 'Fast queries', 'Modern'],
        cons: ['Newer', 'Fewer integrations'],
        bestFor: 'Logging, cost-conscious teams',
      },
      {
        id: 'posthog',
        name: 'PostHog',
        description: 'Product analytics and feature flags',
        pros: ['Open source', 'Self-host option', 'Feature flags'],
        cons: ['Can be heavy', 'Learning curve'],
        bestFor: 'Product analytics, feature flags',
      },
    ],
  },
]

export function getCompatibilityWarnings(selections: Record<string, string>): string[] {
  const warnings: string[] = []

  // Check each selection against its incompatibleWith list
  for (const [categoryId, optionId] of Object.entries(selections)) {
    if (!optionId) continue

    const category = categories.find(c => c.id === categoryId)
    const option = category?.options.find(o => o.id === optionId)

    if (option?.incompatibleWith) {
      for (const incompatId of option.incompatibleWith) {
        // Check if any selected option is incompatible
        for (const [otherCatId, otherOptId] of Object.entries(selections)) {
          if (otherOptId === incompatId) {
            const otherCat = categories.find(c => c.id === otherCatId)
            const otherOpt = otherCat?.options.find(o => o.id === otherOptId)
            warnings.push(`${option.name} may not work well with ${otherOpt?.name}`)
          }
        }
      }
    }
  }

  return Array.from(new Set(warnings)) // Remove duplicates
}

export function generateAIPrompt(selections: Record<string, string>): string {
  const lines: string[] = [
    'Analyze this full-stack technology selection for a web application:',
    '',
  ]

  for (const category of categories) {
    const selection = selections[category.id]
    if (selection) {
      const option = category.options.find(o => o.id === selection)
      lines.push(`${category.name}: ${option?.name || 'Unknown'}`)
    } else if (!category.skippable) {
      lines.push(`${category.name}: (not selected)`)
    } else {
      lines.push(`${category.name}: (skipped)`)
    }
  }

  lines.push('')
  lines.push('Please evaluate:')
  lines.push('1. Compatibility issues between these choices')
  lines.push('2. Performance implications')
  lines.push('3. Developer experience considerations')
  lines.push('4. Alternative suggestions for any problematic choices')
  lines.push('5. Missing components I should consider')
  lines.push('6. Overall assessment (1-10) with reasoning')

  return lines.join('\n')
}

export function generateMarkdown(selections: Record<string, string>): string {
  const lines: string[] = [
    '# Tech Stack Selection',
    '',
    '| Category | Selection |',
    '|----------|-----------|',
  ]

  for (const category of categories) {
    const selection = selections[category.id]
    if (selection) {
      const option = category.options.find(o => o.id === selection)
      lines.push(`| ${category.name} | ${option?.name || 'Unknown'} |`)
    } else {
      lines.push(`| ${category.name} | ${category.skippable ? '(skipped)' : '(not selected)'} |`)
    }
  }

  lines.push('')
  lines.push(`*Generated by [Substratia Stack Builder](https://substratia.io/tools/stack-builder)*`)

  return lines.join('\n')
}

export function generateJSON(selections: Record<string, string>): string {
  const result: Record<string, { category: string; selection: string | null; details?: TechOption }> = {}

  for (const category of categories) {
    const selection = selections[category.id]
    const option = selection ? category.options.find(o => o.id === selection) : null

    result[category.id] = {
      category: category.name,
      selection: option?.name || null,
      ...(option && { details: option }),
    }
  }

  return JSON.stringify(result, null, 2)
}

export function generateCSV(selections: Record<string, string>): string {
  const lines: string[] = ['Category,Selection,Description']

  for (const category of categories) {
    const selection = selections[category.id]
    const option = selection ? category.options.find(o => o.id === selection) : null
    const name = option?.name || (category.skippable ? 'Skipped' : 'Not selected')
    const desc = option?.description || ''
    lines.push(`"${category.name}","${name}","${desc}"`)
  }

  return lines.join('\n')
}
