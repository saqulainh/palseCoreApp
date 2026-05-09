// Tailwind v4 with @tailwindcss/postcss uses CSS-first config.
// The tailwind.config.ts is used for content paths + extensions.
// Core design tokens are defined in globals.css via @theme.
const config = {
  plugins: {
    "@tailwindcss/postcss": {},
  },
};

export default config;
