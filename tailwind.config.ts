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
      },
      fontFamily: {
        display: ["Bree Serif", "serif"],
        body:    ["Source Sans 3", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
