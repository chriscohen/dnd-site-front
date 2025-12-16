<script setup lang="ts">
import SourcebookTeaser from "~/components/teasers/SourcebookTeaser.vue";
import PageTitle from "~/components/labels/PageTitle.vue";
import {useSourcebookCache} from "~/stores/Store";
import {definePageMeta} from "#imports";
import TeaserGrid from "~/components/teasers/TeaserGrid.vue";

const sourcePath = 'http://localhost:8080/api/sources?mode=teaser';
const store = useSourcebookCache();
await store.fetch(sourcePath);

const items: ISourcebook[] = computed(() => store.get(sourcePath));

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
            <SourcebookTeaser v-for="item in items" :key="item.id" :data="item"/>
        </TeaserGrid>
    </NuxtLayout>
</template>

<style scoped lang="scss">
@use '~/assets/css/default/teasers';
</style>
