import Link from "next/link";
import { tokenTips } from "@/data/tokenCounterData";

export default function TokenTips() {
  return (
    <div className="max-w-4xl mx-auto mt-12">
      <h2 className="text-xl font-bold mb-4">Token Tips</h2>
      <div className="grid md:grid-cols-3 gap-4">
        {tokenTips.map((tip) => (
          <div
            key={tip.title}
            className="bg-white/5 border border-white/10 rounded-xl p-4"
          >
            <h3 className="font-semibold text-forge-cyan mb-2">{tip.title}</h3>
            <p className="text-sm text-gray-400">
              {tip.linkText && tip.linkHref ? (
                <>
                  {tip.description.split(tip.linkText)[0]}
                  <Link
                    href={tip.linkHref}
                    className="text-forge-purple hover:underline"
                  >
                    {tip.linkText}
                  </Link>
                  {tip.description.split(tip.linkText)[1]}
                </>
              ) : (
                tip.description
              )}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
