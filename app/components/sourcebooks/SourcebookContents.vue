<script setup lang="ts">
import type {ISourcebookContents} from "~/utils";
import ProseContainer from "~/components/text/ProseContainer.vue";

const props = defineProps<{
    class?: string
    contents?: ISourcebookContents[]
}>();
</script>

<template>
    <div v-if="contents" class="bg-black/50 text-lg px-4 py-2" :class="props.class">
        <h2 class="font-[mrs-eaves] text-4xl uppercase border-b-5 border-red-800 border-double">
            Contents
        </h2>

        <template v-for="item in contents" :key="item?.id">
            <h3 class="font-[mrs-eaves] uppercase text-3xl border-b-1 border-gray-400 mt-4 mb-2">
                {{ item.name }}
            </h3>

            <ul v-if="item.headers?.length" class="list-none ">
                <li v-for="header in item.headers"  :key="header.header">
                    {{ header.header }}
                </li>
            </ul>
        </template>
    </div>
</template>
