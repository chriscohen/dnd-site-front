<script setup lang="ts">
import DndListItem from "~/components/lists/DndListItem.vue";
import type {CampaignSetting} from "~/classes/campaignSetting";

const props = defineProps<{
    campaignSetting: CampaignSetting
}>();
</script>

<template>
    <DndListItem to="#">
        <NuxtImg
            v-if="campaignSetting?.logo?.url"
            :src="campaignSetting.logo.url"
            :alt="campaignSetting.name + ' logo'"
            class="h-12"
        />
        <template v-else>{{ campaignSetting.name }}</template>
    </DndListItem>
</template>
