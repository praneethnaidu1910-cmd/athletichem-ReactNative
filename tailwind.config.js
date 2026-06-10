/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        background: "#ffffff",
        foreground: "#1f2937",
        card: {
          DEFAULT: "#ffffff",
          foreground: "#1f2937",
        },
        primary: {
          DEFAULT: "#3b82f6",
          foreground: "#ffffff",
        },
        secondary: {
          DEFAULT: "#f3f4f6",
          foreground: "#4b5563",
        },
        muted: {
          DEFAULT: "#f9fafb",
          foreground: "#6b7280",
        },
        accent: {
          DEFAULT: "#dbeafe",
          foreground: "#1e3a8a",
        },
        destructive: {
          DEFAULT: "#ef4444",
          foreground: "#ffffff",
        },
        border: "#e5e7eb",
        input: "#e5e7eb",
        ring: "#3b82f6",
        recovery: "#3b82f6",
        biochem: "#2563eb",
        warning: "#ef4444",
        training: "#1d4ed8",
        moderate: "#1e40af",
        hydration: "#1e40af",
        fatigue: "#ef4444",
        neutral: "#6b7280",
      },
      borderRadius: {
        lg: "0.375rem",
        md: "0.25rem",
        sm: "0.125rem",
      },
    },
  },
  plugins: [],
};
