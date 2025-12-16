<script setup lang="ts">
import type {ISourcebookContents} from "~/utils";
import DndCollapsible from "~/components/containers/DndCollapsible.vue";

const props = defineProps<{
    class?: string
    contents?: ISourcebookContents[]
}>();
</script>

<template>
    <DndCollapsible v-if="contents" title="Contents" :start-open="true">
        <template v-for="item in contents" :key="item?.id">
            <h3 class="font-[mrs-eaves] uppercase text-3xl border-b border-gray-400 mt-4 mb-2">
                {{ item.name }}
            </h3>

            <ul v-if="item.headers?.length" class="list-none ">
                <li v-for="header in item.headers"  :key="header.header">
                    {{ header.header }}
                </li>
            </ul>
        </template>
    </DndCollapsible>
</template>
