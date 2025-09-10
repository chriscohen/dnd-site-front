<script setup lang="ts">
const props = defineProps({
    title: { type: String, required: true },
    subtitle: { type: String, default: null }
});
</script>

<template>
    <header class="teaser-title">
        <h3>{{ props.title }}</h3>
        <span v-if="props.subtitle !== null">{{ props.subtitle }}</span>
    </header>
</template>

<style scoped lang="scss">
@use '~/assets/css/fonts';
@use '~/assets/css/mixins/mixins';
@use '~/assets/css/variables/variables';

.teaser-title {
    position: absolute;
    bottom: 0;
    left: 0;
    width: variables.$teaser-width;
    @include mixins.backgroundBlack(0.75);

    h3 {
        font-size: 2rem;
        line-height: 1.75rem;
        padding: 0.5rem;
        text-align: center;
        @include mixins.text-shadow;
    }
    span {
        display: block;
        text-align: center;
        @include fonts.mrs-eaves;
        font-size: 125%;
        margin-top: -0.75rem;
    }
}
</style>
