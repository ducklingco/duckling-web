<template>
  <div class="flex w-max">
    <div
      class="flex-auto m-auto overflow-hidden border-2 rounded-lg bg-grey border-grey grid grid-cols-3"
    >
      <button
        class="px-4 py-0 text-white bg-transparent hover:bg-white hover:text-grey transition-colors"
        :class="{ selected: selected === 'featured' }"
        @click="onClick('featured')"
      >
        Featured
      </button>
      <button
        class="px-4 py-0 text-white bg-transparent hover:bg-white hover:text-grey transition-colors"
        @click="onClick('verified')"
        :class="{ selected: selected === 'verified' }"
      >
        Verified
      </button>
      <button
        class="px-4 py-0 text-white bg-transparent hover:bg-white hover:text-grey transition-colors"
        :class="{ selected: selected === 'all' }"
        @click="onClick('all')"
      >
        All
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineEmits } from "vue";
const emit = defineEmits(["filter"]);
let selected = ref("featured");

const onClick = (value: string) => {
  selected.value = value;
  emit("filter", value);
};
</script>

<style scoped>
button {
  transition: background-color 0.3s;
}
button.selected {
  @apply bg-white text-grey;
}
</style>
