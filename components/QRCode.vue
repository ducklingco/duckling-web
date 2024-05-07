<template>
    <div ref="qrCode"></div>
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
    // type: "svg",
    data: props.data,
    image: "https://images.squarespace-cdn.com/content/v1/62ff7317b7cfe25402e6d9b0/64247817-40c7-4277-a936-a9344da9511e/Logo.png?format=1500w",
    dotsOptions: {
        color: "#000",
        type: "classy"
    },
    backgroundOptions: {
        color: "#fff",
    },
    imageOptions: {
        crossOrigin: "anonymous",
        margin: 3
    }
};

const qrCodeStyling: QRCodeStyling = $qrCodeStyling(options);

onMounted(() => {
    // Append QR code to DOM element
    qrCodeStyling.append(qrCode.value);
    // Add viewbox to make it resizable
    qrCode.value!.firstChild!.setAttribute('viewBox', '0 0 300 300');
});

watch(() => props.data, (newValue: string) => {
    // Update QR code data when props change
    options.data = newValue;
    qrCodeStyling.update(options);
    // Add viewbox to make it resizable
    qrCode.value!.firstChild!.setAttribute('viewBox', '0 0 300 300');
});
</script>

<style scoped>
svg {
    width: 100%;
    height: 100%;
}
</style>