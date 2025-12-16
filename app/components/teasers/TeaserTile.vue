<script setup lang="ts">
const props = defineProps<{
    href?: string
}>();
</script>

<template>
    <NuxtLink v-if="href" :to="href" class="teaser block aspect-square">
        <slot/>
    </NuxtLink>

    <div v-else class="teaser block aspect-square">
        <slot/>
    </div>
</template>

<style scoped lang="scss">
@use '~/assets/css/default/colors';
@use 'sass:color';

.teaser {
    box-shadow: 5px 5px 15px 5px rgba(0, 0, 0, 0.75);

    transition:
        color 250ms ease-in-out,
        background 500ms ease-in-out;

    &:hover {
        background: color.scale(colors.$gray-950, $alpha: -20%);
        color: colors.$text-hover;
    }
}
</style>
