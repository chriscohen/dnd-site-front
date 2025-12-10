<script setup lang="ts">
const props = defineProps({
    media: { type: Object as () => IMedia, default: null },
    name: { type: String, default: null },
    class: { type: String, default: '' },
});
</script>

<template>
    <img
        :src="media?.url"
        :alt="name + ' cover image'"
        class="media-large block w-full sm:w-1/3"
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
