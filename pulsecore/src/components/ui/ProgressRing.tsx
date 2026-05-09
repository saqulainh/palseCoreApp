"use client";

interface ProgressRingProps {
  value: number; // 0–100
  size?: number; // px
  strokeWidth?: number;
  color?: "primary" | "secondary" | "amber" | "red";
  showLabel?: boolean;
  label?: string;
  className?: string;
}

const colorMap = {
  primary: {
    stroke: "#b8c4ff",
    glow: "drop-shadow-glow-primary",
  },
  secondary: {
    stroke: "#7dffa2",
    glow: "drop-shadow-glow-secondary",
  },
  amber: {
    stroke: "#FFB300",
    glow: "drop-shadow-glow-amber",
  },
  red: {
    stroke: "#FF4757",
    glow: "",
  },
};

export function ProgressRing({
  value,
  size = 112,
  strokeWidth = 10,
  color = "primary",
  showLabel = true,
  label,
  className = "",
}: ProgressRingProps) {
  const radius = (size / 2) - strokeWidth / 2;
  const circumference = 2 * Math.PI * radius;
  const clampedValue = Math.max(0, Math.min(100, value));
  const strokeDashoffset = circumference - (clampedValue / 100) * circumference;

  const { stroke, glow } = colorMap[color];

  return (
    <div className={`flex flex-col items-center ${className}`}>
      <div
        className="relative flex items-center justify-center"
        style={{ width: size, height: size }}
      >
        <svg
          width={size}
          height={size}
          viewBox={`0 0 ${size} ${size}`}
          className={`transform -rotate-90 ${glow}`}
        >
          {/* Background track */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="transparent"
            stroke="#33343e"
            strokeWidth={strokeWidth}
          />
          {/* Progress arc */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="transparent"
            stroke={stroke}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            style={{ transition: "stroke-dashoffset 0.6s ease" }}
          />
        </svg>
        {/* Center label */}
        {showLabel && (
          <div className="absolute inset-0 flex items-center justify-center flex-col">
            <span className="text-[28px] font-extrabold leading-none tracking-tighter text-[#F9FAFB]">
              {clampedValue}
              <span className="text-[12px] font-normal">%</span>
            </span>
          </div>
        )}
      </div>
      {label && (
        <span className="mt-3 text-[11px] font-bold uppercase tracking-widest text-[#9CA3AF]">
          {label}
        </span>
      )}
    </div>
  );
}
