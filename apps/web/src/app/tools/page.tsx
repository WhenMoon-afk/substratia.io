"use client";

import Link from "next/link";
import ShareButton from "@/components/ShareButton";
import CtaSection from "@/components/home/CtaSection";
import { SectionDivider } from "@/components/SectionDivider";
import { Button } from "@/components/ui/Button";

// Static class map - avoids dynamic Tailwind class purging in production
const toolColorClasses = {
  purple: {
    hoverBorder: "hover:border-forge-purple/50",
    iconBg: "bg-forge-purple/20",
    iconText: "text-forge-purple",
  },
  cyan: {
    hoverBorder: "hover:border-forge-cyan/50",
    iconBg: "bg-forge-cyan/20",
    iconText: "text-forge-cyan",
  },
} as const;

const tools = [
  {
    name: "Memory Demo",
    description:
      "Experience AI memory in action. See how Claude remembers decisions, preferences, and learnings across sessions.",
    href: "/tools/memory-demo",
    icon: (
      <svg
        className="w-6 h-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
        />
      </svg>
    ),
    color: "purple" as const,
    badge: "Interactive",
  },
  {
    name: "Claude Code Cost Calculator",
    description:
      "Track session costs, compare API vs subscription pricing. Find your most cost-effective option.",
    href: "/tools/cost-calculator",
    icon: (
      <svg
        className="w-6 h-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
    color: "cyan" as const,
    badge: "New",
  },
  {
    name: "Claude Code Prompt Optimizer",
    description:
      "Build optimized prompts with thinking modes (ultrathink, thinkhard), autonomous loops, and snippets.",
    href: "/tools/prompt-optimizer",
    icon: (
      <svg
        className="w-6 h-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M13 10V3L4 14h7v7l9-11h-7z"
        />
      </svg>
    ),
    color: "purple" as const,
    badge: "New",
  },
  {
    name: "Claude Code Cheat Sheet",
    description:
      "Essential reference: slash commands, shortcuts, CLAUDE.md patterns, MCP config. Print or save as PDF.",
    href: "/tools/cheat-sheet",
    icon: (
      <svg
        className="w-6 h-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
        />
      </svg>
    ),
    color: "cyan" as const,
    badge: "Free",
  },
  {
    name: "Stack Builder",
    description:
      "Build your full-stack visually. Select technologies, check compatibility, export for AI analysis.",
    href: "/tools/stack-builder",
    icon: (
      <svg
        className="w-6 h-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
        />
      </svg>
    ),
    color: "cyan" as const,
    badge: "New",
  },
  {
    name: "Token Counter",
    description:
      "Count tokens, estimate costs, and check context window usage for Claude, GPT-4, and other models.",
    href: "/tools/token-counter",
    icon: (
      <svg
        className="w-6 h-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14"
        />
      </svg>
    ),
    color: "purple" as const,
    badge: "Popular",
  },
  {
    name: "Prompt Library",
    description:
      "Curated prompts for communication, creativity, productivity. Click to copy.",
    href: "/tools/prompts",
    icon: (
      <svg
        className="w-6 h-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
        />
      </svg>
    ),
    color: "cyan" as const,
    badge: "24 Prompts",
  },
  {
    name: "Seed Maker",
    description:
      "Generate high-entropy random strings from mouse movements. 100% client-side.",
    href: "/tools/seed-maker",
    icon: (
      <svg
        className="w-6 h-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
        />
      </svg>
    ),
    color: "purple" as const,
  },
  {
    name: "Image Prompt Generator",
    description:
      "Build AI image prompts visually. 50+ style presets, negative prompts, platform-specific output.",
    href: "/tools/image-prompt-generator",
    icon: (
      <svg
        className="w-6 h-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
        />
      </svg>
    ),
    color: "cyan" as const,
    badge: "New",
  },
  {
    name: "Video Prompt Timeline",
    description:
      "Build video prompts scene-by-scene. 7 keyframes, moment library, platform export.",
    href: "/tools/video-prompt-timeline",
    icon: (
      <svg
        className="w-6 h-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
        />
      </svg>
    ),
    color: "purple" as const,
    badge: "New",
  },
  {
    name: "Markdown Preview",
    description:
      "Live markdown editor with instant preview. Edit on the left, see rendered output on the right.",
    href: "/tools/markdown-preview",
    icon: (
      <svg
        className="w-6 h-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
        />
      </svg>
    ),
    color: "cyan" as const,
    badge: "New",
  },
  {
    name: "Markdown Stripper",
    description:
      "Remove all markdown formatting instantly. Paste markdown, get clean plain text.",
    href: "/tools/markdown-stripper",
    icon: (
      <svg
        className="w-6 h-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
        />
      </svg>
    ),
    color: "purple" as const,
    badge: "New",
  },
];

export default function ToolsIndexPage() {
  return (
    <main className="min-h-screen text-white relative">
      {/* Header */}
      <section className="relative z-10 pt-16 pb-12">
        <div className="container mx-auto px-4">
          <div className="flex justify-end mb-4 max-w-4xl mx-auto">
            <ShareButton title="Free AI Tools - Substratia" />
          </div>
          <div className="max-w-4xl mx-auto text-center animate-fade-up">
            <div className="inline-block px-4 py-1 bg-forge-cyan/20 border border-forge-cyan/50 rounded-full text-sm text-forge-cyan mb-4">
              Free Forever
            </div>
            <h1 className="text-4xl md:text-5xl font-bold font-display mb-4">
              AI <span className="hero-gradient-text">Tools</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Free utilities to improve your AI workflow. No signup required.
            </p>
          </div>
        </div>
      </section>

      <SectionDivider variant="cyan" />

      {/* Tools Grid */}
      <section className="relative z-10 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tools.map((tool, i) => (
              <Link
                key={tool.name}
                href={tool.href}
                className={`group glass rounded-xl p-6 transition-all relative hover:scale-[1.02] ${toolColorClasses[tool.color].hoverBorder} animate-fade-up`}
                style={{ animationDelay: `${Math.min(i * 50, 300)}ms` }}
              >
                {tool.badge && (
                  <span
                    className={`absolute -top-2 -right-2 px-2.5 py-0.5 text-xs font-semibold rounded-full ${
                      tool.badge === "Popular"
                        ? "bg-forge-purple text-white"
                        : tool.badge === "Interactive"
                          ? "bg-forge-purple text-white"
                          : "bg-forge-cyan text-forge-dark"
                    }`}
                  >
                    {tool.badge}
                  </span>
                )}
                <div
                  className={`w-12 h-12 rounded-xl ${toolColorClasses[tool.color].iconBg} flex items-center justify-center ${toolColorClasses[tool.color].iconText} mb-4 group-hover:scale-110 transition-transform`}
                  aria-hidden="true"
                >
                  {tool.icon}
                </div>
                <h2 className="text-lg font-bold mb-2 group-hover:text-forge-cyan transition-colors">
                  {tool.name}
                </h2>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {tool.description}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <SectionDivider variant="purple" />

      {/* Memory Infrastructure Section */}
      <section className="relative z-10 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center animate-fade-up">
            <h2 className="text-2xl md:text-3xl font-bold font-display mb-4">
              Memory <span className="text-forge-purple">Infrastructure</span>
            </h2>
            <p className="text-gray-400 mb-8 max-w-2xl mx-auto leading-relaxed">
              Beyond utilities - these are the core memory tools that give your
              AI persistent memory.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button href="/memory-tools" variant="purple" glow>
                View Memory Tools
              </Button>
              <Button
                href="/docs"
                variant="secondary"
                className="font-semibold"
              >
                Documentation
              </Button>
            </div>
          </div>
        </div>
      </section>

      <SectionDivider variant="cyan" />

      {/* CTA */}
      <CtaSection />
    </main>
  );
}
