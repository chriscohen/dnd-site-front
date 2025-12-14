<script setup lang="ts">

import CampaignSettingTeaser from "~/components/teasers/CampaignSettingTeaser.vue";
import {API_URL} from "~/utils/utils";
import {useCampaignSettingCache} from "~/stores/Store";
import PageTitle from "~/components/labels/PageTitle.vue";

const path = API_URL + '/campaign-settings?mode=full';
const store = useCampaignSettingCache();
await store.fetch(path);
const items: ICampaignSetting[] = computed(() => store.get(path));

useHead({ title: 'Campaign Settings' });
definePageMeta({ layout: false })

</script>

<template>
    <NuxtLayout name="default">
        <template #pageTitle>
            <PageTitle title="Campaign Settings" back-to="/"/>
        </template>


        <div v-if="items" class="flex flex-wrap gap-4 items-center">
            <CampaignSettingTeaser v-for="item in items" :key="item.id" :campaign-setting="item"/>
        </div>
    </NuxtLayout>
</template>
