import path from "path";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  css: ["~/assets/css/main.css"],
  debug: false,
  devtools: { enabled: true },
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  modules: ['@pinia/nuxt', "@stefanobartoletti/nuxt-social-share"],
  socialShare: {
    // module options
  },
  css: [
    "~/assets/css/main.css",
  ],
});