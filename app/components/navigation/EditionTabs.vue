<script setup lang="ts">
defineEmits(['edition-selected']);

type TabData = {
    id: string;
    class: string,
    name: string,
    sup?: string,
    suffix?: string
    disabled: boolean,
    active: boolean,
}

const props = defineProps<{
    active?: ISpellEdition
    spell?: ISpell
}>();

const tabData = ref<TabData[]>([
    {
        id: "1e",
        class: "edition-1",
        name: "1",
        sup: "st",
        disabled: !props.spell.editions.find((item: SpellEdition) => item.game_edition === '1e'),
    },
    {
        id: "2e",
        class: "edition-2",
        name: "2",
        sup: "nd",
        disabled: !props.spell.editions.find((item: SpellEdition) => item.game_edition === '2e'),
    },
    {
        id: "3e",
        class: "edition-3",
        name: "3",
        sup: "rd",
        disabled: !props.spell.editions.find((item: SpellEdition) => item.game_edition === '3e'),
    },
    {
        id: "3.5",
        class: "edition-3",
        name: "3.5",
        disabled: !props.spell.editions.find((item: SpellEdition) => item.game_edition === '3.5'),
    },
    {
        id: "4e",
        class: "edition-4",
        name: "4",
        sup: "th",
        disabled: !props.spell.editions.find((item: SpellEdition) => item.game_edition === '4e'),
    },
    {
        id: "5e (2014)",
        class: "edition-5",
        name: "5",
        sup: "th",
        disabled: !props.spell.editions.find((item: SpellEdition) => item.game_edition === '5e (2014)'),
    },
    {
        id: "5e (2024)",
        class: "edition-2024",
        name: "5",
        sup: "th",
        suffix: "2024",
        disabled: !props.spell.editions.find((item: SpellEdition) => item.game_edition === '5e (2024)'),
    }
]);
</script>

<template>
    <nav v-if="spell && tabData" class="edition-tabs">
        <button
            v-for="tab in tabData"
            :key="tab.id"
            :disabled="tab.disabled ? 'disabled' : null"
            :class="[
                active?.game_edition === tab.id ? 'active' : null,
                tab.disabled ? null : 'border-stripe',
                'border-' + tab.class,
                'bg-' + tab.class + (tab.id === active ? '-active' : '')
            ]"
            @click="$emit('edition-selected', tab.id)"
        >
            {{ tab.name }}
            <sup v-if="tab.sup">{{ tab.sup }}</sup>&nbsp;
            <template v-if="tab.suffix">{{ tab.suffix }}</template>
        </button>
    </nav>
</template>

<style scoped lang="scss">
@use '~/assets/css/borders';
@use '~/assets/css/colors';
@use '~/assets/css/fonts';

.edition-tabs {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;

    > button {
        @include fonts.mrs-eaves;
        display: block;
        font-size: 1.5rem;
        padding: 0 0.5rem;
        height: 3rem;
        border-top-left-radius: 0.5rem;
        border-bottom-left-radius: 0.5rem;
        text-align: center;

        > sup {
            font-size: 75%;
            margin-left: -0.35rem;
        }
        &:disabled {
            background-color: colors.$gray-700;
            color: colors.$text-disabled;
        }
        &:hover {
            cursor: pointer;
        }
    }
}
</style>
