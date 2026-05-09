"use client";

import { useEffect } from "react";
import { useNutritionStore } from "@/store/nutritionStore";

export default function NutritionPage() {
  const { waterGlasses, updateWater, fetchNutrition, meals: MEALS, goals: DAILY_GOALS } = useNutritionStore();
  
  useEffect(() => {
    fetchNutrition();
  }, [fetchNutrition]);

  const all = MEALS.flatMap((s) => s.items);
  const totals = {
    cal: all.reduce((a, m) => a + m.cal, 0),
    p: all.reduce((a, m) => a + m.p, 0),
    c: all.reduce((a, m) => a + m.c, 0),
    f: all.reduce((a, m) => a + m.f, 0),
  };
  const calPct = Math.min(100, (totals.cal / DAILY_GOALS.calories) * 100);

  return (
    <div className="px-5 pt-2 pb-10 max-w-3xl mx-auto space-y-8">
      <div className="pt-2">
        <h2 style={{ fontFamily: "Lexend, sans-serif", fontSize: "22px", fontWeight: 600, color: "#F9FAFB" }}>Nutrition</h2>
        <p className="text-[14px] text-[#9CA3AF] mt-1">Fuel your performance.</p>
      </div>

      {/* Summary */}
      <div className="glass-card p-5">
        <div className="card-glow absolute inset-0 pointer-events-none" />
        <div className="relative z-10">
          <h3 className="mb-5" style={{ fontFamily: "Lexend, sans-serif", fontSize: "18px", fontWeight: 600, color: "#F9FAFB" }}>Daily Summary</h3>
          <div className="flex items-center gap-6 mb-6">
            <div className="relative w-[100px] h-[100px] flex-shrink-0">
              <svg width={100} height={100} viewBox="0 0 100 100" className="-rotate-90">
                <circle cx={50} cy={50} r={40} fill="transparent" stroke="#282933" strokeWidth={8} />
                <circle cx={50} cy={50} r={40} fill="transparent" stroke="#b8c4ff" strokeWidth={8}
                  strokeDasharray={251.2} strokeDashoffset={251.2 - (calPct/100)*251.2} strokeLinecap="round"
                  style={{ transition: "stroke-dashoffset 0.6s ease", filter: "drop-shadow(0 0 6px rgba(184,196,255,0.4))" }} />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center flex-col">
                <span className="text-[20px] font-bold text-[#F9FAFB]">{totals.cal}</span>
                <span className="text-[10px] text-[#9CA3AF]">/ {DAILY_GOALS.calories}</span>
              </div>
            </div>
            <div className="flex-1 space-y-3">
              {[
                { l: "Protein", v: totals.p, g: DAILY_GOALS.protein, c: "#b8c4ff" },
                { l: "Carbs", v: totals.c, g: DAILY_GOALS.carbs, c: "#7dffa2" },
                { l: "Fat", v: totals.f, g: DAILY_GOALS.fat, c: "#FFB300" },
              ].map((m) => (
                <div key={m.l}>
                  <div className="flex justify-between text-[11px] mb-1">
                    <span className="text-[#9CA3AF]">{m.l}</span>
                    <span className="text-[#F9FAFB] font-semibold">{m.v}g / {m.g}g</span>
                  </div>
                  <div className="w-full h-1.5 rounded-full bg-[#282933]">
                    <div className="h-full rounded-full transition-all duration-500" style={{ width: `${Math.min(100,(m.v/m.g)*100)}%`, background: m.c }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Meals */}
      <div className="space-y-4">
        <h3 style={{ fontFamily: "Lexend, sans-serif", fontSize: "18px", fontWeight: 600, color: "#F9FAFB" }}>Meals</h3>
        {MEALS.map((slot) => (
          <div key={slot.slot} className="solid-card p-4">
            <div className="card-glow absolute inset-0 pointer-events-none" />
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#b8c4ff]" style={{ fontVariationSettings: "'FILL' 1" }}>{slot.icon}</span>
                  <span className="text-[14px] font-semibold text-[#F9FAFB]">{slot.slot}</span>
                </div>
                <span className="text-[12px] text-[#9CA3AF]">{slot.items.reduce((a,m)=>a+m.cal,0)} cal</span>
              </div>
              {slot.items.length > 0 ? slot.items.map((meal, i) => (
                <div key={i} className="flex justify-between items-center py-2 px-3 rounded-lg bg-[#0c0e17]/50 border border-[#2D2D3A]/50 mb-1.5">
                  <span className="text-[13px] text-[#F9FAFB]">{meal.name}</span>
                  <span className="text-[12px] text-[#9CA3AF]">{meal.cal} cal</span>
                </div>
              )) : <p className="text-[12px] text-[#4B5563] italic">No meals logged yet</p>}
              <button className="mt-3 w-full h-[40px] rounded-lg border border-[#b8c4ff]/30 text-[#b8c4ff] text-[12px] font-semibold uppercase tracking-widest flex items-center justify-center gap-1.5 transition-all hover:bg-[#b8c4ff]/5">
                <span className="material-symbols-outlined text-[16px]">add</span> Add Food
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Water */}
      <div className="glass-card p-5">
        <div className="card-glow absolute inset-0 pointer-events-none" />
        <div className="relative z-10">
          <div className="flex justify-between items-center mb-4">
            <h3 style={{ fontFamily: "Lexend, sans-serif", fontSize: "18px", fontWeight: 600, color: "#F9FAFB" }}>Hydration</h3>
            <span className="text-[14px] font-semibold text-[#b8c4ff]">{waterGlasses} / 8</span>
          </div>
          <div className="flex justify-between gap-2">
            {Array.from({length:8},(_,i) => (
              <button key={i} onClick={() => updateWater(i+1)}
                className="flex-1 flex flex-col items-center py-2 rounded-xl transition-all"
                style={{
                  background: i < waterGlasses ? "rgba(184,196,255,0.08)" : "rgba(12,14,23,0.5)",
                  border: `1px solid ${i < waterGlasses ? "rgba(184,196,255,0.2)" : "rgba(45,45,58,0.5)"}`,
                }}>
                <span className="material-symbols-outlined text-[24px]"
                  style={{ color: i < waterGlasses ? "#b8c4ff" : "#434656", fontVariationSettings: i < waterGlasses ? "'FILL' 1" : "'FILL' 0" }}>
                  water_drop
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
