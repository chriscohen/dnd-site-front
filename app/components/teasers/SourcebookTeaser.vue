<script lang="ts" setup>

import TeaserTitle from "~/components/teasers/TeaserTitle.vue";

const props = defineProps<{
    data?: ISourcebook
}>();
</script>

<template>
    <NuxtLink v-if="data" :to="'/sources/' + data?.slug" class="shrink teaser source-teaser">
        <MediaCoverImage :sourcebook="props.data" />
        <TeaserTitle :title="data?.name" :edition="data?.game_edition"/>
    </NuxtLink>
</template>

<style scoped lang="scss">
@use '~/assets/css/default/colors';
@use '~/assets/css/default/teasers';
@use '~/assets/css/default/variables';

.source-teaser {
    width: variables.$teaser-width;
    height: variables.$teaser-height;
}
</style>
