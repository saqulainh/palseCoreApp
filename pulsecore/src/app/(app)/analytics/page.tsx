import { MetricTile } from "@/components/ui/MetricTile";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Analytics — Pulse Core",
  description: "Deep insights into your strength, endurance, recovery trends and performance data.",
};

export default function AnalyticsPage() {
  return (
    <div
      className="min-h-screen pb-[90px] md:pb-0"
      style={{ background: "radial-gradient(circle at top right, rgba(0,74,240,0.12) 0%, transparent 60%)" }}
    >
      <div className="max-w-7xl mx-auto px-5 mt-6 md:mt-8">

        {/* Page Title + Period Selector */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <h1 style={{ fontFamily: "Lexend, sans-serif", fontSize: "56px", fontWeight: 800, color: "#F9FAFB", letterSpacing: "-0.02em", lineHeight: 1.1 }}>
              Analytics
            </h1>
            <p className="text-[16px] text-[#9CA3AF] mt-1">Review your performance data.</p>
          </div>
          {/* Period selector */}
          <div className="glass-panel p-1 rounded-xl flex items-center self-start md:self-end w-full md:w-auto overflow-x-auto no-scrollbar relative">
            {["Week", "Month", "3 Months", "All Time"].map((period, i) => (
              <button
                key={period}
                className="flex-1 md:flex-none px-4 py-2 rounded-lg text-[11px] font-bold uppercase tracking-widest whitespace-nowrap transition-colors z-10"
                style={{
                  background: i === 1 ? "#004af0" : "transparent",
                  color: i === 1 ? "white" : "#9CA3AF",
                  boxShadow: i === 1 ? "0 4px 16px rgba(0,74,240,0.3)" : "none",
                }}
              >
                {period}
              </button>
            ))}
          </div>
        </div>

        {/* Category tabs */}
        <div className="relative flex gap-6 border-b border-white/5 mb-8 overflow-x-auto no-scrollbar pb-3">
          <div className="absolute bottom-0 left-0 h-[2px] bg-[#004af0] w-[85px] rounded-t-sm"
            style={{ boxShadow: "0 0 8px rgba(0,74,240,0.8)" }} />
          {["Overview", "Strength", "Cardio", "Body", "Habits"].map((tab, i) => (
            <button key={tab}
              className="text-[16px] font-semibold whitespace-nowrap tracking-wide transition-colors"
              style={{ color: i === 0 ? "#b8c4ff" : "#9CA3AF" }}>
              {tab}
            </button>
          ))}
        </div>

        {/* 4-card Bento Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <MetricTile label="Total Workouts" value="24" icon="fitness_center" trend="up" trendValue="+12%" trendLabel="vs last mo" />
          <MetricTile label="Total Volume" value="14.2k" unit="kg" icon="weight" trend="up" trendValue="+5%" />
          <MetricTile label="Avg Recovery" value="82" unit="%" icon="battery_charging_full" iconColor="text-[#FFB300]" trend="down" trendValue="-2%" trendLabel="optimal zone" />
          {/* Streak card — special gradient */}
          <div className="rounded-xl p-4 flex flex-col justify-between min-h-[140px] relative overflow-hidden border border-[#dde1ff]/20"
            style={{ background: "linear-gradient(135deg, #004af0 0%, #1a56ff 100%)", boxShadow: "0 8px 24px rgba(0,74,240,0.3)" }}>
            <div className="absolute -right-4 -top-4 w-24 h-24 bg-white/20 rounded-full blur-2xl" />
            <div className="flex justify-between items-start relative z-10">
              <span className="text-[11px] font-bold uppercase tracking-widest text-[#e6e8ff]">Current Streak</span>
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                <span className="material-symbols-outlined text-[16px] text-white" style={{ fontVariationSettings: "'FILL' 1" }}>local_fire_department</span>
              </div>
            </div>
            <div className="relative z-10">
              <div style={{ fontFamily: "Lexend, sans-serif", fontSize: "36px", fontWeight: 700, color: "white", lineHeight: 1.2 }}>
                14 <span style={{ fontSize: "22px", fontWeight: 400, color: "#e6e8ff" }}>days</span>
              </div>
              <p className="text-[12px] text-[#e6e8ff] mt-1 opacity-90">Personal best: 21 days</p>
            </div>
          </div>
        </div>

        {/* Readiness Line Chart */}
        <div className="glass-panel rounded-xl p-5 mb-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 style={{ fontFamily: "Lexend, sans-serif", fontSize: "22px", fontWeight: 600, color: "#F9FAFB" }}>Readiness Score</h2>
              <p className="text-[12px] text-[#9CA3AF] mt-1">Last 30 Days Trends</p>
            </div>
            <div className="flex items-center gap-2 px-3 py-1 rounded-full border border-white/5" style={{ background: "rgba(29,31,41,0.6)" }}>
              <div className="w-2 h-2 rounded-full bg-[#004af0]" style={{ boxShadow: "0 0 6px #004af0" }} />
              <span className="text-[11px] font-bold uppercase tracking-widest text-[#9CA3AF]">Avg 86</span>
            </div>
          </div>
          {/* SVG Chart */}
          <div className="relative h-64 w-full border-b border-white/5 pb-2">
            {/* Grid lines */}
            <div className="absolute inset-0 flex flex-col justify-between pointer-events-none pb-2">
              {[0, 1, 2, 3].map((i) => (
                <div key={i} className="w-full border-t border-white/5" />
              ))}
            </div>
            {/* Y-axis */}
            <div className="absolute -left-6 inset-y-0 flex flex-col justify-between text-[#4B5563] text-[10px] pb-2" style={{ fontFamily: "JetBrains Mono, monospace" }}>
              <span>100</span><span>75</span><span>50</span><span>25</span>
            </div>
            <svg className="absolute inset-0 h-full w-full overflow-visible" viewBox="0 0 100 100" preserveAspectRatio="none">
              <defs>
                <linearGradient id="chartGrad" x1="0%" x2="0%" y1="0%" y2="100%">
                  <stop offset="0%" stopColor="#004af0" stopOpacity="0.15" />
                  <stop offset="100%" stopColor="#004af0" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path d="M0,50 C5,50 5,40 10,40 C15,40 15,45 20,45 C25,45 25,30 30,30 C35,30 35,20 40,20 C45,20 45,35 50,35 C55,35 55,15 60,15 C65,15 65,25 70,25 C75,25 75,10 80,10 C85,10 85,20 90,20 C95,20 95,5 100,5 L100,100 L0,100 Z" fill="url(#chartGrad)" />
              <path d="M0,50 C5,50 5,40 10,40 C15,40 15,45 20,45 C25,45 25,30 30,30 C35,30 35,20 40,20 C45,20 45,35 50,35 C55,35 55,15 60,15 C65,15 65,25 70,25 C75,25 75,10 80,10 C85,10 85,20 90,20 C95,20 95,5 100,5"
                fill="none" stroke="#004af0" strokeWidth="2.5" strokeLinecap="round"
                style={{ filter: "drop-shadow(0 0 12px rgba(0,74,240,0.9))" }} />
              <circle cx="100" cy="5" r="3.5" fill="#004af0" stroke="white" strokeWidth="2" style={{ filter: "drop-shadow(0 0 8px rgba(0,74,240,1))" }} />
            </svg>
            {/* Tooltip */}
            <div className="absolute right-0 top-0 -translate-y-3 translate-x-3 px-3 py-2 rounded-lg border border-white/5 z-10 flex flex-col items-center"
              style={{ background: "rgba(40,41,51,0.9)", backdropFilter: "blur(12px)" }}>
              <span className="text-[14px] font-bold text-[#b8c4ff]" style={{ fontFamily: "JetBrains Mono, monospace" }}>95%</span>
              <span className="text-[9px] font-bold uppercase tracking-widest text-[#9CA3AF] mt-0.5">Today</span>
            </div>
          </div>
          {/* X-axis */}
          <div className="flex justify-between mt-3 px-1">
            {["1st", "8th", "15th", "22nd", "29th"].map((d) => (
              <span key={d} className="text-[10px] text-[#4B5563] opacity-70" style={{ fontFamily: "JetBrains Mono, monospace" }}>{d}</span>
            ))}
          </div>
        </div>

        {/* AI Insight Card */}
        <div className="glass-panel p-5 rounded-xl border-l-4 border-l-[#05e777] mb-10"
          style={{ background: "linear-gradient(90deg, rgba(5,231,119,0.05) 0%, transparent 100%)" }}>
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-full border flex items-center justify-center flex-shrink-0"
              style={{ background: "rgba(5,231,119,0.1)", borderColor: "rgba(5,231,119,0.2)", boxShadow: "0 0 12px rgba(5,231,119,0.2)" }}>
              <span className="material-symbols-outlined text-[#05e777]">smart_toy</span>
            </div>
            <div>
              <h3 style={{ fontFamily: "Lexend, sans-serif", fontSize: "18px", fontWeight: 600, color: "#F9FAFB", marginBottom: "4px" }}>
                Peak Performance Trend Detected
              </h3>
              <p className="text-[14px] text-[#9CA3AF] leading-relaxed">
                Your readiness score has stabilized above 85% for the last 4 days. This indicates optimal CNS recovery. Suggest increasing load on your next strength session by 5% to capitalize on this adaptation phase.
              </p>
              <button className="mt-4 px-4 py-2 rounded-lg text-[11px] font-bold uppercase tracking-widest transition-all duration-300 hover:bg-[#004af0] hover:text-white border border-[#004af0]/50 text-[#004af0]">
                Adjust Plan
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
