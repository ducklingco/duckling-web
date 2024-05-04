<template>
    <video-player ref="videoPlayerRef" class="w-full h-full" :src="card?.cardable?.video?.path" :muted="false"
        :autoplay="false" :controls="false" :loop="false" @play="onPlayerPlay" @pause="onPlayerPause"
        @ended="onPlayerEnded" @loadeddata="onPlayerLoadeddata" @waiting="onPlayerWaiting" @playing="onPlayerPlaying"
        @timeupdate="onPlayerTimeupdate" @canplay="onPlayerCanplay" @canplaythrough="onPlayerCanplaythrough"
        @statechanged="playerStateChanged">
    </video-player>

    <div @click="play" v-if="!playing" class="absolute top-0 left-0 flex items-center justify-center w-full h-full">
        <button class="w-12 h-12 opacity-80">
            <img src="~/assets/img/button-play.png" alt="">
        </button>
    </div>
    <card-click-areas @prev="onClickPrev" @next="onClickNext" />
</template>

<script setup lang="ts">
import usePlayer from '../composables/usePlayer';
import useCardNavigation from '@/composables/useCardNavigation';

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

const videoPlayerRef = ref(null);

function togglePlay () {
    videoPlayerRef.value.togglePlay();
};

function play () {
    videoPlayerRef.value.play();
};

function pause () {
    videoPlayerRef.value.pause();
};

const percentagePlayed = computed(() => {
    return videoPlayerRef.value.percentagePlayed;
});

const seekToPercentage = computed(() => (percentage) => {
    videoPlayerRef.value.seekToPercentage(percentage);
});

const duration = computed(() => {
    return videoPlayerRef.value.duration;
});

const convertTimeToDuration = (time) => {
    return videoPlayerRef.value.convertTimeToDuration(time);
};

const videoMuted = computed(() => {
    return videoPlayerRef.value.videoMuted;
});

const toggleMute = () => {
    videoPlayerRef.value.toggleMute();
};

defineExpose({
    togglePlay,
    play,
    pause,
    playing,
    percentagePlayed,
    seekToPercentage,
    duration,
    convertTimeToDuration,
    videoMuted,
    toggleMute,
    time: time,
    id: props.card.id
});

</script>