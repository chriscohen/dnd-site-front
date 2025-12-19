<script setup lang="ts">
const props = defineProps<{
    borderColor?: string
    class?: string,
    size?: string
}>();

const divClasses = 'border-b';
const divVariableClasses = [
    props.borderColor ? 'border-' + props.borderColor : 'border-gray-400'
];
const staticClasses = 'font-[mrs-eaves] uppercase text-3xl';
const variableClasses = [
    staticClasses,
    props.class
].join(' ');
const headingSize = props.size ?? '1';
</script>

<template>
    <div v-if="headingSize === '1'" :class="divVariableClasses + ' ' + divClasses">
        <h1 :class="variableClasses">
            <slot/>
        </h1>
        <slot name="subtitle"/>
    </div>
    <div v-else-if="headingSize === '2'" :class="divVariableClasses + ' ' + divClasses">
        <h2 :class="variableClasses">
            <slot/>
        </h2>
        <slot name="subtitle"/>
    </div>
    <div v-else-if="headingSize === '3'" :class="divVariableClasses + ' ' + divClasses">
        <h3 :class="variableClasses">
            <slot/>
        </h3>
        <slot name="subtitle"/>
    </div>
    <div v-else-if="headingSize === '4'" :class="divVariableClasses + ' ' + divClasses">
        <h4 :class="variableClasses">
            <slot/>
        </h4>
        <slot name="subtitle"/>
    </div>
    <div v-else-if="headingSize === '5'" :class="divVariableClasses + ' ' + divClasses">
        <h5 :class="variableClasses">
            <slot/>
        </h5>
        <slot name="subtitle"/>
    </div>
    <div v-else-if="headingSize === '6'" :class="divVariableClasses + ' ' + divClasses">
        <h6 :class="variableClasses">
            <slot/>
        </h6>
    </div>
</template>
