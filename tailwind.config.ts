import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: {
          bg: "#0f0f0f",
          surface: "#1a1a1a",
          surfaceHover: "#242424",
          border: "#2a2a2a",
          text: "#f5f5f5",
          textMuted: "#a3a3a3",
          accent: "#8b5cf6",
          accentHover: "#7c3aed",
          success: "#10b981",
          warning: "#f59e0b",
          error: "#ef4444",
        },
      },
    },
  },
  plugins: [],
};
export default config;
