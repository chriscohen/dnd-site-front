<script setup lang="ts">
import EditionStrip from "~/components/strips/EditionStrip.vue";

const props = defineProps<{
    title?: string,
    subtitle?: string,
    edition?: string
    rarity?: string
}>();

console.log('edition' + props.edition);

const classes = [
    'teaser-title',
    props.rarity ? 'border-' + props.rarity : null,
]
</script>

<template>
    <header :class="classes">
        <h3>{{ title }}</h3>
        <span v-if="subtitle" class="subtitle">{{ subtitle }}</span>
        <EditionStrip v-if="edition" :edition="edition"/>
    </header>
</template>

<style lang="scss">
@use '~/assets/css/default/teasers';
</style>
