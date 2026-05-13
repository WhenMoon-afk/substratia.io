"use client";

import { useState, useCallback, useMemo } from "react";
import Link from "next/link";
import ShareButton from "@/components/ShareButton";
import NewsletterCapture from "@/components/NewsletterCapture";
import RelatedTools from "@/components/RelatedTools";
import {
  downloadText as downloadTxtFile,
  downloadJson,
} from "@/lib/file-utils";
import {
  stylePresets,
  negativePresets,
  aspectRatios,
  formatPrompt,
  type Platform,
  type StyleCategory,
} from "@/data/imagePromptPresets";
import ControlsPanel, {
  type Sliders,
} from "@/components/image-prompt-generator/ControlsPanel";
import StylePresetsPanel from "@/components/image-prompt-generator/StylePresetsPanel";
import PromptPreview from "@/components/image-prompt-generator/PromptPreview";
import QuickStats from "@/components/image-prompt-generator/QuickStats";
import Tips from "@/components/image-prompt-generator/Tips";
import { useURLParamJSON } from "@/hooks/useURLParam";

interface ImagePromptState {
  platform?: Platform;
  subject?: string;
  selectedStyles?: string[];
  selectedNegatives?: string[];
  aspectRatio?: string;
  sliders?: Sliders;
}

const defaultSliders: Sliders = {
  styleIntensity: 50,
  detailLevel: 70,
  realism: 50,
  saturation: 50,
  contrast: 50,
};

export default function ImagePromptGeneratorPage() {
  const urlState = useURLParamJSON<ImagePromptState>("state");
  const [platform, setPlatform] = useState<Platform>(
    urlState?.platform ?? "nano-banana-pro",
  );
  const [subject, setSubject] = useState(urlState?.subject ?? "");
  const [selectedStyles, setSelectedStyles] = useState<string[]>(
    urlState?.selectedStyles ?? [],
  );
  const [selectedNegatives, setSelectedNegatives] = useState<string[]>(
    urlState?.selectedNegatives ?? ["quality", "anatomy"],
  );
  const [aspectRatio, setAspectRatio] = useState(
    urlState?.aspectRatio ?? "widescreen",
  );
  const [activeCategory, setActiveCategory] = useState<StyleCategory | null>(
    null,
  );
  const [sliders, setSliders] = useState<Sliders>(
    urlState?.sliders ?? defaultSliders,
  );
  const [shared, setShared] = useState(false);
  const [urlTooLong, setUrlTooLong] = useState(false);
  const [jsonCopied, setJsonCopied] = useState(false);

  const toggleStyle = useCallback((styleId: string) => {
    setSelectedStyles((prev) =>
      prev.includes(styleId)
        ? prev.filter((id) => id !== styleId)
        : [...prev, styleId],
    );
  }, []);

  const toggleNegative = useCallback((negativeId: string) => {
    setSelectedNegatives((prev) =>
      prev.includes(negativeId)
        ? prev.filter((id) => id !== negativeId)
        : [...prev, negativeId],
    );
  }, []);

  const updateSlider = useCallback((key: keyof Sliders, value: number) => {
    setSliders((prev) => ({ ...prev, [key]: value }));
  }, []);

  const selectedStylePresets = useMemo(
    () => stylePresets.filter((s) => selectedStyles.includes(s.id)),
    [selectedStyles],
  );

  const selectedNegativePresets = useMemo(
    () => negativePresets.filter((n) => selectedNegatives.includes(n.id)),
    [selectedNegatives],
  );

  const selectedAspectRatio = useMemo(
    () => aspectRatios.find((ar) => ar.id === aspectRatio) || aspectRatios[0],
    [aspectRatio],
  );

  const generatedPrompt = useMemo(() => {
    if (!subject.trim()) {
      return { positive: "", negative: "" };
    }
    return formatPrompt(
      subject,
      selectedStylePresets,
      selectedNegativePresets,
      selectedAspectRatio,
      sliders,
      platform,
    );
  }, [
    subject,
    selectedStylePresets,
    selectedNegativePresets,
    selectedAspectRatio,
    sliders,
    platform,
  ]);

  const getFullPrompt = useCallback(() => {
    return generatedPrompt.negative
      ? `${generatedPrompt.positive}\n\nNegative: ${generatedPrompt.negative}`
      : generatedPrompt.positive;
  }, [generatedPrompt]);

  const downloadPrompt = useCallback(() => {
    const fullPrompt = generatedPrompt.negative
      ? `Positive Prompt:\n${generatedPrompt.positive}\n\nNegative Prompt:\n${generatedPrompt.negative}`
      : generatedPrompt.positive;

    downloadTxtFile(fullPrompt, "image-prompt.txt");
  }, [generatedPrompt]);

  // Get current state for export/sharing
  const getCurrentState = useCallback(
    () => ({
      platform,
      subject,
      selectedStyles,
      selectedNegatives,
      aspectRatio,
      sliders,
    }),
    [
      platform,
      subject,
      selectedStyles,
      selectedNegatives,
      aspectRatio,
      sliders,
    ],
  );

  // Export as JSON
  const exportJSON = useCallback(async () => {
    const json = JSON.stringify(getCurrentState(), null, 2);
    await navigator.clipboard.writeText(json);
    setJsonCopied(true);
    setTimeout(() => setJsonCopied(false), 2000);
  }, [getCurrentState]);

  // Download as JSON file
  const downloadJSON = useCallback(() => {
    downloadJson(getCurrentState(), "image-prompt-config.json");
  }, [getCurrentState]);

  // Share via URL (with length validation)
  const MAX_URL_LENGTH = 2000;
  const shareURL = useCallback(async () => {
    const stateStr = btoa(JSON.stringify(getCurrentState()));
    const shareUrl = `${window.location.origin}${window.location.pathname}?state=${stateStr}`;
    if (shareUrl.length > MAX_URL_LENGTH) {
      setUrlTooLong(true);
      setTimeout(() => setUrlTooLong(false), 4000);
      return;
    }
    await navigator.clipboard.writeText(shareUrl);
    setShared(true);
    setTimeout(() => setShared(false), 2000);
  }, [getCurrentState]);

  return (
    <main className="min-h-screen text-white">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <Link
              href="/tools"
              className="text-forge-cyan hover:underline text-sm"
            >
              &larr; Back to Tools
            </Link>
            <ShareButton title="Image Prompt Generator - Substratia" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            Image <span className="text-forge-cyan">Prompt Generator</span>
          </h1>
          <p className="text-gray-400">
            Build AI image prompts visually. Select styles, adjust intensity,
            copy to your favorite platform.
          </p>
        </div>

        {/* Main Grid */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Column 1: Controls */}
          <ControlsPanel
            platform={platform}
            onPlatformChange={setPlatform}
            subject={subject}
            onSubjectChange={setSubject}
            aspectRatio={aspectRatio}
            onAspectRatioChange={setAspectRatio}
            sliders={sliders}
            onSliderChange={updateSlider}
            selectedNegatives={selectedNegatives}
            onToggleNegative={toggleNegative}
          />

          {/* Column 2: Style Presets */}
          <StylePresetsPanel
            selectedStyles={selectedStyles}
            onToggleStyle={toggleStyle}
            activeCategory={activeCategory}
            onCategoryChange={setActiveCategory}
          />

          {/* Column 3: Preview */}
          <div className="space-y-4">
            <PromptPreview
              platform={platform}
              generatedPrompt={generatedPrompt}
              getFullPrompt={getFullPrompt}
              hasSubject={!!subject.trim()}
              onDownloadPrompt={downloadPrompt}
              onShareURL={shareURL}
              onExportJSON={exportJSON}
              onDownloadJSON={downloadJSON}
              shared={shared}
              urlTooLong={urlTooLong}
              jsonCopied={jsonCopied}
            />

            <QuickStats
              stylesCount={selectedStyles.length}
              negativesCount={selectedNegatives.length}
              promptLength={generatedPrompt.positive.length}
            />

            <Tips />
          </div>
        </div>

        {/* Related Tools */}
        <RelatedTools currentPath="/tools/image-prompt-generator" />

        {/* CTA */}
        <div className="mt-12 text-center">
          <p className="text-gray-400 mb-4">Need to build video prompts too?</p>
          <div className="flex justify-center gap-4 flex-wrap">
            <Link
              href="/tools/video-prompt-timeline"
              className="inline-block px-6 py-3 bg-forge-purple hover:bg-forge-purple/80 rounded-xl font-semibold transition-all"
            >
              Try Video Prompt Timeline
            </Link>
            <Link
              href="/memory-tools"
              className="inline-block px-6 py-3 bg-white/10 hover:bg-white/20 rounded-xl font-semibold transition-all"
            >
              Explore Memory Tools
            </Link>
          </div>
        </div>

        {/* Newsletter */}
        <div className="mt-8 max-w-xl mx-auto">
          <NewsletterCapture source="image-prompt-generator" compact />
        </div>
      </div>
    </main>
  );
}
