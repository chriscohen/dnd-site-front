<script setup lang="ts">

import CampaignSettingTeaser from "~/components/teasers/CampaignSettingTeaser.vue";

const store = useCampaignSettingStore();
const items = await store.getAll();

</script>

<template>
    <Suspense>
        <div class="flex flex-wrap gap-4 items-center">
            <CampaignSettingTeaser v-for="item in items" :key="item.id" :campaign-setting="item"/>
        </div>

        <template #fallback>
            LOADING
        </template>
    </Suspense>
</template>
