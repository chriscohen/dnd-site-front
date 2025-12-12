<script setup lang="ts">
import {useRoute} from "#app";
import {useCharacterClassCache} from "~/stores/Store";
import PageTitle from "~/components/labels/PageTitle.vue";

const route = useRoute();
const path = API_URL + '/class/' + route.params.slug + '?mode=full';
const store = useCharacterClassCache();
await store.fetch(path);
const item: ComputedRef<ICharacterClass> = computed(() => store.get(path));

useHead({
    title: item.value?.name ?? 'Loading'
});
definePageMeta({
    layout: false
});
</script>

<template>
    <NuxtLayout name="default">
        <template #pageTitle>
            <PageTitle :title="item?.name ?? 'Title'" back-to="/classes">
                <template #subtitle>Character Class</template>
            </PageTitle>
        </template>
    </NuxtLayout>
</template>
