<template>
  <div class="flex w-max">
    <div
      class="bg-grey m-auto border-grey border-2 rounded-lg overflow-hidden flex-auto grid grid-cols-3"
    >
      <button
        class="bg-transparent text-white px-4 py-0 hover:bg-white hover:text-grey transition-colors"
        :class="{ selected: selected === 'featured' }"
        @click="onClick('featured')"
      >
        Featured
      </button>
      <button
        class="bg-transparent text-white px-4 py-0 hover:bg-white hover:text-grey transition-colors"
        @click="onClick('verified')"
        :class="{ selected: selected === 'verified' }"
      >
        Verified
      </button>
      <button
        class="bg-transparent text-white px-4 py-0 hover:bg-white hover:text-grey transition-colors"
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
