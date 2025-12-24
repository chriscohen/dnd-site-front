<script setup lang="ts">
import {useCampaignSettingCache} from "~/stores/Store";
import PageTitle from "~/components/labels/PageTitle.vue";
import CampaignSettingList from "~/components/lists/campaign-settings/CampaignSettingList.vue";
import CampaignSettingCard from "~/components/cards/CampaignSettingCard.vue";
import type {CampaignSetting} from "~/classes/campaignSetting";

const path = API_URL + '/campaign-settings?mode=teaser';
const store = useCampaignSettingCache();
const items: CampaignSetting[] = await store.get(path) as CampaignSetting[];

useHead({ title: 'Campaign Settings' });
definePageMeta({ layout: false })

const selectedItem: Ref<CampaignSetting | undefined> = ref(undefined);
const itemSelected: Ref<boolean> = ref(false);

async function handleSelect(item: CampaignSetting) {
    itemSelected.value = true;
    const itemPath = API_URL + '/campaign-setting/' + item.slug + '?mode=full';
    selectedItem.value = await store.get(itemPath) as CampaignSetting;
}

</script>

<template>
    <NuxtLayout name="default">
        <template #pageTitle>
            <PageTitle title="Campaign Settings" back-to="/"/>
        </template>

        <div class="flex flex-col-reverse sm:flex-row mt-4 gap-4 overflow-hidden h-full">
            <CampaignSettingList :items="items" class="" @select="handleSelect"/>

            <template v-if="itemSelected">
                <div class="w-full md:w-initial max-w-xl">
                    <CampaignSettingCard v-if="!store.isLoading" :item="selectedItem"/>
                    <CampaignSettingCard v-else/>
                </div>
            </template>
        </div>
    </NuxtLayout>
</template>
