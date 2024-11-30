/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        cookie: ["Cookie", "cursive"],
        corinthia: ["Corinthia", "serif"],
        "dm-serif": ["DM Serif Text", "serif"],
        inter: ["Inter", "sans-serif"],
        "open-sans": ["Open Sans", "sans-serif"],
      },
    },
  },
  plugins: [],
};
