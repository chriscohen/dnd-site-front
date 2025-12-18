<script setup lang="ts">
import TeaserTitle from "~/components/teasers/TeaserTitle.vue";
import TeaserTile from "~/components/teasers/TeaserTile.vue";

interface Props {
    data?: ISpellTeaser
}

const { data = undefined } = defineProps<Props>();

const getSubtitle = computed(() => {
    return [
        toOrdinal(data?.lowestLevel.toString() ?? ''),
        'level',
        data?.school
    ].join(' ');
});
</script>

<template>
    <TeaserTile :href="'/spells/' + data?.slug">
        <NuxtImg
            v-if="data?.image?.url"
            :src="data?.image?.url"
            class="absolute top-0 left-0"
        />
        <TeaserTitle :title="data?.name" :subtitle="getSubtitle" :rarity="data?.rarity"/>
        <BadgesBadgeContainer vertical class="absolute top-4, right-0">
            <BadgesGameEditionBadge
                v-for="edition in data?.editions"
                :key="edition.id"
                :edition="edition.game_edition"
                rounded-corners="left"
            />
        </BadgesBadgeContainer>
    </TeaserTile>
</template>
