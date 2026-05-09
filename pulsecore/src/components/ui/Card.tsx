import React from "react";

interface CardProps {
  variant?: "glass" | "solid" | "panel";
  className?: string;
  children: React.ReactNode;
  glow?: boolean;
}

export function Card({
  variant = "glass",
  className = "",
  children,
  glow = false,
}: CardProps) {
  const variantClass =
    variant === "glass"
      ? "glass-card"
      : variant === "solid"
      ? "solid-card"
      : "glass-panel";

  return (
    <div className={`${variantClass} ${className}`}>
      {/* Top highlight line */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none" />
      {/* Card glow */}
      <div className="card-glow absolute inset-0 pointer-events-none" />
      {/* Optional blue glow for highlighted cards */}
      {glow && (
        <div className="absolute inset-0 rounded-[inherit] pointer-events-none shadow-[0_0_40px_rgba(26,86,255,0.1)] -z-10" />
      )}
      <div className="relative z-10">{children}</div>
    </div>
  );
}
