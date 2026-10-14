
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
          bg: "#0B0B0F",
          secondary: "#101016",
          card: "#15151D",
          elevated: "#1C1C26",
          hover: "#242432",
          border: "#2A2A38",
          primary: "#8B5CF6",
          "primary-hover": "#7C3AED",
          "primary-light": "#A78BFA",
          text: "#F5F5F7",
          body: "#A1A1AA",
          muted: "#71717A",
        },
        brand: {
          50: "#F5F3FF",
          100: "#EDE9FE",
          200: "#DDD6FE",
          300: "#C4B5FD",
          400: "#A78BFA",
          500: "#8B5CF6",
          600: "#7C3AED",
          700: "#6D28D9",
          800: "#5B21B6",
          900: "#3B0764",
        },
      },
    },
  },
  plugins: [],
};

export default config;
