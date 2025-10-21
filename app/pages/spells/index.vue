<script setup lang="ts">
import SpellTeaser from "~/components/teasers/SpellTeaser.vue";
import {useSpellStore} from "#imports";
import ConjuringScreen from "~/components/loading/ConjuringScreen.vue";

const store = useSpellStore();
const persistedStore = usePersistedStore();
const apiUrl = useApi(store);

apiUrl.get({
    type: 'spells',
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
            <SpellTeaser v-for="item in store.getAll(RenderMode.TEASER)" :key="item.id" :data="item" />
        </div>
    </div>

</template>

<style scoped lang="scss">
@use '~/assets/css/teasers';
</style>
