<script setup lang="ts">
import SourcebookTeaser from "~/components/teasers/SourcebookTeaser.vue";

useSeoMeta({
    title: 'Sources',
});

const store = useSourcebookStore();
await store.getAll();
</script>

<template>

    <div class="flex gap-4">
        <Suspense>
            <template v-for="item in store.items" :key="item.id">
                <SourcebookTeaser :data="item"/>
                <USkeleton class="skeleton"/>
            </template>

            <template #fallback>
                <USkeleton></USkeleton>
            </template>
        </Suspense>
    </div>
</template>
