import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Surface scale
        background: "#11131c",
        surface: "#11131c",
        "surface-dim": "#11131c",
        "surface-bright": "#373943",
        "surface-container-lowest": "#0c0e17",
        "surface-container-low": "#191b25",
        "surface-container": "#1d1f29",
        "surface-container-high": "#282933",
        "surface-container-highest": "#33343e",
        "surface-variant": "#33343e",
        // App bg layers
        "bg-primary": "#0A0A0F",
        "bg-secondary": "#13131A",
        "bg-tertiary": "#1C1C28",
        "bg-glass": "rgba(30, 30, 46, 0.85)",
        // Primary (Electric Blue / Lavender)
        primary: "#b8c4ff",
        "primary-fixed": "#dde1ff",
        "primary-fixed-dim": "#b8c4ff",
        "primary-container": "#1a56ff",
        "on-primary": "#002584",
        "on-primary-fixed": "#001453",
        "on-primary-fixed-variant": "#0037b9",
        "on-primary-container": "#e6e8ff",
        "inverse-primary": "#004af0",
        // Secondary (Neon Green)
        secondary: "#7dffa2",
        "secondary-fixed": "#62ff96",
        "secondary-fixed-dim": "#00e475",
        "secondary-container": "#05e777",
        "on-secondary": "#003918",
        "on-secondary-fixed": "#00210b",
        "on-secondary-fixed-variant": "#005226",
        "on-secondary-container": "#00622e",
        // Tertiary (Warm Orange)
        tertiary: "#ffb59f",
        "tertiary-fixed": "#ffdbd1",
        "tertiary-fixed-dim": "#ffb59f",
        "tertiary-container": "#c13700",
        "on-tertiary": "#5f1600",
        "on-tertiary-fixed": "#3a0a00",
        "on-tertiary-fixed-variant": "#862300",
        "on-tertiary-container": "#ffe4dc",
        // Error
        error: "#ffb4ab",
        "error-container": "#93000a",
        "on-error": "#690005",
        "on-error-container": "#ffdad6",
        // On colors
        "on-background": "#e1e1ef",
        "on-surface": "#e1e1ef",
        "on-surface-variant": "#c3c5d9",
        "inverse-surface": "#e1e1ef",
        "inverse-on-surface": "#2e303a",
        // Outline
        outline: "#8d90a2",
        "outline-variant": "#434656",
        "surface-tint": "#b8c4ff",
        // Text tokens
        "text-primary": "#F9FAFB",
        "text-secondary": "#9CA3AF",
        "text-tertiary": "#4B5563",
        // Border tokens
        "border-default": "#2D2D3A",
        "border-glass": "rgba(255, 255, 255, 0.06)",
        // Accents
        "accent-amber": "#FFB300",
        "accent-red": "#FF4757",
        "accent-purple": "#A855F7",
      },
      fontFamily: {
        // Aliases matching Stitch design tokens
        label: ["Inter", "metropolis", "sans-serif"],
        "heading-1": ["Lexend", "lexend", "sans-serif"],
        "heading-2": ["Lexend", "lexend", "sans-serif"],
        "heading-3": ["Lexend", "lexend", "sans-serif"],
        "display-lg": ["Lexend", "lexend", "sans-serif"],
        "display-xl": ["Lexend", "lexend", "sans-serif"],
        "body-lg": ["Inter", "metropolis", "sans-serif"],
        "body-md": ["Inter", "metropolis", "sans-serif"],
        "body-sm": ["Inter", "metropolis", "sans-serif"],
        mono: ["JetBrains Mono", "jetbrainsMono", "monospace"],
        sans: ["Inter", "sans-serif"],
        display: ["Lexend", "sans-serif"],
      },
      fontSize: {
        label: ["11px", { lineHeight: "1.4", letterSpacing: "0.05em", fontWeight: "600" }],
        "heading-1": ["28px", { lineHeight: "1.3", fontWeight: "700" }],
        "heading-2": ["22px", { lineHeight: "1.35", fontWeight: "600" }],
        "heading-3": ["18px", { lineHeight: "1.4", fontWeight: "600" }],
        "display-lg": ["36px", { lineHeight: "1.2", fontWeight: "700" }],
        "display-xl": ["56px", { lineHeight: "1.1", fontWeight: "800" }],
        "body-lg": ["16px", { lineHeight: "1.6", fontWeight: "400" }],
        "body-md": ["14px", { lineHeight: "1.6", fontWeight: "400" }],
        "body-sm": ["12px", { lineHeight: "1.5", fontWeight: "400" }],
        mono: ["14px", { lineHeight: "1.4", fontWeight: "400" }],
      },
      borderRadius: {
        DEFAULT: "0.25rem",
        lg: "0.5rem",
        xl: "0.75rem",
        "2xl": "1.25rem",
        full: "9999px",
      },
      spacing: {
        "space-1": "4px",
        "space-2": "8px",
        "space-3": "12px",
        "space-4": "16px",
        "space-5": "20px",
        "space-6": "24px",
        "space-8": "32px",
        "space-10": "40px",
      },
      boxShadow: {
        "glow-primary": "0 0 20px rgba(184, 196, 255, 0.25)",
        "glow-blue": "0 0 20px rgba(26, 86, 255, 0.30)",
        "glow-green": "0 0 20px rgba(125, 255, 162, 0.25)",
        "glow-amber": "0 0 20px rgba(255, 179, 0, 0.25)",
        "inner-glow": "inset 0 1px 1px rgba(255,255,255,0.4), inset 0 -1px 1px rgba(0,0,0,0.2)",
      },
      animation: {
        "slide-up": "slideUp 0.4s ease forwards",
        "fade-in": "fadeIn 0.3s ease forwards",
        "typing-dot": "typingDot 1.4s ease-in-out infinite",
      },
      keyframes: {
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        typingDot: {
          "0%, 60%, 100%": { opacity: "0.3", transform: "translateY(0)" },
          "30%": { opacity: "1", transform: "translateY(-4px)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
