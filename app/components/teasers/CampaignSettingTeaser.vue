<script setup lang="ts">
const props = defineProps<{
    campaignSetting: ICampaignSetting
}>();
</script>

<template>
    <div class="w-64 teaser">
        <NuxtLink :to="'/campaign-settings/' + campaignSetting.slug">
            <nuxt-img
                v-if="props.campaignSetting.logo"
                loading="lazy"
                :src="props.campaignSetting.logo.url"
                :alt="props.campaignSetting.name + ' campaign setting logo'"
                class="brightness-50 hover:brightness-100 transition-all duration-500"
            />
            <h3 v-else class="font-[Modesto_Condensed] text-center text-gray-400 hover:text-gray-100 transition-[color] duration-500">
                {{ props.campaignSetting.name }}
            </h3>
        </NuxtLink>
    </div>
</template>

<style lang="scss" scoped>
@forward '../../assets/css/default/teasers';
</style>
