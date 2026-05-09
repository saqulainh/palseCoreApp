interface BadgeProps {
  label: string;
  variant?: "default" | "primary" | "success" | "warning" | "danger";
  className?: string;
}

const variantStyles = {
  default:
    "bg-[#1d1f29]/50 text-[#9CA3AF] border border-[#2D2D3A]/50",
  primary:
    "bg-[#b8c4ff]/10 text-[#b8c4ff] border border-[#b8c4ff]/20 shadow-[inset_0_0_8px_rgba(184,196,255,0.1)]",
  success:
    "bg-[#7dffa2]/10 text-[#7dffa2] border border-[#7dffa2]/20",
  warning:
    "bg-[#FFB300]/10 text-[#FFB300] border border-[#FFB300]/20",
  danger:
    "bg-[#FF4757]/10 text-[#FF4757] border border-[#FF4757]/20",
};

export function Badge({
  label,
  variant = "default",
  className = "",
}: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center px-3 py-1.5 rounded-full text-[11px] font-semibold uppercase tracking-widest ${variantStyles[variant]} ${className}`}
    >
      {label}
    </span>
  );
}
