<template>
  <div class="flex justify-center items-center h-screen">
    <div class="w-[400px] h-[300px]">
      <DuckCarousel :duck="id" />
    </div>
  </div>
</template>

<script setup>
import { useRoute } from "vue-router";

const route = useRoute();
const id = route.params.id;
</script>
