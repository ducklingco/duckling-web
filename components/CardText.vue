<template>
  <div class="flex items-center justify-center w-full h-full bg-duckling_beige ">
    <div class="w-full px-4 font-bold leading-tight text-left xs:px-0 xs:w-3/4 text lg:w-3/4 2xl:max-w-screen-lg"
      :class="fontSizeObj">
      {{ text }}
    </div>
  </div>
  <card-click-areas @prev="onClickPrev" @next="onClickNext" />
</template>

<script setup>
import { defineProps } from 'vue';
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
  console.log(props?.card)
  return props?.card?.cardable?.content
});

const fontSize = computed(() => {
  // Typically around 30px
  return props?.card?.cardable?.font_size || 30;
});

// Tailwind breakpoints:
// sm	640px @media(min - width: 640px) { ... }
// md	768px @media(min - width: 768px) { ... }
// lg	1024px @media(min - width: 1024px) { ... }
// xl	1280px @media(min - width: 1280px) { ... }
// 2xl	1536px @media(min - width: 1536px) { ... }

const intervalMap = [
  { size: 12, class: 'text-xs' },
  { size: 14, class: 'text-sm' },
  { size: 16, class: 'text-base' },
  { size: 18, class: 'text-lg' },
  { size: 20, class: 'text-xl' },
  { size: 24, class: 'text-2xl' },
  { size: 30, class: 'text-3xl' },
  { size: 36, class: 'text-4xl' },
  { size: 48, class: 'text-5xl' },
  { size: 60, class: 'text-6xl' },
  { size: 72, class: 'text-7xl' },
  { size: 96, class: 'text-8xl' },
  { size: Infinity, class: 'text-9xl' },
];
// Tailwind needs this list in order to generate the correct text size classes for each breakpoint
const classes = ["sm:text-xs", "sm:text-sm", "sm:text-base", "sm:text-lg", "sm:text-xl", "sm:text-2xl", "sm:text-3xl", "sm:text-4xl", "sm:text-5xl", "sm:text-6xl", "sm:text-7xl", "sm:text-8xl", "sm:text-9xl", "md:text-xs", "md:text-sm", "md:text-base", "md:text-lg", "md:text-xl", "md:text-2xl", "md:text-3xl", "md:text-4xl", "md:text-5xl", "md:text-6xl", "md:text-7xl", "md:text-8xl", "md:text-9xl", "lg:text-xs", "lg:text-sm", "lg:text-base", "lg:text-lg", "lg:text-xl", "lg:text-2xl", "lg:text-3xl", "lg:text-4xl", "lg:text-5xl", "lg:text-6xl", "lg:text-7xl", "lg:text-8xl", "lg:text-9xl", "xl:text-xs", "xl:text-sm", "xl:text-base", "xl:text-lg", "xl:text-xl", "xl:text-2xl", "xl:text-3xl", "xl:text-4xl", "xl:text-5xl", "xl:text-6xl", "xl:text-7xl", "xl:text-8xl", "xl:text-9xl", "2xl:text-xs", "2xl:text-sm", "2xl:text-base", "2xl:text-lg", "2xl:text-xl", "2xl:text-2xl", "2xl:text-3xl", "2xl:text-4xl", "2xl:text-5xl", "2xl:text-6xl", "2xl:text-7xl", "2xl:text-8xl", "2xl:text-9xl"]

const breakpointToScale = {
  '': 1.4, // Default scale is 1
  'sm:': 2,
  'md:': 2.2,
  'lg:': 2.2,
  'xl:': 2.4,
  '2xl:': 2.4,
};
// Translate fontSize to tailwind text size text-sm, text-lg, etc.
const textSizeClass = (fontSize, breakpoint = '') => {
  const scale = breakpointToScale[breakpoint];
  const scaledFontSize = fontSize * scale
  const sizeClass = intervalMap.find((interval) => interval.size > scaledFontSize).class;
  return sizeClass
};


const fontSizeObj = computed(() => {
  const toReturn = {};
  // Iterate over breakpoints and add text size class
  for (const breakpoint in breakpointToScale) {
    const className = `${breakpoint}${textSizeClass(fontSize.value, breakpoint)}`;
    toReturn[className] = true;
  }
  return toReturn;
});

</script>
<!-- w-3/4 font-bold leading-tight text-left text lg:w-1/2 text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-8xl 2xl:text-9xl -->