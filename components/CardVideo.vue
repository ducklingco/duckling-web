<template>
    <video-player
ref="videoPlayerRef" class="w-full h-full" :src="card?.cardable?.video?.path" :muted="false"
        :autoplay="false" :controls="false" :loop="false" @play="onPlayerPlay" @pause="onPlayerPause"
        @ended="onPlayerEnded" @loadeddata="onPlayerLoadeddata" @waiting="onPlayerWaiting" @playing="onPlayerPlaying"
        @timeupdate="onPlayerTimeupdate" @canplay="onPlayerCanplay" @canplaythrough="onPlayerCanplaythrough"
        @statechanged="playerStateChanged" />

    <div v-if="!playing" class="absolute top-0 left-0 flex items-center justify-center w-full h-full" @click="play">
        <button class="w-12 h-12 opacity-80">
            <img src="~/assets/img/button-play.png" alt="">
        </button>
    </div>
    <card-click-areas @prev="onClickPrev" @next="onClickNext" />
</template>

<script setup lang="ts">
import usePlayer from '../composables/usePlayer';
import useCardNavigation from '@/composables/useCardNavigation';
import type VideoPlayer from '../types/VideoPlayer'

const props = defineProps({
    card: {
        type: Object,
        required: true
    }, time: {
        type: Number,
        required: true
    }
});

const emit = defineEmits(['prev', 'next']);
const { onClickPrev, onClickNext, CardClickAreas } = useCardNavigation(emit, 'video');

const { time, playing, onPlayerPlay, onPlayerPause, onPlayerEnded, onPlayerLoadeddata, onPlayerWaiting, onPlayerPlaying, onPlayerTimeupdate, onPlayerCanplay, onPlayerCanplaythrough, playerStateChanged } = usePlayer(props.time);

const videoPlayerRef: Ref<VideoPlayer | null> = ref(null);

function togglePlay () {
    videoPlayerRef.value!.togglePlay();
};

function play () {
    videoPlayerRef.value!.play();
};

function pause () {
    videoPlayerRef.value!.pause();
};

const percentagePlayed = computed(() => {
    return videoPlayerRef.value!.percentagePlayed;
});

const seekToPercentage = computed(() => (percentage: number) => {
    videoPlayerRef.value!.seekToPercentage(percentage);
});

const duration = computed(() => {
    return videoPlayerRef.value!.duration;
});

const convertTimeToDuration = (time: number) => {
    return videoPlayerRef.value!.convertTimeToDuration(time);
};

const videoMuted = computed(() => {
    return videoPlayerRef.value!.videoMuted;
});

const toggleMute = () => {
    videoPlayerRef.value!.toggleMute();
};

defineExpose({
    id: props.card.id,
    time: time,
    playing,
    percentagePlayed,
    seekToPercentage,
    duration,
    videoMuted,
    togglePlay,
    play,
    pause,
    convertTimeToDuration,
    toggleMute
});

</script>