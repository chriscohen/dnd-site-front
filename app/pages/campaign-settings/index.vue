<script setup lang="ts">

import CampaignSettingTeaser from "~/components/teasers/CampaignSettingTeaser.vue";
import ConjuringScreen from "~/components/loading/ConjuringScreen.vue";

const store = useCampaignSettingStore();
store.getAll();

</script>

<template>
    <div>
        <ConjuringScreen v-if="store.isLoading()" />

        <div v-if="!store.isLoading()" class="flex flex-wrap gap-4 items-center">
            <CampaignSettingTeaser v-for="item in store.items" :key="item.id" :campaign-setting="item"/>
        </div>
    </div>
</template>
