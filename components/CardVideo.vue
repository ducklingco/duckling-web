<template>
    <div class="h-full w-full flex justify-center items-center bg-beige">
        <video class="h-full w-full object-contain" controls>
            <source :src="video" type="video/mp4">
            Your browser does not support the video tag.
        </video>
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

const video = computed(() => {
    return props?.card?.cardable?.video?.path
});
</script>