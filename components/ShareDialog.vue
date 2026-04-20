<template>
    <Teleport to="body">
        <!-- Emit closeDialog if click elsewhere -->
        <div class="fixed inset-0 z-0 flex items-center justify-center bg-black bg-opacity-50" @click="closeDialog" />
        <div
            class="absolute top-0 left-0 items-center justify-center w-full h-full overflow-y-scroll pointer-events-none">
            <div class="flex items-start justify-center h-full max-h-full sm:items-center">
                <div class="relative w-full sm:max-w-[calc(100vh*2/4)] min-w-[300px] h-full mx-auto">
                    <div class="flex items-center justify-center w-full h-full">
                        <div class="w-full max-h-full p-8">
                            <div class="w-full h-full">
                                <div class="flex flex-col items-stretch justify-center w-full h-full gap-2 sm:gap-3">
                                    <div class="grid grid-cols-4 grid-rows-1 gap-2 sm:gap-3 md:gap-4 grow">
                                        <div v-for="social of socialShares"
                                            class="flex items-stretch justify-center overflow-hidden rounded-md cursor-pointer pointer-events-auto aspect-square">
                                            <SocialShare :key="social?.network" :network="social?.network"
                                                :url="social?.url" :styled="true"
                                                class="flex items-center justify-center grow" :label="false" />
                                        </div>
                                    </div>
                                    <div class="flex flex-col w-full gap-1 pointer-events-auto">
                                        <span class="text-sm text-duckling_white opacity-80">Embed on your website or blog</span>
                                        <div class="flex items-stretch justify-center w-full gap-2">
                                            <button
                                                class="p-1 text-sm rounded-md md:text-lg md:p-2 bg-duckling_white sm:text-base"
                                                @click="onClickCopy">
                                                <svg width="31" height="38" viewBox="0 0 31 38" fill="none"
                                                    xmlns="http://www.w3.org/2000/svg">
                                                    <path
                                                        d="M4.9288 37.4728C3.44173 37.4728 2.32118 37.0905 1.56717 36.326C0.81316 35.5616 0.436155 34.4253 0.436155 32.9173V12.1349C0.436155 10.6268 0.81316 9.49582 1.56717 8.74181C2.32118 7.97733 3.44173 7.59509 4.9288 7.59509H10.4582V18.2769C10.4582 19.188 10.6781 19.8687 11.118 20.319C11.5578 20.7693 12.2385 20.9945 13.1601 20.9945H23.4806V32.9173C23.4806 34.4253 23.1036 35.5616 22.3496 36.326C21.5956 37.0905 20.475 37.4728 18.988 37.4728H4.9288ZM13.1758 19.0623C12.6312 19.0623 12.359 18.7953 12.359 18.2612V8.00351C12.6208 8.07681 12.8878 8.21296 13.1601 8.41193C13.4324 8.61091 13.7151 8.86748 14.0084 9.18165L22.114 17.4129C22.4177 17.7271 22.6533 18.0151 22.8209 18.2769C22.9989 18.5387 23.1246 18.8005 23.1979 19.0623H13.1758ZM25.3814 30.1369V21.3715C25.3814 20.3976 25.2609 19.5022 25.0201 18.6853C24.7792 17.858 24.2608 17.0516 23.4649 16.2662L14.9195 7.72075C14.134 6.92485 13.3329 6.39076 12.516 6.11848C11.7097 5.83573 10.809 5.69435 9.81417 5.69435H7.63068V4.72042C7.63068 3.25429 8.01292 2.14421 8.7774 1.3902C9.54189 0.636191 10.6624 0.259186 12.139 0.259186H19.9462V9.07169C19.9462 9.8257 20.1504 10.4122 20.5588 10.831C20.9777 11.2499 21.5694 11.4594 22.3339 11.4594H30.6594V25.5971C30.6594 26.3511 30.5652 27.0109 30.3767 27.5764C30.1882 28.1419 29.9054 28.6131 29.5284 28.9901C29.1619 29.3672 28.6959 29.6499 28.1304 29.8384C27.5648 30.0374 26.9103 30.1369 26.1668 30.1369H25.3814ZM22.6009 9.68432C22.0145 9.68432 21.7213 9.3911 21.7213 8.80464L21.7055 0.808986C21.9255 0.850875 22.1402 0.945127 22.3496 1.09174C22.559 1.23835 22.7842 1.43733 23.0251 1.68867L29.607 8.3648C29.8478 8.61614 30.0416 8.84653 30.1882 9.05598C30.3348 9.26543 30.429 9.47488 30.4709 9.68432H22.6009Z"
                                                        :fill="didCopy ? '#009C1A' : '#000'" />
                                                </svg>
                                            </button>
                                            <input v-model="embedCode" type="text" readonly
                                                class="min-w-0 p-1 text-sm rounded-md sm:text-base md:p-2 md:text-lg text grow font-mono">
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </Teleport>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';

const props = defineProps<{
    card: any;
}>();

const emit = defineEmits(['close']);

const closeDialog = () => {
    emit('close');
};

const route = useRoute();
const title = computed(() => props.card?.title);

const url = computed(() => {
    const baseUrl = window.location.origin;
    const fullUrl = `${baseUrl}${route.path}`;
    return fullUrl;
});

const coverImg = computed(() => props.card?.cover_image?.path);
const shareText = 'I am enjoying this Duckling story';

const socialShares = [
    {
        network: 'facebook',
        url: url.value,
        title: shareText,
        hashtags: 'duckling,duck',
        image: coverImg.value,
    },
    {
        network: 'twitter',
        url: url.value,
        title: shareText,
        hashtags: 'duckling,duck',
        image: coverImg.value,
    },
    {
        network: 'linkedin',
        url: url.value,
        title: shareText,
        hashtags: 'duckling,duck',
        image: coverImg.value,
    },
    {
        network: 'reddit',
        url: url.value,
        title: shareText,
        hashtags: 'duckling,duck',
        image: coverImg.value,
    },
];

socialShares.map((social => useSocialShare(social)));

    const embedCode = computed(() =>
    `<div style="position:relative;width:100%;max-width:800px;aspect-ratio:4/3;"><iframe src="${url.value}" style="position:absolute;top:0;left:0;width:100%;height:100%;border:0;" allowfullscreen></iframe></div>`
);

const didCopy = ref(false);

const onClickCopy = () => {
    navigator.clipboard.writeText(embedCode.value).then(() => {
        didCopy.value = true;
    }).catch(() => {
        console.error('Failed to copy');
    });
};
</script>
