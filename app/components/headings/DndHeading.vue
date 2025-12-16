<script setup lang="ts">
const props = defineProps<{
    borderColor?: string
    class?: string,
    size?: string
}>();

const staticClasses = 'font-[mrs-eaves] uppercase text-3xl border-b';
const variableClasses = [
    staticClasses,
    props.class,
    props.borderColor ? 'border-' + props.borderColor : 'border-gray-400'
].join(' ');
const headingSize = props.size ?? '1';
</script>

<template>
    <h1 v-if="headingSize === '1'" :class="variableClasses">
        <slot/>
    </h1>
    <h2 v-else-if="headingSize === '2'" :class="variableClasses">
        <slot/>
    </h2>
    <h3 v-else-if="headingSize === '3'" :class="variableClasses">
        <slot/>
    </h3>
    <h4 v-else-if="headingSize === '4'" :class="variableClasses">
        <slot/>
    </h4>
    <h5 v-else-if="headingSize === '5'" :class="variableClasses">
        <slot/>
    </h5>
    <h6 v-else-if="headingSize === '6'" :class="variableClasses">
        <slot/>
    </h6>
</template>
