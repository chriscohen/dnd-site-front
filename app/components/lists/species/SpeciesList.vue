<script setup lang="ts">
import DndList from "~/components/lists/DndList.vue";
import DndListItem from "~/components/lists/DndListItem.vue";

const props = defineProps<{
    class?: string
    items?: ISpecies[]
}>();
</script>

<template>
    <DndList v-if="items">
        <DndListItem v-for="item in items" :key="item.id" :item="item">
            <a href="#" class="group-hover:text-black">
                {{ item.name }}
            </a>
        </DndListItem>
    </DndList>
</template>
