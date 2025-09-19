<script setup lang="ts">
const props = defineProps({
    loading: { type: Boolean, required: true },
    coverImage: { type: Object as () => IMedia, default: null },
    name: { type: String, default: null },
    class: { type: String, default: '' },
});
</script>

<template>
    <img
        v-if="!props.loading"
        :src="props.coverImage.url"
        :alt="props.name + ' cover image'"
        :class="'cover-art-large hover:scale-105 transition-all duration-500' + props.class"
    >
    <div v-else class="cover-art-large"/>
</template>

<style scoped lang="scss">
@use '../../assets/css/mixins';
@use '../../assets/css/variables';

.cover-art-large {
    border-radius: 0.5rem;
    width: 40rem;
    max-width: 50%;
}

div.cover-art-large {
    @include mixins.loading;
    height: 60rem;
}
img.cover-art-large {
    scale: 100%;
    transition: variables.$default-delay ease-in-out;

    &:hover {
        scale: 103%
    }

    @include mixins.drop-shadow;
    @include mixins.rotate-towards(5deg);
}
</style>
