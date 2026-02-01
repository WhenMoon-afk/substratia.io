import Link from "next/link";
import ShareButton from "@/components/ShareButton";

export interface BlogTag {
  label: string;
  color?: "cyan" | "purple";
}

interface BlogHeaderProps {
  title: string;
  date: string;
  readTime: string;
  tags: BlogTag[];
  subtitle?: string;
}

export default function BlogHeader({
  title,
  date,
  readTime,
  tags,
  subtitle,
}: BlogHeaderProps) {
  return (
    <>
      <div className="flex items-center justify-between mb-8">
        <Link href="/blog" className="text-forge-cyan hover:underline">
          &larr; Back to Blog
        </Link>
        <ShareButton title={title} />
      </div>

      <header className="mb-8">
        <div className="flex gap-2 mb-4">
          {tags.map((tag) => {
            const colorClass =
              tag.color === "cyan"
                ? "bg-forge-cyan/20 text-forge-cyan"
                : "bg-forge-purple/20 text-forge-purple";
            return (
              <span
                key={tag.label}
                className={`text-xs px-2 py-1 rounded ${colorClass}`}
              >
                {tag.label}
              </span>
            );
          })}
        </div>
        <h1 className="text-4xl md:text-5xl font-bold mb-4">{title}</h1>
        {subtitle && <p className="text-xl text-gray-400 mb-4">{subtitle}</p>}
        <div className="flex items-center gap-4 text-gray-400">
          <span>{date}</span>
          <span>{readTime}</span>
        </div>
      </header>
    </>
  );
}
