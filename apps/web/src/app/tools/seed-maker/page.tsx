"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import Link from "next/link";
import ShareButton from "@/components/ShareButton";
import NewsletterCapture from "@/components/NewsletterCapture";
import RelatedTools from "@/components/RelatedTools";
import { downloadText, downloadJson } from "@/lib/file-utils";
import EntropyCollector from "./EntropyCollector";
import SeedOptions, { SeedOptionsState } from "./SeedOptions";
import SeedOutput from "./SeedOutput";
import SeedHistory from "./SeedHistory";
import SeedInfo from "./SeedInfo";

export default function SeedMakerPage() {
  const [entropyProgress, setEntropyProgress] = useState(0);
  const [result, setResult] = useState("");
  const [length, setLength] = useState(64);
  const [history, setHistory] = useState<string[]>([]);
  const [options, setOptions] = useState<SeedOptionsState>({
    lower: true,
    upper: true,
    numbers: true,
    special: false,
  });

  const entropyPoolRef = useRef(new Uint32Array(256));
  const entropyIndexRef = useRef(0);
  const mouseEntropyRef = useRef(0);
  const lastPosRef = useRef({ x: 0, y: 0 });
  const entropyTarget = 50;

  const addEntropy = useCallback((value: number) => {
    entropyPoolRef.current[
      entropyIndexRef.current % entropyPoolRef.current.length
    ] ^= Math.floor(value);
    entropyIndexRef.current++;
  }, []);

  // Initialize with basic entropy
  useEffect(() => {
    addEntropy(Date.now());
    addEntropy(performance.now() * 1000);
    addEntropy(window.screen.width * window.screen.height);

    if (typeof window !== "undefined" && window.crypto) {
      const seed = new Uint32Array(32);
      crypto.getRandomValues(seed);
      seed.forEach((v) => addEntropy(v));
    }

    // Load history from localStorage
    const saved = localStorage.getItem("seedHistory");
    if (saved) {
      try {
        setHistory(JSON.parse(saved));
      } catch {}
    }
  }, [addEntropy]);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      const dx = e.clientX - lastPosRef.current.x;
      const dy = e.clientY - lastPosRef.current.y;
      lastPosRef.current = { x: e.clientX, y: e.clientY };

      if (Math.abs(dx) > 2 || Math.abs(dy) > 2) {
        addEntropy((e.clientX << 16) | e.clientY);
        addEntropy(performance.now() * 1000);

        if (mouseEntropyRef.current < entropyTarget) {
          mouseEntropyRef.current++;
          setEntropyProgress((mouseEntropyRef.current / entropyTarget) * 100);
        }
      }
    },
    [addEntropy],
  );

  const addTimeEntropy = useCallback(() => {
    const t1 = performance.now();
    let x = 0;
    for (let i = 0; i < 10000; i++) x += Math.sqrt(i);
    const t2 = performance.now();

    addEntropy(t1 * 1000000);
    addEntropy(t2 * 1000000);
    addEntropy(x);

    mouseEntropyRef.current = Math.min(
      entropyTarget,
      mouseEntropyRef.current + 5,
    );
    setEntropyProgress((mouseEntropyRef.current / entropyTarget) * 100);
  }, [addEntropy]);

  const generate = useCallback(() => {
    let charset = "";
    if (options.lower) charset += "abcdefghijklmnopqrstuvwxyz";
    if (options.upper) charset += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (options.numbers) charset += "0123456789";
    if (options.special) charset += "!@#$%^&*()-_=+[]{}|;:,.<>?";

    if (!charset) {
      charset =
        "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    }

    let output = "";
    const randomBytes = new Uint8Array(length);

    if (typeof window !== "undefined" && window.crypto) {
      crypto.getRandomValues(randomBytes);
    }

    for (let i = 0; i < length; i++) {
      const poolValue =
        entropyPoolRef.current[i % entropyPoolRef.current.length] & 0xff;
      const combined = randomBytes[i] ^ poolValue;
      output += charset[combined % charset.length];
    }

    setResult(output);

    const newHistory = [output, ...history.slice(0, 9)];
    setHistory(newHistory);
    localStorage.setItem("seedHistory", JSON.stringify(newHistory));
  }, [length, options, history]);

  const clearHistory = useCallback(() => {
    setHistory([]);
    localStorage.removeItem("seedHistory");
  }, []);

  const downloadResult = useCallback(() => {
    if (!result) return;
    downloadText(result, `seed-${Date.now()}.txt`);
  }, [result]);

  const exportHistory = useCallback(() => {
    if (history.length === 0) return;
    downloadJson(
      { exportDate: new Date().toISOString(), seeds: history },
      "seed-history.json",
    );
  }, [history]);

  return (
    <main className="min-h-screen text-white">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="max-w-4xl mx-auto mb-8">
          <div className="flex items-center justify-between mb-4">
            <Link
              href="/tools"
              className="text-forge-cyan hover:underline text-sm"
            >
              ← Back to Tools
            </Link>
            <ShareButton title="Seed Maker - Substratia" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            Seed <span className="text-forge-purple">Maker</span>
          </h1>
          <p className="text-gray-400">
            Generate high-entropy random strings using mouse movements.
            Everything runs locally in your browser.
          </p>
        </div>

        <div className="max-w-4xl mx-auto grid lg:grid-cols-3 gap-6">
          {/* Main Panel */}
          <div className="lg:col-span-2 space-y-4">
            <EntropyCollector
              entropyProgress={entropyProgress}
              onMouseMove={handleMouseMove}
              onAddTimeEntropy={addTimeEntropy}
            />
            <SeedOptions
              length={length}
              options={options}
              onLengthChange={setLength}
              onOptionsChange={setOptions}
            />
            <SeedOutput
              result={result}
              onGenerate={generate}
              onDownload={downloadResult}
            />
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            <SeedHistory
              history={history}
              onSelect={setResult}
              onClear={clearHistory}
              onExport={exportHistory}
            />
            <SeedInfo />
          </div>
        </div>

        {/* Newsletter */}
        <div className="mt-8 max-w-xl mx-auto">
          <NewsletterCapture source="seed-maker" compact />
        </div>

        {/* Related Tools */}
        <RelatedTools currentPath="/tools/seed-maker" />
      </div>
    </main>
  );
}
