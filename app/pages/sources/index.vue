<script setup lang="ts">
import SourcebookTeaser from "~/components/teasers/SourcebookTeaser.vue";

const store = useSourcebookStore();
await store.getAll();
</script>

<template>
    <div class="teaser-container">
        <Suspense>
            <template v-for="item in store.items" :key="item.id">
                <SourcebookTeaser :data="item"/>
            </template>

            <template #fallback>
                LOADING
            </template>
        </Suspense>
    </div>
</template>

<style scoped lang="scss">
@forward '~/assets/css/components/teasers';
</style>
