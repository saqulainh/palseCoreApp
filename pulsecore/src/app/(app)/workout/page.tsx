"use client";

import { useState } from "react";
import Link from "next/link";

const TODAY_WORKOUT = {
  name: "HIIT: Metcon Blast",
  duration: "45 MIN",
  exercises: [
    { name: "Kettlebell Swings", sets: 4, reps: 15, weight: "24kg" },
    { name: "Box Jumps", sets: 4, reps: 12, weight: "BW" },
    { name: "Burpees", sets: 3, reps: 10, weight: "BW" },
    { name: "Battle Ropes", sets: 4, reps: "30s", weight: "—" },
    { name: "Thrusters", sets: 4, reps: 10, weight: "40kg" },
  ],
};

const RECENT_WORKOUTS = [
  { id: 1, name: "Upper Body Push", date: "May 7", duration: "52 min", volume: "4,200 kg", icon: "fitness_center" },
  { id: 2, name: "Lower Body Strength", date: "May 6", duration: "58 min", volume: "6,100 kg", icon: "directions_run" },
  { id: 3, name: "Pull Day + Core", date: "May 5", duration: "48 min", volume: "3,800 kg", icon: "fitness_center" },
  { id: 4, name: "Active Recovery", date: "May 4", duration: "30 min", volume: "—", icon: "self_improvement" },
];

const MUSCLE_GROUPS = ["All", "Chest", "Back", "Legs", "Shoulders", "Arms", "Core"];

export default function WorkoutPage() {
  const [activeTab, setActiveTab] = useState<"today" | "library" | "history">("today");
  const [selectedMuscle, setSelectedMuscle] = useState("All");
  const [search, setSearch] = useState("");

  return (
    <div className="px-5 pt-2 pb-10 max-w-3xl mx-auto">
      {/* Page Header */}
      <div className="pt-2 mb-6">
        <h2 style={{ fontFamily: "Lexend, sans-serif", fontSize: "22px", fontWeight: 600, color: "#F9FAFB" }}>
          Workouts
        </h2>
        <p className="text-[14px] text-[#9CA3AF] mt-1">Train smarter, recover faster.</p>
      </div>

      {/* Tab Navigation */}
      <div className="flex gap-2 mb-6">
        {([["today", "Today"], ["library", "Library"], ["history", "History"]] as const).map(([key, label]) => (
          <button
            key={key}
            onClick={() => setActiveTab(key)}
            className="px-4 py-2 rounded-full text-[11px] font-bold uppercase tracking-widest transition-all"
            style={{
              background: activeTab === key ? "#1a56ff" : "transparent",
              color: activeTab === key ? "white" : "#9CA3AF",
              border: activeTab === key ? "none" : "1px solid #2D2D3A",
              boxShadow: activeTab === key ? "0 4px 16px rgba(26,86,255,0.3)" : "none",
            }}
          >
            {label}
          </button>
        ))}
      </div>

      {/* ═══ TODAY TAB ═══ */}
      {activeTab === "today" && (
        <div className="space-y-6 animate-fade-in">
          {/* Today's Workout Card */}
          <div className="solid-card p-5">
            <div className="card-glow absolute inset-0 pointer-events-none" />
            <div className="relative z-10">
              <div className="flex justify-between items-center mb-4">
                <h3 style={{ fontFamily: "Lexend, sans-serif", fontSize: "18px", fontWeight: 600, color: "#F9FAFB" }}>
                  Today&apos;s Session
                </h3>
                <span className="text-[11px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full border text-[#b8c4ff] bg-[#b8c4ff]/10 border-[#b8c4ff]/20">
                  {TODAY_WORKOUT.duration}
                </span>
              </div>
              <h4 style={{ fontFamily: "Lexend, sans-serif", fontSize: "28px", fontWeight: 700, color: "#F9FAFB", marginBottom: "16px", letterSpacing: "-0.02em" }}>
                {TODAY_WORKOUT.name}
              </h4>

              {/* Exercise List */}
              <div className="space-y-3 mb-6">
                {TODAY_WORKOUT.exercises.map((ex, i) => (
                  <div key={i} className="flex items-center justify-between py-3 px-4 rounded-xl border border-[#2D2D3A]/50 bg-[#0c0e17]/50">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-[#1a56ff]/10 flex items-center justify-center">
                        <span className="text-[14px] font-bold text-[#b8c4ff]">{i + 1}</span>
                      </div>
                      <span className="text-[14px] text-[#F9FAFB] font-medium">{ex.name}</span>
                    </div>
                    <div className="flex items-center gap-3 text-[12px] text-[#9CA3AF]">
                      <span>{ex.sets}×{ex.reps}</span>
                      <span className="text-[#4B5563]">|</span>
                      <span>{ex.weight}</span>
                    </div>
                  </div>
                ))}
              </div>

              <Link href="/workout/active"
                className="w-full h-[56px] rounded-xl flex items-center justify-center gap-2 text-[18px] font-semibold transition-all active:scale-[0.97] hover:opacity-90"
                style={{ fontFamily: "Lexend, sans-serif", background: "#b8c4ff", color: "#002584", boxShadow: "inset 0 1px 1px rgba(255,255,255,0.4), inset 0 -1px 1px rgba(0,0,0,0.2), 0 8px 24px rgba(184,196,255,0.2)" }}>
                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>play_arrow</span>
                Start Workout
              </Link>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-2 gap-4">
            <button className="glass-card p-4 flex flex-col items-center gap-2 transition-all hover:border-[#b8c4ff]/20">
              <div className="card-glow absolute inset-0 pointer-events-none" />
              <span className="material-symbols-outlined text-[#7dffa2] text-3xl relative z-10" style={{ fontVariationSettings: "'FILL' 1" }}>add_circle</span>
              <span className="text-[12px] font-semibold text-[#F9FAFB] relative z-10">Custom Workout</span>
            </button>
            <button className="glass-card p-4 flex flex-col items-center gap-2 transition-all hover:border-[#b8c4ff]/20">
              <div className="card-glow absolute inset-0 pointer-events-none" />
              <span className="material-symbols-outlined text-[#FFB300] text-3xl relative z-10" style={{ fontVariationSettings: "'FILL' 1" }}>smart_toy</span>
              <span className="text-[12px] font-semibold text-[#F9FAFB] relative z-10">AI Generate</span>
            </button>
          </div>
        </div>
      )}

      {/* ═══ LIBRARY TAB ═══ */}
      {activeTab === "library" && (
        <div className="space-y-5 animate-fade-in">
          {/* Search */}
          <div className="relative">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#9CA3AF] text-[20px]">search</span>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search exercises..."
              className="w-full h-[48px] rounded-xl pl-10 pr-4 text-[14px] text-[#F9FAFB] placeholder:text-[#9CA3AF] outline-none bg-[#191b25] border border-[#434656] focus:border-[#b8c4ff] transition-all"
            />
          </div>

          {/* Muscle Group Filter */}
          <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
            {MUSCLE_GROUPS.map((m) => (
              <button key={m} onClick={() => setSelectedMuscle(m)}
                className="whitespace-nowrap px-4 py-2 rounded-full text-[11px] font-bold uppercase tracking-widest transition-all"
                style={{
                  background: selectedMuscle === m ? "#1a56ff" : "transparent",
                  color: selectedMuscle === m ? "white" : "#9CA3AF",
                  border: selectedMuscle === m ? "none" : "1px solid #2D2D3A",
                }}>
                {m}
              </button>
            ))}
          </div>

          {/* Exercise Cards */}
          <div className="space-y-3">
            {[
              { name: "Barbell Bench Press", muscle: "Chest", icon: "fitness_center", pr: "100kg" },
              { name: "Barbell Squat", muscle: "Legs", icon: "fitness_center", pr: "140kg" },
              { name: "Deadlift", muscle: "Back", icon: "fitness_center", pr: "180kg" },
              { name: "Overhead Press", muscle: "Shoulders", icon: "fitness_center", pr: "65kg" },
              { name: "Pull-ups", muscle: "Back", icon: "fitness_center", pr: "BW+20kg" },
              { name: "Romanian Deadlift", muscle: "Legs", icon: "fitness_center", pr: "120kg" },
              { name: "Incline DB Press", muscle: "Chest", icon: "fitness_center", pr: "40kg" },
              { name: "Barbell Row", muscle: "Back", icon: "fitness_center", pr: "90kg" },
            ]
              .filter((ex) => selectedMuscle === "All" || ex.muscle === selectedMuscle)
              .filter((ex) => !search || ex.name.toLowerCase().includes(search.toLowerCase()))
              .map((ex, i) => (
                <div key={i} className="solid-card p-4 flex items-center justify-between cursor-pointer hover:border-[#b8c4ff]/20 transition-all">
                  <div className="card-glow absolute inset-0 pointer-events-none" />
                  <div className="flex items-center gap-3 relative z-10">
                    <div className="w-10 h-10 rounded-xl bg-[#1a56ff]/10 flex items-center justify-center">
                      <span className="material-symbols-outlined text-[#b8c4ff] text-[20px]">{ex.icon}</span>
                    </div>
                    <div>
                      <p className="text-[14px] font-medium text-[#F9FAFB]">{ex.name}</p>
                      <p className="text-[11px] text-[#9CA3AF] uppercase tracking-widest">{ex.muscle}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 relative z-10">
                    <span className="text-[12px] text-[#7dffa2] font-semibold">PR: {ex.pr}</span>
                    <span className="material-symbols-outlined text-[#434656] text-[18px]">chevron_right</span>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}

      {/* ═══ HISTORY TAB ═══ */}
      {activeTab === "history" && (
        <div className="space-y-4 animate-fade-in">
          <p className="text-[12px] text-[#9CA3AF] uppercase tracking-widest font-bold mb-2">This Week</p>
          {RECENT_WORKOUTS.map((w) => (
            <div key={w.id} className="solid-card p-4 flex items-center gap-4 cursor-pointer hover:border-[#b8c4ff]/20 transition-all">
              <div className="card-glow absolute inset-0 pointer-events-none" />
              <div className="w-12 h-12 rounded-xl bg-[#1a56ff]/10 flex items-center justify-center relative z-10">
                <span className="material-symbols-outlined text-[#b8c4ff]" style={{ fontVariationSettings: "'FILL' 1" }}>{w.icon}</span>
              </div>
              <div className="flex-1 relative z-10">
                <p className="text-[14px] font-semibold text-[#F9FAFB]">{w.name}</p>
                <p className="text-[12px] text-[#9CA3AF] mt-0.5">{w.date} · {w.duration}</p>
              </div>
              <div className="flex flex-col items-end relative z-10">
                <span className="text-[14px] font-semibold text-[#F9FAFB]">{w.volume}</span>
                <span className="text-[11px] text-[#9CA3AF] uppercase tracking-widest">Volume</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
