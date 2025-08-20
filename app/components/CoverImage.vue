<script lang="ts" setup>
const config = useRuntimeConfig();

const props = defineProps({
    filename: String
})
</script>

<template>
    <img :src="config.apiUrl + '/images/books/' + props.filename" alt="cover image">
</template>
