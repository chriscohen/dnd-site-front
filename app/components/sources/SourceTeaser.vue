<script lang="ts" setup>

import TeaserTitle from "~/components/teasers/TeaserTitle.vue";
import TeaserTile from "~/components/teasers/TeaserTile.vue";
import type {Source} from "~/classes/sources/source";
import MediaImage from "~/components/media/MediaImage.vue";

const props = defineProps<{
    source?: Source
}>();
</script>

<template>
    <TeaserTile :href="'/sources/' + source?.slug">
        <MediaImage v-if="source?.coverImage" :media="source.coverImage" />
        <TeaserTitle :title="source?.name" :edition="source?.gameEdition"/>
    </TeaserTile>
</template>
