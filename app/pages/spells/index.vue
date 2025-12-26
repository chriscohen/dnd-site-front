<script setup lang="ts">
import SpellTeaser from "~/components/teasers/SpellTeaser.vue";
import {useSpellCache} from "~/stores/Store";
import PageTitle from "~/components/labels/PageTitle.vue";
import TeaserGrid from "~/components/teasers/TeaserGrid.vue";
import {createSpell, type Spell, type SpellApiResponse} from "~/classes/spells/spell";

const store = useSpellCache();
const data: SpellApiResponse[] = await store.list() as SpellApiResponse[];
const items: Spell[] = data?.map(item => createSpell(item));

useHead({ title: 'Spells' });
definePageMeta({ layout: false });
</script>

<template>
    <NuxtLayout name="default">
        <template #pageTitle>
            <PageTitle title="Spells" back-to="/" :underline="true"/>
        </template>

        <TeaserGrid v-if="items">
            <SpellTeaser
                v-for="item in items"
                :key="item.id"
                :data="item"
            />
        </TeaserGrid>
    </NuxtLayout>
</template>
