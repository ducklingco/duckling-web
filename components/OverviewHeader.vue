<template>
  <header class="w-full">
    <!-- Nav -->
  <div class="flex w-full items-center justify-between px-8 pt-2 pb-0">
      <div class="w-24" />
      <a href="https://www.duckling.co/">
        <img
          class="h-24 object-contain"
          src="/assets/img/Logo.png.webp"
          alt="Duckling logo"
        />
      </a>
      <div class="relative">
        <button
          class="flex items-center gap-2 text-base font-semibold text-duckling_teal"
          @click="toggleLanguage"
        >
         
<svg xmlns="http://www.w3.org/2000/svg" class="h-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 2a10 10 0 100 20A10 10 0 0012 2zm0 0c-1.657 0-3 4.03-3 9s1.343 9 3 9m0-18c1.657 0 3 4.03 3 9s-1.343 9-3 9M2 12h20" />
</svg>
          
          <span>{{ currentLanguage === 'en' ? 'English' : 'Dansk' }}</span>
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
          </svg>
        </button>
<!-- Dropdown -->
<div
  v-if="showLanguageDropdown"
  class="absolute right-0 top-8 z-50 overflow-hidden rounded-lg"
>  
  <button
    class="flex w-full items-center gap-3 px-6 py-1 text-sm font-semibold hover:bg-duckling_beige"
    :class="currentLanguage === 'en' ? 'text-duckling_teal' : 'text-duckling_teal'"
    @click="setLang('en')"
  >
    English
  </button>
  <button
    class="flex w-full items-center gap-3 px-6 py-1 text-sm font-semibold hover:bg-duckling_beige"
    :class="currentLanguage === 'da' ? 'text-duckling_teal' : 'text-duckling_teal'"
    @click="setLang('da')"
  >
    Dansk
  </button>
</div>
      </div>
    </div>
    <!-- Hero -->
    <div class="flex w-full flex-col items-center px-8 pb-10 pt-6 text-center">
      <h1 class="font-semibold leading-none text-duckling_black" style="font-size: 5.7rem;">
        {{ t.headline }}
      </h1>
      <p class="mt-4 max-w-3xl font-semibold text-duckling_black" style="font-size: 1.8rem; line-height: 1.2;">
        {{ t.subheadline }}
      </p>
    </div>
  </header>
</template>

<script setup lang="ts">
import { useLanguageStore } from "@/stores/language";

const languageStore = useLanguageStore();
const { currentLanguage } = storeToRefs(languageStore);
const { setLanguage } = languageStore;

const showLanguageDropdown = ref(false);

const translations = {
  en: {
    headline: 'Free your story',
    subheadline: 'Duckling is a home for real stories by real people. Explore different perspectives and share your own.',
  },
  da: {
    headline: 'Sæt din historie fri',
    subheadline: 'Duckling er virkelige historier fra ægte mennesker. Udforsk forskellige perspektiver og del dit eget.',
  },
};

const t = computed(() => translations[currentLanguage.value]);

const toggleLanguage = () => {
  showLanguageDropdown.value = !showLanguageDropdown.value;
};

const setLang = (lang: 'en' | 'da') => {
  setLanguage(lang);
  showLanguageDropdown.value = false;
};
</script>
