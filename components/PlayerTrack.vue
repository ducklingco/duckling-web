<template>
    <div class="flex items-center w-full">
        <input type="range" min="0" max="100" step="1" :value="percentage.toFixed(1)" @input="onInput"
            class="top-[-1px] w-full rounded-full overflow-hidden appearance-none bg-[#adadad] focus:outline-none hover:cursor-ew-resize" />
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
/* input[type="range"] {
    position: relative;
    top: -1px;
    overflow: hidden;
    width: 245px;
    appearance: none;
    -webkit-appearance: none;
    background-color: #adadad;
    border-radius: 5px;
} */

/* input[type="range"]:focus {
    outline: none;
} */

input[type="range"]::-webkit-slider-runnable-track {
    /* TODO: Access this color from tailwind config instead of hardcoding */
    color: #c62322;
    height: 4px;
    -webkit-appearance: none;
    /* margin-top: -1px; */
}

/* input[type="range"]:hover {
    cursor: ew-resize;
} */

input[type="range"]::-webkit-slider-thumb {
    width: 8px;
    -webkit-appearance: none;
    height: 4px;
    cursor: ew-resize;
    background: #c62322;
    box-shadow: -1000px 0 0 1000px #c62322;
    /* Make the box-shadow 100% of parent width */

    box-shadow: -100vw 0 0 100vw #c62322;
}
</style>
