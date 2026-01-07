<script setup lang="ts">
import PageTitle from "~/components/labels/PageTitle.vue";
import BaseCard from "~/components/cards/BaseCard.vue";
import CampaignSettingList from "~/components/campaign-settings/CampaignSettingList.vue";

useHead({ title: 'Campaign Settings' });
definePageMeta({ layout: false })

</script>

<template>
    <NuxtLayout name="default">
        <template #pageTitle>
            <PageTitle title="Campaign Settings" back-to="/"/>
        </template>

        <div class="flex-1 min-h-0 flex flex-row gap-4">
            <BaseCard>
                <CampaignSettingList/>
            </BaseCard>
        </div>
    </NuxtLayout>
</template>
