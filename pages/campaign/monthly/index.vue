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
          You're one click from making a difference
        </h1>

        <div class="pt-16">
          <button
            class="bg-duckling_pink p-10 font-thin text-white hover:bg-duckling_pink/70 focus:outline-none focus:ring-2 focus:ring-duckling_grey focus:ring-opacity-75"
            type="button"
            aria-label="Support duckling with 9 DKK a month"
            @click="onClickedSupportButton"
          >
            Support Duckling with 9 DKK a month
          </button>
        </div>
        <div class="flex items-center justify-center pt-4">
          <label class="min-w-64 cursor-pointer" for="wantToReceiveUpdates">
            Send me news about Duckling
          </label>
          <input
            id="wantToReceiveUpdates"
            v-model="wantToReceiveUpdates"
            type="checkbox"
            name="wantToReceiveUpdates"
            class="form-checkbox h-5 w-5 text-emerald-600 transition duration-150 ease-in-out"
          />
        </div>
        <div v-if="showEmailInput" class="pb-4">
          <br />
          <input
            ref="emailInput"
            v-model="emailForSupporter"
            class="focus:shadow-outline max-w- min-w-48 appearance-none rounded border p-3 leading-tight text-gray-700 shadow focus:outline-none"
            :style="{ width: emailInputWidth }"
            type="email"
            placeholder="Enter your email address"
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

const emailInputWidth = computed(() => {
  const length = emailForSupporter.value.length;
  return `${length + 3}ch`;
});

const showEmailInput = computed(() => {
  return wantToReceiveUpdates.value;
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
  if (wantToReceiveUpdates.value && !isValidEmailAddress.value) {
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
