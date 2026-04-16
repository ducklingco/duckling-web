<!-- eslint-disable vue/html-self-closing -->
<template>
  <video-player
    ref="videoPlayerRef"
    class="h-full w-full"
    :src="video ?? ''"
    :muted="false"
    :autoplay="false"
    :controls="false"
    :loop="false"
    @play="onPlayerPlay"
    @pause="onPlayerPause"
    @ended="onPlayerEnded"
    @loadeddata="onPlayerLoadeddata"
    @waiting="onPlayerWaiting"
    @playing="onPlayerPlaying"
    @timeupdate="onPlayerTimeupdate"
    @canplay="onPlayerCanplay"
    @canplaythrough="onPlayerCanplaythrough"
    @statechanged="playerStateChanged"
  />

</template>

<script setup lang="ts">
import usePlayer from "../composables/usePlayer";
import useCardNavigation from "@/composables/useCardNavigation";
import type VideoPlayer from "../types/VideoPlayer";
import type { DucklingVideo } from "~/types/Duckling";
import { MediaType } from "~/types/MediaType";

const props = defineProps<{ card: DucklingVideo; time: number }>();

const userStore = useUserStore();
const { accessToken } = storeToRefs(userStore);
const { setAccessToken } = userStore;

const emit = defineEmits(["prev", "next"]);
const { onClickPrev, onClickNext, CardClickAreas } = useCardNavigation(
  emit,
  "video",
);

const videoBlob = ref<Blob | null>(null);

onMounted(async () => {
  await setAccessToken();
  videoBlob.value = await getMedia(
    props.card.videoId,
    MediaType.VIDEO,
    accessToken.value,
  );
});

const video = computed((): string | undefined => {
  if (!videoBlob.value) return undefined;
  return URL.createObjectURL(videoBlob.value);
});

const {
  time,
  playing,
  onPlayerPlay,
  onPlayerPause,
  onPlayerEnded,
  onPlayerLoadeddata,
  onPlayerWaiting,
  onPlayerPlaying,
  onPlayerTimeupdate,
  onPlayerCanplay,
  onPlayerCanplaythrough,
  playerStateChanged,
} = usePlayer(props.time);

const videoPlayerRef: Ref<VideoPlayer | null> = ref(null);

function togglePlay() {
  videoPlayerRef.value!.togglePlay();
}

function play() {
  videoPlayerRef.value!.play();
}

function pause() {
  videoPlayerRef.value!.pause();
}

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
  toggleMute,
});
</script>
