<template>
  <div class="absolute h-full w-full">
    <div
      v-if="!duck && !authorDetails"
      class="t-0 l-0 absolute h-full w-full animate-pulse bg-duckling_grey"
    />
    <duck-carousel
      v-if="duck && authorDetails"
      :duck="duck"
      :author-details="authorDetails"
      @toggle-fullscreen="toggle"
    />
  </div>
</template>

<script setup lang="ts">
import { useRoute } from "vue-router";
import { useDucksStore } from "@/stores/ducks";
import { useFullscreen } from "@vueuse/core";
import type { PublicUser } from "~/types/User";
import type { DuckWithContentDetailed } from "~/types/Duck";
import { MediaType } from "~/types/MediaType";

const { toggle } = useFullscreen();
const route = useRoute();
const id: string = route.params.id as string;
const authorDetails = ref<PublicUser | undefined>();
const duck = ref<DuckWithContentDetailed | undefined>();
const coverImageBlob = ref<Blob | null>(null);

const { getDuck } = useDucksStore();
const userStore = useUserStore();
const { accessToken } = storeToRefs(userStore);
const { setAccessToken } = userStore;
  const { data: meta } = await useAsyncData(`meta-${id}`, () =>
  $fetch(`/api/og-meta/${id}`)
);
onMounted(async () => {
  await setAccessToken();
  duck.value = await getDuck(id, accessToken.value);
  coverImageBlob.value = await getMedia(
    duck.value.mediaId,
    MediaType.COVER_IMAGE,
    accessToken.value,
  );
  authorDetails.value = await getAuthorDetails(
    duck.value.owner,
    accessToken.value,
  );
  document.body.style.overflow = "hidden";
});

onUnmounted(() => {
  document.body.style.overflow = "auto";
});

const url = computed(() => {
  if (typeof window === "undefined") return `https://web.duckling.co/duck/${id}`;
  const baseUrl = window.location.origin;
  const fullUrl = `${baseUrl}${route.path}`;
  return fullUrl;
});

const ogTitle = meta.value?.title
  ? `${meta.value.title}${meta.value.authorName ? ` - by ${meta.value.authorName}` : ''}`
  : 'Duckling — Free your story';

useSeoMeta({
  title: ogTitle,
  ogTitle: ogTitle,
  ogDescription: 'Duckling is a home for real stories, shared by real people. Share your own stories, and discover documentaries from the next generation of journalists and storytellers.',
  ogImage: `https://web.duckling.co/api/og-image/${id}`,
  ogImageWidth: 1200,
  ogImageHeight: 630,
  ogImageType: 'image/jpeg',
  ogUrl: `https://web.duckling.co/duck/${id}`,
  ogType: "website",
  ogSiteName: "Duckling",
  ogLocale: "en_US",
  twitterCard: "summary_large_image",
  twitterImage: `https://web.duckling.co/api/og-image/${id}`,
});
</script>
