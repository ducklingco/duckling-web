<template>
  <div class="absolute w-full h-full">
    <duck-carousel class="h-full" @toggle-fullscreen="toggle" :duck="duck" />
  </div>
</template>

<script setup lang="ts">
import { useRoute } from "vue-router";
import { useDucksStore } from "@/stores/ducks";
import { useFullscreen } from '@vueuse/core'

const { toggle } = useFullscreen()

const route = useRoute();
const id = route.params.id;

const { getDuck } = useDucksStore();

const duck = ref(null);
const data = getDuck(id as string).then((data: any) => {
  duck.value = data;
}).catch((error: any) => { })

const url = computed(() => {
  if (window === undefined) return;
  const baseUrl = window.location.origin;
  const fullUrl = `${baseUrl}${route.path}`;
  return fullUrl;
});

const createTitle = () => {
  const title = duck?.value?.title ? duck?.value?.title : null;
  const author = duck?.value?.created_by?.first_name ? ` - by ${duck?.value?.created_by?.first_name}` : null;
  return (title && author) ? title + author : "Duckling";
}
useSeoMeta({
  title: createTitle,
  ogTitle: createTitle,
  ogDescription: () => duck?.value?.description,
  ogImage: () => duck?.value?.cover_image?.path,
  ogUrl: () => url.value,
  ogType: 'article',
  ogSiteName: 'Duckling',
  ogLocale: 'en_US',
  twitterCard: 'summary_large_image',
})


</script>
