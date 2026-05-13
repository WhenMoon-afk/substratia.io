import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <main className="min-h-screen text-white flex items-center justify-center">
      <div className="text-center px-4">
        <h1 className="text-6xl md:text-8xl font-bold mb-4">
          <span className="text-forge-cyan">404</span>
        </h1>
        <h2 className="text-2xl md:text-3xl font-semibold mb-4">
          Page Not Found
        </h2>
        <p className="text-gray-400 mb-8 max-w-md mx-auto">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
          Let&apos;s get you back on track.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button href="/" variant="purple">
            Go Home
          </Button>
          <Button href="/tools" variant="outline">
            Browse Tools
          </Button>
          <Button href="/start-here" variant="outline">
            Start Here
          </Button>
        </div>
      </div>
    </main>
  );
}
