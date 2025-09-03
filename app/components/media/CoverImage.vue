<script lang="ts" setup>
const props = defineProps({
    sourcebook: { type: Object as () => ISourcebook, required: true }
})
</script>

<template>
    <div class="max-h-[320px] max-w-[256px]">
        <img class="media-cover-image max-h-[320px] max-w-[256px]" :src="props.sourcebook.cover_image.url" alt="cover image">
    </div>
</template>

<style scoped lang="scss">
@use '~/assets/css/mixins';

.media-cover-image {
    max-height: 20rem;
    max-width: 16rem;
    margin: 0 auto;
    transition:
        transform 250ms ease-in-out,
        box-shadow 500ms ease-in-out;

    &:hover {
        transform: scale(1.05);
    }
}
</style>
