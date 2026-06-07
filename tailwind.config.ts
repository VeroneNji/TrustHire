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
        primary: {
          DEFAULT: "#0F172A", // Deep Navy Blue
          foreground: "#FFFFFF",
        },
        secondary: {
          DEFAULT: "#10B981", // Emerald Green
          foreground: "#FFFFFF",
        },
        background: "#FFFFFF",
        surface: "#F8FAFC", // Light Gray
        warning: "#F59E0B", // Amber Orange
        error: "#EF4444", // Red
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        heading: ["Poppins", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
