import Link from "next/link";
import type { RelatedLink } from "@/data/reviewsData";

export function RelatedLinks({ links }: { links: RelatedLink[] }) {
  return (
    <div className="max-w-4xl mx-auto mt-12">
      <h2 className="text-xl font-bold mb-4">Related Comparisons</h2>
      <div className="flex flex-wrap gap-4">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-sm transition-all"
          >
            {link.label} &rarr;
          </Link>
        ))}
      </div>
    </div>
  );
}
