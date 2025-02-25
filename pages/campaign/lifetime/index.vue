<!-- eslint-disable vue/html-self-closing -->
<template>
  <div>
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

        <div class="py-12">
          <button
            :class="[
              !isValidEmailAddress
                ? 'cursor-not-allowed bg-duckling_pink/40 p-10 font-thin text-white focus:outline-none'
                : 'bg-duckling_pink p-10 font-thin text-white hover:bg-duckling_pink/70 focus:outline-none focus:ring-2 focus:ring-duckling_grey focus:ring-opacity-75',
            ]"
            type="button"
            aria-label="Support duckling with 149 $"
            @click="onClickedSupportButton"
          >
            Support Duckling with 149 $
          </button>
        </div>

        <div class="flex flex-col items-center pb-4">
          <br />
          <div class="w-fit">
            <div class="pb-4">
              We need your email to activate your membership:
            </div>
            <input
              v-model="emailForSupporter"
              :class="`focus:shadow-outline min-w-full appearance-none rounded border p-3 leading-tight text-gray-700 shadow focus:outline-none ${emailInputClass}`"
              type="email"
              placeholder="Enter your email address"
            />
            <div class="flex w-fit items-center pt-4">
              <input
                id="wantToReceiveUpdates"
                v-model="wantToReceiveUpdates"
                type="checkbox"
                name="wantToReceiveUpdates"
                class="peer hidden"
              />
              <div
                class="flex size-4 min-h-4 min-w-4 cursor-pointer rounded-sm border-2 border-black"
                tabindex="0"
                @click="wantToReceiveUpdates = !wantToReceiveUpdates"
                @keydown.enter="wantToReceiveUpdates = !wantToReceiveUpdates"
              >
                <svg
                  v-if="wantToReceiveUpdates"
                  class="pointer-events-none"
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
              <label
                class="cursor-pointer pl-2 text-lg"
                for="wantToReceiveUpdates"
              >
                Also send me news about Duckling
              </label>
            </div>
          </div>
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
const wantToReceiveUpdates = ref<boolean>(false);
const haveClickedSupportButton = ref<boolean>(false);

const emailInputClass = computed(() => {
  return haveClickedSupportButton.value &&
    !isValidEmailAddress(emailForSupporter.value)
    ? "border-red-500 border-4"
    : "";
});

const onClickedSupportButton = () => {
  haveClickedSupportButton.value = true;
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
