import Link from "next/link";
import { siteConfig } from "@/lib/site-config";

const resources = [
  {
    href: siteConfig.links.repos.momentum,
    external: true,
    label: "GitHub",
    labelColor: "text-forge-cyan",
    title: "momentum",
    desc: "Fast context recovery plugin",
    hoverBorder: "hover:border-forge-cyan/50",
  },
  {
    href: siteConfig.links.repos.memoryMcp,
    external: true,
    label: "GitHub",
    labelColor: "text-forge-purple",
    title: "memory-mcp",
    desc: "Persistent memory MCP server",
    hoverBorder: "hover:border-forge-purple/50",
  },
  {
    href: "/blog/how-to-build-claude-agents",
    external: false,
    label: "Blog",
    labelColor: "text-forge-cyan",
    title: "How to Build Claude Agents",
    desc: "Complete guide to CLAUDE.md files",
    hoverBorder: "hover:border-forge-purple/50",
  },
  {
    href: "/memory-tools",
    external: false,
    label: "Tools",
    labelColor: "text-forge-cyan",
    title: "Memory Tools",
    desc: "Explore the full ecosystem",
    hoverBorder: "hover:border-forge-purple/50",
  },
];

export default function RelatedResources() {
  return (
    <section className="mt-16 pt-8">
      <h2 className="text-2xl font-bold mb-6 animate-fade-up">
        Related <span className="hero-gradient-text">Resources</span>
      </h2>
      <div className="grid md:grid-cols-2 gap-4">
        {resources.map((r, i) =>
          r.external ? (
            <a
              key={r.title}
              href={r.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`glass p-4 rounded-xl ${r.hoverBorder} hover:scale-[1.02] transition-all animate-fade-up`}
              style={{ animationDelay: `${i * 75}ms` }}
            >
              <div className={`${r.labelColor} text-sm mb-1`}>{r.label}</div>
              <div className="font-semibold">{r.title}</div>
              <div className="text-sm text-gray-400 mt-1">{r.desc}</div>
            </a>
          ) : (
            <Link
              key={r.title}
              href={r.href}
              className={`glass p-4 rounded-xl ${r.hoverBorder} hover:scale-[1.02] transition-all animate-fade-up`}
              style={{ animationDelay: `${i * 75}ms` }}
            >
              <div className={`${r.labelColor} text-sm mb-1`}>{r.label}</div>
              <div className="font-semibold">{r.title}</div>
              <div className="text-sm text-gray-400 mt-1">{r.desc}</div>
            </Link>
          ),
        )}
      </div>
    </section>
  );
}
