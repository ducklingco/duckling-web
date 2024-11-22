<template>
    <div class="flex items-center w-full">
        <input
type="range" min="0" max="100" step="1" :value="(percentage).toFixed(1)"
            class="top-[-1px] w-full rounded-full overflow-hidden appearance-none bg-duckling_white bg-opacity-80 focus:outline-none hover:cursor-ew-resize"
            @input="onInput">
    </div>
</template>

<script>
export default {
    name: "PlayerTrack",
    props: {
        percentage: { type: Number, required: true },
    },
    methods: {
        onInput (e) {
            this.$emit("seek", e.target.value);
        },
    },
};
</script>

<style lang="css">
input[type="range"]::-webkit-slider-runnable-track {
    /* TODO: Access this color from tailwind config instead of hardcoding */
    color: #c62322;
    height: 4px;
    -webkit-appearance: none;
}

input[type="range"]::-webkit-slider-thumb {
    width: 8px;
    -webkit-appearance: none;
    height: 4px;
    cursor: ew-resize;
    background: #c62322;
    box-shadow: -100vw 0 0 100vw #c62322;
}
</style>
