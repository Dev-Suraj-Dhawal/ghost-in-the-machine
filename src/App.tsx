import React, { useState, useEffect } from "react";
import {
  Terminal,
  Flame,
  Radio,
  ShieldCheck,
  Volume2,
  VolumeX,
  Sparkles,
  Waves,
  Palette,
  Keyboard,
  X,
  ExternalLink,
} from "lucide-react";
import NecroShell from "@/components/NecroShell";
import LivingOfrenda from "@/components/LivingOfrenda";
import PhantomInvestigator from "@/components/PhantomInvestigator";
import OpenInnovationComparison from "@/components/OpenInnovationComparison";
import { DEFAULT_AI_CONFIG } from "@/lib/aiEngine";
import { AIInferenceConfig } from "@/lib/types";
import { sound } from "@/lib/soundEngine";

export type AppTheme = "cempasuchil" | "spectral" | "bloodmoon";

export default function App() {
  const [activeTab, setActiveTab] = useState<"terminal" | "ofrenda" | "investigator" | "manifesto">("terminal");
  const [aiConfig, setAiConfig] = useState<AIInferenceConfig>(DEFAULT_AI_CONFIG);
  const [isMuted, setIsMuted] = useState(sound.getMuted());
  const [volume, setVolume] = useState<number>(sound.getVolume());
  const [isDroneOn, setIsDroneOn] = useState<boolean>(sound.isDroneActive());
  const [audioActivity, setAudioActivity] = useState<number>(0);
  const [showShortcutsModal, setShowShortcutsModal] = useState<boolean>(false);
  const [theme, setTheme] = useState<AppTheme>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("ghost_theme");
      if (saved === "cempasuchil" || saved === "spectral" || saved === "bloodmoon") return saved;
    }
    return "cempasuchil";
  });

  // Apply theme to document
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("ghost_theme", theme);
  }, [theme]);

  // Subscribe to audio activity
  useEffect(() => {
    const unsub = sound.subscribeActivity((level) => {
      setAudioActivity(level);
    });
    return unsub;
  }, []);

  // Global keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't intercept if user is typing in an input or textarea
      const target = e.target as HTMLElement;
      if (target && (target.tagName === "INPUT" || target.tagName === "TEXTAREA")) {
        return;
      }

      if (e.key === "1") {
        handleTabChange("terminal");
      } else if (e.key === "2") {
        handleTabChange("ofrenda");
      } else if (e.key === "3") {
        handleTabChange("investigator");
      } else if (e.key === "4") {
        handleTabChange("manifesto");
      } else if (e.key === "m" || e.key === "M") {
        handleToggleSound();
      } else if (e.key === "d" || e.key === "D") {
        handleToggleDrone();
      } else if (e.key === "?") {
        setShowShortcutsModal((prev) => !prev);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isMuted, isDroneOn]);

  const handleTabChange = (tab: "terminal" | "ofrenda" | "investigator" | "manifesto") => {
    setActiveTab(tab);
    if (tab === "ofrenda") {
      sound.playCandleChime();
    } else if (tab === "terminal") {
      sound.playKeyClick();
    } else if (tab === "investigator") {
      sound.playRadarPing();
    } else {
      sound.playSpectralTone(300, 0.25);
    }
  };

  const handleToggleSound = () => {
    const next = !isMuted;
    setIsMuted(next);
    sound.setMuted(next);
    if (!next) {
      sound.playCandleChime();
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    sound.setVolume(val);
    if (isMuted && val > 0) {
      setIsMuted(false);
      sound.setMuted(false);
    }
  };

  const handleToggleDrone = () => {
    const active = sound.toggleAmbientDrone();
    setIsDroneOn(active);
  };

  const cycleTheme = () => {
    const nextTheme: Record<AppTheme, AppTheme> = {
      cempasuchil: "spectral",
      spectral: "bloodmoon",
      bloodmoon: "cempasuchil",
    };
    const next = nextTheme[theme];
    setTheme(next);
    sound.playSpectralTone(next === "spectral" ? 440 : next === "bloodmoon" ? 220 : 528, 0.2);
  };

  return (
    <div className="min-h-screen flex flex-col justify-between selection:bg-amber-500 selection:text-black">
      {/* Top Navbar */}
      <header className="sticky top-0 z-40 border-b border-zinc-800/80 bg-zinc-950/85 backdrop-blur-md px-3 sm:px-8 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-3 flex-wrap sm:flex-nowrap">
          {/* Logo & Title */}
          <div className="flex items-center gap-3">
            <div className="relative w-9 h-9 rounded-xl bg-gradient-to-br from-amber-500/20 via-orange-600/30 to-purple-600/20 border border-amber-500/40 flex items-center justify-center text-lg shadow-lg shadow-amber-500/10">
              👻
              {audioActivity > 0 && (
                <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
              )}
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
                Possessed Shell • Living Ofrenda • Zero Cloud Leaks
              </div>
            </div>
          </div>

          {/* Navigation Mode Tabs */}
          <nav className="flex items-center gap-1 p-1 rounded-xl bg-zinc-900/90 border border-zinc-800 text-xs font-medium order-3 sm:order-2 w-full sm:w-auto justify-center">
            <button
              onClick={() => handleTabChange("terminal")}
              aria-label="Switch to NecroShell Terminal"
              className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
                activeTab === "terminal"
                  ? "bg-emerald-950 text-emerald-300 border border-emerald-500/60 font-mono shadow-sm"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              <Terminal className="w-3.5 h-3.5" />
              <span>NecroShell</span>
              <kbd className="hidden lg:inline text-[9px] px-1 py-0.2 rounded bg-zinc-800 text-zinc-400 border border-zinc-700">1</kbd>
            </button>

            <button
              onClick={() => handleTabChange("ofrenda")}
              aria-label="Switch to Living Ofrenda"
              className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
                activeTab === "ofrenda"
                  ? "bg-amber-950 text-amber-300 border border-amber-500/60 font-semibold shadow-sm"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              <Flame className="w-3.5 h-3.5 candle-flame fill-amber-400" />
              <span>Living Ofrenda</span>
              <kbd className="hidden lg:inline text-[9px] px-1 py-0.2 rounded bg-zinc-800 text-zinc-400 border border-zinc-700">2</kbd>
            </button>

            <button
              onClick={() => handleTabChange("investigator")}
              aria-label="Switch to Telemetry Logs"
              className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
                activeTab === "investigator"
                  ? "bg-red-950 text-red-300 border border-red-500/60 font-medium shadow-sm"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              <Radio className="w-3.5 h-3.5" />
              <span>Telemetry Logs</span>
              <kbd className="hidden lg:inline text-[9px] px-1 py-0.2 rounded bg-zinc-800 text-zinc-400 border border-zinc-700">3</kbd>
            </button>

            <button
              onClick={() => handleTabChange("manifesto")}
              aria-label="Switch to Why Open Manifesto"
              className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
                activeTab === "manifesto"
                  ? "bg-purple-950 text-purple-300 border border-purple-500/60 font-medium shadow-sm"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Why Open</span>
              <kbd className="hidden lg:inline text-[9px] px-1 py-0.2 rounded bg-zinc-800 text-zinc-400 border border-zinc-700">4</kbd>
            </button>
          </nav>

          {/* Right Tools: Ambient Audio, Volume, Theme, Shortcuts & GitHub */}
          <div className="flex items-center gap-2 order-2 sm:order-3 ml-auto sm:ml-0">
            {/* Ambient Sound Drone Toggle */}
            <button
              onClick={handleToggleDrone}
              title={isDroneOn ? "Turn off Séance Ambient Drone (D)" : "Turn on Séance Ambient Drone (D)"}
              className={`px-2.5 py-1.5 rounded-lg border text-xs font-mono flex items-center gap-1.5 transition-colors ${
                isDroneOn
                  ? "border-amber-500/70 bg-amber-500/20 text-amber-300 shadow-sm shadow-amber-500/20"
                  : "border-zinc-800 bg-zinc-900/60 text-zinc-400 hover:text-zinc-200"
              }`}
            >
              <Waves className={`w-3.5 h-3.5 ${isDroneOn ? "animate-pulse" : ""}`} />
              <span className="hidden xl:inline text-[11px]">Ambient</span>
            </button>

            {/* Audio Mute/Unmute & Equalizer Visualizer */}
            <div className="flex items-center gap-1.5 bg-zinc-900/60 border border-zinc-800 p-1 rounded-lg">
              <button
                onClick={handleToggleSound}
                className="p-1 rounded text-zinc-300 hover:text-white transition-colors"
                title={isMuted ? "Unmute Audio (M)" : "Mute Audio (M)"}
              >
                {isMuted ? (
                  <VolumeX className="w-4 h-4 text-zinc-500" />
                ) : (
                  <Volume2 className="w-4 h-4 text-amber-400" />
                )}
              </button>

              {/* Real-time mini audio visualizer bars */}
              {!isMuted && (
                <div className="flex items-end gap-0.5 h-4 w-4 px-0.5" title="Procedural Audio Synthesizer">
                  <span className={`w-0.5 bg-amber-400 rounded-full ${audioActivity > 0 ? "audio-bar-1" : "h-1"}`} />
                  <span className={`w-0.5 bg-amber-300 rounded-full ${audioActivity > 0 ? "audio-bar-2" : "h-2"}`} />
                  <span className={`w-0.5 bg-amber-400 rounded-full ${audioActivity > 0 ? "audio-bar-3" : "h-1.5"}`} />
                  <span className={`w-0.5 bg-orange-400 rounded-full ${audioActivity > 0 ? "audio-bar-4" : "h-1"}`} />
                </div>
              )}

              {/* Mini volume slider */}
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={isMuted ? 0 : volume}
                onChange={handleVolumeChange}
                aria-label="Master audio volume"
                className="w-14 h-1.5 bg-zinc-700 rounded-lg appearance-none cursor-pointer accent-amber-500 hidden md:inline-block"
                title={`Volume: ${Math.round(volume * 100)}%`}
              />
            </div>

            {/* Theme Switcher Button */}
            <button
              onClick={cycleTheme}
              className="p-1.5 sm:px-2.5 sm:py-1.5 rounded-lg border border-zinc-800 bg-zinc-900/60 hover:bg-zinc-800 text-zinc-300 flex items-center gap-1.5 text-xs transition-colors"
              title={`Active Theme: ${theme.toUpperCase()} (Click to cycle)`}
            >
              <Palette className="w-3.5 h-3.5 text-amber-400" />
              <span className="hidden lg:inline capitalize font-mono text-[11px]">{theme}</span>
            </button>

            {/* Keyboard Shortcuts Trigger */}
            <button
              onClick={() => setShowShortcutsModal(true)}
              className="p-1.5 rounded-lg border border-zinc-800 bg-zinc-900/60 hover:bg-zinc-800 text-zinc-400 hover:text-white text-xs transition-colors hidden sm:flex items-center justify-center"
              title="Keyboard Shortcuts (?)"
              aria-label="View Keyboard Shortcuts"
            >
              <Keyboard className="w-3.5 h-3.5" />
            </button>

            {/* GitHub Repo Link */}
            <a
              href="https://github.com/Dev-Suraj-Dhawal/ghost-in-the-machine"
              target="_blank"
              rel="noreferrer"
              className="px-2.5 py-1.5 rounded-lg border border-zinc-700/80 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-mono font-medium flex items-center gap-1.5 transition-colors"
            >
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                />
              </svg>
              <span className="hidden sm:inline">Repo</span>
            </a>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-3 sm:p-6 lg:p-8 flex flex-col justify-center">
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

      {/* Keyboard Shortcuts Modal */}
      {showShortcutsModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-zinc-950 border border-zinc-800 rounded-2xl max-w-md w-full p-6 shadow-2xl relative">
            <button
              onClick={() => setShowShortcutsModal(false)}
              className="absolute top-4 right-4 text-zinc-400 hover:text-white p-1 rounded-lg"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-2 mb-4 text-amber-400 font-bold">
              <Keyboard className="w-5 h-5" />
              <h3 className="text-base text-white">Keyboard Shortcuts</h3>
            </div>
            <div className="space-y-2.5 text-xs">
              <div className="flex justify-between items-center py-1.5 border-b border-zinc-800/80">
                <span className="text-zinc-300">NecroShell Terminal</span>
                <kbd className="px-2 py-1 rounded bg-zinc-900 border border-zinc-700 font-mono text-amber-400">1</kbd>
              </div>
              <div className="flex justify-between items-center py-1.5 border-b border-zinc-800/80">
                <span className="text-zinc-300">Living Ofrenda Altar</span>
                <kbd className="px-2 py-1 rounded bg-zinc-900 border border-zinc-700 font-mono text-amber-400">2</kbd>
              </div>
              <div className="flex justify-between items-center py-1.5 border-b border-zinc-800/80">
                <span className="text-zinc-300">Telemetry Sensor Dossier</span>
                <kbd className="px-2 py-1 rounded bg-zinc-900 border border-zinc-700 font-mono text-amber-400">3</kbd>
              </div>
              <div className="flex justify-between items-center py-1.5 border-b border-zinc-800/80">
                <span className="text-zinc-300">Why Open Manifesto</span>
                <kbd className="px-2 py-1 rounded bg-zinc-900 border border-zinc-700 font-mono text-amber-400">4</kbd>
              </div>
              <div className="flex justify-between items-center py-1.5 border-b border-zinc-800/80">
                <span className="text-zinc-300">Toggle Master Mute</span>
                <kbd className="px-2 py-1 rounded bg-zinc-900 border border-zinc-700 font-mono text-amber-400">M</kbd>
              </div>
              <div className="flex justify-between items-center py-1.5 border-b border-zinc-800/80">
                <span className="text-zinc-300">Toggle Ambient Séance Drone</span>
                <kbd className="px-2 py-1 rounded bg-zinc-900 border border-zinc-700 font-mono text-amber-400">D</kbd>
              </div>
              <div className="flex justify-between items-center py-1.5">
                <span className="text-zinc-300">Open This Help Dialog</span>
                <kbd className="px-2 py-1 rounded bg-zinc-900 border border-zinc-700 font-mono text-amber-400">?</kbd>
              </div>
            </div>
            <div className="mt-5 pt-4 border-t border-zinc-800 text-center">
              <button
                onClick={() => setShowShortcutsModal(false)}
                className="w-full py-2 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 font-semibold text-xs border border-amber-500/40 transition-colors"
              >
                Close (Esc)
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="border-t border-zinc-800/80 bg-zinc-950/70 backdrop-blur-sm py-5 px-4 sm:px-8 text-xs text-zinc-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div>
            <span className="text-zinc-400 font-semibold">Ghost in the Machine</span> • Submission for{" "}
            <a
              href="https://dev.to/challenges/hacktoberfest-week4-2026-10-26"
              target="_blank"
              rel="noreferrer"
              className="text-amber-400 hover:underline inline-flex items-center gap-1"
            >
              <span>Hacktoberfest Open-Source AI Challenge Week 4</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          <div className="flex items-center gap-3 text-[11px] font-mono text-zinc-400 flex-wrap justify-center">
            <span>Built by Suraj Dhawal</span>
            <span>•</span>
            <span className="text-emerald-400">100% Client-Side Privacy</span>
            <span>•</span>
            <span className="capitalize">{theme} Theme Active</span>
            <span>•</span>
            <span>Día de los Muertos & Halloween</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
