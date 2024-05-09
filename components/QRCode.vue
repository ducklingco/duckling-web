<template>
    <div :data="props.data" ref="qrCode" class="svg-container" />
</template>

<script setup lang="ts">
import type QRCodeStyling from 'qr-code-styling';

const props = defineProps({
    data: String
});

const { $qrCodeStyling } = useNuxtApp();
const qrCode = ref<HTMLElement | null>(null);

// Default options
const options = {
    width: 640,
    height: 640,
    type: "svg",
    image: "../duckling_logo_text_under.png",
    data: props.data,
    dotsOptions: {
        color: "#000",
        type: "classy"
    },
    backgroundOptions: {
        color: "#fff",
    },
    imageOptions: {
        crossOrigin: "anonymous",
        margin: 5
    }
};

const qrCodeStyling: QRCodeStyling = $qrCodeStyling(options);

onMounted(() => {

    // Append QR code to DOM element
    if (!qrCode.value) return;
    qrCodeStyling.append(qrCode.value);
    // Add viewbox to make it resizable
    qrCode.value!.firstChild!.setAttribute('viewBox', '0 0 640 640');
    qrCode.value!.firstChild!.removeAttribute('width');
    qrCode.value!.firstChild!.removeAttribute('height');
});

watch(() => props.data, (newValue: string) => {
    // Update QR code data when props change
    options.data = newValue;
    qrCodeStyling.update(options);
    // Add viewbox to make it resizable
    qrCode.value!.firstChild!.setAttribute('viewBox', '0 0 640 640');
    qrCode.value!.firstChild!.removeAttribute('width');
    qrCode.value!.firstChild!.removeAttribute('height');
});
</script>

<style scoped>
.svg-container {
    width: 100%;
    height: 100%;
}

.svg-container svg {
    width: 100%;
    height: 100%;
}
</style>
