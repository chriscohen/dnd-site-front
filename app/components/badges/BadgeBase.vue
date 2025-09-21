<script setup lang="ts">
const props = defineProps<{
    class: string
    label?: string
    extraText?: string
}>();
</script>

<template>
    <div :class="'badge ' + props.class">
        {{ props.label }}
    </div>
</template>

<style scoped lang="scss">
@use '~/assets/css/badges';
</style>
