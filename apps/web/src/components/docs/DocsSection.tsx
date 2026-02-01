"use client";

import { useCallback, useState } from "react";
import { type Section } from "@/data/docsData";

interface DocsSectionProps {
  section: Section;
}

export default function DocsSection({ section }: DocsSectionProps) {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [shared, setShared] = useState(false);

  const copyCode = useCallback(async (code: string, id: string) => {
    await navigator.clipboard.writeText(code);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(null), 2000);
  }, []);

  const shareSection = useCallback(async () => {
    const shareUrl = `${window.location.origin}${window.location.pathname}#${section.id}`;
    await navigator.clipboard.writeText(shareUrl);
    setShared(true);
    setTimeout(() => setShared(false), 2000);
  }, [section.id]);

  return (
    <section id={section.id} className="mb-16 scroll-mt-24">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-forge-cyan">{section.title}</h2>
        <button
          onClick={shareSection}
          className={`px-3 py-1 text-xs rounded-lg transition-all ${
            shared
              ? "bg-green-500 text-white"
              : "bg-forge-cyan/20 hover:bg-forge-cyan/30 text-forge-cyan"
          }`}
        >
          {shared ? "Link Copied!" : "Share"}
        </button>
      </div>
      <div className="space-y-8">
        {section.content.map((item, idx) => (
          <div
            key={idx}
            className="bg-white/5 border border-white/10 rounded-xl p-6"
          >
            <h3 className="text-xl font-semibold mb-3">{item.title}</h3>

            {item.text && <p className="text-gray-400">{item.text}</p>}

            {item.steps && (
              <ol className="list-decimal list-inside space-y-2 text-gray-400">
                {item.steps.map((step, i) => (
                  <li key={i}>{step}</li>
                ))}
              </ol>
            )}

            {item.code && (
              <div className="mt-4 relative">
                <pre className="bg-forge-dark border border-white/10 rounded-lg p-4 overflow-x-auto text-sm pr-16">
                  {item.code}
                </pre>
                <button
                  onClick={() => copyCode(item.code!, `${section.id}-${idx}`)}
                  className={`absolute top-2 right-2 px-2 py-1 text-xs rounded transition-all ${
                    copiedCode === `${section.id}-${idx}`
                      ? "bg-green-500 text-white"
                      : "bg-white/10 hover:bg-white/20"
                  }`}
                >
                  {copiedCode === `${section.id}-${idx}` ? "Copied!" : "Copy"}
                </button>
              </div>
            )}

            {item.list && (
              <ul className="space-y-3">
                {item.list.map((listItem, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="text-forge-purple font-semibold">
                      {listItem.name}:
                    </span>
                    <span className="text-gray-400">{listItem.desc}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
