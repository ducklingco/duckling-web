<template>
  <DucksFilter class="pb-4 md:pb-8" />
  <div ref="scrollComponent" class="grid grid-cols-1 gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
    <DuckCard v-for="duck in ducks" :key="duck?.id" :duck="duck" />
  </div>
  <div v-if="isFetching" class="flex items-center justify-center w-full mt-4 ">
    <div class="w-8 h-8 border-t-4 border-solid rounded-full border-duckling_grey animate-spin-slow" />
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

onMounted(() => {
  window.addEventListener("scroll", handleScroll)
})

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll)
})

const scrollComponent = ref(null)

watch(ducks, () => {
  fetchIfPossible()
})

const fetchIfPossible = () => {
  const element = scrollComponent.value
  if (!element) return
  if (element.getBoundingClientRect().bottom < window.innerHeight) {
    if (canFetchMore.value && !isFetching.value) {
      fetchDucks()
    }
  }
}

const handleScroll = (_: any) => {
  fetchIfPossible()
}
</script>
