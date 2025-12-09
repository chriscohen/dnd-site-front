<script setup lang="ts">
import SourcebookTeaser from "~/components/teasers/SourcebookTeaser.vue";
import PageTitle from "~/components/labels/PageTitle.vue";
import {useFetch} from "#app";
import {useSourcebookCache} from "~/stores/Store";

const sourcePath = 'http://localhost:8080/api/sources?mode=teaser';
const store = useSourcebookCache();

const items: ISourcebook[] = computed(() => store.get(sourcePath));

if (!store.has(sourcePath)) {
    const {data, error} = await useFetch<ISourcebook[]>(sourcePath, {
        server: false
    });

    if (data.value) {
        store.set(sourcePath, data.value as ISourcebook);
    }
}
</script>

<template>
    <div class="page-container-outer">
        <div class="page-container">
            <PageTitle title="Sourcebooks" back-to="/" :underline="true"/>
            <div class="teaser-container">
                <SourcebookTeaser v-for="item in items" :key="item.id" :data="item"/>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
@use '~/assets/css/default/teasers';

.page-container {
    flex-direction: column;
}
</style>
