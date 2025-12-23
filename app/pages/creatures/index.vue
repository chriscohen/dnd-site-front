<script setup lang="ts">
import {useCreatureCache} from "~/stores/Store";
import PageTitle from "~/components/labels/PageTitle.vue";
import SpeciesList from "~/components/lists/species/SpeciesList.vue";

const path = API_URL + '/creatures';
const store = useCreatureCache();
const items: ISpecies[] = await store.get(path) as ISpecies[];

useHead({ title: 'Species' });
definePageMeta({ layout: false });

const selectedItem: Ref<ISpecies | undefined> = ref(undefined);
const itemSelected: Ref<boolean> = ref(false);

async function handleSelect(item: ISpecies) {
    itemSelected.value = true;
    const itemPath = API_URL + '/creature/' + item.slug + '?mode=full';
    selectedItem.value = await store.get(itemPath) as ISpecies;
}
</script>

<template>
    <NuxtLayout name="default">
        <template #pageTitle>
            <PageTitle title="Species" back-to="/"/>
        </template>

        <div class="flex flex-col-reverse sm:flex-row mt-4 gap-4 overflow-hidden h-full">
            <SpeciesList :items="items"/>
        </div>
    </NuxtLayout>
</template>
