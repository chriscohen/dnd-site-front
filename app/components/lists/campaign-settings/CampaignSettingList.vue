<script setup lang="ts">
import DndList from "~/components/lists/DndList.vue";
import DndListItem from "~/components/lists/DndListItem.vue";

const props = defineProps<{
    class?: string
    items?: ICampaignSetting[]
}>();

const emit = defineEmits(['select']);
</script>

<template>
    <DndList v-if="items" :class="props.class" class="bg-black/50">
        <DndListItem
            v-for="item in items"
            :key="item.id"
            :item="item"
            @click="emit('select', item)"
        >
            <a href="#" class="group-hover:text-black">
                <NuxtImg v-if="item?.logo?.url" :src="item?.logo?.url" :alt="item.name + ' logo'" class="h-[3rem]"/>
                <template v-else><span class="block text-nowrap">{{ item.name }}</span></template>
            </a>
        </DndListItem>
    </DndList>
</template>
