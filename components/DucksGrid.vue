<template>
  <DucksFilter class="pb-8" />
  <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 xl:grid-cols-3">
    <DuckCard v-for="duck in 10" :key="duck" :duck="duck" />
  </div>
</template>

<script setup lang="ts"></script>
