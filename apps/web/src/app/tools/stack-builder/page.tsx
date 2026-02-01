"use client";

import { useState, useCallback, useMemo, useEffect } from "react";
import Link from "next/link";
import ShareButton from "@/components/ShareButton";
import NewsletterCapture from "@/components/NewsletterCapture";
import RelatedTools from "@/components/RelatedTools";
import ProgressBar from "@/components/stack-builder/ProgressBar";
import CategorySelector from "@/components/stack-builder/CategorySelector";
import OptionDetails from "@/components/stack-builder/OptionDetails";
import StackSummary from "@/components/stack-builder/StackSummary";
import ExportPanel from "@/components/stack-builder/ExportPanel";
import { downloadFile } from "@/lib/file-utils";
import {
  categories,
  getCompatibilityWarnings,
  generateAIPrompt,
  generateMarkdown,
  generateCSV,
  generateJSON,
  type TechOption,
} from "@/data/stackBuilderPresets";

export default function StackBuilderPage() {
  const [selections, setSelections] = useState<Record<string, string>>({});
  const [skipped, setSkipped] = useState<Record<string, boolean>>({});
  const [activeCategory, setActiveCategory] = useState(0);
  const [hoveredOption, setHoveredOption] = useState<TechOption | null>(null);
  const [shared, setShared] = useState(false);
  const [urlTooLong, setUrlTooLong] = useState(false);

  // Load state from URL on mount
  useEffect(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    const stateParam = params.get("stack");
    if (stateParam) {
      try {
        const decoded = JSON.parse(atob(stateParam));
        if (decoded && typeof decoded === "object") {
          setSelections(decoded);
        }
      } catch {
        // Invalid state param, ignore
      }
    }
  }, []);

  // Share via URL (with length validation)
  const MAX_URL_LENGTH = 2000;
  const shareStack = useCallback(async () => {
    const stateStr = btoa(JSON.stringify(selections));
    const shareUrl = `${window.location.origin}${window.location.pathname}?stack=${stateStr}`;
    if (shareUrl.length > MAX_URL_LENGTH) {
      setUrlTooLong(true);
      setTimeout(() => setUrlTooLong(false), 4000);
      return;
    }
    await navigator.clipboard.writeText(shareUrl);
    setShared(true);
    setTimeout(() => setShared(false), 2000);
  }, [selections]);

  const currentCategory = categories[activeCategory];
  const warnings = useMemo(
    () => getCompatibilityWarnings(selections),
    [selections],
  );

  const selectOption = useCallback(
    (optionId: string) => {
      setSelections((prev) => ({
        ...prev,
        [currentCategory.id]:
          prev[currentCategory.id] === optionId ? "" : optionId,
      }));
      setSkipped((prev) => ({ ...prev, [currentCategory.id]: false }));
    },
    [currentCategory.id],
  );

  const skipCategory = useCallback(() => {
    setSelections((prev) => ({ ...prev, [currentCategory.id]: "" }));
    setSkipped((prev) => ({ ...prev, [currentCategory.id]: true }));
  }, [currentCategory.id]);

  const nextCategory = useCallback(() => {
    if (activeCategory < categories.length - 1) {
      setActiveCategory((prev) => prev + 1);
    }
  }, [activeCategory]);

  const prevCategory = useCallback(() => {
    if (activeCategory > 0) {
      setActiveCategory((prev) => prev - 1);
    }
  }, [activeCategory]);

  const selectedCount = useMemo(() => {
    return Object.values(selections).filter(Boolean).length;
  }, [selections]);

  const aiPrompt = useMemo(() => generateAIPrompt(selections), [selections]);

  const downloadStack = useCallback(
    (format: "markdown" | "csv" | "json") => {
      let content: string;
      let filename: string;

      switch (format) {
        case "markdown":
          content = generateMarkdown(selections);
          filename = "stack.md";
          break;
        case "csv":
          content = generateCSV(selections);
          filename = "stack.csv";
          break;
        case "json":
          content = generateJSON(selections);
          filename = "stack.json";
          break;
      }

      downloadFile(content, filename);
    },
    [selections],
  );

  const clearAll = useCallback(() => {
    setSelections({});
    setSkipped({});
    setActiveCategory(0);
  }, []);

  const isOptionIncompatible = useCallback(
    (option: TechOption) => {
      if (!option.incompatibleWith) return false;
      return option.incompatibleWith.some((id) =>
        Object.values(selections).includes(id),
      );
    },
    [selections],
  );

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
            <ShareButton title="Stack Builder - Substratia" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            Stack <span className="text-forge-cyan">Builder</span>
          </h1>
          <p className="text-gray-400">
            Build your perfect full-stack. Select technologies, check
            compatibility, export for AI analysis.
          </p>
        </div>

        {/* Progress */}
        <ProgressBar
          activeCategory={activeCategory}
          selections={selections}
          skipped={skipped}
          onCategoryClick={setActiveCategory}
        />

        {/* Main Grid */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Column 1: Category Selector */}
          <div className="lg:col-span-2 space-y-6">
            <CategorySelector
              category={currentCategory}
              selections={selections}
              skipped={skipped}
              activeCategory={activeCategory}
              totalCategories={categories.length}
              isOptionIncompatible={isOptionIncompatible}
              onSelectOption={selectOption}
              onSkipCategory={skipCategory}
              onNext={nextCategory}
              onPrev={prevCategory}
              onHoverOption={setHoveredOption}
            />

            {/* Option Details (Hover) */}
            {hoveredOption && <OptionDetails option={hoveredOption} />}
          </div>

          {/* Column 2: Selections Summary */}
          <div className="space-y-4">
            <StackSummary
              selections={selections}
              skipped={skipped}
              onClearAll={clearAll}
            />

            {/* Warnings */}
            {warnings.length > 0 && (
              <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4">
                <h3 className="font-bold text-red-400 mb-2">
                  Compatibility Notes
                </h3>
                <ul className="text-sm text-red-300 space-y-1">
                  {warnings.map((warning, i) => (
                    <li key={i}>- {warning}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Stats */}
            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-forge-cyan">
                    {selectedCount}
                  </div>
                  <div className="text-xs text-gray-500">Selected</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-forge-purple">
                    {warnings.length}
                  </div>
                  <div className="text-xs text-gray-500">Warnings</div>
                </div>
              </div>
            </div>

            {/* Export Options */}
            <ExportPanel
              selectedCount={selectedCount}
              aiPrompt={aiPrompt}
              shared={shared}
              urlTooLong={urlTooLong}
              onDownload={downloadStack}
              onShare={shareStack}
            />

            {/* Tips */}
            <div className="bg-linear-to-r from-forge-purple/20 to-forge-cyan/20 rounded-xl p-4">
              <h3 className="font-medium mb-2">Tips</h3>
              <ul className="text-sm text-gray-400 space-y-1">
                <li>- Hover options to see pros/cons</li>
                <li>- Skip categories you don&apos;t need</li>
                <li>- Export AI prompt for Claude/GPT analysis</li>
                <li>- Check warnings for incompatibilities</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Related Tools */}
        <RelatedTools currentPath="/tools/stack-builder" />

        {/* CTA */}
        <div className="mt-12 text-center">
          <p className="text-gray-400 mb-4">
            Need help optimizing your Claude Code prompts?
          </p>
          <div className="flex justify-center gap-4 flex-wrap">
            <Link
              href="/tools/prompt-optimizer"
              className="inline-block px-6 py-3 bg-forge-purple hover:bg-forge-purple/80 rounded-xl font-semibold transition-all"
            >
              Try Prompt Optimizer
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
          <NewsletterCapture source="stack-builder" compact />
        </div>
      </div>
    </main>
  );
}
