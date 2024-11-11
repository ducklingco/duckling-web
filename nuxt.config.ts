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

  modules: ['@pinia/nuxt', "@stefanobartoletti/nuxt-social-share", "@nuxt/eslint"],

  socialShare: {
    // module options
  },

  routeRules: {
    '/carousel/**': { swr: 60 },
    '.well-known/assetlinks.json':{
      headers: {
        "Content-Type": "application/json",
      }
    },
    '.well-known/apple-app-site-association':{
      headers: {
        "Content-Type": "application/json",
      }
    }
  },

  compatibilityDate: "2024-10-24"
});