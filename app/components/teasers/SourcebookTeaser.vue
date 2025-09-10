<script lang="ts" setup>

const props = defineProps({
    data: { type: Object as () => ISourcebook, required: true },
})
</script>

<template>
    <NuxtLink :to="'/sources/' + props.data.slug" class="shrink teaser">
        <MediaCoverImage :sourcebook="props.data" />
        <h3>{{ props.data.name }}</h3>
    </NuxtLink>
</template>

<style scoped lang="scss">
@forward '~/assets/css/components/teasers';

.teaser h3 {
    bottom: 0;
    width: 16rem;
}
</style>
