<script setup lang="ts">
import SourceTeaser from "~/components/sources/SourceTeaser.vue";
import PageTitle from "~/components/labels/PageTitle.vue";
import {useSourceCache} from "~/stores/Store";
import {definePageMeta} from "#imports";
import TeaserGrid from "~/components/teasers/TeaserGrid.vue";
import {createSource, type Source} from "~/classes/sources/source";
import {useInfiniteScroll} from "@vueuse/core";
import {useUiStore} from "~/stores/uiStore";

const store = useSourceCache();
const uiStore = useUiStore();
uiStore.setBackgroundImage('tower.avif');

const sourceMoreRef = ref<HTMLElement | null>(null);

const items = computed<Source[]>(() => store.pagedItems.map(createSource));

const { reset } = useInfiniteScroll(
    sourceMoreRef,
    () => {
        store.page();
    },
    {
        distance: 10,
        canLoadMore: () => !store.isFinished
    }
);

callOnce(() => store.page());

useHead({ title: 'Sourcebooks' });
definePageMeta({ layout: false });
</script>

<template>
    <NuxtLayout name="default">
        <template #pageTitle>
            <PageTitle title="Sourcebooks" back-to="/" :underline="true"/>
        </template>

        <div class="h-full overflow-y-scroll">
            <TeaserGrid v-if="items.length > 0">
                <SourceTeaser v-for="item in items" :key="item.id" :source="item"/>
            </TeaserGrid>
        </div>
        <div ref="sourceMoreRef"/>
    </NuxtLayout>
</template>
