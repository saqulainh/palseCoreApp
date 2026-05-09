"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";

interface ExerciseSet {
  reps: number;
  weight: number;
  completed: boolean;
}

interface Exercise {
  name: string;
  targetSets: number;
  targetReps: number;
  previousBest: string;
  sets: ExerciseSet[];
}

const WORKOUT: Exercise[] = [
  { name: "Kettlebell Swings", targetSets: 4, targetReps: 15, previousBest: "24kg × 15", sets: Array.from({ length: 4 }, () => ({ reps: 15, weight: 24, completed: false })) },
  { name: "Box Jumps", targetSets: 4, targetReps: 12, previousBest: "BW × 12", sets: Array.from({ length: 4 }, () => ({ reps: 12, weight: 0, completed: false })) },
  { name: "Burpees", targetSets: 3, targetReps: 10, previousBest: "BW × 10", sets: Array.from({ length: 3 }, () => ({ reps: 10, weight: 0, completed: false })) },
  { name: "Battle Ropes", targetSets: 4, targetReps: 30, previousBest: "30s × 4", sets: Array.from({ length: 4 }, () => ({ reps: 30, weight: 0, completed: false })) },
  { name: "Thrusters", targetSets: 4, targetReps: 10, previousBest: "40kg × 10", sets: Array.from({ length: 4 }, () => ({ reps: 10, weight: 40, completed: false })) },
];

export default function ActiveWorkoutPage() {
  const router = useRouter();
  const [exercises, setExercises] = useState(WORKOUT);
  const [currentExIdx, setCurrentExIdx] = useState(0);
  const [sessionTime, setSessionTime] = useState(0);
  const [restTimer, setRestTimer] = useState(0);
  const [isResting, setIsResting] = useState(false);
  const [showSummary, setShowSummary] = useState(false);

  // Session timer
  useEffect(() => {
    if (showSummary) return;
    const interval = setInterval(() => setSessionTime((t) => t + 1), 1000);
    return () => clearInterval(interval);
  }, [showSummary]);

  // Rest timer
  useEffect(() => {
    if (!isResting || restTimer <= 0) return;
    const interval = setInterval(() => {
      setRestTimer((t) => {
        if (t <= 1) { setIsResting(false); return 0; }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [isResting, restTimer]);

  const formatTime = (s: number) => `${Math.floor(s / 60).toString().padStart(2, "0")}:${(s % 60).toString().padStart(2, "0")}`;

  const totalSets = exercises.reduce((a, e) => a + e.sets.length, 0);
  const completedSets = exercises.reduce((a, e) => a + e.sets.filter((s) => s.completed).length, 0);

  const completeSet = useCallback((exIdx: number, setIdx: number) => {
    setExercises((prev) => {
      const next = prev.map((e, i) => i !== exIdx ? e : {
        ...e,
        sets: e.sets.map((s, j) => j !== setIdx ? s : { ...s, completed: true }),
      });
      return next;
    });
    setIsResting(true);
    setRestTimer(90);
  }, []);

  const currentEx = exercises[currentExIdx];

  // ── Summary Screen ──
  if (showSummary) {
    return (
      <div className="min-h-screen bg-[#0A0A0F] flex flex-col items-center justify-center px-5 relative">
        <div className="fixed top-0 right-0 w-3/4 h-3/4 rounded-full pointer-events-none -z-10"
          style={{ background: "rgba(125,255,162,0.08)", filter: "blur(120px)" }} />
        <div className="w-20 h-20 rounded-full bg-[#7dffa2]/10 border border-[#7dffa2]/30 flex items-center justify-center mb-6"
          style={{ boxShadow: "0 0 40px rgba(125,255,162,0.2)" }}>
          <span className="material-symbols-outlined text-[#7dffa2] text-4xl" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
        </div>
        <h2 style={{ fontFamily: "Lexend, sans-serif", fontSize: "28px", fontWeight: 700, color: "#F9FAFB" }}>Workout Complete!</h2>
        <p className="text-[14px] text-[#9CA3AF] mt-2 mb-8">Great session. Keep the momentum going.</p>

        <div className="grid grid-cols-3 gap-4 w-full max-w-sm mb-8">
          {[
            { label: "Duration", value: formatTime(sessionTime), icon: "timer" },
            { label: "Sets", value: `${completedSets}/${totalSets}`, icon: "repeat" },
            { label: "Volume", value: "2,460 kg", icon: "weight" },
          ].map((s) => (
            <div key={s.label} className="glass-card p-3 flex flex-col items-center gap-1">
              <span className="material-symbols-outlined text-[#b8c4ff] text-[20px]">{s.icon}</span>
              <span className="text-[18px] font-bold text-[#F9FAFB]">{s.value}</span>
              <span className="text-[11px] text-[#9CA3AF] uppercase tracking-widest">{s.label}</span>
            </div>
          ))}
        </div>

        <button onClick={() => router.push("/dashboard")}
          className="w-full max-w-sm h-[56px] rounded-xl text-[18px] font-semibold bg-[#1a56ff] text-white transition-all active:scale-[0.97]"
          style={{ fontFamily: "Lexend, sans-serif", boxShadow: "0 8px 32px rgba(26,86,255,0.35)" }}>
          Back to Dashboard
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0A0A0F] flex flex-col">
      {/* Top bar with timer */}
      <div className="sticky top-0 z-50 flex items-center justify-between px-5 h-16"
        style={{ background: "rgba(30,30,46,0.85)", backdropFilter: "blur(32px)", boxShadow: "0 1px 0 rgba(255,255,255,0.06)" }}>
        <button onClick={() => router.back()} className="text-[#b8c4ff] p-2 -ml-2 rounded-full hover:bg-white/5">
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <div className="flex items-center gap-3">
          <span className="material-symbols-outlined text-[#FFB300] text-[18px]">timer</span>
          <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: "22px", fontWeight: 700, color: "#F9FAFB" }}>
            {formatTime(sessionTime)}
          </span>
        </div>
        <button onClick={() => setShowSummary(true)} className="text-[11px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full border border-[#FF4757]/50 text-[#FF4757] hover:bg-[#FF4757]/10 transition-all">
          Finish
        </button>
      </div>

      {/* Progress */}
      <div className="px-5 py-3">
        <div className="flex justify-between text-[11px] text-[#9CA3AF] uppercase tracking-widest font-bold mb-2">
          <span>Progress</span>
          <span>{completedSets}/{totalSets} sets</span>
        </div>
        <div className="w-full h-2 rounded-full bg-[#282933] overflow-hidden">
          <div className="h-full rounded-full bg-[#7dffa2] transition-all duration-500" style={{ width: `${(completedSets / totalSets) * 100}%`, boxShadow: "0 0 12px rgba(125,255,162,0.5)" }} />
        </div>
      </div>

      {/* Rest Timer Overlay */}
      {isResting && (
        <div className="mx-5 mb-4 p-4 rounded-xl flex items-center justify-between" style={{ background: "rgba(255,179,0,0.08)", border: "1px solid rgba(255,179,0,0.2)" }}>
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-[#FFB300]" style={{ fontVariationSettings: "'FILL' 1" }}>hourglass_top</span>
            <span className="text-[14px] text-[#F9FAFB] font-medium">Rest Timer</span>
          </div>
          <div className="flex items-center gap-3">
            <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: "28px", fontWeight: 700, color: "#FFB300" }}>
              {formatTime(restTimer)}
            </span>
            <button onClick={() => { setIsResting(false); setRestTimer(0); }}
              className="text-[11px] font-bold uppercase tracking-widest px-3 py-1 rounded-full border border-[#FFB300]/30 text-[#FFB300] hover:bg-[#FFB300]/10">
              Skip
            </button>
          </div>
        </div>
      )}

      {/* Exercise Navigation */}
      <div className="flex gap-2 px-5 overflow-x-auto no-scrollbar pb-3">
        {exercises.map((ex, i) => {
          const done = ex.sets.every((s) => s.completed);
          return (
            <button key={i} onClick={() => setCurrentExIdx(i)}
              className="whitespace-nowrap px-3 py-2 rounded-lg text-[11px] font-bold uppercase tracking-widest transition-all"
              style={{
                background: i === currentExIdx ? "#1a56ff" : done ? "rgba(125,255,162,0.1)" : "transparent",
                color: i === currentExIdx ? "white" : done ? "#7dffa2" : "#9CA3AF",
                border: i === currentExIdx ? "none" : "1px solid #2D2D3A",
              }}>
              {done && <span className="mr-1">✓</span>}{i + 1}
            </button>
          );
        })}
      </div>

      {/* Current Exercise Detail */}
      <div className="flex-1 px-5 pt-4 space-y-4">
        <div>
          <h3 style={{ fontFamily: "Lexend, sans-serif", fontSize: "22px", fontWeight: 600, color: "#F9FAFB" }}>
            {currentEx.name}
          </h3>
          <p className="text-[12px] text-[#9CA3AF] mt-1">
            Previous best: <span className="text-[#7dffa2] font-semibold">{currentEx.previousBest}</span>
          </p>
        </div>

        {/* Set Rows */}
        <div className="space-y-2">
          <div className="grid grid-cols-[40px_1fr_1fr_60px] gap-3 text-[11px] text-[#9CA3AF] uppercase tracking-widest font-bold px-2">
            <span>Set</span><span>Weight</span><span>Reps</span><span></span>
          </div>
          {currentEx.sets.map((set, j) => (
            <div key={j} className="grid grid-cols-[40px_1fr_1fr_60px] gap-3 items-center p-3 rounded-xl transition-all"
              style={{ background: set.completed ? "rgba(125,255,162,0.05)" : "rgba(12,14,23,0.5)", border: `1px solid ${set.completed ? "rgba(125,255,162,0.15)" : "rgba(45,45,58,0.5)"}` }}>
              <span className="text-[14px] font-bold text-center" style={{ color: set.completed ? "#7dffa2" : "#F9FAFB" }}>{j + 1}</span>
              <div className="flex items-center gap-1">
                <input type="number" defaultValue={set.weight || ""} placeholder="kg"
                  className="w-full h-9 rounded-lg text-center text-[14px] font-medium text-[#F9FAFB] bg-[#191b25] border border-[#434656] outline-none focus:border-[#b8c4ff] transition-all"
                  disabled={set.completed} />
              </div>
              <div className="flex items-center gap-1">
                <input type="number" defaultValue={set.reps} placeholder="reps"
                  className="w-full h-9 rounded-lg text-center text-[14px] font-medium text-[#F9FAFB] bg-[#191b25] border border-[#434656] outline-none focus:border-[#b8c4ff] transition-all"
                  disabled={set.completed} />
              </div>
              {set.completed ? (
                <span className="material-symbols-outlined text-[#7dffa2] text-center w-full" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
              ) : (
                <button onClick={() => completeSet(currentExIdx, j)}
                  className="w-full h-9 rounded-lg bg-[#1a56ff] text-white flex items-center justify-center transition-all active:scale-95 text-[11px] font-bold uppercase"
                  style={{ boxShadow: "inset 0 1px 1px rgba(255,255,255,0.3)" }}>
                  Done
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
