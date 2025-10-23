<script setup lang="ts">
import SourcebookTeaser from "~/components/teasers/SourcebookTeaser.vue";
import ConjuringScreen from "~/components/loading/ConjuringScreen.vue";

const api = useApi({
    type: 'sources',
    mode: RenderMode.TEASER,
    multiple: true
});

api.get();
</script>

<template>
    <div class="page-container">
        <div v-if="!api.getItem()" class="teaser-container">
            <ConjuringScreen/>
        </div>
        <div v-else class="teaser-container">
            <SourcebookTeaser v-for="item in api.getItem()" :key="item.id" :data="item"/>
        </div>
    </div>
</template>

<style scoped lang="scss">
@use '~/assets/css/teasers';
</style>
