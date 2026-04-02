import Link from "next/link";

export default function NotFound() {
  return (
    <section className="container mx-auto px-4 py-16 text-center space-y-6">
      <h1 className="text-4xl font-bold">Page not found</h1>
      <p className="text-gray-400">The page you are looking for does not exist.</p>
      <div className="flex items-center justify-center gap-4">
        <Link href="/" className="hover:underline text-forge-cyan">Home</Link>
        <Link href="/blog" className="hover:underline text-forge-cyan">Blog</Link>
      </div>
    </section>
  );
}
