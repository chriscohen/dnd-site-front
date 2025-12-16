<script setup lang="ts">
import SourcebookEditionsTabs from "~/components/sourcebooks/SourcebookEditionsTabs.vue";
import SourcebookEditionTab from "~/components/sourcebooks/SourcebookEditionTab.vue";

const props = defineProps<{
    sourcebook: ISourcebook;
}>();
</script>

<template>
    <div class="sourcebook-details-list">
        <!-- Editions -->
        <SourcebookEditionsTabs v-if="props.sourcebook?.editions?.length > 1" :sourcebook="props.sourcebook"/>
        <SourcebookEditionTab
            v-else-if="sourcebook?.editions?.length == 1"
            :edition="(sourcebook as ISourcebook)?.editions[0] as ISourcebookEdition"
            :source="sourcebook"
        />
        <!-- /Editions -->

        <!-- Campaign Setting logo -->
        <NuxtLink
            v-if="sourcebook?.campaignSetting?.logo"
            :to="'/campaign-settings/' + sourcebook?.campaignSetting?.slug">
            <img
                v-if="sourcebook?.campaignSetting?.logo?.url"
                class="max-w-[50%] mx-auto"
                :src="sourcebook?.campaignSetting?.logo?.url"
                :alt="sourcebook?.campaignSetting?.name + ' logo'">
        </NuxtLink>
        <!-- /Campaign Setting logo -->
    </div>
</template>

<style scoped lang="scss">
@use '~/assets/css/default/colors';
@use '~/assets/css/default/mixins';

.sourcebook-details-list {
    background-color: colors.$black-20;
    @include mixins.defaultPadding;
}
</style>
