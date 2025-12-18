<script setup lang="ts">
import DndList from "~/components/lists/DndList.vue";

const props = defineProps<{
    items?: ICampaignSetting[]
}>();

const emit = defineEmits(['select']);
</script>

<template>
    <DndList v-if="items">
        <li
            v-for="item in items"
            :key="item.id"
            class="flex hover:bg-highlight group cursor-pointer h-[3rem] items-center px-4 py-1"
            @click="emit('select', item)"
        >
            <a href="#" class="group-hover:text-black">
                <NuxtImg v-if="item?.logo?.url" :src="item?.logo?.url" :alt="item.name + ' logo'" class="h-[3rem]"/>
                <template v-else>{{ item.name }}</template>
            </a>
        </li>
    </DndList>
</template>
