<script setup lang="ts">
const props = defineProps<{
    type?: string
    class?: string
    bgColor?: string
    label?: string
    extraText?: string
    roundedCorners?: string
}>();

const classes = [
    'badge',
    props.type ? props.type + '-badge' : null,
    props.bgColor ? 'bg-' + props.bgColor : null,
    props.roundedCorners == 'all' ? 'rounded' : null,
    props.roundedCorners == 'left' ? 'rounded-left' : null,
    props.roundedCorners == 'right' ? 'rounded-right' : null,
];
</script>

<template>
    <span :class="classes">
        {{ label }}
    </span>
</template>

<style scoped lang="scss">
@use '~/assets/css/badges';
</style>
