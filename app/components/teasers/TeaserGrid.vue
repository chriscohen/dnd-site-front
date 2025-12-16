<script setup lang="ts">
const props = defineProps<{
    class?: string
}>();
</script>

<template>
    <section
        class="teaser-grid grid w-full gap-4 grid-cols-[repeat(auto-fill,minmax(150px,1fr))]"
        :class="props.class"
    >
        <slot/>
    </section>
</template>
