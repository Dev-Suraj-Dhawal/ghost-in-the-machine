"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Radio,
  AlertTriangle,
  ShieldCheck,
  Cpu,
  Eye,
  ThermometerSnowflake,
  FileText,
  Download,
  Sparkles,
  RefreshCw,
  Activity,
  Play,
  Square,
  Filter,
} from "lucide-react";
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

const SIMULATED_ANOMALIES: Array<{ device: string; location: string; eventType: SensorLogEntry["eventType"]; reading: string; anomalyScore: number }> = [
  { device: "Attic Hall Doppler Radar", location: "Upper Rafters", eventType: "motion", reading: "Oscillating airborne mass detected at 1.4 m/s. Radar cross-section resembles lace shroud.", anomalyScore: 9 },
  { device: "Kitchen Smart Kettle", location: "Galley", eventType: "thermal", reading: "Spontaneous condensation freeze on brass spout during full boiling cycle.", anomalyScore: 8 },
  { device: "EMF Meter Node #3", location: "Library Fireplace", eventType: "electromagnetic", reading: "Magnetic flux peak: 88.4 milliGauss. Harmonic alignment with 7.83Hz Schumann resonance.", anomalyScore: 10 },
  { device: "Master Bed Accelerometer", location: "Chamber", eventType: "motion", reading: "Rhythmic 1.2 Hz vibration pattern. Micro-tremors match footsteps pacing perimeter.", anomalyScore: 8 },
  { device: "Smart Infrasound Array", location: "Cellar Stairs", eventType: "audio", reading: "Acoustic resonance trapped at 18.98 Hz. Visual shadow artifacts reported by optic sensor.", anomalyScore: 9 },
];

export default function PhantomInvestigator({ aiConfig }: PhantomInvestigatorProps) {
  const [logs, setLogs] = useState<SensorLogEntry[]>(INITIAL_LOGS);
  const [dossierReport, setDossierReport] = useState<string>("");
  const [isWeaving, setIsWeaving] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState<"all" | SensorLogEntry["eventType"]>("all");
  const [isLiveStreamOn, setIsLiveStreamOn] = useState(false);

  // New log form state
  const [newDevice, setNewDevice] = useState("");
  const [newLocation, setNewLocation] = useState("");
  const [newReading, setNewReading] = useState("");
  const [newType, setNewType] = useState<SensorLogEntry["eventType"]>("motion");
  const [newAnomaly, setNewAnomaly] = useState(8);

  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Real-time Oscilloscope & Radar Sweep Canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let angle = 0;
    let waveOffset = 0;

    const render = () => {
      const w = canvas.width;
      const h = canvas.height;
      ctx.clearRect(0, 0, w, h);

      const cx = w * 0.28;
      const cy = h * 0.5;
      const radius = Math.min(cx, cy) - 15;

      // Draw Radar Base Rings
      ctx.save();
      ctx.strokeStyle = "rgba(239, 68, 68, 0.25)";
      ctx.lineWidth = 1;

      [0.35, 0.7, 1.0].forEach((rMul) => {
        ctx.beginPath();
        ctx.arc(cx, cy, radius * rMul, 0, Math.PI * 2);
        ctx.stroke();
      });

      // Radar Crosshairs
      ctx.beginPath();
      ctx.moveTo(cx - radius, cy);
      ctx.lineTo(cx + radius, cy);
      ctx.moveTo(cx, cy - radius);
      ctx.lineTo(cx, cy + radius);
      ctx.stroke();

      // Sweeping Beam
      angle += 0.035;
      const sweepX = cx + Math.cos(angle) * radius;
      const sweepY = cy + Math.sin(angle) * radius;

      const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius);
      grad.addColorStop(0, "rgba(239, 68, 68, 0.4)");
      grad.addColorStop(1, "transparent");

      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.arc(cx, cy, radius, angle - 0.4, angle);
      ctx.closePath();
      ctx.fillStyle = grad;
      ctx.fill();

      // Sweeping Line
      ctx.strokeStyle = "#ef4444";
      ctx.lineWidth = 1.8;
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(sweepX, sweepY);
      ctx.stroke();

      // Anomaly Blips on Radar
      logs.slice(0, 5).forEach((log, idx) => {
        const blipAngle = (idx * 1.35 + 0.4) % (Math.PI * 2);
        const dist = radius * (0.35 + (idx % 3) * 0.28);
        const bx = cx + Math.cos(blipAngle) * dist;
        const by = cy + Math.sin(blipAngle) * dist;

        ctx.fillStyle = log.anomalyScore >= 9 ? "#ef4444" : "#f59e0b";
        ctx.beginPath();
        ctx.arc(bx, by, 3.5, 0, Math.PI * 2);
        ctx.fill();

        // Pulsing aura
        ctx.strokeStyle = log.anomalyScore >= 9 ? "rgba(239, 68, 68, 0.5)" : "rgba(245, 158, 11, 0.5)";
        ctx.beginPath();
        ctx.arc(bx, by, 7 + Math.sin(angle * 2 + idx) * 3, 0, Math.PI * 2);
        ctx.stroke();
      });
      ctx.restore();

      // Right Side: Oscilloscope Waveform (Infrasound 18.98Hz + Schumann 7.83Hz)
      ctx.save();
      const waveLeft = w * 0.58;
      const waveWidth = w * 0.38;
      const waveMidY = h * 0.5;

      ctx.strokeStyle = "rgba(255, 255, 255, 0.08)";
      ctx.lineWidth = 1;
      ctx.strokeRect(waveLeft, 12, waveWidth, h - 24);

      // Grid Lines
      ctx.beginPath();
      ctx.moveTo(waveLeft, waveMidY);
      ctx.lineTo(waveLeft + waveWidth, waveMidY);
      ctx.strokeStyle = "rgba(239, 68, 68, 0.2)";
      ctx.stroke();

      // Draw Oscillating Wave
      waveOffset += 0.08;
      ctx.strokeStyle = "#f59e0b";
      ctx.lineWidth = 2;
      ctx.beginPath();

      for (let x = 0; x < waveWidth; x += 3) {
        const norm = x / waveWidth;
        // Superposition of 18.98Hz infrasound and 7.83Hz Schumann resonance
        const yVal =
          Math.sin(norm * 14 + waveOffset) * 16 +
          Math.sin(norm * 6 - waveOffset * 0.6) * 10 +
          (Math.random() - 0.5) * 3.5;

        if (x === 0) ctx.moveTo(waveLeft + x, waveMidY + yVal);
        else ctx.lineTo(waveLeft + x, waveMidY + yVal);
      }
      ctx.stroke();

      // Oscilloscope Info Labels
      ctx.fillStyle = "#ef4444";
      ctx.font = "bold 10px monospace";
      ctx.fillText("FREQ: 18.98 Hz [INFRASOUND]", waveLeft + 8, 26);
      ctx.fillStyle = "#f59e0b";
      ctx.fillText("SCHUMANN: 7.83 Hz [EMF]", waveLeft + 8, 40);

      ctx.restore();

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [logs]);

  // Simulated Live Telemetry Stream
  useEffect(() => {
    if (!isLiveStreamOn) return;

    const interval = setInterval(() => {
      const randomAnomaly = SIMULATED_ANOMALIES[Math.floor(Math.random() * SIMULATED_ANOMALIES.length)];
      const now = new Date();
      const timeStr = now.toLocaleTimeString();

      const newLog: SensorLogEntry = {
        id: "live-" + Date.now(),
        timestamp: timeStr,
        device: randomAnomaly.device,
        location: randomAnomaly.location,
        eventType: randomAnomaly.eventType,
        reading: randomAnomaly.reading,
        anomalyScore: randomAnomaly.anomalyScore,
      };

      setLogs((prev) => [newLog, ...prev.slice(0, 18)]);
      sound.playGeigerClick();
    }, 9000);

    return () => clearInterval(interval);
  }, [isLiveStreamOn]);

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

  const handleDownloadDossierTxt = () => {
    if (!dossierReport) return;
    const blob = new Blob([dossierReport], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `CASE_FILE_GHOST404_${Date.now()}.txt`;
    a.click();
    URL.revokeObjectURL(url);
    sound.playKeyClick();
  };

  const handleDownloadLogsJson = () => {
    const payload = {
      investigationCase: "CASE-GHOST-404",
      generatedAt: new Date().toISOString(),
      inferenceEngine: aiConfig.mode === "ollama" ? aiConfig.ollamaModel : "In-Browser Neural Engine",
      totalEvents: logs.length,
      events: logs,
    };
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `TELEMETRY_STREAM_${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
    sound.playKeyClick();
  };

  const handleDownloadLogsCsv = () => {
    const header = "id,timestamp,device,location,eventType,anomalyScore,reading\n";
    const rows = logs
      .map(
        (l) =>
          `"${l.id}","${l.timestamp}","${l.device}","${l.location}","${l.eventType}",${l.anomalyScore},"${l.reading.replace(/"/g, '""')}"`
      )
      .join("\n");
    const blob = new Blob([header + rows], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `SENSOR_LOGS_${Date.now()}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    sound.playKeyClick();
  };

  const filteredLogs = logs.filter((l) => (selectedFilter === "all" ? true : l.eventType === selectedFilter));

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
            Transforms your smart home telemetry, IoT sensor logs, and midnight anomalies into an eerie investigative case
            file powered by offline open-source AI.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* Live Sensor Stream Toggle */}
          <button
            onClick={() => {
              setIsLiveStreamOn(!isLiveStreamOn);
              sound.playRadarPing();
            }}
            className={`px-3 py-2 rounded-xl border text-xs font-mono font-bold flex items-center gap-1.5 transition-colors ${
              isLiveStreamOn
                ? "bg-red-500/20 border-red-500 text-red-300 shadow-sm shadow-red-500/20"
                : "bg-zinc-900 border-zinc-700 text-zinc-400 hover:text-white"
            }`}
          >
            {isLiveStreamOn ? <Square className="w-3 h-3 fill-red-400" /> : <Play className="w-3 h-3 fill-current" />}
            <span>{isLiveStreamOn ? "Streaming Telemetry" : "Simulate IoT Feed"}</span>
          </button>

          <button
            onClick={handleWeaveReport}
            disabled={isWeaving}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-red-600 to-amber-600 hover:from-red-500 hover:to-amber-500 text-white font-mono text-xs font-bold transition-all shadow-lg flex items-center gap-2 shrink-0 disabled:opacity-50"
          >
            {isWeaving ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Sparkles className="w-3.5 h-3.5" />}
            <span>{isWeaving ? "Analyzing Logs..." : "Weave Ghost Story"}</span>
          </button>
        </div>
      </div>

      {/* Radar & EMF Infrasound Oscilloscope Canvas Bar */}
      <div className="mt-6 p-3 rounded-2xl border border-red-900/30 bg-black/60 relative overflow-hidden">
        <canvas ref={canvasRef} width={900} height={140} className="w-full h-28 sm:h-32 rounded-xl block" />
      </div>

      <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Live IoT Feed & Filter Chips (7 Cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <h3 className="text-xs font-mono uppercase tracking-widest text-zinc-400 flex items-center gap-2">
              <Eye className="w-3.5 h-3.5 text-red-400" />
              Midnight Telemetry Feed ({filteredLogs.length} Events)
            </h3>

            {/* Filter Chips */}
            <div className="flex items-center gap-1 text-[10px] font-mono">
              {(["all", "motion", "thermal", "electromagnetic", "audio"] as const).map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedFilter(cat)}
                  className={`px-2 py-0.5 rounded capitalize transition-colors ${
                    selectedFilter === cat
                      ? "bg-red-500 text-white font-bold"
                      : "bg-zinc-900 text-zinc-400 hover:text-white"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Log Stream Cards */}
          <div className="space-y-2.5 max-h-[360px] overflow-y-auto pr-1">
            {filteredLogs.map((log) => {
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
          <form onSubmit={handleAddLog} className="p-4 rounded-xl border border-zinc-800/80 bg-zinc-900/40 text-xs space-y-3">
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

        {/* Right Column: AI Investigative Report Dossier & Multi-Format Exports (5 Cols) */}
        <div className="lg:col-span-5 rounded-2xl border border-zinc-800 bg-zinc-900/60 p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
              <h3 className="text-xs font-mono uppercase tracking-widest text-amber-400 flex items-center gap-2">
                <FileText className="w-3.5 h-3.5 text-amber-400" />
                Case File #GHOST-404
              </h3>

              {/* Multi-Format Export Buttons */}
              <div className="flex items-center gap-1.5">
                {dossierReport && (
                  <button
                    onClick={handleDownloadDossierTxt}
                    className="px-2 py-1 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white text-[11px] font-mono flex items-center gap-1 transition-colors"
                    title="Export Dossier as Formatted Text (.txt)"
                  >
                    <Download className="w-3 h-3" />
                    <span>TXT</span>
                  </button>
                )}
                <button
                  onClick={handleDownloadLogsJson}
                  className="px-2 py-1 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white text-[11px] font-mono flex items-center gap-1 transition-colors"
                  title="Export Raw Sensor Logs as JSON (.json)"
                >
                  <Download className="w-3 h-3" />
                  <span>JSON</span>
                </button>
                <button
                  onClick={handleDownloadLogsCsv}
                  className="px-2 py-1 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white text-[11px] font-mono flex items-center gap-1 transition-colors"
                  title="Export Sensor Log Table as CSV (.csv)"
                >
                  <Download className="w-3 h-3" />
                  <span>CSV</span>
                </button>
              </div>
            </div>

            {dossierReport ? (
              <div className="p-4 rounded-xl bg-black/50 border border-zinc-800 text-xs font-mono leading-relaxed text-zinc-300 max-h-[440px] overflow-y-auto whitespace-pre-wrap">
                {dossierReport}
              </div>
            ) : (
              <div className="text-center py-16 px-4 border border-dashed border-zinc-800 rounded-xl">
                <Radio className="w-10 h-10 text-zinc-600 mx-auto mb-2 animate-pulse" />
                <p className="text-xs text-zinc-400 font-mono">No investigation compiled yet.</p>
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
