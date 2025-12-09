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
    <NuxtLink :to="to" class="back-button" :style="linkStyle">
        <Icon name="lucide:chevron-left" :size="size" />
    </NuxtLink>
</template>

<style lang="scss">
@use '~/assets/css/default/colors';
@use '~/assets/css/default/variables';

.back-button {
    display: block;
    color: colors.$text;
    border-radius: 50vh;
    transition: background variables.$default-delay ease-in-out;

    &:hover {
        background-color: colors.$gray-100;
        color: colors.$text-dark;
    }
}
</style>
