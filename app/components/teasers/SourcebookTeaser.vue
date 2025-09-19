<script lang="ts" setup>

import TeaserTitle from "~/components/teasers/TeaserTitle.vue";

const props = defineProps<{
    loading: boolean,
    data?: ISourcebook
}>();
</script>

<template>
    <div v-if="loading" class="shrink teaser loading"/>

    <NuxtLink v-if="!loading" :to="'/sources/' + data?.slug" class="shrink teaser">
        <MediaCoverImage :sourcebook="props.data" />
        <TeaserTitle :title="data?.name"/>
    </NuxtLink>
</template>

<style scoped lang="scss">
@use '~/assets/css/colors';
@use '~/assets/css/components/teasers';
</style>
