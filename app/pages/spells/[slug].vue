<script setup lang="ts">
import Spellbook from "~/components/spells/Spellbook.vue";
import SpellbookImage from "~/components/spells/SpellbookImage.vue";
import EditionTabs from "~/components/navigation/EditionTabs.vue";

const route = useRoute();
const store = useSpellStore();

const item = await store.getBySlug(route.params.slug as string, RenderMode.FULL);

function findActive(): ISpellEdition | null {
    if (!item) {
        return null;
    }

    const active = item.editions.find((edition: ISpellEdition) => edition.is_default);
    return active ? active : item.editions[0];
}

const activeEdition = ref<ISpellEdition>(findActive());

function setActive(id: string): ISpellEdition | null {
    if (!item) {
        return null;
    }
    activeEdition.value = item.editions.find((edition: ISpellEdition) => edition?.game_edition === id);
}
</script>

<template>

    <div class="spell-container">
        <EditionTabs :active="activeEdition" :spell="item" @edition-selected="(id: string) => setActive(id)"/>

        <div class="spell">
            <SpellbookImage :loading="!item" :spell="item"/>
            <Spellbook :loading="!item" :spell="item" :edition="activeEdition"/>
        </div>
    </div>

</template>

<style scoped lang="scss">
.spell-container {
    display: flex;

    > .edition-tabs {
        margin-top: 2rem;
    }
    > .spell {
        height: 100%;
    }
}
</style>
