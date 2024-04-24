<template>
  <div class="absolute h-full w-full bg-duckling_beige">
    <div class="h-full flex justify-center items-center">
      <div class="flex flex-col w-80">
        <div v-if="showPhoneNumberInput" class="flex flex-row my-4 w-full">
          <select
            name="countryCodes"
            id="country-codes"
            class="shadow border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            v-model="countryCodeSelected"
          >
            <option v-for="countryCode in countryCodes" :value="countryCode">
              {{ countryCode.code }} {{ countryCode.emoji }}
            </option>
          </select>

          <input
            v-model="phoneNumber"
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            placeholder="Enter your phone number"
            @keydown.prevent.enter="sendConfirmationCode"
          />
        </div>
        <div v-if="invalidAccount">Your account doesn't exist.</div>
        <div v-if="invalidCode">The code you entered is invalid.</div>
        <div v-if="accountDeleted">
          Your account has been deleted. You can close this window.
        </div>
        <div v-if="showVerificationCodeInput" class="flex flex-row my-4 w-full">
          <input
            v-model="verificationCode"
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            placeholder="Enter your confirmation code"
            @keydown.prevent.enter="verifyPhone"
          />
        </div>
        <button
          v-if="!showDeleteButton"
          class="py-2 px-4 bg-duckling_green text-white font-semibold rounded-lg shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-opacity-75"
          type="button"
          :disabled="loading"
          @click="showPhoneNumberInput ? sendConfirmationCode() : verifyPhone()"
        >
          <span v-if="!loading">
            {{
              showPhoneNumberInput ? "Send Confirmation Code" : "Verify Phone"
            }}
          </span>
          <span v-else class="flex justify-center items-center">
            <svg
              class="animate-spin h-5 w-5 text-white"
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
          class="py-2 px-4 bg-duckling_red text-white font-semibold rounded-lg shadow-md hover:bg-red-900 focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-opacity-75"
          type="button"
          :disabled="loading"
          @click="deleteAccount"
        >
          <span v-if="!loading"> Delete Account </span>
          <span v-else class="flex justify-center items-center">
            <svg
              class="animate-spin h-5 w-5 text-white"
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
