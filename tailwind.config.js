/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        base: "#060610",
        surface: "#0d1117",
        card: "#11161f",
        "card-hover": "#161c28",
        orange: {
          400: "#fb923c",
          500: "#f97316",
          600: "#ea580c",
        },
        cyan: {
          400: "#22d3ee",
          500: "#06b6d4",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "Fira Code", "monospace"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "hero-gradient":
          "radial-gradient(ellipse 80% 50% at 50% -20%, rgba(249,115,22,0.15), transparent)",
        "card-gradient":
          "linear-gradient(135deg, rgba(249,115,22,0.05) 0%, transparent 60%)",
      },
      animation: {
        "fade-up": "fadeUp 0.6s ease forwards",
        "fade-in": "fadeIn 0.4s ease forwards",
        blink: "blink 1s step-end infinite",
        "pulse-slow": "pulse 4s ease-in-out infinite",
        "spin-slow": "spin 8s linear infinite",
        float: "float 6s ease-in-out infinite",
        shimmer: "shimmer 2.5s linear infinite",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: 0, transform: "translateY(24px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
        fadeIn: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
        blink: {
          "0%, 100%": { opacity: 1 },
          "50%": { opacity: 0 },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-12px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% center" },
          "100%": { backgroundPosition: "200% center" },
        },
      },
      boxShadow: {
        glow: "0 0 20px rgba(249,115,22,0.25)",
        "glow-sm": "0 0 10px rgba(249,115,22,0.15)",
        "glow-cyan": "0 0 20px rgba(34,211,238,0.2)",
        card: "0 1px 3px rgba(0,0,0,0.4), 0 4px 16px rgba(0,0,0,0.3)",
        "card-hover": "0 4px 24px rgba(0,0,0,0.5), 0 0 0 1px rgba(249,115,22,0.15)",
      },
      borderColor: {
        subtle: "rgba(255,255,255,0.07)",
        "subtle-hover": "rgba(249,115,22,0.3)",
      },
      transitionTimingFunction: {
        spring: "cubic-bezier(0.34, 1.56, 0.64, 1)",
      },
    },
  },
  plugins: [],
};
