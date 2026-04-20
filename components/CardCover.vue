<!-- eslint-disable vue/html-self-closing -->
<template>
  <div
    v-if="!imageLoaded"
    class="h-full w-full animate-pulse bg-duckling_black"
  />
  <img
    v-show="imageLoaded"
    class="h-full w-full object-cover"
    :src="coverImage"
    alt="Duck image"
  />
  <div
    class="absolute left-0 top-0 h-full w-full bg-duckling_black bg-opacity-30"
  >
    <div class="relative grid h-full w-full grid-rows-5 overflow-hidden">
      <div />
      <div
        ref="parent"
        class="row-span-3 flex h-full items-center justify-center px-3 md:px-14 lg:px-20 xl:p-40"
      >
        <div
          class="flex-col items-center justify-center gap-10 pr-10 text-duckling_white md:pr-0"
        >
          <div id="profile" class="row-span-1 flex items-center gap-2">
            <img
              v-if="profilePicture"
              class="h-14 w-14 rounded-full object-cover"
              :src="profilePicture"
              alt="Profile picture"
            />
            <div class="flex flex-col text-left">
              <span class="text-xl font-bold md:text-2xl lg:text-3xl">{{
                authorDetails?.name
              }}</span>
              <span class="text-md md:text-lg lg:text-xl"
                >@{{ authorDetails?.username }}</span
              >
            </div>
          </div>
          <div class="row-span-3 flex items-center py-3 text-left">
          <h2
  ref="titleElement"
  class="text font-bold leading-tight"
  :style="{ fontSize: `${fontSize}px` }"
>
              {{ duck?.title }}
            </h2>
          </div>
          <div
            id="tags"
            class="md:text-md row-span-1 flex flex-wrap justify-start gap-2 align-baseline text-sm lg:text-lg"
          >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import useCardNavigation from "@/composables/useCardNavigation";
import type { DuckWithContentDetailed } from "~/types/Duck";
import { MediaType } from "~/types/MediaType";
import type { PublicUser } from "~/types/User";

const props = defineProps<{
  duck: DuckWithContentDetailed;
  authorDetails: PublicUser;
}>();

const userStore = useUserStore();
const { accessToken } = storeToRefs(userStore);
const { setAccessToken } = userStore;

const profilePictureBlob = ref<Blob | null>(null);
const coverImageBlob = ref<Blob | null>(null);
const titleElement = ref<HTMLElement | null>(null);
const parent = ref<HTMLElement | null>(null);
const fontSize = ref(16);

onMounted(async () => {
  await setAccessToken();
  if (props.authorDetails.imageId) {
    profilePictureBlob.value = await getMedia(
      props.authorDetails.imageId,
      MediaType.PFP,
      accessToken.value,
    );
  }
  coverImageBlob.value = await getMedia(
    props.duck.mediaId,
    MediaType.COVER_IMAGE,
    accessToken.value,
  );
  imageLoaded.value = true;
  setTimeout(() => {
    adjustFontSize();
  }, 100);
  window.addEventListener('resize', adjustFontSize);
  onUnmounted(() => {
    window.removeEventListener('resize', adjustFontSize);
  });
});

const adjustFontSize = async () => {
  if (!titleElement.value || !parent.value) return;
  fontSize.value = 16;
  const maxFontSize = 80;
  while (fontSize.value < maxFontSize) {
    fontSize.value++;
    await nextTick();
    if (
      titleElement.value.scrollWidth > parent.value.offsetWidth ||
      titleElement.value.scrollHeight > parent.value.offsetHeight
    ) {
      break;
    }
  }
  fontSize.value--;
};

const emit = defineEmits(["prev", "next"]);
const imageLoaded = ref(false);

const profilePicture = computed(() => {
  if (!profilePictureBlob.value) return "/duckling_logo_solo.png";
  return URL.createObjectURL(profilePictureBlob.value);
});

const coverImage = computed(() => {
  if (!coverImageBlob.value) return undefined;
  return URL.createObjectURL(coverImageBlob.value);
});

const onClickNext = () => {
  emit("next");
};

const { CardClickAreas } = useCardNavigation(emit);
</script>
