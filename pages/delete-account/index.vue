<template>
  <div class="absolute w-full h-full bg-duckling_beige">
    <div class="flex items-center justify-center h-full">

      <div class="flex flex-col w-80">
        <div v-if="showPhoneNumberInput" class="flex flex-row w-full my-4">
          <select
            id="country-codes"
            v-model="countryCodeSelected"
            name="countryCodes"
            class="px-3 py-2 leading-tight text-gray-700 border rounded shadow focus:outline-none focus:shadow-outline"
          >
            <option v-for="countryCode in countryCodes" :value="countryCode">
              {{ countryCode.code }} {{ countryCode.emoji }}
            </option>
          </select>

          <input
            v-model="phoneNumber"
            class="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
            type="text"
            placeholder="Enter your phone number"
            @keydown.prevent.enter="sendConfirmationCode"
          >
        </div>
        <div v-if="invalidAccount">Your account doesn't exist.</div>
        <div v-if="invalidCode">The code you entered is invalid.</div>
        <div v-if="accountDeleted">
          Your account has been deleted. You can close this window.
        </div>
        <div v-if="showVerificationCodeInput" class="flex flex-row w-full my-4">
          <input
            v-model="verificationCode"
            class="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
            type="text"
            placeholder="Enter your confirmation code"
            @keydown.prevent.enter="verifyPhone"
          >
        </div>
        <button
          v-if="!showDeleteButton"
          class="px-4 py-2 font-semibold text-duckling_white rounded-lg shadow-md bg-emerald-500 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-opacity-75"
          type="button"
          :disabled="loading"
          @click="showPhoneNumberInput ? sendConfirmationCode() : verifyPhone()"
        >
          <span v-if="!loading">
            {{
              showPhoneNumberInput ? "Send Confirmation Code" : "Verify Phone"
            }}
          </span>
          <span v-else class="flex items-center justify-center">
            <svg
              class="w-5 h-5 text-duckling_white animate-spin"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                class="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                stroke-width="4"
              />
              <path
                class="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
          </span>
        </button>
        <button
          v-if="showDeleteButton"
          class="px-4 py-2 font-semibold text-duckling_white rounded-lg shadow-md bg-emerald-500 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-opacity-75"
          type="button"
          :disabled="loading"
          @click="deleteAccount"
        >
          <span v-if="!loading"> Delete Account </span>
          <span v-else class="flex items-center justify-center">
            <svg
              class="w-5 h-5 text-duckling_white animate-spin"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                class="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                stroke-width="4"
              />
              <path
                class="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
          </span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { CountryCode } from "~/types/Country";

const countryCodeSelected: Ref<CountryCode> = ref({
  code: "",
  dial_code: "",
  emoji: "",
  name: "",
});
const phoneNumber = ref("");
const phoneId = ref("");
const verificationCode = ref("");

const invalidAccount = ref(false);
const invalidCode = ref(false);
const accountDeleted = ref(false);

const token = ref("");
const userId = ref("");

const showPhoneNumberInput = ref(true);
const showVerificationCodeInput = ref(false);
const showDeleteButton = ref(false);
const loading = ref(false);

onMounted(() => {
  countryCodes.sort((a, b) => a.code.localeCompare(b.code));

  const defaultCountryCode = countryCodes.find((c) => c.code === "DK");
  if (defaultCountryCode) {
    countryCodeSelected.value = defaultCountryCode;
  }
});

const sendConfirmationCode = () => {
  loading.value = true;
  fetch(
    `https://duck.narrative.click/api/v1/phone-numbers/${phoneNumber.value}/status`
  ).then(async (response) => {
    await response.json().then(({ data }) => {
      if (data?.["id"]) {
        phoneId.value = data["id"];
        fetch(
          `https://duck.narrative.click/api/v1/phones/${phoneId.value}/send-verification-code`,
          {
            method: "PATCH",
            body: JSON.stringify({}),
          }
        ).then((response) => {
          if (response.status < 300 && response.status >= 200 && response.ok) {
            showVerificationCodeInput.value = true;
            showPhoneNumberInput.value = false;
            invalidAccount.value = false;
            loading.value = false;
          } else {
            loading.value = false;
            invalidAccount.value = true;
          }
        });
      } else {
        loading.value = false;
        invalidAccount.value = true;
      }
    });
  });
};

const verifyPhone = () => {
  loading.value = true;
  fetch(`https://duck.narrative.click/api/v1/login`, {
    method: "POST",
    body: JSON.stringify({
      phone_id: phoneId.value,
      verification_code: verificationCode.value,
    }),
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  }).then(async (response) => {
    if (response.status < 300 && response.status >= 200 && response.ok) {
      await response.json().then(({ data }) => {
        if (data.token) {
          showDeleteButton.value = true;
          showVerificationCodeInput.value = false;
          userId.value = data.id;
          token.value = data.token;
          invalidCode.value = false;
          loading.value = false;
        } else {
          loading.value = false;
          invalidCode.value = true;
        }
      });
    } else {
      loading.value = false;
      invalidCode.value = true;
    }
  });
};

const deleteAccount = () => {
  loading.value = true;
  fetch(`https://duck.narrative.click/api/v1/users/${userId.value}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      Authorization: `Bearer ${token.value}`,
    },
  }).then(async (response) => {
    if (response.ok) {
      loading.value = false;
      accountDeleted.value = true;
      showDeleteButton.value = false;
    }
  });
};
</script>

<style scoped></style>
