/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        treviantNavy: "#1a253f",
        treviantGray: "#d9d9d9",
        treviantBlack: "#101010",
        treviantWhite: "#ffffff",
        treviantGreen: "#0b5e4a",
    },
  },
  plugins: [],
}}
