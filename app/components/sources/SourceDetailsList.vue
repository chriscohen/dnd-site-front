<script setup lang="ts">
import SourceEditionsTabs from "~/components/sources/SourceEditionsTabs.vue";
import SourceEditionTab from "~/components/sources/SourceEditionTab.vue";
import type {Source} from "~/classes/sources/source";

const props = defineProps<{
    class?: string
    source?: Source;
}>();
</script>

<template>
    <div class="sourcebook-details-loadMore w-full bg-black/20 px-4 py-2" :class="props.class">
        <!-- Editions -->
        <SourceEditionsTabs v-if="(source?.editions?.length ?? 0) > 1" :source="props.source"/>
        <SourceEditionTab
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
