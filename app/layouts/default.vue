<script setup lang="ts">
import MainNavigation from "~/components/navigation/MainNavigation.vue";
import DndSearch from "~/components/search/DndSearch.vue";
import EditionSelector from "~/components/EditionSelector.vue";

useHead({
    bodyAttrs: { class: 'text-md md:text-lg' }
});
</script>

<template>
    <div id="outer" class="flex flex-col h-dvh w-full overflow-hidden">
        <header class="bg-debug-red flex justify-between items-center gap-8 bg-gray-950 min-h-12">
            <slot name="header">
                <MainNavigation/>
                <DndSearch/>
                <EditionSelector/>
            </slot>
        </header>
        <slot name="pageTitle"/>
        <main class="flex-1 min-h-0 sm:px-4 flex flex-col">
            <NuxtLoadingIndicator/>
            <div id="page-content" class="flex-1 flex flex-col min-h-0 w-full overflow-hidden my-4">
                <slot/>
            </div>
        </main>

        <slot name="bottomNav"/>
    </div>
</template>

<style lang="scss">
@use '~/assets/css/default/styles';
</style>
