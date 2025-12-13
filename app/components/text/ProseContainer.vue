<script setup lang="ts">
const props = defineProps<{
    class?: string
}>();
</script>

<template>
    <div class="prose" :class="props.class">
        <slot/>
    </div>
</template>
