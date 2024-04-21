<template>
  <DucksFilter class="pb-8" />
  <div class="grid grid-cols-1 gap-8 lg:grid-cols-2 xl:grid-cols-3">
    <DuckCard v-for="duck in ducks" :key="duck" :duck="duck" />
  </div>
</template>

<script setup lang="ts">
import DuckCard from "./DuckCard.vue";
import DucksFilter from "./DucksFilter.vue";
import { useDucksStore } from '@/stores/ducks'
const ducksStore = useDucksStore();
const { fetchDucks } = ducksStore;
const { getDucks: ducks } = storeToRefs(ducksStore);
fetchDucks();
</script>
