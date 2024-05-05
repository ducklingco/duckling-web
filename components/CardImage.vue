<template>
    <img :src="image" alt="Card image" class="w-full h-full " :class="{
        'object-cover': objectFit === 'cover',
        'object-contain': objectFit === 'contain',
    }" />
    <div class="absolute top-0 left-0 grid w-full h-full grid-cols-3 opacity-50 pointer-events-none">
        <div class="w-full h-full pointer-events-auto " @click="onClickPrev"></div>
        <div class="w-full h-full pointer-events-none"></div>
        <div class="w-full h-full pointer-events-auto " @click="onClickNext"></div>
    </div>

    <card-click-areas @prev="onClickPrev" @next="onClickNext" />
</template>

<script setup lang="ts">
import useCardNavigation from '@/composables/useCardNavigation';

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

const emit = defineEmits(['prev', 'next']);
const { onClickPrev, onClickNext, CardClickAreas } = useCardNavigation(emit);
</script>