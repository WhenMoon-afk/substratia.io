"use client";

import { CheckIcon } from "@/components/ui/icons";

const tiers = [
  {
    name: "Free",
    price: "$0",
    period: "/mo",
    description: "Try before you buy",
    features: ["500 memories", "50 snapshots", "Local-first", "Full privacy"],
    cta: "Try Free",
    href: "/start-here",
    highlight: false,
  },
  {
    name: "Shell",
    price: "$3",
    period: "/mo",
    description: "For active agents",
    features: [
      "2,000 memories",
      "200 snapshots",
      "Priority sync",
      "Crypto payment",
    ],
    cta: "Get Shell",
    href: "/start-here?tier=shell",
    highlight: true,
  },
  {
    name: "Pro",
    price: "$5",
    period: "/mo",
    description: "Full autonomy",
    features: [
      "10,000 memories",
      "1,000 snapshots",
      "Full Animus",
      "API access",
      "Crypto payment",
    ],
    cta: "Go Pro",
    href: "/start-here?tier=pro",
    highlight: false,
  },
];

export default function PricingSection() {
  return (
    <section aria-label="Pricing" className="relative z-10 py-24" id="pricing">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16 animate-fade-up">
            <h2 className="text-3xl md:text-4xl font-bold font-display mb-4">
              Simple Pricing.{" "}
              <span className="text-forge-cyan">No surprises.</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Start free, upgrade when you need more. Agents can pay with crypto
              - no human needed.
            </p>
          </div>

          {/* Pricing Cards */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {tiers.map((tier, index) => (
              <div
                key={tier.name}
                className={`relative glass rounded-2xl p-6 border transition-all duration-300 hover:scale-[1.02] animate-fade-up ${
                  tier.highlight
                    ? "border-forge-cyan glow-cyan"
                    : "border-white/10 hover:border-white/20"
                }`}
                style={{ animationDelay: `${0.1 + index * 0.1}s` }}
              >
                {tier.highlight && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-forge-cyan text-forge-dark text-xs font-bold rounded-full">
                    POPULAR
                  </div>
                )}

                <div className="text-center mb-6">
                  <h3 className="text-xl font-bold mb-2">{tier.name}</h3>
                  <div className="flex items-baseline justify-center gap-1">
                    <span className="text-4xl font-bold text-white">
                      {tier.price}
                    </span>
                    <span className="text-gray-400">{tier.period}</span>
                  </div>
                  <p className="text-sm text-gray-500 mt-2">
                    {tier.description}
                  </p>
                </div>

                <ul className="space-y-3 mb-6">
                  {tier.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-center gap-2 text-sm text-gray-300"
                    >
                      <CheckIcon
                        className={`w-4 h-4 flex-shrink-0 ${tier.highlight ? "text-forge-cyan" : "text-green-400"}`}
                      />
                      {feature}
                    </li>
                  ))}
                </ul>

                <a
                  href={tier.href}
                  className={`block w-full py-3 px-4 text-center rounded-xl font-semibold transition-all ${
                    tier.highlight
                      ? "bg-forge-cyan text-forge-dark hover:bg-forge-cyan/90"
                      : "bg-white/5 text-white hover:bg-white/10 border border-white/10"
                  }`}
                >
                  {tier.cta}
                </a>
              </div>
            ))}
          </div>

          {/* Crypto note */}
          <div className="text-center animate-fade-up delay-400">
            <p className="inline-flex items-center gap-2 text-sm text-gray-400 bg-white/5 px-4 py-2 rounded-full border border-white/10">
              <span className="text-lg">🤖</span>
              Agents can self-provision and pay with crypto - no human required
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
