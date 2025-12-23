<script setup lang="ts">
import type {TableColumn} from "#ui/components/Table.vue";
import CategoryBadge from "~/components/badges/CategoryBadge.vue";
import {useRuntimeConfig} from "#app";
import GameEditionBadge from "~/components/badges/GameEditionBadge.vue";
import BadgeContainer from "~/components/badges/BadgeContainer.vue";
import {useItemCache} from "~/stores/Store";

const store = useItemCache();
const path = API_URL + '/items?mode=teaser';
await store.fetch(path);

const items: ComputedRef<ItemApiResponse[]> = computed(() => store.get(path));
const runtimeConfig = useRuntimeConfig();

const columns: TableColumn<ItemApiResponse>[] = [
    {
        accessorKey: 'slug',
        name: 'slug'
    },
    {
        accessorKey: 'image',
        header: ''
    },
    {
        accessorKey: 'name',
        header: 'Name'
    },
    {
        accessorKey: 'categories',
        header: 'Categories'
    },
    {
        accessorKey: 'editions',
        header: 'Editions'
    }
];

const columnVisibility = ref({ slug: false });
</script>

<template>
    <div>
        <div class="flex gap-4" >
            <UTable
                v-model:column-visibility="columnVisibility"
                :columns="columns"
                :data="items"
            >
                <template #image-cell="{ row }">
                    <NuxtLink :to="'/items/' + row.getValue('slug')">
                        <NuxtImg
                            v-if="row.getValue('image')"
                            :src="row.getValue('image').url"
                            :alt="row.getValue('name') + ' icon'"
                            class="thumbnail"
                        />
                    </NuxtLink>
                </template>
                <template #name-cell="{ row }">
                    <NuxtLink :to="'/items/' + row.getValue('slug')" class="link font[mrs-eaves]">
                        {{ row.getValue('name') }}
                    </NuxtLink>
                </template>
                <template #categories-cell="{ row }">
                    <CategoryBadge
                        v-for="category in row.getValue('categories')"
                        :key="category.id"
                        :category="category"
                    />
                </template>
                <template #editions-cell="{ row }">
                    <BadgeContainer>
                        <GameEditionBadge
                            v-for="edition in row.getValue('editions')"
                            :key="edition.gameEdition"
                            :edition="edition.gameEdition"
                        />
                    </BadgeContainer>
                </template>
            </UTable>
        </div>
    </div>
</template>
