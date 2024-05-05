<template>
    <div class="absolute bottom-0 left-0 w-full px-4 sm:w-1/2 sm:pl-8">
        <div ref="drawerRef"
            class="flex flex-col justify-start w-full h-40 max-40 gap-4 px-4 bg-duckling_black bg-opacity-50 rounded-t-xl">
            <!-- Handle -->
            <div class="flex justify-center w-full h-8 pt-4 cursor-pointer" @mousedown="onMouseDown"
                @mouseup="onMouseUp">
                <div class="w-8 h-1 bg-duckling_white rounded-full opacity-50"></div>
            </div>
            <div class="flex items-center justify-center w-full gap-4">
                <button class="w-10 h-10" @click="togglePlay">
                    <img :src="playing ? imgPause : imgPlay" alt="">
                </button>
                <template v-if="audio">
                    <audio ref="player" class="hidden w-full h-8 rounded-none " controls :src="audio"
                        @playing="onPlaying" @pause="onPause"></audio>
                    <player-track :percentage="percentagePlayed" @seek="seekToPercentage" class="flex-grow" />
                </template>
            </div>

            <div class="w-full text-left text-duckling_white opacity-100">
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
    return props?.card?.cardable?.caption || 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ad exercitationem odio rerum corrupti doloremque autem, sequi deserunt voluptate nisi, voluptatum ducimus quibusdam quos, labore beatae in minus facere! Aliquam numquam pariatur placeat nostrum maiores dolores, harum omnis quo esse ea qui eaque ad sapiente deleniti atque ipsum minima. Mollitia libero soluta debitis omnis excepturi, aut provident ratione sunt explicabo? Placeat voluptate eveniet minima dolores, provident maiores temporibus illum velit suscipit iusto doloribus at ea eos vitae reiciendis magni reprehenderit harum? At laborum voluptates error enim reiciendis culpa. Eius voluptas voluptatibus itaque libero ipsam doloremque, unde maxime quae assumenda quos reiciendis! Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ad exercitationem odio rerum corrupti doloremque autem, sequi deserunt voluptate nisi, voluptatum ducimus quibusdam quos, labore beatae in minus facere! Aliquam numquam pariatur placeat nostrum maiores dolores, harum omnis quo esse ea qui eaque ad sapiente deleniti atque ipsum minima. Mollitia libero soluta debitis omnis excepturi, aut provident ratione sunt explicabo? Placeat voluptate eveniet minima dolores, provident maiores temporibus illum velit suscipit iusto doloribus at ea eos vitae reiciendis magni reprehenderit harum? At laborum voluptates error enim reiciendis culpa. Eius voluptas voluptatibus itaque libero ipsam doloremque, unde maxime quae assumenda quos reiciendis!';
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
    console.log(player.value)
    console.log(player.value.duration)
    console.log(percentage)
    console.log(player.value.duration * percentage)
    player.value.currentTime = player.value.duration * percentage / 100;
    play()
};


const emit = defineEmits(['loadeddata', 'timeupdate']);

let duration = ref(0);
let percentagePlayed = ref(0);

onMounted(() => {
    bindAudioEvent('loadeddata');
    bindAudioEvent('timeupdate');
});

function bindAudioEvent (which) {
    console.log("bindAudioEvent")
    console.log(player.value)
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
    const startY = e.clientY;
    const startHeight = drawerRef.value.clientHeight;
    const onMouseMove = (e) => {
        const diff = e.clientY - startY;
        if (startHeight - diff < 40) return;
        if (startHeight - diff > window.innerHeight * 0.8) return;
        drawerRef.value.style.height = `${startHeight - diff}px`;
    };
    const onMouseUp = () => {
        window.removeEventListener('mousemove', onMouseMove);
        window.removeEventListener('mouseup', onMouseUp);
    };
    window.addEventListener('mousemove', onMouseMove);
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