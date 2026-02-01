"use client";

import { useState, useCallback, useMemo, useEffect } from "react";
import Link from "next/link";
import ShareButton from "@/components/ShareButton";
import NewsletterCapture from "@/components/NewsletterCapture";
import CopyButton from "@/components/CopyButton";
import RelatedTools from "@/components/RelatedTools";
import { downloadText as downloadTxtFile } from "@/lib/file-utils";
import { stripMarkdown } from "@/lib/strip-markdown";
import StripperStats from "./StripperStats";
import WhatGetsStripped from "./WhatGetsStripped";

export default function MarkdownStripperPage() {
  const [input, setInput] = useState("");

  const strippedText = useMemo(() => stripMarkdown(input), [input]);

  const clearAll = useCallback(() => {
    setInput("");
  }, []);

  const pasteFromClipboard = useCallback(async () => {
    try {
      const text = await navigator.clipboard.readText();
      setInput(text);
    } catch {
      // Clipboard access denied
    }
  }, []);

  const downloadText = useCallback(() => {
    if (!strippedText) return;
    downloadTxtFile(strippedText, "stripped-text.txt");
  }, [strippedText]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        clearAll();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [clearAll]);

  const charDiff = input.length - strippedText.length;
  const percentReduced =
    input.length > 0 ? Math.round((charDiff / input.length) * 100) : 0;
  const inputWords = input.trim() ? input.trim().split(/\s+/).length : 0;
  const outputWords = strippedText.trim()
    ? strippedText.trim().split(/\s+/).length
    : 0;

  return (
    <main className="min-h-screen text-white">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <Link
              href="/tools"
              className="text-forge-cyan hover:underline text-sm"
            >
              &larr; Back to Tools
            </Link>
            <ShareButton title="Markdown Stripper - Substratia" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            Markdown <span className="text-forge-cyan">Stripper</span>
          </h1>
          <p className="text-gray-400">
            Paste markdown text, get clean plain text instantly. Removes all
            formatting.
          </p>
        </div>

        {/* Main Grid */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Input */}
          <div className="bg-white/5 border border-white/10 rounded-xl p-4">
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-sm font-medium text-gray-400">
                Markdown Input
              </h3>
              <div className="flex gap-2">
                <button
                  onClick={pasteFromClipboard}
                  className="px-3 py-1 text-xs bg-white/10 hover:bg-white/20 rounded-lg transition-all"
                >
                  Paste
                </button>
                <button
                  onClick={clearAll}
                  className="px-3 py-1 text-xs bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-lg transition-all flex items-center gap-1"
                >
                  Clear
                  <kbd className="hidden sm:inline px-1 py-0.5 text-[10px] bg-red-500/20 rounded">
                    ⌘K
                  </kbd>
                </button>
              </div>
            </div>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={`Paste your markdown here...

# Example Heading
This is **bold** and *italic* text.
- List item 1
- List item 2

[Link text](https://example.com)

\`inline code\``}
              className="w-full h-64 sm:h-[400px] px-4 py-3 bg-black/30 border border-white/10 rounded-lg focus:outline-none focus:border-forge-cyan text-white font-mono text-sm resize-none"
            />
            <div className="mt-2 text-xs text-gray-500">
              {input.length.toLocaleString()} characters
            </div>
          </div>

          {/* Output */}
          <div className="bg-white/5 border border-white/10 rounded-xl p-4">
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-sm font-medium text-gray-400">
                Plain Text Output
              </h3>
              <div className="flex gap-2">
                <CopyButton
                  text={strippedText}
                  label="Copy"
                  successMessage="Plain text copied!"
                  disabled={!strippedText}
                  size="sm"
                />
                <button
                  onClick={downloadText}
                  disabled={!strippedText}
                  className="px-4 py-2 text-sm bg-white/10 hover:bg-white/20 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Download
                </button>
              </div>
            </div>
            <div className="w-full h-64 sm:h-[400px] px-4 py-3 bg-black/30 border border-white/10 rounded-lg overflow-auto">
              {strippedText ? (
                <pre className="text-white text-sm whitespace-pre-wrap break-words font-sans">
                  {strippedText}
                </pre>
              ) : (
                <p className="text-gray-500 italic text-sm">
                  Plain text will appear here...
                </p>
              )}
            </div>
            <div className="mt-2 text-xs text-gray-500">
              {strippedText.length.toLocaleString()} characters
              {charDiff > 0 && (
                <span className="text-forge-cyan ml-2">
                  ({charDiff.toLocaleString()} chars removed, {percentReduced}%
                  reduction)
                </span>
              )}
            </div>
          </div>
        </div>

        <StripperStats
          inputLength={input.length}
          outputLength={strippedText.length}
          charsRemoved={charDiff}
          percentReduced={percentReduced}
          inputWords={inputWords}
          outputWords={outputWords}
        />

        <WhatGetsStripped />

        {/* Related Tools */}
        <RelatedTools currentPath="/tools/markdown-stripper" />

        {/* CTA */}
        <div className="mt-12 text-center">
          <p className="text-gray-400 mb-4">
            Need to preview markdown instead?
          </p>
          <div className="flex justify-center gap-4 flex-wrap">
            <Link
              href="/tools/markdown-preview"
              className="inline-block px-6 py-3 bg-forge-purple hover:bg-forge-purple/80 rounded-xl font-semibold transition-all"
            >
              Try Markdown Preview
            </Link>
            <Link
              href="/tools"
              className="inline-block px-6 py-3 bg-white/10 hover:bg-white/20 rounded-xl font-semibold transition-all"
            >
              All Tools
            </Link>
          </div>
        </div>

        {/* Newsletter */}
        <div className="mt-8 max-w-xl mx-auto">
          <NewsletterCapture source="markdown-stripper" compact />
        </div>
      </div>
    </main>
  );
}
