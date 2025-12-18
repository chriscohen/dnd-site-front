<script setup lang="ts">
import {useSpeciesCache} from "~/stores/Store";
import PageTitle from "~/components/labels/PageTitle.vue";
import type {TableColumn} from "#ui/components/Table.vue";
import SourceShortNameLabel from "~/components/labels/SourceShortNameLabel.vue";

const path = API_URL + '/creatures?mode=full';
const store = useSpeciesCache();
await store.fetch(path);

const items: ComputedRef<ISpecies | ISpecies[] | undefined> = computed(() => store.get(path));

useHead({ title: 'Species' });
definePageMeta({ layout: false });

const columns: TableColumn<ISpecies>[] = [
    {
        accessorKey: 'name',
        header: 'Name'
    },
    {
        accessorKey: 'editions',
        header: 'Source'
    }
];

const getShortSourceName = (row, useShortName: boolean = false) => {
    const editions: ISpeciesEdition[] | undefined = row.getValue('editions');
    const reference: IReference | undefined = editions?.[0]?.references?.[0];

    if (reference) {
        return {
            to: '/sources/' + reference.slug,
            shortName: reference.shortName,
            tooltip: reference.source
        };
    } else {
        return {};
    }
}
</script>

<template>
    <NuxtLayout name="default">
        <template #pageTitle>
            <PageTitle title="Species" back-to="/"/>
        </template>

        <div v-if="items" class="bg-black/50 mx-2 lg:mx-4 px-4 py-2 rounded-xl">
            <UTable
                sticky
                :data="items as ISpecies[]"
                :columns="columns"
                :ui="{
                    td: 'text-md',
                    th: 'text-xl uppercase'
                }"
            >
                <template #name-cell="{ row }">
                    <ULink :to="'/creatures/' + row.original.slug" class="link">{{ row.getValue('name') }}</ULink>
                </template>

                <template #editions-cell="{ row }">
                    <SourceShortNameLabel v-bind="getShortSourceName(row, true)"/>
                </template>
            </UTable>
        </div>
    </NuxtLayout>
</template>
