import Link from "next/link";
import { blogPosts } from "@/lib/blog-data";

export default function Home() {
  const recentPosts = blogPosts.slice(0, 5);

  return (
    <section className="container mx-auto px-4 py-16 space-y-10">
      <div className="space-y-3">
        <h1 className="text-4xl font-bold">Substratia</h1>
        <p className="text-gray-300 max-w-2xl">
          Writing about AI, software, and whatever I am thinking about.
          Research notes and essays are published here.
        </p>
        <div className="flex gap-4 text-forge-cyan">
          <Link href="/blog" className="hover:underline">Blog</Link>
          <Link href="/research" className="hover:underline">Research</Link>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Recent posts</h2>
        {recentPosts.length === 0 ? (
          <p className="text-gray-400">No posts yet.</p>
        ) : (
          <ul className="space-y-3">
            {recentPosts.map((post) => (
              <li key={post.slug} className="border border-white/10 rounded-lg p-4">
                <Link href={`/blog/${post.slug}`} className="text-lg font-medium hover:text-forge-cyan transition-colors">
                  {post.title}
                </Link>
                <p className="text-sm text-gray-400 mt-1">{post.date}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
