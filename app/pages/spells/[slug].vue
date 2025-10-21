<script setup lang="ts">
import Spellbook from "~/components/spells/Spellbook.vue";
import SpellbookImage from "~/components/spells/SpellbookImage.vue";
import EditionTabs from "~/components/navigation/EditionTabs.vue";
import SpellbookExtra from "~/components/spells/SpellbookExtra.vue";
import {useApi, usePersistedStore} from "#imports";
import ConjuringScreen from "~/components/loading/ConjuringScreen.vue";

const route = useRoute();
const store = useSpellStore();
const persistedStore = usePersistedStore();
const api = useApi(store);

api.get({
    type: 'spell',
    slug: route.params.slug as string,
    mode: RenderMode.FULL,
    multiple: false,
});

const activeEdition = computed(() => {
    if (!store.latest) {
        return null;
    }

    // Does the currently selected edition exist within this spell's editions?
    const edition = store.latest.editions.find(
        (edition: ISpellEdition) => edition.game_edition === persistedStore.selectedEdition
    );

    // If it does, return it.
    if (edition) {
        return edition;
    }

    // If not, set the new "selectedEdition" as the first edition on this spell, and return that.
    constl newValue = store.latest.editions[0].game_edition;
    setActive(newValue);
    return newValue;
});

function setActive(id: string) {
    persistedStore.selectedEdition = id;
}
</script>

<template>
    <div v-if="!store.latest" class="spell-container">
        <ConjuringScreen/>
    </div>
    <div v-else class="spell-container">
        <SpellbookImage :spell="store.latest"/>

        <div class="book-container spellbook">
            <EditionTabs
                :active="activeEdition"
                :editions="store.latest?.editions ?? []"
                @edition-selected="(id: string) => setActive(id)"
            />
            <Spellbook :spell="store.latest" :edition="activeEdition"/>
        </div>

        <div class="book-container spellbook-extras">
            <SpellbookExtra :spell="store.latest" :edition="activeEdition"/>
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
