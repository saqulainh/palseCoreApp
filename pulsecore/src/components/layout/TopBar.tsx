"use client";

import Link from "next/link";

interface TopBarProps {
  title?: string;
  showBack?: boolean;
}

export function TopBar({ title = "PULSE CORE", showBack = false }: TopBarProps) {
  return (
    <header
      className="sticky top-0 z-50 w-full h-16 flex items-center justify-between px-5"
      style={{
        background: "rgba(30, 30, 46, 0.85)",
        backdropFilter: "blur(32px)",
        WebkitBackdropFilter: "blur(32px)",
        boxShadow:
          "0 1px 0 0 rgba(255,255,255,0.06), inset 0 -1px 0 0 rgba(0,0,0,0.4), 0 4px 20px rgba(0,0,0,0.3)",
      }}
    >
      {/* Left: Menu or Back */}
      <button
        className="text-[#b8c4ff] hover:opacity-80 transition-opacity active:scale-95 duration-200 p-2 -ml-2 rounded-full hover:bg-white/5 flex items-center justify-center"
        aria-label="Menu"
      >
        <span className="material-symbols-outlined text-2xl">
          {showBack ? "arrow_back" : "menu"}
        </span>
      </button>

      {/* Center: Logo */}
      <Link href="/dashboard" className="flex items-center">
        <h1
          className="font-extrabold tracking-tighter text-[#b8c4ff]"
          style={{
            fontFamily: "Lexend, sans-serif",
            fontSize: "28px",
            lineHeight: "1.2",
            textShadow: "0 0 12px rgba(184, 196, 255, 0.35)",
          }}
        >
          {title}
        </h1>
      </Link>

      {/* Right: Notifications */}
      <button
        className="text-[#b8c4ff] hover:opacity-80 transition-opacity active:scale-95 duration-200 p-2 -mr-2 rounded-full hover:bg-white/5 relative flex items-center justify-center"
        aria-label="Notifications"
      >
        <span className="material-symbols-outlined text-2xl">notifications</span>
        {/* Notification dot */}
        <span className="absolute top-2 right-2 w-2 h-2 bg-[#FF4757] rounded-full" />
      </button>
    </header>
  );
}
