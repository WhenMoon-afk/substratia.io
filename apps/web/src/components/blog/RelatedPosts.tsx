import Link from "next/link";

export interface RelatedPost {
  href: string;
  title: string;
  description: string;
}

interface RelatedPostsProps {
  posts: RelatedPost[];
  heading?: string;
}

export default function RelatedPosts({
  posts,
  heading = "Related Posts",
}: RelatedPostsProps) {
  return (
    <div className="mt-12">
      <h3 className="text-xl font-bold mb-4">{heading}</h3>
      <div className="grid md:grid-cols-2 gap-4">
        {posts.map((post) => (
          <Link
            key={post.href}
            href={post.href}
            className="p-4 bg-white/5 border border-white/10 rounded-xl hover:border-forge-cyan/50 transition-all"
          >
            <div className="font-semibold mb-1">{post.title}</div>
            <div className="text-sm text-gray-400">{post.description}</div>
          </Link>
        ))}
      </div>
    </div>
  );
}
