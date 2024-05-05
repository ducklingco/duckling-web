<template>
  <div class="relative overflow-hidden card rounded-lg md:rounded-2xl hover:cursor-pointer" @click="onClickCard">
    <img v-show="imageLoaded" class="object-cover w-full h-full " :src="props?.duck?.cover_image?.path" alt="Duck image"
      @load="imageLoaded = true" />
    <div v-if="!imageLoaded" class="w-full h-full bg-duckling_grey animate-pulse"></div>

    <div class="absolute top-0 left-0 w-full h-full bg-duckling_black bg-opacity-50">
      <div class="flex flex-col justify-between h-full p-6 text-white">
        <div id="profile" class="flex items-center flex-grow-0 gap-2">
          <img v-if="props?.duck?.created_by?.profile_picture?.path" class="object-cover rounded-full w-14 h-14"
            :src="props?.duck?.created_by?.profile_picture?.path" alt="Profile picture" />
          <div v-if="duck?.created_by" class="flex flex-col">
            <span class="font-bold text-md">{{ props?.duck?.created_by?.first_name }}</span>
            <span class="text-sm">@{{ props?.duck?.created_by?.username }}</span>
          </div>
        </div>
        <div class="flex flex-col items-start justify-center flex-grow w-full">
          <div class="py-3 ">
            <h2 class="font-bold text" :class="titleFontClass">
              {{ props?.duck?.title }}
            </h2>
          </div>
          <div v-if="props?.duck?.latest_topics?.length !== 0" id="tags"
            class="flex flex-wrap justify-start gap-2 pb-3 align-baseline">
            <div v-for="topic of props?.duck?.latest_topics" :key="topic?.id">
              <Tag>{{ topic?.name }}</Tag>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from "vue";

let props = defineProps<{ duck: any }>();

let onClickCard = () => {
  navigateTo({ name: "carousel-id", params: { id: props.duck.id }, query: { redirected: '1' } });
};

const titleFontClass = computed(() => {
  if (props?.duck?.latest_topics?.length >= 0 && props?.duck?.title?.length > 60 || props?.duck?.title?.length > 85) {
    return "text-xl sm:text-2xl md:text-3xl";
  }
  return "text-2xl sm:text-3xl md:text-4xl";
});

const imageLoaded = ref(false);
</script>

<style scoped>
.card {
  background-size: cover;
  aspect-ratio: 570/400;
}
</style>