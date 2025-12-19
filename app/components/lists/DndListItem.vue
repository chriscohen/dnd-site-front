<script setup lang="ts">
const props = defineProps<{
    item: any
}>();
</script>

<template>
    <li
        class="flex hover:bg-gray-50 group cursor-pointer h-[3rem] items-center px-4 py-1 duration-100 ease-in-out"
    >
        <slot/>
    </li>
</template>
