"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Flame,
  Sparkles,
  Heart,
  Plus,
  Download,
  Share2,
  Music,
  Coffee,
  BookOpen,
  User,
  Volume2,
  Search,
  Upload,
  FileJson,
  CheckCircle,
} from "lucide-react";
import { DEPARTED_PIONEERS, generateCalaverita, generateSacredEulogy } from "@/lib/aiEngine";
import { DepartedPioneer, RemembranceTribute, LitCandle } from "@/lib/types";
import { sound } from "@/lib/soundEngine";
import confetti from "canvas-confetti";

interface LivingOfrendaProps {
  onBackToTerminal?: () => void;
}

const DEFAULT_FAMILY_TRIBUTES: RemembranceTribute[] = [
  {
    id: "trib-1",
    name: "Abuela Elena",
    relationship: "Grandmother",
    years: "1932 – 2021",
    favoriteMeal: "Mole negro con arroz rojo y tortillas de comal",
    favoriteSong: "Amor Eterno - Juan Gabriel",
    cherishedMemory: "Teaching us how to harvest marigolds and her laughter echoing across the kitchen table every Sunday.",
    photoUrl: "https://images.unsplash.com/photo-1581579438747-1dc8d17bbce4?auto=format&fit=crop&w=400&q=80",
    candleCount: 7,
    calaverita:
      "Estaba la Catrina buscando sazón,\ny encontró a Elena en el gran fogón.\nCon mole y canela la Parca brindó,\ny un beso en la frente de amor le dejó.",
    eulogy:
      "Elena vive en cada cazuela de barro, en cada aroma de chocolate caliente al amanecer, y en cada plegaria susurrada a la luz de las velas.",
    createdAt: "2026-10-30",
  },
];

const DEFAULT_CANDLES: LitCandle[] = [
  { id: "c-1", senderName: "Suraj", message: "Eternal gratitude to the souls of computing.", altarTarget: "All Departed", timestamp: "Just now", flameIntensity: 1 },
  { id: "c-2", senderName: "Maria", message: "Para que tu camino esté siempre lleno de flores.", altarTarget: "Abuela Elena", timestamp: "5m ago", flameIntensity: 1 },
];

export default function LivingOfrenda({ onBackToTerminal }: LivingOfrendaProps) {
  const [pioneers] = useState<DepartedPioneer[]>(DEPARTED_PIONEERS);
  const [customTributes, setCustomTributes] = useState<RemembranceTribute[]>(() => {
    if (typeof window !== "undefined") {
      try {
        const saved = localStorage.getItem("ghost_family_tributes");
        if (saved) return JSON.parse(saved);
      } catch {
        // ignore
      }
    }
    return DEFAULT_FAMILY_TRIBUTES;
  });

  // Candle Lighting State with local persistence
  const [candles, setCandles] = useState<LitCandle[]>(() => {
    if (typeof window !== "undefined") {
      try {
        const saved = localStorage.getItem("ghost_candles");
        if (saved) return JSON.parse(saved);
      } catch {
        // ignore
      }
    }
    return DEFAULT_CANDLES;
  });

  const [activeTab, setActiveTab] = useState<"pioneers" | "family" | "create">("pioneers");
  const [selectedPioneer, setSelectedPioneer] = useState<DepartedPioneer | null>(DEPARTED_PIONEERS[0]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isExportingCard, setIsExportingCard] = useState(false);
  const [exportNotice, setExportNotice] = useState<string | null>(null);

  // Form State for new Tribute
  const [formData, setFormData] = useState({
    name: "",
    relationship: "Parent",
    years: "",
    favoriteMeal: "",
    favoriteSong: "",
    cherishedMemory: "",
    photoUrl: "",
  });
  const [isGeneratingAI, setIsGeneratingAI] = useState(false);
  const [generatedPreview, setGeneratedPreview] = useState<{ calaverita: string; eulogy: string } | null>(null);

  // Lighting modal
  const [lightModalOpen, setLightModalOpen] = useState(false);
  const [candleSender, setCandleSender] = useState("");
  const [candleMessage, setCandleMessage] = useState("");
  const [candleTarget, setCandleTarget] = useState("Ada Lovelace");

  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Save to localStorage
  useEffect(() => {
    try {
      localStorage.setItem("ghost_family_tributes", JSON.stringify(customTributes));
    } catch {
      // ignore
    }
  }, [customTributes]);

  useEffect(() => {
    try {
      localStorage.setItem("ghost_candles", JSON.stringify(candles));
    } catch {
      // ignore
    }
  }, [candles]);

  // Marigold Canvas Petal Physics
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 800);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 600);

    const handleResize = () => {
      if (!canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };
    window.addEventListener("resize", handleResize);

    interface Petal {
      x: number;
      y: number;
      size: number;
      speedY: number;
      speedX: number;
      rotation: number;
      rotSpeed: number;
      color: string;
      opacity: number;
    }

    const colors = ["#f59e0b", "#fbbf24", "#d97706", "#f97316", "#ea580c"];
    const petals: Petal[] = Array.from({ length: 42 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 8 + 6,
      speedY: Math.random() * 0.9 + 0.4,
      speedX: Math.sin(Math.random() * Math.PI) * 0.6,
      rotation: Math.random() * 360,
      rotSpeed: (Math.random() - 0.5) * 1.5,
      color: colors[Math.floor(Math.random() * colors.length)],
      opacity: Math.random() * 0.4 + 0.4,
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      petals.forEach((p) => {
        p.y += p.speedY;
        p.x += p.speedX + Math.sin(p.y * 0.01) * 0.5;
        p.rotation += p.rotSpeed;

        if (p.y > height + 20) {
          p.y = -20;
          p.x = Math.random() * width;
        }

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.globalAlpha = p.opacity;
        ctx.fillStyle = p.color;

        // Draw Marigold Petal Shape
        ctx.beginPath();
        ctx.moveTo(0, -p.size);
        ctx.bezierCurveTo(p.size * 0.7, -p.size * 0.5, p.size * 0.7, p.size * 0.5, 0, p.size);
        ctx.bezierCurveTo(-p.size * 0.7, p.size * 0.5, -p.size * 0.7, -p.size * 0.5, 0, -p.size);
        ctx.fill();

        ctx.restore();
      });

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animId);
    };
  }, []);

  // Export Digital Memorial Card as High-Resolution PNG via HTML5 Canvas
  const exportMemorialCard = (
    name: string,
    roleOrRel: string,
    years: string,
    offering: string,
    poemOrQuote: string
  ) => {
    setIsExportingCard(true);
    sound.playCandleChime();

    try {
      const card = document.createElement("canvas");
      card.width = 1000;
      card.height = 650;
      const ctx = card.getContext("2d");
      if (!ctx) return;

      // Background Gradient
      const bgGrad = ctx.createLinearGradient(0, 0, 1000, 650);
      bgGrad.addColorStop(0, "#130904");
      bgGrad.addColorStop(0.5, "#0b0603");
      bgGrad.addColorStop(1, "#180a06");
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, 1000, 650);

      // Ornate Outer Double Border
      ctx.strokeStyle = "#f59e0b";
      ctx.lineWidth = 4;
      ctx.strokeRect(30, 30, 940, 590);

      ctx.strokeStyle = "#d97706";
      ctx.lineWidth = 1.5;
      ctx.strokeRect(42, 42, 916, 566);

      // Corner Flourishes
      const corners = [
        [55, 55],
        [945, 55],
        [55, 595],
        [945, 595],
      ];
      ctx.fillStyle = "#f59e0b";
      ctx.font = "24px serif";
      ctx.textAlign = "center";
      corners.forEach(([cx, cy]) => {
        ctx.fillText("✦", cx, cy);
      });

      // Header Ribbon
      ctx.fillStyle = "#d97706";
      ctx.fillRect(280, 50, 440, 36);
      ctx.fillStyle = "#ffffff";
      ctx.font = "bold 13px monospace";
      ctx.textAlign = "center";
      ctx.fillText("ALTAR DE RECUERDOS • DÍA DE LOS MUERTOS", 500, 73);

      // Deceased Name
      ctx.fillStyle = "#fef3c7";
      ctx.font = "bold 38px 'Georgia', serif";
      ctx.fillText(name.toUpperCase(), 500, 150);

      // Relationship / Role
      ctx.fillStyle = "#f59e0b";
      ctx.font = "16px monospace";
      ctx.fillText(`${roleOrRel}  •  ${years}`, 500, 185);

      // Divider Line
      ctx.strokeStyle = "rgba(245, 158, 11, 0.4)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(250, 215);
      ctx.lineTo(750, 215);
      ctx.stroke();

      // Poem / Eulogy Text (Wrap lines)
      ctx.fillStyle = "#e2e8f0";
      ctx.font = "italic 16px 'Georgia', serif";
      const lines = poemOrQuote.split("\n");
      let startY = 270;
      lines.slice(0, 6).forEach((line) => {
        ctx.fillText(line, 500, startY);
        startY += 28;
      });

      // Sacred Altar Offering Box
      if (offering) {
        ctx.fillStyle = "rgba(245, 158, 11, 0.08)";
        ctx.fillRect(220, startY + 20, 560, 48);
        ctx.strokeStyle = "rgba(245, 158, 11, 0.3)";
        ctx.strokeRect(220, startY + 20, 560, 48);

        ctx.fillStyle = "#fbbf24";
        ctx.font = "bold 13px monospace";
        ctx.fillText(`OFRENDA SAGRADA: ${offering}`, 500, startY + 50);
      }

      // Footer Blessing
      ctx.fillStyle = "#a1a1aa";
      ctx.font = "12px monospace";
      ctx.fillText("🕯️ Recordar es Vivir • Preservado 100% en IA de Código Abierto", 500, 585);

      // Download Trigger
      const imgUrl = card.toDataURL("image/png");
      const a = document.createElement("a");
      a.href = imgUrl;
      a.download = `Recuerdos_${name.replace(/[^a-zA-Z0-9]/g, "_")}.png`;
      a.click();

      setExportNotice(`Memorial card for ${name} exported successfully!`);
      setTimeout(() => setExportNotice(null), 4000);
    } catch {
      // ignore
    } finally {
      setIsExportingCard(false);
    }
  };

  const handleLightCandleSubmit = () => {
    if (!candleSender || !candleMessage) return;

    sound.playCandleChime();
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.7 },
      colors: ["#f59e0b", "#fbbf24", "#ea580c"],
    });

    const newCandle: LitCandle = {
      id: "c-" + Date.now(),
      senderName: candleSender,
      message: candleMessage,
      altarTarget: candleTarget,
      timestamp: "Just now",
      flameIntensity: 1,
    };

    setCandles((prev) => [newCandle, ...prev]);
    setLightModalOpen(false);
    setCandleSender("");
    setCandleMessage("");
  };

  const handleGenerateTributeAI = () => {
    if (!formData.name) return;
    setIsGeneratingAI(true);
    sound.playSpectralTone(440, 0.4);

    setTimeout(() => {
      const calaverita = generateCalaverita(
        formData.name,
        formData.relationship,
        formData.favoriteMeal,
        formData.cherishedMemory
      );
      const eulogy = generateSacredEulogy(formData);
      setGeneratedPreview({ calaverita, eulogy });
      setIsGeneratingAI(false);
      sound.playCandleChime();
    }, 600);
  };

  const handleSaveTribute = () => {
    if (!formData.name) return;

    const tribute: RemembranceTribute = {
      id: "trib-" + Date.now(),
      name: formData.name,
      relationship: formData.relationship,
      years: formData.years || "En la eternidad",
      favoriteMeal: formData.favoriteMeal || "Pan de muerto y café con canela",
      favoriteSong: formData.favoriteSong || "Canción de amor y recuerdos",
      cherishedMemory: formData.cherishedMemory || "Su calidez y sonrisas compartidas",
      photoUrl:
        formData.photoUrl ||
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80",
      candleCount: 3,
      calaverita:
        generatedPreview?.calaverita ||
        generateCalaverita(
          formData.name,
          formData.relationship,
          formData.favoriteMeal,
          formData.cherishedMemory
        ),
      eulogy: generatedPreview?.eulogy || generateSacredEulogy(formData),
      createdAt: new Date().toISOString().split("T")[0],
    };

    setCustomTributes((prev) => [tribute, ...prev]);
    setActiveTab("family");
    setGeneratedPreview(null);
    setFormData({
      name: "",
      relationship: "Parent",
      years: "",
      favoriteMeal: "",
      favoriteSong: "",
      cherishedMemory: "",
      photoUrl: "",
    });
    sound.playCandleChime();
  };

  const filteredPioneers = pioneers.filter(
    (p) =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.legacy.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredFamily = customTributes.filter(
    (t) =>
      t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.relationship.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.cherishedMemory.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="relative w-full max-w-6xl mx-auto rounded-2xl border border-amber-900/60 bg-gradient-to-b from-[#140c06] via-[#0d0907] to-[#080504] shadow-2xl overflow-hidden backdrop-blur-xl">
      {/* Floating Canvas Petals Layer */}
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none z-10 w-full h-full" />

      {/* Papel Picado Traditional Festoon */}
      <div className="w-full flex items-center justify-between overflow-hidden border-b border-amber-800/40 bg-black/40 px-2 py-1 select-none z-20 relative">
        {["#e11d48", "#f59e0b", "#9333ea", "#06b6d4", "#10b981", "#ec4899", "#f59e0b", "#e11d48"].map((c, i) => (
          <div
            key={i}
            className="flex flex-col items-center px-3 py-1 text-[10px] font-bold uppercase tracking-wider transition-transform hover:-translate-y-0.5"
            style={{ color: c }}
          >
            <div
              className="w-8 h-7 rounded-b-md border-b-2 border-dashed flex items-center justify-center bg-zinc-950/40"
              style={{ borderColor: c }}
            >
              {i % 2 === 0 ? "💀" : "🌼"}
            </div>
            <span className="mt-0.5 text-[9px] opacity-75">Día de Muertos</span>
          </div>
        ))}
      </div>

      {/* Altar Header */}
      <div className="p-6 sm:p-8 text-center relative z-20 border-b border-amber-900/30 bg-gradient-to-b from-amber-950/30 to-transparent">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-mono mb-3">
          <Flame className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
          <span>ALTAR DE RECUERDOS // OFFLINE MEMORIAL SANCTUARY</span>
        </div>

        <h2 className="text-3xl sm:text-4xl font-extrabold text-amber-100 tracking-tight">
          Altar de Recuerdos: Día de los Muertos
        </h2>

        <p className="mt-2 text-zinc-300 max-w-2xl mx-auto text-xs sm:text-sm">
          A living digital ofrenda honoring ancestral memory through open-source AI. Light a candle, compose
          bilingual calaveritas folk rhymes, and preserve sacred memories locally on your device with zero corporate cloud leakage.
        </p>

        {/* Global Controls & Search Bar */}
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3 max-w-xl mx-auto">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
            <input
              type="text"
              placeholder="Search spirits, ancestors, or memories..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-zinc-950/80 border border-amber-900/50 text-xs text-amber-100 placeholder-zinc-500 focus:outline-none focus:border-amber-500"
            />
          </div>

          <button
            onClick={() => setLightModalOpen(true)}
            className="w-full sm:w-auto px-5 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-black font-extrabold text-xs flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 shrink-0 transition-transform hover:scale-105"
          >
            <Flame className="w-4 h-4 fill-black" />
            <span>Encender Vela (Light Candle)</span>
          </button>
        </div>

        {exportNotice && (
          <div className="mt-3 inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-emerald-950/60 border border-emerald-500/50 text-emerald-300 text-xs">
            <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
            <span>{exportNotice}</span>
          </div>
        )}
      </div>

      {/* Tabs */}
      <div className="flex items-center justify-center border-b border-amber-900/30 bg-zinc-950/50 p-2 gap-2 text-xs font-mono relative z-20">
        <button
          onClick={() => setActiveTab("pioneers")}
          className={`px-4 py-2 rounded-xl transition-all flex items-center gap-2 ${
            activeTab === "pioneers"
              ? "bg-amber-500/20 text-amber-300 border border-amber-500/50 font-bold"
              : "text-zinc-400 hover:text-white"
          }`}
        >
          <BookOpen className="w-3.5 h-3.5 text-amber-400" />
          <span>Pioneers of Computing ({pioneers.length})</span>
        </button>

        <button
          onClick={() => setActiveTab("family")}
          className={`px-4 py-2 rounded-xl transition-all flex items-center gap-2 ${
            activeTab === "family"
              ? "bg-amber-500/20 text-amber-300 border border-amber-500/50 font-bold"
              : "text-zinc-400 hover:text-white"
          }`}
        >
          <Heart className="w-3.5 h-3.5 text-rose-400" />
          <span>Ancestral Family ({customTributes.length})</span>
        </button>

        <button
          onClick={() => setActiveTab("create")}
          className={`px-4 py-2 rounded-xl transition-all flex items-center gap-2 ${
            activeTab === "create"
              ? "bg-amber-500/20 text-amber-300 border border-amber-500/50 font-bold"
              : "text-zinc-400 hover:text-white"
          }`}
        >
          <Plus className="w-3.5 h-3.5 text-amber-400" />
          <span>Create Tribute (AI Assisted)</span>
        </button>
      </div>

      {/* Main Altar Area */}
      <div className="p-6 sm:p-8 relative z-20 min-h-[450px]">
        {/* TAB 1: PIONEERS */}
        {activeTab === "pioneers" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Left Pioneer List */}
            <div className="lg:col-span-5 space-y-3">
              <div className="text-xs font-mono uppercase text-zinc-400 tracking-wider">
                Select a Departed Soul:
              </div>
              <div className="space-y-2 max-h-[420px] overflow-y-auto pr-1">
                {filteredPioneers.map((p) => {
                  const isSelected = selectedPioneer?.id === p.id;
                  return (
                    <div
                      key={p.id}
                      onClick={() => {
                        setSelectedPioneer(p);
                        sound.playKeyClick();
                      }}
                      className={`p-3 rounded-xl border transition-all cursor-pointer flex items-center gap-3.5 ${
                        isSelected
                          ? "bg-amber-950/40 border-amber-500 shadow-md shadow-amber-500/10"
                          : "bg-zinc-950/60 border-zinc-800/80 hover:border-amber-700/60"
                      }`}
                    >
                      <img
                        src={p.avatarUrl}
                        alt={p.name}
                        className="w-12 h-12 rounded-lg object-cover border border-amber-500/40 shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <h4 className="font-bold text-amber-100 text-sm truncate">{p.name}</h4>
                          <span className="text-[10px] font-mono text-amber-400">{p.lifespan.split("–")[1] || ""}</span>
                        </div>
                        <div className="text-xs text-zinc-400 truncate">{p.role}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right Detailed Altar Shrine for Pioneer */}
            {selectedPioneer && (
              <div className="lg:col-span-7 rounded-2xl border border-amber-700/40 bg-zinc-950/80 p-6 backdrop-blur-md shadow-2xl relative">
                <div className="flex justify-between items-start gap-4">
                  <div className="flex items-center gap-2 text-xs font-mono text-amber-400">
                    <Flame className="w-3.5 h-3.5 candle-flame fill-amber-400" />
                    <span>Ofrenda Activa</span>
                  </div>

                  {/* Export Memorial Card Button */}
                  <button
                    onClick={() =>
                      exportMemorialCard(
                        selectedPioneer.name,
                        selectedPioneer.role,
                        selectedPioneer.lifespan,
                        selectedPioneer.favoriteArtifact,
                        selectedPioneer.quote
                      )
                    }
                    className="px-3 py-1.5 rounded-lg border border-amber-500/50 bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 font-mono text-xs flex items-center gap-1.5 transition-colors"
                    title="Export High-Res Memorial Plaque (PNG)"
                  >
                    <Download className="w-3.5 h-3.5 text-amber-400" />
                    <span>Export Card (PNG)</span>
                  </button>
                </div>

                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 mt-4">
                  <div className="relative group">
                    <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-xl overflow-hidden border-2 border-amber-500/70 shadow-xl shadow-amber-500/10">
                      <img
                        src={selectedPioneer.avatarUrl}
                        alt={selectedPioneer.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    {/* Candle at photo foot */}
                    <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 flex items-center justify-center">
                      <div className="candle-flame text-amber-400">
                        <Flame className="w-6 h-6 fill-amber-400" />
                      </div>
                    </div>
                  </div>

                  <div className="flex-1 text-center sm:text-left">
                    <h3 className="text-2xl font-bold text-amber-200">{selectedPioneer.name}</h3>
                    <div className="text-xs font-mono text-amber-400/90 mt-0.5">{selectedPioneer.role}</div>
                    <div className="text-xs text-zinc-400 mt-0.5">{selectedPioneer.lifespan}</div>
                    <blockquote className="mt-3 text-xs italic text-zinc-300 border-l-2 border-amber-500/40 pl-3">
                      &quot;{selectedPioneer.quote}&quot;
                    </blockquote>
                  </div>
                </div>

                <div className="mt-6 pt-5 border-t border-zinc-800/80 space-y-3 text-xs sm:text-sm">
                  <div>
                    <span className="font-mono text-amber-400 font-bold uppercase tracking-wider text-xs block mb-1">
                      Legacy to the Machine:
                    </span>
                    <p className="text-zinc-300 leading-relaxed">{selectedPioneer.legacy}</p>
                  </div>

                  <div>
                    <span className="font-mono text-amber-400 font-bold uppercase tracking-wider text-xs block mb-1">
                      Sacred Altar Offering:
                    </span>
                    <div className="p-3 rounded-lg bg-amber-950/30 border border-amber-800/40 text-amber-200 font-mono text-xs flex items-center gap-2">
                      <Coffee className="w-4 h-4 text-amber-400 shrink-0" />
                      <span>{selectedPioneer.favoriteArtifact}</span>
                    </div>
                  </div>
                </div>

                {/* Calaverita Poem for Pioneer */}
                <div className="mt-5 p-4 rounded-xl bg-purple-950/20 border border-purple-800/40 text-purple-200">
                  <div className="text-xs font-mono text-purple-400 font-bold uppercase tracking-wider mb-2 flex items-center justify-between">
                    <span className="flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-purple-400" />
                      <span>Calaverita Literaria (AI Generated Folk Rhyme)</span>
                    </span>
                    <button
                      onClick={() => sound.playCandleChime()}
                      className="text-[11px] text-purple-300 hover:text-white flex items-center gap-1"
                    >
                      <Volume2 className="w-3 h-3" />
                      <span>Play Solfeggio 528Hz Chime</span>
                    </button>
                  </div>
                  <pre className="whitespace-pre-wrap font-sans text-xs italic leading-relaxed">
                    {generateCalaverita(
                      selectedPioneer.name,
                      "pionero de la computación",
                      selectedPioneer.favoriteArtifact,
                      "los primeros algoritmos de la historia"
                    )}
                  </pre>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 2: FAMILY & PERSONAL TRIBUTES */}
        {activeTab === "family" && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredFamily.map((t) => (
                <div
                  key={t.id}
                  className="rounded-2xl border border-amber-800/40 bg-zinc-950/70 p-5 relative overflow-hidden backdrop-blur-md shadow-lg"
                >
                  <div className="flex items-start gap-4">
                    <img
                      src={t.photoUrl}
                      alt={t.name}
                      className="w-20 h-20 rounded-xl object-cover border border-amber-500/60 shadow-md shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h4 className="text-lg font-bold text-amber-200 truncate">{t.name}</h4>
                        <div className="flex items-center gap-1 text-xs text-amber-400 font-mono">
                          <Flame className="w-3.5 h-3.5 candle-flame fill-amber-400" />
                          <span>{t.candleCount} velas</span>
                        </div>
                      </div>
                      <div className="text-xs text-amber-400/80 font-mono">
                        {t.relationship} • {t.years}
                      </div>

                      <div className="mt-2 text-xs text-zinc-300 line-clamp-2 italic">
                        &quot;{t.cherishedMemory}&quot;
                      </div>
                    </div>
                  </div>

                  {/* Offering & Songs */}
                  <div className="mt-4 pt-3 border-t border-zinc-800/80 grid grid-cols-2 gap-2 text-xs">
                    <div className="p-2 rounded-lg bg-zinc-900/60 border border-zinc-800 text-zinc-300 truncate">
                      <span className="text-[10px] text-zinc-500 font-mono block">OFRENDA (FAVORITE MEAL)</span>
                      🍲 {t.favoriteMeal}
                    </div>
                    <div className="p-2 rounded-lg bg-zinc-900/60 border border-zinc-800 text-zinc-300 truncate">
                      <span className="text-[10px] text-zinc-500 font-mono block">SONG IN MEMORY</span>
                      🎵 {t.favoriteSong}
                    </div>
                  </div>

                  {/* Calaverita / Eulogy Preview */}
                  <div className="mt-3 p-3 rounded-lg bg-amber-950/30 border border-amber-900/40 text-amber-200/90 text-xs italic whitespace-pre-wrap font-serif">
                    {t.calaverita}
                  </div>

                  {/* Actions: Export Card & Light Candle */}
                  <div className="mt-4 flex items-center justify-between gap-2">
                    <button
                      onClick={() =>
                        exportMemorialCard(
                          t.name,
                          t.relationship || "Ser Querido",
                          t.years || "En la eternidad",
                          t.favoriteMeal || "Ofrenda Tradicional",
                          t.calaverita || t.eulogy || t.cherishedMemory || "Recordar es vivir en el corazón de quienes amamos."
                        )
                      }
                      className="px-3 py-1.5 rounded-lg border border-amber-500/40 bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 text-xs font-mono flex items-center gap-1.5 transition-colors"
                    >
                      <Download className="w-3 h-3 text-amber-400" />
                      <span>Export Card (PNG)</span>
                    </button>

                    <button
                      onClick={() => {
                        setCandleTarget(t.name);
                        setLightModalOpen(true);
                      }}
                      className="px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-black font-bold text-xs flex items-center gap-1.5 transition-transform hover:scale-105"
                    >
                      <Flame className="w-3.5 h-3.5 fill-black" />
                      <span>Light Candle</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {filteredFamily.length === 0 && (
              <div className="text-center py-12 text-zinc-500 text-xs font-mono">
                No family tributes match &quot;{searchQuery}&quot;. Click &quot;Create Tribute&quot; to honor someone.
              </div>
            )}
          </div>
        )}

        {/* TAB 3: CREATE TRIBUTE */}
        {activeTab === "create" && (
          <div className="max-w-2xl mx-auto rounded-2xl border border-amber-800/40 bg-zinc-950/80 p-6 backdrop-blur-md shadow-2xl">
            <div className="text-center mb-6">
              <h3 className="text-xl font-bold text-amber-200">Recordar es Vivir // New Sacred Memory</h3>
              <p className="text-xs text-zinc-400 mt-1">
                Preserved locally on your machine. Our neural engine generates authentic 4-stanza Mexican Calaveritas
                and commemorative eulogies.
              </p>
            </div>

            <div className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-zinc-400 font-mono mb-1">Full Name of Departed *</label>
                  <input
                    type="text"
                    placeholder="e.g. Abuelito Carlos"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-zinc-900 border border-zinc-800 text-white placeholder-zinc-600 focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-zinc-400 font-mono mb-1">Relationship</label>
                  <input
                    type="text"
                    placeholder="e.g. Grandfather, Mother, Mentor"
                    value={formData.relationship}
                    onChange={(e) => setFormData({ ...formData, relationship: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-zinc-900 border border-zinc-800 text-white placeholder-zinc-600 focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-zinc-400 font-mono mb-1">Lifespan / Years</label>
                  <input
                    type="text"
                    placeholder="e.g. 1940 – 2022"
                    value={formData.years}
                    onChange={(e) => setFormData({ ...formData, years: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-zinc-900 border border-zinc-800 text-white placeholder-zinc-600 focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-zinc-400 font-mono mb-1">Favorite Altar Dish / Meal</label>
                  <input
                    type="text"
                    placeholder="e.g. Tamales de elote y chocolate"
                    value={formData.favoriteMeal}
                    onChange={(e) => setFormData({ ...formData, favoriteMeal: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-zinc-900 border border-zinc-800 text-white placeholder-zinc-600 focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-zinc-400 font-mono mb-1">Cherished Memory or Story</label>
                <textarea
                  rows={3}
                  placeholder="Tell a beloved story, their trademark advice, or how they touched your life..."
                  value={formData.cherishedMemory}
                  onChange={(e) => setFormData({ ...formData, cherishedMemory: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-zinc-900 border border-zinc-800 text-white placeholder-zinc-600 focus:outline-none focus:border-amber-500"
                />
              </div>

              {/* AI Generation Preview */}
              {generatedPreview && (
                <div className="p-4 rounded-xl bg-purple-950/30 border border-purple-800/40 text-purple-200 space-y-3">
                  <div>
                    <span className="text-[10px] font-mono text-purple-400 font-bold block mb-1">
                      GENERATED CALAVERITA LITERARIA:
                    </span>
                    <pre className="whitespace-pre-wrap font-sans text-xs italic leading-relaxed">
                      {generatedPreview.calaverita}
                    </pre>
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-purple-400 font-bold block mb-1">
                      COMMEMORATIVE EULOGY:
                    </span>
                    <p className="text-xs leading-relaxed italic">{generatedPreview.eulogy}</p>
                  </div>
                </div>
              )}

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={handleGenerateTributeAI}
                  disabled={!formData.name || isGeneratingAI}
                  className="flex-1 py-2.5 rounded-xl border border-purple-500/50 bg-purple-950/40 hover:bg-purple-900/40 text-purple-300 font-semibold flex items-center justify-center gap-2 transition-colors disabled:opacity-50"
                >
                  <Sparkles className="w-4 h-4 text-purple-400" />
                  <span>{isGeneratingAI ? "Weaving Poetry..." : "Generate AI Calaverita & Eulogy"}</span>
                </button>

                <button
                  type="button"
                  onClick={handleSaveTribute}
                  disabled={!formData.name}
                  className="flex-1 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-bold flex items-center justify-center gap-2 transition-transform hover:scale-105 disabled:opacity-50"
                >
                  <Flame className="w-4 h-4 fill-black" />
                  <span>Place on Altar</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Community Candle Vigil Stream */}
        <div className="mt-10 pt-6 border-t border-amber-900/30">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2 text-xs font-mono text-amber-400">
              <Flame className="w-4 h-4 fill-amber-400 candle-flame" />
              <span>COMMUNITY CANDLE VIGIL ({candles.length} Active Prayers)</span>
            </div>
            <button
              onClick={() => setLightModalOpen(true)}
              className="text-xs text-amber-400 hover:underline flex items-center gap-1 font-mono"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Light a Candle</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {candles.slice(0, 8).map((c) => (
              <div
                key={c.id}
                className="p-3 rounded-xl border border-amber-800/30 bg-zinc-950/60 backdrop-blur-sm relative overflow-hidden"
              >
                <div className="flex items-center justify-between text-[11px] font-mono text-amber-400">
                  <span className="truncate">{c.senderName}</span>
                  <span className="text-zinc-500 text-[10px]">{c.timestamp}</span>
                </div>
                <div className="text-[10px] text-zinc-400 mt-0.5 truncate">To: {c.altarTarget}</div>
                <p className="text-xs text-zinc-300 mt-2 italic leading-snug line-clamp-2">&quot;{c.message}&quot;</p>
                <div className="mt-2 flex items-center gap-1 text-[10px] text-amber-500">
                  <Flame className="w-3 h-3 fill-amber-500 candle-flame" />
                  <span>Candle burning</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Light Candle Modal */}
      {lightModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-zinc-950 border border-amber-800/80 rounded-2xl max-w-md w-full p-6 shadow-2xl relative">
            <h3 className="text-lg font-bold text-amber-200 flex items-center gap-2">
              <Flame className="w-5 h-5 fill-amber-400 text-amber-400 candle-flame" />
              <span>Encender una Vela Sagrada</span>
            </h3>
            <p className="text-xs text-zinc-400 mt-1">
              Add your prayer or blessing to the living vigil. Accompanied by a sacred 528Hz Solfeggio bell chime.
            </p>

            <div className="mt-4 space-y-3 text-xs">
              <div>
                <label className="block text-zinc-400 font-mono mb-1">Your Name or Pen Name *</label>
                <input
                  type="text"
                  placeholder="e.g. Maria or An Anonymous Pilgrim"
                  value={candleSender}
                  onChange={(e) => setCandleSender(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-zinc-900 border border-zinc-800 text-white placeholder-zinc-600 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-zinc-400 font-mono mb-1">Dedicated In Honor Of</label>
                <input
                  type="text"
                  placeholder="e.g. Ada Lovelace, Abuela Elena, or All Departed"
                  value={candleTarget}
                  onChange={(e) => setCandleTarget(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-zinc-900 border border-zinc-800 text-white placeholder-zinc-600 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-zinc-400 font-mono mb-1">Prayer, Gratitude, or Blessing *</label>
                <textarea
                  rows={3}
                  placeholder="Que la luz guíe tu camino en el Mictlán eterno..."
                  value={candleMessage}
                  onChange={(e) => setCandleMessage(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-zinc-900 border border-zinc-800 text-white placeholder-zinc-600 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setLightModalOpen(false)}
                  className="flex-1 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-400 border border-zinc-800 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleLightCandleSubmit}
                  disabled={!candleSender || !candleMessage}
                  className="flex-1 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-bold flex items-center justify-center gap-1.5 transition-transform hover:scale-105 disabled:opacity-50"
                >
                  <Flame className="w-4 h-4 fill-black" />
                  <span>Light Candle</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
