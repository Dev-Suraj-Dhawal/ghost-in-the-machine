"use client";

import React, { useState } from "react";
import { ShieldCheck, Lock, WifiOff, DollarSign, RefreshCw, Feather, CheckCircle2, XCircle, Terminal, Heart, Sparkles } from "lucide-react";
import { AIInferenceConfig } from "@/lib/types";

interface OpenInnovationComparisonProps {
  config: AIInferenceConfig;
  onConfigChange: (newConfig: AIInferenceConfig) => void;
}

export default function OpenInnovationComparison({ config, onConfigChange }: OpenInnovationComparisonProps) {
  const [activeDimension, setActiveDimension] = useState<number>(0);

  const pillars = [
    {
      id: "privacy",
      title: "Sacred Mourning & Data Sanctity",
      icon: Heart,
      closed: "Your intimate family stories, grief, and photos of departed grandparents are shipped to remote cloud telemetry databases, tokenized, and ingested into commercial advertising and training corpora.",
      open: "Zero Cloud Leaks. Every tribute, calaverita poem, and séance whisper is computed 100% in your local RAM or private Ollama instance. Your family altar remains a truly sacred sanctuary.",
      verdict: "Open-source AI is the only ethical choice for grief and cultural remembrance.",
    },
    {
      id: "offline",
      title: "Storm & Power Outage Resilience",
      icon: WifiOff,
      closed: "When Halloween storms knock out the internet or cell tower lines drop, closed cloud APIs produce immediate HTTP 503 / DNS resolution errors. The machine goes mute.",
      open: "The séance continues in candlelight. In-browser open weights and local ONNX/WASM inference run entirely disconnected from the grid. True 'Ghost in the Machine' autonomy.",
      verdict: "Runs when the lights, sirens, and internet are completely off.",
    },
    {
      id: "cost",
      title: "Eternal Zero-Cost Preservation",
      icon: DollarSign,
      closed: "Billed per 1,000 input/output tokens with credit card dependencies. When an API subscription expires or price tiers spike, the project and memories become inaccessible.",
      open: "$0.00 forever. No API bills, no monthly quotas, no sudden deprecation of endpoints. Once downloaded, an open-weight model runs for centuries on any compatible CPU/GPU.",
      verdict: "Eternal heritage that can never be shut down by a corporate balance sheet.",
    },
    {
      id: "sovereignty",
      title: "Model Sovereignty & Cultural Adaptation",
      icon: Feather,
      closed: "Closed models sanitize cultural nuance, reject dark/gothic folk themes under rigid overzealous safety filters, and cannot be fine-tuned on regional dialects or indigenous languages.",
      open: "Total freedom to swap, quantize, and fine-tune open weights (Llama 3.2, Mistral, SmolLM, Qwen) on authentic Mexican Calaveritas, folk ballads, and historic computing archives.",
      verdict: "Uncensored poetic expression true to Día de los Muertos traditions.",
    },
  ];

  return (
    <div className="relative w-full max-w-5xl mx-auto rounded-2xl border border-zinc-800 bg-zinc-950/90 shadow-2xl overflow-hidden backdrop-blur-xl p-6 sm:p-8">
      {/* Title */}
      <div className="text-center max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/40 border border-emerald-700/50 text-emerald-400 text-xs font-mono mb-2">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          <span>MANIFESTO: WHY OPEN INNOVATION MATTERS</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          Why Open-Source AI Makes This Possible
        </h2>
        <p className="mt-2 text-xs sm:text-sm text-zinc-400">
          A direct architectural comparison between closed cloud black-boxes and open-source models for sensitive memorial remembrance & spooky local autonomy.
        </p>
      </div>

      {/* Pillar Tabs */}
      <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-2">
        {pillars.map((p, idx) => {
          const Icon = p.icon;
          const isActive = activeDimension === idx;
          return (
            <button
              key={p.id}
              onClick={() => setActiveDimension(idx)}
              className={`p-3 rounded-xl border text-left transition-all flex flex-col justify-between ${
                isActive
                  ? "bg-amber-950/50 border-amber-500/80 shadow-md shadow-amber-500/10"
                  : "bg-zinc-900/60 border-zinc-800 hover:border-zinc-700"
              }`}
            >
              <Icon className={`w-4 h-4 mb-2 ${isActive ? "text-amber-400" : "text-zinc-500"}`} />
              <div className={`text-xs font-bold leading-snug ${isActive ? "text-amber-200" : "text-zinc-300"}`}>
                {p.title}
              </div>
            </button>
          );
        })}
      </div>

      {/* Side-by-Side Comparison Box */}
      <div className="mt-6 rounded-2xl border border-zinc-800 bg-zinc-900/40 p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Closed API Column */}
          <div className="p-5 rounded-xl border border-red-950 bg-red-950/10">
            <div className="flex items-center gap-2 text-red-400 font-mono text-xs font-bold uppercase tracking-wider mb-3">
              <XCircle className="w-4 h-4 text-red-400" />
              <span>Closed Cloud Model (Proprietary APIs)</span>
            </div>
            <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-sans">
              {pillars[activeDimension].closed}
            </p>
          </div>

          {/* Open Innovation Column */}
          <div className="p-5 rounded-xl border border-emerald-900/70 bg-emerald-950/20">
            <div className="flex items-center gap-2 text-emerald-400 font-mono text-xs font-bold uppercase tracking-wider mb-3">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Open-Source AI (GhostMachine Architecture)</span>
            </div>
            <p className="text-xs sm:text-sm text-zinc-200 leading-relaxed font-sans font-medium">
              {pillars[activeDimension].open}
            </p>
          </div>
        </div>

        {/* Bottom Verdict Banner */}
        <div className="mt-5 p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-center font-mono text-xs text-amber-300">
          ✨ {pillars[activeDimension].verdict}
        </div>
      </div>

      {/* Model Engine Configuration Panel */}
      <div className="mt-8 pt-6 border-t border-zinc-800/80">
        <div className="flex items-center justify-between mb-4">
          <span className="text-xs font-mono uppercase tracking-widest text-zinc-400 flex items-center gap-1.5">
            <Terminal className="w-3.5 h-3.5 text-purple-400" />
            Active AI Engine Configuration
          </span>
          <span className="text-[11px] font-mono text-emerald-400 bg-emerald-950/40 px-2.5 py-1 rounded-full border border-emerald-700/40">
            Active: {config.mode === "local-neural" ? "Local Neural Engine (WASM/Offline)" : "Ollama Local Daemon"}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
          <div
            onClick={() => onConfigChange({ ...config, mode: "local-neural" })}
            className={`p-4 rounded-xl border cursor-pointer transition-all ${
              config.mode === "local-neural"
                ? "bg-emerald-950/40 border-emerald-500 text-emerald-200 shadow-md"
                : "bg-zinc-900/50 border-zinc-800 text-zinc-400 hover:border-zinc-700"
            }`}
          >
            <div className="font-bold text-sm text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-emerald-400" />
              In-Browser Local Neural Engine
            </div>
            <p className="text-[11px] text-zinc-400 mt-1 font-sans">
              Runs 100% offline in client memory. Zero setup, zero downloads, works immediately on any laptop or phone.
            </p>
          </div>

          <div
            onClick={() => onConfigChange({ ...config, mode: "ollama" })}
            className={`p-4 rounded-xl border cursor-pointer transition-all ${
              config.mode === "ollama"
                ? "bg-amber-950/40 border-amber-500 text-amber-200 shadow-md"
                : "bg-zinc-900/50 border-zinc-800 text-zinc-400 hover:border-zinc-700"
            }`}
          >
            <div className="font-bold text-sm text-white flex items-center gap-2">
              <RefreshCw className="w-4 h-4 text-amber-400" />
              Local Ollama Bridge (Llama 3.2 / SmolLM)
            </div>
            <p className="text-[11px] text-zinc-400 mt-1 font-sans">
              Connects to your local daemon at <code>{config.ollamaEndpoint}</code>. Keeps every byte on your own hardware.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

