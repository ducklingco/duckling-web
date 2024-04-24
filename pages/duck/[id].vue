<template>
  <div class="flex items-center justify-center min-h-screen bg-duckling_black">
    <div class="relative w-full max-w-[calc(100vh*4/3)] mx-auto">
      <div class="relative pb-[75%]">
        <div class="absolute w-full h-full p-8 sm:p-12">
          <img v-show="imageLoaded" class="object-cover w-full h-full" :src="duck?.cover_image?.path" alt="Duck image"
            @load="imageLoaded = true" />

          <div class="absolute top-0 left-0 w-full h-full p-8 bg-duckling_black bg-opacity-30 sm:p-12">
            <div class="relative grid w-full h-full grid-rows-5 overflow-hidden">
              <card-click-areas @next="onClickNext" />
              <div
                class="absolute right-0 w-20 h-20 transform translate-x-1/2 -translate-y-1/2 rounded-full top-1/2 md:w-32 md:h-32 xl:w-40 xl:h-40 bg-duckling_green hover:cursor-pointer"
                @click="onClickNext">
                <!-- Chevron next icon -->
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="white"
                  class="w-1/2 h-1/2 absolute top-1/2 left-1/2 transform -translate-x-[100%] -translate-y-1/2">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                </svg>
              </div>
              <div class="z-10 grid grid-cols-3 row-span-1 gap-8 p-6 pointer-events-none lg:grid-rows-1">
                <div class="flex grid-cols-1 gap-2 sm:gap-4">
                  <a class="flex items-center justify-center w-4 h-4 text-xs text-duckling_black bg-duckling_white rounded-full pointer-events-auto sm:w-8 sm:h-8 hover:cursor-pointer"
                    @click="onClickClose">
                    <!-- Cross / exit icon -->
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                      class="w-6 h-6">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12">
                      </path>
                    </svg>
                  </a>
                  <button
                    class="text-xs bg-duckling_white text-duckling_black rounded-full w-4 h-4 sm:w-8 sm:h-8 flex items-center justify-center p-[2px] sm:p-[7px] pointer-events-auto">
                    <!-- Share icon -->
                    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100"
                      viewBox="0 0 24 24">
                      <path
                        d="M 16.707031 2.2929688 L 15.292969 3.7070312 L 17.585938 6 L 17 6 C 10.936593 6 6 10.936593 6 17 L 6 18 L 8 18 L 8 17 C 8 12.017407 12.017407 8 17 8 L 17.585938 8 L 15.292969 10.292969 L 16.707031 11.707031 L 21.414062 7 L 16.707031 2.2929688 z M 2 8 L 2 9 L 2 22 L 22 22 L 22 18 L 22 17 L 20 17 L 20 18 L 20 20 L 4 20 L 4 9 L 4 8 L 2 8 z">
                      </path>
                    </svg>
                  </button>
                </div>
                <div class="flex items-start justify-center grid-cols-2 pointer-events-auto">
                  <a href="https://duckling.co">
                    <img class="object-contain h-8 sm:h-12" src="assets/img/duckling_logo_text_right_white.png"
                      alt="Logo" />
                  </a>
                </div>

                <div class="grid-cols-1 pointer-events-none"></div>
              </div>

              <div class="flex items-center justify-center h-full row-span-3 px-3 md:px-14 lg:px-20 xl:p-40">
                <div class="flex-col items-center justify-center gap-10 p-6 text-duckling_white">
                  <div id="profile" class="flex items-center row-span-1 gap-2">
                    <img v-if="duck?.created_by?.profile_picture?.path" class="object-cover rounded-full w-14 h-14"
                      :src="duck?.created_by?.profile_picture?.path" alt="Profile picture" />
                    <div v-if="duck?.created_by" class="flex flex-col">
                      <span class="font-bold text-md">{{ duck?.created_by?.first_name }}</span>
                      <span class="text-sm">@{{ duck?.created_by?.username }}</span>
                    </div>
                    <!-- Spinner when loading -->
                    <div v-else class="w-12 h-12 border-t-4 border-duckling_white border-solid rounded-full animate-spin-slow">
                    </div>
                  </div>
                  <div class="flex items-center row-span-3 py-3">
                    <h2 class="text-xl font-bold text sm:text-4xl md:text-6xl lg:text-8xl">
                      {{ duck?.title }}
                    </h2>
                  </div>
                  <div id="tags"
                    class="flex flex-wrap justify-start row-span-1 gap-2 text-xs align-baseline sm:text-sm">
                    <div v-for="topic of duck?.latest_topics" :key="topic?.id">
                      <Tag>{{ topic?.name }}</Tag>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from "vue-router";
import { useDucksStore } from "@/stores/ducks";
import useCardNavigation from '@/composables/useCardNavigation';

const route = useRoute();
const id = route.params.id;

const { getDuck } = useDucksStore();

const duck = ref(null);
getDuck(id as string).then((data: any) => {
  duck.value = data;
}).catch((error: any) => {
  console.error(error);
})

const imageLoaded = ref(false);

let onClickNext = () => {
  navigateTo({ name: "carousel-id", params: { id: id } });
};

const onClickClose = () => {
  // Navigate to index
  navigateTo({ name: "index" });
};

const emit = defineEmits(['prev', 'next']);
const { CardClickAreas } = useCardNavigation(emit);

</script>
