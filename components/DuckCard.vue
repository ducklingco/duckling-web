<template>
  <div
    class="overflow-hidden card rounded-2xl hover:cursor-pointer"
    @click="onClickCard"
  >
    <div class="w-full h-full bg-black bg-opacity-50">
      <div class="flex-col justify-between h-full p-6 text-white gap-10">
        <div id="profile" class="flex items-center gap-2">
          <img
            class="rounded-full w-14 h-14"
            src="https://source.unsplash.com/random/100x100"
            alt="Profile picture"
          />
          <div class="flex flex-col">
            <span class="font-bold text-md">Name</span>
            <span class="text-sm">@username</span>
          </div>
        </div>
        <div class="py-3">
          <h2 class="text-4xl font-bold text">
            Title of the duck goes on the cover
          </h2>
        </div>
        <div
          id="tags"
          class="flex flex-wrap justify-start align-baseline gap-2"
        >
          <div v-for="tag of 3" :key="tag">
            <Tag>Climate change</Tag>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from "vue";
import { useRouter } from "vue-router";

let router = useRouter();

let props = defineProps<{ duck: number }>();
let onClickCard = () => {
  console.log("Clicked card with key:", props.duck);
  redirectToDuckCoverPage();
};

let redirectToDuckCoverPage = () => {
  console.log("Redirecting to duck cover page");

  // This is how you can redirect to a new page using duck id as a part of the url such as /duck/1
  router.push({ name: "duck-id", params: { id: props.duck } });
};
</script>

<style scoped>
.card {
  background-image: url("https://source.unsplash.com/random/300x200");
  background-size: cover;
  aspect-ratio: 570/400;
}
</style>
