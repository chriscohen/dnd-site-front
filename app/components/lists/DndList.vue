<script setup lang="ts">
const props = defineProps<{
    class?: string
}>();

const dndListMoreRef = ref<HTMLElement | null>(null);

// Allow parent elements to access the ref.
defineExpose({ dndListMoreRef });
</script>

<template>
    <ul ref="dndListMoreRef" class="overflow-scroll h-full mb-4" :class="props.class">
        <slot/>
    </ul>
</template>
