<script setup lang="ts">
import TeaserTitle from "~/components/teasers/TeaserTitle.vue";

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
    <NuxtLink
        v-if="data"
        :to="'/spells/' + data?.slug"
        class="shrink teaser spell-teaser w-48 md:w-64 h-48 md:h-64"
    >
        <NuxtImg
            v-if="data.image?.url"
            :src="data.image.url"
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
    </NuxtLink>
</template>
