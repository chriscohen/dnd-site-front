<script setup lang="ts">
import Spellbook from "~/components/spells/Spellbook.vue";
import SpellbookImage from "~/components/spells/SpellbookImage.vue";
import EditionTabs from "~/components/navigation/EditionTabs.vue";
import {useRuntimeConfig} from "#app";
import SpellbookExtra from "~/components/spells/SpellbookExtra.vue";
import {useApi} from "#imports";

const route = useRoute();
const store = useSourceStore();
const runtimeConfig = useRuntimeConfig();
const apiUrl = useApi();

const { data, error, status } = await useAsyncData('spell', () => $fetch(
    apiUrl.getUrl('spell/' + route.params.slug, RenderMode.FULL),
    {
        method: 'GET',
        headers: {
            "Access-Control-Allow-Origin": "*"
        }
    }
));
watch (data, (newValue) => setActive());

function findActive(): ISpellEdition | null {
    if (status === 'pending' || !data.value || !data.value?.editions) {
        return null;
    }

    const active = data.value.editions?.find((edition: ISpellEdition) => edition.is_default);
    return active ?? data?.value.editions[0];
}

const activeEdition = ref<ISpellEdition>(findActive());

function setActive(id?: string): ISpellEdition | null {
    if (!data) {
        return null;
    } else if (!id) {
        activeEdition.value = data.value.editions.find((edition: ISpellEdition) => edition.is_default);
    } else {
        activeEdition.value = data.value.editions.find((edition: ISpellEdition) => edition?.game_edition === id);
    }
}
</script>

<template>
    <div class="spell-container">
        <SpellbookImage :spell="data"/>

        <div class="book-container spellbook">
            <EditionTabs :active="activeEdition" :spell="data" @edition-selected="(id: string) => setActive(id)"/>
            <Spellbook :spell="data" :edition="activeEdition"/>
        </div>

        <div class="book-container spellbook-extras">
            <SpellbookExtra :spell="data" :edition="activeEdition"/>
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
