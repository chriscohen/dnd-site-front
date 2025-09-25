<script setup lang="ts">
const props = defineProps({
    class: { type: String, default: '' }
})
</script>

<template>
    <div class="horizontal-divider"/>
</template>

<style lang="scss">
@use '~/assets/css/colors';

div.horizontal-divider {
    height: 1px;
    background-image: linear-gradient(
        to right,
        transparent,
        colors.$gray-400 30%,
        colors.$gray-400 70%,
        transparent 100%
    );
}
</style>
