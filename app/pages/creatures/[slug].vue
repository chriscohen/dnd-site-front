<script setup lang="ts">
import {API_URL} from "#imports";
import PageTitle from "~/components/labels/PageTitle.vue";
import BottomNavigation from "~/components/navigation/BottomNavigation.vue";

const route = useRoute();
const store = useSpeciesCache();
const path = API_URL + '/creature/' + route.params.slug + '?mode=full';
await store.fetch(path);

const item: ComputedRef<ISpecies> = computed(() => store.get(path));

useHead({ title: item?.value.name ?? 'Loading' });
definePageMeta({ layout: false });
</script>

<template>
    <NuxtLayout name="default">
        <template #pageTitle>
            <PageTitle :title="item?.name" back-to="/species">
                <template #subtitle>Species</template>
            </PageTitle>
        </template>

        <div class="flex flex-col">
            <NuxtImg :src="CDN_URL + '/creatures/' + item?.slug + '.webp'" :alt="item?.name" class="w-full"/>
        </div>

        <template #bottomNav>
            <BottomNavigation :items="[]"/>
        </template>
    </NuxtLayout>
</template>
