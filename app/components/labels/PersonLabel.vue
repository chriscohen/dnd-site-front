<script setup lang="ts">
const props = defineProps<{
    class?: string
    link?: boolean
    person?: PersonApiResponse
}>();
</script>

<template>
    <span v-if="person" :class="props.class">
        {{ person.firstName }}
        {{ person.lastName }}
    </span>
</template>
