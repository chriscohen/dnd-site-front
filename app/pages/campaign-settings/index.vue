<script setup lang="ts">
import {useCampaignSettingCache} from "~/stores/Store";
import PageTitle from "~/components/labels/PageTitle.vue";
import CampaignSettingList from "~/components/lists/campaign-settings/CampaignSettingList.vue";
import CampaignSettingCard from "~/components/cards/CampaignSettingCard.vue";
import {type CampaignSetting, createCampaignSetting} from "~/classes/campaignSetting";
import DndList from "~/components/lists/DndList.vue";
import DndListItem from "~/components/lists/DndListItem.vue";
import BaseCard from "~/components/cards/BaseCard.vue";

const store = useCampaignSettingCache();

onMounted(() => store.page());

useHead({ title: 'Campaign Settings' });
definePageMeta({ layout: false })

const selectedItem: Ref<CampaignSetting | undefined> = ref(undefined);
const itemSelected: Ref<boolean> = ref(false);

const items = computed(() => store.pagedItems.map(createCampaignSetting));

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
            <BaseCard>
                <DndList>
                    <DndListItem
                        v-for="item in items ?? []"
                        :key="item.id"
                        :item="item"
                        :class="item.id === selectedItem?.id ? 'bg-gray-700' : ''"
                        @click="handleSelect(item)"
                    >
                        <a href="#" class="group-hover:text-black">
                            <NuxtImg v-if="item?.logo?.url" :src="item?.logo?.url" :alt="item.name + ' logo'" class="h-12"/>
                            <template v-else><span class="block text-nowrap">{{ item.name }}</span></template>
                        </a>
                    </DndListItem>

                    <template v-if="store.isLoading && items.length === 0">
                        <li>
                            <USkeleton v-for="i in 5" :key="i" class="w-full h-8 mb-2"/>
                        </li>
                    </template>
                </DndList>
            </BaseCard>

            <template v-if="itemSelected">
                <div class="w-full md:w-initial">
                    <CampaignSettingCard v-if="!store.isLoading" :item="selectedItem" class="animate-fade"/>
                    <CampaignSettingCard v-else/>
                </div>
            </template>
        </div>
    </NuxtLayout>
</template>
