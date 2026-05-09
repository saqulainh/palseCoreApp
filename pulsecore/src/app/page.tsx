import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pulse Core — Your Intelligent Fitness OS",
  description:
    "AI-powered smart fitness companion. Build consistency, optimize recovery, improve performance.",
};

export default function SplashPage() {
  return (
    <div className="min-h-screen bg-[#0A0A0F] flex flex-col items-center justify-center px-5 relative overflow-hidden">
      {/* Background glows */}
      <div className="absolute top-0 right-0 w-[70%] h-[70%] rounded-full pointer-events-none -z-10"
        style={{ background: "rgba(26,86,255,0.08)", filter: "blur(120px)" }} />
      <div className="absolute bottom-0 left-0 w-[50%] h-[50%] rounded-full pointer-events-none -z-10"
        style={{ background: "rgba(125,255,162,0.04)", filter: "blur(100px)" }} />

      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden">
        {[
          { top: "15%", left: "10%", size: 3, opacity: 0.3, delay: "0s" },
          { top: "25%", right: "15%", size: 2, opacity: 0.2, delay: "0.5s" },
          { top: "60%", left: "20%", size: 4, opacity: 0.15, delay: "1s" },
          { top: "70%", right: "25%", size: 2, opacity: 0.25, delay: "1.5s" },
          { top: "40%", left: "80%", size: 3, opacity: 0.2, delay: "0.8s" },
        ].map((p, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-[#b8c4ff] animate-pulse"
            style={{
              ...p,
              width: `${p.size}px`,
              height: `${p.size}px`,
              animationDelay: p.delay,
            }}
          />
        ))}
      </div>

      {/* Logo mark */}
      <div className="mb-6 w-20 h-20 rounded-2xl flex items-center justify-center"
        style={{
          background: "linear-gradient(135deg, #1a56ff 0%, #004af0 100%)",
          boxShadow: "0 0 40px rgba(26,86,255,0.4), inset 0 1px 1px rgba(255,255,255,0.3)",
        }}>
        <span className="material-symbols-outlined text-white text-4xl" style={{ fontVariationSettings: "'FILL' 1" }}>
          favorite
        </span>
      </div>

      {/* Logotype */}
      <h1
        className="text-center mb-3"
        style={{
          fontFamily: "Lexend, sans-serif",
          fontSize: "clamp(48px, 12vw, 72px)",
          fontWeight: 800,
          letterSpacing: "-0.03em",
          lineHeight: 1.1,
          color: "#F9FAFB",
          textShadow: "0 0 40px rgba(184,196,255,0.2)",
        }}
      >
        PULSE <span style={{ color: "#b8c4ff" }}>CORE</span>
      </h1>

      {/* Tagline */}
      <p
        className="text-center mb-12 max-w-xs"
        style={{
          fontFamily: "Inter, sans-serif",
          fontSize: "16px",
          color: "#9CA3AF",
          lineHeight: 1.6,
        }}
      >
        Your Intelligent Fitness OS
      </p>

      {/* Feature pills */}
      <div className="flex flex-wrap gap-2 justify-center mb-12">
        {["AI Coaching", "Recovery Intelligence", "Adaptive Training", "Performance Analytics"].map((f) => (
          <span key={f}
            className="px-3 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-widest text-[#b8c4ff] border border-[#b8c4ff]/20 bg-[#b8c4ff]/5">
            {f}
          </span>
        ))}
      </div>

      {/* CTAs */}
      <div className="flex flex-col gap-3 w-full max-w-sm">
        <Link href="/onboarding"
          className="h-[56px] rounded-xl flex items-center justify-center gap-2 text-[18px] font-semibold transition-all active:scale-[0.97] hover:opacity-90"
          style={{
            fontFamily: "Lexend, sans-serif",
            background: "#1a56ff",
            color: "white",
            boxShadow: "0 8px 32px rgba(26,86,255,0.35), inset 0 1px 1px rgba(255,255,255,0.3)",
          }}>
          <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>rocket_launch</span>
          Get Started Free
        </Link>
        <Link href="/dashboard"
          className="h-[56px] rounded-xl flex items-center justify-center gap-2 text-[18px] font-semibold transition-all active:scale-[0.97] border border-[#2D2D3A] hover:border-[#b8c4ff]"
          style={{ fontFamily: "Lexend, sans-serif", color: "#F9FAFB" }}>
          Sign In
        </Link>
      </div>

      {/* Bottom tagline */}
      <p className="absolute bottom-8 text-[11px] text-[#4B5563] text-center">
        Minimal · Premium · Motivating
      </p>
    </div>
  );
}
