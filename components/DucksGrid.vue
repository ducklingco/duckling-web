<template>
  <DucksFilter class="pb-8" />
  <div class="grid grid-cols-1 gap-8 lg:grid-cols-2 xl:grid-cols-3">
    <DuckCard v-for="duck in ducks" :key="duck" :duck="duck" />
  </div>
  <div v-if="canFetchMore && !isFetching" class="flex items-center justify-center w-full h-full mt-8 ">
    <div class="overflow-hidden border-2 rounded-lg bg-grey border-grey">
      <button class="px-4 py-0 text-lg text-white bg-transparent  text hover:bg-white hover:text-grey transition-colors"
        @click="fetchDucks">More ducks</button>

    </div>
  </div>
  <div v-if="isFetching" class="flex items-center justify-center w-full h-10 mt-8 ">
    <div class="w-12 h-12 border-t-4 border-solid rounded-full border-grey animate-spin-slow">
    </div>
  </div>
</template>

<script setup lang="ts">
import DuckCard from "./DuckCard.vue";
import DucksFilter from "./DucksFilter.vue";
import { useDucksStore } from '@/stores/ducks'
const ducksStore = useDucksStore();
const { fetchDucks, fetchInitialDucks } = ducksStore;
const { getDucks: ducks, canFetchMore, isFetching } = storeToRefs(ducksStore);
fetchInitialDucks();
</script>
