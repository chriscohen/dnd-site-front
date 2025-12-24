<script setup lang="ts">
import SpellTeaser from "~/components/teasers/SpellTeaser.vue";
import {useSpellCache} from "~/stores/Store";
import PageTitle from "~/components/labels/PageTitle.vue";
import TeaserGrid from "~/components/teasers/TeaserGrid.vue";
import {createSpell, type SpellApiResponse} from "~/classes/spells/spell";

const path = API_URL + '/spells?mode=teaser';
const store = useSpellCache();

const source: SpellApiResponse[] = await store.get(path) as SpellApiResponse[]
const items = data.map((item: SpellApiResponse) => createSpell(item));

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
