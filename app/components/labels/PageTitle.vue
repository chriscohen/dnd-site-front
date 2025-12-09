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
        <div class="page-title-content">
            <div v-if="backTo" class="buttons">
                <BackButton :to="backTo" size="3rem"/>
            </div>

            <div class="page-title-main">
                <h1>{{ title }}</h1>
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

    &.underline {
        border-bottom: 1px solid colors.$gray-400;
    }
}
.page-title-content {
    display: flex;
    align-items: baseline;
    margin-bottom: 1rem;
    gap: 2rem;

    h1 {
        flex-grow: 1;
        margin-bottom: -1.25rem;
        @include fonts.modesto;
    }
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
