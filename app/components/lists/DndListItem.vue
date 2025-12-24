<script setup lang="ts">
const props = defineProps<{
    to?: string
}>();
</script>

<template>
    <li
        class="flex hover:bg-gray-50 group cursor-pointer h-12 items-center px-4 py-1 duration-100 ease-in-out"
    >
        <NuxtLink v-if="to" :to="to"><slot/></NuxtLink>
        <slot v-else/>
    </li>
</template>
