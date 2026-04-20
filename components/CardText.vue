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
const emit = defineEmits(["prev", "next", "ready"]);
const { onClickPrev, onClickNext, CardClickAreas } = useCardNavigation(emit);

const isReady = ref(true);
const textElement = ref<VNodeRef | null>(null);
const parent = ref<VNodeRef | null>(null);
const fontSize = ref(1);

onMounted(() => {
  emit('ready');
  setTimeout(() => {
    adjustFontSize();
  }, 500);
  window.addEventListener('resize', adjustFontSize);
  onUnmounted(() => {
    window.removeEventListener('resize', adjustFontSize);
  });
});

const adjustFontSize = async () => {
  fontSize.value = 1;
  const maxFontSize = 40;
  while (fontSize.value < maxFontSize) {
    fontSize.value++;
    await nextTick();
    if (
      textElement.value.scrollWidth > parent.value.offsetWidth ||
      textElement.value.scrollHeight > parent.value.offsetHeight
    ) {
      break;
    }
  }
  fontSize.value--;
};

defineExpose({
  id: props.card.id,
  isReady,
});
</script>
