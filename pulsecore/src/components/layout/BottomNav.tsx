"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavItem {
  href: string;
  icon: string;
  label: string;
  isFab?: boolean;
}

const NAV_ITEMS: NavItem[] = [
  { href: "/dashboard", icon: "home", label: "Home" },
  { href: "/workout", icon: "fitness_center", label: "Workouts" },
  { href: "/coach", icon: "smart_toy", label: "Coach", isFab: true },
  { href: "/analytics", icon: "query_stats", label: "Progress" },
  { href: "/settings", icon: "person", label: "Profile" },
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 flex justify-around items-center px-4 pb-safe h-[72px] md:hidden max-w-md mx-auto"
      style={{
        background: "rgba(30, 30, 46, 0.85)",
        backdropFilter: "blur(32px)",
        WebkitBackdropFilter: "blur(32px)",
        borderTop: "1px solid rgba(255, 255, 255, 0.06)",
        boxShadow:
          "0 -1px 0 0 rgba(255,255,255,0.06), inset 0 1px 0 0 rgba(0,0,0,0.4), 0 -10px 30px rgba(0,0,0,0.5)",
      }}
    >
      {NAV_ITEMS.map((item) => {
        const isActive = pathname === item.href || pathname.startsWith(item.href + "/");

        if (item.isFab) {
          return (
            <Link
              key={item.href}
              href={item.href}
              className="flex flex-col items-center justify-center"
            >
              <div
                className={`w-14 h-14 -mt-8 rounded-full flex items-center justify-center transition-all active:scale-90 duration-200 border-4 border-[#0A0A0F] ${
                  isActive
                    ? "bg-[#1a56ff] shadow-[0_8px_24px_rgba(26,86,255,0.4)]"
                    : "bg-[#b8c4ff] shadow-[0_8px_24px_rgba(184,196,255,0.3)]"
                }`}
                style={{
                  boxShadow: isActive
                    ? "inset 0 1px 1px rgba(255,255,255,0.4), inset 0 -1px 1px rgba(0,0,0,0.2), 0 8px 24px rgba(26,86,255,0.4)"
                    : "inset 0 1px 1px rgba(255,255,255,0.4), inset 0 -1px 1px rgba(0,0,0,0.2), 0 8px 24px rgba(184,196,255,0.3)",
                }}
              >
                <span
                  className="material-symbols-outlined text-2xl text-[#002584]"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  {item.icon}
                </span>
              </div>
            </Link>
          );
        }

        return (
          <Link
            key={item.href}
            href={item.href}
            className={`flex flex-col items-center justify-center transition-all active:scale-90 duration-200 px-3 py-1 rounded-xl ${
              isActive
                ? "text-[#b8c4ff] bg-[#1a56ff]/10 border border-[#b8c4ff]/10"
                : "text-[#c3c5d9] opacity-60 hover:opacity-100 hover:text-[#b8c4ff]"
            }`}
          >
            <span
              className="material-symbols-outlined mb-1"
              style={{
                fontVariationSettings: isActive ? "'FILL' 1" : "'FILL' 0",
              }}
            >
              {item.icon}
            </span>
            <span className="text-[11px] font-bold uppercase tracking-widest">
              {item.label}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
