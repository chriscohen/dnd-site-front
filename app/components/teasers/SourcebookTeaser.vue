<script lang="ts" setup>

import TeaserTitle from "~/components/teasers/TeaserTitle.vue";

const props = defineProps<{
    data?: ISourcebook
}>();
</script>

<template>
    <NuxtLink v-if="data" :to="'/sources/' + data?.slug" class="shrink teaser source-teaser">
        <MediaCoverImage v-if="data.coverImage" :sourcebook="data" />
        <TeaserTitle :title="data?.name" :edition="data?.gameEdition"/>
    </NuxtLink>
</template>

<style scoped lang="scss">
@use '~/assets/css/default/colors';
@use '~/assets/css/default/teasers';

.source-teaser {
    width: teasers.$width;
}
</style>
