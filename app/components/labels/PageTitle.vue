<script setup lang="ts">
import BackButton from "~/components/buttons/BackButton.vue";
import HorizontalDivider from "~/components/dividers/HorizontalDivider.vue";

const props = defineProps<{
    title?: string
    backTo?: string
    underline?: boolean
}>();
</script>

<template>
    <div class="page-title">
        <div class="page-title-content flex align-baseline md:mb-4 gap-8">
            <UButtonGroup v-if="backTo" class="buttons">
                <BackButton :to="backTo" size="3rem"/>
            </UButtonGroup>

            <div class="page-title-main">
                <h1 class="font-[Modesto] overflow-ellipsis text-4xl md:text-6xl mt-1 md:mt-2">
                    {{ title }}
                </h1>
                <h3 v-if="$slots.subtitle"><slot name="subtitle"/></h3>
            </div>
            <div class="page-title-labels">
                <slot name="labels"/>
            </div>

            <slot name="side"/>
        </div>
        <HorizontalDivider v-if="underline"/>
    </div>
</template>

<style scoped lang="scss">
@use '~/assets/css/default/colors';
@use '~/assets/css/default/fonts';
@use '~/assets/css/default/mixins';

.page-title {
    @include fonts.modesto;
    width: 100%;
    overflow: hidden;

    &.underline {
        border-bottom: 1px solid colors.$gray-400;
    }
}
.page-title-content {
    h3 {
        @include fonts.mrs-eaves
    }
    .page-title-labels {
        margin-left: auto;
        display: flex;
        margin-bottom: 0.5rem;
    }
}
.loading {
    height: 3rem;
}
</style>
