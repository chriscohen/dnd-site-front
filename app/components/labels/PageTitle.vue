<script setup lang="ts">
import BackButton from "~/components/buttons/BackButton.vue";
import HorizontalDivider from "~/components/dividers/HorizontalDivider.vue";

const props = defineProps<{
    backTo?: string
    loading?: boolean
    title?: string
}>();
</script>

<template>
    <div id="page-title" class="w-full flex justify-between items-center border-b bg-gray-900">
        <UFieldGroup v-if="backTo" class="mr-4">
            <BackButton :to="backTo" size="3rem"/>
        </UFieldGroup>

        <div class="w-full mb-2">
            <h1 v-if="!loading" class="font-[Modesto] overflow-ellipsis text-4xl md:text-6xl mt-1 md:mt-2">
                {{ title }}
            </h1>
            <USkeleton v-else class="h-16 md:h-24 w-lg"/>

            <h3 v-if="$slots.subtitle" class="text-sm sm:text-md lg:text-xl font-[mrs eaves] uppercase">
                <slot name="subtitle"/>
            </h3>
        </div>
        <div class="page-title-labels hidden sm:block">
            <slot name="labels"/>
        </div>

        <slot name="side"/>
        <HorizontalDivider/>
    </div>
</template>
