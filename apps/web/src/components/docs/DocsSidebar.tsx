"use client";

import Link from "next/link";
import { type Section } from "@/data/docsData";

interface DocsSidebarProps {
  sections: Section[];
}

export default function DocsSidebar({ sections }: DocsSidebarProps) {
  return (
    <aside className="hidden lg:block w-64 flex-shrink-0">
      <div className="sticky top-24">
        <h3 className="text-sm font-semibold text-gray-400 mb-4">
          ON THIS PAGE
        </h3>
        <nav className="space-y-2">
          {sections.map((section) => (
            <a
              key={section.id}
              href={`#${section.id}`}
              className="block text-gray-400 hover:text-white transition-colors"
            >
              {section.title}
            </a>
          ))}
        </nav>
        <div className="mt-8 pt-8 border-t border-white/10">
          <Link
            href="/tools"
            className="block px-4 py-2 bg-forge-purple hover:bg-forge-purple/80 rounded-lg text-center font-medium transition-all"
          >
            Browse Tools
          </Link>
        </div>
      </div>
    </aside>
  );
}
