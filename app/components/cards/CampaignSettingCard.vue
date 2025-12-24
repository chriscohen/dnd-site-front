<script setup lang="ts">
import DndSection from "~/components/containers/DndSection.vue";
import ProseSkeleton from "~/components/loading/ProseSkeleton.vue";
import DndHeading from "~/components/headings/DndHeading.vue";
import type {CampaignSetting} from "~/classes/campaignSetting";

const props = defineProps<{
    class?: string
    item?: CampaignSetting
}>();
</script>

<template>
    <DndSection :class="props.class">
        <DndHeading>
            <USkeleton v-if="!item" class="w-full h-8 mb-2"/>
            <template v-else>{{ item.name }}</template>

            <template v-if="item?.publisher" #subtitle>
                <h5 class="font-[mrs-eaves] uppercase">{{ item.publisher?.name }}</h5>
            </template>
        </DndHeading>

        <NuxtImg v-if="item?.logo?.url" :src="item.logo.url" :alt="item.name + ' logo'" class="mt-4 mx-auto"/>

        <ProseSkeleton v-if="!item" class="mt-4"/>
        <div v-if="item?.description" class="mt-4" v-html="item.description" />
    </DndSection>
</template>
