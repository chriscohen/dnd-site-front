<script setup lang="ts">
const props = defineProps<{
    class?: string
}>();
</script>

<template>
    <div class="card bg-black/80 px-4 py-2 rounded-xl" :class="props.class">
        <slot/>
    </div>
</template>
