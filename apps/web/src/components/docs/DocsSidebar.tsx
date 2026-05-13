"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { type Section } from "@/data/docsData";

interface DocsSidebarProps {
  sections: Section[];
}

export default function DocsSidebar({ sections }: DocsSidebarProps) {
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        }
      },
      { rootMargin: "-20% 0px -60% 0px", threshold: 0 },
    );

    for (const section of sections) {
      const el = document.getElementById(section.id);
      if (el) observer.observe(el);
    }

    return () => observer.disconnect();
  }, [sections]);

  return (
    <aside className="hidden lg:block w-64 shrink-0">
      <div className="sticky top-24 glass rounded-xl p-5">
        <h3 className="text-sm font-semibold text-forge-cyan mb-4 tracking-wider">
          ON THIS PAGE
        </h3>
        <nav className="space-y-2">
          {sections.map((section) => (
            <a
              key={section.id}
              href={`#${section.id}`}
              className={`block text-sm transition-all ${
                activeId === section.id
                  ? "text-forge-cyan translate-x-1 font-medium"
                  : "text-gray-400 hover:text-white hover:translate-x-1"
              }`}
            >
              {activeId === section.id && (
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-forge-cyan mr-2 align-middle" />
              )}
              {section.title}
            </a>
          ))}
        </nav>
        <div className="mt-6 pt-6 border-t border-white/10">
          <Link
            href="/tools"
            className="block px-4 py-2 bg-forge-purple hover:bg-forge-purple/80 rounded-lg text-center font-medium transition-all text-sm"
          >
            Browse Tools
          </Link>
        </div>
      </div>
    </aside>
  );
}
