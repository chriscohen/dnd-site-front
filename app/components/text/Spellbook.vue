<script setup lang="ts">
import ClassesLevelsList from "~/components/lists/ClassesLevelsList.vue";

const props = defineProps({
    spell: { type: Object as () => ISpell, required: true },
})
</script>

<template>
    <div class="spellbook">
        <h1>{{ props.spell.name }}</h1>
        <div class="spellbook-upper">
            <div class="spell-attributes">
                <span>Components</span>
                <span>{{ props.spell.editions[0].components }}</span>
            </div>
            <ClassesLevelsList :data="props.spell.editions[0].class_levels" />
        </div>
        <div v-html="props.spell.editions[0].description"/>
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
    font-size: 1.5rem;
    max-width: 48rem;
    padding: 1rem 2rem;
    transform: perspective(variables.$default-perspective) rotateX(variables.$default-lean-away);
    width: 48rem;

    > h1 {
        @include fonts.modesto;
        border-bottom: 0.1rem solid colors.$text-dark;
        margin-bottom: 2rem;
    }
    > .spellbook-upper {
        display: flex;
        margin-bottom: 2rem;
    }
}

.classes-levels-list {
    background: rgba(0, 0, 0, 0.15);
    margin-left: auto;
}

.spell-attributes {
    @include fonts.mrs-eaves;
}
</style>
