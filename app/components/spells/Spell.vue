<script setup lang="ts">
import ClassesLevelsList from "~/components/lists/ClassesLevelsList.vue";
import MagicSchoolSpellbookLabel from "~/components/labels/MagicSchoolSpellbookLabel.vue";
import ReferenceList from "~/components/references/ReferenceList.vue";
import SavingThrowLabel from "~/components/labels/SavingThrowLabel.vue";
import PageTitle from "~/components/labels/PageTitle.vue";
import MagicSchoolLabel from "~/components/labels/MagicSchoolLabel.vue";

const props = defineProps<{
    spell?: ISpell
    edition?: ISpellEdition
}>();

const editionsWithSavingThrow = [
    '2e',
    '3e',
    '3.5'
];
</script>

<template>
    <div class="container scrollbar">
        <PageTitle
            v-if="edition"
            :title="spell?.name"
            :underline="true"
            back-to="/spells"
        >
            <template #subtitle><MagicSchoolLabel :link="true" :school="edition?.school"/></template>
            <template #side>
                <MagicSchoolSpellbookLabel
                    :school="edition?.school"
                    size="4rem"
                    classes="ml-auto"
                />
            </template>
        </PageTitle>


        <div v-if="edition" class="spellbook-upper">
            <div class="spell-attributes">
                <span>Components</span>
                <span>{{ edition.spell_components }}</span>

                <span>Range</span>
                <span>{{ edition.range?.string }}</span>

                <template v-if="edition.area?.string">
                    <span>Area</span>
                    <span>{{ edition.area?.string }}</span>
                </template>

                <span>Casting Time</span>
                <span>{{ edition.casting_time }}</span>

                <template v-if="editionsWithSavingThrow.includes(edition.game_edition)">
                    <span>Saving Throw</span>
                    <SavingThrowLabel :edition="edition"/>
                </template>
            </div>
            <ClassesLevelsList :data="edition.levels" />
        </div>

        <DividersHorizontalDivider/>
        <div v-html="edition?.description ?? ''" class="spellbook-description"/>
        <DividersHorizontalDivider/>

        <div class="spellbook-lower">
            <ReferenceList :references="edition?.references ?? []" :show-title="true"/>
        </div>
    </div>
</template>

<style scoped lang="scss">
@use '~/assets/css/default/animations';
@use '~/assets/css/default/books';
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

.classes-levels-list {
    margin-left: auto;
}

.spell-attributes {
    @include fonts.mrs-eaves;
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 0 2rem;

    > span:nth-of-type(even) {
        font-weight: 700;
    }
}
</style>
