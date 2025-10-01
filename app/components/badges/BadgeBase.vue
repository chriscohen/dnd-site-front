<script setup lang="ts">
const props = defineProps<{
    type?: string
    class?: string
    bgColor?: string
    label?: string
    extraText?: string
}>();

const classes = [
    'badge',
    props.type ? props.type + '-badge' : null,
    props.bgColor ? 'bg-' + props.bgColor : null,
];
</script>

<template>
    <div :class="classes">
        {{ label }}
    </div>
</template>

<style scoped lang="scss">
@use '~/assets/css/badges';
</style>
