<script setup lang="ts">
import BackButton from "~/components/buttons/BackButton.vue";

const props = defineProps<{
    backTo?: string
    loading?: boolean
    title?: string
}>();
</script>

<template>
    <div
        id="page-title"
        class="flex gap-4 justify-between items-center border-b-2 border-red-800 pr-64 pl-4
            bg-linear-to-r from-black/80 from-75% to-black/0"
    >
        <UFieldGroup v-if="backTo">
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

        <div class="hidden sm:block">
            <slot name="labels"/>
        </div>

        <slot name="side"/>
        <hr/>
    </div>
</template>
