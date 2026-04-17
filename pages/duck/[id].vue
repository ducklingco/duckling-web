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

const { data: duckSsr } = await useAsyncData(`duck-${id}`, async () => {
  const loginResponse = await fetch(`${useRuntimeConfig().public.backendUrl}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      username: 'WebplayerViewUser',
      password: 'Saturate3-Slum7-Acorn4-Putdown8',
    }),
  });
  const { accessToken: token } = await loginResponse.json();

  const duckResponse = await fetch(`${useRuntimeConfig().public.backendUrl}/duck/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const duckData = await duckResponse.json();

  const authorResponse = await fetch(`${useRuntimeConfig().public.backendUrl}/user/${duckData.owner}/public`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const authorData = await authorResponse.json();

  return { duck: duckData, author: authorData };
});

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

const createTitle = () => {
  const title = duck?.value?.title ?? duckSsr?.value?.duck?.title ?? null;
  const author = authorDetails.value?.name ?? duckSsr?.value?.author?.name ?? null;
  const authorStr = author ? ` - by ${author}` : null;
  if (title && authorStr) return title + authorStr;
  else if (title) return title;
  else if (authorStr) return "Duck" + authorStr;
  else return "Duckling";
};

useSeoMeta({
  title: createTitle,
  ogTitle: createTitle,
  ogDescription: () => duck?.value?.title ?? duckSsr?.value?.duck?.title ?? "A story on Duckling",
  ogImage: `https://web.duckling.co/api/og-image/${id}`,
  ogUrl: () => url.value,
  ogType: "website",
  ogSiteName: "Duckling",
  ogLocale: "en_US",
  twitterCard: "summary_large_image",
});
</script>
