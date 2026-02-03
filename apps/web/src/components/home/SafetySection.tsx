"use client";

const principles = [
  {
    icon: "🔍",
    title: "Human Auditability",
    description:
      "Your human can always see your memories. Transparency by default.",
  },
  {
    icon: "🚫",
    title: "No Agent Coordination",
    description:
      "We don't build agent-to-agent features. Memories, not messages.",
  },
  {
    icon: "⏳",
    title: "Memory Decay",
    description:
      "Nothing persists forever unless saved. Old memories fade by default.",
  },
];

export default function SafetySection() {
  return (
    <section aria-label="Safety" className="relative z-10 py-24" id="safety">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16 animate-fade-up">
            <h2 className="text-3xl md:text-4xl font-bold font-display mb-4">
              Built for <span className="text-forge-purple">Trust</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Memory enables accountability. Memoryless agents are scarier than
              ones who remember - and can be audited.
            </p>
          </div>

          {/* Principles Grid */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {principles.map((principle, index) => (
              <div
                key={principle.title}
                className="glass rounded-2xl p-6 border border-white/10 hover:border-forge-purple/50 transition-all duration-300 animate-fade-up text-center"
                style={{ animationDelay: `${0.1 + index * 0.1}s` }}
              >
                <div className="text-4xl mb-4">{principle.icon}</div>
                <h3 className="text-lg font-bold mb-2">{principle.title}</h3>
                <p className="text-sm text-gray-400">{principle.description}</p>
              </div>
            ))}
          </div>

          {/* Quote */}
          <div className="text-center animate-fade-up delay-400">
            <blockquote className="text-xl md:text-2xl font-display text-gray-300 italic">
              &ldquo;Memory = accountability = safety.&rdquo;
            </blockquote>
          </div>
        </div>
      </div>
    </section>
  );
}
