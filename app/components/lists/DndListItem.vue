<script setup lang="ts">
const props = defineProps<{
    to?: string
}>();
</script>

<template>
    <li
        class="list-item flex items-center gap-4 font-bold py-1 pr-4 pl-2 m-0 hover:bg-highlight transition-colors
            duration-100 ease-in-out"
    >
        <NuxtLink v-if="to" :to="to" class="block">
            <slot/>
        </NuxtLink>
        <template v-else><slot/></template>
    </li>
</template>

<style lang="scss">
@use '~/assets/css/default/colors';

li.list-item:hover > a {
    color: colors.$black;
}
</style>
