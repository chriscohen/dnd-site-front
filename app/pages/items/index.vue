<script setup lang="ts">
import type {TableColumn} from "#ui/components/Table.vue";
import CategoryBadge from "~/components/badges/CategoryBadge.vue";

const store = useItemStore();
store.getAll(RenderMode.FULL);

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
    }
];

const columnVisibility = ref({ slug: false });
</script>

<template>
    <div>
        <LoadingConjuringScreen v-if="store.isLoading()"/>
        <div v-if="!store.isLoading()" class="flex gap-4" >
            <UTable
                v-model:column-visibility="columnVisibility"
                :columns="columns"
                :data="store.full"
            >
                <template #image-cell="{ row }">
                    <NuxtLink :to="'/categories/' + row.getValue('slug')">
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
            </UTable>
        </div>
    </div>
</template>

<style lang="scss">
@use '~/assets/css/links';
@use '~/assets/css/media';
@use '~/assets/css/tables';
</style>
