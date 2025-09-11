<script setup lang="ts">
import { toOrdinal } from '~/utils/utils';
import TeaserTitle from "~/components/teasers/TeaserTitle.vue";

const props = defineProps({
    spell: { type: Object as () => ISpell, required: true },
});

const getSubtitle = computed(() => {
    return [
        toOrdinal(props.spell.editions[0]?.lowest_level.toString() ?? ''),
        'level',
        props.spell.editions[0]?.school.name
    ].join(' ');
});
</script>

<template>
    <NuxtLink :to="'/spells/' + props.spell.slug" class="shrink teaser spell-teaser">
        <NuxtImg :src="'https://dnd001.s3.eu-west-2.amazonaws.com/spells/' + props.spell.slug + '.webp'"/>
        <TeaserTitle :title="spell.name" :subtitle="getSubtitle"/>
        <BadgesBadgeContainer>
            <BadgesGameEditionBadge
                v-for="edition in spell.editions"
                :key="edition.id"
                :edition="edition.game_edition"
            />
        </BadgesBadgeContainer>
    </NuxtLink>
</template>

<style scoped lang="scss">
@use '~/assets/css/fonts';
@use '~/assets/css/components/teasers';
@use '~/assets/css/variables/variables';

.spell-teaser {
    display: inline-block;
    position: relative;
    width: variables.$teaser-width;
    height: variables.$teaser-width;

    > .badge-container {
        position: absolute;
        top: 1rem;
        right: 1.5rem;
    }
    > img {
        position: absolute;
        top: 0;
        left: 0;
    }
}

</style>
