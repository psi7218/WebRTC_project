import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  safelist: [
    "bg-claret",
    "bg-blueviolet",
    "bg-green",
    "bg-yellow",
    "bg-red",
    "bg-black",
    "bg-white",
  ],

  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        blueviolet: "#5865F2",
        green: "#57F287",
        yellow: "#FEE75C",
        claret: "#EB459E",
        red: "#ED4245",
        white: "#FFFFFF",
        black: "#000000",
      },
    },
  },
  plugins: [],
} satisfies Config;
