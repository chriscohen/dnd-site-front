<script setup lang="ts">
import SourcebookTeaser from "~/components/teasers/SourcebookTeaser.vue";
import ConjuringScreen from "~/components/loading/ConjuringScreen.vue";
import {useSourceStore} from "~/stores/SourceStore";

const store = useSourceStore();
store.getAll();
</script>

<template>
    <div>
        <ConjuringScreen v-if="store.isLoading()" />

        <div v-if="!store.isLoading()" class="teaser-container">
            <SourcebookTeaser v-for="item in store.items" :key="item.id" :loading="false" :data="item"/>
        </div>
    </div>
</template>

<style scoped lang="scss">
@forward '~/assets/css/components/teasers';
</style>
