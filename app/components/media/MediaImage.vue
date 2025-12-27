<script setup lang="ts">
import type {Media} from "~/classes/media";

const props = defineProps<{
    media?: Media
    name?: string
    class?: string
}>();
</script>

<template>
    <img
        v-if="media"
        :src="media?.url"
        :alt="(name ?? media?.name ?? 'image') + ' cover image'"
        class="media-large block w-full"
    >
</template>

<style scoped lang="scss">
@use '~/assets/css/default/mixins';
@use '~/assets/css/default/variables';

.media-large {
    border-radius: 0.5rem;
    height: initial;
    @include mixins.drop-shadow;
}
</style>
