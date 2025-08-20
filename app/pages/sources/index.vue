<script setup lang="ts">
const store = useSourcebookStore();
await callOnce(store.getAll);
</script>

<template>
    <ul>
        <li v-for="item in store.items" :key="item.id">
            <NuxtLink :to="'/sources/' + item.slug">
                <SourcebookComponent :data="item"/>
            </NuxtLink>
        </li>
    </ul>
</template>
