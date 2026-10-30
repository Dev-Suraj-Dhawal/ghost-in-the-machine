import React, { useState, useEffect } from "react";
import { X, Sparkles, HelpCircle, MessageSquareQuote, ChevronUp } from "lucide-react";
import { AppTheme } from "@/App";
import { sound } from "@/lib/soundEngine";

interface GhostMascotProps {
  theme: AppTheme;
  onOpenGuide: () => void;
  onSwitchTab?: (tab: "terminal" | "ofrenda" | "investigator" | "manifesto") => void;
}

const GHOST_TIPS = [
  {
    text: "Boo! 👻 Type `seance hopper` in NecroShell to chat with the queen of compilers!",
    actionLabel: "Try NecroShell",
    tab: "terminal" as const,
  },
  {
    text: "Light a sacred candle in the Living Ofrenda to harmonize with 528Hz Solfeggio sound!",
    actionLabel: "Visit Altar",
    tab: "ofrenda" as const,
  },
  {
    text: "Did you spot the 18.98Hz infrasound spike? That's the real-world 'Ghost Frequency'!",
    actionLabel: "Scan Telemetry",
    tab: "investigator" as const,
  },
  {
    text: "Your memories stay 100% private in your browser. No corporate AI surveillance here!",
    actionLabel: "Read Manifesto",
    tab: "manifesto" as const,
  },
  {
    text: "Type `possessed` in the terminal to trigger a spooky CRT chromatic aberration glitch!",
    actionLabel: "Open Terminal",
    tab: "terminal" as const,
  },
  {
    text: "Press 'D' on your keyboard to toggle the 55Hz sub-bass ambient séance drone!",
    actionLabel: "View Shortcuts",
    tab: undefined,
  },
];

export default function GhostMascot({ theme, onOpenGuide, onSwitchTab }: GhostMascotProps) {
  const [isMinimized, setIsMinimized] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("ghost_mascot_minimized") === "true";
    }
    return false;
  });

  const [currentTipIndex, setCurrentTipIndex] = useState(0);
  const [isBlinking, setIsBlinking] = useState(false);
  const [isExcited, setIsExcited] = useState(false);
  const [floatingParticles, setFloatingParticles] = useState<{ id: number; x: number; y: number }[]>([]);

  // Theme palettes
  const colors = {
    cempasuchil: {
      primary: "from-amber-400 to-amber-600",
      accent: "text-amber-400",
      border: "border-amber-500/40",
      glow: "shadow-amber-500/30",
      bg: "bg-amber-950/80",
    },
    spectral: {
      primary: "from-emerald-400 to-emerald-600",
      accent: "text-emerald-400",
      border: "border-emerald-500/40",
      glow: "shadow-emerald-500/30",
      bg: "bg-emerald-950/80",
    },
    bloodmoon: {
      primary: "from-rose-400 to-rose-600",
      accent: "text-rose-400",
      border: "border-rose-500/40",
      glow: "shadow-rose-500/30",
      bg: "bg-rose-950/80",
    },
  }[theme];

  // Periodic blinking
  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setIsBlinking(true);
      setTimeout(() => setIsBlinking(false), 220);
    }, 4500 + Math.random() * 3000);

    return () => clearInterval(blinkInterval);
  }, []);

  // Periodic tip rotation
  useEffect(() => {
    const tipInterval = setInterval(() => {
      setCurrentTipIndex((prev) => (prev + 1) % GHOST_TIPS.length);
    }, 12000);

    return () => clearInterval(tipInterval);
  }, []);

  const handleToggleMinimize = () => {
    const next = !isMinimized;
    setIsMinimized(next);
    localStorage.setItem("ghost_mascot_minimized", String(next));
    try {
      sound.playKeyClick();
    } catch {
      // ignore
    }
  };

  const handleGhostClick = () => {
    setIsExcited(true);
    try {
      sound.playCandleChime();
    } catch {
      // ignore
    }

    // Spawn floating mini sparks
    const newParticles = Array.from({ length: 6 }, (_, i) => ({
      id: Date.now() + i,
      x: Math.random() * 60 - 30,
      y: -(Math.random() * 40 + 20),
    }));
    setFloatingParticles(newParticles);
    setTimeout(() => setFloatingParticles([]), 1200);

    // Cycle to next tip
    setCurrentTipIndex((prev) => (prev + 1) % GHOST_TIPS.length);
    setTimeout(() => setIsExcited(false), 600);
  };

  const activeTip = GHOST_TIPS[currentTipIndex];

  if (isMinimized) {
    return (
      <aside aria-label="Ghost companion" className="fixed bottom-5 right-5 z-40">
        <button
          onClick={handleToggleMinimize}
          className={`flex items-center gap-2 px-3 py-2 rounded-full ${colors.bg} border ${colors.border} backdrop-blur-md shadow-lg ${colors.glow} hover:scale-105 transition-all text-xs font-mono text-zinc-200 group`}
          title="Wake up Ghost Mascot"
          aria-label="Wake up Ghost Mascot"
        >
          <span className="text-base animate-bounce">👻</span>
          <span className="hidden sm:inline font-semibold">Summon Fantasma</span>
          <ChevronUp className="w-3.5 h-3.5 text-zinc-400 group-hover:translate-y-[-2px] transition-transform" />
        </button>
      </aside>
    );
  }

  return (
    <aside aria-label="Ghost companion" className="fixed bottom-5 right-5 z-40 flex flex-col items-end pointer-events-none select-none">
      {/* Floating particles from ghost click */}
      {floatingParticles.map((p) => (
        <span
          key={p.id}
          className="absolute text-xs pointer-events-none animate-ping text-amber-300"
          style={{
            transform: `translate(${p.x}px, ${p.y}px)`,
            bottom: "80px",
            right: "40px",
          }}
        >
          ✨
        </span>
      ))}

      {/* Interactive Speech Bubble */}
      <div className="pointer-events-auto max-w-[280px] sm:max-w-xs mb-3 p-3.5 rounded-2xl bg-zinc-900/95 border border-zinc-700/80 backdrop-blur-xl shadow-2xl text-xs font-sans text-zinc-200 relative animate-in fade-in slide-in-from-bottom-2 duration-300">
        {/* Close/Minimize button */}
        <button
          onClick={handleToggleMinimize}
          className="absolute top-2 right-2 p-1 text-zinc-400 hover:text-white rounded-lg hover:bg-zinc-800 transition-colors"
          title="Minimize mascot"
          aria-label="Minimize mascot"
        >
          <X className="w-3.5 h-3.5" />
        </button>

        {/* Tip Header */}
        <div className="flex items-center gap-1.5 mb-1.5 text-[10px] uppercase tracking-wider font-bold text-zinc-400">
          <MessageSquareQuote className="w-3 h-3 text-amber-400" />
          <span>Fantasma's Grimoire Tip</span>
        </div>

        {/* Tip Text */}
        <p className="text-zinc-200 leading-relaxed font-mono text-[11px] mb-3">
          {activeTip.text}
        </p>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 pt-1 border-t border-zinc-800 text-[10px]">
          {activeTip.tab && onSwitchTab && (
            <button
              onClick={() => onSwitchTab(activeTip.tab!)}
              className={`px-2.5 py-1 rounded-md bg-zinc-800 hover:bg-zinc-700 font-semibold ${colors.accent} border border-zinc-700 transition-colors`}
            >
              {activeTip.actionLabel}
            </button>
          )}

          <button
            onClick={onOpenGuide}
            className="flex items-center gap-1 px-2.5 py-1 rounded-md bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 font-semibold border border-amber-500/30 transition-colors ml-auto"
          >
            <HelpCircle className="w-3 h-3" />
            <span>Manual</span>
          </button>

          <button
            onClick={handleGhostClick}
            className="px-1.5 py-1 text-zinc-400 hover:text-zinc-200 transition-colors"
            title="Next tip"
            aria-label="Next tip"
          >
            ➔
          </button>
        </div>

        {/* Speech bubble pointer arrow */}
        <div className="absolute -bottom-2 right-8 w-4 h-4 bg-zinc-900 border-r border-b border-zinc-700/80 transform rotate-45" />
      </div>

      {/* Floating Animated Ghost Mascot */}
      <button
        type="button"
        onClick={handleGhostClick}
        aria-label="Interactive Halloween ghost mascot. Click for tips and chime."
        className={`pointer-events-auto cursor-pointer focus:outline-none transition-transform duration-300 relative group text-left ${
          isExcited ? "scale-115 -translate-y-4" : "hover:scale-105"
        }`}
        style={{
          animation: isExcited ? "none" : "floatGhost 3.8s ease-in-out infinite",
        }}
      >
        {/* Glow Aura */}
        <div
          className={`absolute inset-0 rounded-full blur-xl opacity-40 group-hover:opacity-75 transition-opacity ${
            theme === "cempasuchil"
              ? "bg-amber-500"
              : theme === "spectral"
              ? "bg-emerald-500"
              : "bg-rose-500"
          }`}
        />

        {/* Mascot SVG */}
        <svg
          width="68"
          height="76"
          viewBox="0 0 68 76"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="relative drop-shadow-xl"
        >
          {/* Ghost Body */}
          <path
            d="M34 8C19 8 8 19 8 34V60C8 64 12 66 15 63L21 57C23 55 26 55 28 57L33 62C34 63 36 63 37 62L42 57C44 55 47 55 49 57L55 63C58 66 62 64 62 60V34C62 19 51 8 34 8Z"
            fill="#f8fafc"
            stroke="#cbd5e1"
            strokeWidth="2.5"
            strokeLinejoin="round"
          />

          {/* Little Floating Ghost Arms */}
          <path
            d="M8 38C3 36 3 45 8 47"
            stroke="#cbd5e1"
            strokeWidth="2.5"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M62 38C67 36 67 45 62 47"
            stroke="#cbd5e1"
            strokeWidth="2.5"
            strokeLinecap="round"
            fill="none"
          />

          {/* Eyes (Blinking animation) */}
          {isBlinking ? (
            /* Closed eye arches */
            <g stroke="#0f172a" strokeWidth="2.5" strokeLinecap="round">
              <path d="M22 34C24 32 27 32 29 34" />
              <path d="M39 34C41 32 44 32 46 34" />
            </g>
          ) : (
            /* Open cute anime eyes */
            <g>
              <ellipse cx="25" cy="33" rx="4" ry="5.5" fill="#0f172a" />
              <circle cx="23.5" cy="31" r="1.8" fill="#ffffff" />
              <circle cx="26.5" cy="35" r="0.8" fill="#ffffff" />

              <ellipse cx="43" cy="33" rx="4" ry="5.5" fill="#0f172a" />
              <circle cx="41.5" cy="31" r="1.8" fill="#ffffff" />
              <circle cx="44.5" cy="35" r="0.8" fill="#ffffff" />
            </g>
          )}

          {/* Mouth */}
          {isExcited ? (
            /* Big excited open mouth */
            <ellipse cx="34" cy="44" rx="4" ry="5" fill="#e11d48" />
          ) : (
            /* Shy happy smile */
            <path
              d="M30 42C32 45 36 45 38 42"
              stroke="#0f172a"
              strokeWidth="2"
              strokeLinecap="round"
            />
          )}

          {/* Rosy Cheeks */}
          <ellipse cx="18" cy="39" rx="3.5" ry="2" fill="#fb7185" fillOpacity="0.75" />
          <ellipse cx="50" cy="39" rx="3.5" ry="2" fill="#fb7185" fillOpacity="0.75" />

          {/* Little Festive Witch/Calavera Hat */}
          <path
            d="M20 12L34 2L48 12H20Z"
            fill={theme === "cempasuchil" ? "#d97706" : theme === "spectral" ? "#047857" : "#be123c"}
            stroke="#ffffff"
            strokeWidth="1.2"
          />
          <ellipse
            cx="34"
            cy="12"
            rx="16"
            ry="3.5"
            fill={theme === "cempasuchil" ? "#b45309" : theme === "spectral" ? "#065f46" : "#9f1239"}
            stroke="#ffffff"
            strokeWidth="1.2"
          />
          {/* Hat Buckle / Marigold Flower */}
          <circle cx="34" cy="11" r="2.5" fill="#fde047" />
        </svg>

        {/* Ambient floating animation CSS inlined */}
        <style>{`
          @keyframes floatGhost {
            0%, 100% {
              transform: translateY(0px) rotate(0deg);
            }
            50% {
              transform: translateY(-9px) rotate(2deg);
            }
          }
        `}</style>
      </button>
    </aside>
  );
}

