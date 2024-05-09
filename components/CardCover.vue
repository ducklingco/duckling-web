<template>

    <div v-if="!imageLoaded" class="w-full h-full bg-duckling_black animate-pulse"/>
    <img
v-show="imageLoaded" class="object-cover w-full h-full" :src="duck?.cover_image?.path" alt="Duck image"
        @load="() => imageLoaded = true" >

    <div class="absolute top-0 left-0 w-full h-full bg-duckling_black bg-opacity-30 ">
        <div class="relative grid w-full h-full grid-rows-5 overflow-hidden">
            <card-click-areas @next="onClickNext" />
            <!-- Necessary for spacing. Could use grid template however -->
            <div/>
            <div class="flex items-center justify-center h-full row-span-3 px-3 md:px-14 lg:px-20 xl:p-40">
                <div class="flex-col items-center justify-center gap-10 pr-10 text-duckling_white md:pr-0">
                    <div id="profile" class="flex items-center row-span-1 gap-2">
                        <img
v-if="profilePicture" class="object-cover rounded-full w-14 h-14" :src="profilePicture"
                            alt="Profile picture" >
                        <div v-if="createdBy" class="flex flex-col text-left">
                            <span class="text-xl font-bold md:text-2xl lg:text-3xl">{{
        createdBy?.first_name
    }}</span>
                            <span class="text-md md:text-lg lg:text-xl">@{{ createdBy?.username
                                }}</span>
                        </div>
                        <!-- Spinner when loading -->
                        <div
v-else
                            class="w-12 h-12 border-t-4 border-solid rounded-full border-duckling_white animate-spin-slow"/>
                    </div>
                    <div class="flex items-center row-span-3 py-3 text-left">
                        <h2 class="text-6xl font-bold text xl:text-8xl">
                            {{ duck?.title }}
                        </h2>
                    </div>
                    <div
id="tags"
                        class="flex flex-wrap justify-start row-span-1 gap-2 text-sm align-baseline md:text-md lg:text-lg ">
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
import useCardNavigation from '@/composables/useCardNavigation';

const props = defineProps({
    duck: Object
});

const emit = defineEmits(['prev', 'next']);

const imageLoaded = ref(false);

const profilePicture = computed(() => props?.duck?.created_by?.profile_picture?.path);

const createdBy = computed(() => props?.duck?.created_by);

const onClickNext = () => {
    emit('next');
};

const { CardClickAreas } = useCardNavigation(emit);
</script>
