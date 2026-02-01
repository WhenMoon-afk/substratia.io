import Link from "next/link";
import type { ReviewCta } from "@/data/reviewsData";

const variantStyles = {
  primary: "bg-forge-cyan text-forge-dark hover:bg-forge-cyan/80",
  secondary: "bg-forge-purple hover:bg-forge-purple/80",
  ghost: "bg-white/10 hover:bg-white/20",
};

export function ReviewCtaSection({ cta }: { cta: ReviewCta }) {
  return (
    <div className="max-w-4xl mx-auto bg-white/5 border border-white/10 rounded-xl p-8 text-center">
      <h2 className="text-2xl font-bold mb-4">{cta.title}</h2>
      <p className="text-gray-400 mb-6 max-w-xl mx-auto">{cta.description}</p>
      <div className="flex justify-center gap-4 flex-wrap">
        {cta.links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`px-6 py-3 rounded-xl font-semibold transition-all ${variantStyles[link.variant]}`}
          >
            {link.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
