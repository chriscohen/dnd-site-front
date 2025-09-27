<script setup lang="ts">
import SourcebookTeaser from "~/components/teasers/SourcebookTeaser.vue";
import ConjuringScreen from "~/components/loading/ConjuringScreen.vue";
import {useSourceStore} from "~/stores/SourceStore";

const store = useSourceStore();
callOnce(() => store.getAll(RenderMode.TEASER));
</script>

<template>
    <div class="page-container">
        <ConjuringScreen v-if="store.isLoading()" />

        <div v-if="!store.isLoading()" class="teaser-container">
            <SourcebookTeaser v-for="item in store.teaser" :key="item.id" :loading="false" :data="item"/>
        </div>
    </div>
</template>

<style scoped lang="scss">
@forward '~/assets/css/components/teasers';
</style>
