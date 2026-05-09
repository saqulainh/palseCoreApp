interface MetricTileProps {
  label: string;
  value: string;
  unit?: string;
  trend?: "up" | "down" | "neutral";
  trendValue?: string;
  trendLabel?: string;
  icon?: string;
  iconColor?: string;
  className?: string;
}

const trendColors = {
  up: "text-[#05e777]",
  down: "text-[#FF4757]",
  neutral: "text-[#9CA3AF]",
};

const trendIcons = {
  up: "trending_up",
  down: "trending_down",
  neutral: "trending_flat",
};

export function MetricTile({
  label,
  value,
  unit,
  trend = "neutral",
  trendValue,
  trendLabel,
  icon,
  iconColor = "text-[#b8c4ff]",
  className = "",
}: MetricTileProps) {
  return (
    <div
      className={`glass-panel rounded-xl p-4 flex flex-col justify-between min-h-[140px] relative overflow-hidden group hover:border-[#004af0]/40 transition-colors ${className}`}
      style={{
        background:
          "linear-gradient(135deg, rgba(29,31,41,0.4) 0%, transparent 100%)",
      }}
    >
      {/* Header */}
      <div className="flex justify-between items-start">
        <span className="text-[11px] font-bold uppercase tracking-widest text-[#9CA3AF]">
          {label}
        </span>
        {icon && (
          <div className="w-8 h-8 rounded-full bg-[#1d1f29]/50 border border-[rgba(255,255,255,0.06)] flex items-center justify-center">
            <span
              className={`material-symbols-outlined text-[16px] ${iconColor}`}
            >
              {icon}
            </span>
          </div>
        )}
      </div>

      {/* Value */}
      <div>
        <div className="text-[36px] font-bold leading-none tracking-tighter text-[#F9FAFB]">
          {value}
          {unit && (
            <span className="text-[22px] font-semibold text-[#4B5563] ml-1">
              {unit}
            </span>
          )}
        </div>
        {trendValue && (
          <div className="flex items-center gap-1 mt-1">
            <span
              className={`material-symbols-outlined text-[14px] ${trendColors[trend]}`}
            >
              {trendIcons[trend]}
            </span>
            <span
              className={`text-[14px] font-semibold font-mono ${trendColors[trend]}`}
            >
              {trendValue}
            </span>
            {trendLabel && (
              <span className="text-[12px] text-[#4B5563] ml-1">
                {trendLabel}
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
