<script lang="ts" setup>
const props = defineProps({
    sourcebook: { type: Object as () => ISourcebook, required: true }
})
</script>

<template>
    <div class="max-h-[320px] max-w-[256px]">
        <img class="max-h-[320px] max-w-[256px]" :src="props.sourcebook.cover_image.url" alt="cover image">
    </div>
</template>
