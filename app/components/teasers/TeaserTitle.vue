<script setup lang="ts">
import EditionStrip from "~/components/strips/EditionStrip.vue";

const props = defineProps<{
    title?: string,
    subtitle?: string,
    edition?: string
}>();
</script>

<template>
    <header class="teaser-title">
        <h3>{{ title }}</h3>
        <span v-if="subtitle" class="subtitle">{{ subtitle }}</span>
        <EditionStrip v-if="edition" :edition="edition"/>
    </header>
</template>

<style lang="scss">
@use '~/assets/css/components/teasers';
</style>
