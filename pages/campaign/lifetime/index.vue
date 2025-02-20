<!-- eslint-disable vue/html-self-closing -->
<template>
  <div class="absolute h-full w-full bg-duckling_beige">
    <div class="flex flex-col items-center pt-6">
      <div class="size-20">
        <img src="/assets/img/duckling_logo_text_under.png" />
      </div>
    </div>
    <div class="flex h-full justify-center pt-16">
      <div class="w-3/4 items-center p-4 text-center align-middle">
        <h1 class="text-7xl font-semibold">
          You're one click away <br />
          from making a difference
        </h1>

        <div class="pt-16">
          <button
            class="bg-duckling_pink p-10 font-thin text-white hover:bg-duckling_pink/70 focus:outline-none focus:ring-2 focus:ring-duckling_grey focus:ring-opacity-75"
            type="button"
            aria-label="Support duckling with 9 DKK a month"
            @click="onClickedSupportButton"
          >
            Support Duckling with 999 DKK
          </button>
        </div>
        <div class="flex items-center justify-center pt-4">
          <input
            id="wantToReceiveUpdates"
            v-model="wantToReceiveUpdates"
            type="checkbox"
            name="wantToReceiveUpdates"
            class="peer hidden"
          />
          <div
            class="flex h-5 w-5 cursor-pointer rounded-sm border-2 border-black"
            @click="wantToReceiveUpdates = !wantToReceiveUpdates"
          >
            <svg
              v-if="wantToReceiveUpdates"
              class="pointer-events-none h-5 w-5 self-center"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="4"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
          </div>
          <label class="min-w-64 cursor-pointer" for="wantToReceiveUpdates">
            Also send me news about Duckling
          </label>
        </div>
        <div class="pb-4">
          <br />
          <div>We need your email to give you a lifetime premium account</div>
          <input
            ref="emailInput"
            v-model="emailForSupporter"
            class="focus:shadow-outline max-w- min-w-48 appearance-none rounded border p-3 leading-tight text-gray-700 shadow focus:outline-none"
            :style="{ width: emailInputWidth }"
            type="email"
            placeholder="Enter your email address"
          />
        </div>
        <div class="flex items-center justify-center">
          <label class="min-w-80 cursor-pointer" for="doNotWantLifetimePremium">
            I don't want a lifetime premium account
          </label>
          <input
            id="doNotWantLifetimePremium"
            v-model="doNotWantLifetimePremium"
            type="checkbox"
            name="wantToReceiveUpdates"
            class="h-5 w-5 text-duckling_beige"
          />
        </div>
        <div class="flex h-fit w-full flex-col items-center pt-16">
          <div class="size-96">
            <img src="/assets/img/payment_options.png" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const emailForSupporter = ref<string>("");
const emailInput = ref<HTMLInputElement | null>(null);
const wantToReceiveUpdates = ref<boolean>(false);
const doNotWantLifetimePremium = ref<boolean>(false);

const emailInputWidth = computed(() => {
  const length = emailForSupporter.value.length;
  return `${length + 3}ch`;
});

const isValidEmailAddress = computed(() => {
  const email = emailForSupporter.value;
  return (
    email.length > 0 &&
    email.includes("@") &&
    email.includes(".") &&
    email.replaceAll("@", "").replaceAll(".", "").length > 0 &&
    email.split("@")[0].length > 0 &&
    email.split("@")[1].split(".")[0].length > 0 &&
    email.split("@")[1].split(".")[1].length > 0
  );
});

const onClickedSupportButton = () => {
  if (
    (wantToReceiveUpdates.value && !isValidEmailAddress.value) ||
    !doNotWantLifetimePremium.value
  ) {
    alert("Please enter a valid email address.");
  }
};
</script>

<style scoped>
.custom-amount-input {
  width: 100%;
}

* {
  font-family: "Newsreader";
}
</style>
