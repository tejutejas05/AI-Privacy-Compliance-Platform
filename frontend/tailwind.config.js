/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#3b82f6",
        darkbg: "#0f172a",
        cardbg: "#1e293b"
      }
    },
  },
  plugins: [],
};