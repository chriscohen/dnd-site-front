<script setup lang="ts">
const props = defineProps<{
    loading: boolean
    spell: ISpell
}>();
</script>

<template>
    <img
        v-if="!loading"
        class="spellbook-image"
        :src="spell.image.url"
        :alt="props.spell.name + ' preview image'"
    >
</template>

<style lang="scss" scoped>
@use '~/assets/css/variables';
@use '~/assets/css/mixins';

.spellbook-image {
    opacity: 1;
    position: absolute;
    top: 8rem;
    left: 55rem;
    width: 24rem;
    height: 24rem;
    transform: rotate(3deg);
    @include mixins.heavyShadow;
    animation-name: spellbookImage;
    animation-duration: calc(#{variables.$animation-duration} * 2);

    border-radius: 1rem;
}

@keyframes spellbookImage {
    0% {
        left: 25rem;
        opacity: 0;
    }
    50% {
        opacity: 0;
        left: 14rem;
    }
    100% {
        left: 37rem;
        opacity: 1;
    }
}
</style>
