"use client";

import { useState } from "react";
import { ProgressRing } from "@/components/ui/ProgressRing";

const MUSCLE_GROUPS = [
  { id: "chest", label: "Chest", x: 42, y: 22, soreness: 1 },
  { id: "shoulders", label: "Shoulders", x: 28, y: 18, soreness: 0 },
  { id: "biceps", label: "Biceps", x: 22, y: 30, soreness: 2 },
  { id: "abs", label: "Abs", x: 42, y: 36, soreness: 0 },
  { id: "quads", label: "Quads", x: 36, y: 55, soreness: 4 },
  { id: "calves", label: "Calves", x: 36, y: 75, soreness: 3 },
  { id: "traps", label: "Traps", x: 60, y: 16, soreness: 1 },
  { id: "lats", label: "Lats", x: 62, y: 28, soreness: 0 },
  { id: "lower_back", label: "Lower Back", x: 62, y: 38, soreness: 2 },
  { id: "glutes", label: "Glutes", x: 62, y: 46, soreness: 1 },
  { id: "hamstrings", label: "Hamstrings", x: 62, y: 58, soreness: 3 },
];

const HRV_DATA = [52, 58, 55, 62, 60, 65, 58, 63, 70, 68, 72, 65, 68, 74];

const sorenessColor = (level: number) => {
  if (level === 0) return "#7dffa2";
  if (level <= 1) return "#b8c4ff";
  if (level <= 2) return "#FFB300";
  if (level <= 3) return "#FF8C00";
  return "#FF4757";
};

export default function RecoveryPage() {
  const [view, setView] = useState<"front" | "back">("front");
  const [selectedMuscle, setSelectedMuscle] = useState<string | null>(null);

  const recoveryScore = 82;
  const sleepWeight = 40;
  const hrvWeight = 30;
  const rhrWeight = 15;
  const sorenessWeight = 15;

  return (
    <div className="px-5 pt-2 pb-10 max-w-3xl mx-auto space-y-8">
      {/* Header */}
      <div className="pt-2">
        <h2 style={{ fontFamily: "Lexend, sans-serif", fontSize: "22px", fontWeight: 600, color: "#F9FAFB" }}>
          Recovery Intelligence
        </h2>
        <p className="text-[14px] text-[#9CA3AF] mt-1">Understand your body, train smarter.</p>
      </div>

      {/* Recovery Score Detail Card */}
      <div className="glass-card p-5">
        <div className="card-glow absolute inset-0 pointer-events-none" />
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-6">
            <h3 style={{ fontFamily: "Lexend, sans-serif", fontSize: "18px", fontWeight: 600, color: "#F9FAFB" }}>Recovery Score</h3>
            <span className="text-[11px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full border text-[#7dffa2] bg-[#7dffa2]/10 border-[#7dffa2]/20">
              Optimal
            </span>
          </div>

          <div className="flex items-center gap-8 mb-6">
            <ProgressRing value={recoveryScore} color="secondary" size={120} />
            <div className="flex-1 space-y-3">
              {[
                { label: "Sleep Quality", weight: sleepWeight, value: 88, color: "#b8c4ff" },
                { label: "HRV", weight: hrvWeight, value: 76, color: "#7dffa2" },
                { label: "Resting HR", weight: rhrWeight, value: 85, color: "#FFB300" },
                { label: "Soreness", weight: sorenessWeight, value: 70, color: "#A855F7" },
              ].map((item) => (
                <div key={item.label}>
                  <div className="flex justify-between text-[11px] mb-1">
                    <span className="text-[#9CA3AF]">{item.label} ({item.weight}%)</span>
                    <span className="text-[#F9FAFB] font-semibold">{item.value}%</span>
                  </div>
                  <div className="w-full h-1.5 rounded-full bg-[#282933]">
                    <div className="h-full rounded-full transition-all duration-700" style={{ width: `${item.value}%`, background: item.color }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Readiness Gauge */}
      <div className="solid-card p-5">
        <div className="card-glow absolute inset-0 pointer-events-none" />
        <div className="relative z-10">
          <h3 style={{ fontFamily: "Lexend, sans-serif", fontSize: "18px", fontWeight: 600, color: "#F9FAFB", marginBottom: "16px" }}>
            Training Readiness
          </h3>
          <div className="grid grid-cols-4 gap-2">
            {[
              { label: "Rest", range: "0–40", active: false, color: "#FF4757" },
              { label: "Easy", range: "40–60", active: false, color: "#FFB300" },
              { label: "Moderate", range: "60–80", active: true, color: "#b8c4ff" },
              { label: "Intense", range: "80–100", active: false, color: "#7dffa2" },
            ].map((level) => (
              <div key={level.label} className="flex flex-col items-center gap-2 p-3 rounded-xl transition-all"
                style={{
                  background: level.active ? `${level.color}10` : "rgba(12,14,23,0.5)",
                  border: `1px solid ${level.active ? `${level.color}33` : "rgba(45,45,58,0.5)"}`,
                  boxShadow: level.active ? `0 0 20px ${level.color}15` : "none",
                }}>
                <div className="w-3 h-3 rounded-full" style={{ background: level.color, boxShadow: level.active ? `0 0 8px ${level.color}` : "none" }} />
                <span className="text-[12px] font-semibold" style={{ color: level.active ? level.color : "#9CA3AF" }}>{level.label}</span>
                <span className="text-[10px] text-[#4B5563]">{level.range}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Interactive Muscle Map */}
      <div className="glass-card p-5">
        <div className="card-glow absolute inset-0 pointer-events-none" />
        <div className="relative z-10">
          <div className="flex justify-between items-center mb-5">
            <h3 style={{ fontFamily: "Lexend, sans-serif", fontSize: "18px", fontWeight: 600, color: "#F9FAFB" }}>Muscle Status</h3>
            <div className="flex gap-2">
              {(["front", "back"] as const).map((v) => (
                <button key={v} onClick={() => setView(v)}
                  className="px-3 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-widest transition-all"
                  style={{
                    background: view === v ? "#1a56ff" : "transparent",
                    color: view === v ? "white" : "#9CA3AF",
                    border: view === v ? "none" : "1px solid #2D2D3A",
                  }}>
                  {v}
                </button>
              ))}
            </div>
          </div>

          <div className="relative w-full max-w-[280px] mx-auto h-[360px]">
            {/* Body silhouette placeholder */}
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="material-symbols-outlined text-[200px] text-[#282933]" style={{ fontVariationSettings: "'FILL' 0, 'wght' 100" }}>
                {view === "front" ? "person" : "person"}
              </span>
            </div>

            {/* Muscle hotspots */}
            {MUSCLE_GROUPS
              .filter((m) => view === "front" ? m.x < 50 : m.x >= 50)
              .map((muscle) => (
                <button key={muscle.id} onClick={() => setSelectedMuscle(muscle.id === selectedMuscle ? null : muscle.id)}
                  className="absolute w-8 h-8 rounded-full flex items-center justify-center transition-all"
                  style={{
                    left: `${muscle.x}%`,
                    top: `${muscle.y}%`,
                    transform: "translate(-50%, -50%)",
                    background: `${sorenessColor(muscle.soreness)}20`,
                    border: `2px solid ${sorenessColor(muscle.soreness)}`,
                    boxShadow: selectedMuscle === muscle.id ? `0 0 20px ${sorenessColor(muscle.soreness)}40` : "none",
                  }}>
                  <span className="text-[10px] font-bold" style={{ color: sorenessColor(muscle.soreness) }}>{muscle.soreness}</span>
                </button>
              ))}
          </div>

          {/* Selected muscle detail */}
          {selectedMuscle && (() => {
            const m = MUSCLE_GROUPS.find((mg) => mg.id === selectedMuscle);
            if (!m) return null;
            return (
              <div className="mt-4 p-3 rounded-xl flex items-center justify-between" style={{ background: `${sorenessColor(m.soreness)}08`, border: `1px solid ${sorenessColor(m.soreness)}20` }}>
                <div>
                  <p className="text-[14px] font-semibold text-[#F9FAFB]">{m.label}</p>
                  <p className="text-[12px] text-[#9CA3AF]">Soreness Level: {m.soreness}/5</p>
                </div>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((n) => (
                    <div key={n} className="w-4 h-4 rounded-full" style={{ background: n <= m.soreness ? sorenessColor(m.soreness) : "#282933" }} />
                  ))}
                </div>
              </div>
            );
          })()}

          {/* Legend */}
          <div className="flex justify-center gap-4 mt-4 flex-wrap">
            {[
              { label: "Fresh", color: "#7dffa2" },
              { label: "Light", color: "#b8c4ff" },
              { label: "Moderate", color: "#FFB300" },
              { label: "Sore", color: "#FF8C00" },
              { label: "Very Sore", color: "#FF4757" },
            ].map((l) => (
              <div key={l.label} className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full" style={{ background: l.color }} />
                <span className="text-[10px] text-[#9CA3AF]">{l.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* HRV Trend Chart */}
      <div className="glass-card p-5">
        <div className="card-glow absolute inset-0 pointer-events-none" />
        <div className="relative z-10">
          <div className="flex justify-between items-center mb-5">
            <h3 style={{ fontFamily: "Lexend, sans-serif", fontSize: "18px", fontWeight: 600, color: "#F9FAFB" }}>HRV Trend</h3>
            <span className="text-[12px] text-[#9CA3AF]">14 days</span>
          </div>
          <div className="relative h-40">
            <svg viewBox="0 0 100 60" className="w-full h-full" preserveAspectRatio="none">
              <defs>
                <linearGradient id="hrvGrad" x1="0%" x2="0%" y1="0%" y2="100%">
                  <stop offset="0%" stopColor="#7dffa2" stopOpacity="0.15" />
                  <stop offset="100%" stopColor="#7dffa2" stopOpacity="0" />
                </linearGradient>
              </defs>
              {/* Area */}
              <path d={`M${HRV_DATA.map((v, i) => `${(i / (HRV_DATA.length - 1)) * 100},${60 - ((v - 40) / 40) * 60}`).join(" L")} L100,60 L0,60 Z`}
                fill="url(#hrvGrad)" />
              {/* Line */}
              <path d={`M${HRV_DATA.map((v, i) => `${(i / (HRV_DATA.length - 1)) * 100},${60 - ((v - 40) / 40) * 60}`).join(" L")}`}
                fill="none" stroke="#7dffa2" strokeWidth="2" strokeLinecap="round"
                style={{ filter: "drop-shadow(0 0 8px rgba(125,255,162,0.6))" }} />
              {/* Current point */}
              <circle cx="100" cy={60 - ((HRV_DATA[HRV_DATA.length - 1] - 40) / 40) * 60} r="3" fill="#7dffa2" stroke="white" strokeWidth="2" />
            </svg>
          </div>
          <div className="flex justify-between mt-2">
            <span className="text-[10px] text-[#4B5563]">Apr 25</span>
            <span className="text-[10px] text-[#7dffa2] font-semibold">Current: {HRV_DATA[HRV_DATA.length - 1]}ms</span>
            <span className="text-[10px] text-[#4B5563]">May 8</span>
          </div>
        </div>
      </div>

      {/* Recovery Tips */}
      <div className="space-y-3">
        <h3 style={{ fontFamily: "Lexend, sans-serif", fontSize: "18px", fontWeight: 600, color: "#F9FAFB" }}>AI Recovery Tips</h3>
        {[
          { icon: "bedtime", tip: "Sleep 30 minutes more tonight to boost recovery by ~8%.", color: "#b8c4ff" },
          { icon: "self_improvement", tip: "Foam roll quads and hamstrings — soreness is above average.", color: "#FFB300" },
          { icon: "water_drop", tip: "Increase water intake by 500ml today for better HRV.", color: "#7dffa2" },
        ].map((t, i) => (
          <div key={i} className="solid-card p-4 flex items-start gap-3">
            <div className="card-glow absolute inset-0 pointer-events-none" />
            <span className="material-symbols-outlined relative z-10 mt-0.5" style={{ color: t.color, fontVariationSettings: "'FILL' 1" }}>{t.icon}</span>
            <p className="text-[14px] text-[#9CA3AF] relative z-10">{t.tip}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
