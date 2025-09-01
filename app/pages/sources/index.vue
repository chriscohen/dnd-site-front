<script setup lang="ts">
import SourcebookTeaser from "~/components/teasers/SourcebookTeaser.vue";

const store = useSourcebookStore();
await callOnce(store.getAll);
</script>

<template>
    <div class="flex gap-4">
        <template v-for="item in store.items" :key="item.id">
            <NuxtLink :to="'/sources/' + item.slug" class="shrink">
                <SourcebookTeaser :data="item"/>
            </NuxtLink>
        </template>
    </div>
</template>
