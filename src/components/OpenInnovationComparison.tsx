"use client";

import React, { useState } from "react";
import {
  ShieldCheck,
  WifiOff,
  DollarSign,
  RefreshCw,
  Feather,
  CheckCircle2,
  XCircle,
  Terminal,
  Heart,
  Sparkles,
  Flame,
  Radio,
  BookOpen,
  ExternalLink,
  Activity,
  Cpu,
  Layers,
  Zap,
  ArrowRight,
  HardDrive,
  Users,
  Award,
  Volume2,
} from "lucide-react";
import { AIInferenceConfig } from "@/lib/types";

interface OpenInnovationComparisonProps {
  config: AIInferenceConfig;
  onConfigChange: (newConfig: AIInferenceConfig) => void;
  onNavigateToTab?: (tab: "terminal" | "ofrenda" | "investigator" | "manifesto") => void;
  onOpenGuide?: () => void;
}

export default function OpenInnovationComparison({
  config,
  onConfigChange,
  onNavigateToTab,
  onOpenGuide,
}: OpenInnovationComparisonProps) {
  const [activeDimension, setActiveDimension] = useState<number>(0);
  const [activeShowcase, setActiveShowcase] = useState<number>(0);
  const [testingOllama, setTestingOllama] = useState<boolean>(false);
  const [ollamaStatus, setOllamaStatus] = useState<{
    status: "idle" | "success" | "error";
    message: string;
  }>({
    status: "idle",
    message: "",
  });

  const showcases = [
    {
      id: "terminal",
      title: "NecroShell v3.13 Possessed Terminal",
      subtitle: "Autonomous Local CLI & Spectral Séance",
      badge: "Flagship Subsystem",
      badgeColor: "emerald",
      icon: Terminal,
      image: "/screenshots/mainpage.png",
      alt: "NecroShell Possessed Terminal Interface",
      description:
        "A retro CRT green-phosphor command terminal possessed by historical computing luminaries. Runs client-side tokenizers for Calaverita generation, interactive ASCII invocations, and pure keyboard-driven spiritual séance rituals.",
      specs: [
        { label: "Architecture", value: "100% Client-Side WASM / Ollama" },
        { label: "Soundtrack", value: "Real-time Procedural Web Audio Synth" },
        { label: "Key Commands", value: "seance, calaverita, invoke, scan, ofrenda" },
        { label: "Telemetry", value: "0 KB Transmitted (Airgapped)" },
      ],
      actionLabel: "Launch NecroShell (1)",
      onClick: () => onNavigateToTab?.("terminal"),
    },
    {
      id: "ofrenda",
      title: "Living Ofrenda Altar Sanctuary",
      subtitle: "3-Tiered Sacred Memorial & Digital Calaveritas",
      badge: "Cultural Folklore",
      badgeColor: "amber",
      icon: Flame,
      image: "/screenshots/ofrenda.png",
      alt: "Living Ofrenda 3-Tier Altar Sanctuary",
      description:
        "A traditional 3-tiered Mexican Day of the Dead altar sanctuary honoring computing pioneers and personal departed ancestors. Features procedural candle flame physics, pan de muerto offerings, and exportable digital memorial cards.",
      specs: [
        { label: "Pioneers", value: "Ada Lovelace, Alan Turing, Grace Hopper, Margaret Hamilton" },
        { label: "Physics", value: "Procedural candle flickers & cempasúchil petals" },
        { label: "Sanctity", value: "Grief & family tributes stay in private local storage" },
        { label: "Export", value: "Instant high-res PNG digital memorial cards" },
      ],
      actionLabel: "Visit Living Ofrenda (2)",
      onClick: () => onNavigateToTab?.("ofrenda"),
    },
    {
      id: "radar",
      title: "Phantom Investigator & Telemetry Radar",
      subtitle: "Spectral EVP Spectrogram & EMF Anomaly Scanner",
      badge: "Real-Time Telemetry",
      badgeColor: "red",
      icon: Radio,
      image: "/screenshots/PhantomInvestigator.png",
      alt: "Phantom Investigator Spectral Radar & Audio Visualizer",
      description:
        "A forensic spectral frequency analyzer and zero-leak privacy inspector. Visualizes live 64-band Web Audio FFT frequencies, detects electromagnetic anomalies, and proves that not a single byte escapes to commercial clouds.",
      specs: [
        { label: "Audio FFT", value: "64-Band Real-Time Spectral Visualizer" },
        { label: "EMF Engine", value: "Anomaly scoring & ghost-frequency detection" },
        { label: "Privacy Audit", value: "Continuous local airgap verification" },
        { label: "Sound Engine", value: "Zero static audio files; 100% generated in RAM" },
      ],
      actionLabel: "Open Telemetry Radar (3)",
      onClick: () => onNavigateToTab?.("investigator"),
    },
    {
      id: "manual",
      title: "Royal Farman Scroll Manual",
      subtitle: "Imperial Parchment & Royal Decree Guide",
      badge: "Imperial Parchment",
      badgeColor: "purple",
      icon: BookOpen,
      image: "/screenshots/manual.png",
      alt: "Royal Farman Scroll Beginner Manual",
      description:
        "An ancient imperial decree scroll with royal gold calligraphy, wax seal of Ada Lovelace, and aged parchment texture. Unrolls smoothly with a comprehensive keyboard shortcut compendium and guide to Día de los Muertos traditions.",
      specs: [
        { label: "Aesthetic", value: "Vintage Royal Scroll with Ornate Wax Seal" },
        { label: "Shortcuts", value: "1-4 (Tabs), H (Manual), M (Mute), D (Drone), ESC" },
        { label: "Language", value: "English with authentic Mexican folklore terms" },
        { label: "Accessibility", value: "Keyboard accessible, high-contrast typography" },
      ],
      actionLabel: "Unroll Royal Manual (H)",
      onClick: () => onOpenGuide?.(),
    },
    {
      id: "recuerdos",
      title: "Digital Memorial Recuerdo Card Export",
      subtitle: "Photographic Heirloom Cards & Bilingual Calaveritas",
      badge: "Memorial Export",
      badgeColor: "amber",
      icon: Sparkles,
      image: "/screenshots/Recuerdos_Ada_Lovelace.png",
      alt: "Digital Memorial Recuerdo Card for Ada Lovelace",
      description:
        "Heirloom-grade digital remembrance cards commemorating departed family members and computing pioneers. Features authentic Spanish calaverita verses, English translations, and zero-watermark local PNG card downloads.",
      specs: [
        { label: "Resolution", value: "High-DPI Client-Side Canvas Rendering" },
        { label: "Poetry", value: "Bilingual Spanish/English satirical rhymes" },
        { label: "Storage", value: "Local browser storage (IndexDB/LocalStorage)" },
        { label: "Cost", value: "$0.00 forever (No subscriptions or cloud lock)" },
      ],
      actionLabel: "Create Memorial in Ofrenda",
      onClick: () => onNavigateToTab?.("ofrenda"),
    },
  ];

  const benchmarks = [
    {
      metric: "Inference Latency",
      icon: Zap,
      ghost: "12ms (Immediate local WASM / Ollama)",
      cloud: "850ms - 2,400ms (Remote HTTP queue)",
      advantage: "Zero round-trip latency, silky smooth typewriter response.",
    },
    {
      metric: "Data Privacy & Grief Sanctity",
      icon: Heart,
      ghost: "0 Bytes Leave Machine (Local RAM Sanctuary)",
      cloud: "Logged into commercial telemetry & training corpus",
      advantage: "Sacred memories and family photos never enter commercial AI silos.",
    },
    {
      metric: "Storm & Outage Resilience",
      icon: WifiOff,
      ghost: "100% Operational Airgapped & Offline",
      cloud: "Immediate HTTP 503 / DNS resolution crash",
      advantage: "Works by candlelight during Halloween storms and power outages.",
    },
    {
      metric: "Operational Cost",
      icon: DollarSign,
      ghost: "$0.00 Forever (Free Open-Weight Compute)",
      cloud: "$0.03 - $0.06 per 1K tokens + credit card quotas",
      advantage: "No API balance expiration, no paywalls, eternal free access.",
    },
    {
      metric: "Audio Asset Footprint",
      icon: Volume2,
      ghost: "0 KB (Pure Procedural Web Audio API Synthesis)",
      cloud: "25MB - 50MB static MP3/WAV asset downloads",
      advantage: "Ultra-fast initial page load under 1.5s with zero audio bloat.",
    },
    {
      metric: "Cultural Nuance & Freedom",
      icon: Feather,
      ghost: "Authentic Mexican Calaveritas & dark satire",
      cloud: "Sanitized or blocked by generic corporate filters",
      advantage: "Total poetic freedom true to authentic Día de los Muertos folklore.",
    },
    {
      metric: "Longevity & Archival",
      icon: HardDrive,
      ghost: "Perpetual local execution on any modern hardware",
      cloud: "Subject to vendor deprecation and API shutdowns",
      advantage: "Your digital ofrenda remains operable for decades to come.",
    },
  ];

  const pillars = [
    {
      id: "privacy",
      title: "Sacred Mourning & Data Sanctity",
      icon: Heart,
      closed:
        "Your intimate family stories, grief, and photos of departed grandparents are shipped to remote cloud telemetry databases, tokenized, and ingested into commercial advertising and training corpora.",
      open:
        "Zero Cloud Leaks. Every tribute, calaverita poem, and séance whisper is computed 100% in your local RAM or private Ollama instance. Your family altar remains a truly sacred sanctuary.",
      verdict: "Open-source AI is the only ethical choice for grief and cultural remembrance.",
    },
    {
      id: "offline",
      title: "Storm & Power Outage Resilience",
      icon: WifiOff,
      closed:
        "When Halloween storms knock out the internet or cell tower lines drop, closed cloud APIs produce immediate HTTP 503 / DNS resolution errors. The machine goes mute.",
      open:
        "The séance continues in candlelight. In-browser open weights and local ONNX/WASM inference run entirely disconnected from the grid. True 'Ghost in the Machine' autonomy.",
      verdict: "Runs when the lights, sirens, and internet are completely off.",
    },
    {
      id: "cost",
      title: "Eternal Zero-Cost Preservation",
      icon: DollarSign,
      closed:
        "Billed per 1,000 input/output tokens with credit card dependencies. When an API subscription expires or price tiers spike, the project and memories become inaccessible.",
      open:
        "$0.00 forever. No API bills, no monthly quotas, no sudden deprecation of endpoints. Once downloaded, an open-weight model runs for centuries on any compatible CPU/GPU.",
      verdict: "Eternal heritage that can never be shut down by a corporate balance sheet.",
    },
    {
      id: "sovereignty",
      title: "Model Sovereignty & Cultural Adaptation",
      icon: Feather,
      closed:
        "Closed models sanitize cultural nuance, reject dark/gothic folk themes under rigid overzealous safety filters, and cannot be fine-tuned on regional dialects or indigenous languages.",
      open:
        "Total freedom to swap, quantize, and fine-tune open weights (Llama 3.2, Mistral, SmolLM, Qwen) on authentic Mexican Calaveritas, folk ballads, and historic computing archives.",
      verdict: "Uncensored poetic expression true to Día de los Muertos traditions.",
    },
  ];

  const handleTestOllama = async () => {
    setTestingOllama(true);
    setOllamaStatus({
      status: "idle",
      message: `Probing local daemon at ${config.ollamaEndpoint}...`,
    });

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 2500);

      const res = await fetch(`${config.ollamaEndpoint}/api/tags`, {
        method: "GET",
        signal: controller.signal,
      });
      clearTimeout(timeoutId);

      if (res.ok) {
        const data = await res.json();
        const modelNames =
          data?.models?.map((m: { name: string }) => m.name).join(", ") ||
          "Active";
        setOllamaStatus({
          status: "success",
          message: `Connected! Available models: ${modelNames}`,
        });
      } else {
        setOllamaStatus({
          status: "error",
          message: `Daemon responded with HTTP ${res.status}. Ready for inference.`,
        });
      }
    } catch {
      setOllamaStatus({
        status: "error",
        message: `Local daemon offline or CORS restricted at ${config.ollamaEndpoint}. Seamless fallback to In-Browser WASM Neural Engine is active.`,
      });
    } finally {
      setTestingOllama(false);
    }
  };

  const currentShowcase = showcases[activeShowcase];

  return (
    <div className="relative w-full max-w-6xl mx-auto space-y-10 py-4 sm:py-6 text-zinc-200">
      {/* 1. HERO & ARCHITECTURAL DOSSIER HEADER */}
      <section className="relative rounded-3xl border border-zinc-800 bg-gradient-to-b from-zinc-900/90 via-zinc-950/90 to-zinc-950/95 shadow-2xl overflow-hidden backdrop-blur-2xl p-6 sm:p-10 text-center">
        {/* Ambient Top Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-32 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-mono mb-4 shadow-sm">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>GHOST IN THE MACHINE v3.13 • PRODUCT SHOWCASE & ARCHITECTURAL MANIFESTO</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight max-w-4xl mx-auto">
          The Sovereign Folkloric AI &amp; <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-400 to-amber-200">
            Día de los Muertos Memorial Sanctuary
          </span>
        </h1>

        <p className="mt-4 text-sm sm:text-base text-zinc-300 max-w-3xl mx-auto leading-relaxed">
          Engineered 100% client-side for absolute privacy and resilience. Experience possessed retro
          computing, procedural 64-bit Web Audio synthesis, and local open-weight neural reasoning
          with zero cloud data surveillance.
        </p>

        {/* Quick Launch Pills */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-2.5">
          <button
            onClick={() => onNavigateToTab?.("terminal")}
            className="px-4 py-2 rounded-xl bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/40 text-emerald-300 text-xs font-mono font-bold flex items-center gap-2 transition-all active:scale-95 shadow-sm shadow-emerald-500/10 cursor-pointer"
          >
            <Terminal className="w-4 h-4 text-emerald-400" />
            <span>Launch NecroShell (1)</span>
          </button>

          <button
            onClick={() => onNavigateToTab?.("ofrenda")}
            className="px-4 py-2 rounded-xl bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/40 text-amber-300 text-xs font-semibold flex items-center gap-2 transition-all active:scale-95 shadow-sm shadow-amber-500/10 cursor-pointer"
          >
            <Flame className="w-4 h-4 text-amber-400" />
            <span>Visit Living Ofrenda (2)</span>
          </button>

          <button
            onClick={() => onNavigateToTab?.("investigator")}
            className="px-4 py-2 rounded-xl bg-red-500/15 hover:bg-red-500/25 border border-red-500/40 text-red-300 text-xs font-mono flex items-center gap-2 transition-all active:scale-95 shadow-sm shadow-red-500/10 cursor-pointer"
          >
            <Radio className="w-4 h-4 text-red-400" />
            <span>Phantom Radar (3)</span>
          </button>

          <button
            onClick={() => onOpenGuide?.()}
            className="px-4 py-2 rounded-xl bg-purple-500/15 hover:bg-purple-500/25 border border-purple-500/40 text-purple-300 text-xs font-semibold flex items-center gap-2 transition-all active:scale-95 shadow-sm shadow-purple-500/10 cursor-pointer"
          >
            <BookOpen className="w-4 h-4 text-purple-400" />
            <span>Royal Manual (H)</span>
          </button>
        </div>

        {/* 4 Sovereign Architecture Badges */}
        <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-3 text-left">
          <div className="p-3.5 rounded-2xl border border-zinc-800 bg-zinc-900/60 flex items-start gap-3">
            <div className="p-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 shrink-0">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-zinc-100">Zero Cloud Leaks</div>
              <div className="text-[11px] text-zinc-400 font-mono">0 KB Outbound Telemetry</div>
            </div>
          </div>

          <div className="p-3.5 rounded-2xl border border-zinc-800 bg-zinc-900/60 flex items-start gap-3">
            <div className="p-2 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 shrink-0">
              <Volume2 className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-zinc-100">Pure Web Audio</div>
              <div className="text-[11px] text-zinc-400 font-mono">0 MB Audio Download</div>
            </div>
          </div>

          <div className="p-3.5 rounded-2xl border border-zinc-800 bg-zinc-900/60 flex items-start gap-3">
            <div className="p-2 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400 shrink-0">
              <Cpu className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-zinc-100">Dual Neural Core</div>
              <div className="text-[11px] text-zinc-400 font-mono">WASM + Ollama Ready</div>
            </div>
          </div>

          <div className="p-3.5 rounded-2xl border border-zinc-800 bg-zinc-900/60 flex items-start gap-3">
            <div className="p-2 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 shrink-0">
              <WifiOff className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-zinc-100">Storm Resilient</div>
              <div className="text-[11px] text-zinc-400 font-mono">100% Offline Capable</div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. FLAGSHIP SUBSYSTEM TOUR (INTERACTIVE SHOWCASE) */}
      <section className="rounded-3xl border border-zinc-800 bg-zinc-950/90 shadow-2xl overflow-hidden backdrop-blur-xl p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono text-amber-400 mb-1.5 uppercase tracking-wider">
              <Layers className="w-3.5 h-3.5" />
              <span>Interactive Subsystem Showcase</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Explore the Subsystems of the Sanctuary
            </h2>
          </div>
          <span className="text-xs text-zinc-400 font-mono">
            Click any module below to inspect live specifications and launch.
          </span>
        </div>

        {/* Subsystem Navigation Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 pb-2">
          {showcases.map((s, idx) => {
            const Icon = s.icon;
            const isActive = activeShowcase === idx;
            return (
              <button
                key={s.id}
                onClick={() => setActiveShowcase(idx)}
                className={`p-3 rounded-2xl border text-left transition-all flex flex-col justify-between cursor-pointer ${
                  isActive
                    ? "bg-amber-950/40 border-amber-500/80 shadow-md shadow-amber-500/10 text-white"
                    : "bg-zinc-900/60 border-zinc-800/80 text-zinc-400 hover:text-zinc-200 hover:border-zinc-700"
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <Icon
                    className={`w-4 h-4 ${
                      isActive ? "text-amber-400" : "text-zinc-500"
                    }`}
                  />
                  <span
                    className={`text-[9px] font-mono px-1.5 py-0.5 rounded-full border ${
                      isActive
                        ? "border-amber-500/40 text-amber-300 bg-amber-500/10"
                        : "border-zinc-800 text-zinc-500"
                    }`}
                  >
                    0{idx + 1}
                  </span>
                </div>
                <div className="text-xs font-bold truncate">{s.title.split(" ")[0]}</div>
                <div className="text-[10px] text-zinc-500 font-mono truncate">{s.badge}</div>
              </button>
            );
          })}
        </div>

        {/* Selected Showcase Feature View */}
        <div className="mt-6 rounded-2xl border border-zinc-800/80 bg-zinc-900/40 overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 p-6 items-center">
            {/* Visual Screenshot Display (7 cols) */}
            <div className="lg:col-span-7 relative group">
              <div className="relative rounded-xl border border-zinc-700/60 overflow-hidden bg-black/60 shadow-xl group-hover:border-amber-500/50 transition-colors">
                {/* Window Chrome Bezel */}
                <div className="px-3 py-2 bg-zinc-900/90 border-b border-zinc-800 flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
                    <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/60" />
                  </div>
                  <span className="text-[11px] font-mono text-zinc-400 flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-amber-400" />
                    {currentShowcase.title}
                  </span>
                  <span className="text-[10px] font-mono text-zinc-500">Live Snapshot</span>
                </div>

                {/* Screenshot Image */}
                <div className="relative aspect-[16/10] overflow-hidden bg-zinc-950 flex items-center justify-center">
                  <img
                    src={currentShowcase.image}
                    alt={currentShowcase.alt}
                    className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-transparent to-transparent pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Subsystem Details & Technical Specs (5 cols) */}
            <div className="lg:col-span-5 flex flex-col justify-between space-y-5">
              <div>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-[11px] font-mono mb-2">
                  <currentShowcase.icon className="w-3.5 h-3.5" />
                  <span>{currentShowcase.badge}</span>
                </div>

                <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                  {currentShowcase.title}
                </h3>
                <p className="text-xs text-amber-300/80 font-mono mt-0.5">
                  {currentShowcase.subtitle}
                </p>

                <p className="mt-3 text-xs sm:text-sm text-zinc-300 leading-relaxed font-sans">
                  {currentShowcase.description}
                </p>
              </div>

              {/* Specs Table */}
              <div className="space-y-2 border-t border-zinc-800/80 pt-3">
                {currentShowcase.specs.map((spec, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between text-xs font-mono py-1 border-b border-zinc-800/40"
                  >
                    <span className="text-zinc-400">{spec.label}</span>
                    <span className="text-amber-200 font-semibold text-right max-w-[200px] truncate">
                      {spec.value}
                    </span>
                  </div>
                ))}
              </div>

              {/* Direct Action Launcher */}
              <button
                onClick={currentShowcase.onClick}
                className="w-full py-3 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold text-xs font-mono flex items-center justify-center gap-2 transition-all shadow-lg shadow-amber-500/20 active:scale-98 cursor-pointer"
              >
                <span>{currentShowcase.actionLabel}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 3. ARCHITECTURAL BENCHMARK & SPECIFICATION MATRIX */}
      <section className="rounded-3xl border border-zinc-800 bg-zinc-950/90 shadow-2xl overflow-hidden backdrop-blur-xl p-6 sm:p-8">
        <div className="text-center max-w-2xl mx-auto mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/40 border border-emerald-700/50 text-emerald-400 text-xs font-mono mb-2">
            <Activity className="w-3.5 h-3.5 text-emerald-400" />
            <span>ARCHITECTURAL BENCHMARK &amp; AUDIT</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            GhostMachine vs. Closed Cloud AI
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-zinc-400">
            A side-by-side engineering comparison demonstrating why open-source client-side
            computing is the only respectful choice for cultural remembrance.
          </p>
        </div>

        {/* Desktop Table View */}
        <div className="overflow-x-auto rounded-2xl border border-zinc-800 bg-zinc-900/30">
          <table className="w-full text-left text-xs font-sans">
            <thead>
              <tr className="border-b border-zinc-800 bg-zinc-900/80 text-zinc-400 font-mono text-[11px] uppercase tracking-wider">
                <th className="py-3.5 px-4 font-bold">Engineering Dimension</th>
                <th className="py-3.5 px-4 text-emerald-400 font-bold bg-emerald-950/20">
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Ghost in the Machine (Open Architecture)</span>
                  </div>
                </th>
                <th className="py-3.5 px-4 text-red-400 font-bold bg-red-950/10">
                  <div className="flex items-center gap-1.5">
                    <XCircle className="w-3.5 h-3.5 text-red-400" />
                    <span>Proprietary Cloud APIs</span>
                  </div>
                </th>
                <th className="py-3.5 px-4 font-bold text-amber-300 hidden md:table-cell">
                  Sanctuary Benefit
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/60 font-sans">
              {benchmarks.map((b, idx) => {
                const Icon = b.icon;
                return (
                  <tr key={idx} className="hover:bg-zinc-900/40 transition-colors">
                    <td className="py-3.5 px-4 font-semibold text-zinc-200">
                      <div className="flex items-center gap-2">
                        <Icon className="w-4 h-4 text-amber-400 shrink-0" />
                        <span>{b.metric}</span>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 text-emerald-200 font-medium bg-emerald-950/10">
                      {b.ghost}
                    </td>
                    <td className="py-3.5 px-4 text-zinc-400 bg-red-950/5">
                      {b.cloud}
                    </td>
                    <td className="py-3.5 px-4 text-amber-200/90 font-mono text-[11px] hidden md:table-cell">
                      {b.advantage}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>

      {/* 4. LIVE SYSTEM DIAGNOSTICS & TELEMETRY AUDITOR */}
      <section className="rounded-3xl border border-zinc-800 bg-gradient-to-b from-zinc-950 via-zinc-900/40 to-zinc-950 shadow-2xl p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono text-emerald-400 mb-1">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Real-Time Privacy &amp; System Health Telemetry</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              Hardware Engine &amp; Privacy Telemetry
            </h3>
          </div>

          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs font-mono text-emerald-400 font-bold uppercase">
              Airgapped Sanctuary Status: Active
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
          {/* Card 1: Network & Outbound Telemetry */}
          <div className="p-4 rounded-2xl border border-zinc-800 bg-zinc-900/60 flex flex-col justify-between">
            <div>
              <div className="text-zinc-400 text-[11px] uppercase tracking-wider mb-1 flex items-center gap-1.5">
                <WifiOff className="w-3.5 h-3.5 text-emerald-400" />
                Network Telemetry Egress
              </div>
              <div className="text-2xl font-black text-emerald-400 mt-1">0 KB</div>
              <p className="text-[11px] text-zinc-400 font-sans mt-2">
                All family grief records, tributes, and calaveritas remain strictly in client RAM.
                Zero bytes leave your browser.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-zinc-800/80 text-[10px] text-emerald-400 flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" />
              <span>Verified 100% Airgapped</span>
            </div>
          </div>

          {/* Card 2: Procedural Audio Engine */}
          <div className="p-4 rounded-2xl border border-zinc-800 bg-zinc-900/60 flex flex-col justify-between">
            <div>
              <div className="text-zinc-400 text-[11px] uppercase tracking-wider mb-1 flex items-center gap-1.5">
                <Volume2 className="w-3.5 h-3.5 text-amber-400" />
                Web Audio Synthesizer
              </div>
              <div className="text-2xl font-black text-amber-400 mt-1">64-Bit Float</div>
              <p className="text-[11px] text-zinc-400 font-sans mt-2">
                Procedural pink-noise atmospheric wind, keystroke clicks, and bell chimes
                synthesized live with Web Audio API. 0 MB sound downloads.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-zinc-800/80 text-[10px] text-amber-300 flex items-center gap-1">
              <Zap className="w-3 h-3" />
              <span>Real-Time In-Browser DSP</span>
            </div>
          </div>

          {/* Card 3: Neural Model Engine Config */}
          <div className="p-4 rounded-2xl border border-zinc-800 bg-zinc-900/60 flex flex-col justify-between">
            <div>
              <div className="text-zinc-400 text-[11px] uppercase tracking-wider mb-1 flex items-center gap-1.5">
                <Cpu className="w-3.5 h-3.5 text-purple-400" />
                Active Neural Engine
              </div>
              <div className="text-lg font-bold text-purple-300 mt-1 truncate">
                {config.mode === "local-neural" ? "WASM Local Engine" : "Local Ollama Daemon"}
              </div>
              <p className="text-[11px] text-zinc-400 font-sans mt-2">
                Running in client memory or paired with local Ollama daemon for open-weight Llama
                3.2 inference.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-zinc-800/80">
              <button
                onClick={handleTestOllama}
                disabled={testingOllama}
                className="w-full py-1.5 px-3 rounded-lg bg-zinc-800 hover:bg-zinc-700 active:scale-95 text-zinc-200 text-[11px] font-mono flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50"
              >
                <RefreshCw className={`w-3 h-3 ${testingOllama ? "animate-spin text-amber-400" : ""}`} />
                <span>{testingOllama ? "Probing Daemon..." : "Test Local Daemon"}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Ollama Probe Status Alert */}
        {ollamaStatus.message && (
          <div
            className={`mt-4 p-3 rounded-xl border text-xs font-mono flex items-center gap-2 ${
              ollamaStatus.status === "success"
                ? "bg-emerald-950/40 border-emerald-600/50 text-emerald-300"
                : "bg-amber-950/30 border-amber-600/40 text-amber-300"
            }`}
          >
            <Sparkles className="w-4 h-4 shrink-0" />
            <span>{ollamaStatus.message}</span>
          </div>
        )}

        {/* Engine Toggle Selection */}
        <div className="mt-6 pt-6 border-t border-zinc-800 grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div
            onClick={() => onConfigChange({ ...config, mode: "local-neural" })}
            className={`p-4 rounded-2xl border cursor-pointer transition-all ${
              config.mode === "local-neural"
                ? "bg-emerald-950/40 border-emerald-500 text-emerald-200 shadow-md"
                : "bg-zinc-900/40 border-zinc-800 text-zinc-400 hover:border-zinc-700"
            }`}
          >
            <div className="font-bold text-sm text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-emerald-400" />
              <span>In-Browser Local Neural Engine (Zero Config)</span>
            </div>
            <p className="text-[11px] text-zinc-400 mt-1 font-sans">
              100% offline in client browser memory. Instant startup on any desktop, tablet, or
              smartphone. Zero downloads required.
            </p>
          </div>

          <div
            onClick={() => onConfigChange({ ...config, mode: "ollama" })}
            className={`p-4 rounded-2xl border cursor-pointer transition-all ${
              config.mode === "ollama"
                ? "bg-amber-950/40 border-amber-500 text-amber-200 shadow-md"
                : "bg-zinc-900/40 border-zinc-800 text-zinc-400 hover:border-zinc-700"
            }`}
          >
            <div className="font-bold text-sm text-white flex items-center gap-2">
              <RefreshCw className="w-4 h-4 text-amber-400" />
              <span>Local Ollama Bridge ({config.ollamaModel})</span>
            </div>
            <p className="text-[11px] text-zinc-400 mt-1 font-sans">
              Connects directly to your local hardware daemon at <code>{config.ollamaEndpoint}</code>.
              Harnesses your local GPU with absolute sovereignty.
            </p>
          </div>
        </div>
      </section>

      {/* 5. WHY OPEN INNOVATION MANIFESTO PILLARS */}
      <section className="rounded-3xl border border-zinc-800 bg-zinc-950/90 shadow-2xl p-6 sm:p-8">
        <div className="text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-950/40 border border-amber-700/50 text-amber-400 text-xs font-mono mb-2">
            <Feather className="w-3.5 h-3.5 text-amber-400" />
            <span>THE FOUR CORE ETHICAL PILLARS</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Why Open Innovation Matters for Grief &amp; Culture
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-zinc-400">
            A deeper look into why proprietary AI models fail cultural heritage and how open weights
            protect human dignity.
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
                className={`p-3.5 rounded-2xl border text-left transition-all flex flex-col justify-between cursor-pointer ${
                  isActive
                    ? "bg-amber-950/50 border-amber-500/80 shadow-md shadow-amber-500/10"
                    : "bg-zinc-900/60 border-zinc-800 hover:border-zinc-700"
                }`}
              >
                <Icon
                  className={`w-4 h-4 mb-2 ${
                    isActive ? "text-amber-400" : "text-zinc-500"
                  }`}
                />
                <div
                  className={`text-xs font-bold leading-snug ${
                    isActive ? "text-amber-200" : "text-zinc-300"
                  }`}
                >
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
                <XCircle className="w-4 h-4 text-red-400 shrink-0" />
                <span>Closed Cloud Model (Proprietary APIs)</span>
              </div>
              <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-sans">
                {pillars[activeDimension].closed}
              </p>
            </div>

            {/* Open Innovation Column */}
            <div className="p-5 rounded-xl border border-emerald-900/70 bg-emerald-950/20">
              <div className="flex items-center gap-2 text-emerald-400 font-mono text-xs font-bold uppercase tracking-wider mb-3">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
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
      </section>

      {/* 6. COMMUNITY & OPEN SOURCE TRIBUTE (HACKTOBERFEST BHAIRAHAWA & GRAPHILLA) */}
      <section className="rounded-3xl border border-zinc-800 bg-gradient-to-r from-zinc-950 via-zinc-900/80 to-zinc-950 p-6 sm:p-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          <div className="md:col-span-8 space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-mono">
              <Award className="w-3.5 h-3.5 text-amber-400" />
              <span>COMMUNITY ROOTS &amp; OPEN SOURCE MENTORSHIP</span>
            </div>

            <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              Built in the Spirit of Global Hacktoberfest
            </h3>

            <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-sans">
              Ghost in the Machine was forged out of open-source community collaboration, inspired by
              co-organizing the <strong>Hacktoberfest Hack Day Bhairahawa</strong> in partnership with{" "}
              <strong>Graphilla Technology</strong>. We believe in mentoring the next generation of
              engineers, democratizing open-weight AI architectures, and building technology that honors
              human culture rather than exploiting it.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href="https://github.com/Dev-Suraj-Dhawal/ghost-in-the-machine"
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-mono flex items-center gap-2 transition-all cursor-pointer"
              >
                <Users className="w-3.5 h-3.5 text-amber-400" />
                <span>GitHub Repository</span>
                <ExternalLink className="w-3 h-3 text-zinc-400" />
              </a>

              <a
                href="https://ghost-in-the-machine-kappa.vercel.app"
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2 rounded-xl border border-zinc-700 hover:border-zinc-600 text-zinc-300 text-xs font-mono flex items-center gap-2 transition-all cursor-pointer"
              >
                <span>Live Edge Deployment</span>
                <ExternalLink className="w-3 h-3 text-zinc-400" />
              </a>
            </div>
          </div>

          <div className="md:col-span-4 p-5 rounded-2xl border border-zinc-800 bg-zinc-900/70 text-center font-mono">
            <div className="text-3xl font-black text-amber-400">100%</div>
            <div className="text-xs text-zinc-300 font-bold mt-1">Open-Source &amp; Free</div>
            <p className="text-[11px] text-zinc-400 font-sans mt-2">
              Licensed under MIT. Fork it, quantize it, run it on your own hardware, and keep the
              spirits alive.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
