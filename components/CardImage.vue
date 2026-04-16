<template>
  <img
    :src="image"
    alt="Card image"
    class="h-full w-full"
    :class="imageCoverFitClass"
  />

  <card-click-areas @prev="onClickPrev" @next="onClickNext" />
</template>

<script setup lang="ts">
import useCardNavigation from "@/composables/useCardNavigation";
import type { DucklingImage } from "~/types/Duckling";
import { MediaType } from "~/types/MediaType";

const props = defineProps<{
  card: DucklingImage;
}>();

const userStore = useUserStore();
const { accessToken } = storeToRefs(userStore);
const { setAccessToken } = userStore;

const imageBlob = ref<Blob | null>(null);

onMounted(async () => {
  await setAccessToken();
  imageBlob.value = await getMedia(
    props.card.imageId,
    MediaType.IMAGE,
    accessToken.value,
  );
});

const emit = defineEmits(["prev", "next"]);

const image = computed((): string | undefined => {
  if (!imageBlob.value) return undefined;
  return URL.createObjectURL(imageBlob.value);
});

const imageCoverFit = computed(() => {
  return props?.card?.imageCoverFit;
});

const imageCoverFitClass = computed(() => {
  return imageCoverFit.value ? "object-cover" : "object-contain";
});

const { onClickPrev, onClickNext, CardClickAreas } = useCardNavigation(emit);
</script>
