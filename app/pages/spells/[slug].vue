<script setup lang="ts">
import Spellbook from "~/components/spells/Spellbook.vue";
import SpellbookImage from "~/components/spells/SpellbookImage.vue";
import EditionTabs from "~/components/navigation/EditionTabs.vue";
import {useRuntimeConfig} from "#app";

const route = useRoute();
const store = useSourceStore();
const runtimeConfig = useRuntimeConfig();

const { data, error, status } = await useAsyncData('spell', () => $fetch(
    runtimeConfig.public.apiUrl + '/spell/' + route.params.slug + '?mode=full',
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
        <EditionTabs :active="activeEdition" :spell="data" @edition-selected="(id: string) => setActive(id)"/>

        <div class="spell">
            <SpellbookImage :loading="status === 'pending'" :spell="data"/>
            <Spellbook :loading="status === 'pending'" :spell="data" :edition="activeEdition"/>
        </div>
    </div>
</template>

<style scoped lang="scss">
.spell-container {
    display: flex;
    height: 100%;

    > .edition-tabs {
        margin-top: 2rem;
    }
    > .spell {
        height: 100%;
    }
}
</style>
