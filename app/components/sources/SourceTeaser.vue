<script lang="ts" setup>

import TeaserTitle from "~/components/teasers/TeaserTitle.vue";
import TeaserTile from "~/components/teasers/TeaserTile.vue";
import type {Source} from "~/classes/sources/source";
import EditionStrip from "~/components/strips/EditionStrip.vue";

const props = defineProps<{
    source?: Source
}>();
</script>

<template>
    <TeaserTile
        :edition="source?.gameEdition"
        :href="'/sources/' + source?.slug"
        :media="source?.coverImage"
        :name="source?.name"
    />
</template>
