<script setup lang="ts">
const props = defineProps({
    text: { type: String, required: true },
    textSize: { type: String, default: '' },
    class: { type: String, default: '' },
})
</script>

<template>
    <div :class="'prose bg-gray-950/80 p-4 font-light text-' + props.textSize + ' ' + props.class" v-html="props.text"/>
</template>
