<template>
  <header class="w-full">
    <!-- Nav -->
    <div class="flex w-full items-center justify-between px-8 py-6">
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
          class="flex items-center gap-2 text-sm font-semibold text-duckling_teal"
          @click="toggleLanguage"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9" />
          </svg>
          <span>{{ currentLanguage === 'en' ? 'English' : 'Dansk' }}</span>
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        <!-- Dropdown -->
        <div
          v-if="showLanguageDropdown"
          class="absolute right-0 top-8 z-50 overflow-hidden rounded-lg border border-duckling_teal bg-white shadow-lg"
        >
          <button
            class="flex w-full items-center gap-3 px-6 py-3 text-sm font-semibold hover:bg-duckling_beige"
            :class="currentLanguage === 'en' ? 'text-duckling_teal' : 'text-duckling_black'"
            @click="setLanguage('en')"
          >
            🇬🇧 English
          </button>
          <button
            class="flex w-full items-center gap-3 px-6 py-3 text-sm font-semibold hover:bg-duckling_beige"
            :class="currentLanguage === 'da' ? 'text-duckling_teal' : 'text-duckling_black'"
            @click="setLanguage('da')"
          >
            🇩🇰 Dansk
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
const showLanguageDropdown = ref(false);
const currentLanguage = ref('en');

const translations = {
  en: {
    headline: 'Free your story',
    subheadline: 'Duckling is a home for real stories, shared by real people. Explore different perspectives and share your own.',
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

const setLanguage = (lang: 'en' | 'da') => {
  currentLanguage.value = lang;
  showLanguageDropdown.value = false;
};
</script>
