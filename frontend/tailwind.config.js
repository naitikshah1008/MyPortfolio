/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#ecfeff",
          100: "#cffafe",
          200: "#a5f3fc",
          300: "#67e8f9",
          400: "#22d3ee",
          500: "#06b6d4",
          600: "#0891b2",
          700: "#0e7490",
          800: "#155e75",
          900: "#164e63",
        },
        accent: {
          50: "#fbf6ee",
          100: "#f3e6d1",
          200: "#e4c99e",
          300: "#d3a765",
          400: "#bf8540",
          500: "#a9692d",
          600: "#8c4f23",
          700: "#703d20",
          800: "#5b3320",
          900: "#4a2b1e",
        },
        dark: {
          50: "#f6f8f9",
          100: "#e8edf0",
          200: "#cbd5dc",
          300: "#a7b6c1",
          400: "#7a8c99",
          500: "#5c6e7b",
          600: "#41505b",
          700: "#27343d",
          800: "#111c24",
          900: "#071017",
        },
      },
      fontFamily: {
        sans: [
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "sans-serif",
        ],
        display: [
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "sans-serif",
        ],
        mono: ["JetBrains Mono", "SFMono-Regular", "Consolas", "monospace"],
      },
      animation: {
        gradient: "gradient 8s linear infinite",
        float: "float 6s ease-in-out infinite",
        glow: "glow 2s ease-in-out infinite",
        heartbeat: "heartbeat 1.5s ease-in-out infinite",
      },
      keyframes: {
        gradient: {
          "0%, 100%": {
            "background-size": "200% 200%",
            "background-position": "left center",
          },
          "50%": {
            "background-size": "200% 200%",
            "background-position": "right center",
          },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        glow: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.5" },
        },
        heartbeat: {
          "0%, 100%": { transform: "scale(1)" },
          "10%": { transform: "scale(1.2)" },
          "20%": { transform: "scale(1)" },
          "30%": { transform: "scale(1.2)" },
          "40%": { transform: "scale(1)" },
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        glass:
          "linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05))",
      },
      backdropBlur: {
        xs: "2px",
      },
    },
  },
  plugins: [],
};
