import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        navy: { DEFAULT: "#1a2332", deep: "#0f1624" },
        brand: { DEFAULT: "#ffc107", dark: "#e6ac00" },
        teal: { DEFAULT: "#158090", dark: "#126471", bright: "#1a9cab", tint: "#e4f1f3" },
        paper: "#f5f2ea",
        line: "#d8d2c2",
      },
      fontFamily: {
        display: ['"Barlow Condensed"', "Impact", "sans-serif"],
        sans: ['"Inter Variable"', "system-ui", "sans-serif"],
      },
      boxShadow: {
        hard: "4px 4px 0 0 #1a2332",
        "hard-y": "6px 6px 0 0 #ffc107",
        "hard-sm": "3px 3px 0 0 #1a2332",
      },
    },
  },
  plugins: [],
};

export default config;
