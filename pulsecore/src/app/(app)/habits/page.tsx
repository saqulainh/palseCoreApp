"use client";

import { useEffect } from "react";
import { useHabitStore } from "@/store/habitStore";

const DAYS = ["M", "T", "W", "T", "F", "S", "S"];

export default function HabitsPage() {
  const { habits, fetchHabits, toggleHabit } = useHabitStore();

  useEffect(() => {
    fetchHabits();
  }, [fetchHabits]);

  const completed = habits.filter((h) => h.completedToday).length;
  const total = habits.length;
  const pct = total > 0 ? Math.round((completed / total) * 100) : 0;

  return (
    <div className="px-5 pt-2 pb-10 max-w-3xl mx-auto space-y-8">
      <div className="pt-2">
        <h2 style={{ fontFamily: "Lexend, sans-serif", fontSize: "22px", fontWeight: 600, color: "#F9FAFB" }}>Habits</h2>
        <p className="text-[14px] text-[#9CA3AF] mt-1">Build consistency, one day at a time.</p>
      </div>

      {/* Daily Progress */}
      <div className="glass-card p-5">
        <div className="card-glow absolute inset-0 pointer-events-none" />
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-4">
            <h3 style={{ fontFamily: "Lexend, sans-serif", fontSize: "18px", fontWeight: 600, color: "#F9FAFB" }}>Today&apos;s Progress</h3>
            <span className="text-[14px] font-bold text-[#b8c4ff]">{pct}%</span>
          </div>
          <div className="w-full h-3 rounded-full bg-[#282933] mb-3 overflow-hidden">
            <div className="h-full rounded-full transition-all duration-500"
              style={{ width: `${pct}%`, background: pct === 100 ? "#7dffa2" : "#b8c4ff", boxShadow: `0 0 12px ${pct === 100 ? "rgba(125,255,162,0.5)" : "rgba(184,196,255,0.4)"}` }} />
          </div>
          <p className="text-[12px] text-[#9CA3AF]">{completed} of {total} habits completed</p>
        </div>
      </div>

      {/* Habit Cards */}
      <div className="space-y-3">
        {habits.map((habit) => (
          <div key={habit.id} className="solid-card p-4">
            <div className="card-glow absolute inset-0 pointer-events-none" />
            <div className="relative z-10">
              <div className="flex items-center gap-4">
                <button onClick={() => toggleHabit(habit.id)}
                  className="w-10 h-10 rounded-xl flex items-center justify-center transition-all flex-shrink-0"
                  style={{
                    background: habit.completedToday ? "rgba(125,255,162,0.1)" : "rgba(12,14,23,0.5)",
                    border: `2px solid ${habit.completedToday ? "#7dffa2" : "#434656"}`,
                  }}>
                  {habit.completedToday && (
                    <span className="material-symbols-outlined text-[#7dffa2] text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>check</span>
                  )}
                </button>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[#b8c4ff] text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>{habit.icon}</span>
                    <span className="text-[14px] font-medium text-[#F9FAFB]">{habit.name}</span>
                  </div>
                  <div className="flex gap-2 mt-2">
                    {DAYS.map((d, i) => (
                      <div key={i} className="flex flex-col items-center gap-1">
                        <div className="w-5 h-5 rounded-full flex items-center justify-center text-[8px] font-bold"
                          style={{
                            background: habit.weekData[i] ? "rgba(125,255,162,0.15)" : "rgba(12,14,23,0.5)",
                            border: `1px solid ${habit.weekData[i] ? "rgba(125,255,162,0.3)" : "rgba(45,45,58,0.5)"}`,
                            color: habit.weekData[i] ? "#7dffa2" : "#4B5563",
                          }}>
                          {habit.weekData[i] ? "✓" : d}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex items-center gap-1.5 flex-shrink-0">
                  <span className="material-symbols-outlined text-[#FFB300] text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>local_fire_department</span>
                  <span className="text-[14px] font-bold text-[#F9FAFB]">{habit.streak}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <button className="w-full h-[52px] rounded-xl border border-dashed border-[#434656] text-[#b8c4ff] text-[14px] font-semibold flex items-center justify-center gap-2 transition-all hover:border-[#b8c4ff]/50 hover:bg-[#b8c4ff]/5">
        <span className="material-symbols-outlined text-[20px]">add</span>
        Add New Habit
      </button>
    </div>
  );
}
