import path from "path";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  css: ["~/assets/css/main.css"],
  devtools: { enabled: true },
  ssr: true,
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
  routeRules: [
    {
      '/carousel/**': { swr: 60 },
    }
  ],
  css: [
    "~/assets/css/main.css",
  ],
});