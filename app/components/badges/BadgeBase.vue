<script setup lang="ts">
const props = defineProps({
    label: { type: String, required: true },
    extraText: { type: String, required: false, default: '' }
});
</script>

<template>
    <div class="px-2 rounded-full flex gap-2 font-[Mrs_Eaves]">
        {{ props.label }}
    </div>
</template>
