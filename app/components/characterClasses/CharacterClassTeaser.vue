<script setup lang="ts">
import TeaserTitle from "~/components/teasers/TeaserTitle.vue";
import GameEditionBadge from "~/components/badges/GameEditionBadge.vue";

const props = defineProps<{
    data?: ICharacterClass
}>();
</script>

<template>
    <NuxtLink v-if="data" class="character-class-teaser teaser" :to="'/classes/' + data.slug">
        <NuxtImg v-if="data?.image?.url" :src="data.image.url" :alt="'Image of ' + data.name"/>
        <BadgesBadgeContainer :vertical="true">
            <GameEditionBadge
                v-for="edition in data.editions"
                :key="edition.id"
                :edition="edition.game_edition"
                rounded-corners="left"
            />
        </BadgesBadgeContainer>
        <TeaserTitle :title="data?.name"/>
    </NuxtLink>
</template>

<style lang="scss">
@use '~/assets/css/default/colors';
@use '~/assets/css/default/mixins';

.character-class-teaser {
    display: block;
    width: 15rem;
    height: 15rem;
    overflow: hidden;
    @include mixins.heavyShadow
}
</style>
