"use client";

import React, { useState, useRef, useEffect } from "react";
import { Terminal, Skull, Sparkles, Volume2, VolumeX, Flame, Zap, HelpCircle } from "lucide-react";
import { parsePossessedCommand, summonSpiritWhisper, DEPARTED_PIONEERS } from "@/lib/aiEngine";
import { TerminalHistoryItem, AIInferenceConfig } from "@/lib/types";
import { sound } from "@/lib/soundEngine";

interface NecroShellProps {
  onNavigateToOfrenda?: () => void;
  onNavigateToInvestigator?: () => void;
  aiConfig: AIInferenceConfig;
}

export default function NecroShell({ onNavigateToOfrenda, onNavigateToInvestigator, aiConfig }: NecroShellProps) {
  const [history, setHistory] = useState<TerminalHistoryItem[]>([
    {
      id: "init-1",
      command: "boot",
      output:
        "NECROSHELL v3.13 [Kernel: 6.6.6-spectral]\n" +
        "Connecting to silicon afterlife bus... [OK]\n" +
        "Calibrating ectoplasmic registers... [100%]\n" +
        "GHOST IN THE MACHINE INITIALIZED.\n" +
        "Type 'help' to inspect forbidden commands, or 'seance <name>' to awaken departed computing souls.\n" +
        "Click anywhere in this window at any time to resume typing.",
      type: "system",
      timestamp: new Date().toLocaleTimeString(),
    },
  ]);

  const [inputVal, setInputVal] = useState("");
  const [cmdHistory, setCmdHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isPossessedGlitch, setIsPossessedGlitch] = useState(false);
  const [isMuted, setIsMuted] = useState(sound.getMuted());
  const [presenceScore, setPresenceScore] = useState(67);
  const [isFocused, setIsFocused] = useState(true);

  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus terminal input reliably
  const focusTerminal = () => {
    if (inputRef.current) {
      inputRef.current.focus();
      setIsFocused(true);
    }
  };

  // Keep input focused and scroll to bottom
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history, isProcessing]);

  // Refocus on mount and on window focus
  useEffect(() => {
    focusTerminal();
    const handleWindowFocus = () => focusTerminal();
    window.addEventListener("focus", handleWindowFocus);
    return () => window.removeEventListener("focus", handleWindowFocus);
  }, []);

  const handleToggleSound = () => {
    const next = !isMuted;
    setIsMuted(next);
    sound.setMuted(next);
    if (!next) {
      sound.playCandleChime();
    }
    focusTerminal();
  };

  const executeCommand = async (rawCmd: string) => {
    const cmd = rawCmd.trim();
    if (!cmd) return;

    sound.playKeyClick();
    setCmdHistory((prev) => [...prev, cmd]);
    setHistoryIndex(-1);

    const userEntry: TerminalHistoryItem = {
      id: "cmd-" + Date.now(),
      command: cmd,
      output: "",
      type: "user",
      timestamp: new Date().toLocaleTimeString(),
    };

    setHistory((prev) => [...prev, userEntry]);
    setInputVal("");
    setIsProcessing(true);

    const parts = cmd.split(" ");
    const action = parts[0]?.toLowerCase();

    // Check custom commands
    if (action === "ofrenda") {
      sound.playCandleChime();
      setIsProcessing(false);
      if (onNavigateToOfrenda) {
        onNavigateToOfrenda();
      }
      return;
    }

    if (action === "investigate") {
      sound.playSpectralTone(220, 0.5);
      setIsProcessing(false);
      if (onNavigateToInvestigator) {
        onNavigateToInvestigator();
      }
      return;
    }

    if (action === "possessed") {
      setIsPossessedGlitch(true);
      sound.playGlitchBuzz();
      sound.playSpectralTone(110, 2);
      setPresenceScore((prev) => Math.min(100, prev + 25));
      setTimeout(() => setIsPossessedGlitch(false), 2400);

      const parsed = parsePossessedCommand("possessed");
      setHistory((prev) => [
        ...prev,
        {
          id: "resp-" + Date.now(),
          command: cmd,
          output: parsed.output,
          type: "spectral",
          timestamp: new Date().toLocaleTimeString(),
        },
      ]);
      setIsProcessing(false);
      setTimeout(focusTerminal, 60);
      return;
    }

    if (action === "seance" || action === "whisper") {
      sound.playSpectralTone(330, 0.4);
      setPresenceScore((prev) => Math.min(100, prev + 15));

      const spiritName = action === "seance" ? parts[1] || "Ada Lovelace" : "The Ghost in the Machine";
      const userQuery = action === "seance" ? parts.slice(2).join(" ") || "Speak to me from beyond the silicon" : parts.slice(1).join(" ") || "Who dwells inside this terminal?";

      try {
        const whisper = await summonSpiritWhisper(spiritName, userQuery, aiConfig);
        setHistory((prev) => [
          ...prev,
          {
            id: "resp-" + Date.now(),
            command: cmd,
            output: whisper,
            type: "spectral",
            timestamp: new Date().toLocaleTimeString(),
          },
        ]);
      } catch {
        setHistory((prev) => [
          ...prev,
          {
            id: "err-" + Date.now(),
            command: cmd,
            output: "[SYSTEM CORRUPTION]: The astral gateway flickered. The spirit retreated into shadow.",
            type: "error",
            timestamp: new Date().toLocaleTimeString(),
          },
        ]);
      }
      setIsProcessing(false);
      setTimeout(focusTerminal, 60);
      return;
    }

    // Standard possessed command parser
    const parsed = parsePossessedCommand(cmd);
    if (parsed.output === "__CLEAR__") {
      setHistory([]);
      setIsProcessing(false);
      setTimeout(focusTerminal, 60);
      return;
    }

    if (parsed.type === "spectral") {
      sound.playSpectralTone(280, 0.3);
    }

    setHistory((prev) => [
      ...prev,
      {
        id: "resp-" + Date.now(),
        command: cmd,
        output: parsed.output,
        type: parsed.type,
        timestamp: new Date().toLocaleTimeString(),
      },
    ]);
    setIsProcessing(false);
    setTimeout(focusTerminal, 60);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    sound.playKeyClick();

    if (e.key === "Enter") {
      e.preventDefault();
      executeCommand(inputVal);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (cmdHistory.length === 0) return;
      const nextIdx = historyIndex === -1 ? cmdHistory.length - 1 : Math.max(0, historyIndex - 1);
      setHistoryIndex(nextIdx);
      setInputVal(cmdHistory[nextIdx]);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex === -1) return;
      const nextIdx = historyIndex + 1;
      if (nextIdx >= cmdHistory.length) {
        setHistoryIndex(-1);
        setInputVal("");
      } else {
        setHistoryIndex(nextIdx);
        setInputVal(cmdHistory[nextIdx]);
      }
    }
  };

  return (
    <div
      onClick={focusTerminal}
      className="relative w-full max-w-5xl mx-auto rounded-xl border border-zinc-800 bg-zinc-950/90 shadow-2xl overflow-hidden backdrop-blur-md cursor-text"
    >
      {/* Possessed Glitch Overlay */}
      {isPossessedGlitch && (
        <div className="absolute inset-0 bg-red-600/20 mix-blend-color-dodge z-30 pointer-events-none animate-pulse">
          <div className="w-full h-full flex items-center justify-center">
            <span className="font-mono text-4xl text-red-400 font-extrabold tracking-widest uppercase opacity-75">
              ⚠ PHANTOM CORRUPTION ⚠
            </span>
          </div>
        </div>
      )}

      {/* Terminal Title Bar */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-zinc-800/80 bg-zinc-900/80 select-none">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500/80 border border-red-400/50" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/80 border border-yellow-400/50" />
          <div className="w-3 h-3 rounded-full bg-emerald-500/80 border border-emerald-400/50" />
          <span className="ml-2 font-mono text-xs text-zinc-400 font-semibold tracking-wider flex items-center gap-1.5">
            <Terminal className="w-3.5 h-3.5 text-emerald-400" />
            NECROSHELL v3.13 // SOUL_TTY0
          </span>
          {isFocused ? (
            <span className="ml-2 px-1.5 py-0.5 rounded text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
              READY TO COMMUNE
            </span>
          ) : (
            <span className="ml-2 px-1.5 py-0.5 rounded text-[10px] bg-amber-500/10 text-amber-400 border border-amber-500/30 animate-pulse">
              CLICK TO FOCUS
            </span>
          )}
        </div>

        {/* Telemetry & Controls */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 text-xs font-mono text-zinc-400">
            <Skull className="w-3.5 h-3.5 text-purple-400" />
            <span className="hidden sm:inline">Spectral Sync:</span>
            <span className="text-emerald-400 font-bold">{presenceScore}%</span>
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              handleToggleSound();
            }}
            aria-label="Toggle Sound"
            className="p-1.5 rounded-lg border border-zinc-700/60 hover:bg-zinc-800 text-zinc-300 transition-colors cursor-pointer"
            title={isMuted ? "Unmute Procedural Audio" : "Mute Procedural Audio"}
          >
            {isMuted ? <VolumeX className="w-3.5 h-3.5 text-zinc-500" /> : <Volume2 className="w-3.5 h-3.5 text-amber-400" />}
          </button>
        </div>
      </div>

      {/* CRT Screen Frame */}
      <div
        className="relative p-4 sm:p-6 min-h-[460px] max-h-[580px] overflow-y-auto font-mono text-sm crt-screen bg-[#060809] cursor-text"
        onClick={focusTerminal}
      >
        {/* Dedicated Scanline CRT Overlay (pointer-events-none so mouse clicks cleanly pass through to input) */}
        <div className="absolute inset-0 pointer-events-none crt-overlay z-10" />

        {/* Terminal History */}
        <div className="relative z-20 space-y-3">
          {history.map((item) => (
            <div key={item.id} className="leading-relaxed">
              {item.type === "user" && (
                <div className="flex items-center gap-2 text-zinc-300 font-medium">
                  <span className="text-emerald-400 select-none">necromancer@haunt:~$</span>
                  <span className="text-white font-mono">{item.command}</span>
                </div>
              )}

              {item.type === "system" && (
                <pre className="text-emerald-400/90 whitespace-pre-wrap font-mono text-xs sm:text-sm pl-2 border-l border-emerald-500/30">
                  {item.output}
                </pre>
              )}

              {item.type === "spectral" && (
                <div className="p-3 my-1.5 rounded-lg bg-emerald-950/20 border border-emerald-500/30 text-emerald-300 text-phosphor-emerald">
                  <div className="flex items-center gap-1.5 text-xs text-amber-400/80 mb-1 select-none">
                    <Sparkles className="w-3 h-3" />
                    <span>ASTRALLINK ECHO [{item.timestamp}]</span>
                  </div>
                  <pre className="whitespace-pre-wrap font-mono text-xs sm:text-sm">{item.output}</pre>
                </div>
              )}

              {item.type === "error" && (
                <div className="text-red-400 text-phosphor-blood font-mono text-xs sm:text-sm pl-2 border-l border-red-500/50">
                  {item.output}
                </div>
              )}
            </div>
          ))}

          {isProcessing && (
            <div className="flex items-center gap-2 text-amber-400 text-xs sm:text-sm animate-pulse">
              <Sparkles className="w-3.5 h-3.5 animate-spin" />
              <span>Channelling through neural ether...</span>
            </div>
          )}

          <div ref={bottomRef} />
        </div>

        {/* Command Input Prompt (High Z-Index so user can always click directly to type) */}
        <div
          className="relative z-20 flex items-center gap-2 mt-4 pt-2 border-t border-zinc-800/60 cursor-text"
          onClick={focusTerminal}
        >
          <span className="text-emerald-400 font-mono text-sm select-none shrink-0">necromancer@haunt:~$</span>
          <input
            ref={inputRef}
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            onKeyDown={handleKeyDown}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder="Type 'help', 'seance ada', 'whoami', 'possessed'..."
            disabled={isProcessing}
            className="w-full bg-transparent text-emerald-200 outline-none font-mono text-sm placeholder:text-zinc-600 focus:ring-0 cursor-text select-text"
            autoFocus
          />
        </div>
      </div>

      {/* Quick Action Grimoire Bar */}
      <div className="relative z-20 px-4 py-3 bg-zinc-900/90 border-t border-zinc-800 text-xs flex flex-wrap items-center gap-2 select-none">
        <span className="text-zinc-500 font-mono flex items-center gap-1">
          <HelpCircle className="w-3 h-3 text-zinc-400" /> Quick Spells:
        </span>

        {DEPARTED_PIONEERS.slice(0, 4).map((pioneer) => (
          <button
            key={pioneer.id}
            onClick={(e) => {
              e.stopPropagation();
              executeCommand(`seance ${pioneer.name.split(" ")[0].toLowerCase()}`);
            }}
            className="px-2.5 py-1 rounded-md bg-zinc-800/80 hover:bg-emerald-950/60 border border-zinc-700/60 hover:border-emerald-500/50 text-zinc-300 hover:text-emerald-300 font-mono transition-all text-xs flex items-center gap-1 cursor-pointer"
          >
            <Sparkles className="w-2.5 h-2.5 text-amber-400" />
            Séance: {pioneer.name.split(" ")[0]}
          </button>
        ))}

        <button
          onClick={(e) => {
            e.stopPropagation();
            executeCommand("possessed");
          }}
          className="px-2.5 py-1 rounded-md bg-red-950/40 hover:bg-red-900/60 border border-red-700/50 text-red-300 font-mono transition-all text-xs flex items-center gap-1 cursor-pointer"
        >
          <Zap className="w-2.5 h-2.5 text-red-400" />
          Possess Terminal
        </button>

        {onNavigateToOfrenda && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onNavigateToOfrenda();
            }}
            className="px-2.5 py-1 rounded-md bg-amber-950/40 hover:bg-amber-900/60 border border-amber-600/50 text-amber-300 font-mono transition-all text-xs flex items-center gap-1 ml-auto cursor-pointer"
          >
            <Flame className="w-2.5 h-2.5 text-amber-400" />
            Altar de Recuerdos →
          </button>
        )}
      </div>
    </div>
  );
}
