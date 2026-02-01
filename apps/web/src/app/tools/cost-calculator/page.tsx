"use client";

import { useState, useCallback, useMemo, useEffect } from "react";
import Link from "next/link";
import ShareButton from "@/components/ShareButton";
import NewsletterCapture from "@/components/NewsletterCapture";
import RelatedTools from "@/components/RelatedTools";
import { downloadJson } from "@/lib/file-utils";
import {
  findModel,
  calculateCost,
  DEFAULT_MODEL_ID,
  COMPARISON_SONNET_ID,
  COMPARISON_OPUS_ID,
  MAX_SUBSCRIPTION_COST,
} from "@/data/costCalculatorModels";
import {
  loadSessions,
  saveSessions,
  type Session,
} from "@/components/cost-calculator/sessionStorage";
import SessionTracker from "@/components/cost-calculator/SessionTracker";
import SessionHistory from "@/components/cost-calculator/SessionHistory";
import UsageSlider from "@/components/cost-calculator/UsageSlider";
import CostComparison from "@/components/cost-calculator/CostComparison";
import PricingTable from "@/components/cost-calculator/PricingTable";

export default function CostCalculatorPage() {
  const [selectedModel, setSelectedModel] = useState(DEFAULT_MODEL_ID);
  const [inputTokens, setInputTokens] = useState<number>(0);
  const [outputTokens, setOutputTokens] = useState<number>(0);
  const [sessions, setSessions] = useState<Session[]>([]);
  const [monthlyUsage, setMonthlyUsage] = useState<number>(2_000_000);
  const [savedSession, setSavedSession] = useState(false);
  const [shared, setShared] = useState(false);
  const [exported, setExported] = useState(false);

  // Load sessions on mount + check for URL params
  useEffect(() => {
    setSessions(loadSessions());

    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    const stateParam = params.get("calc");
    if (stateParam) {
      try {
        const decoded = JSON.parse(atob(stateParam));
        if (decoded) {
          if (decoded.model) setSelectedModel(decoded.model);
          if (decoded.input) setInputTokens(decoded.input);
          if (decoded.output) setOutputTokens(decoded.output);
          if (decoded.monthlyUsage) setMonthlyUsage(decoded.monthlyUsage);
        }
      } catch {
        // Invalid state param, ignore
      }
    }
  }, []);

  const model = useMemo(() => findModel(selectedModel), [selectedModel]);
  const currentCost = useMemo(
    () => calculateCost(inputTokens, outputTokens, model),
    [inputTokens, outputTokens, model],
  );

  const logSession = useCallback(() => {
    if (inputTokens === 0 && outputTokens === 0) return;
    const newSession: Session = {
      id: `session-${Date.now()}`,
      date: new Date().toISOString(),
      inputTokens,
      outputTokens,
      model: selectedModel,
    };
    const updated = [newSession, ...sessions].slice(0, 50);
    setSessions(updated);
    saveSessions(updated);
    setInputTokens(0);
    setOutputTokens(0);
    setSavedSession(true);
    setTimeout(() => setSavedSession(false), 2000);
  }, [inputTokens, outputTokens, selectedModel, sessions]);

  const clearSessions = useCallback(() => {
    setSessions([]);
    saveSessions([]);
  }, []);

  const shareCalc = useCallback(async () => {
    const state = {
      model: selectedModel,
      input: inputTokens,
      output: outputTokens,
      monthlyUsage,
    };
    const stateStr = btoa(JSON.stringify(state));
    const shareUrl = `${window.location.origin}${window.location.pathname}?calc=${stateStr}`;
    await navigator.clipboard.writeText(shareUrl);
    setShared(true);
    setTimeout(() => setShared(false), 2000);
  }, [selectedModel, inputTokens, outputTokens, monthlyUsage]);

  const sessionStats = useMemo(() => {
    const last7Days = sessions.filter((s) => {
      const diff = new Date().getTime() - new Date(s.date).getTime();
      return diff < 7 * 24 * 60 * 60 * 1000;
    });
    const totalCost = last7Days.reduce((sum, s) => {
      return (
        sum + calculateCost(s.inputTokens, s.outputTokens, findModel(s.model))
      );
    }, 0);
    const totalTokens = last7Days.reduce(
      (sum, s) => sum + s.inputTokens + s.outputTokens,
      0,
    );
    return { sessions: last7Days.length, totalCost, totalTokens };
  }, [sessions]);

  const exportSessions = useCallback(() => {
    downloadJson(
      { exportDate: new Date().toISOString(), sessions, stats: sessionStats },
      "claude-cost-sessions.json",
    );
    setExported(true);
    setTimeout(() => setExported(false), 2000);
  }, [sessions, sessionStats]);

  const comparison = useMemo(() => {
    const sonnetModel = findModel(COMPARISON_SONNET_ID);
    const opusModel = findModel(COMPARISON_OPUS_ID);
    const inputRatio = 0.8;
    const outputRatio = 0.2;
    const sonnetApiCost =
      ((monthlyUsage * inputRatio) / 1_000_000) * sonnetModel.inputPer1M +
      ((monthlyUsage * outputRatio) / 1_000_000) * sonnetModel.outputPer1M;
    const opusApiCost =
      ((monthlyUsage * inputRatio) / 1_000_000) * opusModel.inputPer1M +
      ((monthlyUsage * outputRatio) / 1_000_000) * opusModel.outputPer1M;
    return {
      sonnetApi: sonnetApiCost,
      opusApi: opusApiCost,
      subscription: MAX_SUBSCRIPTION_COST,
      recommendation:
        sonnetApiCost < MAX_SUBSCRIPTION_COST ? "api" : "subscription",
      savings: Math.abs(sonnetApiCost - MAX_SUBSCRIPTION_COST),
    };
  }, [monthlyUsage]);

  return (
    <main className="min-h-screen text-white">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <Link
              href="/tools"
              className="text-forge-cyan hover:underline text-sm"
            >
              &larr; Back to Tools
            </Link>
            <ShareButton title="Claude Code Cost Calculator - Substratia" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            Claude Code <span className="text-forge-cyan">Cost Calculator</span>
          </h1>
          <p className="text-gray-400">
            Track your Claude Code usage costs. Compare API pricing vs
            subscription plans.
          </p>
        </div>

        {/* Main Grid */}
        <div className="grid lg:grid-cols-2 gap-6">
          <div className="space-y-6">
            <SessionTracker
              selectedModel={selectedModel}
              onModelChange={setSelectedModel}
              inputTokens={inputTokens}
              onInputTokensChange={setInputTokens}
              outputTokens={outputTokens}
              onOutputTokensChange={setOutputTokens}
              currentCost={currentCost}
              model={model}
              onLogSession={logSession}
              onShare={shareCalc}
              savedSession={savedSession}
              shared={shared}
            />
            <SessionHistory
              sessions={sessions}
              sessionStats={sessionStats}
              onExport={exportSessions}
              onClear={clearSessions}
              exported={exported}
            />
          </div>

          <div className="space-y-6">
            <UsageSlider
              monthlyUsage={monthlyUsage}
              onUsageChange={setMonthlyUsage}
            />
            <CostComparison comparison={comparison} />
            <PricingTable />
          </div>
        </div>

        <RelatedTools currentPath="/tools/cost-calculator" />

        {/* CTA */}
        <div className="mt-12 text-center">
          <p className="text-gray-400 mb-4">
            Want to optimize your prompts for better results?
          </p>
          <div className="flex justify-center gap-4 flex-wrap">
            <Link
              href="/tools/prompt-optimizer"
              className="inline-block px-6 py-3 bg-forge-purple hover:bg-forge-purple/80 rounded-xl font-semibold transition-all"
            >
              Try Prompt Optimizer
            </Link>
            <Link
              href="/tools/token-counter"
              className="inline-block px-6 py-3 bg-white/10 hover:bg-white/20 rounded-xl font-semibold transition-all"
            >
              Token Counter
            </Link>
          </div>
        </div>

        <div className="mt-8 max-w-xl mx-auto">
          <NewsletterCapture source="cost-calculator" compact />
        </div>
      </div>
    </main>
  );
}
