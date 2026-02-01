"use client";

import { memo } from "react";
import Link from "next/link";
import { siteConfig } from "@/lib/site-config";

interface Tool {
  title: string;
  subtitle: string;
  description: string;
  code: string;
  footer: { left: string; right: string; rightHref?: string };
  href?: string;
  color: "cyan" | "purple";
  icon: "play" | "database" | "gear";
  featured?: boolean;
}

const tools: Tool[] = [
  {
    title: "Try Demo",
    subtitle: "See Memory in Action",
    description:
      "Experience how Claude remembers decisions, preferences, and learnings across sessions.",
    code: "Interactive \u2022 No signup",
    footer: { left: "3 demo scenarios", right: "Try Now \u2192" },
    href: "/tools/memory-demo",
    color: "cyan",
    icon: "play",
  },
  {
    title: "memory-mcp",
    subtitle: "Persistent Memory",
    description:
      "Store decisions, preferences, learnings. Automatic hooks save important context.",
    code: "/plugin install memory-mcp@substratia-marketplace",
    footer: {
      left: "MIT licensed",
      right: "GitHub",
      rightHref: siteConfig.links.repos.memoryMcp,
    },
    color: "purple",
    icon: "database",
    featured: true,
  },
  {
    title: "Dev Tools",
    subtitle: "12+ Free Utilities",
    description:
      "Cost calculator, prompt optimizer, cheat sheet, token counter, and more. No signup required.",
    code: "Free forever \u2022 No signup",
    footer: { left: "MIT licensed", right: "Browse Tools \u2192" },
    href: "/tools",
    color: "cyan",
    icon: "gear",
  },
];

const icons = {
  play: (
    <>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </>
  ),
  database: (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4"
    />
  ),
  gear: (
    <>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
      />
    </>
  ),
};

function ToolCard({ tool }: { tool: Tool }) {
  const colorClass =
    tool.color === "cyan" ? "text-forge-cyan" : "text-forge-purple";
  const bgClass =
    tool.color === "cyan" ? "bg-forge-cyan/20" : "bg-forge-purple/20";
  const codeColor =
    tool.color === "cyan" ? "text-forge-cyan" : "text-forge-purple";

  const content = (
    <>
      {tool.featured && (
        <div className="absolute top-3 right-3">
          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-forge-purple/20 text-forge-purple border border-forge-purple/30">
            Featured
          </span>
        </div>
      )}
      <div className="flex items-center gap-3 mb-4">
        <div
          className={`w-12 h-12 rounded-xl ${bgClass} flex items-center justify-center transition-transform group-hover:scale-110`}
          aria-hidden="true"
        >
          <svg
            className={`w-6 h-6 ${colorClass}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            {icons[tool.icon]}
          </svg>
        </div>
        <div>
          <h3
            className={`text-xl font-bold ${tool.icon === "database" ? "font-mono" : ""}`}
          >
            {tool.title}
          </h3>
          <span className={`text-xs ${colorClass}`}>{tool.subtitle}</span>
        </div>
      </div>
      <p className="text-gray-400 text-sm mb-4">{tool.description}</p>
      <div className="code-block text-xs mb-4">
        <code className={codeColor}>{tool.code}</code>
      </div>
      <div className="flex items-center justify-between">
        <span className="text-xs text-gray-500">{tool.footer.left}</span>
        {tool.footer.rightHref ? (
          <a
            href={tool.footer.rightHref}
            target="_blank"
            rel="noopener noreferrer"
            className={`text-sm ${colorClass} hover:underline`}
            onClick={(e) => e.stopPropagation()}
          >
            {tool.footer.right}
          </a>
        ) : (
          <span className={`text-sm ${colorClass}`}>{tool.footer.right}</span>
        )}
      </div>
    </>
  );

  const cardClasses = `group tool-card gradient-border p-6 rounded-2xl relative ${
    tool.featured
      ? "border-2 border-forge-purple/30 ring-1 ring-forge-purple/10"
      : "hover:border-forge-cyan/50 transition-all"
  }`;

  if (tool.href) {
    return (
      <Link href={tool.href} className={`${cardClasses} block`}>
        {content}
      </Link>
    );
  }

  return <div className={cardClasses}>{content}</div>;
}

export default memo(function ToolsShowcase() {
  return (
    <section
      aria-label="Featured tools"
      className="relative z-10 py-24 bg-gradient-to-b from-transparent via-forge-dark-lighter/50 to-transparent"
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold font-display mb-4">
            Built for{" "}
            <span className="text-forge-purple">Claude Code Power Users</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Free, open-source, MIT licensed. The only memory tools built
            specifically for Claude Code.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {tools.map((tool) => (
            <ToolCard key={tool.title} tool={tool} />
          ))}
        </div>
      </div>
    </section>
  );
});
