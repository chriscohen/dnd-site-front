<script setup lang="ts">
import type { TableColumn } from "@nuxt/ui";

const store = useItemStore();
store.getAll();

const data = ref<IItem[]>(store.items);

const columns: TableColumn<IItem>[] = [
    {
        accessorKey: 'name',
        header: 'Name',
        meta: {
            class: {
                td: 'text-gray-200',
                th: 'text-white',
            }
        },
        cell: ({row}) => h('a', {
            href: '/items/' + row.original.slug,
            class: 'underline',
        }, row.getValue('name'))
    },
    {
        accessorKey: 'category.name',
        header: 'Category',
        meta: {
            class: {
                td: 'text-gray-200',
                th: 'text-white',
            }
        },
        cell: ({row}) => row.original.category.name,
    }
];
</script>

<template>
    <div>
        <LoadingConjuringScreen v-if="store.isLoading()"/>
        <div v-if="!store.isLoading()" class="flex gap-4" >
            <UTable :columns="columns" :data="store.items" class="flex-1"/>
        </div>
    </div>
</template>
