import type { Metadata } from "next";
import Link from "next/link";
import { currentUser } from "@clerk/nextjs/server";

const gameUrl = "https://rp.substratia.io";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Harborlight Playtest",
  description: "Private Harborlight test-world launch page.",
  robots: { index: false, follow: false },
};

export default async function HarborlightPlayPage() {
  const user = await currentUser();
  const firstName = user?.firstName || user?.username || "friend";

  return (
    <div className="min-h-screen bg-forge-dark text-white">
      <section className="relative overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(0,217,255,0.22),transparent_34%),radial-gradient(circle_at_70%_20%,rgba(124,58,237,0.2),transparent_32%)]" />
        <div className="container relative mx-auto px-4 py-12">
          <div className="max-w-4xl">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.35em] text-forge-cyan">
              Private playtest
            </p>
            <h1 className="mb-4 text-4xl font-black leading-tight md:text-6xl">
              Harborlight is live.
            </h1>
            <p className="max-w-2xl text-lg leading-8 text-gray-300">
              Welcome, {firstName}. This is the first website-gated test world:
              make a character, move through the yard, talk to the Harborlight
              Guide, and try the Signal Scanner in the Workshop.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href={gameUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-forge-cyan px-5 py-3 text-sm font-bold text-forge-dark transition hover:bg-white"
              >
                Open in a new tab
              </a>
              <Link
                href="/dashboard"
                className="rounded-full border border-white/15 px-5 py-3 text-sm font-bold text-white transition hover:border-forge-cyan hover:text-forge-cyan"
              >
                Back to dashboard
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="container mx-auto grid gap-6 px-4 py-8 lg:grid-cols-[minmax(0,1fr)_320px]">
        <div className="overflow-hidden rounded-3xl border border-white/10 bg-black/30 shadow-2xl shadow-black/40">
          <div className="flex items-center justify-between border-b border-white/10 bg-white/5 px-5 py-3">
            <div>
              <h2 className="font-semibold text-white">Live world window</h2>
              <p className="text-sm text-gray-400">
                If the frame feels cramped, use the new-tab button above.
              </p>
            </div>
            <span className="rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 text-xs font-semibold text-emerald-200">
              Online
            </span>
          </div>
          <iframe
            title="Harborlight live game"
            src={gameUrl}
            className="h-[78vh] min-h-[680px] w-full bg-black"
            allow="clipboard-write"
          />
        </div>

        <aside className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
          <h2 className="text-xl font-bold text-white">First minute</h2>
          <ol className="mt-5 space-y-4 text-sm leading-6 text-gray-300">
            <li>
              <span className="text-forge-cyan">1.</span> You are already
              through the website login gate.
            </li>
            <li>
              <span className="text-forge-cyan">2.</span> During this MVP, the
              engine may still ask for the private playtest token inside the
              frame. Use the token shared for this demo only.
            </li>
            <li>
              <span className="text-forge-cyan">3.</span> Create a new human
              character, then move east from Arrival Hall.
            </li>
            <li>
              <span className="text-forge-cyan">4.</span> Find the Workshop,
              pick up the Signal Scanner, and use it to confirm immediate
              visible feedback.
            </li>
          </ol>
          <div className="mt-6 rounded-2xl border border-amber-400/20 bg-amber-400/10 p-4 text-sm leading-6 text-amber-100">
            Book of Aurora state is not active here. Harborlight is a separate
            safe test world for proving the engine and player experience.
          </div>
        </aside>
      </section>
    </div>
  );
}
