<script setup lang="ts">
const props = defineProps({
    coverImage: { type: Object as () => IMedia, required: true },
    name: { type: String, required: true },
    class: { type: String, default: '' },
});
</script>

<template>
    <img
        :src="props.coverImage.url"
        :alt="props.name + ' cover image'"
        :class="'d-shadow transform-perspective rotate-x-10 max-w-[30%] hover:scale-105 transition-all duration-500' + props.class"
    >
</template>
