<!-- eslint-disable vue/html-self-closing -->
<template>
  <div class="absolute h-full w-full bg-duckling_beige">
    <div class="flex flex-col items-center pt-6">
      <div class="size-20">
        <img src="/assets/img/duckling_logo_text_under.png" />
      </div>
    </div>
    <div v-if="lang !== null" class="flex h-full justify-center pt-16">
      <div class="w-84 items-center p-4 text-center align-middle">
        <h1 class="text-7xl font-semibold">
          {{ lang === "en" ? "Thank you so much" : "Tusinde tak" }}<br />
          {{
            lang === "en"
              ? "for making a difference!"
              : "for at gøre en forskel!"
          }}
        </h1>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const lang = ref<("en" | "da") | null>(null);
const route = useRoute();

onMounted(() => {
  route.query.lang === "da" ? (lang.value = "da") : (lang.value = "en");
});
</script>

<style scoped>
.custom-amount-input {
  width: 100%;
}

* {
  font-family: "Newsreader";
}
</style>
