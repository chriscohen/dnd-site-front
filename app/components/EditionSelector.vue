<script setup lang="ts">
import EditionSelectorButton from "~/components/buttons/EditionSelectorButton.vue";

const persistedStore = usePersistedStore();
</script>

<template>
    <UButtonGroup class="edition-selector">
        <EditionSelectorButton
            v-for="edition in persistedStore.editions"
            :key="edition.id"
            :edition-id="edition.id"
            :text="edition.text"
            :sup="edition.sup"
            :bg-class="edition.bgClass"
        />
    </UButtonGroup>
</template>

<style scoped lang="scss">
@use '../assets/css/colors';
@use '~/assets/css/backgrounds';
@use '~/assets/css/forms';
@use '../assets/css/mixins';
@use '~/assets/css/fonts';

.edition-selector {
    display: flex;
    margin-left: auto;
    height: 3rem;
    @include mixins.drop-shadow;

    > button {
        border-color: transparent;
        cursor: pointer;
        font-size: 1.5rem;
        @include fonts.modesto;
        border-bottom-width: 0.25rem;
        border-bottom-style: solid;

        > sup {
            font-size: 1.25rem;
        }
    }
}
</style>
