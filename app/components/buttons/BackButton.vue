<script setup lang="ts">
const props = defineProps<{
    to: string,
    size: string
}>();

const linkStyle = {
    width: props.size,
    height: props.size
};
</script>

<template>
    <NuxtLink to="/" class="back-button" :style="linkStyle">
        <Icon
            name="lucide:chevron-left"
            class="text-gray-500 hover:text-gray-200 hover:animate-bounce-left" :size="size" />
    </NuxtLink>
</template>

<style lang="scss">
@use '~/assets/css/colors';
@use '~/assets/css/variables';

.back-button {
    display: block;
    background-color: colors.$bg-dimmed;
    color: colors.$text-dark;
    border-radius: 50vh;
    transition: background variables.$default-delay ease-in-out;

    &:hover {
        background-color: colors.$bg-hover;
    }
}
</style>
