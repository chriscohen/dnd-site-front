<script setup lang="ts">
import SpellTeaser from "~/components/teasers/SpellTeaser.vue";
import ConjuringScreen from "~/components/loading/ConjuringScreen.vue";

const store = useSpellStore();
store.getAll(RenderMode.TEASER);
</script>

<template>
    <div>
        <ConjuringScreen v-if="store.isLoading()"/>

        <div v-if="!store.isLoading()" class="teaser-container">
            <SpellTeaser v-for="item in store.teaser" :key="item.id" :loading="false" :data="item" />
        </div>
    </div>

</template>

<style scoped lang="scss">
@use '~/assets/css/components/teasers';
</style>
