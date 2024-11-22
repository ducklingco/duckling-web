<template>
  <div>
    <ClientOnly> <BrowserCheck /> </ClientOnly>
    <NuxtLayout />
  </div>
</template>

<script setup lang="ts">
import BrowserCheck from "./components/BrowserCheck.vue";
</script>
