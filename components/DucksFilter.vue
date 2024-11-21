<template>
  <div class="flex w-full sm:w-max">
    <div
      class="m-auto grid flex-auto grid-cols-3 overflow-hidden rounded-lg border-2 border-duckling_grey bg-duckling_grey"
    >
      <button
        class="bg-transparent px-4 py-0 text-duckling_white transition-colors hover:bg-duckling_white hover:text-duckling_grey"
        :class="isSelected('featured')"
        @click="onClick('featured')"
      >
        Featured
      </button>
      <button
        class="bg-transparent px-4 py-0 text-duckling_white transition-colors hover:bg-duckling_white hover:text-duckling_grey"
        :class="isSelected('verified')"
        @click="onClick('verified')"
      >
        Verified
      </button>
      <button
        class="bg-transparent px-4 py-0 text-duckling_white transition-colors hover:bg-duckling_white hover:text-duckling_grey"
        :class="isSelected('all')"
        @click="onClick('all')"
      >
        All
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useDucksStore } from "@/stores/ducks";
import type { Filter } from "../types/Filter";
import { useUserStore } from "~/stores/user";

const ducksStore = useDucksStore();
const userStore = useUserStore();
const { setFilter } = ducksStore;
const { getFilter } = storeToRefs(ducksStore);
const { accessToken } = storeToRefs(userStore);
const { setAccessToken } = userStore;

const isSelected = (value: Filter) => {
  return { selected: getFilter.value === value };
};

onMounted(async () => {
  await setAccessToken();
});

const onClick = (value: Filter) => {
  setFilter(value, accessToken.value);
};
</script>

<style scoped>
button {
  transition: background-color 0.3s;
}

button.selected {
  @apply bg-duckling_white text-duckling_grey;
}
</style>
