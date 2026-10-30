import React, { useState } from "react";
import { Terminal, Flame, Radio, ShieldCheck, Volume2, VolumeX, Sparkles, Moon } from "lucide-react";
import NecroShell from "@/components/NecroShell";
import LivingOfrenda from "@/components/LivingOfrenda";
import PhantomInvestigator from "@/components/PhantomInvestigator";
import OpenInnovationComparison from "@/components/OpenInnovationComparison";
import { DEFAULT_AI_CONFIG } from "@/lib/aiEngine";
import { AIInferenceConfig } from "@/lib/types";
import { sound } from "@/lib/soundEngine";

export default function App() {
  const [activeTab, setActiveTab] = useState<"terminal" | "ofrenda" | "investigator" | "manifesto">("terminal");
  const [aiConfig, setAiConfig] = useState<AIInferenceConfig>(DEFAULT_AI_CONFIG);
  const [isMuted, setIsMuted] = useState(sound.getMuted());

  const handleTabChange = (tab: "terminal" | "ofrenda" | "investigator" | "manifesto") => {
    setActiveTab(tab);
    if (tab === "ofrenda") {
      sound.playCandleChime();
    } else if (tab === "terminal") {
      sound.playKeyClick();
    } else {
      sound.playSpectralTone(300, 0.2);
    }
  };

  const handleToggleSound = () => {
    const next = !isMuted;
    setIsMuted(next);
    sound.setMuted(next);
    if (!next) sound.playCandleChime();
  };

  return (
    <div className="min-h-screen bg-[#050608] text-slate-100 flex flex-col justify-between selection:bg-amber-500 selection:text-black">
      {/* Top Navbar */}
      <header className="sticky top-0 z-40 border-b border-zinc-800/80 bg-zinc-950/80 backdrop-blur-md px-4 sm:px-8 py-3.5">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          {/* Logo & Title */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-500/20 via-orange-600/30 to-purple-600/20 border border-amber-500/40 flex items-center justify-center text-lg shadow-lg shadow-amber-500/10">
              👻
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold tracking-tight text-white text-sm sm:text-base">
                  GHOST IN THE MACHINE
                </span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-amber-500/10 text-amber-400 border border-amber-500/30 font-semibold hidden sm:inline-block">
                  Open-Source AI
                </span>
              </div>
              <div className="text-[11px] text-zinc-400 hidden sm:block">
                Possessed Shell • Living Ofrenda • 100% Offline Autonomy
              </div>
            </div>
          </div>

          {/* Navigation Mode Tabs */}
          <nav className="flex items-center gap-1.5 p-1 rounded-xl bg-zinc-900/90 border border-zinc-800 text-xs font-medium">
            <button
              onClick={() => handleTabChange("terminal")}
              className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
                activeTab === "terminal"
                  ? "bg-emerald-950 text-emerald-300 border border-emerald-500/60 font-mono shadow-sm"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              <Terminal className="w-3.5 h-3.5" />
              <span className="hidden md:inline">NecroShell</span>
            </button>

            <button
              onClick={() => handleTabChange("ofrenda")}
              className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
                activeTab === "ofrenda"
                  ? "bg-amber-950 text-amber-300 border border-amber-500/60 font-semibold shadow-sm"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              <Flame className="w-3.5 h-3.5 candle-flame fill-amber-400" />
              <span className="hidden md:inline">Living Ofrenda</span>
            </button>

            <button
              onClick={() => handleTabChange("investigator")}
              className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
                activeTab === "investigator"
                  ? "bg-red-950 text-red-300 border border-red-500/60 font-medium shadow-sm"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              <Radio className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Telemetry Logs</span>
            </button>

            <button
              onClick={() => handleTabChange("manifesto")}
              className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
                activeTab === "manifesto"
                  ? "bg-purple-950 text-purple-300 border border-purple-500/60 font-medium shadow-sm"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Why Open</span>
            </button>
          </nav>

          {/* Right Tools: Sound & GitHub */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleToggleSound}
              className="p-2 rounded-lg border border-zinc-800 bg-zinc-900/60 hover:bg-zinc-800 text-zinc-300 transition-colors"
              title={isMuted ? "Unmute Audio" : "Mute Audio"}
            >
              {isMuted ? <VolumeX className="w-4 h-4 text-zinc-500" /> : <Volume2 className="w-4 h-4 text-amber-400" />}
            </button>

            <a
              href="https://github.com/Dev-Suraj-Dhawal/ghost-in-the-machine"
              target="_blank"
              rel="noreferrer"
              className="px-3 py-1.5 rounded-lg border border-zinc-700/80 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-mono font-medium flex items-center gap-1.5 transition-colors"
            >
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
              </svg>
              <span className="hidden sm:inline">GitHub</span>
            </a>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 flex flex-col justify-center">
        {activeTab === "terminal" && (
          <NecroShell
            onNavigateToOfrenda={() => handleTabChange("ofrenda")}
            onNavigateToInvestigator={() => handleTabChange("investigator")}
            aiConfig={aiConfig}
          />
        )}

        {activeTab === "ofrenda" && (
          <LivingOfrenda onBackToTerminal={() => handleTabChange("terminal")} />
        )}

        {activeTab === "investigator" && (
          <PhantomInvestigator aiConfig={aiConfig} />
        )}

        {activeTab === "manifesto" && (
          <OpenInnovationComparison config={aiConfig} onConfigChange={setAiConfig} />
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-800/80 bg-zinc-950/60 backdrop-blur-sm py-6 px-4 sm:px-8 text-xs text-zinc-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div>
            <span className="text-zinc-400 font-semibold">Ghost in the Machine</span> • Submission for{" "}
            <a
              href="https://dev.to/challenges/hacktoberfest-week4-2026-10-26"
              target="_blank"
              rel="noreferrer"
              className="text-amber-400 hover:underline"
            >
              Hacktoberfest Open-Source AI Challenge Week 4
            </a>
          </div>

          <div className="flex items-center gap-4 text-[11px] font-mono text-zinc-400">
            <span>Built by Suraj Dhawal</span>
            <span>•</span>
            <span className="text-emerald-400">100% Client-Side Privacy</span>
            <span>•</span>
            <span>Día de los Muertos & Halloween</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
