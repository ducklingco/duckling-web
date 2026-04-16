import { defineStore } from "pinia";
import { useStorage, type RemovableRef } from "@vueuse/core";

export const useLanguageStore = defineStore("language", {
  state: () => ({
    currentLanguage: useStorage("language", "en") as RemovableRef<"en" | "da">,
  }),
  actions: {
    setLanguage(lang: "en" | "da") {
      this.currentLanguage = lang;
    },
  },
  getters: {
    getLanguage: (state) => state.currentLanguage,
  },
});
