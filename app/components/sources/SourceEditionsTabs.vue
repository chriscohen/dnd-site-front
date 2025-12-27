<script setup lang="ts">
import SourceEditionTab from "~/components/sources/SourceEditionTab.vue";
import type {Source} from "~/classes/sources/source";

const props = defineProps<{
    source?: Source
}>();

const items = props.source?.editions?.map((edition) => {
    return {
        label: edition.name,
        data: edition
    }
});
</script>

<template>
    <UTabs v-if="items !== null" :items="items" variant="link" class="w-full">
        <template v-for="item in items" :key="item.label" #content="{ item }">
            <SourceEditionTab :edition="item.data"/>
        </template>
    </UTabs>
</template>
