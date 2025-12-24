<script setup lang="ts">
import type {TabsItem} from "#ui/components/Tabs.vue";
import SourcebookEditionTab from "~/components/sourcebooks/SourcebookEditionTab.vue";
import type {Source} from "~/classes/sources/source";

const props = defineProps<{
    source: Source
}>();

const items = props.source?.editions?.map((edition) => {
    return {
        label: edition.name,
        data: edition
    }
}) satisfies TabsItem[]
</script>

<template>
    <UTabs v-if="items !== null" :items="items" variant="link" class="w-full">
        <template v-for="item in items" :key="item.label" #content="{ item }">
            <SourcebookEditionTab :edition="item.spell"/>
        </template>
    </UTabs>
</template>
