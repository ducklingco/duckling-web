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
          Du er ét klik væk <br />
          fra at gøre en forskel
        </h1>

        <div class="flex flex-col items-center pb-4 pt-24">
          <h4 class="text-3xl font-light">
            Donér over 999 DKK <br />
            og få et livstids premium medlemskab
          </h4>
          <div class="w-fit py-4">
            <div class="flex flex-row space-x-2">
              <div class="w-fit">
                <input
                  v-model="customAmount"
                  :class="`focus:shadow-outline min-w-80 appearance-none rounded border p-3 leading-tight text-gray-700 shadow focus:outline-none`"
                  type="number"
                  min="9"
                  max="999999999999999"
                  placeholder="Please enter amount in Danish Kroner"
                />
                <div
                  v-if="showMinimumAllowableAmount"
                  class="text-left text-sm text-red-500"
                >
                  Minimumbeløbet er 9 DKK
                </div>
              </div>
              <button
                class="bg-duckling_pink px-10 py-2 font-thin text-white hover:bg-duckling_pink/70 focus:outline-none focus:ring-2 focus:ring-duckling_grey focus:ring-opacity-75"
                type="button"
                aria-label="Donér"
                @click="onClickedSupportButton"
              >
                Donér
              </button>
            </div>

            <div
              v-if="customAmount != null && haveClickedDonateButton"
              class="py-12"
            >
              <div>
                <button
                  class="max-w-72 text-ellipsis bg-duckling_pink p-10 font-thin text-white hover:bg-duckling_pink/70 focus:outline-none focus:ring-2 focus:ring-duckling_grey focus:ring-opacity-75"
                  type="button"
                  :aria-label="'Støt Duckling med {{ customAmount ?? 0 }} DKK'"
                  @click="onClickedSupportButton"
                >
                  Støt Duckling med <br />
                  {{ makeNumberIntoPretty(customAmount ?? 0) }}
                  DKK
                </button>
              </div>

              <div class="py-4">
                Vi skal bruge din email for at aktivere dit medlemskab:
              </div>
              <input
                v-model="emailForSupporter"
                :class="`focus:shadow-outline min-w-full appearance-none rounded border p-3 leading-tight text-gray-700 shadow focus:outline-none ${emailInputClass}`"
                type="email"
                placeholder="Indtast din email adresse"
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
                  Send mig nyheder om Duckling
                </label>
              </div>
            </div>
          </div>
        </div>

        <div class="flex h-fit w-full flex-col items-center pt-16">
          <div class="size-96">
            <img src="/assets/img/payment_options_da.png" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const emailForSupporter = ref<string>("");
const wantToReceiveUpdates = ref<boolean>(false);
const haveClickedDonateButton = ref<boolean>(false);
const customAmount = ref<number | null>(null);
const showMinimumAllowableAmount = ref<boolean>(false);

watch(customAmount, (newValue) => {
  if (newValue != null) {
    if (newValue > 999999999999999) {
      customAmount.value = 999999999999999;
    }
    if (newValue.toString().includes(".")) {
      customAmount.value = Math.floor(newValue);
    }
  }
});

const emailInputClass = computed(() => {
  return haveClickedDonateButton.value &&
    !isValidEmailAddress(emailForSupporter.value)
    ? "border-red-500 border-4"
    : "";
});

const onClickedSupportButton = () => {
  if ((customAmount.value ?? 0) < 9) {
    showMinimumAllowableAmount.value = true;
    customAmount.value = 9;
  }
  haveClickedDonateButton.value = true;
};

const makeNumberIntoPretty = (number: number): string => {
  if (number < 1000) return number.toString();

  const wholeNumber = Math.floor(number);
  return wholeNumber
    .toLocaleString("fullwide", { useGrouping: false })
    .split("")
    .reverse()
    .map((e, i) => (i > 0 && i % 3 === 0 ? `${e}.` : e))
    .reverse()
    .join("");
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
