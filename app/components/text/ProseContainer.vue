<script setup lang="ts">
const props = defineProps({
    text: { type: String, required: true },
    textSize: { type: String, default: '' },
    class: { type: String, default: '' },
})
</script>

<template>
    <div class="prose" v-html="props.text"/>
</template>
