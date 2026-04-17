<template>
  <div>
    <div class="fixed h-full w-full bg-duckling_beige" />
    <div class="container relative mx-auto px-4 pb-4 pt-8 md:pb-8 md:pt-14">
      <OverviewHeader class="pb-4 md:pb-10" />
      <DucksGrid />
    </div>
  </div>
</template>

<script setup lang="ts">
useSeoMeta({
  title: 'Stories - Duckling — Free your story',
  ogTitle: 'Stories - Duckling — Free your story',
  description: 'Duckling is a home for real stories, shared by real people. Explore different perspectives and share your own.',
  ogDescription: 'Duckling is a home for real stories, shared by real people. Explore different perspectives and share your own.',
  ogImage: 'https://web.duckling.co/assets/img/linkpreview.png',
  ogUrl: 'https://web.duckling.co',
  ogType: 'website',
  ogSiteName: 'Duckling',
  twitterCard: 'summary_large_image',
});
</script>
