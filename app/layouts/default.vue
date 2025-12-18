<script setup lang="ts">
import MainNavigation from "~/components/navigation/MainNavigation.vue";
import DndSearch from "~/components/search/DndSearch.vue";

useHead({
    bodyAttrs: { class: 'text-md md:text-lg' }
});
</script>

<template>
    <div id="outer">
        <header class="flex justify-between gap-8 items-center bg-gray-950 min-h-[3rem]">
            <slot name="header">
                <MainNavigation/>
                <DndSearch/>
                <EditionSelector/>
            </slot>
        </header>
        <slot name="pageTitle"/>
        <main class="h-screen max-h-screen overflow-hidden flex gap-8 overflow-y-scroll">
            <NuxtLoadingIndicator/>
            <div class="page-content w-full">
                <slot/>
            </div>
        </main>

        <slot name="bottomNav"/>
    </div>
</template>

<style lang="scss">
@use '~/assets/css/default/styles';
</style>
