import type { Config } from "tailwindcss";

const config = {
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    screens: {
      mobile: "600px",
      tablet: "768px",
      laptop: "1024px",
      desktop: "1280px",
      bigDesktop: "1560px",
    },
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "show-filters": "show-filters 0.4s cubic-bezier(.61,1,.88,1)",
        "hide-filters": "hide-filters 0.4s cubic-bezier(.61,1,.88,1)",
        "show-booking": "show-booking 0.4s cubic-bezier(.61,1,.88,1)",
        "hide-booking": "hide-booking 0.4s cubic-bezier(.61,1,.88,1)",
        "show-overlay": "show-overlay 0.4s cubic-bezier(.61,1,.88,1)",
      },
      border: {
        booking: "2px solid hsl(85deg 54% 51%)",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      boxShadow: {
        grayPrimary: "15px 16px 60px 0px rgba(0, 0, 0, 0.15)",
        btnShadow: "3.346px 3.716px 15px 0px rgba(0, 0, 0, 0.05)",
      },
      colors: {
        borderBooking: "hsl(var(--borderBooking))",
        borderForm: "hsl(var(--borderForm))",
        borderGray: "hsl(var(--borderGray))",
        borderMenu: "hsl(var(--borderMenu))",
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        bgSecondary: "hsl(var(--bgSecondary))",
        foreground: "hsl(var(--foreground))",
        grayFont: "hsl(var(--grayFont))",
        graySecondary: "hsl(var(--graySecondary))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
          background: "hsl(var(--primary-background))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        success: {
          DEFAULT: "hsl(var(--success))",
          foreground: "hsl(var(--success-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      height: {
        "revert": "revert-layer",
      },
      keyframes: {
        "show-filters": {
          "0%": { opacity: "0.5", right: "-100%" },
          "100%": { opacity: "1", right: "0%" },
        },
        "hide-filters": {
          "0%": { opacity: "1", right: "0%" },
          "100%": { opacity: "0.5", right: "-100%" },
        },
        "show-booking": {
          "0%": { opacity: "0.5", top: "-100%" },
          "100%": { opacity: "1", top: "0%" },
        },
        "hide-booking": {
          "0%": { opacity: "1", top: "0%" },
          "100%": { opacity: "0.5", top: "-100%" },
        },
        "show-overlay": {
          "0%": { background: "rgb(0 0 0 / 0)" },
          "100%": { background: "rgb(0 0 0 / .5)" },
        },
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;
