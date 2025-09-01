<script setup lang="ts">
import type { TableColumn } from "@nuxt/ui";

const store = useItemStore();
await callOnce(store.getAll);

const data = ref<IItem[]>(store.getAll());

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
        accessorKey: 'editions[0].game_edition',
        header: 'Game Edition',
        meta: {
            class: {
                td: 'text-gray-200',
                th: 'text-white',
            }
        },
        cell: ({row}) => row.original.editions[0].game_edition
    }
];
</script>

<template>
    <div class="flex gap-4">
        <UTable :columns="columns" :data="data" class="flex-1"/>
    </div>
</template>
