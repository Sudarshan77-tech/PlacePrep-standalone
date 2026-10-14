
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        app: {
          bg: "#08080C",
          secondary: "#0D0D14",
          card: "#13131C",
          elevated: "#181824",
          hover: "#1F1F2E",
          border: "#232334",
          primary: "#8B5CF6",
          "primary-hover": "#7C3AED",
          "primary-light": "#A78BFA",
          text: "#FFFFFF",
          body: "#D1D5DB",
          muted: "#9CA3AF",
        },
        brand: {
          50: "#FAF5FF",
          100: "#F3E8FF",
          200: "#E9D5FF",
          300: "#D8B4FE",
          400: "#C084FC",
          500: "#8B5CF6",
          600: "#7C3AED",
          700: "#6D28D9",
          800: "#5B21B6",
          900: "#4C1D95",
          950: "#2E1065",
        },
      },
      boxShadow: {
        'purple-glow-sm': '0 0 15px -3px rgba(139, 92, 246, 0.3)',
        'purple-glow-md': '0 0 25px -4px rgba(139, 92, 246, 0.35)',
        'purple-glow-lg': '0 0 35px -5px rgba(124, 58, 237, 0.4)',
        'card-dark': '0 4px 20px rgba(0, 0, 0, 0.4)',
      },
    },
  },
  plugins: [],
};

export default config;
