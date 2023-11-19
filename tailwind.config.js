/** @type {import('tailwindcss').Config} */

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "hero-pattern": "url('./assets/BG.jpg')",
      },
      screens: {
        xsm: "510px",
        xxsm: "370px",
      },
      gridTemplateColumns: {
        "20": "repeat(20, minmax(0, 1fr))",
        "18": "repeat(18, minmax(0, 1fr))",
        "16": "repeat(16, minmax(0, 1fr))",
        "14": "repeat(14, minmax(0, 1fr))",
      },
    },
  },
  plugins: [],
}
