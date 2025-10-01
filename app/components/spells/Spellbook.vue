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
    <div class="spellbook scrollbar yellowed">
        <div v-if="edition" class="spellbook-header">
            <PageTitle
                :title="spell?.name"
                :underline="true"
                back-to="/spells"
            >
                <template #subtitle><MagicSchoolLabel :link="true" :school="edition?.school"/></template>
            </PageTitle>
            <MagicSchoolSpellbookLabel
                :school="edition?.school"
                size="4rem"
                classes="ml-auto"
            />
        </div>

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
            <ClassesLevelsList :data="edition.class_levels" />
        </div>

        <div v-html="edition?.description ?? ''" class="spellbook-description"/>
        <DividersHorizontalDivider/>

        <div class="spellbook-lower">
            <ReferenceList :references="edition?.references" :show-title="true"/>
        </div>
    </div>
</template>

<style scoped lang="scss">
@use '~/assets/css/animations';
@use '~/assets/css/fonts';
@use '~/assets/css/colors';
@use '~/assets/css/variables';
@use '~/assets/css/mixins';

.spellbook {
    background: radial-gradient(colors.$yellow-50, colors.$yellow-100);
    border-radius: 1rem;
    color: colors.$text-dark;
    max-width: 48rem;
    max-height: 100%;
    padding: 1rem 2rem;
    position: relative;
    width: 48rem;
    @include mixins.heavyShadow;
    @include animations.animate(fadeIn);

    > .spellbook-header {
        @include fonts.modesto;
        border-bottom: 0.1rem solid colors.$text-dark;
        margin-bottom: 2rem;
        display: flex;
        align-items: center;
    }
    > .spellbook-upper {
        display: flex;
        margin-bottom: 2rem;
        align-items: start;
        font-size: 1.25rem;
    }
}

.classes-levels-list {
    background: rgba(0, 0, 0, 0.15);
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
