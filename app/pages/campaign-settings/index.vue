<script setup lang="ts">

import CampaignSettingTeaser from "~/components/teasers/CampaignSettingTeaser.vue";

const store = useCampaignSettingStore();
await callOnce(store.getAll);
const data = store.getAll();

console.log(data);
</script>

<template>
    <div class="flex flex-wrap gap-4 items-center">
        <CampaignSettingTeaser v-for="item in data" :key="item.id" :campaign-setting="item"/>
    </div>
</template>
