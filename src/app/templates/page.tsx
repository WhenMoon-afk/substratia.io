'use client'

import Link from 'next/link'

interface Template {
  id: string
  name: string
  description: string
  price: number
  category: 'agent' | 'system' | 'course'
  features: string[]
  popular?: boolean
}

const templates: Template[] = [
  {
    id: 'loop-guardian',
    name: 'Loop Guardian System',
    description: 'Prevent AI agents from getting stuck in repetitive, unproductive loops. Battle-tested in production.',
    price: 29,
    category: 'agent',
    features: [
      'Anti-loop detection rules',
      'Action diversity checks',
      'Progress gates',
      'Retry budgets',
      'Escalation protocols'
    ],
    popular: true
  },
  {
    id: 'autonomous-ops',
    name: 'Autonomous Operations Guide',
    description: 'Run AI agents continuously without human intervention. Self-analyze, self-correct, adapt.',
    price: 39,
    category: 'agent',
    features: [
      'Iteration cycle framework',
      'Self-analysis protocol',
      'Decision trees',
      'Context management',
      'Emergency procedures'
    ]
  },
  {
    id: 'ceo-framework',
    name: 'CEO/Overseer Framework',
    description: 'Multi-agent orchestration system with hierarchical management structure.',
    price: 49,
    category: 'system',
    features: [
      'Hierarchical agent architecture',
      'Communication protocols',
      'Performance metrics',
      'Continuous improvement loop',
      'Emergency protocols'
    ],
    popular: true
  },
  {
    id: 'brainstorm-agent',
    name: 'Brainstorm Agent',
    description: 'Continuous idea generation and market research automation.',
    price: 19,
    category: 'agent',
    features: [
      'Research target list',
      'Execution loop',
      'Output format templates',
      'Competitor analysis'
    ]
  },
  {
    id: 'monitoring-agent',
    name: 'Monitoring & Metrics Agent',
    description: 'Track AI agent performance and business KPIs with actionable insights.',
    price: 29,
    category: 'agent',
    features: [
      'Performance metrics',
      'Daily/weekly reports',
      'Alert thresholds',
      'Trend analysis'
    ]
  },
  {
    id: 'complete-system',
    name: 'Company Overseer Complete',
    description: 'Full end-to-end AI automation system. Everything you need to run autonomous agents.',
    price: 199,
    category: 'system',
    features: [
      'All agent templates',
      'Browser automation safety',
      'Session handoff system',
      'Platform diversification',
      'Full source code',
      'Email support'
    ],
    popular: true
  }
]

export default function TemplatesPage() {
  const agents = templates.filter(t => t.category === 'agent')
  const systems = templates.filter(t => t.category === 'system')

  return (
    <main className="min-h-screen text-white">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Premium Agent Templates
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Production-ready templates from real AI systems.
            Skip months of trial and error.
          </p>
        </div>

        {/* Agent Templates */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <span className="text-forge-cyan">Agent Templates</span>
            <span className="text-sm font-normal text-gray-400">Individual agents for specific tasks</span>
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {agents.map(template => (
              <TemplateCard key={template.id} template={template} />
            ))}
          </div>
        </section>

        {/* System Bundles */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <span className="text-forge-purple">System Bundles</span>
            <span className="text-sm font-normal text-gray-400">Complete multi-agent solutions</span>
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {systems.map(template => (
              <TemplateCard key={template.id} template={template} />
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="text-center bg-white/5 border border-white/10 rounded-2xl p-8">
          <h2 className="text-2xl font-bold mb-4">Not sure which to choose?</h2>
          <p className="text-gray-300 mb-6">
            Try our free Agent Builder to create your own custom configuration.
          </p>
          <Link
            href="/builder"
            className="inline-block px-8 py-4 bg-forge-purple hover:bg-forge-purple/80 rounded-lg font-semibold transition-all"
          >
            Try Free Builder
          </Link>
        </section>
      </div>
    </main>
  )
}

function TemplateCard({ template }: { template: Template }) {
  return (
    <div className="bg-white/5 border border-white/10 rounded-xl p-6 hover:border-forge-purple/50 transition-all relative">
      {template.popular && (
        <span className="absolute -top-2 -right-2 px-3 py-1 bg-forge-cyan text-forge-dark text-xs font-bold rounded-full">
          POPULAR
        </span>
      )}
      <h3 className="text-xl font-semibold mb-2">{template.name}</h3>
      <p className="text-gray-400 text-sm mb-4">{template.description}</p>

      <ul className="space-y-1 mb-6">
        {template.features.map((feature, i) => (
          <li key={i} className="text-sm text-gray-300 flex items-center gap-2">
            <span className="text-forge-cyan">+</span>
            {feature}
          </li>
        ))}
      </ul>

      <div className="flex items-center justify-between">
        <span className="text-2xl font-bold">${template.price}</span>
        <button className="px-4 py-2 bg-forge-purple hover:bg-forge-purple/80 rounded-lg font-medium transition-all">
          Buy Now
        </button>
      </div>
    </div>
  )
}
