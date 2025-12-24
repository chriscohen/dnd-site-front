<script setup lang="ts">

import type {Category} from "~/classes/category";

const props = defineProps<{
    category: Category
    color?: string
}>();
</script>

<template>
    <a
        :href="'/category/' + category.slug"
        class="category-badge badge"
        :class="[color ? 'badge-' + color : 'badge-white']"
    >
        {{ category.name }}
    </a>
</template>

<style lang="scss">
@use '~/assets/css/default/badges';
</style>
