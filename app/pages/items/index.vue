<script setup lang="ts">
import type {TableColumn} from "#ui/components/Table.vue";
import CategoryBadge from "~/components/badges/CategoryBadge.vue";
import {useRuntimeConfig} from "#app";
import GameEditionBadge from "~/components/badges/GameEditionBadge.vue";
import BadgeContainer from "~/components/badges/BadgeContainer.vue";

const store = useItemStore();
const cache = useCacheStore();
const runtimeConfig = useRuntimeConfig();

const url = runtimeConfig.public.apiUrl + '/items?mode=full';

const { data, error, status } = await useAsyncData('items', () => $fetch(
    url, {
        method: 'GET',
        headers: {
            "Access-Control-Allow-Origin": "*"
        }
    }
));

const columns: TableColumn<IItem>[] = [
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
                :data="data"
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
                    <NuxtLink :to="'/items/' + row.getValue('slug')" class="link">
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
                            :key="edition.game_edition"
                            :edition="edition.game_edition"
                        />
                    </BadgeContainer>
                </template>
            </UTable>
        </div>
    </div>
</template>

<style lang="scss">
@use '~/assets/css/links';
@use '~/assets/css/media';
@use '~/assets/css/tables';
</style>

<style scoped lang="scss">
@use '~/assets/css/fonts';

.link {
    @include fonts.mrs-eaves;
}
</style>
