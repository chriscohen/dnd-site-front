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
@use '~/assets/css/mixins/mixins';

.media-cover-image {
    max-height: 20rem;
    width: 16rem;
    margin: 0 auto;
    position: relative;
}
</style>
