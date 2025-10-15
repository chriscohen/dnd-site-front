<script setup lang="ts">
import SourcebookTeaser from "~/components/teasers/SourcebookTeaser.vue";
import {useSourceStore} from "~/stores/SourceStore";
import ConjuringScreen from "~/components/loading/ConjuringScreen.vue";

const $nuxt = useLoadingIndicator();
const store = useSourceStore();
const persistedStore = usePersistedStore();
const apiUrl = useApi(store);

apiUrl.get({
    type: 'sources',
    mode: RenderMode.TEASER,
    multiple: true
});
</script>

<template>
    <div class="page-container">
        <div v-if="store.empty(RenderMode.TEASER)" class="teaser-container">
            <ConjuringScreen/>
        </div>
        <div v-else class="teaser-container">
            <SourcebookTeaser v-for="item in store.getAll(RenderMode.TEASER)" :key="item.id" :data="item"/>
        </div>
    </div>
</template>

<style scoped lang="scss">
@use '~/assets/css/teasers';
</style>
