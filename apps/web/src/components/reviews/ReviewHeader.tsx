import Link from "next/link";
import ShareButton from "@/components/ShareButton";
import type { ReviewPageConfig } from "@/data/reviewsData";

interface ReviewHeaderProps {
  config: ReviewPageConfig;
  onDownload: () => void;
}

export function ReviewHeader({ config, onDownload }: ReviewHeaderProps) {
  return (
    <div className="max-w-4xl mx-auto mb-12">
      <div className="flex items-center justify-between mb-4">
        <Link
          href={config.backHref}
          className="text-forge-cyan hover:underline text-sm"
        >
          &larr; {config.backLabel ?? "Back to Reviews"}
        </Link>
        <ShareButton title={config.shareTitle} />
      </div>
      <h1 className="text-4xl md:text-5xl font-bold mb-4">
        {config.heading}{" "}
        <span className="text-forge-cyan">{config.headingAccent}</span>
      </h1>
      <p className="text-xl text-gray-300 mb-6">{config.subtitle}</p>
      <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400">
        <span>Last updated: {config.lastUpdated}</span>
        <span>|</span>
        <span>{config.itemCount} tools compared</span>
        {config.author && (
          <>
            <span>|</span>
            <span>By {config.author}</span>
          </>
        )}
        <button
          onClick={onDownload}
          className="px-3 py-1 bg-forge-cyan/20 hover:bg-forge-cyan/30 text-forge-cyan rounded-lg transition-all"
        >
          Download .md
        </button>
      </div>
    </div>
  );
}
