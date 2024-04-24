<template>
    <div class="absolute top-0 left-0 grid w-full grid-cols-3 row-span-1 gap-8 p-6 pointer-events-none lg:grid-rows-1">
        <div class="flex grid-cols-1 gap-2 sm:gap-4">
            <a v-if="props?.hasCloseBtn"
                class="flex items-center justify-center w-4 h-4 text-xs text-black bg-white rounded-full pointer-events-auto sm:w-8 sm:h-8 hover:cursor-pointer"
                @click="onClickClose">
                <!-- Cross / exit icon -->
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                    class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12">
                    </path>
                </svg>
            </a>
            <button
                class="relative text-xs bg-white text-black rounded-full w-4 h-4 sm:w-8 sm:h-8 flex items-center justify-center p-[2px] sm:p-[7px] pointer-events-auto"
                @click="() => showShareDialog = true">
                <!-- Share icon -->
                <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 24 24">
                    <path
                        d="M 16.707031 2.2929688 L 15.292969 3.7070312 L 17.585938 6 L 17 6 C 10.936593 6 6 10.936593 6 17 L 6 18 L 8 18 L 8 17 C 8 12.017407 12.017407 8 17 8 L 17.585938 8 L 15.292969 10.292969 L 16.707031 11.707031 L 21.414062 7 L 16.707031 2.2929688 z M 2 8 L 2 9 L 2 22 L 22 22 L 22 18 L 22 17 L 20 17 L 20 18 L 20 20 L 4 20 L 4 9 L 4 8 L 2 8 z">
                    </path>
                </svg>
                <share-dialog v-if="showShareDialog" @close="() => showShareDialog = false" />
            </button>
        </div>
        <div class="flex items-start justify-center grid-cols-2 pointer-events-auto">
            <a href="https://duckling.co">
                <img class="object-contain h-8 sm:h-12" src="assets/img/duckling_logo_text_right_white.png"
                    alt="Logo" />
            </a>
        </div>

        <div class="grid-cols-1 pointer-events-none"></div>
    </div>
</template>

<script setup lang="ts">
const props = defineProps<{ hasCloseBtn: Boolean }>();
const onClickClose = () => {
    // Navigate to index
    navigateTo({ name: "index" });
};
const showShareDialog = ref(false);
</script>