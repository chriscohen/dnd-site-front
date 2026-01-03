<script setup lang="ts">
import SpellTeaser from "~/components/teasers/SpellTeaser.vue";
import {useSpellCache} from "~/stores/Store";
import PageTitle from "~/components/labels/PageTitle.vue";
import TeaserGrid from "~/components/teasers/TeaserGrid.vue";
import {createSpell, type Spell} from "~/classes/spells/spell";

const store = useSpellCache();
const containerRef = ref<HTMLElement | null>(null);

const items = computed<Spell[]>(() => store.listItems.map(createSpell));

onMounted(() => store.loadMore());

useHead({ title: 'Spells' });
definePageMeta({ layout: false });
</script>

<template>
    <NuxtLayout name="default">
        <template #pageTitle>
            <PageTitle title="Spells" back-to="/" :underline="true"/>
        </template>

        <TeaserGrid v-if="items.length > 0" ref="containerRef">
            <SpellTeaser
                v-for="item in items"
                :key="item.id"
                :data="item"
            />
        </TeaserGrid>
    </NuxtLayout>
</template>
