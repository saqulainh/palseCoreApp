"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useUserStore } from "@/store/userStore";
import { PageTransition } from "@/components/layout/PageTransition";

export default function LoginPage() {
  const router = useRouter();
  const login = useUserStore((state) => state.login);
  const error = useUserStore((state) => state.error);
  const isLoading = useUserStore((state) => state.isLoading);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login({ email, password });
      router.push("/dashboard");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <PageTransition>
      <div className="min-h-screen bg-[#0A0A0F] flex flex-col items-center justify-center px-5 relative overflow-hidden">
        {/* Same background glows as splash */}
        <div className="absolute top-0 right-0 w-[70%] h-[70%] rounded-full pointer-events-none -z-10"
          style={{ background: "rgba(26,86,255,0.08)", filter: "blur(120px)" }} />
        <div className="absolute bottom-0 left-0 w-[50%] h-[50%] rounded-full pointer-events-none -z-10"
          style={{ background: "rgba(125,255,162,0.04)", filter: "blur(100px)" }} />
        
        <div className="w-full max-w-sm">
          <div className="mb-8 text-center">
            <div className="mx-auto mb-4 w-16 h-16 rounded-2xl flex items-center justify-center"
              style={{
                background: "linear-gradient(135deg, #1a56ff 0%, #004af0 100%)",
                boxShadow: "0 0 40px rgba(26,86,255,0.4), inset 0 1px 1px rgba(255,255,255,0.3)",
              }}>
              <span className="material-symbols-outlined text-white text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                login
              </span>
            </div>
            <h1 className="text-3xl font-bold font-lexend text-[#F9FAFB]">Welcome Back</h1>
            <p className="text-[#9CA3AF] mt-2">Sign in to sync your fitness data</p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {error && (
              <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm text-center">
                {error}
              </div>
            )}
            
            <div className="flex flex-col gap-1.5">
              <label className="text-sm text-[#9CA3AF] font-medium ml-1">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full h-14 bg-[#11131C] border border-[#2D2D3A] rounded-xl px-4 text-[#F9FAFB] placeholder:text-[#4B5563] focus:outline-none focus:border-[#1a56ff] transition-colors"
                placeholder="athlete@pulsecore.app"
              />
            </div>
            
            <div className="flex flex-col gap-1.5">
              <label className="text-sm text-[#9CA3AF] font-medium ml-1">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full h-14 bg-[#11131C] border border-[#2D2D3A] rounded-xl px-4 text-[#F9FAFB] placeholder:text-[#4B5563] focus:outline-none focus:border-[#1a56ff] transition-colors"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="mt-4 h-[56px] rounded-xl flex items-center justify-center gap-2 text-[18px] font-semibold transition-all active:scale-[0.97] hover:opacity-90 disabled:opacity-50 disabled:active:scale-100"
              style={{
                fontFamily: "Lexend, sans-serif",
                background: "#1a56ff",
                color: "white",
                boxShadow: "0 8px 32px rgba(26,86,255,0.35), inset 0 1px 1px rgba(255,255,255,0.3)",
              }}
            >
              {isLoading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          <p className="mt-8 text-center text-[#9CA3AF] text-sm">
            Don't have an account?{" "}
            <Link href="/auth/register" className="text-[#b8c4ff] hover:underline font-medium">
              Create one
            </Link>
          </p>
        </div>
      </div>
    </PageTransition>
  );
}
