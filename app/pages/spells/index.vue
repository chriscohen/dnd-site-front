<script setup lang="ts">
import SpellTeaser from "~/components/teasers/SpellTeaser.vue";

const persistedStore = usePersistedStore();
const apiUrl = useApiUrl();

const { data, error, status } = await useAsyncData(
    'spells',
    () => $fetch(
        apiUrl.getUrl('spells', RenderMode.TEASER),
        {
            method: 'GET',
            headers: {
                "Access-Control-Allow-Origin": "*"
            }
        }
    ),
    {watch: [persistedStore]}
);
</script>

<template>
    <div class="page-container">
        <div class="teaser-container">
            <SpellTeaser v-for="item in data" :key="item.id" :loading="false" :data="item" />
        </div>
    </div>

</template>

<style scoped lang="scss">
@use '~/assets/css/teasers';
</style>
