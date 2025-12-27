<script setup lang="ts">
import DndCollapsible from "~/components/containers/DndCollapsible.vue";
import type {SourceContents} from "~/classes/sources/sourceContents";

const props = defineProps<{
    class?: string
    contents?: SourceContents[]
}>();
</script>

<template>
    <DndCollapsible v-if="contents" title="Contents" :start-open="true" class="h-full">
        <template v-for="item in contents" :key="item?.id">
            <h3 class="font-[mrs-eaves] uppercase text-3xl border-b border-gray-400 mt-4 mb-2">
                {{ item.name }}
            </h3>

            <ul v-if="item.headers?.length" class="loadMore-none">
                <li v-for="header in item.headers"  :key="header.header">
                    {{ header.header }}
                </li>
            </ul>
        </template>
    </DndCollapsible>
</template>
