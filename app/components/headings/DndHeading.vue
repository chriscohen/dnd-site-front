<script setup lang="ts">
const props = defineProps<{
    underlineColor?: string
    class?: string,
    loading?: boolean
    size?: string,
    underline?: boolean
}>();

const divClasses = props.underline ? 'border-b' : '';

const divVariableClasses = [
    props.class,
    props.underlineColor ? 'border-' + props.underlineColor : 'border-gray-400'
].join(' ');
const staticClasses = 'font-eaves';
const variableClasses = [
    staticClasses
].join(' ');
const headingSize = props.size ?? '1';
</script>

<template>
    <div v-if="headingSize === '1'" :class="divVariableClasses + ' ' + divClasses">
        <h1 :class="variableClasses">
            <template v-if="loading">
                <USkeleton class="h-[1rem] w-full"/>
            </template>
            <template v-else><slot/></template>
        </h1>
        <slot name="subtitle"/>
    </div>
    <div v-else-if="headingSize === '2'" :class="divVariableClasses + ' ' + divClasses">
        <h2 :class="variableClasses" class="text-4xl">
            <template v-if="loading">
                <USkeleton class="h-[1rem] w-full"/>
            </template>
            <template v-else><slot/></template>
        </h2>
        <slot name="subtitle"/>
    </div>
    <div v-else-if="headingSize === '3'" :class="divVariableClasses + ' ' + divClasses">
        <h3 :class="variableClasses" class="text-3xl">
            <template v-if="loading">
                <USkeleton class="h-[1rem] w-full"/>
            </template>
            <template v-else><slot/></template>
        </h3>
        <slot name="subtitle"/>
    </div>
    <div v-else-if="headingSize === '4'" :class="divVariableClasses + ' ' + divClasses">
        <h4 :class="variableClasses" class="text-2xl">
            <template v-if="loading">
                <USkeleton class="h-[1rem] w-full"/>
            </template>
            <template v-else><slot/></template>
        </h4>
        <slot name="subtitle"/>
    </div>
    <div v-else-if="headingSize === '5'" :class="divVariableClasses + ' ' + divClasses">
        <h5 :class="variableClasses" class="text-xl">
            <template v-if="loading">
                <USkeleton class="h-[1rem] w-full"/>
            </template>
            <template v-else><slot/></template>
        </h5>
        <slot name="subtitle"/>
    </div>
    <div v-else-if="headingSize === '6'" :class="divVariableClasses + ' ' + divClasses">
        <h6 :class="variableClasses" class="text-lg">
            <template v-if="loading">
                <USkeleton class="h-[1rem] w-full"/>
            </template>
            <template v-else><slot/></template>
        </h6>
    </div>
</template>
