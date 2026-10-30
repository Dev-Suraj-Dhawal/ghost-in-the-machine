import React, { useState } from "react";
import {
  X,
  BookOpen,
  Terminal,
  Flame,
  Radio,
  Keyboard,
  Copy,
  Check,
  Sparkles,
  HelpCircle,
  ShieldCheck,
  Volume2,
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

type GuideSection = "quickstart" | "terminal_commands" | "ofrenda_altar" | "radar_sensor" | "faq";

interface CommandSnippet {
  command: string;
  purpose: string;
  exampleResponse: string;
}

const COMMAND_SNIPPETS: CommandSnippet[] = [
  {
    command: "help",
    purpose: "Displays the complete forbidden grimoire of terminal commands.",
    exampleResponse: "Reveals 'seance', 'whisper', 'cat', 'possessed', 'ofrenda', and 'ls'.",
  },
  {
    command: "seance ada",
    purpose: "Summons Ada Lovelace (the world's first computer programmer) to possess the shell.",
    exampleResponse: "The CRT flickers amber/green as Ada's spirit assumes control of stdin/stdout.",
  },
  {
    command: "whisper Why did you invent the first algorithm?",
    purpose: "Ask the summoned pioneer an existential or technical question via the offline neural engine.",
    exampleResponse: "Ada whispers: 'The Analytical Engine weaves algebraic patterns just as the Jacquard loom weaves flowers...'",
  },
  {
    command: "cat hopper",
    purpose: "Inspects the archival dossier of Rear Admiral Grace Hopper and the original 1947 moth bug.",
    exampleResponse: "Displays historical timestamps, moth specimen notes, and compiler manifesto.",
  },
  {
    command: "possessed",
    purpose: "Simulates an emergency paranormal kernel rupture with CRT scanlines & static glitch.",
    exampleResponse: "Screen distorts with chromatic aberration and procedural static sound.",
  },
  {
    command: "ofrenda",
    purpose: "Navigates directly to the sacred Día de los Muertos Living Altar.",
    exampleResponse: "Transitions seamlessly to candlelight sanctuary with floating marigold physics.",
  },
];

export default function BeginnerGuideModal({
  isOpen,
  onClose,
  theme,
  onSelectTab,
}: BeginnerGuideModalProps) {
  const [activeSection, setActiveSection] = useState<GuideSection>("quickstart");
  const [copiedCmd, setCopiedCmd] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleCopy = async (cmd: string) => {
    try {
      await navigator.clipboard.writeText(cmd);
      setCopiedCmd(cmd);
      sound.playKeyClick();
      setTimeout(() => setCopiedCmd(null), 2000);
    } catch {
      // ignore
    }
  };

  const colors = {
    cempasuchil: {
      accent: "text-amber-400",
      badge: "bg-amber-500/20 text-amber-300 border-amber-500/30",
      activeTab: "bg-amber-500 text-black font-semibold",
      glow: "border-amber-500/30",
    },
    spectral: {
      accent: "text-emerald-400",
      badge: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
      activeTab: "bg-emerald-500 text-black font-semibold",
      glow: "border-emerald-500/30",
    },
    bloodmoon: {
      accent: "text-rose-400",
      badge: "bg-rose-500/20 text-rose-300 border-rose-500/30",
      activeTab: "bg-rose-500 text-black font-semibold",
      glow: "border-rose-500/30",
    },
  }[theme];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="beginner-guide-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
    >
      <div className="relative w-full max-w-4xl max-h-[90vh] bg-zinc-950 border border-zinc-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col font-sans text-zinc-200">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-800/80 bg-zinc-900/60">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[10px] font-mono uppercase tracking-widest text-amber-400 font-bold">
                Apprentice Grimoire // User Guide
              </div>
              <h2 id="beginner-guide-title" className="text-lg font-bold text-white tracking-tight">
                Ghost in the Machine — Beginner's Manual
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-white transition-colors"
            title="Close Manual"
            aria-label="Close Manual"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Section Navigation Pills */}
        <div className="flex items-center gap-1.5 px-6 py-2.5 border-b border-zinc-800/60 bg-zinc-950/90 overflow-x-auto text-xs font-mono">
          <button
            onClick={() => setActiveSection("quickstart")}
            className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 shrink-0 ${
              activeSection === "quickstart"
                ? colors.activeTab
                : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900"
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>1. What is This?</span>
          </button>

          <button
            onClick={() => setActiveSection("terminal_commands")}
            className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 shrink-0 ${
              activeSection === "terminal_commands"
                ? colors.activeTab
                : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900"
            }`}
          >
            <Terminal className="w-3.5 h-3.5" />
            <span>2. Terminal Commands</span>
          </button>

          <button
            onClick={() => setActiveSection("ofrenda_altar")}
            className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 shrink-0 ${
              activeSection === "ofrenda_altar"
                ? colors.activeTab
                : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900"
            }`}
          >
            <Flame className="w-3.5 h-3.5" />
            <span>3. Living Ofrenda</span>
          </button>

          <button
            onClick={() => setActiveSection("radar_sensor")}
            className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 shrink-0 ${
              activeSection === "radar_sensor"
                ? colors.activeTab
                : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900"
            }`}
          >
            <Radio className="w-3.5 h-3.5" />
            <span>4. Radar & Telemetry</span>
          </button>

          <button
            onClick={() => setActiveSection("faq")}
            className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 shrink-0 ${
              activeSection === "faq"
                ? colors.activeTab
                : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900"
            }`}
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span>5. Beginner FAQ</span>
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 text-sm text-zinc-300">
          {/* SECTION 1: WHAT IS THIS? */}
          {activeSection === "quickstart" && (
            <div className="space-y-6">
              <div className="p-4 rounded-xl bg-gradient-to-r from-amber-500/10 via-zinc-900 to-transparent border border-amber-500/20">
                <h3 className="text-base font-bold text-white mb-2 flex items-center gap-2">
                  <span>🎃 Spooky Cyber-Folklore Meets Sacred Ancestral Remembrance 🕯️</span>
                </h3>
                <p className="text-zinc-300 text-xs sm:text-sm leading-relaxed">
                  <strong>Ghost in the Machine</strong> is an interactive web installation built for{" "}
                  <strong>Hacktoberfest Open-Source AI Challenge Week 4</strong>. Falling between{" "}
                  <strong>Halloween (Oct 31)</strong> and <strong>Día de los Muertos (Nov 1–2)</strong>, it lets you commune with the spirits of computing history, light candles for departed ancestors, and track simulated paranormal sensor spikes.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800">
                  <div className="flex items-center gap-2 font-bold text-amber-400 text-xs mb-2 uppercase tracking-wider">
                    <Terminal className="w-4 h-4" />
                    <span>The Possessed Shell</span>
                  </div>
                  <p className="text-xs text-zinc-400 leading-relaxed">
                    Type commands into a retro green-phosphor CRT terminal possessed by Ada Lovelace, Alan Turing, and Grace Hopper.
                  </p>
                  <button
                    onClick={() => {
                      onSelectTab("terminal");
                      onClose();
                    }}
                    className="mt-3 text-xs font-semibold text-amber-400 hover:underline flex items-center gap-1"
                  >
                    <span>Launch Terminal ➔</span>
                  </button>
                </div>

                <div className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800">
                  <div className="flex items-center gap-2 font-bold text-amber-400 text-xs mb-2 uppercase tracking-wider">
                    <Flame className="w-4 h-4" />
                    <span>Living Ofrenda</span>
                  </div>
                  <p className="text-xs text-zinc-400 leading-relaxed">
                    Light sacred candles, generate satirical Mexican *Calaverita* poems, and export high-resolution memorial cards.
                  </p>
                  <button
                    onClick={() => {
                      onSelectTab("ofrenda");
                      onClose();
                    }}
                    className="mt-3 text-xs font-semibold text-amber-400 hover:underline flex items-center gap-1"
                  >
                    <span>Visit Altar ➔</span>
                  </button>
                </div>

                <div className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800">
                  <div className="flex items-center gap-2 font-bold text-amber-400 text-xs mb-2 uppercase tracking-wider">
                    <Radio className="w-4 h-4" />
                    <span>Phantom Radar</span>
                  </div>
                  <p className="text-xs text-zinc-400 leading-relaxed">
                    Watch a 60fps sweep radar tracking real-world 18.98Hz infrasound waves and export IoT logs directly to Excel/CSV.
                  </p>
                  <button
                    onClick={() => {
                      onSelectTab("investigator");
                      onClose();
                    }}
                    className="mt-3 text-xs font-semibold text-amber-400 hover:underline flex items-center gap-1"
                  >
                    <span>Inspect Radar ➔</span>
                  </button>
                </div>
              </div>

              {/* Zero Surveillance Box */}
              <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-500/30 flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                    100% Client-Side Privacy Guarantee
                  </h4>
                  <p className="text-xs text-zinc-300 mt-1 leading-relaxed">
                    Zero bytes of your personal memories or tributes ever leave your computer. Everything runs locally in your browser memory via Web Audio procedural synthesis and client-side AI.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* SECTION 2: TERMINAL COMMANDS (WHAT TO TYPE) */}
          {activeSection === "terminal_commands" && (
            <div className="space-y-4">
              <div className="p-3 bg-zinc-900 rounded-xl border border-zinc-800 text-xs text-zinc-400">
                <span className="text-amber-400 font-bold font-mono">💡 Pro-Tip:</span> Click any command below to automatically copy it to your clipboard, then switch to the NecroShell tab to paste and execute it!
              </div>

              <div className="space-y-3">
                {COMMAND_SNIPPETS.map((snippet) => (
                  <div
                    key={snippet.command}
                    className="p-3.5 rounded-xl bg-zinc-900/70 border border-zinc-800 hover:border-zinc-700 transition-all"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                      <div className="flex items-center gap-2 font-mono">
                        <span className="text-zinc-500">$</span>
                        <code className="text-amber-400 font-bold text-xs bg-black/60 px-2.5 py-1 rounded-md border border-amber-500/20">
                          {snippet.command}
                        </code>
                      </div>

                      <button
                        onClick={() => handleCopy(snippet.command)}
                        className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-zinc-800 hover:bg-zinc-700 text-[11px] text-zinc-300 font-mono transition-colors self-start sm:self-auto"
                      >
                        {copiedCmd === snippet.command ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-400" />
                            <span className="text-emerald-400">Copied!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            <span>Copy Command</span>
                          </>
                        )}
                      </button>
                    </div>

                    <p className="text-xs text-zinc-300 mb-1.5">{snippet.purpose}</p>
                    <p className="text-[11px] text-zinc-500 font-mono italic">
                      Result: {snippet.exampleResponse}
                    </p>
                  </div>
                ))}
              </div>

              <div className="pt-2 text-center">
                <button
                  onClick={() => {
                    onSelectTab("terminal");
                    onClose();
                  }}
                  className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-semibold text-xs uppercase tracking-wider transition-all"
                >
                  Open NecroShell & Start Typing ➔
                </button>
              </div>
            </div>
          )}

          {/* SECTION 3: LIVING OFRENDA */}
          {activeSection === "ofrenda_altar" && (
            <div className="space-y-4">
              <h3 className="text-base font-bold text-white mb-2">
                How to Celebrate Día de los Muertos in the Altar
              </h3>

              <div className="space-y-3">
                <div className="p-3.5 rounded-xl bg-zinc-900 border border-zinc-800">
                  <div className="font-bold text-amber-400 text-xs mb-1 font-mono">
                    Step 1: Light a Vigil Candle 🕯️
                  </div>
                  <p className="text-xs text-zinc-300 leading-relaxed">
                    Click the glowing <strong>"Encender Vela"</strong> button. Each candle chime triggers a pure 528Hz Solfeggio sound wave and creates a burst of golden marigold petal confetti. Your candles are stored locally in your browser so they remain lit across sessions.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-zinc-900 border border-zinc-800">
                  <div className="font-bold text-amber-400 text-xs mb-1 font-mono">
                    Step 2: Add Your Own Ancestral Tribute 💐
                  </div>
                  <p className="text-xs text-zinc-300 leading-relaxed">
                    Click <strong>"Añadir Ofrenda"</strong>. Enter your departed loved one's name, relationship (e.g. Abuelita, Mentor, Pioneer), and favorite memory. Our local neural engine will compose a bilingual satirical *Calaverita Literaria* rhyme dedicated to them!
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-zinc-900 border border-zinc-800">
                  <div className="font-bold text-amber-400 text-xs mb-1 font-mono">
                    Step 3: Export Digital Memorial Card (1000×650 PNG) 🎴
                  </div>
                  <p className="text-xs text-zinc-300 leading-relaxed">
                    Click the <strong>"Descargar Tarjeta"</strong> button on any memorial card. The browser will draw an ornate Mexican double border, corner flourishes, and the tribute into a high-res image you can keep, print, or share.
                  </p>
                </div>
              </div>

              <div className="pt-2 text-center">
                <button
                  onClick={() => {
                    onSelectTab("ofrenda");
                    onClose();
                  }}
                  className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-semibold text-xs uppercase tracking-wider transition-all"
                >
                  Go to Living Ofrenda ➔
                </button>
              </div>
            </div>
          )}

          {/* SECTION 4: RADAR & SENSOR TELEMETRY */}
          {activeSection === "radar_sensor" && (
            <div className="space-y-4">
              <h3 className="text-base font-bold text-white mb-2">
                Understanding the Paranormal Radar & Oscilloscope
              </h3>

              <div className="space-y-3">
                <div className="p-3.5 rounded-xl bg-zinc-900 border border-zinc-800">
                  <div className="font-bold text-emerald-400 text-xs mb-1 font-mono">
                    What is the 18.98Hz Infrasound Wave?
                  </div>
                  <p className="text-xs text-zinc-300 leading-relaxed">
                    In 1998, acoustic researcher Vic Tandy discovered that 18.98Hz is the exact resonant frequency of the human eyeball. Exposure to this inaudible sound wave causes eye vibrations that manifest as gray apparitions and feelings of eerie dread in older buildings!
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-zinc-900 border border-zinc-800">
                  <div className="font-bold text-emerald-400 text-xs mb-1 font-mono">
                    Real-Time 60fps Radar Sweep
                  </div>
                  <p className="text-xs text-zinc-300 leading-relaxed">
                    The radar canvas samples simulated IoT sensors (motion sensors detecting movement at 0 lux, cold spot thermal drops of -4.2°C, and electromagnetic spikes).
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-zinc-900 border border-zinc-800">
                  <div className="font-bold text-emerald-400 text-xs mb-1 font-mono">
                    Exporting Sensor Dossiers (.txt, .json, .csv)
                  </div>
                  <p className="text-xs text-zinc-300 leading-relaxed">
                    Click the <strong>CSV</strong> button to download tabular sensor records you can open in Microsoft Excel, Google Sheets, or Python for data science analysis!
                  </p>
                </div>
              </div>

              <div className="pt-2 text-center">
                <button
                  onClick={() => {
                    onSelectTab("investigator");
                    onClose();
                  }}
                  className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-semibold text-xs uppercase tracking-wider transition-all"
                >
                  Open Radar Investigator ➔
                </button>
              </div>
            </div>
          )}

          {/* SECTION 5: FAQ */}
          {activeSection === "faq" && (
            <div className="space-y-3">
              <div className="p-3.5 rounded-xl bg-zinc-900 border border-zinc-800">
                <div className="font-bold text-white text-xs mb-1">
                  Q: Do I need to install or download Ollama?
                </div>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  <strong>No!</strong> Ghost in the Machine runs completely out of the box using our built-in offline neural heuristics engine. Ollama is 100% optional for power users who want to connect their own local GPU weights.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-zinc-900 border border-zinc-800">
                <div className="font-bold text-white text-xs mb-1">
                  Q: How do I turn the Ghost Cursor or Sounds on/off?
                </div>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Use the top navigation bar: click the <strong>👻 Cursor</strong> button to toggle the ghost pointer, click the <strong>🔊 Volume</strong> icon to mute, or press <kbd className="px-1.5 py-0.5 rounded bg-zinc-800 text-amber-400 font-mono">M</kbd> on your keyboard.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-zinc-900 border border-zinc-800">
                <div className="font-bold text-white text-xs mb-1">
                  Q: Are there keyboard shortcuts?
                </div>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Yes! Press <kbd className="px-1.5 py-0.5 rounded bg-zinc-800 text-amber-400 font-mono">1</kbd> to <kbd className="px-1.5 py-0.5 rounded bg-zinc-800 text-amber-400 font-mono">4</kbd> to jump between tabs, <kbd className="px-1.5 py-0.5 rounded bg-zinc-800 text-amber-400 font-mono">D</kbd> for the 55Hz drone, and <kbd className="px-1.5 py-0.5 rounded bg-zinc-800 text-amber-400 font-mono">?</kbd> for shortcuts.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-zinc-900 border border-zinc-800">
                <div className="font-bold text-white text-xs mb-1">
                  Q: Does this cost anything?
                </div>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  <strong>Zero dollars ($0) forever.</strong> Free and open-source under the MIT License as part of Hacktoberfest 2026.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3.5 border-t border-zinc-800/80 bg-zinc-900/60 flex items-center justify-between text-xs text-zinc-500">
          <div className="flex items-center gap-2">
            <span>Press <kbd className="px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-400 font-mono">Esc</kbd> to exit manual</span>
          </div>

          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 font-semibold text-xs transition-colors"
          >
            Close Manual
          </button>
        </div>
      </div>
    </div>
  );
}

