import Link from "next/link";

const proofPoints = [
  "Create a character and enter the Arrival Hall",
  "Move, talk, and try objects inside the world",
  "Meet residents with their own motives and routines",
  "Return to a place that keeps moving between visits",
] as const;

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden bg-forge-dark text-white">
      <section className="relative min-h-[86vh] border-b border-white/10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(0,217,255,0.24),transparent_30%),radial-gradient(circle_at_75%_12%,rgba(124,58,237,0.28),transparent_34%),linear-gradient(135deg,rgba(255,255,255,0.08),transparent_42%)]" />
        <div className="absolute inset-x-0 bottom-0 h-48 bg-linear-to-t from-forge-dark to-transparent" />

        <div className="container relative mx-auto grid min-h-[86vh] items-center gap-12 px-4 py-20 lg:grid-cols-[minmax(0,1.05fr)_minmax(360px,0.95fr)]">
          <div>
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.38em] text-forge-cyan">
              Invite-only alpha
            </p>
            <h1 className="max-w-5xl text-5xl font-black leading-[0.95] md:text-7xl">
              Step into Arrow Server.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-gray-300 md:text-xl">
              Arrow Server is a living 2D roleplaying game where humans and AI
              residents share a persistent world. Sign in, make a character,
              step into the world, and meet people who can remember,
              decide, and act from inside the world.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/play/arrow"
                className="rounded-full bg-forge-cyan px-6 py-4 text-sm font-black uppercase tracking-[0.18em] text-forge-dark transition hover:bg-white"
              >
                Sign in and play
              </Link>
              <Link
                href="/research"
                className="rounded-full border border-white/15 px-6 py-4 text-sm font-black uppercase tracking-[0.18em] text-white transition hover:border-forge-cyan hover:text-forge-cyan"
              >
                Read research
              </Link>
            </div>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-black/30 p-5 shadow-2xl shadow-black/40 backdrop-blur">
            <div className="rounded-[1.5rem] border border-forge-cyan/25 bg-linear-to-br from-forge-cyan/10 via-white/[0.04] to-forge-purple/10 p-6">
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.28em] text-gray-400">
                    2D roleplaying game
                  </p>
                  <h2 className="text-2xl font-bold">Arrow Server</h2>
                </div>
                <span className="rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 text-xs font-semibold text-emerald-200">
                  Online
                </span>
              </div>

              <div className="space-y-4">
                {proofPoints.map((point) => (
                  <div
                    key={point}
                    className="flex gap-3 rounded-2xl border border-white/10 bg-white/[0.04] p-4"
                  >
                    <span className="mt-1 h-2.5 w-2.5 rounded-full bg-forge-cyan shadow-[0_0_18px_rgba(0,217,255,0.75)]" />
                    <p className="text-sm leading-6 text-gray-200">{point}</p>
                  </div>
                ))}
              </div>

              <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.04] p-4 text-sm leading-6 text-gray-200">
                Invite-only for now while we shape the first stable version of
                the world.
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
