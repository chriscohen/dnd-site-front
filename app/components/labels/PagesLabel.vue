<script lang="ts" setup>
import LabelBase from "~/components/labels/LabelBase.vue";

const props = defineProps({
    pages: { type: Number, required: true },
})
</script>

<template>
    <LabelBase label-type="pages-label" color="gray" opacity="10">
        <span class="text-6xl font-[Mrs_Eaves] block text-center">{{ props.pages }}</span>
        <span class="uppercase block text-center text-2xl">Pages</span>
    </LabelBase>
</template>
