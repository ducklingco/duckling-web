<template>
    <Teleport to="body">
        <!-- Emit closeDialog if click elsewhere -->
        <div @click="closeDialog" class="fixed inset-0 z-0 flex items-center justify-center bg-black bg-opacity-50">
        </div>
        <div class="absolute top-0 left-0 flex items-center justify-center w-full h-full p-10 pointer-events-none ">
            <div class="container flex flex-col items-stretch justify-center max-h-screen gap-8 md:max-w-screen-sm">
                <div class="grid grid-cols-4 grid-rows-1 gap-4 grow ">
                    <div v-for="social of socialShares"
                        class="flex items-stretch justify-center overflow-hidden rounded-md cursor-pointer pointer-events-auto aspect-square">
                        <SocialShare :network="social?.network" :url="social?.url" :key="social?.name" :styled="true"
                            class="flex items-center justify-center grow " :label="false">
                        </SocialShare>
                    </div>
                </div>
                <div class="flex items-stretch justify-center w-full gap-2 pointer-events-auto">
                    <button class="p-2 text-lg rounded-md bg-duckling_white" :class="{
            'bg-green-500': didCopy
        }" @click="onClickCopy">Copy</button>
                    <input type="text" readonly class="p-1 text-lg rounded-md text grow" aria-expanded="true"
                        v-model="url" />
                </div>
                <div class="flex flex-col items-stretch justify-center w-full overflow-hidden rounded-md">
                    <QRCode class="flex flex-col items-stretch justify-center w-full pointer-events-auto" :data="url" />
                </div>
            </div>
        </div>
    </Teleport>
    <!-- <div
        class="absolute left-0 z-10 flex flex-col items-start justify-center gap-1 p-1 m-auto mt-2 text-lg bg-white rounded-sm top-full">
        <div class="text-sm text-left text">Share on Social</div>
        <div v-if="socialShares?.length != 0" class="flex gap-2">
            <QRCode :data="url" />
            <button @click="downloadQRCode()">Download</button>
            <SocialShare v-for="social of socialShares" :network="social?.network" :url="social?.url"
                :key="social?.name" :styled="false" :label="false">
            </SocialShare>

        </div>
        <div class="flex items-center justify-start gap-2">
            <button :class="{
            'bg-green-500': didCopy
        }" @click="onClickCopy">Copy</button>
            <input type="text" readonly class="p-1 text-xl border-2 text border-duckling_grey" aria-expanded="true"
                v-model="url" />
        </div>
    </div> -->
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
// Extract route for sharing
const url = computed(() => {
    const baseUrl = window.location.origin;
    const fullUrl = `${baseUrl}${route.path}`;
    return fullUrl;
});
const coverImg = computed(() => props.card?.cover_image?.path);

const socialShares = [
    {
        network: 'facebook',
        url: url.value,
        title: title.value,
        hashtags: 'duckling,duck',
        image: coverImg.value,
    },
    {
        network: 'twitter',
        url: url.value,
        title: title.value,
        hashtags: 'duckling,duck',
        image: coverImg.value,
    },
    {
        network: 'linkedin',
        url: url.value,
        title: title.value,
        hashtags: 'duckling,duck',
        image: coverImg.value,
    },
    // {
    //     network: 'messenger',
    //     url: url.value,
    //     title: title.value,
    //     hashtags: 'duckling,duck',
    //     image: coverImg.value,
    // },
    {
        network: 'reddit',
        url: url.value,
        title: title.value,
        hashtags: 'duckling,duck',
        image: coverImg.value,
    },
];

socialShares.map((social => useSocialShare(social)));

const didCopy = ref(false)
const onClickCopy = () => {
    didCopy.value = navigator.clipboard.writeText(url.value);

};

// Function to download the QR Code
function downloadQRCode () {
    const { $qrCodeStyling } = useNuxtApp();
    $qrCodeStyling.download();
}
</script>

<style>
.social-share-button__icon {
    width: 4rem;
    height: 4rem;
}
</style>