<script setup lang="ts">
import LabelBase from "~/components/labels/LabelBase.vue";

const props = defineProps({
    isbn10: { type: String, default: '' },
    isbn13: { type: String, default: '' },
})
</script>

<template>
    <LabelBase label-type="isbn-label" color="gray" brightness="800" opacity="50">
        <span class="block">ISBN-10</span>
        <span class="block">{{ props.isbn10 }}</span>

        <span class="block">ISBN-13</span>
        <span class="block">{{ props.isbn13 }}</span>
    </LabelBase>
</template>
