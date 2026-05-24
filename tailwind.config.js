/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#08080A",
        primary: "#6D5DF6",
        secondary: "#9E7BFF",
        accent: "#00D9FF",
        darkCard: "#121216",
        darkBorder: "rgba(255, 255, 255, 0.08)",
      },
      fontFamily: {
        sora: ["Sora", "sans-serif"],
        inter: ["Inter", "sans-serif"],
      },
      backgroundImage: {
        'glow-gradient': 'linear-gradient(135deg, #6D5DF6 0%, #9E7BFF 50%, #00D9FF 100%)',
        'dark-gradient': 'linear-gradient(180deg, #0C0C0F 0%, #08080A 100%)',
      },
      boxShadow: {
        'neon-glow': '0 0 20px rgba(109, 93, 246, 0.15)',
        'neon-accent': '0 0 20px rgba(0, 217, 255, 0.15)',
      }
    },
  },
  plugins: [],
}
