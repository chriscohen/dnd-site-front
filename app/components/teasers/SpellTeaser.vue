<script setup lang="ts">
import { toOrdinal } from '~/utils/utils';
import TeaserTitle from "~/components/teasers/TeaserTitle.vue";

const props = defineProps<{
    loading: boolean,
    data?: ISpellTeaser
}>();

const getSubtitle = computed(() => {
    return props.loading ? [] : [
        toOrdinal(props.data.lowest_level ?? ''),
        'level',
        props.data.school
    ].join(' ');
});
</script>

<template>
    <NuxtLink v-if="data" :to="'/spells/' + data?.slug" class="shrink teaser spell-teaser">
        <NuxtImg v-if="data.image?.url" :src="data.image.url"/>
        <TeaserTitle :title="data?.name" :subtitle="getSubtitle"/>
        <BadgesBadgeContainer vertical>
            <BadgesGameEditionBadge
                v-for="edition in data?.editions"
                :key="edition.id"
                :edition="edition.game_edition"
                rounded-corners="left"
            />
        </BadgesBadgeContainer>
    </NuxtLink>
</template>

<style scoped lang="scss">
@use '~/assets/css/fonts';
@use '../../assets/css/teasers';
@use '~/assets/css/variables';
@use '~/assets/css/badges';
@use '~/assets/css/animations';

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

.badge-container {
    position: absolute;
    top: 1rem;
    right: 0;
}

</style>
