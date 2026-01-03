<script setup lang="ts">
import DndList from "~/components/lists/DndList.vue";
import DndListItem from "~/components/lists/DndListItem.vue";
import type {CampaignSetting} from "~/classes/campaignSetting";

const props = defineProps<{
    class?: string
    items?: CampaignSetting[]
    loading?: boolean
    selected?: CampaignSetting
}>();

const emit = defineEmits(['select']);
</script>

<template>

</template>
