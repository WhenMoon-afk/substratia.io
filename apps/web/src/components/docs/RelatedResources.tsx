import Link from "next/link";
import { siteConfig } from "@/lib/site-config";

export default function RelatedResources() {
  return (
    <section className="mt-16 pt-8 border-t border-white/10">
      <h2 className="text-2xl font-bold mb-6">Related Resources</h2>
      <div className="grid md:grid-cols-2 gap-4">
        <a
          href={siteConfig.links.repos.momentum}
          target="_blank"
          rel="noopener noreferrer"
          className="p-4 bg-white/5 border border-white/10 rounded-xl hover:border-forge-cyan transition-all"
        >
          <div className="text-forge-cyan text-sm mb-1">GitHub</div>
          <div className="font-semibold">momentum</div>
          <div className="text-sm text-gray-400 mt-1">
            Fast context recovery plugin
          </div>
        </a>
        <a
          href={siteConfig.links.repos.memoryMcp}
          target="_blank"
          rel="noopener noreferrer"
          className="p-4 bg-white/5 border border-white/10 rounded-xl hover:border-forge-purple transition-all"
        >
          <div className="text-forge-purple text-sm mb-1">GitHub</div>
          <div className="font-semibold">memory-mcp</div>
          <div className="text-sm text-gray-400 mt-1">
            Persistent memory MCP server
          </div>
        </a>
        <Link
          href="/blog/how-to-build-claude-agents"
          className="p-4 bg-white/5 border border-white/10 rounded-xl hover:border-forge-purple transition-all"
        >
          <div className="text-forge-cyan text-sm mb-1">Blog</div>
          <div className="font-semibold">How to Build Claude Agents</div>
          <div className="text-sm text-gray-400 mt-1">
            Complete guide to CLAUDE.md files
          </div>
        </Link>
        <Link
          href="/templates"
          className="p-4 bg-white/5 border border-white/10 rounded-xl hover:border-forge-purple transition-all"
        >
          <div className="text-forge-cyan text-sm mb-1">Tools</div>
          <div className="font-semibold">Memory Tools</div>
          <div className="text-sm text-gray-400 mt-1">
            Explore the full ecosystem
          </div>
        </Link>
      </div>
    </section>
  );
}
