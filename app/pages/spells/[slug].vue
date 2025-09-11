<script setup lang="ts">
import Spellbook from "~/components/spells/Spellbook.vue";
import SpellbookImage from "~/components/spells/SpellbookImage.vue";

const route = useRoute();
const store = useSpellStore();

const item = await store.getBySlug(route.params.slug as string);
console.log(item);
const title = item !== null ? item.name : 'Loading';

useHead({
    title: title
});
</script>

<template>

    <div class="spell">
        <SpellbookImage v-if="item !== null" :spell="item"/>
        <Spellbook v-if="item !== null" :spell="item"/>
    </div>

</template>
