<script setup lang="ts">
const props = defineProps<{
    edition: ISourcebookEdition
}>();

const open = ref(true);
</script>

<template>
    <UCollapsible v-if="edition?.credits" v-model="open">
        <h2 class="font-[mrs-eaves] text-4xl uppercase border-b-2 border-red-800 flex justify-between cursor-pointer">
            Credits
            <UButton></UButton>
        </h2>
    </UCollapsible>
</template>
