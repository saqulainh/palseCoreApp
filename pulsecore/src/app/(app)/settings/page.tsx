"use client";

import { useUserStore } from "@/store/userStore";
import { useState } from "react";

export default function SettingsPage() {
  const { profile, updateProfile } = useUserStore();
  const [notifications, setNotifications] = useState({ workout: true, recovery: true, nutrition: false, streak: true });

  const Toggle = ({ checked, onChange }: { checked: boolean; onChange: () => void }) => (
    <button onClick={onChange} className="w-12 h-7 rounded-full transition-all relative flex-shrink-0"
      style={{ background: checked ? "#1a56ff" : "#282933", boxShadow: checked ? "0 0 12px rgba(26,86,255,0.3)" : "none" }}>
      <div className="absolute top-1 w-5 h-5 rounded-full bg-white shadow transition-all" style={{ left: checked ? "24px" : "4px" }} />
    </button>
  );

  return (
    <div className="px-5 pt-2 pb-10 max-w-3xl mx-auto space-y-8">
      <div className="pt-2">
        <h2 style={{ fontFamily: "Lexend, sans-serif", fontSize: "22px", fontWeight: 600, color: "#F9FAFB" }}>Settings</h2>
        <p className="text-[14px] text-[#9CA3AF] mt-1">Customize your experience.</p>
      </div>

      {/* Profile */}
      <div className="glass-card p-5">
        <div className="card-glow absolute inset-0 pointer-events-none" />
        <div className="relative z-10">
          <h3 className="mb-4" style={{ fontFamily: "Lexend, sans-serif", fontSize: "18px", fontWeight: 600, color: "#F9FAFB" }}>Profile</h3>
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 rounded-full bg-[#1a56ff]/20 border-2 border-[#1a56ff] flex items-center justify-center"
              style={{ boxShadow: "0 0 20px rgba(26,86,255,0.2)" }}>
              <span className="material-symbols-outlined text-[#b8c4ff] text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>person</span>
            </div>
            <div>
              <p className="text-[16px] font-semibold text-[#F9FAFB]">{profile.name}</p>
              <p className="text-[12px] text-[#9CA3AF]">{profile.email}</p>
            </div>
            <button className="ml-auto text-[11px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full border border-[#b8c4ff]/30 text-[#b8c4ff] hover:bg-[#b8c4ff]/5 transition-all">
              Edit
            </button>
          </div>
          <div className="space-y-3">
            {[
              { label: "Full Name", value: profile.name },
              { label: "Email", value: profile.email },
              { label: "Date of Birth", value: "Jan 15, 1995" },
            ].map((f) => (
              <div key={f.label} className="flex justify-between items-center py-3 border-b border-[#2D2D3A]/50">
                <span className="text-[14px] text-[#9CA3AF]">{f.label}</span>
                <span className="text-[14px] text-[#F9FAFB]">{f.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Fitness Profile */}
      <div className="solid-card p-5">
        <div className="card-glow absolute inset-0 pointer-events-none" />
        <div className="relative z-10">
          <h3 className="mb-4" style={{ fontFamily: "Lexend, sans-serif", fontSize: "18px", fontWeight: 600, color: "#F9FAFB" }}>Fitness Profile</h3>
          {[
            { label: "Goal", value: profile.fitnessGoal, icon: "fitness_center" },
            { label: "Level", value: profile.fitnessLevel, icon: "trending_up" },
            { label: "Equipment", value: profile.equipment, icon: "sports_gymnastics" },
            { label: "Schedule", value: profile.schedule, icon: "calendar_month" },
          ].map((f) => (
            <div key={f.label} className="flex items-center justify-between py-3 border-b border-[#2D2D3A]/50 last:border-none">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-[#b8c4ff] text-[18px]">{f.icon}</span>
                <span className="text-[14px] text-[#9CA3AF]">{f.label}</span>
              </div>
              <span className="text-[14px] text-[#F9FAFB]">{f.value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Notifications */}
      <div className="solid-card p-5">
        <div className="card-glow absolute inset-0 pointer-events-none" />
        <div className="relative z-10">
          <h3 className="mb-4" style={{ fontFamily: "Lexend, sans-serif", fontSize: "18px", fontWeight: 600, color: "#F9FAFB" }}>Notifications</h3>
          {[
            { key: "workout" as const, label: "Workout reminders", desc: "Get reminded before sessions" },
            { key: "recovery" as const, label: "Recovery alerts", desc: "When score drops below threshold" },
            { key: "nutrition" as const, label: "Meal logging", desc: "Remind to log meals" },
            { key: "streak" as const, label: "Streak protection", desc: "Don't break your streak!" },
          ].map((n) => (
            <div key={n.key} className="flex items-center justify-between py-3 border-b border-[#2D2D3A]/50 last:border-none">
              <div>
                <p className="text-[14px] text-[#F9FAFB]">{n.label}</p>
                <p className="text-[12px] text-[#4B5563]">{n.desc}</p>
              </div>
              <Toggle checked={notifications[n.key]} onChange={() => setNotifications((p) => ({ ...p, [n.key]: !p[n.key] }))} />
            </div>
          ))}
        </div>
      </div>

      {/* Units */}
      <div className="solid-card p-5">
        <div className="card-glow absolute inset-0 pointer-events-none" />
        <div className="relative z-10">
          <h3 className="mb-4" style={{ fontFamily: "Lexend, sans-serif", fontSize: "18px", fontWeight: 600, color: "#F9FAFB" }}>Units</h3>
          <div className="flex gap-3">
            {(["metric", "imperial"] as const).map((u) => (
              <button key={u} onClick={() => updateProfile({ units: u })}
                className="flex-1 py-3 rounded-xl text-[14px] font-semibold transition-all"
                style={{
                  background: profile.units === u ? "#1a56ff" : "rgba(12,14,23,0.5)",
                  color: profile.units === u ? "white" : "#9CA3AF",
                  border: `1px solid ${profile.units === u ? "#1a56ff" : "#2D2D3A"}`,
                  boxShadow: profile.units === u ? "0 4px 16px rgba(26,86,255,0.3)" : "none",
                }}>
                {u === "metric" ? "Metric (kg, km)" : "Imperial (lbs, mi)"}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Integrations */}
      <div className="solid-card p-5">
        <div className="card-glow absolute inset-0 pointer-events-none" />
        <div className="relative z-10">
          <h3 className="mb-4" style={{ fontFamily: "Lexend, sans-serif", fontSize: "18px", fontWeight: 600, color: "#F9FAFB" }}>Integrations</h3>
          {[
            { name: "Apple Health", status: "Connected", color: "#7dffa2" },
            { name: "Garmin Connect", status: "Not connected", color: "#9CA3AF" },
            { name: "WHOOP", status: "Not connected", color: "#9CA3AF" },
            { name: "Oura Ring", status: "Not connected", color: "#9CA3AF" },
          ].map((i) => (
            <div key={i.name} className="flex items-center justify-between py-3 border-b border-[#2D2D3A]/50 last:border-none">
              <span className="text-[14px] text-[#F9FAFB]">{i.name}</span>
              <span className="text-[12px] font-semibold" style={{ color: i.color }}>{i.status}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Subscription */}
      <div className="rounded-xl p-5 border border-[#dde1ff]/20 relative overflow-hidden"
        style={{ background: "linear-gradient(135deg, #004af0 0%, #1a56ff 100%)", boxShadow: "0 8px 24px rgba(0,74,240,0.3)" }}>
        <div className="absolute -right-4 -top-4 w-24 h-24 bg-white/20 rounded-full blur-2xl" />
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-2">
            <span className="material-symbols-outlined text-white" style={{ fontVariationSettings: "'FILL' 1" }}>workspace_premium</span>
            <span className="text-[11px] font-bold uppercase tracking-widest text-[#e6e8ff]">Current Plan</span>
          </div>
          <h3 style={{ fontFamily: "Lexend, sans-serif", fontSize: "28px", fontWeight: 700, color: "white", marginBottom: "8px", textTransform: "capitalize" }}>
            {profile.subscriptionTier}
          </h3>
          <p className="text-[14px] text-[#e6e8ff] mb-4">Unlimited AI coaching, advanced analytics, and priority support.</p>
          <button className="px-4 py-2 rounded-lg bg-white/20 text-white text-[12px] font-semibold uppercase tracking-widest hover:bg-white/30 transition-all">
            Manage Subscription
          </button>
        </div>
      </div>

      {/* Account Actions */}
      <div className="space-y-3">
        <button className="w-full h-[48px] rounded-xl border border-[#2D2D3A] text-[#F9FAFB] text-[14px] font-semibold flex items-center justify-center gap-2 transition-all hover:border-[#b8c4ff]">
          <span className="material-symbols-outlined text-[18px]">logout</span>
          Sign Out
        </button>
        <button className="w-full h-[48px] rounded-xl border border-[#FF4757]/30 text-[#FF4757] text-[14px] font-semibold flex items-center justify-center gap-2 transition-all hover:bg-[#FF4757]/5">
          <span className="material-symbols-outlined text-[18px]">delete_forever</span>
          Delete Account
        </button>
      </div>
    </div>
  );
}
