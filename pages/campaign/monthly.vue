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
        <h1 class="text-7xl font-semibold">
          {{ lang === "en" ? "You're one click away" : "Du er ét klik væk"
          }}<br />
          {{
            lang === "en"
              ? "from making a difference"
              : "fra at gøre en forskel"
          }}
        </h1>

        <h4 class="pt-4 text-xl">
          <div class="flex flex-row items-center justify-center">
            <p class="pr-1 font-bold">
              {{ lang === "en" ? "What you get:" : "Hvad du får:" }}
            </p>
            {{
              lang === "en"
                ? "Membership of Duckling Academy, a learning space where we teach topics like"
                : "Medlemskab af Duckling Academy, et læringsrum hvor vi underviser i emner som"
            }}
          </div>
          <div class="flex flex-row items-center justify-center">
            {{
              lang === "en"
                ? "storytelling, democratic skills and digital literacy - and provide a balanced worldview"
                : "storytelling, demokratiske færdigheder og digital dannelse - og giver et afbalanceret verdensbillede"
            }}
          </div>
          <div class="flex flex-row items-center justify-center">
            {{
              lang === "en"
                ? "through knowledge and stories. Launching in 2025."
                : "gennem viden og historier. Lancering i 2025."
            }}
          </div>
        </h4>

        <div class="py-12">
          <button
            class="bg-duckling_pink p-10 font-thin text-white hover:bg-duckling_pink/70 focus:outline-none focus:ring-2 focus:ring-duckling_grey focus:ring-opacity-75"
            type="button"
            :aria-label="
              lang === 'en'
                ? `Support duckling with $${monthlyAmount} / month`
                : `Støt Duckling med ${monthlyAmount} DKK om måneden`
            "
            @click="onClickedSupportButton"
          >
            {{
              lang === "en"
                ? `Support Duckling with $${monthlyAmount} / month`
                : `Støt Duckling med ${monthlyAmount} DKK om måneden`
            }}
          </button>
        </div>

        <div class="flex flex-col items-center pb-4">
          <br />
          <div class="w-fit">
            <div class="pb-4">
              {{
                lang === "en"
                  ? "We need your email to activate your membership:"
                  : "Vi skal bruge din email for at aktivere dit medlemskab:"
              }}
            </div>
            <input
              v-model="emailForSupporter"
              :class="`focus:shadow-outline min-w-full appearance-none rounded border p-3 leading-tight text-gray-700 shadow focus:outline-none ${emailInputClass}`"
              type="email"
              :placeholder="
                lang === 'en'
                  ? 'Enter your email address'
                  : 'Indtast din email adresse'
              "
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
                {{
                  lang === "en"
                    ? "Also send me news about Duckling"
                    : "Send mig nyheder om Duckling"
                }}
              </label>
            </div>
            <div class="flex w-fit items-center">
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
                :href="`https://www.duckling.co/${lang === 'en' ? 'purchases' : 'handelsbetingelser'}`"
                target="_blank"
                class="text-lg underline"
                >{{ lang === "en" ? "legal terms" : "juridiske vilkår" }}</a
              >
            </div>
          </div>
        </div>
        <div class="flex h-fit w-full flex-col items-center pt-8">
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
const haveReadLegalTerms = ref<boolean>(false);
const haveClickedSupportButton = ref<boolean>(false);
const lang = ref<("en" | "da") | null>(null);
const route = useRoute();

const emailInputClass = computed(() => {
  return haveClickedSupportButton.value &&
    !isValidEmailAddress(emailForSupporter.value)
    ? "border-red-500 border-4"
    : "";
});

const monthlyAmount = computed(() => {
  return lang.value === "en" ? 1.99 : 9;
});

const onClickedSupportButton = async () => {
  haveClickedSupportButton.value = true;
  if (!isValidEmailAddress(emailForSupporter.value)) {
    return;
  }
  if (haveReadLegalTerms.value === false) {
    alert(
      lang.value === "en"
        ? "Please agree to our legal terms"
        : "Venligst accepter vores juridiske vilkår",
    );
    return;
  }

  const body: PaymentCreateBody = {
    amount: monthlyAmount.value,
    lang: lang.value ?? "en",
    type: "monthly",
    email: emailForSupporter.value,
    wantsToReceiveUpdates: wantToReceiveUpdates.value,
    recurring: true,
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
  }
};

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
