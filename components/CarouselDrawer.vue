<!-- eslint-disable vue/html-self-closing -->
<template>
  <div class="absolute bottom-0 left-0 w-full px-4 sm:w-1/2 sm:pl-8">
    <div
      ref="drawerRef"
      class="max-40 flex h-40 w-full flex-col justify-start gap-4 rounded-t-xl bg-duckling_black bg-opacity-50 px-4"
    >
      <!-- Handle -->
      <div
        class="flex h-8 w-full cursor-pointer justify-center pt-4"
        @touchstart="onMouseDown"
        @mousedown="onMouseDown"
      >
        <div class="h-1 w-8 rounded-full bg-duckling_white opacity-50" />
      </div>
      <div
        v-if="audio != undefined"
        class="flex w-full items-center justify-center gap-4"
      >
        <button class="h-10 w-10" @click="togglePlay">
          <img :src="playing ? imgPause : imgPlay" alt="" />
        </button>
        <audio
          ref="player"
          class="hidden h-8 w-full rounded-none"
          controls
          :src="audio"
          @playing="onPlaying"
          @pause="onPause"
          @timeupdate="onTimeUpdate"
        />
        <player-track
          :percentage="percentagePlayed"
          class="flex-grow"
          @seek="seekToPercentage"
        />
      </div>
      <div class="text-white"></div>

      <div class="w-full text-left text-duckling_white opacity-100">
        <p class="text text-sm">
          {{ caption }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { DucklingImage } from "~/types/Duckling";
import { MediaType } from "~/types/MediaType";

const props = defineProps<{ card: DucklingImage }>();
const imgPlay = new URL("~/assets/img/button-play.png", import.meta.url).href;
const imgPause = new URL("~/assets/img/button-pause.png", import.meta.url).href;
const player = ref<HTMLAudioElement | null>(null);
const audioBlob = ref<Blob | null>(null);
const userStore = useUserStore();
const { accessToken } = storeToRefs(userStore);
const { setAccessToken } = userStore;

onMounted(async () => {
  await setAccessToken();
  if (props.card.audioId) {
    audioBlob.value = await getMedia(
      props.card.audioId,
      MediaType.AUDIO,
      accessToken.value,
    );
  }
});

const caption = computed(() => {
  return props?.card?.caption || "";
});

const audio = computed((): string | undefined => {
  if (!audioBlob.value) return undefined;
  return URL.createObjectURL(audioBlob.value);
});

const play = () => {
  if (!player.value) return null;
  player.value.play();
  onPlaying();
};

const pause = () => {
  if (!player.value) return null;
  player.value.pause();
  onPause();
};

const togglePlay = () => {
  if (!player.value) return null;
  if (player.value.paused) {
    play();
  } else {
    pause();
  }
};

const playing = ref(false);

const seekToPercentage = (percentage: number) => {
  if (!player?.value?.duration) return null;
  player.value.currentTime = (player.value.duration * percentage) / 100;
};

const emit = defineEmits(["loadeddata", "timeupdate"]);

const duration = ref(0);
const percentagePlayed = ref(0);

onMounted(() => {
  bindAudioEvent("loadeddata");
  bindAudioEvent("timeupdate");
});

function bindAudioEvent(which: "loadeddata" | "timeupdate") {
  if (!player.value) return null;
  player.value.addEventListener(
    which,
    (event) => {
      if (which === "loadeddata") {
        duration.value = player?.value?.duration ?? 0;
      }

      emit(which, { event, player: player.value });
    },
    true,
  );
}
const onPlaying = () => {
  playing.value = true;
};
const onPause = () => {
  playing.value = false;
};

const onTimeUpdate = () => {
  if (player.value) {
    percentagePlayed.value =
      (player.value.currentTime / player.value.duration) * 100;
  }
};

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
    window.removeEventListener("mousemove", onMouseMove);
    window.removeEventListener("touchmove", onMouseMove);
    window.removeEventListener("mouseup", onMouseUp);
  };
  window.addEventListener("mousemove", onMouseMove);
  window.addEventListener("touchmove", onMouseMove);
  window.addEventListener("mouseup", onMouseUp);
};

defineExpose({
  play,
  pause,
  togglePlay,
  playing,
  id: props?.card?.id,
});
</script>
