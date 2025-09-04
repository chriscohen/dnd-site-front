<script setup lang="ts">
import type {TabsItem} from "#ui/components/Tabs.vue";
import SourcebookEditionTab from "~/components/sourcebooks/SourcebookEditionTab.vue";

const props = defineProps({
    sourcebook: { type: Object as () => ISourcebook, default: null },
});
console.log('props', props);
const items = props.sourcebook?.editions?.map((edition) => {
    return {
        label: edition.name,
        data: edition
    }
}) satisfies TabsItem[]
</script>

<template>
    <UTabs v-if="items !== null" :items="items" variant="link" class="w-full">
        <template v-for="item in items" :key="item.label" #content="{ item }">
            <SourcebookEditionTab :edition="item.data"/>
        </template>
    </UTabs>
</template>
