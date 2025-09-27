<script setup lang="ts">

const props = defineProps<{
    category: ICategory
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
@use '~/assets/css/badges';
</style>
