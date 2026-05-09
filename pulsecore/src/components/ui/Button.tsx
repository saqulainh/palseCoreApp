import React from "react";

type ButtonVariant = "primary" | "ghost" | "danger" | "secondary";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: string;
  iconFilled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  children: React.ReactNode;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-[#1a56ff] text-white hover:bg-[#1a56ff]/90 active:scale-[0.97] shadow-lg shadow-[#1a56ff]/20 inner-glow-btn",
  ghost:
    "bg-transparent border border-[#2D2D3A] text-[#F9FAFB] hover:border-[#b8c4ff] hover:text-[#b8c4ff] active:scale-[0.97]",
  danger:
    "bg-[#FF4757] text-white hover:bg-[#FF4757]/90 active:scale-[0.97] shadow-lg shadow-[#FF4757]/20",
  secondary:
    "bg-transparent border border-[#b8c4ff]/50 text-[#b8c4ff] hover:bg-[#b8c4ff]/10 active:scale-[0.97]",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "h-9 px-4 text-[12px] rounded-lg gap-1.5",
  md: "h-[52px] px-6 text-[14px] rounded-xl gap-2",
  lg: "h-[56px] px-8 text-[16px] rounded-xl gap-2",
};

export function Button({
  variant = "primary",
  size = "md",
  icon,
  iconFilled = false,
  loading = false,
  fullWidth = false,
  children,
  className = "",
  disabled,
  ...props
}: ButtonProps) {
  return (
    <button
      className={[
        "inline-flex items-center justify-center font-semibold tracking-wide transition-all duration-200",
        variantStyles[variant],
        sizeStyles[size],
        fullWidth ? "w-full" : "",
        disabled || loading ? "opacity-50 cursor-not-allowed" : "",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <span className="material-symbols-outlined animate-spin text-[18px]">
          progress_activity
        </span>
      ) : (
        <>
          {icon && (
            <span
              className="material-symbols-outlined text-[20px]"
              style={
                iconFilled
                  ? { fontVariationSettings: "'FILL' 1" }
                  : undefined
              }
            >
              {icon}
            </span>
          )}
          {children}
        </>
      )}
    </button>
  );
}
