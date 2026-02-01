import type { Recommendation } from "@/data/reviewsData";

const gradientStyles = {
  cyan: "from-forge-cyan/20 to-transparent border-forge-cyan/30",
  purple: "from-forge-purple/20 to-transparent border-forge-purple/30",
  green: "from-green-500/20 to-transparent border-green-500/30",
  yellow: "from-yellow-500/20 to-transparent border-yellow-500/30",
};

const pickColors = {
  cyan: "text-forge-cyan",
  purple: "text-forge-purple",
  green: "text-green-400",
  yellow: "text-yellow-400",
};

interface RecommendationsProps {
  items: Recommendation[];
  columns?: 2 | 3;
}

export function Recommendations({ items, columns = 2 }: RecommendationsProps) {
  const gridCols = columns === 3 ? "md:grid-cols-3" : "md:grid-cols-2";

  return (
    <div className="max-w-4xl mx-auto mb-12">
      <h2 className="text-2xl font-bold mb-6">Our Recommendations</h2>
      <div className={`grid ${gridCols} gap-6`}>
        {items.map((rec) => (
          <div
            key={rec.title}
            className={`bg-gradient-to-br ${gradientStyles[rec.gradient]} border rounded-xl p-6`}
          >
            <h3 className="font-bold text-lg mb-2">{rec.title}</h3>
            <p className={`text-xl font-bold mb-2 ${pickColors[rec.gradient]}`}>
              {rec.pick}
            </p>
            <p className="text-gray-400 text-sm">{rec.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
