<template>
<img :src="image" alt="Card image" class="h-full w-full object-cover">
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
</script>