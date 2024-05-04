import path from "path";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  css: ["~/assets/css/main.css"],
  devtools: { enabled: true },
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  modules: ['@pinia/nuxt', "@stefanobartoletti/nuxt-social-share"],
  primevue: {
    components: {
      prefix: "Prime",
      include: [
        "Button",
        "ButtonGroup",
        "DataTable",
      ] /* Used as <PrimeButton /> and <PrimeDataTable /> */,
    },
  },
  socialShare: {
    // module options
  },
  css: [
    "~/assets/css/main.css",
  ],
});