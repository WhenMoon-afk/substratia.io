const testimonials = [
  {
    quote:
      "Finally, Claude remembers my project conventions. No more re-explaining my stack every session.",
    author: "Senior Dev",
    role: "Full-Stack Engineer",
    initials: "SD",
    color: "cyan" as const,
  },
  {
    quote:
      "The 2-line setup is real. Installed memory-mcp and Claude immediately started referencing past decisions.",
    author: "Tech Lead",
    role: "Startup CTO",
    initials: "TL",
    color: "purple" as const,
  },
  {
    quote:
      "The tools page is a goldmine. Cost calculator, prompt optimizer, cheat sheet - all free. Bookmarked instantly.",
    author: "Solo Dev",
    role: "Indie Hacker",
    initials: "IH",
    color: "cyan" as const,
  },
];

function Avatar({
  initials,
  color,
}: {
  initials: string;
  color: "cyan" | "purple";
}) {
  const ringColor =
    color === "cyan"
      ? "ring-forge-cyan/40 text-forge-cyan"
      : "ring-forge-purple/40 text-forge-purple";
  const bgColor = color === "cyan" ? "bg-forge-cyan/10" : "bg-forge-purple/10";

  return (
    <div
      className={`w-10 h-10 rounded-full ${bgColor} ${ringColor} ring-2 flex items-center justify-center text-xs font-bold font-mono shrink-0`}
      aria-hidden="true"
    >
      {initials}
    </div>
  );
}

export default function Testimonials() {
  return (
    <section className="relative z-10 py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold font-display mb-3">
            What <span className="text-forge-purple">Users</span> Are Saying
          </h2>
          <p className="text-gray-500 text-sm max-w-lg mx-auto">
            Real feedback from developers and agents using Substratia for
            persistent memory.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {testimonials.map((t) => (
            <div
              key={t.initials}
              className="group gradient-border rounded-xl p-6 bg-forge-dark-lighter/30 transition-all duration-300 hover:-translate-y-1"
            >
              <svg
                className="w-7 h-7 text-forge-purple/30 mb-4"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
              </svg>
              <p className="text-gray-300 mb-6 text-sm leading-relaxed">
                &ldquo;{t.quote}&rdquo;
              </p>
              <div className="flex items-center gap-3 border-t border-white/10 pt-4">
                <Avatar initials={t.initials} color={t.color} />
                <div>
                  <p className="text-white font-medium text-sm">{t.author}</p>
                  <p className="text-gray-500 text-xs">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
