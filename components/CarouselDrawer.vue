<template>
    <div class="absolute bottom-0 left-0 w-full px-4 sm:w-1/2 sm:pl-8">
        <div ref="drawerRef"
            class="flex flex-col justify-start w-full h-40 gap-4 px-4 bg-opacity-50 max-40 bg-duckling_black rounded-t-xl">
            <!-- Handle -->
            <div class="flex justify-center w-full h-8 pt-4 cursor-pointer" @touchstart="onMouseDown"
                @mousedown="onMouseDown">
                <div class="w-8 h-1 rounded-full opacity-50 bg-duckling_white"></div>
            </div>
            <div v-if="audio" class="flex items-center justify-center w-full gap-4">
                <button class="w-10 h-10" @click="togglePlay">
                    <img :src="playing ? imgPause : imgPlay" alt="">
                </button>
                <audio ref="player" class="hidden w-full h-8 rounded-none " controls :src="audio" @playing="onPlaying"
                    @pause="onPause"></audio>
                <player-track :percentage="percentagePlayed" @seek="seekToPercentage" class="flex-grow" />
            </div>

            <div class="w-full text-left opacity-100 text-duckling_white">
                <p class="text-sm text">
                    {{ caption }}
                </p>
            </div>
        </div>
    </div>
</template>

<script setup>

// Import play image
import imgPlay from '~/assets/img/button-play.png';
import imgPause from '~/assets/img/button-pause.png';

const props = defineProps({
    card: {
        type: Object,
        required: true
    }
});

const player = ref(null);

const caption = computed(() => {
    return props?.card?.cardable?.caption || '';
});

const audio = computed(() => {
    return props?.card?.cardable?.audio?.path || '';
});

const play = () => {
    if (!player.value) return null;
    player.value.play();
};

const pause = () => {
    if (!player.value) return null;
    player.value.pause();
};

const togglePlay = () => {
    if (!player.value) return null;
    if (player.value.paused) {
        play();
    } else {
        pause();
    }
};

const playing = ref(true);

const seekToPercentage = (percentage) => {
    if (!player?.value?.duration) return null;
    player.value.currentTime = player.value.duration * percentage / 100;
};

const emit = defineEmits(['loadeddata', 'timeupdate']);

let duration = ref(0);
let percentagePlayed = ref(0);

onMounted(() => {
    bindAudioEvent('loadeddata');
    bindAudioEvent('timeupdate');
});

function bindAudioEvent (which) {
    if (!player.value) return null;
    player.value.addEventListener(
        which,
        (event) => {
            if (which === "loadeddata") {
                duration.value = player.value.duration;
            }

            if (which === "timeupdate") {
                percentagePlayed.value =
                    (player.value.currentTime / player.value.duration) * 100;
            }

            emit(which, { event, player: player.value });
        },
        true
    );
}
const onPlaying = () => {
    playing.value = true
}
const onPause = () => {
    playing.value = false
}


const drawerRef = ref(null);


// When mouse is down, make so that the drawer can be dragged up and down
const onMouseDown = (e) => {
    if (!drawerRef.value) return;
    const startY = e.clientY || e.touches[0].clientY;
    const startHeight = drawerRef.value.clientHeight;
    const onMouseMove = (e) => {
        if (!drawerRef.value) return;
        const diff = (e.clientY || e.touches[0].clientY) - startY;
        if (startHeight - diff < 40) return;
        if (startHeight - diff > window.innerHeight * 0.8) return;
        drawerRef.value.style.height = `${startHeight - diff}px`;
    };
    const onMouseUp = () => {
        window.removeEventListener('mousemove', onMouseMove);
        window.removeEventListener('touchmove', onMouseMove);
        window.removeEventListener('mouseup', onMouseUp);
    };
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('touchmove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
};

defineExpose({
    play,
    pause,
    togglePlay,
    playing,
    id: props?.card?.id
});
</script>