<template>
    <div :class="props.fullscreen ? '' : 'flex items-center justify-center min-h-screen bg-duckling_black'">
        <div :class="props.fullscreen ? '' : 'relative w-full max-w-[calc(100vh*4/3)] mx-auto'">
            <div :class="props.fullscreen ? '' : ' pb-[75%]'">
                <div :class="props.fullscreen ? '' : 'absolute w-full h-full p-8 sm:p-12'">
                    <div class="relative w-full h-full">
                        <div class="absolute w-full h-full" :class="props.fullscreen ? 'min-h-screen' : ''">
                            <slot class="w-full h-full"></slot>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';

const props = defineProps<{ fullscreen: boolean }>();

</script>