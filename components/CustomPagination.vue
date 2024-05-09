<template>
  <ol class="w-full mt-0 carousel__pagination">
    <div v-for="slide in maxSlide + 1" :key="slide" class="carousel__pagination-item">
      <div
type="button" class="rounded-full carousel__pagination-button hover:bg-duckling_red"
        :class="{ 'carousel__pagination-button--active': isActive(slide - 1), 'dark': dark }"
        :aria-label="`Navigate to slide ${slide + 1}`" @click="slideTo(slide - 1)" />
    </div>
  </ol>
</template>

<script>
import { ref, inject } from "vue";

function mapNumberToRange ({ val, max, min = 0 }) {
  if (val > max) {
    return mapNumberToRange({ val: val - (max + 1), max, min });
  }
  if (val < min) {
    return mapNumberToRange({ val: val + (max + 1), max, min });
  }
  return val;
}

export default {
  name: "CustomPagination",
  props: {
    dark: {
      type: Boolean,
      default: false,
    },
  },
  setup () {
    const maxSlide = inject("maxSlide", ref(1));
    const minSlide = inject("minSlide", ref(1));
    const currentSlide = inject("currentSlide", ref(1));
    const nav = inject("nav", {});

    const isActive = (slide) =>
      mapNumberToRange({
        val: currentSlide.value,
        max: maxSlide.value,
        min: 0,
      }) === slide;

    const slideTo = (slide) => nav.slideTo(slide);

    return {
      minSlide,
      maxSlide,
      isActive,
      slideTo,
    };
  },
};
</script>

<style scoped>
.carousel__pagination {
  display: flex;
  justify-content: center;
  margin-top: 0;
  gap: 5px;
}

.carousel__pagination-item {
  width: 100%;
  height: 5px;
}

.carousel__pagination-button {
  width: 100%;
  padding: 0;
  background-color: theme("colors.duckling_white");
  opacity: 80%;
}

.carousel__pagination-button.dark {
  background-color: theme("colors.duckling_black");
}

.carousel__pagination-button:hover {
  background-color: theme("colors.duckling_red");
}

.carousel__pagination-button--active,
.carousel__pagination-button--active.dark {
  background-color: theme("colors.duckling_red");
}

.carousel__pagination-button::after {
  background-color: theme("colors.duckling_white");
  border-radius: 9999px;
}

.carousel__pagination-button.dark::after {
  background-color: theme("colors.duckling_black");
}

.carousel__pagination-button--active::after,
.carousel__pagination-button--active.dark::after {
  background-color: theme("colors.duckling_red");
}

.carousel__pagination-button:hover::after {
  background-color: theme("colors.duckling_red");
}
</style>