<script setup lang="ts">
import BackButton from "~/components/buttons/BackButton.vue";
import HorizontalDivider from "~/components/dividers/HorizontalDivider.vue";

const props = defineProps<{
    title?: string
    backTo?: string
}>();
</script>

<template>
    <div id="page-title" class="w-full flex justify-between mb-4 border-b-1 bg-gray-900">
        <UButtonGroup v-if="backTo" class="buttons mt-4 mr-4">
            <BackButton :to="backTo" size="5rem"/>
        </UButtonGroup>

        <div class="w-full mb-2">
            <h1 class="font-[Modesto] overflow-ellipsis text-4xl md:text-6xl mt-1 md:mt-2">
                {{ title }}
            </h1>
            <h3 v-if="$slots.subtitle" class="text-md lg:text-2xl font-[mrs eaves] uppercase">
                <slot name="subtitle"/>
            </h3>
        </div>
        <div class="page-title-labels">
            <slot name="labels"/>
        </div>

        <slot name="side"/>
        <HorizontalDivider/>
    </div>
</template>

<style scoped lang="scss">
@use '~/assets/css/default/colors';
@use '~/assets/css/default/fonts';
@use '~/assets/css/default/mixins';

.loading {
    height: 3rem;
}
</style>
