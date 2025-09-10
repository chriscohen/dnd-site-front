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
@use '~/assets/css/mixins/mixins';
@use '~/assets/css/variables/variables';

.cover-art-large {
    border-radius: 0.5rem;
    max-width: 40rem;
    scale: 100%;
    transition: variables.$default-delay ease-in-out;

    &:hover {
        scale: 103%
    }

    @include mixins.drop-shadow;
    @include mixins.rotate-towards(5deg);
}
</style>
