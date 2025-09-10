<script setup lang="ts">
import SpellTeaser from "~/components/teasers/SpellTeaser.vue";

const spellStore = useSpellStore();
const items = await spellStore.getAll();
</script>

<template>
    <Suspense>
        <div class="teaser-container">
            <SpellTeaser v-for="spell in items" :key="spell.id" :spell="spell" />
        </div>

        <template #fallback>
            LOADING
        </template>
    </Suspense>
</template>
