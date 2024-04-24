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
        duckling_red: "#c62322",
        duckling_green: "#009c1a",
        duckling_black: "#000000",
        duckling_beige: "#dcd7cb",
        duckling_grey: "#707070",
        duckling_white: "#ffffff",
        duckling_blue: "#097d94",
        duckling_pink: "#d55698",
        duckling_light_grey: "#f2f2f2",
      },
    },
  },
  plugins: [],
};
