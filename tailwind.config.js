/** @type {import('tailwindcss').Config} */

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "hero-pattern": "url('./assets/BG.jpg')",
      },
      screens: {
        "xsm": "510px",
        "xxsm" : "370px"
      }
    },
  },
  plugins: [],
}
