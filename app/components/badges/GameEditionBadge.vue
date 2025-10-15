<script setup lang="ts">
import BadgeBase from "~/components/badges/BadgeBase.vue";

const props = defineProps<{
    edition?: string
    roundedCorners?: string
}>();

const classMap = [
    {name: '0e', class: 'edition-0'},
    {name: '1e', class: 'edition-1'},
    {name: '2e', class: 'edition-2'},
    {name: '3e', class: 'edition-3'},
    {name: '3.5', class: 'edition-3'},
    {name: '4e', class: 'edition-4'},
    {name: '5e (2014)', class: 'edition-5'},
    {name: '5e (2024)', class: 'edition-2024'},
];
// Eg: bg-edition-2024
const className = classMap.find((item) => item.name == props.edition)?.class ?? '';

</script>

<template>
    <BadgeBase
        type="edition"
        :label="edition"
        :bg-color="className"
        :rounded-corners="roundedCorners"
    />
</template>

<style scoped lang="scss">
@use '~/assets/css/backgrounds';
</style>
