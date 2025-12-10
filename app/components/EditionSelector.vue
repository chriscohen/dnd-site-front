<script setup lang="ts">
import EditionSelectorButton from "~/components/buttons/EditionSelectorButton.vue";

const persistedStore = usePersistedStore();
</script>

<template>
    <UButtonGroup class="edition-selector flex">
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
@use '~/assets/css/default/colors';
@use '~/assets/css/default/backgrounds';
@use '~/assets/css/default/forms';
@use '~/assets/css/default/mixins';
@use '~/assets/css/default/fonts';

.edition-selector {
    margin-left: auto;
    height: 3rem;
    @include mixins.drop-shadow;

    > button {
        border-color: transparent;
        cursor: pointer;
        font-size: 1.5rem;
        @include fonts.modesto;

        > sup {
            font-size: 1.25rem;
        }
    }
}
</style>
