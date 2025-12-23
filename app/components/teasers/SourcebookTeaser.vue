<script lang="ts" setup>

import TeaserTitle from "~/components/teasers/TeaserTitle.vue";
import TeaserTile from "~/components/teasers/TeaserTile.vue";

const props = defineProps<{
    data?: SourcebookApiResponse
}>();
</script>

<template>
    <TeaserTile :href="'/sources/' + data?.slug">
        <MediaCoverImage v-if="data?.coverImage" :sourcebook="data" />
        <TeaserTitle :title="data?.name" :edition="data?.gameEdition"/>
    </TeaserTile>
</template>
