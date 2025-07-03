import { type Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./pages/**/*.{ts,tsx}",
  ],
  darkMode: "class", // Use 'media' if you prefer OS-based dark mode
  theme: {
    extend: {
      fontFamily: {
        body: "var(--font-sans)",
        display: "var(--font-display)",
      },
      colors: {
        background: "var(--color-background)",
        foreground: "var(--color-foreground)",
        sky: "#63C3ED",
        cloud: "#F5F5F5",
        trunk: "#A65F38",
        leaf: {
          100: "#D9F8D5",
          400: "#7AE582",
          600: "#5DD05A",
        },
        orange: {
          300: "#FCA652",
          400: "#F68B36",
        },
      },
      boxShadow: {
        soft: "0 4px 12px rgba(0, 0, 0, 0.05)",
        hover: "0 6px 18px rgba(0, 0, 0, 0.1)",
      },
    },
  },
  plugins: [],
};

export default config;
