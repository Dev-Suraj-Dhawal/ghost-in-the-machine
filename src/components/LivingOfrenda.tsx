"use client";

import React, { useState, useEffect, useRef } from "react";
import { Flame, Sparkles, Heart, Plus, Download, Share2, Music, Coffee, BookOpen, User, Volume2 } from "lucide-react";
import { DEPARTED_PIONEERS, generateCalaverita, generateSacredEulogy } from "@/lib/aiEngine";
import { DepartedPioneer, RemembranceTribute, LitCandle } from "@/lib/types";
import { sound } from "@/lib/soundEngine";
import confetti from "canvas-confetti";

interface LivingOfrendaProps {
  onBackToTerminal?: () => void;
}

export default function LivingOfrenda({ onBackToTerminal }: LivingOfrendaProps) {
  const [pioneers, setPioneers] = useState<DepartedPioneer[]>(DEPARTED_PIONEERS);
  const [customTributes, setCustomTributes] = useState<RemembranceTribute[]>([
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
  ]);

  // Candle Lighting State
  const [candles, setCandles] = useState<LitCandle[]>([
    { id: "c-1", senderName: "Suraj", message: "Eternal gratitude to the souls of computing.", altarTarget: "All Departed", timestamp: "Just now", flameIntensity: 1 },
    { id: "c-2", senderName: "Maria", message: "Para que tu camino esté siempre lleno de flores.", altarTarget: "Abuela Elena", timestamp: "5m ago", flameIntensity: 1 },
  ]);

  const [activeTab, setActiveTab] = useState<"pioneers" | "family" | "create">("pioneers");
  const [selectedPioneer, setSelectedPioneer] = useState<DepartedPioneer | null>(DEPARTED_PIONEERS[0]);

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
    const petals: Petal[] = Array.from({ length: 38 }, () => ({
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
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleLightCandleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!candleSender.trim()) return;

    sound.playCandleChime();

    // Trigger golden celebratory confetti
    confetti({
      particleCount: 40,
      spread: 60,
      origin: { y: 0.7 },
      colors: ["#f59e0b", "#fbbf24", "#ea580c", "#d97706"],
    });

    const newCandle: LitCandle = {
      id: "c-" + Date.now(),
      senderName: candleSender.trim(),
      message: candleMessage.trim() || "Que su luz ilumine el camino de regreso.",
      altarTarget: candleTarget,
      timestamp: "Just now",
      flameIntensity: 1.2,
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
      const calaverita = generateCalaverita(formData.name, formData.relationship, formData.favoriteMeal, formData.cherishedMemory);
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
      photoUrl: formData.photoUrl || "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80",
      candleCount: 3,
      calaverita: generatedPreview?.calaverita || generateCalaverita(formData.name, formData.relationship, formData.favoriteMeal, formData.cherishedMemory),
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
            <div className="w-8 h-7 rounded-b-md border-b-2 border-dashed flex items-center justify-center bg-zinc-950/40" style={{ borderColor: c }}>
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
        <h2 className="text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-orange-400 to-amber-200 tracking-tight">
          El Gran Altar de la Máquina
        </h2>
        <p className="mt-2 text-sm sm:text-base text-amber-200/80 max-w-2xl mx-auto font-sans">
          Where open-source AI honors the departed. No cloud servers, no corporate data mining. Your sacred family memories and historical computing tributes remain eternal and 100% private.
        </p>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center justify-center gap-3 mt-6">
          <button
            onClick={() => setActiveTab("pioneers")}
            className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all ${
              activeTab === "pioneers"
                ? "bg-amber-500 text-black shadow-lg shadow-amber-500/20 font-bold"
                : "bg-zinc-900/80 border border-zinc-700 text-amber-200/80 hover:bg-zinc-800"
            }`}
          >
            Computing Pioneers ({pioneers.length})
          </button>
          <button
            onClick={() => setActiveTab("family")}
            className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all ${
              activeTab === "family"
                ? "bg-amber-500 text-black shadow-lg shadow-amber-500/20 font-bold"
                : "bg-zinc-900/80 border border-zinc-700 text-amber-200/80 hover:bg-zinc-800"
            }`}
          >
            Family & Loved Ones ({customTributes.length})
          </button>
          <button
            onClick={() => setActiveTab("create")}
            className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all flex items-center gap-1.5 ${
              activeTab === "create"
                ? "bg-orange-600 text-white shadow-lg shadow-orange-600/30 font-bold"
                : "bg-orange-950/40 border border-orange-700/60 text-orange-300 hover:bg-orange-900/40"
            }`}
          >
            <Plus className="w-4 h-4" />
            Light a New Ofrenda
          </button>
          <button
            onClick={() => setLightModalOpen(true)}
            className="px-4 py-2 rounded-lg text-xs sm:text-sm font-medium bg-amber-950/60 border border-amber-500/50 text-amber-300 hover:bg-amber-900/50 transition-all flex items-center gap-1.5"
          >
            <Flame className="w-4 h-4 text-amber-400 candle-flame" />
            Offer a Candle ({candles.length})
          </button>
        </div>
      </div>

      {/* Main Altar Body */}
      <div className="p-6 sm:p-8 relative z-20">
        {/* TAB 1: PIONEERS */}
        {activeTab === "pioneers" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Pioneer Grid Selector */}
            <div className="lg:col-span-1 space-y-3">
              <h3 className="text-xs font-mono uppercase tracking-widest text-amber-400/80 flex items-center gap-2">
                <span>Departed Architects</span>
              </h3>
              <div className="space-y-2">
                {pioneers.map((p) => {
                  const isSelected = selectedPioneer?.id === p.id;
                  return (
                    <div
                      key={p.id}
                      onClick={() => {
                        setSelectedPioneer(p);
                        sound.playCandleChime();
                      }}
                      className={`p-3 rounded-xl border cursor-pointer transition-all flex items-center gap-3 ${
                        isSelected
                          ? "bg-amber-950/60 border-amber-500/80 shadow-md shadow-amber-500/10"
                          : "bg-zinc-950/60 border-zinc-800/80 hover:border-amber-700/50 hover:bg-zinc-900/40"
                      }`}
                    >
                      <img
                        src={p.avatarUrl}
                        alt={p.name}
                        className="w-12 h-12 rounded-lg object-cover border border-amber-600/50 shadow-inner"
                      />
                      <div className="min-w-0 flex-1">
                        <div className="text-sm font-bold text-amber-200 truncate">{p.name}</div>
                        <div className="text-xs text-zinc-400 truncate">{p.lifespan}</div>
                      </div>
                      <div className="candle-flame text-amber-400">
                        <Flame className="w-4 h-4 fill-amber-400/30" />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Selected Pioneer Detailed Altar Card */}
            {selectedPioneer && (
              <div className="lg:col-span-2 rounded-2xl border border-amber-700/40 bg-zinc-950/70 p-6 relative overflow-hidden backdrop-blur-md">
                <div className="absolute top-0 right-0 p-4">
                  <div className="flex items-center gap-2 text-xs font-mono text-amber-400 bg-amber-950/40 px-3 py-1.5 rounded-full border border-amber-700/50">
                    <Flame className="w-3.5 h-3.5 candle-flame fill-amber-400" />
                    <span>Ofrenda Activa</span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5">
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
                  <div className="text-xs font-mono text-purple-400 font-bold uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-purple-400" />
                    <span>Calaverita Literaria (AI Generated Folk Rhyme)</span>
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
              {customTributes.map((t) => (
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

                      <div className="mt-2 text-xs text-zinc-300 line-clamp-2 italic">&quot;{t.cherishedMemory}&quot;</div>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-zinc-800/80 grid grid-cols-2 gap-2 text-xs text-zinc-400 font-mono">
                    <div className="flex items-center gap-1.5">
                      <Coffee className="w-3.5 h-3.5 text-amber-400" />
                      <span className="truncate">{t.favoriteMeal}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Music className="w-3.5 h-3.5 text-purple-400" />
                      <span className="truncate">{t.favoriteSong}</span>
                    </div>
                  </div>

                  {t.eulogy && (
                    <div className="mt-3 p-3 rounded-lg bg-amber-950/20 border border-amber-900/40 text-xs text-amber-200/90 leading-relaxed font-sans">
                      {t.eulogy}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: CREATE NEW OFRENDA FORM */}
        {activeTab === "create" && (
          <div className="max-w-2xl mx-auto rounded-2xl border border-orange-800/50 bg-zinc-950/80 p-6 sm:p-8 backdrop-blur-md">
            <h3 className="text-xl font-bold text-orange-300 flex items-center gap-2">
              <Plus className="w-5 h-5 text-orange-400" />
              Build a Memorial Ofrenda
            </h3>
            <p className="text-xs text-zinc-400 mt-1">
              Honor your ancestor, departed loved one, or pioneer. Our open-source offline AI synthesizes a personalized Calaverita poem and sacred remembrance without sending your family stories to any corporate cloud.
            </p>

            <div className="mt-6 space-y-4 text-xs sm:text-sm font-sans">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-mono text-zinc-300 text-xs mb-1">Name of Loved One *</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Abuelita Rosa"
                    className="w-full px-3 py-2 rounded-lg bg-zinc-900 border border-zinc-700 text-white outline-none focus:border-amber-500"
                  />
                </div>
                <div>
                  <label className="block font-mono text-zinc-300 text-xs mb-1">Relationship</label>
                  <input
                    type="text"
                    value={formData.relationship}
                    onChange={(e) => setFormData({ ...formData, relationship: e.target.value })}
                    placeholder="e.g. Grandmother, Mentor, Brother"
                    className="w-full px-3 py-2 rounded-lg bg-zinc-900 border border-zinc-700 text-white outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-mono text-zinc-300 text-xs mb-1">Favorite Food / Offering</label>
                  <input
                    type="text"
                    value={formData.favoriteMeal}
                    onChange={(e) => setFormData({ ...formData, favoriteMeal: e.target.value })}
                    placeholder="e.g. Tamales de dulce con canela"
                    className="w-full px-3 py-2 rounded-lg bg-zinc-900 border border-zinc-700 text-white outline-none focus:border-amber-500"
                  />
                </div>
                <div>
                  <label className="block font-mono text-zinc-300 text-xs mb-1">Favorite Song / Melody</label>
                  <input
                    type="text"
                    value={formData.favoriteSong}
                    onChange={(e) => setFormData({ ...formData, favoriteSong: e.target.value })}
                    placeholder="e.g. Cielito Lindo"
                    className="w-full px-3 py-2 rounded-lg bg-zinc-900 border border-zinc-700 text-white outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div>
                <label className="block font-mono text-zinc-300 text-xs mb-1">Cherished Memory or Story</label>
                <textarea
                  rows={3}
                  value={formData.cherishedMemory}
                  onChange={(e) => setFormData({ ...formData, cherishedMemory: e.target.value })}
                  placeholder="Share a moment that brings them alive: their smile, their advice, a rainy afternoon..."
                  className="w-full px-3 py-2 rounded-lg bg-zinc-900 border border-zinc-700 text-white outline-none focus:border-amber-500 resize-none"
                />
              </div>

              <div>
                <label className="block font-mono text-zinc-300 text-xs mb-1">Photo URL (Optional)</label>
                <input
                  type="text"
                  value={formData.photoUrl}
                  onChange={(e) => setFormData({ ...formData, photoUrl: e.target.value })}
                  placeholder="https://... or leave blank for a default candle portrait"
                  className="w-full px-3 py-2 rounded-lg bg-zinc-900 border border-zinc-700 text-white outline-none focus:border-amber-500"
                />
              </div>

              {/* Generate AI Button */}
              <div className="pt-2 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={handleGenerateTributeAI}
                  disabled={!formData.name || isGeneratingAI}
                  className="px-4 py-2.5 rounded-lg bg-gradient-to-r from-amber-500 to-orange-500 text-black font-bold text-xs flex items-center gap-2 hover:opacity-90 disabled:opacity-50 transition-all shadow-md"
                >
                  <Sparkles className="w-4 h-4" />
                  {isGeneratingAI ? "Weaving Poetry..." : "Weave AI Calaverita & Eulogy"}
                </button>

                {generatedPreview && (
                  <button
                    type="button"
                    onClick={handleSaveTribute}
                    className="px-5 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-2 transition-all shadow-md"
                  >
                    <Heart className="w-4 h-4 fill-white" />
                    Place on Sacred Altar
                  </button>
                )}
              </div>

              {/* AI Preview Box */}
              {generatedPreview && (
                <div className="mt-4 p-4 rounded-xl bg-amber-950/30 border border-amber-600/50 space-y-3">
                  <div className="text-xs font-mono text-amber-400 font-bold uppercase tracking-wider flex items-center gap-1.5">
                    <Sparkles className="w-3 h-3" />
                    Generated Calaverita Verses:
                  </div>
                  <pre className="whitespace-pre-wrap font-sans text-xs italic text-amber-200 leading-relaxed bg-black/30 p-3 rounded-lg border border-amber-900/40">
                    {generatedPreview.calaverita}
                  </pre>

                  <div className="text-xs font-mono text-amber-400 font-bold uppercase tracking-wider flex items-center gap-1.5 pt-2">
                    <BookOpen className="w-3 h-3" />
                    Sacred Digital Eulogy:
                  </div>
                  <p className="font-sans text-xs text-zinc-300 leading-relaxed bg-black/30 p-3 rounded-lg border border-amber-900/40">
                    {generatedPreview.eulogy}
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Community Candle Vigil Stream */}
      <div className="px-6 py-5 border-t border-amber-900/40 bg-black/50 relative z-20">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-mono uppercase tracking-widest text-amber-400 flex items-center gap-1.5">
            <Flame className="w-3.5 h-3.5 candle-flame fill-amber-400" />
            Vigilia de Velas // Recent Candles Lit ({candles.length})
          </span>
          <button
            onClick={() => setLightModalOpen(true)}
            className="text-xs text-amber-300 hover:text-amber-200 underline font-mono flex items-center gap-1"
          >
            + Light your candle
          </button>
        </div>

        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-none">
          {candles.map((c) => (
            <div
              key={c.id}
              className="p-3 rounded-xl bg-zinc-950/70 border border-amber-700/40 min-w-[220px] max-w-[260px] shrink-0 font-sans text-xs shadow-md"
            >
              <div className="flex items-center justify-between text-[11px] text-amber-400 font-mono">
                <span className="font-bold">{c.senderName}</span>
                <span className="text-zinc-500">{c.timestamp}</span>
              </div>
              <p className="mt-1 text-zinc-300 italic line-clamp-2">&quot;{c.message}&quot;</p>
              <div className="mt-2 flex items-center gap-1 text-[10px] text-amber-500 font-mono">
                <Flame className="w-3 h-3 candle-flame fill-amber-400" />
                <span>Para: {c.altarTarget}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal: Light a Candle */}
      {lightModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-2xl border border-amber-600/60 bg-zinc-950 p-6 shadow-2xl relative">
            <h4 className="text-xl font-bold text-amber-300 flex items-center gap-2">
              <Flame className="w-5 h-5 text-amber-400 candle-flame fill-amber-400" />
              Light an Altar Candle
            </h4>
            <p className="text-xs text-zinc-400 mt-1">
              Leave a glowing candle on the virtual ofrenda. Each candle guides the spirits back with light and warmth.
            </p>

            <form onSubmit={handleLightCandleSubmit} className="mt-4 space-y-3 font-sans text-xs sm:text-sm">
              <div>
                <label className="block font-mono text-zinc-300 text-xs mb-1">Your Name</label>
                <input
                  type="text"
                  required
                  value={candleSender}
                  onChange={(e) => setCandleSender(e.target.value)}
                  placeholder="e.g. Suraj Dhawal"
                  className="w-full px-3 py-2 rounded-lg bg-zinc-900 border border-zinc-700 text-white outline-none focus:border-amber-500 text-xs"
                />
              </div>

              <div>
                <label className="block font-mono text-zinc-300 text-xs mb-1">Dedicated To</label>
                <input
                  type="text"
                  value={candleTarget}
                  onChange={(e) => setCandleTarget(e.target.value)}
                  placeholder="e.g. Ada Lovelace, or a family member"
                  className="w-full px-3 py-2 rounded-lg bg-zinc-900 border border-zinc-700 text-white outline-none focus:border-amber-500 text-xs"
                />
              </div>

              <div>
                <label className="block font-mono text-zinc-300 text-xs mb-1">Blessing or Remembrance Message</label>
                <textarea
                  rows={2}
                  value={candleMessage}
                  onChange={(e) => setCandleMessage(e.target.value)}
                  placeholder="Que tu luz jamás se apague en nuestra memoria..."
                  className="w-full px-3 py-2 rounded-lg bg-zinc-900 border border-zinc-700 text-white outline-none focus:border-amber-500 resize-none text-xs"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setLightModalOpen(false)}
                  className="px-3 py-2 rounded-lg bg-zinc-800 text-zinc-300 text-xs hover:bg-zinc-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-amber-500 text-black font-bold text-xs hover:bg-amber-400 flex items-center gap-1.5 shadow-md"
                >
                  <Flame className="w-4 h-4 fill-black" />
                  Light Flame
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

