<script setup lang="ts">
import {API_URL} from "~/utils/utils";
import {useCampaignSettingCache} from "~/stores/Store";
import PageTitle from "~/components/labels/PageTitle.vue";
import DndPageColumns from "~/components/containers/DndPageColumns.vue";
import CampaignSettingList from "~/components/lists/campaign-settings/CampaignSettingList.vue";
import CampaignSettingCard from "~/components/cards/CampaignSettingCard.vue";

const path = API_URL + '/campaign-settings?mode=teaser';
const store = useCampaignSettingCache();
const items: ICampaignSetting[] = await store.get(path) as ICampaignSetting[];

useHead({ title: 'Campaign Settings' });
definePageMeta({ layout: false })

const selectedItem: Ref<ICampaignSetting | undefined> = ref(undefined);
const itemSelected: Ref<boolean> = ref(false);

async function handleSelect(item: ICampaignSetting) {
    itemSelected.value = true;
    const itemPath = API_URL + '/campaign-setting/' + item.slug + '?mode=full';
    selectedItem.value = await store.get(itemPath) as ICampaignSetting;
}

</script>

<template>
    <NuxtLayout name="default">
        <template #pageTitle>
            <PageTitle title="Campaign Settings" back-to="/"/>
        </template>

        <DndPageColumns class="grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
            <CampaignSettingList :items="items" @select="handleSelect"/>

            <template v-if="itemSelected">
                <CampaignSettingCard v-if="!store.isLoading" :item="selectedItem"/>
                <CampaignSettingCard v-else/>
            </template>
        </DndPageColumns>
    </NuxtLayout>
</template>
