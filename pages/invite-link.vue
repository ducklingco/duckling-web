<!-- eslint-disable vue/html-self-closing -->
<template>
  <div class="flex flex-col items-center pt-16">
    <div class="size-20">
      <img src="/assets/img/duckling_logo_text_under.png" />
    </div>

    <div
      v-if="(nestId?.length ?? 0) <= 0 || (inviteLink?.length ?? 0) <= 0"
      class="pt-16"
    >
      <div v-if="!loading" class="text-center text-3xl">
        Seems like your link is incomplete and is missing some data
      </div>
    </div>
    <div v-else-if="showModule === 'signUpOrSignIn'" class="pt-16">
      <div class="flex h-full flex-col justify-center text-center text-3xl">
        <div>You have been invited to join a</div>
        <div class="flex flex-row">
          nest on&nbsp;
          <div class="underline">Duckling.</div>
          &nbsp;Join in a few,
        </div>
        <div>easy steps (it's free):</div>
      </div>
      <div class="flex w-full flex-row py-4 pt-16">
        <select
          id="country-codes"
          v-model="countryCodeSelected"
          name="countryCodes"
          class="focus:shadow-outline border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
        >
          <option
            v-for="countryCode in countryCodes"
            :key="countryCode.code"
            :value="countryCode"
          >
            {{ countryCode.code }} {{ countryCode.emoji }}
          </option>
        </select>

        <div class="w-full pl-2">
          <input
            v-model="phoneNumber"
            class="focus:shadow-outline w-full appearance-none border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
            type="tel"
            placeholder="Please enter your phone number"
            @keydown.prevent.enter="getVerificationCode()"
            @input="(event) => onNumberTextInput(event, 'phoneNumber')"
          />
        </div>
      </div>

      <button
        class="w-full rounded-lg bg-duckling_green py-3 text-xl text-duckling_white shadow-md hover:bg-duckling_green/70 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-opacity-75"
        type="button"
        :disabled="loading"
        @click="getVerificationCode()"
      >
        <span v-if="!loading"> Send Confirmation Code </span>
        <span v-else class="flex items-center justify-center">
          <svg
            class="h-5 w-5 animate-spin text-duckling_white"
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
    <div v-else-if="showModule === 'phoneVerification'" class="pt-16">
      <div
        class="flex h-full flex-col justify-center pb-4 text-center text-3xl"
      >
        <div>Please enter the code sent to:</div>
        <div>{{ countryCodeSelected.dial_code }}&nbsp;{{ phoneNumber }}</div>
      </div>
      <div class="flex justify-center">
        <input
          v-model="verificationCode"
          class="focus:shadow-outline px-4 py-4 text-center text-7xl text-gray-700 shadow focus:outline-none"
          type="text"
          placeholder="000000"
          size="6"
          inputmode="numeric"
          pattern="[0-9]*"
          @keydown.prevent.enter="sendVerificationCode()"
          @input="(event) => onNumberTextInput(event, 'verificationCode')"
        />
      </div>
      <div class="flex flex-col items-center justify-center pt-8">
        <button
          class="rounded-lg bg-duckling_green px-8 py-3 text-xl text-duckling_white shadow-md hover:bg-duckling_green/70 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-opacity-75"
          type="button"
          :disabled="loading"
          @click="sendVerificationCode()"
        >
          <!-- Stupid workaround, but tailwind is acting up -->
          <span v-if="!loading"> Next </span>
          <span v-else class="flex items-center justify-center">
            <svg
              class="h-5 w-5 animate-spin text-duckling_white"
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
          class="bg-transparent px-8 py-3 text-xl text-duckling_green hover:text-duckling_green/70 focus:text-duckling_green/70 focus:underline focus:outline-none"
          type="button"
          :disabled="loading"
          @click="getVerificationCode()"
        >
          <span> Send code again </span>
        </button>
      </div>
    </div>
    <div v-else-if="showModule === 'signUpPage'" class="pt-16">
      <div
        class="flex h-full flex-col justify-center px-12 pb-4 text-center text-2xl"
      >
        <div>Please give us your name:</div>
      </div>
      <div class="flex flex-col justify-center space-y-2">
        <input
          v-model="username"
          class="focus:shadow-outline w-full appearance-none border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
          type="text"
          placeholder="Username*"
          @keydown.prevent.enter="createAccount()"
        />
        <input
          v-model="name"
          class="focus:shadow-outline w-full appearance-none border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
          type="text"
          placeholder="First name*"
          @keydown.prevent.enter="createAccount()"
        />
        <input
          v-model="surname"
          class="focus:shadow-outline w-full appearance-none border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
          type="text"
          placeholder="Last name*"
          @keydown.prevent.enter="createAccount()"
        />
      </div>
      <div class="flex flex-col items-center justify-center pt-8">
        <button
          class="w-full rounded-lg bg-duckling_green py-3 text-xl text-duckling_white shadow-md hover:bg-duckling_green/70 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-opacity-75"
          type="button"
          :disabled="loading"
          @click="createAccount()"
        >
          <span v-if="!loading"> Create account </span>
          <span v-else class="flex items-center justify-center">
            <svg
              class="h-5 w-5 animate-spin text-duckling_white"
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
        <div class="flex w-fit items-start pt-4">
          <input
            id="agreeToLegalTerms"
            v-model="agreeToLegalTerms"
            type="checkbox"
            name="agreeToLegalTerms"
            class="peer hidden"
          />
          <div
            class="mt-1 flex size-4 min-h-4 min-w-4 cursor-pointer rounded-sm border-2 border-black"
            tabindex="0"
            @click="agreeToLegalTerms = !agreeToLegalTerms"
            @keydown.enter="agreeToLegalTerms = !agreeToLegalTerms"
          >
            <svg
              v-if="agreeToLegalTerms"
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
          <div class="pl-2 text-lg">
            <span class="cursor-pointer">
              <label for="agreeToLegalTerms" class="cursor-pointer">
                I agree to the
              </label>
              <a
                href="https://www.duckling.co/legal"
                target="_blank"
                class="text-duckling_green"
                >legal terms</a
              >
              <label for="agreeToLegalTerms" class="cursor-pointer">
                and
              </label>

              <br />
              <a
                href="https://www.duckling.co/values"
                target="_blank"
                class="text-duckling_green"
                >community values</a
              >
              <label for="agreeToLegalTerms" class="cursor-pointer">
                of Duckling
              </label>
            </span>
          </div>
        </div>
      </div>
    </div>
    <div v-else-if="(showModule = 'downloadAndSignIn')" class="pt-16">
      <div class="flex h-full flex-col justify-center text-center text-3xl">
        <div class="pb-8 underline underline-offset-4">
          You have joined the nest.
        </div>
        <div>If you don't have the app</div>
        <div>download the app</div>
        <div>for free and sign in:</div>
      </div>
      <div v-if="qrCodeDataUrl" class="flex justify-center pt-4">
        <img :src="qrCodeDataUrl" alt="Invite QR Code" class="max-w-xs" />
      </div>
      <div class="flex flex-col items-center space-y-4 pt-8">
        <a :href="appStoreUrl" class="inline-block">
          <img
            src="/assets/img/app_store.png"
            alt="App Store"
            class="h-20 w-auto rounded-xl object-contain"
          />
        </a>
        <a :href="playStoreUrl" class="inline-block">
          <img
            src="/assets/img/play_store.png"
            alt="Google Play"
            class="h-20 w-auto rounded-xl object-contain"
          />
        </a>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { CountryCode } from "~/types/Country";
import {
  getVerificationCodeRequest,
  sendVerificationCodeRequest,
  acceptNestInviteLinkRequest,
} from "~/utils/requests";
import QRCode from "qrcode";

const route = useRoute();
const config = useRuntimeConfig();

/* const possibleModules = [
  "signUpOrSignIn",
  "phoneVerification",
  "signUpPage",
  "downloadAndSignIn",
]; */

const countryCodeSelected: Ref<CountryCode> = ref({
  code: "",
  dial_code: "",
  emoji: "",
  name: "",
});
const showModule = ref<string>("signUpOrSignIn");
const phoneNumber = ref<number>();
const verificationCode = ref<number>();
const loading = ref<boolean>(true);
const nestId = ref<string>("");
const inviteLink = ref<string>("");
const oneTimeCode = ref<string>("");
const username = ref<string>("");
const name = ref<string>("");
const surname = ref<string>("");
const agreeToLegalTerms = ref<boolean>(false);
const qrCodeDataUrl = ref<string>("");
const appStoreUrl = "https://apps.apple.com/dk/app/duckling/id6470526101";
const playStoreUrl =
  "https://play.google.com/store/apps/details?id=co.duckling.Duckling";

const accessToken = ref<string>("");

onMounted(() => {
  loading.value = true;
  countryCodes.sort((a, b) => a.code.localeCompare(b.code));
  const defaultCountryCode = countryCodes.find((c) => c.code === "DK");
  if (defaultCountryCode) {
    countryCodeSelected.value = defaultCountryCode;
  }

  nestId.value = route.query.nestId as string;
  inviteLink.value = route.query.inviteLink as string;
  generateQRCode();
  loading.value = false;
});

const completePhoneNumber = computed(() => {
  if (countryCodeSelected.value && phoneNumber.value) {
    return `${countryCodeSelected.value.dial_code}${phoneNumber.value}`;
  }
  return "";
});

const generateQRCode = async () => {
  try {
    // Generate QR code for the invite link
    const url = await QRCode.toDataURL(
      `${config.public.webPlayerUrl}/redirect`,
      {
        width: 200,
        margin: 2,
        color: {
          dark: "#000000",
          light: "#dcd7cb",
        },
      },
    );
    qrCodeDataUrl.value = url;
  } catch (err) {
    console.error("Error generating QR code:", err);
  }
};

const onNumberTextInput = (
  event: Event,
  vModel: "phoneNumber" | "verificationCode",
) => {
  if (!event.target || !(event.target instanceof HTMLInputElement)) {
    return;
  }
  // Remove any non-numeric characters
  const numericValue = event.target.value.replace(/\D/g, "");

  // Update the input value if it changed
  if (event.target.value !== numericValue) {
    event.target.value = numericValue;
    if (vModel === "phoneNumber") {
      phoneNumber.value = Number(numericValue);
    } else if (vModel === "verificationCode") {
      verificationCode.value = Number(numericValue);
    }
  }
  if (vModel === "verificationCode") {
    if (event.target.value.length > 6) {
      verificationCode.value = Number(numericValue.slice(0, 6));
    }
  }
};

const getVerificationCode = async () => {
  if (completePhoneNumber.value.length <= 0) {
    return;
  }
  loading.value = true;
  try {
    await getVerificationCodeRequest(completePhoneNumber.value);
  } catch (error) {
    console.error("Error getting verification code:", error);
  } finally {
    loading.value = false;
    showModule.value = "phoneVerification";
  }
};

const sendVerificationCode = async () => {
  const verificationCodeString = verificationCode.value?.toString() ?? "";
  if (
    verificationCodeString.length < 6 ||
    completePhoneNumber.value.length <= 0
  ) {
    return;
  }
  loading.value = true;
  try {
    const oneTimeCodeData = await sendVerificationCodeRequest(
      completePhoneNumber.value,
      verificationCodeString,
    );

    oneTimeCode.value = oneTimeCodeData;
    showModule.value = "signUpPage";
  } catch (error) {
    // The backend throws an error if a user already exists with that phone number (yes this is stupid), so we try to login with the verification code instead then
    try {
      await loginWithVerificationCode(
        completePhoneNumber.value,
        verificationCodeString,
      );

      await acceptNestInviteLink();
    } catch (error) {
      console.error("Error logging in with verification code:", error);
    }
  } finally {
    loading.value = false;
  }
};

const loginWithVerificationCode = async (
  completePhoneNumber: string,
  verificationCodeString: string,
) => {
  loading.value = true;
  const accessTokenFromLogin = await loginWithVerificationCodeRequest(
    completePhoneNumber,
    verificationCodeString,
  );
  if (accessTokenFromLogin) {
    accessToken.value = accessTokenFromLogin;
  }
  loading.value = false;
};

const createAccount = async () => {
  if (
    username.value.length <= 0 ||
    name.value.length <= 0 ||
    surname.value.length <= 0 ||
    !agreeToLegalTerms.value
  ) {
    return;
  }
  loading.value = true;
  try {
    const accessTokenFromUserCreation = await createAccountRequest(
      completePhoneNumber.value,
      oneTimeCode.value,
      username.value,
      surname.value,
      name.value,
    );
    if (accessTokenFromUserCreation) {
      accessToken.value = accessTokenFromUserCreation;
    }
    await acceptNestInviteLink();
    showModule.value = "downloadAndSignIn";
  } catch (error) {
    if (error instanceof Error) {
      if (
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (error as any).code === "USER_EXISTS" ||
        error.message.includes("already exists")
      ) {
        alert("Username already exists, please choose another one.");
      } else {
        // Handle other errors
        console.error("Error creating account:", error.message);
      }
    }
  } finally {
    loading.value = false;
  }
};

const acceptNestInviteLink = async () => {
  if (
    nestId.value.length <= 0 ||
    inviteLink.value.length <= 0 ||
    accessToken.value.length <= 0
  ) {
    return;
  }
  loading.value = true;
  try {
    await acceptNestInviteLinkRequest(
      nestId.value,
      inviteLink.value,
      accessToken.value,
    );
  } catch (error) {
    console.error("Error accepting nest invite link:", error);
  } finally {
    loading.value = false;
    showModule.value = "downloadAndSignIn";
  }
};
</script>

<style>
* {
  font-family: "Newsreader";
}

input {
  font-family: sans-serif;
}
</style>
