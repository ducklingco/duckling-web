<template>
    <Teleport to="body">
        <!-- Emit closeDialog if click elsewhere -->
        <div @click="closeDialog" class="fixed inset-0 z-0 bg-black bg-opacity-50"></div>
    </Teleport>
    <div
        class="absolute left-0 z-10 flex flex-col items-start justify-center gap-1 p-1 m-auto mt-2 text-lg bg-white rounded-sm top-full">
        <div class="text-sm text-left text">Share on Social</div>
        <div v-if="socialShares?.length != 0" class="flex gap-2">
            <SocialShare v-for="social of socialShares" :network="social?.network" :url="social?.url"
                :key="social?.name" :styled="true" :label="false" />

        </div>
    </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';
const props = defineProps<{
    card: any;
}>();
const emit = defineEmits(['close']);
const closeDialog = () => {
    emit('close');
};

const route = useRoute();


const title = computed(() => props.card?.title);
// Extract route for sharing
const url = computed(() => {
    const baseUrl = window.location.origin;
    const fullUrl = `${baseUrl}${route.path}`;
    return fullUrl;
});
const coverImg = computed(() => props.card?.cover_image?.path);

const socialShares = [
    {
        network: 'facebook',
        url: url.value,
        title: title.value,
        user: 'twitter_user',
        hashtags: 'duckling,duck',
        image: coverImg.value,
    },
    {
        network: 'twitter',
        url: url.value,
        title: title.value,
        user: 'twitter_user',
        hashtags: 'duckling,duck',
        image: coverImg.value,
    },
    {
        network: 'linkedin',
        url: url.value,
        title: title.value,
        user: 'twitter_user',
        hashtags: 'duckling,duck',
        image: coverImg.value,
    },
];

socialShares.map((social => useSocialShare(social)));
</script>