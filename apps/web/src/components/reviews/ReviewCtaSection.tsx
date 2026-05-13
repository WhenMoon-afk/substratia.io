import { Button } from "@/components/ui/Button";
import type { ReviewCta } from "@/data/reviewsData";

export function ReviewCtaSection({ cta }: { cta: ReviewCta }) {
  return (
    <div className="max-w-4xl mx-auto bg-white/5 border border-white/10 rounded-xl p-8 text-center">
      <h2 className="text-2xl font-bold mb-4">{cta.title}</h2>
      <p className="text-gray-400 mb-6 max-w-xl mx-auto">{cta.description}</p>
      <div className="flex justify-center gap-4 flex-wrap">
        {cta.links.map((link) => (
          <Button key={link.href} href={link.href} variant={link.variant}>
            {link.label}
          </Button>
        ))}
      </div>
    </div>
  );
}
