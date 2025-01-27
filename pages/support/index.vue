<!-- eslint-disable vue/html-self-closing -->
<template>
  <div class="absolute h-full w-full bg-duckling_beige">
    <div class="flex h-full items-center justify-center">
      <div
        class="w-1/2 items-center rounded-lg border-2 border-duckling_green p-4 text-center align-middle"
      >
        <div class="pb-2 text-lg font-bold underline underline-offset-8">
          Support our mission
        </div>
        <div class="p-2">
          We're committed to protecting your privacy by keeping ads off our
          platform.
          <br />
          Ads often mean tracking and data collection—we want none of that.
          <br />
          <br />
          Your small donation helps us stay free and secure for everyone,
          without compromising your data.
          <br />
          Join us in building a safer, ad-free space. Every contribution makes a
          difference!
          <br />
          Together, we can keep this platform focused on what matters—you. Every
          little bit helps!
        </div>
        <div class="flex flex-row space-x-1">
          <div class="flex-1 rounded-lg border-2 border-duckling_green p-2">
            <div class="py-2">
              <div class="font-bold">Monthly Support:</div>
              Just 9 DKK/month helps keep us running.
            </div>
            <button
              class="rounded-lg bg-emerald-500 px-4 py-2 font-semibold text-duckling_white shadow-md hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-opacity-75"
              type="button"
              aria-label="Join the mission for 9 DKK/month"
            >
              Join the mission for 9 DKK/month
            </button>
          </div>
          <div class="flex-1 rounded-lg border-2 border-duckling_green p-2">
            <div class="py-2">
              <div class="font-bold">Lifetime Premium Membership:</div>
              With a one-time payment of 999 DKK, you'll get all future premium
              features for life—an exclusive thank-you for early supporters.
            </div>
            <button
              class="rounded-lg bg-emerald-500 px-4 py-2 font-semibold text-duckling_white shadow-md hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-opacity-75"
              type="button"
              aria-label="Become a lifetime supporter for 999 DKK"
              @click="askForLifeTimeSupporterEmail = true"
            >
              Become a lifetime supporter for 999 DKK
            </button>
            <div v-if="askForLifeTimeSupporterEmail" class="py-1">
              Please enter your email address so that we can contact you once
              the premium features go live:
              <br />
              <input
                ref="emailInput"
                v-model="emailForLifetimeSupporter"
                class="focus:shadow-outline min-w-48 max-w-64 appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
                :style="{ width: emailInputWidth }"
                type="email"
              />
              <br />
              <div v-if="isValidEmailAddress" class="pt-2">
                <button
                  class="rounded-lg bg-emerald-500 px-4 py-2 font-semibold text-duckling_white shadow-md hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-opacity-75"
                  type="button"
                  aria-label="Become a lifetime supporter for 999 DKK"
                >
                  Continue
                </button>
              </div>
            </div>
          </div>
          <div class="flex-1 rounded-lg border-2 border-duckling_green p-2">
            <div class="py-2">
              <div class="font-bold">Custom amount:</div>
              Support us with a custom amount of your choice. And decide if you
              want it to be monthly or a one-time donation.
            </div>
            <button
              class="rounded-lg bg-emerald-500 px-4 py-2 font-semibold text-duckling_white shadow-md hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-opacity-75"
              type="button"
              aria-label="Support with a custom amount"
              @click="showCustomAmount = true"
            >
              Support with a custom amount
            </button>
            <br />
            <div v-if="showCustomAmount" class="py-2">
              <input
                id="custom-amount-input"
                v-model="customAmount"
                class="focus:shadow-outline min-w-48 max-w-4xl appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
                type="number"
                min="9"
                placeholder="Enter custom amount"
              />
              <span>{{ ` DKK` }}</span> <br />
              <div class="flex items-center justify-center py-1">
                <input
                  id="custom-amount-monthly-input"
                  v-model="isCustomAmountMonthly"
                  type="checkbox"
                  name="monthly"
                  class="form-checkbox h-5 w-5 text-emerald-600 transition duration-150 ease-in-out"
                />
                <label for="custom-amount-monthly-input" class="pl-2">
                  Make this a monthly contribution
                </label>
              </div>
              <button
                class="rounded-lg bg-emerald-500 px-4 py-2 font-semibold text-duckling_white shadow-md hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-opacity-75"
                type="button"
                aria-label="Become a lifetime supporter for 999 DKK"
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const askForLifeTimeSupporterEmail = ref<boolean>(false);
const emailForLifetimeSupporter = ref<string>("");
const emailInput = ref<HTMLInputElement | null>(null);
const showCustomAmount = ref<boolean>(false);
const customAmount = ref<number>(9);
const isCustomAmountMonthly = ref<boolean>(false);

const emailInputWidth = computed(() => {
  const length = emailForLifetimeSupporter.value.length;
  return `${length + 3}ch`;
});

const isValidEmailAddress = computed(() => {
  const email = emailForLifetimeSupporter.value;
  return (
    email.length > 0 &&
    email.includes("@") &&
    email.includes(".") &&
    email.replaceAll("@", "").replaceAll(".", "").length > 0 &&
    email.split("@")[0].length > 0 &&
    email.split("@")[1].split(".")[0].length > 0
  );
});
</script>

<style scoped>
.custom-amount-input {
  width: 100%;
}
</style>
