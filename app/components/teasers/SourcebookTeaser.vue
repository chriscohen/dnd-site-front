<script lang="ts" setup>

import TeaserTitle from "~/components/teasers/TeaserTitle.vue";
import TeaserTile from "~/components/teasers/TeaserTile.vue";
import type {Source} from "~/classes/sources/source";
import CoverImage from "~/components/media/CoverImage.vue";

const props = defineProps<{
    source?: Source
}>();
</script>

<template>
    <TeaserTile :href="'/sources/' + source?.slug">
        <CoverImage v-if="source?.coverImage" :source="source" />
        <TeaserTitle :title="source?.name" :edition="source?.gameEdition"/>
    </TeaserTile>
</template>
