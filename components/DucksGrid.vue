<template>
  <DucksFilter class="pb-4 md:pb-8" />
  <div
    ref="scrollComponent"
    class="grid grid-cols-1 gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3"
  >
    <DuckCard v-for="duck in ducks" :key="duck?.id" :duck="duck" />
  </div>
  <div v-if="isFetching" class="mt-4 flex w-full items-center justify-center">
    <div
      class="h-8 w-8 animate-spin-slow rounded-full border-t-4 border-solid border-duckling_grey"
    />
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from "~/stores/user";
import DuckCard from "./DuckCard.vue";
import DucksFilter from "./DucksFilter.vue";
import { useDucksStore } from "@/stores/ducks";
import type { VNodeRef } from "vue";

const ducksStore = useDucksStore();
const userStore = useUserStore();
const { fetchDucks, fetchInitialDucks } = ducksStore;
const { getDucks: ducks, canFetchMore, isFetching } = storeToRefs(ducksStore);
const { accessToken } = storeToRefs(userStore);
const { setAccessToken } = userStore;

onMounted(async () => {
  window.addEventListener("scroll", handleScroll);
  await setAccessToken();
  fetchInitialDucks(accessToken.value);
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});

const scrollComponent: VNodeRef = ref();

watch(ducks, async () => {
  fetchIfPossible();
});

const fetchIfPossible = async () => {
  const element = scrollComponent.value;
  if (!element) return;
  if (element.getBoundingClientRect().bottom < window.innerHeight) {
    if (canFetchMore.value && !isFetching.value) {
      fetchDucks(accessToken.value);
    }
  }
};

const handleScroll = () => {
  fetchIfPossible();
};
</script>
