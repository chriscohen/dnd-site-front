<script setup lang="ts">
import {useCompanyCache} from "~/stores/Store";
import PageTitle from "~/components/labels/PageTitle.vue";
import ProductList from "~/components/lists/ProductList.vue";
import type {CompanyApiResponse} from "~/classes/company";

const route = useRoute();
const store = useCompanyCache();
const path = API_URL + '/company/' + route.params.slug + '?mode=full';
const item: CompanyApiResponse = await store.get(path) as CompanyApiResponse;

useHead({ title: item?.name ?? 'Loading' });
definePageMeta({ layout: false });
</script>

<template>
    <NuxtLayout name="default">
        <template #pageTitle>
            <PageTitle :title="item?.name" back-to="/companies"/>
        </template>

        <div v-if="item" class="mx-2 md:mx-4 mt-4 flex flex-col items-center gap-4 h-full">
            <NuxtImg v-if="item?.logo" :src="item.logo.url" :alt="item?.name + 'Logo'"/>

            <ProductList :products="item?.products" class="w-full min-h-0 mb-4"/>
        </div>
    </NuxtLayout>
</template>
