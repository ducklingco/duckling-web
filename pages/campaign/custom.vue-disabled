<!-- eslint-disable vue/html-self-closing -->
<template>
  <div>
    <div class="flex flex-col items-center pt-6">
      <div class="size-20">
        <img src="/assets/img/duckling_logo_text_under.png" />
      </div>
    </div>
    <div v-if="lang !== null" class="flex h-full justify-center pt-16">
      <div class="w-84 items-center p-4 text-center align-middle">
        <h1
          v-if="
            !paymentType || (customAmount ?? 0) < amountForLifetimeMembership
          "
          class="text-7xl font-semibold"
        >
          {{ lang === "en" ? "You're one click away" : "Du er ét klik væk"
          }}<br />
          {{
            lang === "en"
              ? "from making a difference"
              : "fra at gøre en forskel"
          }}
        </h1>
        <h1 v-else class="text-7xl font-semibold">
          {{ lang === "en" ? "Thank you so much!" : "Tusinde tak!" }}<br />
          {{
            lang === "en"
              ? "We added a special gift..."
              : "Vi har tilføjet en særlig gave..."
          }}
        </h1>

        <div class="flex flex-col items-center pt-24">
          <h4
            v-if="
              !paymentType || (customAmount ?? 0) < amountForLifetimeMembership
            "
            class="text-3xl font-light"
          >
            {{
              lang === "en"
                ? `Donate over ${amountForLifetimeMembership} $ and get a`
                : `Donér over ${amountForLifetimeMembership} DKK og få et`
            }}<br />
            {{
              lang === "en"
                ? "lifetime premium membership"
                : "livstids premium medlemskab"
            }}
          </h4>
          <h4 v-else class="text-3xl font-light">
            {{
              lang === "en"
                ? "Because of your generous donation, we'd like to offer a"
                : "På grund af din generøse donation, vil vi gerne tilbyde dig et"
            }}<br />
            {{
              lang === "en"
                ? "lifetime membership as a bonus. Enter email and activate:"
                : "livstids medlemskab som en bonus. Indtast email og aktiver:"
            }}
          </h4>
          <div class="w-fit py-4">
            <div v-if="!paymentType" class="flex flex-col space-y-2">
              <div class="w-96">
                <input
                  v-model="customAmount"
                  :class="`focus:shadow-outline min-w-full appearance-none rounded border p-3 leading-tight text-gray-700 shadow focus:outline-none`"
                  type="number"
                  :min="minimumAmount"
                  max="999999999999999"
                  :placeholder="
                    lang === 'en'
                      ? 'Please enter amount in USD'
                      : 'Indtast venligst beløb i DKK'
                  "
                />
                <div
                  v-if="showMinimumAllowableAmount"
                  class="pl-2 text-left text-sm text-red-500"
                >
                  {{
                    lang === "en"
                      ? `The minimum amount is ${minimumAmount} $`
                      : `Minimumbeløbet er ${minimumAmount} DKK`
                  }}
                </div>
                <div class="flex w-fit items-center pt-2">
                  <input
                    id="haveReadLegalTerms"
                    v-model="haveReadLegalTerms"
                    type="checkbox"
                    name="haveReadLegalTerms"
                    class="peer hidden"
                  />
                  <div
                    class="flex size-4 min-h-4 min-w-4 cursor-pointer rounded-sm border-2 border-black"
                    tabindex="0"
                    @click="haveReadLegalTerms = !haveReadLegalTerms"
                    @keydown.enter="haveReadLegalTerms = !haveReadLegalTerms"
                  >
                    <svg
                      v-if="haveReadLegalTerms"
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
                    class="cursor-pointer pl-2 pr-1 text-lg"
                    for="haveReadLegalTerms"
                  >
                    {{
                      lang === "en"
                        ? "Please agree to our"
                        : "Venligst accepter vores"
                    }}
                  </label>

                  <a
                    href="https://duckling.co/donation-terms"
                    target="_blank"
                    class="text-lg underline"
                    >{{ lang === "en" ? "legal terms" : "juridiske vilkår" }}</a
                  >
                </div>
              </div>
              <div class="flex justify-stretch space-x-6">
                <button
                  class="flex-1 border-2 border-duckling_pink bg-transparent py-2 font-thin text-duckling_pink hover:bg-duckling_pink/10 focus:outline-none focus:ring-2 focus:ring-duckling_grey focus:ring-opacity-75"
                  type="button"
                  aria-label="Donate"
                  @click="onClickedOneTimeSupportDonationButton"
                >
                  {{ lang === "en" ? "One time" : "Engangs" }}
                </button>
                <button
                  class="flex-1 bg-duckling_pink py-2 font-thin text-white hover:bg-duckling_pink/70 focus:outline-none focus:ring-2 focus:ring-duckling_grey focus:ring-opacity-75"
                  type="button"
                  aria-label="Donate"
                  @click="onClickRecurringSupportDonationButton"
                >
                  {{ lang === "en" ? "Every month" : "Hver måned" }}
                </button>
              </div>
            </div>

            <div
              v-if="
                paymentType &&
                customAmount !== null &&
                customAmount >= minimumAmount
              "
            >
              <div class="flex flex-col space-y-2">
                <div class="w-96">
                  <input
                    v-if="
                      customAmount >= amountForLifetimeMembership ||
                      wantToReceiveUpdates
                    "
                    v-model="emailForSupporter"
                    :class="`focus:shadow-outline min-w-full appearance-none rounded border p-3 leading-tight text-gray-700 shadow focus:outline-none ${emailInputClass}`"
                    type="email"
                    :placeholder="
                      lang === 'en'
                        ? 'Please enter your email address'
                        : 'Indtast venligst din email adresse'
                    "
                  />
                  <div class="flex w-fit items-center pt-2">
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
                      @keydown.enter="
                        wantToReceiveUpdates = !wantToReceiveUpdates
                      "
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
                      {{
                        lang === "en"
                          ? "Also send me news about Duckling"
                          : "Send mig nyheder om Duckling"
                      }}
                    </label>
                  </div>
                </div>
                <div
                  v-if="(customAmount ?? 0) >= amountForLifetimeMembership"
                  class="flex justify-stretch space-x-6 pt-6"
                >
                  <button
                    class="flex-1 border-2 border-black bg-transparent py-2 font-thin text-black hover:bg-duckling_pink/10 focus:outline-none focus:ring-2 focus:ring-duckling_grey focus:ring-opacity-75"
                    type="button"
                    aria-label="Donate"
                    @click="onClickFinalizeDonationButton(false)"
                  >
                    {{ lang === "en" ? "No thanks" : "Nej tak" }}
                  </button>
                  <button
                    class="flex-1 bg-duckling_pink py-2 font-thin text-white hover:bg-duckling_pink/70 focus:outline-none focus:ring-2 focus:ring-duckling_grey focus:ring-opacity-75"
                    type="button"
                    aria-label="Donate"
                    @click="onClickFinalizeDonationButton(true)"
                  >
                    <p class="-mb-2">
                      {{ lang === "en" ? "Activate," : "Aktivér" }}
                    </p>
                    <p class="-mt-2">
                      {{ lang === "en" ? "and pay" : "og betal" }}
                    </p>
                  </button>
                </div>
                <div v-else class="flex justify-center space-x-6 pt-2">
                  <button
                    class="min-w-24 bg-duckling_pink px-10 py-4 font-thin text-white hover:bg-duckling_pink/70 focus:outline-none focus:ring-2 focus:ring-duckling_grey focus:ring-opacity-75"
                    type="button"
                    aria-label="Donate"
                    @click="onClickFinalizeDonationButton(false)"
                  >
                    {{ lang === "en" ? "Donate" : "Donér" }}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="flex h-fit w-full flex-col items-center pt-16">
          <div class="size-96">
            <img v-if="lang === 'en'" src="/assets/img/payment_options.png" />
            <img
              v-else-if="lang === 'da'"
              src="/assets/img/payment_options_da.png"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { PaymentCreateBody, PaymentUrlObject } from "@/types/Payment";

const emailForSupporter = ref<string>("");
const wantToReceiveUpdates = ref<boolean>(false);
const customAmount = ref<number | null>(null);
const showMinimumAllowableAmount = ref<boolean>(false);
const paymentType = ref<"custom_once" | "custom_recurring" | null>(null);
const lang = ref<("en" | "da") | null>(null);
const route = useRoute();
const haveClickedDonateButton = ref<boolean>(false);
const userWantsMembership = ref<boolean>(false);
const haveReadLegalTerms = ref<boolean>(false);

const emailInputClass = computed(() => {
  return paymentType.value !== null &&
    !isValidEmailAddress(emailForSupporter.value) &&
    (wantToReceiveUpdates.value || userWantsMembership.value) &&
    haveClickedDonateButton.value
    ? "border-red-500 border-4"
    : "";
});

const minimumAmount = computed(() => {
  return lang.value === "en" ? 1.99 : 9;
});

const amountForLifetimeMembership = computed(() => {
  return lang.value === "en" ? 149 : 999;
});

const onClickedOneTimeSupportDonationButton = () => {
  if (haveReadLegalTerms.value === false) {
    alert(
      lang.value === "en"
        ? "Please agree to our legal terms"
        : "Venligst accepter vores juridiske vilkår",
    );
    return;
  }
  if ((customAmount.value ?? 0) < minimumAmount.value) {
    showMinimumAllowableAmount.value = true;
    customAmount.value = minimumAmount.value;
  } else {
    paymentType.value = "custom_once";
  }
};

const onClickRecurringSupportDonationButton = () => {
  if (haveReadLegalTerms.value === false) {
    alert(
      lang.value === "en"
        ? "Please agree to our legal terms"
        : "Venligst accepter vores juridiske vilkår",
    );
    return;
  }
  if ((customAmount.value ?? 0) < minimumAmount.value) {
    showMinimumAllowableAmount.value = true;
    customAmount.value = lang.value === "en" ? 1.99 : 9;
  } else {
    paymentType.value = "custom_recurring";
  }
};

const onClickFinalizeDonationButton = async (wantsMembership: boolean) => {
  userWantsMembership.value = wantsMembership;
  haveClickedDonateButton.value = true;

  if (
    haveClickedDonateButton.value &&
    !isValidEmailAddress(emailForSupporter.value) &&
    wantsMembership
  ) {
    return;
  }
  if (
    customAmount.value !== null &&
    customAmount?.value >= minimumAmount.value &&
    paymentType.value
  ) {
    /*  const body: PaymentCreateBody = {
      amount: customAmount.value,
      lang: lang.value ?? "en",
      type: paymentType.value,
      email: emailForSupporter.value,
      wantsToReceiveUpdates: wantToReceiveUpdates.value,
      wantsLifetimePremium: wantsMembership,
      recurring: paymentType.value === "custom_recurring",
    };

    try {
      const paymentUrlObject = await $fetch<PaymentUrlObject>(
        "/api/payment/create",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        },
      );
      if (paymentUrlObject?.url) {
        window.open(paymentUrlObject?.url, "_self");
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong. Please try again later.");
    } */
  }
};

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

onMounted(() => {
  route.query.lang === "da" ? (lang.value = "da") : (lang.value = "en");
});
</script>

<style scoped>
.custom-amount-input {
  width: 100%;
}

* {
  font-family: "Newsreader";
}
</style>
