<script setup lang="ts">
const props = defineProps({
    campaignSetting: { type: Object as () => ICampaignSetting, required: true }
});
console.log(props.campaignSetting);
</script>

<template>
    <div class="w-64 teaser">
        <ULink :to="'/campaign-settings/' + props.campaignSetting.slug">
            <img
                v-if="props.campaignSetting.logo"
                :src="props.campaignSetting.logo.url"
                :alt="props.campaignSetting.name + ' campaign setting logo'"
                class="brightness-50 hover:brightness-100 transition-all duration-500"
            >
            <h3 v-else class="font-[Modesto_Condensed] text-center text-gray-400 hover:text-gray-100 transition-[color] duration-500">
                {{ props.campaignSetting.name }}
            </h3>
        </ULink>
    </div>
</template>

<style lang="scss" scoped>
@forward '~/assets/css/components/teasers';
</style>
