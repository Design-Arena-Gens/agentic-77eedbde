import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./styles/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        twilight: {
          900: "#0b0f23",
          800: "#12183a",
          700: "#1b2351"
        },
        aurora: {
          500: "#5ae3ff",
          600: "#3ac9ff",
          700: "#1497ff"
        },
        gold: {
          400: "#f8d57a",
          500: "#f7c651",
          600: "#d9a227"
        }
      },
      backgroundImage: {
        "cosmic-gradient":
          "radial-gradient(circle at 20% 20%, rgba(90,227,255,0.35) 0%, transparent 45%), radial-gradient(circle at 80% 30%, rgba(20,151,255,0.45) 0%, transparent 50%), linear-gradient(135deg, #0b0f23 0%, #12183a 45%, #1b2351 100%)"
      },
      boxShadow: {
        "book-glow": "0 0 60px rgba(250, 230, 160, 0.45)"
      },
      fontFamily: {
        sans: ["'Noto Sans Arabic'", "var(--font-geist-sans)", "system-ui"],
        display: ["'Cormorant Garamond'", "serif"]
      }
    }
  },
  plugins: []
};

export default config;
