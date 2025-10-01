<script setup lang="ts">
import SourcebookTeaser from "~/components/teasers/SourcebookTeaser.vue";
import ConjuringScreen from "~/components/loading/ConjuringScreen.vue";
import {useSourceStore} from "~/stores/SourceStore";
import {useRuntimeConfig} from "#app";
import {useCacheStore} from "#build/imports";

const store = useSourceStore();
const cache = useCacheStore();
const runtimeConfig = useRuntimeConfig();

const url = runtimeConfig.public.apiUrl + '/sources?mode=teaser';

const { data, error, status } = await useAsyncData('sources', () => $fetch(
    url, {
        method: 'GET',
        headers: {
            "Access-Control-Allow-Origin": "*"
        }
    }
));
watch(data, (newValue) => {
    cache.setItem(url, newValue);
});
</script>

<template>
    <div class="page-container">
        <Suspense>
            <template #fallback>
                <ConjuringScreen />
            </template>

        <div class="teaser-container">
            <SourcebookTeaser v-for="item in data" :key="item.id" :loading="false" :data="item"/>
        </div>
        </Suspense>
    </div>
</template>

<style scoped lang="scss">
@forward '~/assets/css/components/teasers';
</style>
