<script setup lang="ts">
import {useCompanyCache} from "~/stores/Store";
import PageTitle from "~/components/labels/PageTitle.vue";
import DndSection from "~/components/containers/DndSection.vue";
import ProductList from "~/components/lists/ProductList.vue";

const route = useRoute();
const store = useCompanyCache();
const path = API_URL + '/company/' + route.params.slug + '?mode=full';
await store.fetch(path);

const item: ComputedRef<ICompany> = computed(() => store.get(path));

useHead({ title: item?.value.name });
definePageMeta({ layout: false });
</script>

<template>
    <NuxtLayout v-if="item" name="default">
        <template #pageTitle>
            <PageTitle :title="item?.name" back-to="/companies"/>
        </template>

        <NuxtImg v-if="item?.logo" :src="item.logo.url" :alt="item?.name + 'Logo'"/>

        <ProductList :products="item?.products"/>
    </NuxtLayout>
</template>
