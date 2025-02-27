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
  runtimeConfig: {
    public: {
      backendUrl: "",
      webPlayerUrl: "",
    },
    quickpayApiKey: "",
    quickpayPrivateKey: "",
    campaignDbUsername: "",
    campaignDbPassword: "",
    campaignDbNamespace: "",
    campaignDbDatabase: "",
    campaignDbUrl: "",
  },

  modules: [
    "@pinia/nuxt",
    "@stefanobartoletti/nuxt-social-share",
    "@nuxt/eslint",
  ],

  socialShare: {
    // module options
  },

  routeRules: {
    "/duck/**": { swr: 60 },
    ".well-known/assetlinks.json": {
      headers: {
        "Content-Type": "application/json",
      },
    },
    ".well-known/apple-app-site-association": {
      headers: {
        "Content-Type": "application/json",
      },
    },
  },
  serverHandlers: [{ route: "/api/proxy", handler: "~/server/api/proxy.ts" }],

  compatibilityDate: "2024-10-24",
});
