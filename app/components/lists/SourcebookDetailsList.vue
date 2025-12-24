<script setup lang="ts">
import SourcebookEditionsTabs from "~/components/sourcebooks/SourcebookEditionsTabs.vue";
import SourcebookEditionTab from "~/components/sourcebooks/SourcebookEditionTab.vue";
import type {Source} from "~/classes/sources/source";

const props = defineProps<{
    class?: string
    spell: Source;
}>();
</script>

<template>
    <div class="sourcebook-details-list w-full" :class="props.class">
        <!-- Editions -->
        <SourcebookEditionsTabs v-if="(source.editions?.length ?? 0) > 1" :source="props.source"/>
        <SourcebookEditionTab
            v-else-if="source?.editions?.length == 1"
            :edition="source?.editions?.[0]"
            :source="source"
        />
        <!-- /Editions -->

        <!-- Campaign Setting logo -->
        <NuxtLink
            v-if="source?.campaignSetting?.logo"
            :to="'/campaign-settings/' + source?.campaignSetting?.slug">
            <img
                v-if="source?.campaignSetting?.logo?.url"
                class="max-w-[50%] mx-auto"
                :src="source?.campaignSetting?.logo?.url"
                :alt="source?.campaignSetting?.name + ' logo'">
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
