<script setup lang="ts">
import SpellTeaser from "~/components/teasers/SpellTeaser.vue";
import ConjuringScreen from "~/components/loading/ConjuringScreen.vue";
import {useSourceStore} from "~/stores/SourceStore";
import {useRuntimeConfig} from "#app";

const store = useSourceStore();
const runtimeConfig = useRuntimeConfig();

const url = runtimeConfig.public.apiUrl + '/spells?mode=teaser';

const { data, error, status } = await useAsyncData('spells', () => $fetch(
    url, {
        method: 'GET',
        headers: {
            "Access-Control-Allow-Origin": "*"
        }
    }
));
</script>

<template>
    <div class="page-container">
        <Suspense>
            <template #fallback>
                <ConjuringScreen />
            </template>


            <div class="teaser-container">
                <SpellTeaser v-for="item in data" :key="item.id" :loading="false" :data="item" />
            </div>
        </Suspense>
    </div>

</template>

<style scoped lang="scss">
@use '~/assets/css/components/teasers';
</style>
