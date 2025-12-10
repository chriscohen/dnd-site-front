<script setup lang="ts">
import Spell from "~/components/spells/Spell.vue";
import EditionTabs from "~/components/navigation/EditionTabs.vue";
import SpellbookExtra from "~/components/spells/SpellbookExtra.vue";
import {API_URL, useApi, usePersistedStore} from "#imports";
import ConjuringScreen from "~/components/loading/ConjuringScreen.vue";

const route = useRoute();
const store = useSpellCache();
const path = API_URL + '/spell/' + route.params.slug + '?mode=full';
await store.fetch(path);
const item: ComputedRef<ISpell> = computed(() => store.get(path));
</script>

<template>
    <div v-if="item" class="spell-container">
        <div class="book-container spellbook">
            <EditionTabs
                :editions="item.editions ?? []"
                @edition-selected="(id: string) => false"
            />
            <Spell :spell="item" :edition="item.editions[0]"/>
        </div>

        <div class="book-container spellbook-extras">
            <SpellbookExtra :spell="item" :edition="item.editions[0]"/>
        </div>
    </div>
</template>

<style scoped lang="scss">
@use '~/assets/css/default/books';
@use '~/assets/css/default/mixins';

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
