<script lang="ts" setup>

const props = defineProps(['data'])
</script>

<template>
    <CoverImage :filename="props.data.cover_image" />
</template>
