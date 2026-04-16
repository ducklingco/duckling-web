<!-- eslint-disable vue/html-self-closing -->
<template>
  <carousel
    ref="carouselRef"
    v-model="currentSlide"
    class="relative h-full w-full bg-duckling_black"
    :items-to-show="1"
    :mouse-drag="false"
    :transition="500"
    @click="toggleFullscreen"
  >
    <template #slides>
      <!-- Cover slide -->
      <slide key="cover" class="relative grid h-full w-full">
        <div class="relative flex h-full w-full items-center justify-center">
          <div
            class="flex h-full w-full items-center justify-center bg-cover bg-center"
          >
            <card-cover
              :duck="duck"
              :author-details="authorDetails"
              @prev="prevSlide"
              @next="nextSlide"
            />
          </div>
        </div>
      </slide>
      <slide
        v-for="ducklingCard in ducklings"
        :key="ducklingCard?.duckling.id"
        class="relative grid h-full w-full"
      >
        <div class="relative flex h-full w-full items-center justify-center">
          <div
            class="flex h-full w-full items-center justify-center bg-cover bg-center"
          >
            <card-video
              v-if="ducklingCard?.type == 'videoCard'"
              ref="cardVideoSlides"
              :key="ducklingCard?.duckling.id"
              :card="ducklingCard.duckling"
              :time="0"
              @prev="prevSlide"
              @next="nextSlide"
            />
            <Component
              :is="cardComponents[ducklingCard.type]"
              v-else
              :card="ducklingCard.duckling"
              @prev="prevSlide"
              @next="nextSlide"
            />

            <carousel-drawer
              v-if="
                ducklingCard.type === 'imageCard' &&
                (ducklingCard?.duckling?.caption ||
                  ducklingCard?.duckling?.audioId)
              "
              ref="audioDrawerRefs"
              class="z-10"
              :card="ducklingCard.duckling"
            />
          </div>
        </div>
      </slide>
    </template>
    <template #addons>
    
      <duck-cover-header
        v-if="currentSlide == 0"
        :has-close-btn="Boolean(hasCloseBtn)"
        :card="currentCard"
      />
      <div
        v-if="!visualMode && currentSlide != 0"
        class="header absolute left-0 top-0 flex w-full flex-col items-center justify-around gap-2 px-3 pt-2 sm:gap-4 sm:px-8"
      >
        <custom-pagination :dark="currentCard?.type === 'textCard'" />
        <div class="w-full">
          <div class="grid h-full grid-cols-3">
            <div class="flex w-full items-center justify-start gap-2 sm:gap-4">
              <!-- Close button -->
              <button
                v-if="hasCloseBtn"
                class="flex h-10 shrink-0 items-center justify-center"
                @click.stop="onClickCloseCarousel"
              >
                <svg
                  width="30"
                  height="29"
                  viewBox="0 0 30 29"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M15 28.5283C13.0762 28.5283 11.2695 28.1621 9.58008 27.4297C7.89062 26.6973 6.40137 25.6865 5.1123 24.3975C3.82324 23.1084 2.80762 21.6191 2.06543 19.9297C1.33301 18.2305 0.966797 16.4189 0.966797 14.4951C0.966797 12.5811 1.33301 10.7793 2.06543 9.08984C2.79785 7.39062 3.80859 5.89648 5.09766 4.60742C6.39648 3.30859 7.89062 2.29297 9.58008 1.56055C11.2695 0.828125 13.0713 0.461914 14.9854 0.461914C16.9092 0.461914 18.7158 0.828125 20.4053 1.56055C22.0947 2.29297 23.584 3.30859 24.873 4.60742C26.1719 5.89648 27.1875 7.39062 27.9199 9.08984C28.6621 10.7793 29.0332 12.5811 29.0332 14.4951C29.0332 16.4189 28.667 18.2305 27.9346 19.9297C27.2021 21.6191 26.1865 23.1084 24.8877 24.3975C23.5986 25.6865 22.1094 26.6973 20.4199 27.4297C18.7305 28.1621 16.9238 28.5283 15 28.5283ZM10.3418 20.2227C10.6445 20.2227 10.8984 20.1201 11.1035 19.915L15 16.0039L18.9111 19.915C19.1064 20.1201 19.3555 20.2227 19.6582 20.2227C19.9512 20.2227 20.2002 20.1201 20.4053 19.915C20.6104 19.71 20.7129 19.4609 20.7129 19.168C20.7129 18.8652 20.6104 18.6162 20.4053 18.4209L16.4795 14.5098L20.4199 10.5986C20.625 10.3936 20.7275 10.1396 20.7275 9.83691C20.7275 9.55371 20.625 9.31445 20.4199 9.11914C20.2148 8.91406 19.9707 8.81152 19.6875 8.81152C19.4141 8.81152 19.1699 8.91895 18.9551 9.13379L15 13.0596L11.0742 9.14844C10.8594 8.93359 10.6152 8.82617 10.3418 8.82617C10.0586 8.82617 9.81445 8.92871 9.60938 9.13379C9.4043 9.3291 9.30176 9.57324 9.30176 9.86621C9.30176 10.1494 9.4043 10.3984 9.60938 10.6133L13.5352 14.5098L9.60938 18.4355C9.4043 18.6406 9.30176 18.8848 9.30176 19.168C9.30176 19.4609 9.4043 19.71 9.60938 19.915C9.81445 20.1201 10.0586 20.2227 10.3418 20.2227Z"
                    :fill="navFillColor"
                    :fill-opacity="navFillOpacity"
                  />
                </svg>
              </button>
              <!-- Share button -->
              <button
                class="relative flex h-10 shrink-0 items-center justify-center"
                @click.stop="() => (showShareDialog = true)"
              >
                <svg
                  width="29"
                  height="29"
                  viewBox="0 0 29 29"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M14.5 28.3945C12.5762 28.3945 10.7695 28.0283 9.08008 27.2959C7.39062 26.5635 5.90137 25.5527 4.6123 24.2637C3.32324 22.9746 2.30762 21.4854 1.56543 19.7959C0.833008 18.0967 0.466797 16.2852 0.466797 14.3613C0.466797 12.4473 0.833008 10.6455 1.56543 8.95605C2.29785 7.25684 3.30859 5.7627 4.59766 4.47363C5.89648 3.1748 7.39062 2.15918 9.08008 1.42676C10.7695 0.694336 12.5713 0.328125 14.4854 0.328125C16.4092 0.328125 18.2158 0.694336 19.9053 1.42676C21.5947 2.15918 23.084 3.1748 24.373 4.47363C25.6719 5.7627 26.6875 7.25684 27.4199 8.95605C28.1621 10.6455 28.5332 12.4473 28.5332 14.3613C28.5332 16.2852 28.167 18.0967 27.4346 19.7959C26.7021 21.4854 25.6865 22.9746 24.3877 24.2637C23.0986 25.5527 21.6094 26.5635 19.9199 27.2959C18.2305 28.0283 16.4238 28.3945 14.5 28.3945ZM10.2812 21.334H18.3818C19.1338 21.334 19.71 21.1436 20.1104 20.7627C20.5107 20.3721 20.7109 19.7959 20.7109 19.0342V11.9297C20.7109 11.168 20.5107 10.5967 20.1104 10.2158C19.7197 9.8252 19.1436 9.62988 18.3818 9.62988L16.2432 9.64453V10.9922H18.3672C19.0215 10.9922 19.3486 11.3242 19.3486 11.9883V18.9902C19.3486 19.6641 19.0215 20.001 18.3672 20.001H10.2959C9.63184 20.001 9.2998 19.6641 9.2998 18.9902V11.9883C9.2998 11.3242 9.63184 10.9922 10.2959 10.9922H12.4346V9.64453L10.2812 9.62988C9.51953 9.62988 8.94336 9.8252 8.55273 10.2158C8.16211 10.6064 7.9668 11.1777 7.9668 11.9297V19.0342C7.9668 19.7861 8.16211 20.3574 8.55273 20.748C8.94336 21.1387 9.51953 21.334 10.2812 21.334ZM14.3242 15.7236C14.5098 15.7236 14.666 15.6602 14.793 15.5332C14.9297 15.4062 14.998 15.25 14.998 15.0645V7.71094L14.9688 7.03711L15.584 7.71094L16.3311 8.4873C16.458 8.62402 16.6143 8.69238 16.7998 8.69238C16.9854 8.69238 17.1367 8.63867 17.2539 8.53125C17.3711 8.41406 17.4297 8.26758 17.4297 8.0918C17.4297 8.00391 17.415 7.92578 17.3857 7.85742C17.3564 7.7793 17.2979 7.71094 17.21 7.65234L14.793 5.2793C14.6465 5.13281 14.4902 5.05957 14.3242 5.05957C14.1484 5.05957 13.9922 5.13281 13.8555 5.2793L11.4238 7.65234C11.2969 7.75977 11.2334 7.90625 11.2334 8.0918C11.2334 8.26758 11.2871 8.40918 11.3945 8.5166C11.5117 8.62402 11.6582 8.67773 11.834 8.67773C12.0293 8.67773 12.1855 8.61426 12.3027 8.4873L13.0498 7.71094L13.6797 7.03711V7.71094V15.0645C13.6797 15.25 13.7432 15.4062 13.8701 15.5332C13.9971 15.6602 14.1484 15.7236 14.3242 15.7236Z"
                    :fill="navFillColor"
                    :fill-opacity="navFillOpacity"
                  />
                </svg>
                <share-dialog
                  v-if="showShareDialog"
                  :card="currentCard"
                  @close="() => (showShareDialog = false)"
                />
              </button>
              <div
                id="profile"
                class="row-span-1 flex shrink-0 items-center gap-2"
                :class="{
                  'text-duckling_white': currentCard?.type != 'textCard',
                  'text-duckling_black': currentCard?.type == 'textCard',
                }"
              >
                <img
                  class="h-10 w-10 rounded-full object-cover hover:cursor-pointer"
                  :src="authorImage"
                  alt="Profile picture"
                />
                <div
                  v-if="authorDetails.name"
                  class="hidden flex-col items-start opacity-80 sm:flex"
                >
                  <span class="text-md font-bold">{{
                    authorDetails.name
                  }}</span>
                  <span class="text-sm">@{{ authorDetails.username }}</span>
                </div>
              </div>
            </div>
            <div class="flex items-center justify-center">
              <a href="https://duckling.co">
                <duckling-logo
                  class="h-10 object-contain md:hidden"
                  :fill="navFillColor"
                  :fill-opacity="navFillOpacity"
                />
                <duckling-logo
                  class="hidden h-10 object-contain md:block"
                  :fill="navFillColor"
                  :fill-opacity="navFillOpacity"
                  text-right
                />
              </a>
            </div>
<div class="flex w-full items-center justify-end gap-2 sm:gap-4">
  <!-- Prev button -->
  <button
    v-if="currentSlide != 0"
    class="flex h-10 shrink-0 items-center justify-center"
    @click.stop="prevSlide"
  >
    <svg width="29" height="29" viewBox="0 0 29 29" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M14.5 28.5C6.768 28.5 0.5 22.232 0.5 14.5C0.5 6.768 6.768 0.5 14.5 0.5C22.232 0.5 28.5 6.768 28.5 14.5C28.5 22.232 22.232 28.5 14.5 28.5ZM16.5 9.5L10.5 14.5L16.5 19.5L16.5 9.5Z"
        :fill="navFillColor"
        :fill-opacity="navFillOpacity"
      />
    </svg>
  </button>
  <!-- Next button -->
  <button
    class="flex h-10 shrink-0 items-center justify-center"
    @click.stop="nextSlide"
  >
    <svg width="29" height="29" viewBox="0 0 29 29" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M14.5 28.5C6.768 28.5 0.5 22.232 0.5 14.5C0.5 6.768 6.768 0.5 14.5 0.5C22.232 0.5 28.5 6.768 28.5 14.5C28.5 22.232 22.232 28.5 14.5 28.5ZM12.5 9.5L18.5 14.5L12.5 19.5L12.5 9.5Z"
        :fill="navFillColor"
        :fill-opacity="navFillOpacity"
      />
    </svg>
  </button>
</div>
          </div>
        </div>
      </div>
      <div class="absolute bottom-0 left-0 w-full p-6">
        <div
          v-if="currentCardVideo && currentCard.type === 'videoCard'"
          class="flex h-full w-full items-center justify-center"
        >
          <player-track
            :percentage="currentCardVideo?.percentagePlayed"
            class="flex-grow"
            @seek="currentCardVideo?.seekToPercentage"
          />
        </div>
      </div>
    </template>
  </carousel>
</template>

<script setup lang="ts">
import "vue3-carousel/dist/carousel.css";
import { Carousel, Slide} from "vue3-carousel";
import CustomPagination from "./CustomPagination.vue";
import { useRoute } from "vue-router";

import CardImage from "./CardImage.vue";
import CardText from "./CardText.vue";
import CardVideo from "./CardVideo.vue";
import type CarouselType from "../types/Carousel";
import type { DucklingCardDetailed } from "~/types/Duckling";
import type { DuckWithContentDetailed } from "~/types/Duck";
import type { PublicUser } from "~/types/User";
import { MediaType } from "~/types/MediaType";

const route = useRoute();

const props = defineProps<{
  duck: DuckWithContentDetailed;
  authorDetails: PublicUser;
}>();

const emit = defineEmits(["toggle-fullscreen"]);

const cardVideoSlides = ref([]);
const audioDrawerRefs = ref([]);
const profilePictureBlob = ref<Blob | null>(null);

const userStore = useUserStore();
const { accessToken } = storeToRefs(userStore);
const { setAccessToken } = userStore;

const cardComponents: Record<string, Component> = {
  imageCard: CardImage,
  textCard: CardText,
  videoCard: CardVideo,
};

onMounted(async () => {
  await setAccessToken();
  if (props?.authorDetails?.imageId) {
    profilePictureBlob.value = await getMedia(
      props?.authorDetails?.imageId,
      MediaType.PFP,
      accessToken.value,
    );
  }
});

const authorImage = computed((): string => {
  if (!profilePictureBlob.value) return "/duckling_logo_solo.png";
  return URL.createObjectURL(profilePictureBlob.value);
});

const ducklings = computed((): DucklingCardDetailed[] => {
  if (props?.duck?.ducklings) {
    return props?.duck?.ducklings;
  } else {
    return [];
  }
});

const onClickCloseCarousel = () => {
  navigateTo({ name: "index" });
};

const currentSlide = ref(0);

const currentCard = computed(() => {
  return ducklings.value[unref(currentSlide) - 1];
});

const currentCardVideo = computed(() => {
  console.log("cardVideoSlides:", cardVideoSlides.value);
  console.log("currentCard:", unref(currentCard));

  const found = cardVideoSlides.value?.find(
    (card) => card?.id === unref(currentCard)?.duckling?.id,
  );
  console.log("Found card:", found);

  return found;
});

watch(currentCardVideo, (newCurrentCardVideo) => {
  newCurrentCardVideo?.play();

  // turn off other videos
  cardVideoSlides.value.forEach((card) => {
    if (card?.id !== newCurrentCardVideo?.id) {
      card?.pause();
    }
  });
});

const navFillColor = computed(() => {
  let toReturn = "#ffffff";
  if (unref(currentCard)?.type === "textCard") {
    toReturn = "#000000";
  }
  return toReturn;
});
const navFillOpacity = computed(() => {
  let toReturn = "80%";
  if (unref(currentCard)?.type === "textCard") {
    toReturn = "80%";
  }
  return toReturn;
});

const currentCardAudio = computed(() => {
  return audioDrawerRefs.value?.find(
    (audioDrawer) => audioDrawer?.id === unref(unref(currentCard))?.id,
  );
});

watch(currentCardAudio, (newCurrentCardAudio) => {
  newCurrentCardAudio?.play();

  // turn off other audios
  audioDrawerRefs.value.forEach((audioDrawer) => {
    if (audioDrawer?.id !== newCurrentCardAudio?.id) {
      audioDrawer?.pause();
    }
  });
});

const visualMode = ref(false);

const toggleVisualMode = () => {
  visualMode.value = !visualMode.value;
};

const toggleFullscreen = () => {
  emit("toggle-fullscreen");
  nextTick(() => {
    carouselRef.value?.updateSlideWidth();
  });
};

const carouselRef = ref<CarouselType | null>(null);

const hasCloseBtn = computed(() => {
  return route.query.redirected;
});

const showShareDialog = ref(false);

const prevSlide = () => {
  carouselRef.value?.prev();
};
const nextSlide = () => {
  carouselRef.value?.next();
};
</script>

<style deep lang="css">
.carousel__viewport {
  height: 100%;
}

.carousel__track {
  height: 100%;
}

.carousel__prev,
.carousel__next {
  margin: 0;
}

.videoplayer-controls {
  display: flex;
  font: 0.8em sans-serif;
  width: 100%;
}

.videoplayer-controls-toggleplay,
.videoplayer-controls-togglemute {
  flex: 1;
}

.videoplayer-controls-time {
  flex: 2;
  text-align: center;
  line-height: 2;
}

.videoplayer-controls-track {
  flex: 5;
  line-height: 2;
}
</style>
