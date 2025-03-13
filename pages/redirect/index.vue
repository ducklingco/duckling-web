<!-- eslint-disable vue/html-self-closing -->
<template>
  <div>
    <div class="flex flex-col items-center pt-6">
      <div v-if="!redirected">
        <div class="size-20">
          <img
            src="/assets/img/duckling_logo_text_under.png"
            alt="Duckling Logo"
          />
        </div>
      </div>
      <h1 class="py-4 text-2xl font-bold">
        Redirecting you to download Duckling...
      </h1>

      <div
        class="h-8 w-8 animate-spin rounded-full border-t-4 border-solid border-duckling_grey"
      />

      <div class="flex flex-col items-center pt-8">
        <p class="pb-4">
          If you're not redirected automatically, please select your platform:
        </p>
        <div class="flex justify-center gap-4 pt-4">
          <a :href="appStoreUrl" class="inline-block">
            <img
              src="/assets/img/app_store.png"
              alt="App Store"
              class="h-20 w-auto object-contain"
            />
          </a>
          <a :href="playStoreUrl" class="inline-block">
            <img
              src="/assets/img/play_store.png"
              alt="Google Play"
              class="h-20 w-auto object-contain"
            />
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const redirected = ref(false);
const appStoreUrl = "https://apps.apple.com/dk/app/duckling/id6470526101";
const playStoreUrl =
  "https://play.google.com/store/apps/details?id=co.duckling.Duckling";

interface WindowWithVendorProperties extends Window {
  opera?: unknown;
  MSStream?: unknown;
}

onMounted(() => {
  detectDeviceAndRedirect();
});

const detectDeviceAndRedirect = () => {
  const windowWithVendor = window as WindowWithVendorProperties;
  const userAgent = String(
    navigator.userAgent || navigator.vendor || windowWithVendor.opera || "",
  );

  // iOS detection
  if (/iPad|iPhone|iPod/.test(userAgent) && !windowWithVendor.MSStream) {
    redirectToStore(appStoreUrl);
  }
  // Android detection
  else if (/android/i.test(userAgent)) {
    redirectToStore(playStoreUrl);
  }
};

const redirectToStore = (url: string) => {
  redirected.value = true;
  window.location.href = url;
};
</script>
