<script setup lang="ts">
import TeaserTitle from "~/components/teasers/TeaserTitle.vue";

interface Props {
    data?: ISpellTeaser
}

const { data = undefined } = defineProps<Props>();

const getSubtitle = computed(() => {
    return [
        toOrdinal(data?.lowest_level.toString() ?? ''),
        'level',
        data?.school
    ].join(' ');
});
</script>

<template>
    <NuxtLink v-if="data" :to="'/spells/' + data?.slug" class="shrink teaser spell-teaser">
        <NuxtImg v-if="data.image?.url" :src="data.image.url"/>
        <TeaserTitle :title="data?.name" :subtitle="getSubtitle" :rarity="data?.rarity"/>
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

<style lang="scss">
@use '~/assets/css/default/variables';

.spell-teaser {
    position: relative;
    width: variables.$teaser-width;
    height: variables.$teaser-width;

    > img {
        position: absolute;
        top: 0;
        left: 0;
    }

    .badge-container {
        position: absolute;
        top: 1rem;
        right: 0;
    }
}
</style>
