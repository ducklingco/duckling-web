<template>
  <div class="sm:py-30 h-full w-full bg-duckling_beige py-20 md:py-40 lg:py-40">
    <div ref="parent" class="flex h-full w-full items-center justify-center">
      <div
        ref="textElement"
        class="xs:px-0 xs:w-3/4 text w-full px-4 text-left font-bold leading-tight lg:w-3/4 2xl:max-w-screen-lg"
        :style="{ fontSize: `${fontSize}px` }"
      >
        {{ props.card.content }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import useCardNavigation from "@/composables/useCardNavigation";
import type { VNodeRef } from "vue";
import type { DucklingText } from "~/types/Duckling";

const props = defineProps<{ card: DucklingText }>();

const emit = defineEmits(["prev", "next"]);
const { onClickPrev, onClickNext, CardClickAreas } = useCardNavigation(emit);

const textElement = ref<VNodeRef | null>(null);
const parent = ref<VNodeRef | null>(null);
const fontSize = ref(1);

onMounted(() => {
  console.log(props.card);
  const observer = new ResizeObserver(() => {
    adjustFontSize();
  });
  observer.observe(parent.value);

  onUnmounted(() => {
    observer.disconnect();
  });
});

const adjustFontSize = async () => {
  fontSize.value = 1; // Reset to the initial small font size
  const maxFontSize = 100; // Set a maximum limit for the font size (down from a former value of 500)

  // Increase font size until the text no longer fits or the maximum limit is reached
  while (fontSize.value < maxFontSize) {
    fontSize.value++;
    await nextTick();

    if (
      textElement.value.offsetWidth > parent.value.offsetWidth ||
      textElement.value.offsetHeight > parent.value.offsetHeight
    ) {
      break;
    }
  }

  // Decrease font size by one step to ensure the text fits
  fontSize.value--;
};
</script>
