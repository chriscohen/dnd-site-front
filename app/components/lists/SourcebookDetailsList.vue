<script setup lang="ts">
import HorizontalDivider from "~/components/dividers/HorizontalDivider.vue";
import SourcebookDetailsListTitle from "~/components/Lists/SourcebookDetailsListTitle.vue";
import SourcebookDetailsListDefinition from "~/components/Lists/SourcebookDetailsListDefinition.vue";
import PagesLabel from "~/components/labels/PagesLabel.vue";
import DateLabel from "~/components/labels/DateLabel.vue";
import IsbnLabel from "~/components/labels/IsbnLabel.vue";
import SourcebookEditionsTabs from "~/components/sourcebooks/SourcebookEditionsTabs.vue";

const props = defineProps({
    sourcebook: { type: Object as () => ISourcebook, required: true },
});

</script>

<template>
    <div class="bg-black/20 px-4 py-2">
        <!-- Editions -->
        <SourcebookEditionsTabs :sourcebook="props.sourcebook"/>
        <aside v-for="(edition, key) of props.sourcebook?.editions" :key="edition.id">
            <h3 v-if="props.sourcebook && props.sourcebook.editions.length > 1" class="font-[Mrs_Eaves] text-nowrap">
                {{ edition.name}} edition
            </h3>



            <div class="grid grid-cols-2 gap-2">
                <SourcebookDetailsListTitle label="Binding"/>
                <SourcebookDetailsListDefinition :label="edition.binding.charAt(0).toUpperCase() + edition.binding.slice(1)"/>

                <SourcebookDetailsListTitle label="ISBN-10"/>
                <SourcebookDetailsListDefinition :label="edition.isbn10 ?? ''"/>

                <SourcebookDetailsListTitle label="ISBN-13"/>
                <SourcebookDetailsListDefinition :label="edition.isbn13 ?? ''"/>
            </div>
            <HorizontalDivider v-if="key != props.sourcebook?.editions.length - 1" class="mt-2"/>
        </aside>
        <!-- /Editions -->

        <!-- Campaign Setting logo -->
        <UTooltip
            v-if="props.sourcebook.campaign_setting?.logo"
            :text="props.sourcebook.campaign_setting.name + ' campaign setting'">
            <NuxtLink
                :to="'/campaign-settings/' + props.sourcebook.campaign_setting.slug">
                <img
                    class="max-w-[50%] mx-auto"
                    :src="props.sourcebook.campaign_setting.logo.url"
                    :alt="props.sourcebook.campaign_setting.name + ' logo'">
            </NuxtLink>
        </UTooltip>
        <!-- /Campaign Setting logo -->
    </div>
</template>
