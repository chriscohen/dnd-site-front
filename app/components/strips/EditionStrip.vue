<script setup lang="ts">
import { formatEdition } from "~/utils/utils";

const props = defineProps<{
    edition: string
}>();

const className = ['bg-' + editionToClass(props.edition) + '-active'];
</script>

<template>
    <aside class="edition-strip" :class="className"/>
</template>

<style lang="scss">
@use '~/assets/css/backgrounds';

.edition-strip {
    display: block;
    height: 0.375rem;
    margin-top: auto;
}
</style>
