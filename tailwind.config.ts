import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        graphite: "#343434",
        fog: "#f3f3f3",
        steel: "#6d7376",
        alert: "#c9252d",
        civic: "#455a64"
      },
      fontFamily: {
        sans: ["var(--font-inter)", "Arial", "sans-serif"]
      },
      boxShadow: {
        soft: "0 18px 42px rgba(33, 37, 41, 0.10)"
      }
    }
  },
  plugins: []
};

export default config;
