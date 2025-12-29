<script setup lang="ts">
import type {Media} from "~/classes/media";

const props = defineProps<{
    class?: string
    loading?: boolean
    media?: Media
    name?: string
    placeholder?: string
    rounded?: boolean
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
