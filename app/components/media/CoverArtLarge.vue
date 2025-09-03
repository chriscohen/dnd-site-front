<script setup lang="ts">
const props = defineProps({
    coverImage: { type: Object as () => IMedia, required: true },
    name: { type: String, required: true },
    class: { type: String, default: '' },
});
</script>

<template>
    <img
        :src="props.coverImage.url"
        :alt="props.name + ' cover image'"
        :class="'cover-art-large hover:scale-105 transition-all duration-500' + props.class"
    >
</template>

<style scoped lang="scss">
@use '~/assets/css/mixins';

.cover-art-large {
    max-width: 40rem;

    @include mixins.drop-shadow;
    @include mixins.rotate-towards;
}
</style>
