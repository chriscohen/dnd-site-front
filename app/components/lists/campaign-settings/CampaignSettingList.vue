<script setup lang="ts">
import DndList from "~/components/lists/DndList.vue";
import DndListItem from "~/components/lists/DndListItem.vue";
import type {CampaignSetting} from "~/classes/campaignSetting";

const props = defineProps<{
    class?: string
    items?: CampaignSetting[]
    loading?: boolean
    selected?: CampaignSetting
}>();

const emit = defineEmits(['select']);
</script>

<template>
    <DndList :class="props.class" class="bg-black/50">
        <DndListItem
            v-for="item in items ?? []"
            :key="item.id"
            :item="item"
            :class="item.id === selected?.id ? 'bg-gray-700' : ''"
            @click="emit('select', item)"
        >
            <a href="#" class="group-hover:text-black">
                <NuxtImg v-if="item?.logo?.url" :src="item?.logo?.url" :alt="item.name + ' logo'" class="h-12"/>
                <template v-else><span class="block text-nowrap">{{ item.name }}</span></template>
            </a>
        </DndListItem>

        <template v-if="loading">
            <li>
                <USkeleton v-for="i in 5" :key="i" class="w-full h-8 mb-2"/>
            </li>
        </template>
    </DndList>
</template>
