<script setup lang="ts">
const props = defineProps<{
    class?: string
    prose: string
}>();
</script>

<template>
    <div
        class="prose rounded-lg bg-black/50 text-lg lg:text-xl px-4 py-2 md:px-8 md:py-4 font-light"
        :class="props.class"
        v-html="prose"
    />
</template>
