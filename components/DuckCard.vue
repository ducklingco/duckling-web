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
            <span class="text-md font-semibold">{{ authorDetails?.name }}</span>
            <span class="text-sm">@{{ authorDetails?.username }}</span>
          </div>
        </div>
        <div class="flex w-full flex-grow flex-col items-start justify-center">
          <div class="py-3">
              <h2 class="text font-semibold" :class="titleFontClass">
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
import type { Duck } from "~/types/Duck";
import { useUserStore } from "~/stores/user";
import type { PublicUser } from "~/types/User";

const props = defineProps<{ duck: Duck }>();
const coverImageBlob = ref<Blob | null>(null);
const profilePictureBlob = ref<Blob | null>(null);
const authorDetailsObject = ref<PublicUser | null>(null);

const userStore = useUserStore();
const { accessToken } = storeToRefs(userStore);
const { setAccessToken } = userStore;

const onClickCard = () => {
  navigateTo({
    name: "duck-id",
    params: {
      id: props.duck.id,
    },
    query: {
      redirected: "1",
    },
  });
};

const titleFontClass = computed(() => {
  return "text-base sm:text-lg md:text-xl";
});

onMounted(async () => {
  await setAccessToken();
  coverImageBlob.value = await getMedia(
    props.duck.mediaId,
    MediaType.COVER_IMAGE,
    accessToken.value,
  );
  imageLoaded.value = true;
  authorDetailsObject.value = await getAuthorDetails(
    props.duck.owner,
    accessToken.value,
  );
  if (authorDetailsObject.value.imageId) {
    profilePictureBlob.value = await getMedia(
      authorDetailsObject.value.imageId,
      MediaType.PFP,
      accessToken.value,
    );
  }
});

const imageLoaded = ref(false);

const coverImage = computed((): string | undefined => {
  if (!coverImageBlob.value) return undefined;
  return URL.createObjectURL(coverImageBlob.value);
});

const profilePicture = computed((): string => {
  if (!profilePictureBlob.value) return "/duckling_logo_solo.png";
  return URL.createObjectURL(profilePictureBlob.value);
});

const authorDetails = computed((): PublicUser | undefined => {
  if (!authorDetailsObject.value) return undefined;
  return authorDetailsObject.value;
});
</script>

<style scoped>
.card {
  background-size: cover;
  aspect-ratio: 570/400;
}
</style>
