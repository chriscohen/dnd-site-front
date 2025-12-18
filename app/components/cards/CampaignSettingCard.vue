<script setup lang="ts">
import DndSection from "~/components/containers/DndSection.vue";
import ProseSkeleton from "~/components/loading/ProseSkeleton.vue";
import DndHeading from "~/components/headings/DndHeading.vue";
import ProseContainer from "~/components/text/ProseContainer.vue";

const props = defineProps<{
    item?: ICampaignSetting
}>();
</script>

<template>
    <DndSection>
        <DndHeading>
            <USkeleton v-if="!item" class="w-full h-8 mb-2"/>
            <template v-else>{{ item.name }}</template>
        </DndHeading>

        <ProseSkeleton v-if="!item" class="mt-4"/>
        <ProseContainer v-if="item?.description" prose="item.description"/>
    </DndSection>
</template>
