<template>
    <img :src="image" alt="Card image" class="w-full h-full " :class="objectFitClass" >
    <div class="absolute top-0 left-0 grid w-full h-full grid-cols-3 opacity-50 pointer-events-none">
        <div class="w-full h-full pointer-events-auto " @click="onClickPrev"/>
        <div class="w-full h-full pointer-events-none"/>
        <div class="w-full h-full pointer-events-auto " @click="onClickNext"/>
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

const emit = defineEmits(['prev', 'next']);

const image = computed(() => {
    return props?.card?.cardable?.image?.path
});

const objectFit = computed(() => {
    return props?.card?.cardable?.image_fit
});

const objectFitClass = computed(() => {
    return objectFit.value === 'cover' ? 'object-cover' : 'object-contain';
});

const { onClickPrev, onClickNext, CardClickAreas } = useCardNavigation(emit);

</script>