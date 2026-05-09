"use client";

import { useEffect, useState } from "react";
import { ProgressRing } from "@/components/ui/ProgressRing";
import { api } from "@/lib/api/client";
import { useUserStore } from "@/store/userStore";

export default function DashboardPage() {
  const profile = useUserStore((state) => state.profile);
  const [dashboardData, setDashboardData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    api.get("/api/v1/dashboard/")
      .then((data) => {
        setDashboardData(data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch dashboard", err);
        setIsLoading(false);
      });
  }, []);

  return (
    <div className="px-5 pt-2 pb-10 space-y-8 max-w-3xl mx-auto">
      {/* ── Greeting ── */}
      <div className="pt-2">
        <h2
          style={{
            fontFamily: "Lexend, sans-serif",
            fontSize: "22px",
            fontWeight: 600,
            color: "#F9FAFB",
          }}
        >
          Good Morning, {profile?.name || "Athlete"}.
        </h2>
        <p className="text-[14px] text-[#9CA3AF] mt-1">
          Ready to push your limits?
        </p>
      </div>

      {/* ── Zone 1: Biometrics Hero Card ── */}
      <section className="glass-card p-4 overflow-hidden">
        <h3
          className="mb-5"
          style={{
            fontFamily: "Lexend, sans-serif",
            fontSize: "18px",
            fontWeight: 600,
            color: "#F9FAFB",
          }}
        >
          Biometrics Overview
        </h3>
        <div className="flex justify-around items-center mb-5">
          <ProgressRing value={dashboardData?.today_recovery?.score || 82} color="secondary" label="Recovery" />
          <ProgressRing value={dashboardData?.today_recovery?.hrv || 74} color="amber" label="Readiness" />
        </div>
        {/* AI Insight banner */}
        <div
          className="rounded-xl p-3 flex items-start gap-3 border"
          style={{
            background: "rgba(12, 14, 23, 0.5)",
            borderColor: "rgba(45, 45, 58, 0.5)",
          }}
        >
          <span
            className="material-symbols-outlined text-[#b8c4ff] mt-0.5"
            style={{
              fontVariationSettings: "'FILL' 1",
              filter: "drop-shadow(0 0 6px rgba(184,196,255,0.4))",
            }}
          >
            bolt
          </span>
          <p className="text-[14px] text-[#F9FAFB]">
            You are ready for high intensity today.
          </p>
        </div>
      </section>

      {/* ── Zone 2: Today's Workout ── */}
      <section className="solid-card p-5">
        <div className="flex justify-between items-center mb-5">
          <h3
            style={{
              fontFamily: "Lexend, sans-serif",
              fontSize: "18px",
              fontWeight: 600,
              color: "#F9FAFB",
            }}
          >
            Today&apos;s Workout
          </h3>
          <span
            className="text-[11px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full border"
            style={{
              color: "#b8c4ff",
              background: "rgba(184, 196, 255, 0.1)",
              borderColor: "rgba(184, 196, 255, 0.2)",
              boxShadow: "inset 0 0 8px rgba(184,196,255,0.1)",
            }}
          >
            {dashboardData?.today_workout?.duration_minutes || 45} MIN
          </span>
        </div>
        <h4
          className="mb-3 tracking-tight"
          style={{
            fontFamily: "Lexend, sans-serif",
            fontSize: "28px",
            fontWeight: 700,
            color: "#F9FAFB",
          }}
        >
          {dashboardData?.today_workout?.name || "HIIT: Metcon Blast"}
        </h4>
        <div className="flex flex-wrap gap-2 mb-6">
          {(dashboardData?.today_workout?.exercises || ["Kettlebell Swings", "Box Jumps", "Burpees"]).map((ex: string) => (
            <span
              key={ex}
              className="text-[11px] font-bold uppercase tracking-widest text-[#9CA3AF] px-3 py-1.5 rounded-full border"
              style={{
                background: "rgba(12, 14, 23, 0.5)",
                borderColor: "rgba(45, 45, 58, 0.5)",
              }}
            >
              {ex}
            </span>
          ))}
        </div>
        <button
          className="w-full h-[56px] rounded-xl text-[18px] font-semibold transition-all duration-200 active:scale-[0.97] hover:opacity-90"
          style={{
            background: "#b8c4ff",
            color: "#002584",
            fontFamily: "Lexend, sans-serif",
            boxShadow:
              "inset 0 1px 1px rgba(255,255,255,0.4), inset 0 -1px 1px rgba(0,0,0,0.2), 0 8px 24px rgba(184,196,255,0.2)",
          }}
        >
          Start Workout
        </button>
      </section>

      {/* ── Zone 3: Streak & Habits ── */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Streak Card */}
        <div className="solid-card p-5 flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-widest text-[#9CA3AF] block mb-1">
              Current Streak
            </span>
            <div
              className="tracking-tighter flex items-baseline gap-2"
              style={{
                fontFamily: "Lexend, sans-serif",
                fontSize: "56px",
                fontWeight: 800,
                color: "#F9FAFB",
              }}
            >
              12{" "}
              <span
                style={{
                  fontSize: "18px",
                  fontWeight: 600,
                  color: "#9CA3AF",
                  letterSpacing: "normal",
                }}
              >
                Days
              </span>
            </div>
          </div>
          <div
            className="w-14 h-14 rounded-full flex items-center justify-center border"
            style={{
              background: "rgba(255, 179, 0, 0.1)",
              borderColor: "rgba(255, 179, 0, 0.2)",
              boxShadow: "0 0 15px rgba(255, 179, 0, 0.15)",
            }}
          >
            <span
              className="material-symbols-outlined text-3xl text-[#FFB300]"
              style={{
                fontVariationSettings: "'FILL' 1",
                filter: "drop-shadow(0 0 8px rgba(255,179,0,0.4))",
              }}
            >
              local_fire_department
            </span>
          </div>
        </div>

        {/* Habit Mini Tiles */}
        <div className="solid-card p-5 flex gap-4 overflow-x-auto no-scrollbar">
          {[
            { icon: "water_drop", label: "Hydration", value: "2.5L", color: "#7dffa2" },
            { icon: "restaurant", label: "Protein", value: "140g", color: "#b8c4ff" },
          ].map((habit) => (
            <div
              key={habit.label}
              className="min-w-[110px] rounded-xl p-3 border flex flex-col items-center justify-center text-center"
              style={{
                background: "rgba(12, 14, 23, 0.5)",
                borderColor: "rgba(45, 45, 58, 0.5)",
              }}
            >
              <span
                className="material-symbols-outlined mb-2"
                style={{
                  color: habit.color,
                  filter: `drop-shadow(0 0 6px ${habit.color}66)`,
                }}
              >
                {habit.icon}
              </span>
              <span className="text-[11px] font-bold text-[#F9FAFB] uppercase tracking-wide">
                {habit.label}
              </span>
              <span
                style={{
                  fontFamily: "Lexend, sans-serif",
                  fontSize: "18px",
                  fontWeight: 600,
                  color: "#9CA3AF",
                  marginTop: "4px",
                }}
              >
                {habit.value}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* ── Zone 4: Sleep Summary ── */}
      <section className="glass-card p-5">
        <div className="flex justify-between items-center mb-6">
          <h3
            style={{
              fontFamily: "Lexend, sans-serif",
              fontSize: "18px",
              fontWeight: 600,
              color: "#F9FAFB",
            }}
          >
            Sleep Summary
          </h3>
          <span className="text-[14px] text-[#9CA3AF] font-medium">
            7h 12m avg
          </span>
        </div>
        {/* Bar chart */}
        <div className="flex justify-between items-end h-28 gap-2">
          {[
            { day: "M", height: "60%", active: false },
            { day: "T", height: "75%", active: false },
            { day: "W", height: "50%", active: false },
            { day: "T", height: "85%", active: true },
            { day: "F", height: "70%", active: false },
            { day: "S", height: "65%", active: false },
            { day: "S", height: "80%", active: false },
          ].map((bar, i) => (
            <div key={i} className="flex flex-col items-center flex-1 gap-3">
              <div
                className="w-full rounded-t-md transition-all duration-300 relative group"
                style={{
                  height: bar.height,
                  background: bar.active
                    ? "#b8c4ff"
                    : "rgba(184, 196, 255, 0.15)",
                  borderTop: bar.active
                    ? "none"
                    : "1px solid rgba(184, 196, 255, 0.2)",
                  boxShadow: bar.active
                    ? "0 0 16px rgba(184, 196, 255, 0.5), inset 0 1px 1px rgba(255,255,255,0.4)"
                    : "none",
                }}
              />
            </div>
          ))}
        </div>
        {/* Day labels */}
        <div className="flex justify-between mt-3 px-1">
          {["M", "T", "W", "T", "F", "S", "S"].map((d, i) => (
            <span
              key={i}
              className="text-[11px] font-bold flex-1 text-center"
              style={{
                color: i === 3 ? "#b8c4ff" : "#9CA3AF",
                textShadow: i === 3 ? "0 0 12px rgba(184,196,255,0.35)" : "none",
              }}
            >
              {d}
            </span>
          ))}
        </div>
      </section>
    </div>
  );
}
