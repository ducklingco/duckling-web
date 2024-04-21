<template>
    <img :src="image" alt="Card image" class="w-full h-full " :class="{
        'object-cover': objectFit === 'cover',
        'object-contain': objectFit === 'contain',
    }" />
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps({
    card: {
        type: Object,
        required: true
    }
});

const image = computed(() => {
    return props?.card?.cardable?.image?.path
});

const objectFit = computed(() => {
    return props?.card?.cardable?.image_fit
});

watchEffect(() => {
    console.log('CardImage.vue: objectFit', objectFit.value);
});
</script>