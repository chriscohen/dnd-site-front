<script setup lang="ts">
import ClassesLevelsList from "~/components/lists/ClassesLevelsList.vue";
import ReferenceList from "~/components/lists/references/ReferenceList.vue";
import SavingThrowLabel from "~/components/labels/SavingThrowLabel.vue";
import SpellComponentsLabel from "~/components/labels/SpellComponentsLabel.vue";
import HorizontalDivider from "~/components/dividers/HorizontalDivider.vue";
import type {Spell} from "~/classes/spells/spell";
import type {SpellEdition} from "~/classes/spells/spellEdition";

const props = defineProps<{
    spell?: Spell
    edition?: SpellEdition
}>();

const editionsWithSavingThrow = [
    '2e',
    '3e',
    '3.5'
];
</script>

<template>
    <div>
        <div v-if="edition" class="spellbook-upper flex flex-col-reverse sm:flex-row gap-4">
            <div class="spell-attributes font[mrs-eaves]">
                <span>Components</span>
                <div class="flex gap-2">
                    <SpellComponentsLabel v-if="edition.spellComponents" :components="edition.spellComponents"/>
                </div>

                <span>Range</span>
                <span>{{ edition.range?.string }}</span>

                <template v-if="edition.area?.string">
                    <span>Area</span>
                    <span>{{ edition.area?.string }}</span>
                </template>

                <span>Casting Time</span>
                <span>{{ edition.castingTime }}</span>

                <template v-if="editionsWithSavingThrow.includes(edition?.gameEdition ?? '')">
                    <span>Saving Throw</span>
                    <SavingThrowLabel :edition="edition"/>
                </template>
            </div>
            <ClassesLevelsList :data="edition.levels" />
        </div>

        <HorizontalDivider/>
        <div class="spellbook-description mt-2 mb-4" v-html="edition?.description ?? ''"/>
        <HorizontalDivider/>

        <div class="spellbook-lower">
            <ReferenceList :references="edition?.references ?? []" :show-title="true"/>
        </div>
    </div>
</template>

<style scoped lang="scss">
@use '~/assets/css/default/animations';
@use '~/assets/css/default/fonts';
@use '~/assets/css/default/colors';
@use '~/assets/css/default/layout';
@use '~/assets/css/default/variables';
@use '~/assets/css/default/mixins';

.spellbook-upper {
    display: flex;
    margin-bottom: 1rem;
    align-items: start;
    font-size: 1.25rem;
}

.spellbook-description {
    margin-top: 1.5rem;
}

.classes-levels-loadMore {
    margin-left: auto;
}

.spell-attributes {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 0 2rem;

    > span:nth-of-type(even) {
        font-weight: 700;
    }
}
</style>
