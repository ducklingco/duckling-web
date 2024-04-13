/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue",
  ],
  theme: {
    extend: {
      colors: {
        red: "#c62322",
        green: "#009c1a",
        black: "#000000",
        beige: "#dcd7cb",
        grey: "#707070",
        white: "#ffffff",
        blue: "#097d94",
        pink: "#d55698",
        light_grey: "#f2f2f2",
      },
    },
  },
  plugins: [],
};
