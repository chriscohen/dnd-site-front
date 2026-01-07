<script setup lang="ts">
import {type CampaignSetting, createCampaignSetting} from "~/classes/campaignSetting";
import {useCampaignSettingCache} from "~/stores/Store";
import LinkList from "~/components/lists/LinkList.vue";
import CampaignSettingListItem from "~/components/campaign-settings/CampaignSettingListItem.vue";

const props = defineProps<{
    class?: string
    filter?: boolean
    selected?: string
}>();

const store = useCampaignSettingCache();
await useLazyAsyncData(
    'campaign-setting-list',
    async () => await store.page()
);

const items = store.pagedItems.map(createCampaignSetting) as CampaignSetting[];
</script>

<template>
    <LinkList
        :items="items"
        :loading="store.isLoading"
        :filter="filter"
        :selected="selected"
        :template="CampaignSettingListItem"
        :class="props.class"
    />
</template>
