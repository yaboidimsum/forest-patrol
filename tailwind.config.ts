import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
    "./src/pages/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        foreground: "#87dac6",
        deep: "#011c16",
        border: "#025b45",
        panel: "#03231c",
        accent: "#cacaca",
        muted: "#191b1b",
        "muted-fg": "#71717a",
      },
      fontFamily: {
        mono: [
          "var(--font-vcr)",
          '"VT323"',
          '"Courier New"',
          "monospace",
        ],
        sans: [
          '"SF Pro"',
          "-apple-system",
          "BlinkMacSystemFont",
          "system-ui",
          "sans-serif",
        ],
      },
      keyframes: {
        flicker: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.92" },
        },
        pulseGlow: {
          "0%, 100%": { textShadow: "0 0 8px rgba(135,218,198,0.3)" },
          "50%": { textShadow: "0 0 24px rgba(135,218,198,0.6)" },
        },
        scanline: {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100%)" },
        },
        typewriter: {
          from: { width: "0" },
          to: { width: "100%" },
        },
        blink: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0" },
        },
        floatDust: {
          "0%": { transform: "translateY(0) translateX(0)", opacity: "0.4" },
          "50%": { opacity: "0.8" },
          "100%": { transform: "translateY(-100vh) translateX(20px)", opacity: "0" },
        },
        shake: {
          "0%, 100%": { transform: "translateX(0)" },
          "25%": { transform: "translateX(-2px)" },
          "75%": { transform: "translateX(2px)" },
        },
      },
      animation: {
        flicker: "flicker 4s ease-in-out infinite",
        "pulse-glow": "pulseGlow 2.4s ease-in-out infinite",
        scanline: "scanline 8s linear infinite",
        typewriter: "typewriter 2s steps(40) forwards",
        blink: "blink 1s steps(2) infinite",
        "float-dust": "floatDust 14s linear infinite",
        shake: "shake 0.18s ease-in-out",
      },
      backgroundImage: {
        "vignette":
          "radial-gradient(ellipse 885.94px 540px at 0% 50%, rgba(0,10,7,0) 0%, rgba(13,18,16,0.75) 50%, rgba(0,10,7,1) 100%)",
      },
    },
  },
  plugins: [],
};

export default config;
