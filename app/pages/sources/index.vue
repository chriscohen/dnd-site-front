<script setup lang="ts">
import SourcebookTeaser from "~/components/teasers/SourcebookTeaser.vue";
import ConjuringScreen from "~/components/loading/ConjuringScreen.vue";

const store = useSourceStore();
await store.getAll();
</script>

<template>
    <div>
        <ConjuringScreen v-if="store.loading"/>

        <div v-if="!store.loading" class="teaser-container">
            <SourcebookTeaser v-for="item in store.items" :key="item.id" :loading="false" :data="item"/>
        </div>
    </div>
</template>

<style scoped lang="scss">
@forward '~/assets/css/components/teasers';
</style>
