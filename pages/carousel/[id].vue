
<template>
  <div class="flex items-center justify-center h-screen">
    <div>
      <DuckCarousel :duck="duck" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from "vue-router";
import { useDucksStore } from "@/stores/ducks";

const route = useRoute();
const id = route.params.id;

const { getDuck } = useDucksStore();

const duck = ref(null);
getDuck(id as string).then((data: any) => {
  duck.value = data;
}).catch((error: any) => {
  console.error(error);
})
</script>
