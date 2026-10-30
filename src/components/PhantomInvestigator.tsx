"use client";

import React, { useState } from "react";
import { Radio, AlertTriangle, ShieldCheck, Cpu, Eye, ThermometerSnowflake, FileText, Download, Sparkles, RefreshCw } from "lucide-react";
import { SensorLogEntry, AIInferenceConfig } from "@/lib/types";
import { weaveParanormalInvestigation } from "@/lib/aiEngine";
import { sound } from "@/lib/soundEngine";

interface PhantomInvestigatorProps {
  aiConfig: AIInferenceConfig;
}

const INITIAL_LOGS: SensorLogEntry[] = [
  {
    id: "log-1",
    timestamp: "02:14:08 AM",
    device: "Hallway Dual-LiDAR",
    location: "Upstairs Corridor",
    eventType: "motion",
    reading: "Humanoid displacement detected. Ambient lux: 0.0. Floor pressure sensor: 0 kg.",
    anomalyScore: 8,
  },
  {
    id: "log-2",
    timestamp: "03:17:42 AM",
    device: "Living Room Zigbee Thermostat",
    location: "Main Hearth",
    eventType: "thermal",
    reading: "Thermal plunge: 21.5°C down to 9.2°C in 3.8 seconds. HVAC damper unengaged.",
    anomalyScore: 9,
  },
  {
    id: "log-3",
    timestamp: "03:33:00 AM",
    device: "Home Assistant Server Node",
    location: "Basement Rack",
    eventType: "electromagnetic",
    reading: "CPU core 0 load locked at 66.6%. Socket bound to /dev/soul0 (PID: PHANTOM_DAEMON).",
    anomalyScore: 10,
  },
  {
    id: "log-4",
    timestamp: "04:02:19 AM",
    device: "Smart Acoustic Gateway",
    location: "Study Room",
    eventType: "audio",
    reading: "Sub-audible hum at 18.98 Hz (eyeball resonance). Inverted harmonic whispered in Latin.",
    anomalyScore: 8,
  },
];

export default function PhantomInvestigator({ aiConfig }: PhantomInvestigatorProps) {
  const [logs, setLogs] = useState<SensorLogEntry[]>(INITIAL_LOGS);
  const [dossierReport, setDossierReport] = useState<string>("");
  const [isWeaving, setIsWeaving] = useState(false);

  // New log form state
  const [newDevice, setNewDevice] = useState("");
  const [newLocation, setNewLocation] = useState("");
  const [newReading, setNewReading] = useState("");
  const [newType, setNewType] = useState<SensorLogEntry["eventType"]>("motion");
  const [newAnomaly, setNewAnomaly] = useState(8);

  const handleWeaveReport = () => {
    setIsWeaving(true);
    sound.playSpectralTone(190, 0.6);

    setTimeout(() => {
      const report = weaveParanormalInvestigation(logs);
      setDossierReport(report);
      setIsWeaving(false);
      sound.playCandleChime();
    }, 700);
  };

  const handleAddLog = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDevice || !newReading) return;

    sound.playKeyClick();
    const now = new Date();
    const timeStr = now.toLocaleTimeString();

    const entry: SensorLogEntry = {
      id: "log-" + Date.now(),
      timestamp: timeStr,
      device: newDevice,
      location: newLocation || "Perimeter Sensor",
      eventType: newType,
      reading: newReading,
      anomalyScore: newAnomaly,
    };

    setLogs((prev) => [entry, ...prev]);
    setNewDevice("");
    setNewLocation("");
    setNewReading("");
    setNewAnomaly(8);
  };

  const handleDownloadDossier = () => {
    if (!dossierReport) return;
    const blob = new Blob([dossierReport], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `PHANTOM_INVESTIGATION_DOSSIER_${Date.now()}.txt`;
    a.click();
    URL.revokeObjectURL(url);
    sound.playKeyClick();
  };

  return (
    <div className="relative w-full max-w-5xl mx-auto rounded-2xl border border-zinc-800 bg-zinc-950/90 shadow-2xl overflow-hidden backdrop-blur-xl p-6 sm:p-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-800/80 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-950/40 border border-red-700/50 text-red-400 text-xs font-mono mb-2">
            <Radio className="w-3.5 h-3.5 text-red-400 animate-pulse" />
            <span>SMART HOME & TELEMETRY PARANORMAL WEAVER</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            The Phantom Investigator
          </h2>
          <p className="mt-1 text-xs sm:text-sm text-zinc-400">
            Transforms your smart home telemetry, IoT sensor logs, and midnight anomalies into an eerie investigative case file powered by offline open-source AI.
          </p>
        </div>

        <button
          onClick={handleWeaveReport}
          disabled={isWeaving}
          className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-red-600 to-amber-600 hover:from-red-500 hover:to-amber-500 text-white font-mono text-xs font-bold transition-all shadow-lg flex items-center gap-2 shrink-0 disabled:opacity-50"
        >
          {isWeaving ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
          <span>{isWeaving ? "Analyzing Logs..." : "Weave Ghost Story"}</span>
        </button>
      </div>

      <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Live IoT Feed & Add Custom Log (7 Cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-mono uppercase tracking-widest text-zinc-400 flex items-center gap-2">
              <Eye className="w-3.5 h-3.5 text-red-400" />
              Midnight Telemetry Feed ({logs.length} Events)
            </h3>
            <span className="text-[11px] font-mono text-emerald-400 flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping inline-block" /> Local Stream
            </span>
          </div>

          {/* Log Stream Cards */}
          <div className="space-y-2.5 max-h-[380px] overflow-y-auto pr-1">
            {logs.map((log) => {
              const isHigh = log.anomalyScore >= 9;
              return (
                <div
                  key={log.id}
                  className={`p-3.5 rounded-xl border text-xs font-mono transition-all ${
                    isHigh
                      ? "bg-red-950/30 border-red-800/60 text-red-200"
                      : "bg-zinc-900/60 border-zinc-800/80 text-zinc-300"
                  }`}
                >
                  <div className="flex items-center justify-between text-[11px] mb-1">
                    <span className="text-amber-400 font-bold">{log.timestamp}</span>
                    <span className="px-2 py-0.5 rounded bg-black/40 border border-zinc-700 text-zinc-400">
                      {log.location}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 font-bold text-white my-0.5">
                    {log.eventType === "thermal" && <ThermometerSnowflake className="w-3.5 h-3.5 text-cyan-400" />}
                    {log.eventType === "motion" && <Eye className="w-3.5 h-3.5 text-red-400" />}
                    {log.eventType === "audio" && <Radio className="w-3.5 h-3.5 text-purple-400" />}
                    {log.eventType === "electromagnetic" && <Cpu className="w-3.5 h-3.5 text-amber-400" />}
                    <span>{log.device}</span>
                    <span
                      className={`ml-auto text-[10px] px-1.5 py-0.5 rounded ${
                        isHigh ? "bg-red-600 text-white font-bold" : "bg-zinc-800 text-zinc-400"
                      }`}
                    >
                      Anomaly Level {log.anomalyScore}/10
                    </span>
                  </div>

                  <p className="mt-1 text-zinc-300 font-sans text-xs">{log.reading}</p>
                </div>
              );
            })}
          </div>

          {/* Inject Sensor Anomaly Form */}
          <form
            onSubmit={handleAddLog}
            className="p-4 rounded-xl border border-zinc-800/80 bg-zinc-900/40 text-xs space-y-3"
          >
            <div className="font-mono text-zinc-300 font-bold flex items-center gap-1.5 text-xs">
              <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
              Inject Paranormal Event Log
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <input
                type="text"
                required
                value={newDevice}
                onChange={(e) => setNewDevice(e.target.value)}
                placeholder="Device Name (e.g. Smart Crib Cam)"
                className="px-2.5 py-1.5 rounded-lg bg-zinc-950 border border-zinc-700 text-white outline-none focus:border-amber-500 font-mono text-xs"
              />
              <input
                type="text"
                value={newLocation}
                onChange={(e) => setNewLocation(e.target.value)}
                placeholder="Location (e.g. Nursery)"
                className="px-2.5 py-1.5 rounded-lg bg-zinc-950 border border-zinc-700 text-white outline-none focus:border-amber-500 font-mono text-xs"
              />
            </div>

            <input
              type="text"
              required
              value={newReading}
              onChange={(e) => setNewReading(e.target.value)}
              placeholder="Reading description (e.g. Sudden thermal drop, cold spot hovering...)"
              className="w-full px-2.5 py-1.5 rounded-lg bg-zinc-950 border border-zinc-700 text-white outline-none focus:border-amber-500 font-mono text-xs"
            />

            <div className="flex items-center justify-between gap-3 pt-1">
              <div className="flex items-center gap-2">
                <label className="text-zinc-400 font-mono text-[11px]">Type:</label>
                <select
                  value={newType}
                  onChange={(e) => setNewType(e.target.value as SensorLogEntry["eventType"])}
                  className="px-2 py-1 rounded bg-zinc-950 border border-zinc-700 text-white font-mono text-xs"
                >
                  <option value="motion">Motion</option>
                  <option value="thermal">Thermal</option>
                  <option value="audio">Audio</option>
                  <option value="electromagnetic">Electromagnetic</option>
                </select>
              </div>

              <button
                type="submit"
                className="px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-200 font-mono text-xs font-medium border border-zinc-700"
              >
                + Add Log
              </button>
            </div>
          </form>
        </div>

        {/* Right Column: AI Investigative Report Dossier (5 Cols) */}
        <div className="lg:col-span-5 rounded-2xl border border-zinc-800 bg-zinc-900/60 p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-xs font-mono uppercase tracking-widest text-amber-400 flex items-center gap-2">
                <FileText className="w-3.5 h-3.5 text-amber-400" />
                Case File #GHOST-404
              </h3>
              {dossierReport && (
                <button
                  onClick={handleDownloadDossier}
                  className="p-1 rounded hover:bg-zinc-800 text-zinc-400 hover:text-white transition-colors"
                  title="Download Case File (.txt)"
                >
                  <Download className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {dossierReport ? (
              <div className="p-4 rounded-xl bg-black/50 border border-zinc-800 text-xs font-mono leading-relaxed text-zinc-300 max-h-[460px] overflow-y-auto whitespace-pre-wrap">
                {dossierReport}
              </div>
            ) : (
              <div className="text-center py-16 px-4 border border-dashed border-zinc-800 rounded-xl">
                <Radio className="w-10 h-10 text-zinc-600 mx-auto mb-2 animate-pulse" />
                <p className="text-xs text-zinc-400 font-mono">
                  No investigation compiled yet.
                </p>
                <p className="text-[11px] text-zinc-500 mt-1">
                  Click &apos;Weave Ghost Story&apos; to process the telemetry events through open-source AI.
                </p>
              </div>
            )}
          </div>

          <div className="mt-4 pt-3 border-t border-zinc-800/80 flex items-center justify-between text-[11px] font-mono text-zinc-400">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              100% On-Device Analysis
            </span>
            <span>No Telemetry Leaks</span>
          </div>
        </div>
      </div>
    </div>
  );
}

