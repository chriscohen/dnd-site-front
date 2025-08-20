<script setup lang="ts">
const route = useRoute();
const store = useSourcebookStore();

await callOnce(() => store.getBySlug(route.params.slug));
</script>

<template>
    <div>
        <h3>Name: {{store.getBySlug(route.params.slug).name}}</h3>
    </div>
</template>
