<script setup lang="ts">
import PageTitle from "~/components/labels/PageTitle.vue";
import BottomNavigation from "~/components/navigation/BottomNavigation.vue";
import StatBlock from "~/components/dnd/StatBlock.vue";
import {createCreatureType, type CreatureTypeApiResponse} from "~/classes/creatures/creatureType";
import BaseCard from "~/components/cards/BaseCard.vue";

const route = useRoute();
const store = useCreatureCache();
const data: CreatureTypeApiResponse = await store.get({ key: route.params.slug as string }) as CreatureTypeApiResponse;
const item = createCreatureType(data);

useHead({ title: item.name ?? 'Loading' });
definePageMeta({ layout: false });
</script>

<template>
    <NuxtLayout name="default">
        <template #pageTitle>
            <PageTitle :title="item.name ?? 'Loading'" back-to="/creatures">
                <template #subtitle>CreatureType</template>
            </PageTitle>
        </template>

        <div class="grid grid-cols-1 md:grid-cols-2 mt-4 md:px-4">
            <BaseCard v-if="item" class="">
                <StatBlock :creature="item" :edition="item?.editions?.[0]"/>
            </BaseCard>
        </div>

        <template #bottomNav>
            <BottomNavigation :items="[]"/>
        </template>
    </NuxtLayout>
</template>
