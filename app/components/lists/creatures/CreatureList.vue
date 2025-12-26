<script setup lang="ts">
import DndList from "~/components/lists/DndList.vue";
import DndListItem from "~/components/lists/DndListItem.vue";
import type {Creature} from "~/classes/creatures/creature";

const props = defineProps<{
    class?: string
    items?: Creature[]
}>();
</script>

<template>
    <DndList v-if="items">
        <DndListItem v-for="item in items" :key="item.id" :item="item">
            <a :href="`/creatures/${item.slug}`" class="group-hover:text-black">
                {{ item.name }}
            </a>
        </DndListItem>
    </DndList>
</template>
