<script setup lang="ts">
import SpellTeaser from "~/components/teasers/SpellTeaser.vue";
import ConjuringScreen from "~/components/loading/ConjuringScreen.vue";

const api = useApi({
    cache: useSpellStore(),
    type: 'spells',
    mode: RenderMode.TEASER,
    multiple: true
});

api.get();
</script>

<template>
    <div class="page-container">
        <div v-if="!api.getItem()" class="teaser-container">
            <ConjuringScreen/>
        </div>
        <div v-else class="teaser-container">
            <SpellTeaser v-for="item in api.getItem()" :key="item.id" :data="item" />
        </div>
    </div>

</template>

<style scoped lang="scss">
@use '~/assets/css/teasers';
</style>
