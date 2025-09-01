<script setup lang="ts">
import LabelBase from "~/components/labels/LabelBase.vue";

const props = defineProps({
    binding: { type: String, required: true },
});
</script>

<template>
    <LabelBase label-type="book-binding" color="blue">
        <span class="uppercase block text-center">{{ props.binding }}</span>
    </LabelBase>
</template>
