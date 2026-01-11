<script setup lang="ts">
const props = defineProps<{
    class?: string
    opacity?: string
    shadow?: 'none' | 'sm' | 'md' | 'lg' | 'xl'
    tabs?: boolean
    to?: string
}>();

const shadow = props.shadow ?? 'lg';

const classes = [
    props.class,
    'bg-black/' + (props.opacity ?? '75'),
    props.tabs ? 'rounded-b-xl rounded-tr-xl' : 'rounded-xl',
    `shadow-${shadow}`,
].join(' ');
</script>

<template>
    <component
        :is="to ? 'NuxtLink' : 'div'"
        class="card px-4 py-2"
        :class="classes"
    >
        <slot/>
    </component>
</template>
