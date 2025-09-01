<script lang="ts" setup>

const props = defineProps({
    data: { type: Object as () => ISourcebook, required: true },
})
</script>

<template>
    <div class="sourcebook-teaser p-4 bg-gray-950/50 transition duration-500 ease-in-out hover:bg-gray-950/40">
        <MediaCoverImage :sourcebook="props.data" />
        <h3 class="text-center text-lg mt-3 max-w-[256px]">{{ props.data.name }}</h3>
    </div>
</template>
