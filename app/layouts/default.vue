<script setup lang="ts">
import MainNavigation from "~/components/navigation/MainNavigation.vue";
import DndSearch from "~/components/search/DndSearch.vue";
import EditionSelector from "~/components/EditionSelector.vue";

useHead({
    bodyAttrs: { class: 'text-md md:text-lg' }
});
</script>

<template>
    <div id="outer" class="flex flex-col">
        <header class="bg-debug-red flex justify-between gap-8 items-center bg-gray-950 min-h-[3rem]">
            <slot name="header">
                <MainNavigation/>
                <DndSearch/>
                <EditionSelector/>
            </slot>
        </header>
        <slot name="pageTitle"/>
        <main class="min-h-0 flex flex-col">
            <NuxtLoadingIndicator/>
            <div class="page-content overflow-hidden mb-4">
                <slot/>
            </div>
        </main>

        <slot name="bottomNav"/>
    </div>
</template>

<style lang="scss">
@use '~/assets/css/default/styles';
</style>
