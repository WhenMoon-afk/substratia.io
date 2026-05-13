/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        "forge-dark": "#1a1a2e",
        "forge-purple": "#7c3aed",
        "forge-cyan": "#00d4ff",
      },
    },
  },
  plugins: [],
};
