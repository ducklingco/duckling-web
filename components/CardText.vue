<template>
<div class="h-full w-full flex justify-center items-center bg-beige">
<div class="w-1/2 text text-8xl text-left font-bold leading-tight">{{ text }}</div>
</div>
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps({
    card: {
        type: Object,
        required: true
    }
});

const text = computed(() => {
    console.log(props?.card)
    return props?.card?.cardable?.content
});
</script>