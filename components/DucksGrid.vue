<template>
  <DucksFilter class="pb-8" />
  <div class="grid grid-cols-1 gap-8 lg:grid-cols-2 xl:grid-cols-3">
    <DuckCard v-for="duck in ducks" :key="duck" :duck="duck" />
  </div>
</template>

<script setup lang="ts">
// Use api/ducks to fetch ducks and pass them to DuckCard
import { ref } from "vue";
import DuckCard from "./DuckCard.vue";
import DucksFilter from "./DucksFilter.vue";
import { useDucksStore } from '@/stores/ducks'
const { getDucks } = useDucksStore();
const ducks = ref([]);

getDucks().then((data: any) => {
  ducks.value = data;
});







</script>
