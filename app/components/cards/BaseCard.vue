<script setup lang="ts">
const props = defineProps<{
    class?: string
    shadow?: 'none' | 'sm' | 'md' | 'lg' | 'xl'
    tabs?: boolean
}>();

const shadow = props.shadow ?? 'lg';

const classes = [
    props.class,
    props.tabs ? 'rounded-b-xl rounded-tr-xl' : 'rounded-xl',
    `shadow-${shadow}`,
].join(' ');
</script>

<template>
    <div class="card bg-black/80 px-4 py-2" :class="classes">
        <slot/>
    </div>
</template>
