<template>
  <div class="flex w-full sm:w-max">
    <div
      class="grid flex-auto grid-cols-3 m-auto overflow-hidden border-2 rounded-lg bg-duckling_grey border-duckling_grey">
      <button
        class="px-4 py-0 transition-colors bg-transparent text-duckling_white hover:bg-duckling_white hover:text-duckling_grey"
        :class="{ selected: selected.value === 'featured' }" @click="onClick('featured')">
        Featured
      </button>
      <button
        class="px-4 py-0 transition-colors bg-transparent text-duckling_white hover:bg-duckling_white hover:text-duckling_grey"
        @click="onClick('verified')" :class="{ selected: selected.value === 'verified' }">
        Verified
      </button>
      <button
        class="px-4 py-0 transition-colors bg-transparent text-duckling_white hover:bg-duckling_white hover:text-duckling_grey"
        :class="{ selected: selected.value === 'all' }" @click="onClick('all')">
        All
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useDucksStore } from "@/stores/ducks";

const ducksStore = useDucksStore();
const { setFilter } = ducksStore;
const { getFilter } = storeToRefs(ducksStore)

const emit = defineEmits(["filter"]);

const selected = computed(() => getFilter);

const onClick = (value: string) => {
  setFilter(value);
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
