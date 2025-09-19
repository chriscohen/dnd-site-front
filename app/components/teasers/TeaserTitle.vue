<script setup lang="ts">
const props = defineProps<{
    title?: string,
    subtitle?: string
}>();
</script>

<template>
    <header class="teaser-title">
        <h3>{{ title }}</h3>
        <span v-if="subtitle !== null">{{ subtitle }}</span>
    </header>
</template>

<style scoped lang="scss">
@use '~/assets/css/colors';
@use '~/assets/css/fonts';
@use '~/assets/css/mixins';
@use '~/assets/css/variables';

.teaser-title {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    background-color: colors.$black-80;
    min-height: 5rem;

    h3 {
        font-size: 2rem;
        line-height: 1.75rem;
        padding: 0.5rem;
        text-align: center;
        @include mixins.text-shadow;
    }
    span {
        display: block;
        font-size: 1.2rem;
        text-align: center;
        @include fonts.mrs-eaves;
        margin-top: -1rem;
    }
}
</style>
