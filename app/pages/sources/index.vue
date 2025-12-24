<script setup lang="ts">
import SourcebookTeaser from "~/components/teasers/SourcebookTeaser.vue";
import PageTitle from "~/components/labels/PageTitle.vue";
import {useSourcebookCache} from "~/stores/Store";
import {definePageMeta} from "#imports";
import TeaserGrid from "~/components/teasers/TeaserGrid.vue";
import type {SourceApiResponse} from "~/classes/sources/source";

const path = 'http://localhost:8080/api/sources?mode=teaser';
const store = useSourcebookCache();
const items: SourceApiResponse[] = await store.get(path) as SourceApiResponse[];

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
