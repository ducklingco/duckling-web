<template>
  <div class="absolute w-full h-full">
    <duck-carousel class="h-full" @toggle-fullscreen="toggle" :duck="duck" />
  </div>
</template>

<script setup lang="ts">
import { useRoute } from "vue-router";
import { useDucksStore } from "@/stores/ducks";
import { useFullscreen } from '@vueuse/core'

const { toggle } = useFullscreen()

const route = useRoute();
const id = route.params.id;

const { getDuck } = useDucksStore();

const duck = ref(null);
getDuck(id as string).then((data: any) => {
  duck.value = data;
}).catch((error: any) => { })


</script>
