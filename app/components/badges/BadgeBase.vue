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
    <UTooltip :disabled="!extraText" :text="extraText" :ui="{ content: 'text-gray-800' }">
        <span
            :class="classes"
            class="text-sm px-2 uppercase text-nowrap"
        >
            {{ label }}
        </span>
    </UTooltip>
</template>

<style scoped lang="scss">
@use '~/assets/css/default/badges';
</style>
