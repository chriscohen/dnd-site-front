<script setup lang="ts">
import Spellbook from "~/components/spells/Spellbook.vue";
import EditionTabs from "~/components/navigation/EditionTabs.vue";
import SpellbookExtra from "~/components/spells/SpellbookExtra.vue";
import {useApi, usePersistedStore} from "#imports";
import ConjuringScreen from "~/components/loading/ConjuringScreen.vue";

const route = useRoute();
const persistedStore = usePersistedStore();
const api = useApi({
    cache: useSpellStore(),
    type: 'spell',
    slug: route.params.slug as string,
    mode: RenderMode.FULL,
    multiple: false,
});

api.get();

const activeEdition = computed(() => {
    if (!api.getItem()) {
        return null;
    }

    // Does the currently selected edition exist within this spell's editions?
    const edition = api.getItem().editions.find(
        (edition: ISpellEdition) => edition.game_edition === persistedStore.selectedEdition
    );

    // If it does, return it.
    if (edition) {
        return edition;
    }

    // If not, set the new "selectedEdition" as the first edition on this spell, and return that.
    const newValue = api.getItem().editions[0].game_edition;
    setActive(newValue);
    return newValue;
});

function setActive(id: string) {
    persistedStore.selectedEdition = id;
}
</script>

<template>
    <div v-if="!api.getItem()" class="spell-container">
        <ConjuringScreen/>
    </div>
    <div v-else class="spell-container">
        <div class="book-container spellbook">
            <EditionTabs
                :active="activeEdition"
                :editions="api.getItem()?.editions ?? []"
                @edition-selected="(id: string) => setActive(id)"
            />
            <Spellbook :spell="api.getItem()" :edition="activeEdition"/>
        </div>

        <div class="book-container spellbook-extras">
            <SpellbookExtra :spell="api.getItem()" :edition="activeEdition"/>
        </div>
    </div>
</template>

<style scoped lang="scss">
@use '~/assets/css/books';
@use '~/assets/css/mixins';

.spell-container {
    display: flex;
    justify-content: stretch;
    height: 100%;
    width: 100%;

    > .edition-tabs {
        margin-top: 2rem;
    }
    > .spellbook {
        width: 40%;

        > .book {
            @include mixins.heavyShadow;
        }
    }
    > .spellbook-extras {
        margin-left: auto;
        width: 35%;

        > .book {
            @include mixins.heavyShadowLeft;
        }
    }
}
</style>
