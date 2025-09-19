<script setup lang="ts">
import Spellbook from "~/components/spells/Spellbook.vue";
import SpellbookImage from "~/components/spells/SpellbookImage.vue";

const route = useRoute();
const store = useSpellStore();

const item = await store.getBySlug(route.params.slug as string);
</script>

<template>

    <div class="spell">
            <SpellbookImage :loading="!item" :spell="item"/>
            <Spellbook :loading="!item" :spell="item"/>
    </div>

</template>

<style scoped lang="scss">
.spell {
    height: 100%;
}
</style>
