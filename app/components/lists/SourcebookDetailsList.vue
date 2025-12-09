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
            v-else-if="props.sourcebook?.editions?.length == 1"
            :edition="(props.sourcebook as ISourcebook)?.editions[0] as ISourcebookEdition"
        />
        <!-- /Editions -->

        <!-- Campaign Setting logo -->
        <NuxtLink
            v-if="props.sourcebook?.campaign_setting?.logo"
            :to="'/campaign-settings/' + props.sourcebook?.campaign_setting.slug">
            <img
                class="max-w-[50%] mx-auto"
                :src="props.sourcebook?.campaign_setting.logo.url"
                :alt="props.sourcebook?.campaign_setting.name + ' logo'">
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
