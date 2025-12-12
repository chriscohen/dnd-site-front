<script setup lang="ts">
import SpellTeaser from "~/components/teasers/SpellTeaser.vue";
import {useSpellCache} from "~/stores/Store";
import PageTitle from "~/components/labels/PageTitle.vue";

const path = API_URL + '/spells?mode=teaser';
const store = useSpellCache();
await store.fetch(path);

const items: ISpellTeaser[] = computed(() => store.get(path));
</script>

<template>
    <NuxtLayout name="default">
        <template #pageTitle>
            <PageTitle title="Spells" back-to="/" :underline="true"/>
        </template>

        <div v-if="items" class="teaser-container grid-flow-col-dense">
            <SpellTeaser
                v-for="item in items"
                :key="item.id"
                :data="item"
            />
        </div>
    </NuxtLayout>
</template>
