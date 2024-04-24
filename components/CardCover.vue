<template>

    <img v-show="imageLoaded" class="object-cover w-full h-full" :src="duck?.cover_image?.path" alt="Duck image"
        @load="imageLoaded = true" />
    <div v-if="!imageLoaded" class="w-full h-full bg-duckling_grey animate-pulse"></div>

    <div class="absolute top-0 left-0 w-full h-full bg-duckling_black bg-opacity-30 ">
        <div class="relative grid w-full h-full grid-rows-5 overflow-hidden">
            <card-click-areas @next="onClickNext" />
            <div class="absolute right-0 w-20 h-20 transform translate-x-1/2 -translate-y-1/2 rounded-full top-1/2 md:w-32 md:h-32 xl:w-40 xl:h-40 bg-duckling_green hover:cursor-pointer"
                @click="onClickNext">
                <!-- Chevron next icon -->
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="white"
                    class="w-1/2 h-1/2 absolute top-1/2 left-1/2 transform -translate-x-[100%] -translate-y-1/2">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                </svg>
            </div>

            <!-- Necessary for spacing. Could use grid template however -->
            <div></div>

            <div class="flex items-center justify-center h-full row-span-3 px-3 md:px-14 lg:px-20 xl:p-40">
                <div class="flex-col items-center justify-center gap-10 p-6 text-duckling_white">
                    <div id="profile" class="flex items-center row-span-1 gap-2">
                        <img v-if="duck?.created_by?.profile_picture?.path" class="object-cover rounded-full w-14 h-14"
                            :src="duck?.created_by?.profile_picture?.path" alt="Profile picture" />
                        <div v-if="duck?.created_by" class="flex flex-col text-left">
                            <span class="text-sm font-bold sm:text-md md:text-xl lg:text-2xl">{{
        duck?.created_by?.first_name
    }}</span>
                            <span class="text-xs sm:text-sm md:text-lg lg:text-xl">@{{ duck?.created_by?.username
                                }}</span>
                        </div>
                        <!-- Spinner when loading -->
                        <div v-else
                            class="w-12 h-12 border-t-4 border-duckling_white border-solid rounded-full animate-spin-slow">
                        </div>
                    </div>
                    <div class="flex items-center row-span-3 py-3 text-left">
                        <h2 class="text-xl font-bold text sm:text-4xl md:text-5xl lg:text-6xl xl:text-8xl">
                            {{ duck?.title }}
                        </h2>
                    </div>
                    <div id="tags"
                        class="flex flex-wrap justify-start row-span-1 gap-2 text-sm align-baseline sm:text-sm md:text-md lg:text-lg xl:text-xl">
                        <div v-for="topic of duck?.latest_topics" :key="topic?.id">
                            <Tag>{{ topic?.name }}</Tag>
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
    // navigateTo({ name: "carousel-id", params: { id: id } });
    emit('next');
};

const emit = defineEmits(['prev', 'next']);
const { CardClickAreas } = useCardNavigation(emit);

</script>
