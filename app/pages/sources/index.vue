<script setup lang="ts">
import SourcebookTeaser from "~/components/teasers/SourcebookTeaser.vue";
import PageTitle from "~/components/labels/PageTitle.vue";
import {useSourceCache} from "~/stores/Store";
import {definePageMeta} from "#imports";
import TeaserGrid from "~/components/teasers/TeaserGrid.vue";
import {createSource, type Source, type SourceApiResponse} from "~/classes/sources/source";

const store = useSourceCache();
const data: SourceApiResponse[] = await store.list() as SourceApiResponse[];
const items: Source[] = data?.map(item => createSource(item));

useHead({ title: 'Sourcebooks' });
definePageMeta({
    layout: false
})
</script>

<template>
    <NuxtLayout name="default">
        <template #pageTitle>
            <PageTitle title="Sourcebooks" back-to="/" :underline="true"/>
        </template>

        <TeaserGrid v-if="items">
            <SourcebookTeaser v-for="item in items" :key="item.id" :source="item"/>
        </TeaserGrid>
    </NuxtLayout>
</template>

<style scoped lang="scss">
@use '~/assets/css/default/teasers';
</style>
