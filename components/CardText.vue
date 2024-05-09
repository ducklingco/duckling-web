<template>
  <div class="w-full h-full py-20 sm:py-30 md:py-40 lg:py-40 bg-duckling_beige">
    <div ref="parent" class="flex items-center justify-center w-full h-full">
      <div
ref="textElement"
        class="w-full px-4 font-bold leading-tight text-left xs:px-0 xs:w-3/4 text lg:w-3/4 2xl:max-w-screen-lg"
        :style="{ fontSize: `${fontSize}px` }">
        {{ text }}
      </div>
    </div>
  </div>
  <card-click-areas @prev="onClickPrev" @next="onClickNext" />
</template>

<script setup>
import useCardNavigation from '@/composables/useCardNavigation';

const props = defineProps({
  card: {
    type: Object,
    required: true
  }
});

const emit = defineEmits(['prev', 'next']);
const { onClickPrev, onClickNext, CardClickAreas } = useCardNavigation(emit);

const text = computed(() => {
  return props?.card?.cardable?.content
});

const textElement = ref(null);
const parent = ref(null);
const fontSize = ref(1); // Start with a small font size

onMounted(() => {
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
  const maxFontSize = 500; // Set a maximum limit for the font size

  // Increase font size until the text no longer fits or the maximum limit is reached
  while (fontSize.value < maxFontSize) {
    fontSize.value++;
    await nextTick();

    if (textElement.value.offsetWidth > parent.value.offsetWidth || textElement.value.offsetHeight > parent.value.offsetHeight) {
      break;
    }
  }

  // Decrease font size by one step to ensure the text fits
  fontSize.value--;
};

</script>
