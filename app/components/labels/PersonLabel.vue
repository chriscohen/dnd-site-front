<script setup lang="ts">
import type {Person} from "~/classes/person";

const props = defineProps<{
    class?: string
    link?: boolean
    person?: Person
}>();
</script>

<template>
    <span v-if="person" :class="props.class" class="text-gray-300">
        {{ person.firstName }}
        {{ person.lastName }}
    </span>
</template>
