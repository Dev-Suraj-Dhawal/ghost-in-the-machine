import React, { useState } from "react";
import {
  X,
  Copy,
  Check,
  Sparkles,
  Flame,
  Radio,
  Terminal,
  ShieldCheck,
  Feather,
  Crown,
  Scroll,
  HelpCircle,
  Keyboard,
  ExternalLink,
} from "lucide-react";
import { AppTheme } from "@/App";
import { sound } from "@/lib/soundEngine";

interface BeginnerGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  theme: AppTheme;
  onSelectTab: (tab: "terminal" | "ofrenda" | "investigator" | "manifesto") => void;
}

type FarmanChapter = "proclamation" | "invocations" | "ofrenda_altar" | "astral_frequencies" | "faq";

interface DecreeCommand {
  command: string;
  title: string;
  category: string;
  decreeDetail: string;
  astralConsequence: string;
}

const DECREE_COMMANDS: DecreeCommand[] = [
  {
    command: "help",
    title: "Codex of Forbidden Spells",
    category: "Discovery",
    decreeDetail: "Unfurls the sacred inventory of all available terminal commands and ethereal shortcuts.",
    astralConsequence: "Displays 'seance', 'whisper', 'ofrenda', 'investigate', 'possessed', and 'cat'.",
  },
  {
    command: "seance ada",
    title: "Summon Lady Ada Lovelace",
    category: "Séance",
    decreeDetail: "Awakens the spirit of Ada Lovelace (1815–1852), the world's foremost enchantress of numbers.",
    astralConsequence: "The CRT pulses with phosphor light as Ada assumes command of the terminal stdin/stdout.",
  },
  {
    command: "whisper Why did you invent the first algorithm?",
    title: "Commune Directly with the Spirit",
    category: "Dialogue",
    decreeDetail: "Asks the summoned pioneer an existential or technical inquiry via the offline neural engine.",
    astralConsequence: "The machine whispers back historical computing lore in authentic first-person voice.",
  },
  {
    command: "cat hopper",
    title: "Inspect Grace Hopper's Moth Relic",
    category: "Archives",
    decreeDetail: "Reads Rear Admiral Grace Hopper's archival log and the historic 1947 moth trapped in Relay #70.",
    astralConsequence: "Prints the compiler manifesto and original hardware bug specimen documentation.",
  },
  {
    command: "possessed",
    title: "Trigger Paranormal State Rupture",
    category: "Supernatural",
    decreeDetail: "Commands the machine to unleash a full CRT scanline glitch and chromatic aberration surge.",
    astralConsequence: "Screen flickers with red static, sub-bass tremor, and procedural audio glitch bursts.",
  },
  {
    command: "ofrenda",
    title: "Journey to the Sacred Altar",
    category: "Sanctuary",
    decreeDetail: "Teleports you directly to the candlelit Día de los Muertos Living Altar.",
    astralConsequence: "Spawns drifting cempasúchil marigolds and chimes the sacred 528Hz bell.",
  },
  {
    command: "investigate",
    title: "Launch Telemetry Radar Sweep",
    category: "Sensors",
    decreeDetail: "Opens the 60fps radar sweep tracking midnight smart-home sensor anomalies.",
    astralConsequence: "Plots real-time 18.98Hz infrasound and 7.83Hz Schumann planetary resonance waves.",
  },
];

export default function BeginnerGuideModal({
  isOpen,
  onClose,
  theme,
  onSelectTab,
}: BeginnerGuideModalProps) {
  const [activeChapter, setActiveChapter] = useState<FarmanChapter>("proclamation");
  const [copiedCmd, setCopiedCmd] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleCopyDecree = async (cmd: string) => {
    try {
      await navigator.clipboard.writeText(cmd);
      setCopiedCmd(cmd);
      sound.playKeyClick();
      setTimeout(() => setCopiedCmd(null), 2200);
    } catch {
      // ignore
    }
  };

  const handleSelectTabAndClose = (tab: "terminal" | "ofrenda" | "investigator" | "manifesto") => {
    onSelectTab(tab);
    onClose();
    sound.playCandleChime();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="farman-royal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-300 select-none overflow-y-auto"
      onClick={onClose}
    >
      {/* Outer Scroll Wrapper - Prevent click-through */}
      <div
        className="relative w-full max-w-4xl my-auto flex flex-col items-center justify-center pointer-events-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* TOP ORNATE ROYAL WOOD & GOLD ROLLER DOWEL */}
        <div className="w-full flex items-center justify-center relative z-20 -mb-2">
          {/* Left Carved Gold Finial Cap */}
          <div className="w-8 sm:w-12 h-8 sm:h-12 rounded-full bg-gradient-to-r from-amber-600 via-yellow-400 to-amber-700 shadow-xl border-2 border-amber-300 flex items-center justify-center shrink-0">
            <div className="w-3 sm:w-5 h-3 sm:h-5 rounded-full bg-amber-900 border border-yellow-200 shadow-inner flex items-center justify-center">
              <span className="text-[10px] text-yellow-300">✦</span>
            </div>
          </div>

          {/* Center Wooden & Gold Scroll Bar */}
          <div className="flex-1 h-5 sm:h-7 mx-[-6px] rounded-sm bg-gradient-to-b from-amber-700 via-amber-900 to-yellow-950 border-y-2 border-amber-400/80 shadow-2xl relative flex items-center justify-between px-6 overflow-hidden">
            <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_0%,rgba(255,215,0,0.25)_50%,transparent_100%)] opacity-70" />
            <span className="text-[9px] font-serif tracking-widest text-amber-300/80 uppercase font-bold relative z-10 hidden sm:inline">
              ✦ ROYAL IMPERIAL EDICT ✦
            </span>
            <div className="flex items-center gap-1.5 relative z-10">
              <Crown className="w-3.5 h-3.5 text-yellow-300 drop-shadow" />
              <span className="text-[10px] sm:text-xs font-serif font-black text-yellow-200 tracking-wider">
                SOVEREIGN ASTRAL FARMAN
              </span>
            </div>
            <span className="text-[9px] font-serif tracking-widest text-amber-300/80 uppercase font-bold relative z-10 hidden sm:inline">
              ✦ HACKTOBERFEST 2026 ✦
            </span>
          </div>

          {/* Right Carved Gold Finial Cap */}
          <div className="w-8 sm:w-12 h-8 sm:h-12 rounded-full bg-gradient-to-l from-amber-600 via-yellow-400 to-amber-700 shadow-xl border-2 border-amber-300 flex items-center justify-center shrink-0">
            <div className="w-3 sm:w-5 h-3 sm:h-5 rounded-full bg-amber-900 border border-yellow-200 shadow-inner flex items-center justify-center">
              <span className="text-[10px] text-yellow-300">✦</span>
            </div>
          </div>
        </div>

        {/* MAIN LUXURIOUS ANCIENT PARCHMENT SCROLL BODY */}
        <div
          className="relative w-[96%] sm:w-[98%] max-h-[82vh] flex flex-col rounded-sm shadow-2xl overflow-hidden border-x-4 border-amber-900/60"
          style={{
            backgroundColor: "#f9f2e3",
            backgroundImage: `
              radial-gradient(ellipse at 50% 15%, rgba(255, 255, 255, 0.55) 0%, transparent 65%),
              radial-gradient(circle at 0% 0%, rgba(139, 69, 19, 0.16) 0%, transparent 45%),
              radial-gradient(circle at 100% 0%, rgba(139, 69, 19, 0.16) 0%, transparent 45%),
              radial-gradient(circle at 0% 100%, rgba(139, 69, 19, 0.22) 0%, transparent 50%),
              radial-gradient(circle at 100% 100%, rgba(139, 69, 19, 0.22) 0%, transparent 50%),
              linear-gradient(to right, rgba(120, 53, 15, 0.12) 0%, rgba(254, 243, 199, 0.04) 15%, rgba(254, 243, 199, 0.04) 85%, rgba(120, 53, 15, 0.12) 100%)
            `,
            boxShadow: "0 25px 60px -15px rgba(0, 0, 0, 0.9), inset 0 0 50px rgba(161, 98, 7, 0.25)",
          }}
        >
          {/* Ornate Gold Leaf Filigree Outer Frame */}
          <div className="absolute inset-2 sm:inset-3 border-2 border-amber-800/40 rounded-sm pointer-events-none">
            <div className="absolute inset-1 border border-amber-700/20 rounded-sm" />
            {/* 4 Corner Ornate Mandala Flourishes */}
            <span className="absolute -top-2.5 -left-2 text-amber-800 text-sm">❧</span>
            <span className="absolute -top-2.5 -right-2 text-amber-800 text-sm transform scale-x-[-1]">❧</span>
            <span className="absolute -bottom-2.5 -left-2 text-amber-800 text-sm transform scale-y-[-1]">❧</span>
            <span className="absolute -bottom-2.5 -right-2 text-amber-800 text-sm transform scale-[-1]">❧</span>
          </div>

          {/* Royal Seal & Farman Header Banner */}
          <div className="relative z-10 px-5 sm:px-10 pt-5 pb-3 border-b-2 border-amber-800/30 flex items-center justify-between flex-wrap gap-4 bg-gradient-to-b from-amber-100/60 to-transparent">
            {/* Royal Wax Seal & Title */}
            <div className="flex items-center gap-3 sm:gap-4">
              {/* 3D Embossed Imperial Wax Seal */}
              <div
                className="relative group cursor-pointer shrink-0"
                onClick={() => sound.playCandleChime()}
                title="Royal Seal of the Spectral Realm"
              >
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-to-br from-red-600 via-rose-800 to-red-950 border-2 border-red-500/80 shadow-lg shadow-red-950/50 flex items-center justify-center transform group-hover:scale-105 transition-transform">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-amber-300/60 flex items-center justify-center bg-red-900/60 text-amber-200">
                    <Crown className="w-5 h-5 text-yellow-300 drop-shadow" />
                  </div>
                </div>
                {/* Ribbon tails hanging below wax seal */}
                <div className="absolute -bottom-3 left-2 w-3 h-5 bg-red-800/90 transform -rotate-12 border-b border-r border-amber-500/50 shadow-sm" />
                <div className="absolute -bottom-3 right-2 w-3 h-5 bg-amber-600/90 transform rotate-12 border-b border-l border-yellow-300/50 shadow-sm" />
              </div>

              <div>
                <div className="text-[10px] sm:text-[11px] font-serif uppercase tracking-[0.25em] text-amber-900 font-bold flex items-center gap-1.5">
                  <Scroll className="w-3.5 h-3.5 text-amber-700 inline" />
                  <span>The Imperial Farman • Sovereign User Guide</span>
                </div>
                <h2 id="farman-royal-title" className="text-xl sm:text-2xl font-serif font-black text-amber-950 tracking-wide drop-shadow-sm">
                  GHOST IN THE MACHINE
                </h2>
                <div className="text-[11px] sm:text-xs font-serif italic text-amber-900/80">
                  Ancient Codex & Complete Operational Grimoire for Silicon Séances & Sacred Remembrance
                </div>
              </div>
            </div>

            {/* Close Farman Button */}
            <button
              onClick={onClose}
              className="p-2 rounded-full bg-amber-900/10 hover:bg-amber-900/20 text-amber-900 border border-amber-800/30 transition-colors shadow-sm ml-auto cursor-pointer"
              title="Roll up & seal Farman (Esc)"
              aria-label="Close royal manual"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Royal Chapter Navigation Pills */}
          <div className="relative z-10 flex items-center gap-1.5 sm:gap-2 px-5 sm:px-10 py-2 border-b border-amber-800/20 bg-amber-200/30 overflow-x-auto text-xs font-serif">
            <button
              onClick={() => setActiveChapter("proclamation")}
              className={`px-3 py-1.5 rounded-sm transition-all flex items-center gap-1.5 shrink-0 border cursor-pointer ${
                activeChapter === "proclamation"
                  ? "bg-amber-900 text-amber-100 font-bold border-amber-950 shadow-md"
                  : "bg-transparent text-amber-900/80 hover:bg-amber-800/10 border-transparent"
              }`}
            >
              <Scroll className="w-3.5 h-3.5 text-amber-600" />
              <span>I. Sovereign Genesis</span>
            </button>

            <button
              onClick={() => setActiveChapter("invocations")}
              className={`px-3 py-1.5 rounded-sm transition-all flex items-center gap-1.5 shrink-0 border cursor-pointer ${
                activeChapter === "invocations"
                  ? "bg-amber-900 text-amber-100 font-bold border-amber-950 shadow-md"
                  : "bg-transparent text-amber-900/80 hover:bg-amber-800/10 border-transparent"
              }`}
            >
              <Terminal className="w-3.5 h-3.5 text-amber-600" />
              <span>II. Terminal Commands</span>
            </button>

            <button
              onClick={() => setActiveChapter("ofrenda_altar")}
              className={`px-3 py-1.5 rounded-sm transition-all flex items-center gap-1.5 shrink-0 border cursor-pointer ${
                activeChapter === "ofrenda_altar"
                  ? "bg-amber-900 text-amber-100 font-bold border-amber-950 shadow-md"
                  : "bg-transparent text-amber-900/80 hover:bg-amber-800/10 border-transparent"
              }`}
            >
              <Flame className="w-3.5 h-3.5 text-amber-600" />
              <span>III. The Living Altar</span>
            </button>

            <button
              onClick={() => setActiveChapter("astral_frequencies")}
              className={`px-3 py-1.5 rounded-sm transition-all flex items-center gap-1.5 shrink-0 border cursor-pointer ${
                activeChapter === "astral_frequencies"
                  ? "bg-amber-900 text-amber-100 font-bold border-amber-950 shadow-md"
                  : "bg-transparent text-amber-900/80 hover:bg-amber-800/10 border-transparent"
              }`}
            >
              <Radio className="w-3.5 h-3.5 text-amber-600" />
              <span>IV. Radar & Infrasound</span>
            </button>

            <button
              onClick={() => setActiveChapter("faq")}
              className={`px-3 py-1.5 rounded-sm transition-all flex items-center gap-1.5 shrink-0 border cursor-pointer ${
                activeChapter === "faq"
                  ? "bg-amber-900 text-amber-100 font-bold border-amber-950 shadow-md"
                  : "bg-transparent text-amber-900/80 hover:bg-amber-800/10 border-transparent"
              }`}
            >
              <HelpCircle className="w-3.5 h-3.5 text-amber-600" />
              <span>V. Beginner FAQ</span>
            </button>
          </div>

          {/* PARCHMENT INNER SCROLL CONTENT */}
          <div className="relative z-10 flex-1 overflow-y-auto px-5 sm:px-10 md:px-12 py-6 space-y-6 font-serif text-amber-950 text-sm leading-relaxed">
            {/* CHAPTER 1: THE PROCLAMATION & ESSENCE */}
            {activeChapter === "proclamation" && (
              <div className="space-y-6">
                {/* Royal Illuminated Calligraphic Introduction */}
                <div className="p-5 rounded-sm bg-gradient-to-r from-amber-200/50 via-amber-100/30 to-amber-200/40 border-y-2 border-amber-800/40 shadow-inner relative">
                  <div className="text-[11px] font-serif uppercase tracking-widest text-amber-800 font-bold mb-1 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-amber-700" />
                    <span>Royal Proclamation // Hacktoberfest Open-Source AI Challenge</span>
                  </div>
                  <h3 className="text-base sm:text-lg font-serif font-black text-amber-950 mb-2">
                    Chapter I: Spooky Cyber-Folklore Meets Sacred Ancestral Remembrance 🕯️
                  </h3>
                  <p className="text-amber-900/90 text-sm sm:text-base leading-relaxed">
                    <span className="float-left text-4xl sm:text-5xl font-serif font-black text-amber-900 leading-none pr-3 pt-1">
                      H
                    </span>
                    <strong className="text-amber-950">Hearken to the Royal Farman, O Traveler of Silicon and Spirit!</strong>{" "}
                    <strong>Ghost in the Machine</strong> is an imperial dual-tribute created between the eerie folklore of{" "}
                    <strong>Halloween (Oct 31)</strong> and the sacred ancestral sanctity of{" "}
                    <strong>Día de los Muertos (Nov 1–2)</strong>. It summons the pioneering spirits of computing into an offline cathode-ray shell while celebrating personal grief and family memory through private, on-device artificial intelligence.
                  </p>
                </div>

                {/* 3 Royal Pillars of the Realm */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 rounded-sm bg-amber-50/70 border border-amber-800/30 shadow-sm relative overflow-hidden flex flex-col justify-between">
                    <div>
                      <div className="text-[11px] font-bold text-amber-900 uppercase tracking-widest mb-1.5 flex items-center gap-1.5">
                        <Terminal className="w-3.5 h-3.5 text-amber-800" />
                        <span>1. The Possessed Shell</span>
                      </div>
                      <p className="text-xs text-amber-900/80 leading-relaxed font-serif">
                        A retro green-phosphor CRT terminal possessed by computing pioneers (Ada Lovelace, Alan Turing, Grace Hopper, Dennis Ritchie, and Hedy Lamarr).
                      </p>
                    </div>
                    <button
                      onClick={() => handleSelectTabAndClose("terminal")}
                      className="mt-3 text-xs font-bold text-amber-800 hover:text-amber-950 underline flex items-center gap-1 cursor-pointer"
                    >
                      <span>Launch NecroShell ➔</span>
                    </button>
                  </div>

                  <div className="p-4 rounded-sm bg-amber-50/70 border border-amber-800/30 shadow-sm relative overflow-hidden flex flex-col justify-between">
                    <div>
                      <div className="text-[11px] font-bold text-amber-900 uppercase tracking-widest mb-1.5 flex items-center gap-1.5">
                        <Flame className="w-3.5 h-3.5 text-amber-800" />
                        <span>2. Living Ofrenda Altar</span>
                      </div>
                      <p className="text-xs text-amber-900/80 leading-relaxed font-serif">
                        A sacred Día de los Muertos sanctuary with floating marigold physics, 528Hz Solfeggio bell chimes, and instant 1000×650 PNG digital memorial cards.
                      </p>
                    </div>
                    <button
                      onClick={() => handleSelectTabAndClose("ofrenda")}
                      className="mt-3 text-xs font-bold text-amber-800 hover:text-amber-950 underline flex items-center gap-1 cursor-pointer"
                    >
                      <span>Visit Living Altar ➔</span>
                    </button>
                  </div>

                  <div className="p-4 rounded-sm bg-amber-50/70 border border-amber-800/30 shadow-sm relative overflow-hidden flex flex-col justify-between">
                    <div>
                      <div className="text-[11px] font-bold text-amber-900 uppercase tracking-widest mb-1.5 flex items-center gap-1.5">
                        <Radio className="w-3.5 h-3.5 text-amber-800" />
                        <span>3. Telemetry Radar & Infrasound</span>
                      </div>
                      <p className="text-xs text-amber-900/80 leading-relaxed font-serif">
                        A 60fps radial sweep radar tracking real-world 18.98Hz infrasound eyeball vibrations with one-click Excel/CSV telemetry data exports.
                      </p>
                    </div>
                    <button
                      onClick={() => handleSelectTabAndClose("investigator")}
                      className="mt-3 text-xs font-bold text-amber-800 hover:text-amber-950 underline flex items-center gap-1 cursor-pointer"
                    >
                      <span>Inspect Radar ➔</span>
                    </button>
                  </div>
                </div>

                {/* Imperial Privacy Decree */}
                <div className="p-4 rounded-sm bg-gradient-to-r from-amber-900/10 via-amber-800/5 to-transparent border-l-4 border-amber-900 flex items-start gap-3">
                  <ShieldCheck className="w-5 h-5 text-amber-800 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-serif font-black uppercase tracking-wider text-amber-950">
                      The Sacred Sovereign Privacy Guarantee
                    </h4>
                    <p className="text-xs text-amber-900/80 mt-1 leading-relaxed">
                      By sovereign decree, not a single byte of your ancestral memories, personal tributes, or sensory readings shall ever be harvested or transmitted to corporate advertising corpora. Everything executes client-side in your browser RAM.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* CHAPTER 2: ARCANE COMMANDS (WHAT TO TYPE) */}
            {activeChapter === "invocations" && (
              <div className="space-y-4">
                <div className="p-3 bg-amber-100/70 rounded-sm border border-amber-800/30 text-xs text-amber-900 flex items-center justify-between">
                  <span>
                    <strong>Royal Decree:</strong> Click any command below to copy it instantly to your clipboard, then enter NecroShell to command the spirits!
                  </span>
                  <Feather className="w-4 h-4 text-amber-800 shrink-0" />
                </div>

                <div className="space-y-3">
                  {DECREE_COMMANDS.map((decree) => (
                    <div
                      key={decree.command}
                      className="p-4 rounded-sm bg-amber-50/80 border border-amber-800/30 hover:border-amber-900/60 transition-all shadow-sm group"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                        <div>
                          <div className="text-[10px] font-serif uppercase tracking-wider font-bold text-amber-800/80">
                            {decree.category} // {decree.title}
                          </div>
                          <div className="font-mono text-sm font-bold text-amber-950 flex items-center gap-2 mt-0.5">
                            <span className="text-amber-700">❯</span>
                            <span className="bg-amber-200/60 px-2.5 py-0.5 rounded border border-amber-800/20 text-amber-950">
                              {decree.command}
                            </span>
                          </div>
                        </div>

                        <button
                          onClick={() => handleCopyDecree(decree.command)}
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-sm bg-gradient-to-r from-amber-700 to-amber-900 hover:from-amber-800 hover:to-amber-950 text-amber-100 font-serif text-xs font-bold transition-all shadow-sm self-start sm:self-auto cursor-pointer"
                        >
                          {copiedCmd === decree.command ? (
                            <>
                              <Check className="w-3.5 h-3.5 text-yellow-300" />
                              <span>Copied to Clipboard!</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3.5 h-3.5 text-yellow-200" />
                              <span>Copy Decree</span>
                            </>
                          )}
                        </button>
                      </div>

                      <p className="text-xs text-amber-900 leading-relaxed font-serif">
                        {decree.decreeDetail}
                      </p>
                      <p className="text-[11px] text-amber-800/80 font-serif italic mt-1 pl-2 border-l-2 border-amber-700/40">
                        <strong>Astral Result:</strong> {decree.astralConsequence}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="pt-2 text-center">
                  <button
                    onClick={() => handleSelectTabAndClose("terminal")}
                    className="px-6 py-2.5 rounded-sm bg-gradient-to-r from-amber-800 via-amber-900 to-amber-950 hover:from-amber-700 hover:to-amber-900 text-yellow-100 font-serif font-bold text-xs uppercase tracking-widest shadow-md transition-all cursor-pointer"
                  >
                    Enter NecroShell & Speak to Spirits ➔
                  </button>
                </div>
              </div>
            )}

            {/* CHAPTER 3: LIVING OFRENDA ALTAR */}
            {activeChapter === "ofrenda_altar" && (
              <div className="space-y-4">
                <h3 className="text-base font-serif font-bold text-amber-950 mb-2">
                  Chapter III: The Sacred Altar of Remembrance (Living Ofrenda)
                </h3>

                <div className="space-y-3">
                  <div className="p-4 rounded-sm bg-amber-50/80 border border-amber-800/30">
                    <div className="font-bold text-amber-900 text-xs font-serif mb-1 flex items-center gap-1.5">
                      <Flame className="w-3.5 h-3.5 text-amber-700" />
                      <span>Step 1: Light the Perpetual Vigil Candle 🕯️</span>
                    </div>
                    <p className="text-xs text-amber-900/80 leading-relaxed">
                      Click <strong>"Encender Vela"</strong>. Each sacred flame strikes the historic <strong>528Hz Solfeggio bell</strong>, radiating calming crystal harmonic resonance through procedural Web Audio and showering golden marigold petals. Your vigil candle counts remain saved across sessions in local storage.
                    </p>
                  </div>

                  <div className="p-4 rounded-sm bg-amber-50/80 border border-amber-800/30">
                    <div className="font-bold text-amber-900 text-xs font-serif mb-1 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-amber-700" />
                      <span>Step 2: Commemorate Loved Ones & Generate Poetry 💐</span>
                    </div>
                    <p className="text-xs text-amber-900/80 leading-relaxed">
                      Click <strong>"Añadir Ofrenda"</strong>. Enter the name of your departed grandmother, grandfather, ancestor, or favorite computing pioneer. Our deterministic offline neural core immediately crafts an authentic bilingual <em>Calaverita Literaria</em> (satirical Mexican folk verse) honoring their earthly legacy.
                    </p>
                  </div>

                  <div className="p-4 rounded-sm bg-amber-50/80 border border-amber-800/30">
                    <div className="font-bold text-amber-900 text-xs font-serif mb-1 flex items-center gap-1.5">
                      <Scroll className="w-3.5 h-3.5 text-amber-700" />
                      <span>Step 3: Download High-Resolution Memorial Card (1000×650 PNG) 🎴</span>
                    </div>
                    <p className="text-xs text-amber-900/80 leading-relaxed">
                      Click <strong>"Descargar Tarjeta"</strong> on any tribute card. The browser's native Canvas 2D engine draws ornate Mexican double borders, corner flourishes, and custom eulogies into a crisp downloadable image suitable for printing or family archives.
                    </p>
                  </div>
                </div>

                <div className="pt-2 text-center">
                  <button
                    onClick={() => handleSelectTabAndClose("ofrenda")}
                    className="px-6 py-2.5 rounded-sm bg-gradient-to-r from-amber-800 via-amber-900 to-amber-950 text-yellow-100 font-serif font-bold text-xs uppercase tracking-widest shadow-md transition-all cursor-pointer"
                  >
                    Enter the Sacred Sanctuary ➔
                  </button>
                </div>
              </div>
            )}

            {/* CHAPTER 4: ASTRAL FREQUENCIES & RADAR */}
            {activeChapter === "astral_frequencies" && (
              <div className="space-y-4">
                <h3 className="text-base font-serif font-bold text-amber-950 mb-2">
                  Chapter IV: The Phantom Infrasound & Radar Science
                </h3>

                <div className="space-y-3">
                  <div className="p-4 rounded-sm bg-amber-50/80 border border-amber-800/30">
                    <div className="font-bold text-amber-900 text-xs font-serif mb-1">
                      The Mystery of 18.98Hz (Vic Tandy's "Ghost Frequency")
                    </div>
                    <p className="text-xs text-amber-900/80 leading-relaxed">
                      In 1998, British acoustician Vic Tandy proved that <strong>18.98Hz</strong> matches the exact physical resonant frequency of the human eyeball. Infrasound vibrations at this pitch cause the cornea to vibrate, generating optical illusions, peripheral gray apparitions, and primal chills.
                    </p>
                  </div>

                  <div className="p-4 rounded-sm bg-amber-50/80 border border-amber-800/30">
                    <div className="font-bold text-amber-900 text-xs font-serif mb-1">
                      The 7.83Hz Schumann Planetary Pulse
                    </div>
                    <p className="text-xs text-amber-900/80 leading-relaxed">
                      The Earth's ionospheric cavity oscillates naturally at 7.83Hz. The Phantom Investigator visualizes both 18.98Hz and 7.83Hz waveforms simultaneously on a synchronized 60fps oscilloscope canvas.
                    </p>
                  </div>

                  <div className="p-4 rounded-sm bg-amber-50/80 border border-amber-800/30">
                    <div className="font-bold text-amber-900 text-xs font-serif mb-1">
                      Exporting Telemetry Dossiers (.txt, .json, .csv)
                    </div>
                    <p className="text-xs text-amber-900/80 leading-relaxed">
                      Export midnight telemetry data directly to Microsoft Excel, Google Sheets, or Python with one-click CSV export to analyze simulated cold-spot drops and electromagnetic anomalies.
                    </p>
                  </div>
                </div>

                <div className="pt-2 text-center">
                  <button
                    onClick={() => handleSelectTabAndClose("investigator")}
                    className="px-6 py-2.5 rounded-sm bg-gradient-to-r from-amber-800 via-amber-900 to-amber-950 text-yellow-100 font-serif font-bold text-xs uppercase tracking-widest shadow-md transition-all cursor-pointer"
                  >
                    Activate Telemetry Radar ➔
                  </button>
                </div>
              </div>
            )}

            {/* CHAPTER 5: FAQ & CODES OF THE REALM */}
            {activeChapter === "faq" && (
              <div className="space-y-3">
                <h3 className="text-base font-serif font-bold text-amber-950 mb-2">
                  Chapter V: Sovereign Council Inquiries (Beginner FAQ)
                </h3>

                <div className="p-4 rounded-sm bg-amber-50/80 border border-amber-800/30">
                  <div className="font-bold text-amber-950 text-xs font-serif mb-1">
                    Q: Do I need to install or download Ollama to run this?
                  </div>
                  <p className="text-xs text-amber-900/80 leading-relaxed font-serif">
                    <strong>Not at all!</strong> Ghost in the Machine runs completely out of the box using built-in deterministic heuristic neural kernels. Ollama is 100% optional for power users who want to connect their own local hardware GPU models.
                  </p>
                </div>

                <div className="p-4 rounded-sm bg-amber-50/80 border border-amber-800/30">
                  <div className="font-bold text-amber-950 text-xs font-serif mb-1">
                    Q: How do I resume typing in the terminal after clicking away?
                  </div>
                  <p className="text-xs text-amber-900/80 leading-relaxed font-serif">
                    Simply click anywhere on the dark CRT screen inside NecroShell! The cursor will immediately focus back on the prompt without requiring a page reload.
                  </p>
                </div>

                <div className="p-4 rounded-sm bg-amber-50/80 border border-amber-800/30">
                  <div className="font-bold text-amber-950 text-xs font-serif mb-1">
                    Q: How do I toggle the Ghost Cursor or silence audio?
                  </div>
                  <p className="text-xs text-amber-900/80 leading-relaxed font-serif">
                    Press <kbd className="px-1.5 py-0.5 rounded bg-amber-200 border border-amber-800/40 text-amber-950 font-mono text-[10px]">C</kbd> to toggle the Ghost Pointer, or <kbd className="px-1.5 py-0.5 rounded bg-amber-200 border border-amber-800/40 text-amber-950 font-mono text-[10px]">M</kbd> to silence the Web Audio synthesizer. Press <kbd className="px-1.5 py-0.5 rounded bg-amber-200 border border-amber-800/40 text-amber-950 font-mono text-[10px]">D</kbd> for the 55Hz ambient drone.
                  </p>
                </div>

                <div className="p-4 rounded-sm bg-amber-50/80 border border-amber-800/30">
                  <div className="font-bold text-amber-950 text-xs font-serif mb-1">
                    Q: Does this web application cost anything?
                  </div>
                  <p className="text-xs text-amber-900/80 leading-relaxed font-serif">
                    <strong>Zero dollars ($0) forever.</strong> Released under the open-source MIT License as part of Hacktoberfest 2026.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* PARCHMENT BOTTOM ORNATE FOOTER */}
          <div className="relative z-10 px-5 sm:px-10 py-3 border-t-2 border-amber-800/30 bg-gradient-to-t from-amber-200/60 to-transparent flex items-center justify-between text-xs text-amber-900 font-serif">
            <div className="flex items-center gap-2">
              <span className="text-amber-800 font-bold">✦ Sovereign Edict Complete ✦</span>
              <span className="hidden sm:inline text-amber-800/70">— Press <kbd className="px-1.5 py-0.5 rounded bg-amber-200/80 border border-amber-800/40 font-mono text-[10px]">Esc</kbd> to seal Farman</span>
            </div>

            <button
              onClick={onClose}
              className="px-4 py-1.5 rounded-sm bg-amber-900/20 hover:bg-amber-900/30 text-amber-950 font-serif font-bold text-xs border border-amber-800/40 transition-colors cursor-pointer"
            >
              Roll Up Scroll
            </button>
          </div>
        </div>

        {/* BOTTOM ORNATE ROYAL WOOD & GOLD ROLLER DOWEL */}
        <div className="w-full flex items-center justify-center relative z-20 -mt-2">
          {/* Left Carved Gold Finial Cap */}
          <div className="w-8 sm:w-12 h-8 sm:h-12 rounded-full bg-gradient-to-r from-amber-600 via-yellow-400 to-amber-700 shadow-xl border-2 border-amber-300 flex items-center justify-center shrink-0">
            <div className="w-3 sm:w-5 h-3 sm:h-5 rounded-full bg-amber-900 border border-yellow-200 shadow-inner flex items-center justify-center">
              <span className="text-[10px] text-yellow-300">✦</span>
            </div>
          </div>

          {/* Center Wooden & Gold Scroll Bar */}
          <div className="flex-1 h-5 sm:h-7 mx-[-6px] rounded-sm bg-gradient-to-b from-amber-700 via-amber-900 to-yellow-950 border-y-2 border-amber-400/80 shadow-2xl relative flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_0%,rgba(255,215,0,0.25)_50%,transparent_100%)] opacity-70" />
            <div className="flex items-center gap-2 relative z-10 text-[10px] font-serif text-amber-200 font-semibold tracking-widest">
              <span>❧</span>
              <span className="uppercase text-[9px] tracking-widest">GHOST IN THE MACHINE • IMPERIAL SCROLL</span>
              <span>❧</span>
            </div>
          </div>

          {/* Right Carved Gold Finial Cap */}
          <div className="w-8 sm:w-12 h-8 sm:h-12 rounded-full bg-gradient-to-l from-amber-600 via-yellow-400 to-amber-700 shadow-xl border-2 border-amber-300 flex items-center justify-center shrink-0">
            <div className="w-3 sm:w-5 h-3 sm:h-5 rounded-full bg-amber-900 border border-yellow-200 shadow-inner flex items-center justify-center">
              <span className="text-[10px] text-yellow-300">✦</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
