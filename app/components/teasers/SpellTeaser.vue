<script setup lang="ts">
import SpellTeaserTile from "~/components/teasers/SpellTeaserTile.vue";

interface Props {
    data?: ISpellTeaser,
    variant?: string
}

const { data = undefined, variant = 'tile' } = defineProps<Props>();
</script>

<template>
    <SpellTeaserTile v-if="variant == 'tile'" :data="data"/>
</template>

<style scoped lang="scss">
.spell-teaser {
    display: inline-block;
}
</style>
