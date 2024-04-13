<template>
  <DucksFilter class="pb-8" />
  <div class="grid grid-cols-1 gap-8 lg:grid-cols-3">
    <DuckCard v-for="duck in 9" :key="duck" />
  </div>
</template>

<script setup lang="ts"></script>
