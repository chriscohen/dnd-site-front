<script setup lang="ts">
import {useCampaignSettingCache} from "~/stores/Store";
import PageTitle from "~/components/labels/PageTitle.vue";
import CampaignSettingList from "~/components/lists/campaign-settings/CampaignSettingList.vue";
import CampaignSettingCard from "~/components/cards/CampaignSettingCard.vue";
import {type CampaignSetting, createCampaignSetting} from "~/classes/campaignSetting";

const store = useCampaignSettingCache();

onMounted(() => store.loadMore());

useHead({ title: 'Campaign Settings' });
definePageMeta({ layout: false })

const selectedItem: Ref<CampaignSetting | undefined> = ref(undefined);
const itemSelected: Ref<boolean> = ref(false);

const items = computed(() => store.listItems.map(createCampaignSetting));

async function handleSelect(item: CampaignSetting) {
    itemSelected.value = true;
    const response = await store.get({ key: item?.slug ?? '' }) as CampaignSetting;
    selectedItem.value = createCampaignSetting(response);
}

</script>

<template>
    <NuxtLayout name="default">
        <template #pageTitle>
            <PageTitle title="Campaign Settings" back-to="/"/>
        </template>

        <div class="flex-1 min-h-0 flex flex-row gap-4">
            <CampaignSettingList
                :loading="items.length === 0"
                :items="items"
                :selected="selectedItem"
                @select="handleSelect"
            />

            <template v-if="itemSelected">
                <div class="w-full md:w-initial max-w-xl">
                    <CampaignSettingCard v-if="!store.isLoading" :item="selectedItem"/>
                    <CampaignSettingCard v-else/>
                </div>
            </template>
        </div>
    </NuxtLayout>
</template>
