<!-- eslint-disable vue/html-self-closing -->
<template>
  <div
    class="card relative overflow-hidden rounded-lg hover:cursor-pointer md:rounded-2xl"
    @click="onClickCard"
  >
    <img
      v-show="imageLoaded"
      class="h-full w-full object-cover"
      :src="coverImage"
      alt="Duck image"
    />
    <div
      v-if="!imageLoaded"
      class="h-full w-full animate-pulse bg-duckling_grey"
    />

    <div
      class="absolute left-0 top-0 h-full w-full bg-duckling_black bg-opacity-50"
    >
      <div class="flex h-full flex-col justify-between p-6 text-white">
        <div id="profile" class="flex flex-grow-0 items-center gap-2">
          <img
            v-if="profilePicture"
            class="h-14 w-14 rounded-full object-cover"
            :src="profilePicture"
            alt="Profile picture"
          />
          <div v-if="authorDetails" class="flex flex-col">
            <span class="text-md font-bold">{{ authorDetails?.name }}</span>
            <span class="text-sm">@{{ authorDetails?.username }}</span>
          </div>
        </div>
        <div class="flex w-full flex-grow flex-col items-start justify-center">
          <div class="py-3">
            <h2 class="text font-bold" :class="titleFontClass">
              {{ props?.duck?.title }}
            </h2>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { MediaType } from "~/types/MediaType";
import type { Duck, DuckDetailed } from "../types/Duck";
import { useUserStore } from "~/stores/user";
import type { PublicUser } from "~/types/User";

const props = defineProps<{ duck: Duck }>();
const detailedDuck = ref<DuckDetailed>({
  ...props.duck,
  mediaImage: new Blob(),
});

const userStore = useUserStore();
const { accessToken } = storeToRefs(userStore);
const { setAccessToken } = userStore;

const onClickCard = () => {
  navigateTo({
    name: "duck-id",
    params: { id: props.duck.id },
    query: { redirected: "1" },
  });
};

const titleFontClass = computed(() => {
  return "text-2xl sm:text-3xl md:text-4xl";
});

onMounted(async () => {
  await setAccessToken();
  detailedDuck.value.mediaImage = await getMedia(
    props.duck.mediaId,
    MediaType.COVER_IMAGE,
    accessToken.value,
  );
  imageLoaded.value = true;
  detailedDuck.value.authorDetails = await getAuthorDetails(
    props.duck.author,
    accessToken.value,
  );
  if (detailedDuck.value.authorDetails.imageId) {
    detailedDuck.value.authorDetails.imageData = await getMedia(
      detailedDuck.value.authorDetails.imageId,
      MediaType.PFP,
      accessToken.value,
    );
  }
});

const imageLoaded = ref(false);

const coverImage = computed((): string | undefined => {
  if (detailedDuck.value.mediaImage) {
    return URL.createObjectURL(detailedDuck.value.mediaImage);
  }
  return undefined;
});

const profilePicture = computed((): string | undefined => {
  if (detailedDuck.value.authorDetails?.imageData) {
    console.log("there is a pfp");
    return URL.createObjectURL(detailedDuck.value.authorDetails.imageData);
  }
  console.log("no pfp");
  return undefined;
});

const authorDetails = computed((): PublicUser | undefined => {
  if (detailedDuck.value.authorDetails) {
    return detailedDuck.value.authorDetails;
  }
  return undefined;
});
</script>

<style scoped>
.card {
  background-size: cover;
  aspect-ratio: 570/400;
}
</style>
