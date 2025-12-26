<script setup lang="ts">
import {ArmorClassSource} from "#imports";
import PageTitle from "~/components/labels/PageTitle.vue";
import BottomNavigation from "~/components/navigation/BottomNavigation.vue";
import DndHeading from "~/components/headings/DndHeading.vue";
import StatBlock from "~/components/dnd/StatBlock.vue";
import {createCreature, type CreatureApiResponse} from "~/classes/creatures/creature";

const route = useRoute();
const store = useCreatureCache();
const data: CreatureApiResponse = await store.get(route.params.slug as string) as CreatureApiResponse;
const item = createCreature(data);

useHead({ title: item.name ?? 'Loading' });
definePageMeta({ layout: false });
</script>

<template>
    <NuxtLayout name="default">
        <template #pageTitle>
            <PageTitle :title="item.name ?? 'Loading'" back-to="/creatures">
                <template #subtitle>Creature</template>
            </PageTitle>
        </template>

        <div v-if="item" class="flex flex-col">
            <DndHeading size="2" :loading="!item">Title</DndHeading>
            <StatBlock :creature="item" :edition="item?.editions?.[0]"/>
        </div>

        <template #bottomNav>
            <BottomNavigation :items="[]"/>
        </template>
    </NuxtLayout>
</template>
