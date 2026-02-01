export function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1">
      {[...Array(10)].map((_, i) => (
        <div
          key={i}
          className={`w-2 h-6 rounded-sm ${
            i < rating ? "bg-forge-cyan" : "bg-white/10"
          }`}
        />
      ))}
      <span className="ml-2 text-forge-cyan font-bold">{rating}/10</span>
    </div>
  );
}
