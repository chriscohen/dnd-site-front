<script setup lang="ts">
import type {TabsItem} from "#ui/components/Tabs.vue";

defineEmits(['edition-selected']);

type TabData = {
    id: string;
    class: string,
    label: string;
    suffix?: string
    disabled: boolean,
}

const props = defineProps<{
    active?: ISpellEdition
    editions: ISpellEdition[]
}>();

const tabData = ref<TabsItem[]>([
    {
        id: "1e",
        class: "edition-1",
        label: "1st",
        disabled: !props.editions?.find((item: ISpellEdition) => item.gameEdition === '1e'),
    },
    {
        id: "2e",
        class: "edition-2",
        label: "2nd",
        disabled: !props.editions?.find((item: ISpellEdition) => item.gameEdition === '2e'),
    },
    {
        id: "3e",
        class: "edition-3",
        label: "3rd",
        disabled: !props.editions?.find((item: ISpellEdition) => item.gameEdition === '3e'),
    },
    {
        id: "3.5",
        class: "edition-3",
        label: "3.5",
        disabled: !props.editions?.find((item: ISpellEdition) => item.gameEdition === '3.5'),
    },
    {
        id: "4e",
        class: "edition-4",
        label: "4th",
        disabled: !props.editions?.find((item: ISpellEdition) => item.gameEdition === '4e'),
    },
    {
        id: "5e (2014)",
        class: "edition-5",
        label: "5th",
        disabled: !props.editions?.find((item: ISpellEdition) => item.gameEdition === '5e (2014)'),
    },
    {
        id: "5e (2024)",
        class: "edition-2024",
        label: "2024",
        disabled: !props.editions?.find((item: ISpellEdition) => item.gameEdition === '5e (2024)'),
    }
]);
</script>

<template>
    <nav v-if="editions && tabData" class="edition-tabs">
        <button
            v-for="tab in tabData"
            :key="tab.id"
            :disabled="tab.disabled"
            :class="[
                active?.id === tab.id ? 'active' : null,
                tab.disabled ? null : 'border-stripe',
                'border-' + tab.class,
                'bg-' + tab.class + (tab.id === active?.id ? '-active' : '')
            ]"
            @click="$emit('edition-selected', tab.id)"
        >
            {{ tab.label }}
            <template v-if="tab.suffix">{{ tab.suffix }}</template>
        </button>
    </nav>
</template>

<style scoped lang="scss">
@use '~/assets/css/default/borders';
@use '~/assets/css/default/colors';
@use '~/assets/css/default/fonts';

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
            background-color: colors.$gray-950;
            color: colors.$text-disabled;

            &:hover {
                cursor: default;
            }
        }
        &:hover {
            cursor: pointer;
        }
    }
}
</style>
