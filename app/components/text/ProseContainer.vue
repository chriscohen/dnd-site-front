<script setup lang="ts">
const props = defineProps<{
    class?: string
    prose: string
}>();
</script>

<template>
    <div class="prose bg-black/50 text-lg p-4 md:p-8" :class="props.class" v-html="prose"/>
</template>

<style scoped lang="scss">

</style>
