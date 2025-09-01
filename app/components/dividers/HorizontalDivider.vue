<script setup lang="ts">
const props = defineProps({
    class: { type: String, default: '' }
})
</script>

<template>
    <div :class="'h-[1px] bg-linear-to-r from-gray-300/0 from-20% via-gray-300/100 to-gray-300/0 to-80% ' + props.class"/>
</template>
