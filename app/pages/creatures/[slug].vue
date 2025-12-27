<script setup lang="ts">
import PageTitle from "~/components/labels/PageTitle.vue";
import BottomNavigation from "~/components/navigation/BottomNavigation.vue";
import StatBlock from "~/components/dnd/StatBlock.vue";
import {createCreature, type CreatureApiResponse} from "~/classes/creatures/creature";

const route = useRoute();
const store = useCreatureCache();
const data: CreatureApiResponse = await store.get({ key: route.params.slug as string }) as CreatureApiResponse;
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

        <div class="grid grid-cols-1 md:grid-cols-2 mt-4 md:px-4">
            <div v-if="item" class="">
                <StatBlock :creature="item" :edition="item?.editions?.[0]"/>
            </div>
        </div>

        <template #bottomNav>
            <BottomNavigation :items="[]"/>
        </template>
    </NuxtLayout>
</template>
