<template>
  <fullscreen-wrapper class="absolute w-screen h-screen" :fullscreen="fullscreen">
    <duck-carousel class="h-full" @toggle-fullscreen="toggleFullscreen" :duck="duck" />
  </fullscreen-wrapper>
</template>

<script setup lang="ts">
import { useRoute } from "vue-router";
import { useDucksStore } from "@/stores/ducks";

const route = useRoute();
const id = route.params.id;

const fullscreen = ref(false);

const toggleFullscreen = () => {
  fullscreen.value = !fullscreen.value;
};

const { getDuck } = useDucksStore();

const duck = ref(null);
getDuck(id as string).then((data: any) => {
  duck.value = data;
}).catch((error: any) => {
  console.error(error);
})
</script>
