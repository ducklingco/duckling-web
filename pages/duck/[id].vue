<template>
  <div class="bg-black flex items-center justify-center min-h-screen">
    <div class="relative w-full max-w-[calc(100vh*4/3)] mx-auto">
      <div class="relative pb-[75%]">
        <div class="absolute w-full h-full p-8 sm:p-12">
          <img
            class="w-full h-full object-cover"
            src="https://source.unsplash.com/random"
            alt="Random Image"
          />

          <div
            class="absolute top-0 left-0 w-full h-full bg-black bg-opacity-30 p-8 sm:p-12"
          >
            <div
              class="relative w-full h-full grid grid-rows-5 overflow-hidden"
            >
              <div
                class="absolute right-0 top-1/2 translate-x-1/2 transform -translate-y-1/2 w-20 h-20 md:w-32 md:h-32 xl:w-40 xl:h-40 rounded-full bg-green hover:cursor-pointer"
                @click="onClickChevron"
              >
                <!-- Chevron next icon -->
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="white"
                  class="w-1/2 h-1/2 absolute top-1/2 left-1/2 transform -translate-x-[100%] -translate-y-1/2"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 5l7 7-7 7"
                  ></path>
                </svg>
              </div>
              <div
                class="grid grid-cols-3 gap-8 lg:grid-rows-1 p-6 row-span-1 z-10"
              >
                <div class="flex gap-2 sm:gap-4 grid-cols-1">
                  <a
                    href="/"
                    class="text-xs bg-white text-black rounded-full w-4 h-4 sm:w-8 sm:h-8 flex items-center justify-center"
                  >
                    <!-- Cross / exit icon -->
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      class="w-6 h-6"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M6 18L18 6M6 6l12 12"
                      ></path>
                    </svg>
                  </a>
                  <button
                    class="text-xs bg-white text-black rounded-full w-4 h-4 sm:w-8 sm:h-8 flex items-center justify-center p-[2px] sm:p-[7px]"
                  >
                    <!-- Share icon -->
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      x="0px"
                      y="0px"
                      width="100"
                      height="100"
                      viewBox="0 0 24 24"
                    >
                      <path
                        d="M 16.707031 2.2929688 L 15.292969 3.7070312 L 17.585938 6 L 17 6 C 10.936593 6 6 10.936593 6 17 L 6 18 L 8 18 L 8 17 C 8 12.017407 12.017407 8 17 8 L 17.585938 8 L 15.292969 10.292969 L 16.707031 11.707031 L 21.414062 7 L 16.707031 2.2929688 z M 2 8 L 2 9 L 2 22 L 22 22 L 22 18 L 22 17 L 20 17 L 20 18 L 20 20 L 4 20 L 4 9 L 4 8 L 2 8 z"
                      ></path>
                    </svg>
                  </button>
                </div>
                <div class="flex justify-center items-start grid-cols-2">
                  <a href="https://duckling.co">
                    <img
                      class="h-8 sm:h-12"
                      src="assets/img/duckling_logo_text_right.png"
                      alt="Logo"
                    />
                  </a>
                </div>

                <div class="grid-cols-1"></div>
              </div>

              <div
                class="flex justify-center items-center h-full row-span-3 px-3 md:px-14 lg:px-20 xl:p-40"
              >
                <div
                  class="text-white flex-col justify-center items-center gap-10 p-6"
                >
                  <div id="profile" class="flex gap-2 items-center row-span-1">
                    <img
                      class="rounded-full w-14 h-14"
                      src="https://source.unsplash.com/random/100x100"
                      alt="Profile picture"
                    />
                    <div class="flex flex-col">
                      <span class="text-md font-bold">Name</span>
                      <span class="text-sm">@username</span>
                    </div>
                  </div>
                  <div class="py-3 row-span-3 flex items-center">
                    <h2
                      class="text text-xl sm:text-4xl md:text-6xl lg:text-8xl font-bold"
                    >
                      Title of the duck goes on the cover
                    </h2>
                  </div>
                  <div
                    id="tags"
                    class="text-xs sm:text-sm flex justify-start gap-2 align-baseline flex-wrap row-span-1"
                  >
                    <div v-for="tag of 3" :key="tag">
                      <Tag>Climate change</Tag>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRoute, useRouter } from "vue-router";

const router = useRouter();
const route = useRoute();
const id = route.params.id;

let onClickChevron = () => {
  console.log("Clicked chevron");
  router.push({ name: "carousel-id", params: { id: id } });
};
</script>
