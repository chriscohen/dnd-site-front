<script setup lang="ts">
import { toOrdinal } from '~/utils/utils';
import TeaserTitle from "~/components/teasers/TeaserTitle.vue";

const props = defineProps<{
    loading: boolean,
    data?: ISpell
}>();

const getSubtitle = computed(() => {
    return props.loading ? [] : [
        toOrdinal(props.data.editions[0]?.lowest_level.toString() ?? ''),
        'level',
        props.data.editions[0]?.school.name
    ].join(' ');
});
</script>

<template>
    <NuxtLink v-if="data" :to="'/spells/' + data?.slug" class="shrink teaser spell-teaser">
        <NuxtImg :src="'https://dnd001.s3.eu-west-2.amazonaws.com/spells/' + data?.slug + '.webp'"/>
        <TeaserTitle :title="data?.name" :subtitle="getSubtitle"/>
        <BadgesBadgeContainer>
            <BadgesGameEditionBadge
                v-for="edition in data?.editions"
                :key="edition.id"
                :edition="edition.game_edition"
            />
        </BadgesBadgeContainer>
    </NuxtLink>
</template>

<style scoped lang="scss">
@use '~/assets/css/fonts';
@use '~/assets/css/components/teasers';
@use '~/assets/css/variables';
@use '~/assets/css/badges';

.spell-teaser {
    display: inline-block;
    position: relative;
    width: variables.$teaser-width;
    height: variables.$teaser-width;

    > img {
        position: absolute;
        top: 0;
        left: 0;
    }
}

</style>
