<script setup lang="ts">
import SourceTeaser from "~/components/sources/SourceTeaser.vue";
import PageTitle from "~/components/labels/PageTitle.vue";
import {useSourceCache} from "~/stores/Store";
import {definePageMeta} from "#imports";
import TeaserGrid from "~/components/teasers/TeaserGrid.vue";
import {createSource, type Source} from "~/classes/sources/source";
import {useInfiniteScroll} from "@vueuse/core";

const store = useSourceCache();
const containerRef = ref<HTMLElement | null>(null);

const items = computed<Source[]>(() => {
    return store.listItems.map(createSource);
});

const { reset } = useInfiniteScroll(
    containerRef,
    () => {
        store.loadMore();
    },
    {
        distance: 10,
        canLoadMore: () => !store.isFinished
    }
);

onMounted(() => store.loadMore());

useHead({ title: 'Sourcebooks' });
definePageMeta({ layout: false });
</script>

<template>
    <NuxtLayout name="default">
        <template #pageTitle>
            <PageTitle title="Sourcebooks" back-to="/" :underline="true"/>
        </template>

        <div class="h-full overflow-y-scroll">
            <TeaserGrid v-if="items.length > 0" ref="containerRef">
                <SourceTeaser v-for="item in items" :key="item.id" :source="item"/>
            </TeaserGrid>
        </div>
    </NuxtLayout>
</template>

<style scoped lang="scss">
@use '~/assets/css/default/teasers';
</style>
