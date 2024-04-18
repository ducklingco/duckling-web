<template>
  <div
    class="overflow-hidden card rounded-2xl hover:cursor-pointer"
    :style="{'background-image': 'url(' + props?.duck?.cover_image?.path + ')'}"
    @click="onClickCard"
  >
    <div class="w-full h-full bg-black bg-opacity-50">
      <div class="flex-col justify-between h-full gap-10 p-6 text-white">
        <div id="profile" class="flex items-center gap-2">
          <img
            class="object-cover rounded-full w-14 h-14"
            :src="props?.duck?.created_by?.profile_picture?.path"
            alt="Profile picture"
            />
            <div class="flex flex-col">
            <span class="font-bold text-md">{{ props?.duck?.created_by?.first_name }}</span>
            <span class="text-sm">@{{ props?.duck?.created_by?.username }}</span>
          </div>
        </div>
        <div class="py-3">
          <h2 class="text-4xl font-bold text">
            {{ props?.duck?.title }}
          </h2>
        </div>
        <div
          id="tags"
          class="flex flex-wrap justify-start gap-2 align-baseline"
        >
          <div v-for="topic of props?.duck?.latest_topics" :key="topic?.id">
            <Tag>{{ topic?.name }}</Tag>
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
  navigateTo({ name: "duck-id", params: { id: props.duck.id }});
};
</script>

<style scoped>
.card {
  /* background-image: url("https://source.unsplash.com/random/300x200"); */
  background-size: cover;
  aspect-ratio: 570/400;
}
</style>
