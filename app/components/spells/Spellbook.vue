<script setup lang="ts">
import ClassesLevelsList from "~/components/lists/ClassesLevelsList.vue";

const props = defineProps({
    spell: { type: Object as () => ISpell, required: true },
})
</script>

<template>
    <div class="spellbook">
        <div class="spellbook-header">
            <h1>{{ props.spell.name }}</h1>
            <img
                :src="props.spell.editions[0]?.school.image.url"
                :alt="props.spell.editions[0]?.school.name + ' school'"/>
        </div>

        <div class="spellbook-upper">
            <div class="spell-attributes">
                <span>Components</span>
                <span>{{ props.spell.editions[0]?.spell_components }}</span>

                <span>Range</span>
                <span>{{ props.spell.editions[0]?.range }}</span>
            </div>
            <ClassesLevelsList :data="props.spell.editions[0]?.class_levels" />
        </div>

        <div v-html="props.spell.editions[0]?.description ?? ''"/>


    </div>
</template>

<style scoped lang="scss">
@use '~/assets/css/fonts';
@use '~/assets/css/variables/colors';
@use '~/assets/css/variables/variables';
@use '~/assets/css/mixins/mixins';

.spellbook {
    background: radial-gradient(colors.$yellow-50, colors.$yellow-100);
    border-radius: 1rem;
    color: colors.$text-dark;
    max-width: 38rem;
    padding: 1rem 2rem;
    position: relative;
    width: 48rem;
    @include mixins.heavyShadow;

    > .spellbook-header {
        @include fonts.modesto;
        border-bottom: 0.1rem solid colors.$text-dark;
        margin-bottom: 2rem;
        display: flex;

        > img {
            height: 5rem;
            margin-left: auto;
        }
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
