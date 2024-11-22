<template>
  <div v-if="showWarning" class="browser-warning">
    <p>{{ warningMessage }}</p>
  </div>
</template>

<script setup lang="ts">
const showWarning = ref(false);
const warningMessage = ref("");

onMounted(() => {
  const userAgent = navigator.userAgent.toLowerCase();
  if (userAgent.includes("safari") && !userAgent.includes("chrome")) {
    showWarning.value = true;
    warningMessage.value =
      "Safari currently wont show videos. Please use a different browser for the full experience.";
  } else if (userAgent.includes("duckduckgo")) {
    showWarning.value = true;
    warningMessage.value =
      "DuckDuckGo browser currently wont show videos. Please use a different browser for the full experience.";
  }
});
</script>

<style scoped>
.browser-warning {
  background-color: #fff3cd;
  color: #856404;
  padding: 10px;
  text-align: center;
  font-weight: bold;
}
</style>
