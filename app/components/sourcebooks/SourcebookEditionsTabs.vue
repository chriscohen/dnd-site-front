<script setup lang="ts">
import type {TabsItem} from "#ui/components/Tabs.vue";
import DateLabel from "~/components/labels/DateLabel.vue";
import IsbnLabel from "~/components/labels/IsbnLabel.vue";
import PagesLabel from "~/components/labels/PagesLabel.vue";
import BindingLabel from "~/components/labels/BindingLabel.vue";

const props = defineProps({
    sourcebook: { type: Object as () => ISourcebook, default: null },
});
console.log('props', props);
const items = null;/*props.sourcebook?.editions?.map((edition) => {
    return {
        label: edition.name,
        data: edition
    }
}) satisfies TabsItem[]*/
</script>

<template>
    <UTabs v-if="items !== null" :items="items" variant="link" class="w-full">
        <template v-for="item in items" :key="item.label" #content="{ item }">
            <div class="flex flex-wrap gap-4">
                <PagesLabel v-if="item.data.pages !== null" :pages="item.data.pages"/>
                <DateLabel :date="item.data.release_date" :show-day="!item.data.release_date_month_only"/>
                <BindingLabel :binding="item.data.binding"/>
                <IsbnLabel :isbn10="item.data.isbn10" :isbn13="item.data.isbn13"/>
            </div>
        </template>
    </UTabs>
</template>
