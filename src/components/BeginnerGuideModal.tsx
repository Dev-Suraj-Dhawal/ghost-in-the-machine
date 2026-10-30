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
  hindiTitle: string;
  englishTitle: string;
  decreeDetail: string;
  astralConsequence: string;
}

const DECREE_COMMANDS: DecreeCommand[] = [
  {
    command: "help",
    hindiTitle: "सर्व विद्या प्रकटीकरण",
    englishTitle: "The Grimoire Codex",
    decreeDetail: "Unfurls the sacred inventory of all ethereal commands and forbidden terminal spells.",
    astralConsequence: "Illuminates terminal with 'seance', 'whisper', 'ofrenda', 'possessed', and 'cat'.",
  },
  {
    command: "seance ada",
    hindiTitle: "आदि-आचार्य आह्वान",
    englishTitle: "Summon Lady Lovelace",
    decreeDetail: "Invokes Lady Ada Lovelace (1815–1852), the world's foremost enchantress of numbers.",
    astralConsequence: "The CRT pulses with golden-green phosphor as Ada's spirit assumes command of the input bus.",
  },
  {
    command: "whisper Why did you invent the first algorithm?",
    hindiTitle: "गूढ़ संलाप",
    englishTitle: "Direct Spirit Inquiry",
    decreeDetail: "Communes directly with the awakened pioneer through our zero-leakage local neural core.",
    astralConsequence: "The machine whispers back historical computing lore in authentic first-person voice.",
  },
  {
    command: "cat hopper",
    hindiTitle: "अभिलेख दर्शन: ग्रेस हॉपर",
    englishTitle: "Read Moth Relic Dossier",
    decreeDetail: "Examines Rear Admiral Grace Hopper's archive and the historic 1947 moth trapped in Relay #70.",
    astralConsequence: "Prints the original compiler manifesto and hardware moth specimen logs.",
  },
  {
    command: "possessed",
    hindiTitle: "मायावी कंपन",
    englishTitle: "Paranormal State Rupture",
    decreeDetail: "Command the ghost machine to unleash a full CRT chromatic aberration and phantom static storm.",
    astralConsequence: "Triggers screen-tearing scanlines, sub-bass tremor, and procedural static audio bursts.",
  },
  {
    command: "ofrenda",
    hindiTitle: "पुण्य वेदी गमन",
    englishTitle: "Journey to Sacred Altar",
    decreeDetail: "Instantly teleports the station to the candlelit Día de los Muertos ancestral sanctuary.",
    astralConsequence: "Spawns drifting cempasúchil marigolds and chimes the sacred 528Hz bell.",
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
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-300 select-none"
      onClick={onClose}
    >
      {/* Outer Scroll Wrapper - Prevent click-through */}
      <div
        className="relative w-full max-w-4xl max-h-[94vh] flex flex-col items-center justify-center pointer-events-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* TOP ORNATE ROYAL WOOD & GOLD ROLLER DOWEL (शाही मूसल) */}
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
              ॥ श्री परमात्मने नमः ॥
            </span>
            <div className="flex items-center gap-1 relative z-10">
              <Crown className="w-3.5 h-3.5 text-yellow-300 drop-shadow" />
              <span className="text-[10px] font-serif font-bold text-yellow-200 tracking-wider">
                IMPERIAL ROYAL FARMAN
              </span>
            </div>
            <span className="text-[9px] font-serif tracking-widest text-amber-300/80 uppercase font-bold relative z-10 hidden sm:inline">
              ॥ सत्यमेव जयते ॥
            </span>
          </div>

          {/* Right Carved Gold Finial Cap */}
          <div className="w-8 sm:w-12 h-8 sm:h-12 rounded-full bg-gradient-to-l from-amber-600 via-yellow-400 to-amber-700 shadow-xl border-2 border-amber-300 flex items-center justify-center shrink-0">
            <div className="w-3 sm:w-5 h-3 sm:h-5 rounded-full bg-amber-900 border border-yellow-200 shadow-inner flex items-center justify-center">
              <span className="text-[10px] text-yellow-300">✦</span>
            </div>
          </div>
        </div>

        {/* MAIN LUXURIOUS ANCIENT PARCHMENT SCROLL BODY (शाही चर्मपत्र) */}
        <div
          className="relative w-[96%] sm:w-[98%] max-h-[80vh] flex flex-col rounded-sm shadow-2xl overflow-hidden border-x-4 border-amber-900/60"
          style={{
            backgroundColor: "#f9f2e3",
            backgroundImage: `
              radial-gradient(ellipse at 50% 20%, rgba(255, 255, 255, 0.5) 0%, transparent 70%),
              radial-gradient(circle at 0% 0%, rgba(139, 69, 19, 0.18) 0%, transparent 45%),
              radial-gradient(circle at 100% 0%, rgba(139, 69, 19, 0.18) 0%, transparent 45%),
              radial-gradient(circle at 0% 100%, rgba(139, 69, 19, 0.22) 0%, transparent 50%),
              radial-gradient(circle at 100% 100%, rgba(139, 69, 19, 0.22) 0%, transparent 50%),
              linear-gradient(to right, rgba(120, 53, 15, 0.12) 0%, rgba(254, 243, 199, 0.05) 15%, rgba(254, 243, 199, 0.05) 85%, rgba(120, 53, 15, 0.12) 100%)
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
          <div className="relative z-10 px-6 sm:px-10 pt-5 pb-3 border-b-2 border-amber-800/30 flex items-center justify-between flex-wrap gap-4 bg-gradient-to-b from-amber-100/60 to-transparent">
            {/* Royal Wax Seal & Title */}
            <div className="flex items-center gap-3 sm:gap-4">
              {/* 3D Embossed Imperial Wax Seal */}
              <div className="relative group cursor-pointer" onClick={() => sound.playCandleChime()}>
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-to-br from-red-600 via-rose-800 to-red-950 border-2 border-red-500/80 shadow-lg shadow-red-950/50 flex items-center justify-center transform group-hover:scale-105 transition-transform">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-amber-300/60 flex items-center justify-center bg-red-900/60 text-amber-200">
                    <span className="font-serif text-lg sm:text-xl font-extrabold drop-shadow">ॐ</span>
                  </div>
                </div>
                {/* Ribbon tails hanging below wax seal */}
                <div className="absolute -bottom-3 left-2 w-3 h-5 bg-red-800/90 transform -rotate-12 border-b border-r border-amber-500/50 shadow-sm" />
                <div className="absolute -bottom-3 right-2 w-3 h-5 bg-amber-600/90 transform rotate-12 border-b border-l border-yellow-300/50 shadow-sm" />
              </div>

              <div>
                <div className="text-[10px] sm:text-[11px] font-serif uppercase tracking-[0.25em] text-amber-900 font-bold flex items-center gap-1.5">
                  <Crown className="w-3.5 h-3.5 text-amber-700 inline" />
                  <span>शाही फ़रमान // The Royal Astral Decree</span>
                </div>
                <h2 id="farman-royal-title" className="text-lg sm:text-2xl font-serif font-black text-amber-950 tracking-wide drop-shadow-sm">
                  GHOST IN THE MACHINE
                </h2>
                <div className="text-[11px] sm:text-xs font-serif italic text-amber-900/80">
                  Ancient Codex & Beginner's Manual for the Possessed Shell & Sacred Sanctuary
                </div>
              </div>
            </div>

            {/* Close Farman Button (Royal Cross) */}
            <button
              onClick={onClose}
              className="p-2 rounded-full bg-amber-900/10 hover:bg-amber-900/20 text-amber-900 border border-amber-800/30 transition-colors shadow-sm ml-auto"
              title="Roll up & seal Farman (Esc)"
              aria-label="Close royal manual"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Ancient Sanskrit / Royal Navigation Tabs */}
          <div className="relative z-10 flex items-center gap-2 px-6 sm:px-10 py-2 border-b border-amber-800/20 bg-amber-200/30 overflow-x-auto text-xs font-serif">
            <button
              onClick={() => setActiveChapter("proclamation")}
              className={`px-3 py-1.5 rounded-sm transition-all flex items-center gap-1.5 shrink-0 border ${
                activeChapter === "proclamation"
                  ? "bg-amber-900 text-amber-100 font-bold border-amber-950 shadow-md"
                  : "bg-transparent text-amber-900/80 hover:bg-amber-800/10 border-transparent"
              }`}
            >
              <Scroll className="w-3.5 h-3.5 text-amber-600" />
              <span>I. शाही घोषणा (Genesis)</span>
            </button>

            <button
              onClick={() => setActiveChapter("invocations")}
              className={`px-3 py-1.5 rounded-sm transition-all flex items-center gap-1.5 shrink-0 border ${
                activeChapter === "invocations"
                  ? "bg-amber-900 text-amber-100 font-bold border-amber-950 shadow-md"
                  : "bg-transparent text-amber-900/80 hover:bg-amber-800/10 border-transparent"
              }`}
            >
              <Terminal className="w-3.5 h-3.5 text-amber-600" />
              <span>II. गुप्त मन्त्र (Commands)</span>
            </button>

            <button
              onClick={() => setActiveChapter("ofrenda_altar")}
              className={`px-3 py-1.5 rounded-sm transition-all flex items-center gap-1.5 shrink-0 border ${
                activeChapter === "ofrenda_altar"
                  ? "bg-amber-900 text-amber-100 font-bold border-amber-950 shadow-md"
                  : "bg-transparent text-amber-900/80 hover:bg-amber-800/10 border-transparent"
              }`}
            >
              <Flame className="w-3.5 h-3.5 text-amber-600" />
              <span>III. पुण्य वेदी (The Altar)</span>
            </button>

            <button
              onClick={() => setActiveChapter("astral_frequencies")}
              className={`px-3 py-1.5 rounded-sm transition-all flex items-center gap-1.5 shrink-0 border ${
                activeChapter === "astral_frequencies"
                  ? "bg-amber-900 text-amber-100 font-bold border-amber-950 shadow-md"
                  : "bg-transparent text-amber-900/80 hover:bg-amber-800/10 border-transparent"
              }`}
            >
              <Radio className="w-3.5 h-3.5 text-amber-600" />
              <span>IV. अलौकिक तरंगे (Radar & Waves)</span>
            </button>

            <button
              onClick={() => setActiveChapter("faq")}
              className={`px-3 py-1.5 rounded-sm transition-all flex items-center gap-1.5 shrink-0 border ${
                activeChapter === "faq"
                  ? "bg-amber-900 text-amber-100 font-bold border-amber-950 shadow-md"
                  : "bg-transparent text-amber-900/80 hover:bg-amber-800/10 border-transparent"
              }`}
            >
              <Crown className="w-3.5 h-3.5 text-amber-600" />
              <span>V. जिज्ञासा समाधान (FAQ)</span>
            </button>
          </div>

          {/* PARCHMENT INNER SCROLL CONTENT (Scrollable, Antique Calligraphic Style) */}
          <div className="relative z-10 flex-1 overflow-y-auto px-6 sm:px-12 py-6 space-y-6 font-serif text-amber-950 text-sm leading-relaxed">
            {/* CHAPTER 1: THE PROCLAMATION & ESSENCE */}
            {activeChapter === "proclamation" && (
              <div className="space-y-6">
                {/* Royal Illuminated Calligraphic Introduction */}
                <div className="p-5 rounded-sm bg-gradient-to-r from-amber-200/50 via-amber-100/30 to-amber-200/40 border-y-2 border-amber-800/40 shadow-inner relative">
                  <div className="absolute top-2 right-3 text-amber-800/40 text-xs font-serif italic">
                    राजाज्ञा संख्या: १०८ // Hacktoberfest २०२६
                  </div>
                  <h3 className="text-base sm:text-lg font-serif font-black text-amber-950 mb-2 flex items-center gap-2">
                    <span>👑 प्रथम अध्याय: अलौकिक शक्ति एवं पावन स्मरण 🕯️</span>
                  </h3>
                  <p className="text-amber-900/90 text-sm sm:text-base leading-relaxed">
                    <span className="float-left text-4xl sm:text-5xl font-serif font-black text-amber-900 leading-none pr-3 pt-1">
                      ह
                    </span>
                    <strong className="text-amber-950">Hearken to the Royal Farman, O Traveler of Silicon and Spirit!</strong>{" "}
                    <strong>Ghost in the Machine</strong> is an imperial dual-tribute forged between the eerie folklore of{" "}
                    <strong>Halloween (Oct 31)</strong> and the sacred ancestral sanctity of{" "}
                    <strong>Día de los Muertos (Nov 1–2)</strong>. It summons the pioneering spirits of computing into an offline CRT vessel while sanctifying personal grief through private, local open-source neural algorithms.
                  </p>
                </div>

                {/* 3 Royal Seals / Pillars of the Realm */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 rounded-sm bg-amber-50/70 border border-amber-800/30 shadow-sm relative overflow-hidden">
                    <div className="text-[11px] font-bold text-amber-900 uppercase tracking-widest mb-1 flex items-center gap-1.5">
                      <Terminal className="w-3.5 h-3.5 text-amber-800" />
                      <span>१. भूतिया टर्मिनल (NecroShell)</span>
                    </div>
                    <p className="text-xs text-amber-900/80 leading-relaxed font-serif">
                      A possessed green-phosphor cathode shell channeling Ada Lovelace, Turing, and Grace Hopper with procedural acoustic key-clicks.
                    </p>
                    <button
                      onClick={() => handleSelectTabAndClose("terminal")}
                      className="mt-3 text-xs font-bold text-amber-800 hover:text-amber-950 underline flex items-center gap-1"
                    >
                      <span>प्रवेश करें (Enter Terminal) ➔</span>
                    </button>
                  </div>

                  <div className="p-4 rounded-sm bg-amber-50/70 border border-amber-800/30 shadow-sm relative overflow-hidden">
                    <div className="text-[11px] font-bold text-amber-900 uppercase tracking-widest mb-1 flex items-center gap-1.5">
                      <Flame className="w-3.5 h-3.5 text-amber-800" />
                      <span>२. पावन वेदी (Living Ofrenda)</span>
                    </div>
                    <p className="text-xs text-amber-900/80 leading-relaxed font-serif">
                      A candlelit sanctuary with falling marigold petal physics, Solfeggio 528Hz chimes, and instant 1000×650 PNG memorial cards.
                    </p>
                    <button
                      onClick={() => handleSelectTabAndClose("ofrenda")}
                      className="mt-3 text-xs font-bold text-amber-800 hover:text-amber-950 underline flex items-center gap-1"
                    >
                      <span>दर्शन करें (Visit Altar) ➔</span>
                    </button>
                  </div>

                  <div className="p-4 rounded-sm bg-amber-50/70 border border-amber-800/30 shadow-sm relative overflow-hidden">
                    <div className="text-[11px] font-bold text-amber-900 uppercase tracking-widest mb-1 flex items-center gap-1.5">
                      <Radio className="w-3.5 h-3.5 text-amber-800" />
                      <span>३. अलौकिक रडार (Phantom Radar)</span>
                    </div>
                    <p className="text-xs text-amber-900/80 leading-relaxed font-serif">
                      A 60fps sweep radar tracking real-world 18.98Hz infrasound eyeball vibrations with one-click Excel/CSV telemetry export.
                    </p>
                    <button
                      onClick={() => handleSelectTabAndClose("investigator")}
                      className="mt-3 text-xs font-bold text-amber-800 hover:text-amber-950 underline flex items-center gap-1"
                    >
                      <span>निरीक्षण करें (Inspect Radar) ➔</span>
                    </button>
                  </div>
                </div>

                {/* Imperial Privacy Decree */}
                <div className="p-4 rounded-sm bg-gradient-to-r from-amber-900/10 via-amber-800/5 to-transparent border-l-4 border-amber-900 flex items-start gap-3">
                  <ShieldCheck className="w-5 h-5 text-amber-800 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-serif font-black uppercase tracking-wider text-amber-950">
                      शाही गोपनीयता घोषणा (The Sacred Sovereign Guarantee)
                    </h4>
                    <p className="text-xs text-amber-900/80 mt-1 leading-relaxed">
                      By sovereign decree, not a single byte of your ancestral memories, personal tributes, or sensory readings shall ever be harvested or transmitted to corporate advertising corpora. All data rests eternally in your browser RAM.
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
                    <strong>राजकीय निर्देश:</strong> Click any royal seal below to copy the exact spell, then enter NecroShell to command the spirits!
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
                          <div className="text-[11px] font-serif font-bold text-amber-800/90 tracking-wider">
                            {decree.hindiTitle} // {decree.englishTitle}
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
                              <span>नकल संपन्न (Copied!)</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3.5 h-3.5 text-yellow-200" />
                              <span>फ़रमान नकल करें (Copy)</span>
                            </>
                          )}
                        </button>
                      </div>

                      <p className="text-xs text-amber-900 leading-relaxed font-serif">
                        {decree.decreeDetail}
                      </p>
                      <p className="text-[11px] text-amber-800/80 font-serif italic mt-1 pl-2 border-l-2 border-amber-700/40">
                        <strong>प्रभाव (Result):</strong> {decree.astralConsequence}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="pt-2 text-center">
                  <button
                    onClick={() => handleSelectTabAndClose("terminal")}
                    className="px-6 py-2.5 rounded-sm bg-gradient-to-r from-amber-800 via-amber-900 to-amber-950 hover:from-amber-700 hover:to-amber-900 text-yellow-100 font-serif font-bold text-xs uppercase tracking-widest shadow-md transition-all cursor-pointer"
                  >
                    टर्मिनल में प्रवेश करें (Summon Now) ➔
                  </button>
                </div>
              </div>
            )}

            {/* CHAPTER 3: LIVING OFRENDA ALTAR */}
            {activeChapter === "ofrenda_altar" && (
              <div className="space-y-4">
                <h3 className="text-base font-serif font-bold text-amber-950 mb-2">
                  तृतीय अध्याय: पावन वेदी एवं पितृ-स्मरण अनुष्ठान
                </h3>

                <div className="space-y-3">
                  <div className="p-4 rounded-sm bg-amber-50/80 border border-amber-800/30">
                    <div className="font-bold text-amber-900 text-xs font-serif mb-1 flex items-center gap-1.5">
                      <Flame className="w-3.5 h-3.5 text-amber-700" />
                      <span>प्रथम चरण: पावन अखंड ज्योति (Lighting Vigil Candles)</span>
                    </div>
                    <p className="text-xs text-amber-900/80 leading-relaxed">
                      Press <strong>"Encender Vela"</strong>. Each sacred flame strikes the historic <strong>528Hz Solfeggio bell</strong>, sending healing crystal resonance through your speakers and scattering golden marigold confetti. Candles remain safely recorded in your browser's local memory.
                    </p>
                  </div>

                  <div className="p-4 rounded-sm bg-amber-50/80 border border-amber-800/30">
                    <div className="font-bold text-amber-900 text-xs font-serif mb-1 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-amber-700" />
                      <span>द्वितीय चरण: पितृ-तर्पण एवं काव्य रचना (Ancestral Memorials)</span>
                    </div>
                    <p className="text-xs text-amber-900/80 leading-relaxed">
                      Press <strong>"Añadir Ofrenda"</strong>. Inscribe your departed grandmother, grandfather, ancestor, or mentor. Our deterministic offline neural core immediately crafts an authentic <em>Calaverita Literaria</em> (satirical Mexican folk verse) honoring their earthly memory.
                    </p>
                  </div>

                  <div className="p-4 rounded-sm bg-amber-50/80 border border-amber-800/30">
                    <div className="font-bold text-amber-900 text-xs font-serif mb-1 flex items-center gap-1.5">
                      <Scroll className="w-3.5 h-3.5 text-amber-700" />
                      <span>तृतीय चरण: स्वर्ण पत्र डाउनलोड (1000×650 Memorial Card)</span>
                    </div>
                    <p className="text-xs text-amber-900/80 leading-relaxed">
                      Click <strong>"Descargar Tarjeta"</strong> on any tribute. The high-resolution canvas engine automatically paints intricate Mexican double borders and gold flourishes into a pristine PNG image suitable for framing, printing, or sharing with family.
                    </p>
                  </div>
                </div>

                <div className="pt-2 text-center">
                  <button
                    onClick={() => handleSelectTabAndClose("ofrenda")}
                    className="px-6 py-2.5 rounded-sm bg-gradient-to-r from-amber-800 via-amber-900 to-amber-950 text-yellow-100 font-serif font-bold text-xs uppercase tracking-widest shadow-md transition-all cursor-pointer"
                  >
                    पावन वेदी की ओर प्रस्थान करें (Enter Sanctuary) ➔
                  </button>
                </div>
              </div>
            )}

            {/* CHAPTER 4: ASTRAL FREQUENCIES & RADAR */}
            {activeChapter === "astral_frequencies" && (
              <div className="space-y-4">
                <h3 className="text-base font-serif font-bold text-amber-950 mb-2">
                  चतुर्थ अध्याय: अलौकिक तरंगे एवं रडार विज्ञान
                </h3>

                <div className="space-y-3">
                  <div className="p-4 rounded-sm bg-amber-50/80 border border-amber-800/30">
                    <div className="font-bold text-amber-900 text-xs font-serif mb-1">
                      १८.९८ हर्ट्ज़ का रहस्य (Vic Tandy's 18.98Hz Eyeball Resonance)
                    </div>
                    <p className="text-xs text-amber-900/80 leading-relaxed">
                      In 1998, British acoustician Vic Tandy discovered that <strong>18.98Hz</strong> is the exact physical resonant frequency of the human eyeball. When low-frequency infrasound waves hit this vibration, the cornea vibrates, creating peripheral apparitions, gray mist, and instinctual sensations of a ghost in the room!
                    </p>
                  </div>

                  <div className="p-4 rounded-sm bg-amber-50/80 border border-amber-800/30">
                    <div className="font-bold text-amber-900 text-xs font-serif mb-1">
                      शूमैन तरंग (7.83Hz Schumann Planetary Pulse)
                    </div>
                    <p className="text-xs text-amber-900/80 leading-relaxed">
                      The Earth's ionosphere pulses naturally at 7.83Hz. The Phantom Investigator plots both the 18.98Hz and 7.83Hz waveforms simultaneously on an oscilloscope at 60 frames per second.
                    </p>
                  </div>

                  <div className="p-4 rounded-sm bg-amber-50/80 border border-amber-800/30">
                    <div className="font-bold text-amber-900 text-xs font-serif mb-1">
                      अभिलेख संचयन (.txt, .json, .csv Exports)
                    </div>
                    <p className="text-xs text-amber-900/80 leading-relaxed">
                      Export midnight telemetry data directly to Excel/CSV with one click to perform real statistical research on simulated paranormal cold-spot plunges and electromagnetic spikes.
                    </p>
                  </div>
                </div>

                <div className="pt-2 text-center">
                  <button
                    onClick={() => handleSelectTabAndClose("investigator")}
                    className="px-6 py-2.5 rounded-sm bg-gradient-to-r from-amber-800 via-amber-900 to-amber-950 text-yellow-100 font-serif font-bold text-xs uppercase tracking-widest shadow-md transition-all cursor-pointer"
                  >
                    रडार चालू करें (Activate Radar) ➔
                  </button>
                </div>
              </div>
            )}

            {/* CHAPTER 5: FAQ & CODES OF THE REALM */}
            {activeChapter === "faq" && (
              <div className="space-y-3">
                <h3 className="text-base font-serif font-bold text-amber-950 mb-2">
                  पंचम अध्याय: शंका समाधान (Imperial Council Inquiries)
                </h3>

                <div className="p-4 rounded-sm bg-amber-50/80 border border-amber-800/30">
                  <div className="font-bold text-amber-950 text-xs font-serif mb-1">
                    प्रश्न: क्या मुझे ओलामा (Ollama) स्थापित करना आवश्यक है?
                  </div>
                  <p className="text-xs text-amber-900/80 leading-relaxed font-serif">
                    <strong>कदापि नहीं!</strong> Ghost in the Machine is 100% self-sufficient. It operates out of the box using built-in deterministic heuristic neural kernels. Ollama is purely an optional bridge for power users with local GPU setups.
                  </p>
                </div>

                <div className="p-4 rounded-sm bg-amber-50/80 border border-amber-800/30">
                  <div className="font-bold text-amber-950 text-xs font-serif mb-1">
                    प्रश्न: टर्मिनल में क्लिक करके लिखना कैसे पुनः प्रारंभ करें?
                  </div>
                  <p className="text-xs text-amber-900/80 leading-relaxed font-serif">
                    Simply click anywhere on the dark CRT glass of NecroShell! The cursor will immediately focus on the prompt without requiring a page reload.
                  </p>
                </div>

                <div className="p-4 rounded-sm bg-amber-50/80 border border-amber-800/30">
                  <div className="font-bold text-amber-950 text-xs font-serif mb-1">
                    प्रश्न: भूतिया कर्सर (Ghost Cursor) अथवा ध्वनि कैसे बंद करें?
                  </div>
                  <p className="text-xs text-amber-900/80 leading-relaxed font-serif">
                    Press <kbd className="px-1.5 py-0.5 rounded bg-amber-200 border border-amber-800/40 text-amber-950 font-mono text-[10px]">C</kbd> to toggle the Ghost Pointer, or <kbd className="px-1.5 py-0.5 rounded bg-amber-200 border border-amber-800/40 text-amber-950 font-mono text-[10px]">M</kbd> to silence the Web Audio synthesizer.
                  </p>
                </div>

                <div className="p-4 rounded-sm bg-amber-50/80 border border-amber-800/30">
                  <div className="font-bold text-amber-950 text-xs font-serif mb-1">
                    प्रश्न: क्या इस सेवा का कोई शुल्क है?
                  </div>
                  <p className="text-xs text-amber-900/80 leading-relaxed font-serif">
                    <strong>शून्य रुपया ($0) सदैव।</strong> Licensed under the permissive MIT Open-Source license for all humanity.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* PARCHMENT BOTTOM ORNATE FOOTER WITH IMPERIAL STAMP */}
          <div className="relative z-10 px-6 sm:px-10 py-3 border-t-2 border-amber-800/30 bg-gradient-to-t from-amber-200/60 to-transparent flex items-center justify-between text-xs text-amber-900 font-serif">
            <div className="flex items-center gap-2">
              <span className="text-amber-700 font-bold">॥ इति शुभम् ॥</span>
              <span className="hidden sm:inline text-amber-800/70">— Press <kbd className="px-1.5 py-0.5 rounded bg-amber-200/80 border border-amber-800/40 font-mono text-[10px]">Esc</kbd> to close Farman</span>
            </div>

            <button
              onClick={onClose}
              className="px-4 py-1.5 rounded-sm bg-amber-900/20 hover:bg-amber-900/30 text-amber-950 font-serif font-bold text-xs border border-amber-800/40 transition-colors cursor-pointer"
            >
              फ़रमान समेटें (Roll Up Scroll)
            </button>
          </div>
        </div>

        {/* BOTTOM ORNATE ROYAL WOOD & GOLD ROLLER DOWEL (शाही निचला मूसल) */}
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
              <span className="uppercase text-[9px]">GHOST IN THE MACHINE • IMPERIAL SCROLL</span>
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
