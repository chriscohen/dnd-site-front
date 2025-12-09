<script setup lang="ts">
const props = defineProps({
    coverImage: { type: Object as () => IMedia, default: null },
    name: { type: String, default: null },
    class: { type: String, default: '' },
});
</script>

<template>
    <img
        :src="props?.coverImage?.url"
        :alt="props?.name + ' cover image'"
        :class="'media-large hover:scale-105 transition-all duration-500' + props?.class"
    >
</template>

<style scoped lang="scss">
@use '~/assets/css/default/mixins';
@use '~/assets/css/default/variables';

.media-large {
    border-radius: 0.5rem;
    width: 40rem;
    max-width: 50%;
}

div.media-large {
    @include mixins.loading;
    height: 60rem;
}
img.media-large {
    scale: 100%;
    transition: variables.$default-delay ease-in-out;

    &:hover {
        scale: 103%
    }

    @include mixins.drop-shadow;
    @include mixins.rotate-towards(5deg);
}
</style>
