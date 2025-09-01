<script setup lang="ts">
import BadgeBase from "~/components/badges/BadgeBase.vue";

const props = defineProps({
    edition: { type: String, required: true }
})

</script>

<template>
    <BadgeBase :label="props.edition" color="red-600"/>
</template>
