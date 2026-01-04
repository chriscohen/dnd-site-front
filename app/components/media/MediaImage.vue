<script setup lang="ts">
import type {Media} from "~/classes/media";
import MediaPlaceholder from "~/components/media/MediaPlaceholder.vue";

const props = defineProps<{
    class?: string
    loading?: boolean
    media?: Media
    name?: string
    placeholder?: string
    rounded?: boolean
    transform?: string
}>();

const classes = [
    props.class,
    props.rounded ? 'rounded-xl' : ''
].join(' ');

const modifiers = props.transform ? { named: props.transform } : {};
</script>

<template>
    <template v-if="loading">
        <USkeleton class="w-full aspect-square"/>
    </template>

    <template v-else>
        <NuxtImg
            v-if="media"
            provider="imagekit"
            :src="media?.url"
            :alt="(name ?? media?.name ?? 'image') + ' cover image'"
            class="max-w-full h-auto"
            :class="classes"
            :modifiers="modifiers"
        />
        <MediaPlaceholder v-else :icon="'i-lucide-' + (placeholder ?? 'image-off')"/>
    </template>
</template>
