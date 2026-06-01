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
        evergreen: {
          50:  "#eff6f3",
          100: "#deede7",
          200: "#bedace",
          300: "#9dc8b6",
          400: "#7cb69e",
          500: "#5ca385",
          600: "#49836b",
          700: "#376250",
          800: "#254135",
          900: "#12211b",
          950: "#0d1713",
        },
        harvest: {
          50:  "#fdf6e3",
          100: "#f9e8b4",
          200: "#f3d07a",
          300: "#edb842",
          DEFAULT: "#c8892a",
          600: "#a06e1c",
          700: "#7d5216",
          800: "#5a3b10",
        },
        "brick-red": "#8B1A1A",
      },
      fontFamily: {
        display: ["Bree Serif", "serif"],
        body:    ["Source Sans 3", "sans-serif"],
      },
      boxShadow: {
        card: "0 2px 12px rgba(0,0,0,0.07), 0 1px 3px rgba(0,0,0,0.04)",
        nav:  "0 1px 0 rgba(0,0,0,0.07), 0 2px 8px rgba(0,0,0,0.04)",
      },
    },
  },
  plugins: [],
};

export default config;
