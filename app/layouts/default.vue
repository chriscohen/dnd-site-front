<script setup lang="ts">
import MainNavigation from "~/components/navigation/MainNavigation.vue";
import DndSearch from "~/components/search/DndSearch.vue";
import EditionSelector from "~/components/EditionSelector.vue";
import {useUiStore} from "~/stores/uiStore";

const store = useUiStore();

useHead({
    bodyAttrs: { class: 'text-md md:text-lg' }
});
</script>

<template>
    <div id="outer" class="flex flex-col h-dvh w-full overflow-hidden relative">
        <img
            :src="CDN_URL + '/backgrounds/' + store.backgroundImage"
            class="absolute inset-0 w-full h-full object-cover object-center saturate-25 brightness-50 -z-10"
            alt="Background iamge"
            >
        <header class="flex justify-between items-center gap-8 bg-black/75 min-h-12 px-4 backdrop-blur-md">
            <slot name="header">
                <MainNavigation/>
                <DndSearch/>
                <EditionSelector/>
            </slot>
        </header>
        <section class="flex justify-start">
            <slot name="pageTitle"/>
        </section>
        <main class="flex-1 min-h-0 sm:px-4 flex flex-col">
            <NuxtLoadingIndicator/>
            <div id="page-content" class="flex-1 flex flex-col min-h-0 w-full overflow-hidden py-4">
                <slot/>
            </div>
        </main>

        <slot name="bottomNav"/>
    </div>
</template>
