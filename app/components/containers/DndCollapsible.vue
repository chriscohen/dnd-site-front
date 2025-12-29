<script setup lang="ts">
import DndHeading from "~/components/headings/DndHeading.vue";

const props = defineProps<{
    class?: string
    startOpen?: boolean
    title: string
}>();


</script>

<template>
    <UCollapsible

        class="group rounded-lg bg-black/50 text-lg px-4 py-2 cursor-pointer"
        :class="props?.class"
    >
        <DndHeading size="2" underline-color="red-800" underline class="flex w-full justify-between cursor-pointer">
            {{ title }}

            <template #controls/>
        </DndHeading>

        <template #content>
            <slot/>
        </template>
    </UCollapsible>
</template>
