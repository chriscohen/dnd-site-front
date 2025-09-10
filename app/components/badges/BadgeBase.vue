<script setup lang="ts">
const props = defineProps({
    class: { type: String, default: '' },
    label: { type: String, required: true },
    extraText: { type: String, required: false, default: '' }
});
</script>

<template>
    <div :class="'badge ' + props.class">
        {{ props.label }}
    </div>
</template>

<style scoped lang="scss">
@use '~/assets/css/badges';
</style>
