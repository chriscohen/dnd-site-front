<script setup lang="ts">
import SpellTeaser from "~/components/teasers/SpellTeaser.vue";
import ConjuringScreen from "~/components/loading/ConjuringScreen.vue";

const store = useSpellStore();
await store.getAll();
</script>

<template>
    <div>
        <ConjuringScreen v-if="store.loading"/>

        <div v-if="!store.loading" class="teaser-container">
            <SpellTeaser v-for="item in store.items" :key="item.id" :loading="false" :data="item" />
        </div>
    </div>

</template>

<style scoped lang="scss">
@use '~/assets/css/components/teasers';
</style>
