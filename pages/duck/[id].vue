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
import type { PublicUser } from "~/types/User";
import type { DuckWithContentDetailed } from "~/types/Duck";
import { MediaType } from "~/types/MediaType";

const { toggle } = useFullscreen();
const route = useRoute();
const id: string = route.params.id as string;
const authorDetails: PublicUser | null = route.params.authorDetails
  ? JSON.parse(route.params.authorDetails as string)
  : null;
const duck = ref<DuckWithContentDetailed | undefined>();
const coverImageBlob = ref<Blob | null>(null);

const { getDuck } = useDucksStore();
const userStore = useUserStore();
const { accessToken } = storeToRefs(userStore);
const { setAccessToken } = userStore;

onMounted(async () => {
  await setAccessToken();
  duck.value = await getDuck(id, accessToken.value);
  coverImageBlob.value = await getMedia(
    duck.value.mediaId,
    MediaType.COVER_IMAGE,
    accessToken.value,
  );
  document.body.style.overflow = "hidden";
});

onUnmounted(() => {
  document.body.style.overflow = "auto";
});

const url = computed(() => {
  if (window === undefined) return;
  const baseUrl = window.location.origin;
  const fullUrl = `${baseUrl}${route.path}`;
  return fullUrl;
});

const createTitle = () => {
  const title = duck?.value?.title ? duck?.value?.title : null;
  const author = authorDetails?.name ? ` - by ${authorDetails?.name}` : null;

  if (title && author) return title + author;
  else if (title) return title;
  else if (author) return "Duck" + author;
  else return "Duckling";
};

const coverImage = computed((): string | undefined => {
  if (coverImageBlob.value) {
    return URL.createObjectURL(coverImageBlob.value);
  }
  return undefined;
});

useSeoMeta({
  title: createTitle,
  ogTitle: createTitle,
  ogDescription: () => duck?.value?.title,
  ogImage: () => coverImage.value,
  ogUrl: () => url.value,
  ogType: "website",
  ogSiteName: "Duckling",
  ogLocale: "en_US",
  twitterCard: "summary_large_image",
});
</script>
