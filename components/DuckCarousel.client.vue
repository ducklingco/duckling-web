<template>
  <!-- :autoplay="5000" -->
  <carousel v-model="currentSlide" class="relative w-screen h-screen bg-black" :items-to-show="1">
    <template #slides>
      <slide class="relative grid w-full h-full" v-for="card in cards" :key="card?.id">
        <div class="relative flex items-center justify-center w-full h-screen">
          <div class="flex items-center justify-center w-full h-full bg-center bg-cover">
            <card-video v-if="card?.type == 'video'" :card="card" ref="cardVideoSlides" :key="card?.id" :time="0" />
            <Component v-else :is="cardComponents[card?.type]" :card="card" />

            <carousel-drawer v-if="card?.cardable?.caption || card?.cardable?.audio" ref="audioDrawerRefs"
              :card="card" />
          </div>
        </div>
      </slide>
    </template>
    <template #addons>
      <navigation>
        <template #prev>
          <div
            class="absolute left-0 w-20 h-20 transform -translate-x-1/2 -translate-y-1/2 bg-black rounded-full opacity-50 top-1/2 hover:cursor-pointer"
            @click="">
            <!-- Chevron previous icon -->
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="white"
              class="absolute w-1/2 transform -translate-y-1/2 h-1/2 top-1/2 left-1/2">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
            </svg>
          </div>
        </template>
        <template #next class="overflow-hidden">
          <div class="absolute right-0 w-10 h-20 overflow-hidden transform -translate-y-1/2 top-1/2">
            <div class="absolute top-0 left-0 w-20 h-20 bg-black rounded-full opacity-50 hover:cursor-pointer"
              @click="">
              <!-- Chevron next icon -->
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="white"
                class="absolute w-1/2 transform -translate-y-1/2 h-1/2 top-1/2 right-1/2">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
              </svg>
            </div>
          </div>
        </template>
      </navigation>
      <div
        class="absolute top-0 left-0 flex flex-col items-center justify-around w-full gap-2 p-2 px-3 bg-black header bg-opacity-70 sm:px-8 sm:gap-4">
        <custom-pagination />
        <div class="w-full">
          <div class="grid h-full grid-cols-3">
            <div class="flex items-center justify-start w-full gap-2 sm:gap-4">
              <!-- Close button -->
              <button class="flex items-center justify-center h-10 shrink-0" @click="onClickCloseCarousel">
                <svg width="30" height="29" viewBox="0 0 30 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M15 28.5283C13.0762 28.5283 11.2695 28.1621 9.58008 27.4297C7.89062 26.6973 6.40137 25.6865 5.1123 24.3975C3.82324 23.1084 2.80762 21.6191 2.06543 19.9297C1.33301 18.2305 0.966797 16.4189 0.966797 14.4951C0.966797 12.5811 1.33301 10.7793 2.06543 9.08984C2.79785 7.39062 3.80859 5.89648 5.09766 4.60742C6.39648 3.30859 7.89062 2.29297 9.58008 1.56055C11.2695 0.828125 13.0713 0.461914 14.9854 0.461914C16.9092 0.461914 18.7158 0.828125 20.4053 1.56055C22.0947 2.29297 23.584 3.30859 24.873 4.60742C26.1719 5.89648 27.1875 7.39062 27.9199 9.08984C28.6621 10.7793 29.0332 12.5811 29.0332 14.4951C29.0332 16.4189 28.667 18.2305 27.9346 19.9297C27.2021 21.6191 26.1865 23.1084 24.8877 24.3975C23.5986 25.6865 22.1094 26.6973 20.4199 27.4297C18.7305 28.1621 16.9238 28.5283 15 28.5283ZM10.3418 20.2227C10.6445 20.2227 10.8984 20.1201 11.1035 19.915L15 16.0039L18.9111 19.915C19.1064 20.1201 19.3555 20.2227 19.6582 20.2227C19.9512 20.2227 20.2002 20.1201 20.4053 19.915C20.6104 19.71 20.7129 19.4609 20.7129 19.168C20.7129 18.8652 20.6104 18.6162 20.4053 18.4209L16.4795 14.5098L20.4199 10.5986C20.625 10.3936 20.7275 10.1396 20.7275 9.83691C20.7275 9.55371 20.625 9.31445 20.4199 9.11914C20.2148 8.91406 19.9707 8.81152 19.6875 8.81152C19.4141 8.81152 19.1699 8.91895 18.9551 9.13379L15 13.0596L11.0742 9.14844C10.8594 8.93359 10.6152 8.82617 10.3418 8.82617C10.0586 8.82617 9.81445 8.92871 9.60938 9.13379C9.4043 9.3291 9.30176 9.57324 9.30176 9.86621C9.30176 10.1494 9.4043 10.3984 9.60938 10.6133L13.5352 14.5098L9.60938 18.4355C9.4043 18.6406 9.30176 18.8848 9.30176 19.168C9.30176 19.4609 9.4043 19.71 9.60938 19.915C9.81445 20.1201 10.0586 20.2227 10.3418 20.2227Z"
                    fill="#A4A4A4" />
                </svg>
              </button>
              <!-- Share button -->
              <button class="flex items-center justify-center h-10 shrink-0" @click="nav.close">
                <svg width="29" height="29" viewBox="0 0 29 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M14.5 28.3945C12.5762 28.3945 10.7695 28.0283 9.08008 27.2959C7.39062 26.5635 5.90137 25.5527 4.6123 24.2637C3.32324 22.9746 2.30762 21.4854 1.56543 19.7959C0.833008 18.0967 0.466797 16.2852 0.466797 14.3613C0.466797 12.4473 0.833008 10.6455 1.56543 8.95605C2.29785 7.25684 3.30859 5.7627 4.59766 4.47363C5.89648 3.1748 7.39062 2.15918 9.08008 1.42676C10.7695 0.694336 12.5713 0.328125 14.4854 0.328125C16.4092 0.328125 18.2158 0.694336 19.9053 1.42676C21.5947 2.15918 23.084 3.1748 24.373 4.47363C25.6719 5.7627 26.6875 7.25684 27.4199 8.95605C28.1621 10.6455 28.5332 12.4473 28.5332 14.3613C28.5332 16.2852 28.167 18.0967 27.4346 19.7959C26.7021 21.4854 25.6865 22.9746 24.3877 24.2637C23.0986 25.5527 21.6094 26.5635 19.9199 27.2959C18.2305 28.0283 16.4238 28.3945 14.5 28.3945ZM10.2812 21.334H18.3818C19.1338 21.334 19.71 21.1436 20.1104 20.7627C20.5107 20.3721 20.7109 19.7959 20.7109 19.0342V11.9297C20.7109 11.168 20.5107 10.5967 20.1104 10.2158C19.7197 9.8252 19.1436 9.62988 18.3818 9.62988L16.2432 9.64453V10.9922H18.3672C19.0215 10.9922 19.3486 11.3242 19.3486 11.9883V18.9902C19.3486 19.6641 19.0215 20.001 18.3672 20.001H10.2959C9.63184 20.001 9.2998 19.6641 9.2998 18.9902V11.9883C9.2998 11.3242 9.63184 10.9922 10.2959 10.9922H12.4346V9.64453L10.2812 9.62988C9.51953 9.62988 8.94336 9.8252 8.55273 10.2158C8.16211 10.6064 7.9668 11.1777 7.9668 11.9297V19.0342C7.9668 19.7861 8.16211 20.3574 8.55273 20.748C8.94336 21.1387 9.51953 21.334 10.2812 21.334ZM14.3242 15.7236C14.5098 15.7236 14.666 15.6602 14.793 15.5332C14.9297 15.4062 14.998 15.25 14.998 15.0645V7.71094L14.9688 7.03711L15.584 7.71094L16.3311 8.4873C16.458 8.62402 16.6143 8.69238 16.7998 8.69238C16.9854 8.69238 17.1367 8.63867 17.2539 8.53125C17.3711 8.41406 17.4297 8.26758 17.4297 8.0918C17.4297 8.00391 17.415 7.92578 17.3857 7.85742C17.3564 7.7793 17.2979 7.71094 17.21 7.65234L14.793 5.2793C14.6465 5.13281 14.4902 5.05957 14.3242 5.05957C14.1484 5.05957 13.9922 5.13281 13.8555 5.2793L11.4238 7.65234C11.2969 7.75977 11.2334 7.90625 11.2334 8.0918C11.2334 8.26758 11.2871 8.40918 11.3945 8.5166C11.5117 8.62402 11.6582 8.67773 11.834 8.67773C12.0293 8.67773 12.1855 8.61426 12.3027 8.4873L13.0498 7.71094L13.6797 7.03711V7.71094V15.0645C13.6797 15.25 13.7432 15.4062 13.8701 15.5332C13.9971 15.6602 14.1484 15.7236 14.3242 15.7236Z"
                    fill="#A4A4A4" />
                </svg>
              </button>
              <div id="profile" class="flex items-center row-span-1 gap-2 text-white shrink-0">
                <img v-if="duck?.created_by?.profile_picture?.path"
                  class="object-cover w-10 h-10 rounded-full hover:cursor-pointer"
                  :src="duck?.created_by?.profile_picture?.path" alt="Profile picture" />
                <div class="flex-col items-start hidden opacity-50 sm:flex">
                  <span class="font-bold text-md">{{ duck?.created_by?.first_name }}</span>
                  <span class="text-sm">@{{ duck?.created_by?.username }}</span>
                </div>
              </div>
            </div>
            <div class="flex items-center justify-center">
              <a href="https://duckling.co">
                <img class="object-contain h-10 md:hidden" src="assets/img/duckling_logo_grey.png" alt="" />
                <img class="hidden object-contain h-10 md:block" src="assets/img/duckling_logo_text_right_grey.png"
                  alt="" />
              </a>
            </div>
            <div class="flex items-center justify-end w-full gap-2 sm:gap-4">
              <button class="flex items-center justify-center h-10 shrink-0" @click="nav.close">
                <svg width="29" height="30" viewBox="0 0 29 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M14.4912 29.0283C12.5674 29.0283 10.7607 28.6621 9.07129 27.9297C7.38184 27.1973 5.89258 26.1865 4.60352 24.8975C3.31445 23.6084 2.29883 22.1191 1.55664 20.4297C0.824219 18.7305 0.458008 16.9189 0.458008 14.9951C0.458008 13.0811 0.824219 11.2793 1.55664 9.58984C2.28906 7.89062 3.2998 6.39648 4.58887 5.10742C5.8877 3.80859 7.38184 2.79297 9.07129 2.06055C10.7607 1.32812 12.5625 0.961914 14.4766 0.961914C16.4004 0.961914 18.207 1.32812 19.8965 2.06055C21.5859 2.79297 23.0752 3.80859 24.3643 5.10742C25.6631 6.39648 26.6787 7.89062 27.4111 9.58984C28.1533 11.2793 28.5244 13.0811 28.5244 14.9951C28.5244 16.9189 28.1582 18.7305 27.4258 20.4297C26.6934 22.1191 25.6777 23.6084 24.3789 24.8975C23.0898 26.1865 21.6006 27.1973 19.9111 27.9297C18.2217 28.6621 16.415 29.0283 14.4912 29.0283ZM8.51465 21.2793H20.4238C21.1172 21.2793 21.6396 21.1084 21.9912 20.7666C22.3525 20.415 22.5332 19.8975 22.5332 19.2139V10.8496C22.5332 10.1562 22.3525 9.63867 21.9912 9.29688C21.6396 8.94531 21.1172 8.76953 20.4238 8.76953H8.51465C7.83105 8.76953 7.30859 8.94531 6.94727 9.29688C6.5957 9.63867 6.41992 10.1562 6.41992 10.8496V19.2139C6.41992 19.8975 6.5957 20.415 6.94727 20.7666C7.30859 21.1084 7.83105 21.2793 8.51465 21.2793ZM8.57324 20.0635C8.28027 20.0635 8.05078 19.9805 7.88477 19.8145C7.71875 19.6484 7.63574 19.4287 7.63574 19.1553V18.5254L9.59863 16.8994C9.9209 16.6357 10.2334 16.5039 10.5361 16.5039C10.8682 16.5039 11.1953 16.6406 11.5176 16.9141L12.8213 18.0859L16.0879 15.2002C16.4395 14.8877 16.8105 14.7363 17.2012 14.7461C17.6016 14.7266 17.9727 14.8779 18.3145 15.2002L21.3027 17.9102V19.1553C21.3027 19.4287 21.2197 19.6484 21.0537 19.8145C20.8877 19.9805 20.6533 20.0635 20.3506 20.0635H8.57324ZM11.4736 15.1855C11.0146 15.1855 10.6191 15.0244 10.2871 14.7021C9.95508 14.3701 9.78906 13.9697 9.78906 13.501C9.78906 13.042 9.95508 12.6514 10.2871 12.3291C10.6191 11.9971 11.0146 11.8311 11.4736 11.8311C11.9326 11.8311 12.3281 11.9971 12.6602 12.3291C12.9922 12.6514 13.1582 13.042 13.1582 13.501C13.1582 13.9697 12.9922 14.3701 12.6602 14.7021C12.3281 15.0244 11.9326 15.1855 11.4736 15.1855Z"
                    fill="#A4A4A4" />
                </svg>
              </button>
              <button class="flex items-center justify-center h-10 shrink-0" @click="nav.close">
                <svg width="29" height="30" viewBox="0 0 29 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M14.4912 29.0283C12.5674 29.0283 10.7607 28.6621 9.07129 27.9297C7.38184 27.1973 5.89258 26.1865 4.60352 24.8975C3.31445 23.6084 2.29883 22.1191 1.55664 20.4297C0.824219 18.7305 0.458008 16.9189 0.458008 14.9951C0.458008 13.0811 0.824219 11.2793 1.55664 9.58984C2.28906 7.89062 3.2998 6.39648 4.58887 5.10742C5.8877 3.80859 7.38184 2.79297 9.07129 2.06055C10.7607 1.32812 12.5625 0.961914 14.4766 0.961914C16.4004 0.961914 18.207 1.32812 19.8965 2.06055C21.5859 2.79297 23.0752 3.80859 24.3643 5.10742C25.6631 6.39648 26.6787 7.89062 27.4111 9.58984C28.1533 11.2793 28.5244 13.0811 28.5244 14.9951C28.5244 16.9189 28.1582 18.7305 27.4258 20.4297C26.6934 22.1191 25.6777 23.6084 24.3789 24.8975C23.0898 26.1865 21.6006 27.1973 19.9111 27.9297C18.2217 28.6621 16.415 29.0283 14.4912 29.0283ZM8.29492 14.7607H13.1875C13.5293 14.7607 13.793 14.6777 13.9785 14.5117C14.1641 14.3457 14.2568 14.0674 14.2568 13.6768V8.78418C14.2568 8.52051 14.1641 8.30078 13.9785 8.125C13.8027 7.93945 13.5879 7.84668 13.334 7.84668C13.0801 7.84668 12.8604 7.93945 12.6748 8.125C12.499 8.30078 12.4111 8.52051 12.4111 8.78418V9.53125L12.543 11.8311L8.71973 7.86133C8.52441 7.65625 8.29004 7.55371 8.0166 7.55371C7.75293 7.55371 7.52344 7.65625 7.32812 7.86133C7.13281 8.04688 7.04004 8.27637 7.0498 8.5498C7.05957 8.81348 7.15723 9.04297 7.34277 9.23828L11.2832 13.0469L9.07129 12.915H8.29492C8.04102 12.915 7.82129 13.0029 7.63574 13.1787C7.45996 13.3545 7.37207 13.5742 7.37207 13.8379C7.37207 14.0918 7.45996 14.3115 7.63574 14.4971C7.82129 14.6729 8.04102 14.7607 8.29492 14.7607ZM15.6484 22.1289C15.9023 22.1289 16.1172 22.041 16.293 21.8652C16.4785 21.6797 16.5713 21.46 16.5713 21.2061V20.459L16.4395 18.1445L20.2627 22.1143C20.458 22.3193 20.6875 22.4219 20.9512 22.4219C21.2246 22.4219 21.4541 22.3193 21.6396 22.1143C21.8447 21.9287 21.9424 21.7041 21.9326 21.4404C21.9229 21.167 21.8203 20.9326 21.625 20.7373L17.6846 16.9287L19.8965 17.0605H20.6875C20.9414 17.0605 21.1562 16.9727 21.332 16.7969C21.5176 16.6211 21.6104 16.4014 21.6104 16.1377C21.6104 15.8838 21.5176 15.6689 21.332 15.4932C21.1562 15.3076 20.9414 15.2148 20.6875 15.2148H15.7949C15.4531 15.2148 15.1895 15.2979 15.0039 15.4639C14.8184 15.6299 14.7256 15.9082 14.7256 16.2988V21.2061C14.7256 21.46 14.8135 21.6797 14.9893 21.8652C15.165 22.041 15.3848 22.1289 15.6484 22.1289Z"
                    fill="#A4A4A4" />
                </svg>
              </button>
            </div>
          </div>
        </div>
        <div class="flex flex-col w-full">
          <!-- {{ currentCard?.type }} -->
          <div v-if="currentCardVideo && currentCard?.type == 'video'"
            class="flex items-center justify-center w-full h-full">
            <!-- <button @click="currentCardVideo?.togglePlay()" class="">
              {{ currentCardVideo?.playing ? "pause" : "play" }}
            </button> -->
            <!-- <div class="">
              {{ currentCardVideo?.convertTimeToDuration(currentCardVideo?.time) }} /
              {{ currentCardVideo?.convertTimeToDuration(currentCardVideo?.duration) }}
            </div> -->
            <player-track :percentage="currentCardVideo?.percentagePlayed" @seek="currentCardVideo?.seekToPercentage"
              class="flex-grow" />
            <!-- <button @click="currentCardVideo?.toggleMute()" class="">
              {{ currentCardVideo?.videoMuted ? "unmute" : "mute" }}
            </button> -->
          </div>
          <!-- <template v-if="currentCardVideo"> <video-player-track v-if="currentCard?.type == 'video'"
              :percentage="currentCardVideo?.percentagePlayed" @seek="currentCardVideo?.seekToPercentage"
              class="videoplayer-controls-track" />
            <VideoPlayerTrack v-if="currentCard?.type === 'video'" :percentage="currentCardVideo?.percentagePlayed"
              @seek="currentCardVideo?.seekToPercentage" />
          </template>
          <button @click="currentCardVideo?.togglePlay()">Play/pause</button> -->
        </div>
      </div>
    </template>
  </carousel>
</template>

<script setup lang="ts">
import "vue3-carousel/dist/carousel.css";
import { Carousel, Slide, Navigation } from "vue3-carousel";
import CustomPagination from "./CustomPagination.vue";
import { useRoute } from "vue-router";

import CardImage from "./CardImage.vue";
import CardText from "./CardText.vue";
import CardVideo from "./CardVideo.vue";

const route = useRoute();
const id = route.params.id;

const props = defineProps({
  duck: Object,
});

const cardVideoSlides = ref([]);
const audioDrawerRefs = ref([]);

const cardComponents: Record<string, Component> = {
  image: CardImage,
  text: CardText,
  video: CardVideo,
};

const cards = computed(() => props?.duck?.cards || []);

const onClickCloseCarousel = () => {
  navigateTo(`/duck/${id}`);
};

const currentSlide = ref(0);

watchEffect(() => {
  console.log(currentSlide.value)
})

const currentCard = computed(() => {
  return cards.value[unref(currentSlide)]
});

// watchEffect(() => {
//   if (currentCard.value?.type === "video") {
//     // Toggle play
//     cardVideoSlides.value = cards.value.filter((card) => card?.type === "video");
//   }
//   console.log(currentCard.value)
// })


const currentCardVideo = computed(() => {
  console.log(cardVideoSlides.value)
  return cardVideoSlides.value?.find((card) => card?.id === unref(unref(currentCard))?.id);
});

watch(currentCardVideo, (newCurrentCardVideo) => {
  console.log("Play video")
  console.log(newCurrentCardVideo)
  newCurrentCardVideo?.play();

  // turn off other videos
  cardVideoSlides.value.forEach((card) => {
    if (card?.id !== newCurrentCardVideo?.id) {
      card?.pause();
    }
  });
  // // toggle play
  // if (currentCardVideo.value?.type === "video") {
  // }
})

watchEffect(() => {
  console.log(currentCardVideo.value)
})


const currentCardAudio = computed(() => {
  return audioDrawerRefs.value?.find((audioDrawer) => audioDrawer?.id === unref(unref(currentCard))?.id);
});

watch(currentCardAudio, (newCurrentCardAudio) => {
  console.log("Play audio")
  console.log(newCurrentCardAudio)
  newCurrentCardAudio?.play();

  // turn off other audios
  audioDrawerRefs.value.forEach((audioDrawer) => {
    if (audioDrawer?.id !== newCurrentCardAudio?.id) {
      audioDrawer?.pause();
    }
  });
})

</script>

<style deep lang="css">
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
