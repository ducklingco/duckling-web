<template>
  <carousel class="" :autoplay="3000" :items-to-show="1">
    <slide class="" v-for="slide in 10" :key="slide">
      {{ slide }}
    </slide>

    <template #addons>
      <navigation />
      <pagination />
    </template>
  </carousel>
</template>

<script>
// If you are using PurgeCSS, make sure to whitelist the carousel CSS classes
import "vue3-carousel/dist/carousel.css";
import { Carousel, Slide, Pagination, Navigation } from "vue3-carousel";
import { defineComponent } from "vue";

export default defineComponent({
  name: "DuckCarousel",
  components: {
    Carousel,
    Slide,
    Pagination,
    Navigation,
  },
});
</script>
