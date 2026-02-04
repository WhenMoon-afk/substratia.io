export function SectionDivider({
  variant = "cyan",
}: {
  variant?: "cyan" | "purple";
}) {
  const gradient =
    variant === "cyan"
      ? "from-transparent via-forge-cyan/20 to-transparent"
      : "from-transparent via-forge-purple/20 to-transparent";

  return (
    <div className="relative z-10 py-1" aria-hidden="true">
      <div className={`h-px bg-linear-to-r ${gradient} max-w-4xl mx-auto`} />
    </div>
  );
}
