<template>
  <div class="flex w-full flex-col items-center gap-4">
    <div class="flex w-full max-w-xl overflow-hidden rounded-full border-2 border-duckling_grey">
      <button
        class="flex-1 rounded-full py-4 text-lg font-semibold transition-colors"
        :class="isSelected('verified') ? 'bg-duckling_teal text-white' : 'bg-transparent text-duckling_black'"
        @click="onClick('verified')"
      >
        Editorial
      </button>
      <button
        class="flex-1 rounded-full py-4 text-lg font-semibold transition-colors"
        :class="isSelected('all') ? 'bg-duckling_teal text-white' : 'bg-transparent text-duckling_black'"
        @click="onClick('all')"
      >
        Community
      </button>
    </div>
    <div class="grid w-full max-w-xl grid-cols-2 text-center text-sm text-duckling_grey">
      <p>Stories that have been polished and verified by our editors</p>
      <p>Stories from community members. Not verified.</p>
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
  return getFilter.value === value;
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
</style>
