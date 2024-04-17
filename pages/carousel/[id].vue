<template>
  <div class="flex items-center justify-center h-screen">
    <div>
      <DuckCarousel :duck="id" />
    </div>
  </div>
</template>

<script setup>
import { useRoute } from "vue-router";

const route = useRoute();
const id = route.params.id;
</script>
