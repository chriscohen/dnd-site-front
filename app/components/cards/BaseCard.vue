<script setup lang="ts">
const props = defineProps<{
    class?: string
    tabs?: boolean
}>();

const classes = props.class + ' ' + (props.tabs ?
    'rounded-b-xl rounded-tr-xl' :
    'rounded-xl'
);
</script>

<template>
    <div class="card bg-black/80 px-4 py-2" :class="classes">
        <slot/>
    </div>
</template>
