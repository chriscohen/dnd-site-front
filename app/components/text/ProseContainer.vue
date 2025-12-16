<script setup lang="ts">
const props = defineProps<{
    class?: string
    prose: string
}>();
</script>

<template>
    <div class="prose rounded-lg bg-black/50 text-lg lg:text-xl p-4 md:p-8" :class="props.class" v-html="prose"/>
</template>
