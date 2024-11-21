<template>
  <div class="absolute h-full w-full">
    <div
      v-if="!duck"
      class="t-0 l-0 absolute h-full w-full animate-pulse bg-duckling_black"
    />
    <duck-carousel v-if="duck" :duck="duck" @toggle-fullscreen="toggle" />
  </div>
</template>

<script setup lang="ts">
import { useRoute } from "vue-router";
import { useDucksStore } from "@/stores/ducks";
import { useFullscreen } from "@vueuse/core";

onMounted(() => {
  document.body.style.overflow = "hidden";
});

onUnmounted(() => {
  document.body.style.overflow = "auto";
});

const { toggle } = useFullscreen();

const route = useRoute();
const id = route.params.id;

const { getDuck } = useDucksStore();

const { data: duck } = await useAsyncData("duck", () => getDuck(id as string));

const url = computed(() => {
  if (window === undefined) return;
  const baseUrl = window.location.origin;
  const fullUrl = `${baseUrl}${route.path}`;
  return fullUrl;
});

const createTitle = () => {
  const title = duck?.value?.title ? duck?.value?.title : null;
  const author = duck?.value?.authorDetails?.name
    ? ` - by ${duck?.value?.authorDetails?.name}`
    : null;

  if (title && author) return title + author;
  else if (title) return title;
  else if (author) return "Duck" + author;
  else return "Duckling";
};

const imageUrl = URL.createObjectURL(duck?.value?.mediaImage ?? new Blob());

useSeoMeta({
  title: createTitle,
  ogTitle: createTitle,
  ogDescription: () => duck?.value?.title,
  ogImage: () => imageUrl,
  ogUrl: () => url.value,
  ogType: "website",
  ogSiteName: "Duckling",
  ogLocale: "en_US",
  twitterCard: "summary_large_image",
});
</script>
