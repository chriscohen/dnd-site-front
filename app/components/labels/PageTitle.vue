<script setup lang="ts">
import BackButton from "~/components/buttons/BackButton.vue";

const props = defineProps<{
    title?: string
    backTo?: string
    underline?: boolean
}>();
const style = props.underline ? { borderBottom: '1px solid colors.$gray-400' } : {};
</script>

<template>

    <div class="page-title" :style="style">
        <div class="buttons">
            <BackButton :to="backTo ?? '/'" size="3rem"/>
        </div>

        <div class="page-title-main">
            <h1>{{ title }}</h1>
            <h3 v-if="$slots.subtitle"><slot name="subtitle"/></h3>
        </div>
        <div class="page-title-labels">
            <slot name="labels"/>
        </div>
    </div>
</template>

<style scoped lang="scss">
@use '~/assets/css/colors';
@use '~/assets/css/fonts';
@use '~/assets/css/mixins';

.page-title {
    display: flex;
    align-items: center;
    margin-bottom: 1rem;
    gap: 2rem;

    h1 {
        flex-grow: 1;
        margin-bottom: -1.25rem;
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
